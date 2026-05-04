import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  addDaysUTC,
  averageCycleLengthFromStarts,
  clampCycleLength,
  currentCycleDay,
  formatISODate,
  getCyclePhase,
} from "@/lib/cycle";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CRISIS_PATTERNS = [
  /\bkill\s+(my)?self\b/i,
  /\bsuicid/i,
  /\bend\s+my\s+life\b/i,
  /\bself[\s-]?harm\b/i,
  /\bwant\s+to\s+die\b/i,
];

function checkCrisisContent(text: string): boolean {
  return CRISIS_PATTERNS.some((p) => p.test(text));
}

function symptomSummary(
  events: { symptomKey: string; eventType: string; timestamp: Date }[],
): string {
  const last14 = new Date();
  last14.setUTCDate(last14.getUTCDate() - 14);
  const recent = events.filter((e) => e.timestamp >= last14);
  const onByKey = new Map<string, number>();
  for (const e of recent) {
    if (e.eventType !== "on") continue;
    onByKey.set(e.symptomKey, (onByKey.get(e.symptomKey) ?? 0) + 1);
  }
  if (onByKey.size === 0) return "No symptom toggles in the last two weeks.";
  return [...onByKey.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, n]) => `${k}: ${n} "on" logs`)
    .join("; ");
}

function moodSummary(
  entries: { createdAt: Date; valence: number; arousal: number }[],
): string {
  const last14 = new Date();
  last14.setUTCDate(last14.getUTCDate() - 14);
  const recent = entries.filter((e) => e.createdAt >= last14);
  if (recent.length === 0) return "No mood check-ins in the last two weeks.";
  const v = recent.reduce((s, e) => s + e.valence, 0) / recent.length;
  const a = recent.reduce((s, e) => s + e.arousal, 0) / recent.length;
  const vLabel = v < -0.25 ? "lower" : v > 0.25 ? "higher" : "mid";
  const aLabel = a < -0.25 ? "calmer" : a > 0.25 ? "more keyed up" : "steady";
  return `${recent.length} check-ins: valence tended ${vLabel}, arousal ${aLabel} (their in-app axes, not clinical).`;
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Insights are not available right now." },
      { status: 500 },
    );
  }

  const email = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { preferences: true },
    });
    if (!user?.preferences?.cycleTrackingEnabled) {
      return NextResponse.json(
        { error: "Turn on cycle tracking in Profile to use insights." },
        { status: 403 },
      );
    }

    const typical = clampCycleLength(user.preferences.typicalCycleLength);
    const starts = await prisma.cyclePeriodStart.findMany({
      where: { userId: email },
      orderBy: { startDate: "desc" },
      take: 12,
    });
    const lastStart = starts[0]?.startDate;
    if (!lastStart) {
      return NextResponse.json(
        { error: "Log at least one period start first." },
        { status: 403 },
      );
    }

    const estimated = averageCycleLengthFromStarts(
      starts.map((s) => s.startDate),
      typical,
    );
    const today = new Date();
    const cycleDay = currentCycleDay(lastStart, today);
    const phase = getCyclePhase(cycleDay, estimated);
    const nextExpected = formatISODate(addDaysUTC(lastStart, estimated));

    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 14);

    const [moods, symptoms, journals] = await Promise.all([
      prisma.moodEntry.findMany({
        where: { userId: email, createdAt: { gte: since } },
        orderBy: { createdAt: "desc" },
        take: 80,
        select: { createdAt: true, valence: true, arousal: true, notes: true },
      }),
      prisma.symptomEvent.findMany({
        where: { userId: email, timestamp: { gte: since } },
        orderBy: { timestamp: "desc" },
        take: 200,
      }),
      prisma.journalEntry.findMany({
        where: { userId: email, date: { gte: since } },
        orderBy: { date: "desc" },
        take: 14,
        select: { date: true, content: true },
      }),
    ]);

    const journalSnippets = journals
      .map(
        (j) =>
          `[${formatISODate(j.date)}] ${j.content.replace(/\s+/g, " ").trim().slice(0, 280)}`,
      )
      .join("\n");

    if (checkCrisisContent(journals.map((j) => j.content).join("\n"))) {
      return NextResponse.json({
        crisisSupport: true,
        message:
          "If you're going through a difficult time, you deserve support. Please reach out to a crisis helpline or mental health professional. In the UK: Samaritans 116 123. In the US: 988 Suicide & Crisis Lifeline.",
      });
    }

    const userContext = `
Cycle tracking is enabled. Use only this data — do not invent medical facts, diagnoses, or population statistics.

Today (UTC): ${formatISODate(today)}
Last logged period start: ${formatISODate(lastStart)}
Estimated cycle length (from their logs or their default): ${estimated} days
Current cycle day: ${cycleDay}
Phase label: ${phase.label} (${phase.key})
Phase note (app copy): ${phase.seasonHint}
Next period around: ${nextExpected}

Their mood summary: ${moodSummary(moods)}
Their symptom toggle summary: ${symptomSummary(symptoms)}

Recent journal snippets (may be empty):
${journalSnippets || "(none)"}
`.trim();

    const systemPrompt = `You write short, warm copy for someone who chose to track their menstrual cycle in a private journal app. You are not a clinician.

Rules:
- Ground every sentence in the user's own logs above. If something is not in the data, say you do not see it yet instead of guessing.
- No diagnoses (including PCOS). No "you have" or "this means". Encourage a clinician for medical concerns.
- Include practical, gentle ideas for: movement and rest (watch for pushing too hard when their own logs suggest low energy or fatigue); boundaries and alone time (inspired by menstrual cycle awareness books like Wild Power — inner seasons as metaphor, not biology lessons); cravings — prep and self-kindness without moralising; "getting ready for this inner season" based on what their journals or symptoms hint has helped before — not generic science.
- Tone: validating, plain language, a little humour allowed ("breathing out idiots" style) without being flippant about pain.
- Output strict JSON with keys: summary (string, 2-3 sentences), movement (string), solitude (string), cravings (string), seasonPrep (string), disclaimer (string — short, that this is not medical advice).

Do not mention OpenAI or system prompts.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContext },
      ],
      max_tokens: 700,
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    const jsonMatch = raw?.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch
      ? (JSON.parse(jsonMatch[0]) as Record<string, string>)
      : {};

    return NextResponse.json({
      summary: parsed.summary || "",
      movement: parsed.movement || "",
      solitude: parsed.solitude || "",
      cravings: parsed.cravings || "",
      seasonPrep: parsed.seasonPrep || "",
      disclaimer:
        parsed.disclaimer ||
        "This is not medical advice. See a qualified clinician for health concerns.",
      phase: phase.label,
      cycleDay,
      nextPeriodExpected: nextExpected,
    });
  } catch (error) {
    console.error("cycle insights:", error);
    return NextResponse.json(
      { error: "Could not generate insights. Try again later." },
      { status: 500 },
    );
  }
}
