import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CRISIS_PATTERNS = [
  /\bkill\s+(my)?self\b/i,
  /\bsuicid/i,
  /\bend\s+my\s+life\b/i,
  /\bself[\s-]?harm\b/i,
  /\bwant\s+to\s+die\b/i,
  /\bno\s+reason\s+to\s+live\b/i,
  /\bbetter\s+off\s+dead\b/i,
  /\bhurt\s+myself\b/i,
];

const SUPPORT_MESSAGE =
  "If you're going through a difficult time, you deserve support. Please reach out to a crisis helpline or mental health professional. In the UK: Samaritans 116 123. In the US: 988 Suicide & Crisis Lifeline.";

function checkCrisisContent(text: string): boolean {
  return CRISIS_PATTERNS.some((p) => p.test(text));
}

async function getReflectionData(userEmail: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [journalEntries, moodEntries] = await Promise.all([
    prisma.journalEntry.findMany({
      where: {
        userId: userEmail,
        date: { gte: sevenDaysAgo },
      },
      orderBy: { date: "asc" },
      select: { date: true, content: true },
    }),
    prisma.moodEntry.findMany({
      where: {
        userId: userEmail,
        createdAt: { gte: sevenDaysAgo },
      },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true, valence: true, arousal: true, notes: true },
    }),
  ]);

  const uniqueDates = new Set(
    journalEntries.map((e) => e.date.toISOString().slice(0, 10)),
  );
  const eligible = uniqueDates.size >= 1;

  return {
    journalEntries,
    moodEntries,
    eligible,
  };
}

function buildJournalContext(entries: { date: Date; content: string }[]) {
  return entries
    .map(
      (e) =>
        `[${e.date.toISOString().slice(0, 10)}] "${e.content.slice(0, 500)}"`,
    )
    .join("\n\n");
}

function buildMoodContext(
  entries: {
    createdAt: Date;
    valence: number;
    arousal: number;
    notes: string | null;
  }[],
) {
  if (entries.length === 0) return "No mood data recorded in this period.";
  const avgValence =
    entries.reduce((s, e) => s + e.valence, 0) / entries.length;
  const avgArousal =
    entries.reduce((s, e) => s + e.arousal, 0) / entries.length;
  const valenceDesc =
    avgValence < -0.3 ? "lower" : avgValence > 0.3 ? "higher" : "neutral";
  const arousalDesc =
    avgArousal < -0.3
      ? "calmer"
      : avgArousal > 0.3
        ? "more energised"
        : "moderate";
  const notes = entries
    .filter((e) => e.notes?.trim())
    .map((e) => e.notes)
    .join("; ");
  return `Mood tended toward ${valenceDesc} valence and ${arousalDesc} arousal. ${notes ? `Notes: ${notes}` : ""}`;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Reflection is not available right now." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const type = body.type === "lookback" ? "lookback" : "threads";

    const { journalEntries, moodEntries, eligible } = await getReflectionData(
      session.user.email,
    );

    if (!eligible) {
      return NextResponse.json(
        {
          error: "Reflection unlocks after 3 journaling days in the past week.",
        },
        { status: 403 },
      );
    }

    const journalText = journalEntries.map((e) => e.content).join("\n");
    if (checkCrisisContent(journalText)) {
      return NextResponse.json({
        crisisSupport: true,
        message: SUPPORT_MESSAGE,
      });
    }

    const journalContext = buildJournalContext(journalEntries);
    const moodContext = buildMoodContext(moodEntries);

    const disclaimer =
      "This is not clinical or professional advice. For mental health support, please reach out to a qualified professional or crisis service.";

    if (type === "lookback") {
      const systemPrompt = `You are a warm, reflective companion for a journaling app. Your role is to summarise — never to diagnose, advise, or prescribe.

Given the user's journal entries from the past 7 days, write a concise summary (2-4 paragraphs) of what they've been writing about. Mirror their words and themes. Be observational and gentle. No "should" or prescriptive language. No medical or diagnostic claims.`;
      const userContent = `Journal entries from the past week:\n\n${journalContext}\n\nProvide a summary of what this person has been writing about.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: 500,
      });

      const summary =
        completion.choices[0]?.message?.content?.trim() ||
        "Nothing surfaced this time. Keep journaling.";

      return NextResponse.json({
        type: "lookback",
        summary,
        disclaimer,
      });
    }

    const systemPrompt = `You are a reflective companion for a journaling app. Your role is to mirror and summarise — never to diagnose, advise, or prescribe.

Given the user's journal entries and mood data from the past week, produce a JSON object with exactly these keys:
- thematicSummary: 2-4 sentences observing themes in their words. Use "You've written about...", "A thread that appears...". No "should" or prescriptive language.
- emotionalPatterns: 1-2 sentences on mood/emotional patterns if data exists. Observational only.
- reflectivePrompts: Array of 2-3 open-ended prompts for the user to sit with. Questions, not advice.

Never use: should, must, need to, you ought to, I recommend, you should try. No medical or diagnostic claims.`;
    const userContent = `Journal entries:\n\n${journalContext}\n\nMood context: ${moodContext}\n\nProduce the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      max_tokens: 600,
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) {
      return NextResponse.json({
        type: "threads",
        thematicSummary: "Nothing surfaced this time. Keep journaling.",
        emotionalPatterns: "",
        reflectivePrompts: [],
        disclaimer,
      });
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch
      ? (JSON.parse(jsonMatch[0]) as {
          thematicSummary?: string;
          emotionalPatterns?: string;
          reflectivePrompts?: string[];
        })
      : {};

    return NextResponse.json({
      type: "threads",
      thematicSummary:
        parsed.thematicSummary ||
        "Nothing surfaced this time. Keep journaling.",
      emotionalPatterns: parsed.emotionalPatterns || "",
      reflectivePrompts: Array.isArray(parsed.reflectivePrompts)
        ? parsed.reflectivePrompts
        : [],
      disclaimer,
    });
  } catch (error) {
    console.error("Reflection API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
