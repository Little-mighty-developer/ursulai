import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type BodyActivityRow = {
  key: string;
  label: string;
  emoji: string | null;
  tags: string[];
};

type BodyActivityDelegate = {
  count: () => Promise<number>;
  createMany: (args: {
    data: { key: string; label: string; emoji?: string; tags: string[] }[];
    skipDuplicates: boolean;
  }) => Promise<unknown>;
  findMany: (args: {
    orderBy: { label: "asc" | "desc" };
    select: { key: true; label: true; emoji: true; tags: true };
  }) => Promise<BodyActivityRow[]>;
};

function bodyActivity(prismaClient: unknown): BodyActivityDelegate {
  return (prismaClient as unknown as { bodyActivity: BodyActivityDelegate })
    .bodyActivity;
}

const DEFAULT_BODY_ACTIVITIES: {
  key: string;
  label: string;
  emoji?: string;
  tags: string[];
}[] = [
  { key: "meditate", label: "Meditate", emoji: "🧘‍♀️", tags: ["gentle", "grounding"] },
  { key: "swim", label: "Swim", emoji: "🏊‍♀️", tags: ["gentle", "outdoors"] },
  { key: "cardio", label: "Cardio", emoji: "🏃‍♀️", tags: ["intense"] },
  {
    key: "pastry_coffee",
    label: "Pastry & coffee at a local cafe",
    emoji: "🍩",
    tags: ["social", "comfort"],
  },
  { key: "nature_walk", label: "Nature walk / Hike", emoji: "🌳", tags: ["outdoors"] },
  {
    key: "sun_soak",
    label: "Sun soak at the nearest outdoor spot",
    emoji: "☀️",
    tags: ["gentle", "outdoors", "rest"],
  },
  { key: "weights", label: "Weight lifting", emoji: "🏋️‍♀️", tags: ["intense"] },
  { key: "free_dance", label: "Free dancing alone", emoji: "💃", tags: ["playful"] },
  { key: "skilled_dance", label: "Skilled dance", emoji: "🩰", tags: ["intense", "skill"] },
  { key: "spa", label: "Spa session", emoji: "🧖‍♀️", tags: ["rest", "comfort"] },
  { key: "hiit", label: "High intensity fitness training", emoji: "🤸‍♀️", tags: ["intense"] },
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
  { key: "spirituality", label: "Spirituality", emoji: "🔮", tags: ["grounding"] },
  { key: "gentle_stretches", label: "gentle stretches", emoji: "🥎", tags: ["gentle"] },
];

async function ensureSeeded() {
  const existing = await bodyActivity(prisma).count();
  if (existing > 0) return;
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

export async function GET() {
  try {
    await ensureSeeded();
    const activities = await bodyActivity(prisma).findMany({
      orderBy: { label: "asc" },
      select: { key: true, label: true, emoji: true, tags: true },
    });
    return NextResponse.json(activities);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch body activities" },
      { status: 500 },
    );
  }
}

