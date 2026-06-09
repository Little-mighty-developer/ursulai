import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ActivityRow = {
  key: string;
  label: string;
  emoji: string | null;
  tags: string[];
};

type BodyActivityDelegate = {
  findMany: (args: {
    select: { key: true; label: true; emoji: true; tags: true };
  }) => Promise<ActivityRow[]>;
  count: () => Promise<number>;
  createMany: (args: {
    data: { key: string; label: string; emoji?: string; tags: string[] }[];
    skipDuplicates: boolean;
  }) => Promise<unknown>;
};

function bodyActivity(prismaClient: unknown): BodyActivityDelegate {
  return (prismaClient as unknown as { bodyActivity: BodyActivityDelegate })
    .bodyActivity;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_BODY_ACTIVITIES: {
  key: string;
  label: string;
  emoji?: string;
  tags: string[];
}[] = [
  {
    key: "meditate",
    label: "Meditate",
    emoji: "🧘‍♀️",
    tags: ["gentle", "grounding"],
  },
  { key: "swim", label: "Swim", emoji: "🏊‍♀️", tags: ["gentle", "outdoors"] },
  { key: "cardio", label: "Cardio", emoji: "🏃‍♀️", tags: ["intense"] },
  {
    key: "pastry_coffee",
    label: "Pastry & coffee at a local cafe",
    emoji: "🍩",
    tags: ["social", "comfort"],
  },
  {
    key: "nature_walk",
    label: "Nature walk / Hike",
    emoji: "🌳",
    tags: ["outdoors"],
  },
  {
    key: "sun_soak",
    label: "Sun soak at the nearest outdoor spot",
    emoji: "☀️",
    tags: ["gentle", "outdoors", "rest"],
  },
  { key: "weights", label: "Weight lifting", emoji: "🏋️‍♀️", tags: ["intense"] },
  {
    key: "free_dance",
    label: "Free dancing alone",
    emoji: "💃",
    tags: ["playful"],
  },
  {
    key: "skilled_dance",
    label: "Skilled dance",
    emoji: "🩰",
    tags: ["intense", "skill"],
  },
  { key: "spa", label: "Spa session", emoji: "🧖‍♀️", tags: ["rest", "comfort"] },
  {
    key: "hiit",
    label: "High intensity fitness training",
    emoji: "🤸‍♀️",
    tags: ["intense"],
  },
  {
    key: "footy",
    label: "Play a friendly game of footy or pass the ball",
    emoji: "⚽",
    tags: ["social", "playful"],
  },
  {
    key: "quick_game_friend",
    label: "a quick game with a friend",
    emoji: "🏸",
    tags: ["social", "playful"],
  },
  {
    key: "spirituality",
    label: "Spirituality",
    emoji: "🔮",
    tags: ["grounding"],
  },
  {
    key: "gentle_stretches",
    label: "gentle stretches",
    emoji: "🥎",
    tags: ["gentle"],
  },
];

async function getActivities(): Promise<ActivityRow[]> {
  const existing = await bodyActivity(prisma)
    .count()
    .catch(() => 0);
  if (existing === 0) {
    await bodyActivity(prisma).createMany({
      data: DEFAULT_BODY_ACTIVITIES.map((a) => ({
        key: a.key,
        label: a.label,
        emoji: a.emoji,
        tags: a.tags,
      })),
      skipDuplicates: true,
    });
  }
  const activities = await bodyActivity(prisma).findMany({
    select: { key: true, label: true, emoji: true, tags: true },
  });
  return activities;
}

function scoreActivity(activity: ActivityRow, symptomKeys: string[]) {
  const tags = new Set((activity.tags || []).map((t) => t.toLowerCase()));
  const has = (k: string) => symptomKeys.includes(k);

  let score = 0;

  const lowEnergy = has("fatigue") || has("brain_fog") || has("nausea");
  const pain =
    has("cramps") ||
    has("body_pain") ||
    has("headache") ||
    has("muscle_spasms");
  const agitation = has("jitteriness");
  const steady = has("energy_steady") || has("refreshed") || has("grounded");

  if (lowEnergy) {
    if (tags.has("rest") || tags.has("gentle") || tags.has("comfort"))
      score += 4;
    if (tags.has("intense")) score -= 3;
  }
  if (pain) {
    if (tags.has("gentle") || tags.has("rest") || tags.has("comfort"))
      score += 3;
    if (tags.has("intense")) score -= 3;
  }
  if (agitation) {
    if (tags.has("grounding") || tags.has("outdoors") || tags.has("gentle"))
      score += 3;
    if (tags.has("intense")) score -= 1;
  }
  if (steady && !lowEnergy && !pain) {
    if (tags.has("playful") || tags.has("outdoors") || tags.has("intense"))
      score += 2;
  }

  // Small preference for varied suggestions
  if (tags.has("outdoors")) score += 0.25;
  if (tags.has("social")) score += 0.15;

  return score;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { symptomKeys } = (await req.json().catch(() => ({}))) as {
      symptomKeys?: string[];
    };

    const keys = Array.isArray(symptomKeys) ? symptomKeys : [];
    const activities = await getActivities();

    if (activities.length === 0) {
      return NextResponse.json(
        { error: "No activities available" },
        { status: 500 },
      );
    }

    // If OpenAI isn't configured, fall back to heuristic suggestions only.
    if (!process.env.OPENAI_API_KEY) {
      const ranked = activities
        .map((a) => ({ a, s: scoreActivity(a, keys) }))
        .sort((x, y) => y.s - x.s);

      const top = ranked
        .filter((x) => x.s > -999)
        .slice(0, 3)
        .map((x) => ({
          key: x.a.key,
          label: x.a.label,
          emoji: x.a.emoji,
        }));

      return NextResponse.json({
        acknowledgement: "",
        suggestions: top,
      });
    }

    const activityList = activities
      .map(
        (a) =>
          `${a.key} — ${a.emoji ?? ""} ${a.label} (tags: ${a.tags.join(", ")})`,
      )
      .join("\n");

    const systemPrompt = `You are a warm, non-clinical companion in a body check-in app.

Rules:
- Acknowledge the user's selected symptom keys gently (1-2 sentences). No diagnosis, no advice, no prescriptions.
- Then choose 2-3 activity keys ONLY from the provided catalog that could feel supportive right now.
- Prioritise attunement over performance. If symptoms suggest low energy or pain, avoid intense options.
- Output STRICT JSON with keys: acknowledgement (string), suggestedKeys (string[]). suggestedKeys length must be 2 or 3.
- Never use: should, must, need to, I recommend, you should try.`;

    const userContent = `Selected symptom keys:\n${keys.length ? keys.join(", ") : "(none)"}\n\nActivity catalog (choose keys from here):\n${activityList}\n\nReturn the JSON.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      max_tokens: 250,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch
      ? (JSON.parse(jsonMatch[0]) as {
          acknowledgement?: string;
          suggestedKeys?: string[];
        })
      : {};

    const suggestedKeys = Array.isArray(parsed.suggestedKeys)
      ? parsed.suggestedKeys.filter((k) => typeof k === "string")
      : [];

    const byKey = new Map(activities.map((a) => [a.key, a] as const));
    const suggestions = suggestedKeys
      .map((k) => byKey.get(k))
      .filter(Boolean)
      .slice(0, 3)
      .map((a) => ({
        key: a!.key,
        label: a!.label,
        emoji: a!.emoji,
      }));

    // If the model returned invalid keys, fall back to heuristic.
    if (suggestions.length < 2) {
      const ranked = activities
        .map((a) => ({ a, s: scoreActivity(a, keys) }))
        .sort((x, y) => y.s - x.s);

      const top = ranked
        .filter((x) => x.s > -999)
        .slice(0, 3)
        .map((x) => ({
          key: x.a.key,
          label: x.a.label,
          emoji: x.a.emoji,
        }));

      return NextResponse.json({
        acknowledgement: parsed.acknowledgement ?? "",
        suggestions: top,
      });
    }

    return NextResponse.json({
      acknowledgement: parsed.acknowledgement ?? "",
      suggestions,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
