import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type BodyActivityLogDelegate = {
  create: (args: {
    data: {
      userId: string;
      activityKey: string;
      activityLabel: string;
      activityEmoji: string | null;
      symptomKeys: string[];
      skipped: boolean;
      createdAt: Date;
    };
  }) => Promise<unknown>;
};

function bodyActivityLog(prismaClient: unknown): BodyActivityLogDelegate {
  return (
    prismaClient as unknown as { bodyActivityLog: BodyActivityLogDelegate }
  ).bodyActivityLog;
}

export async function POST(req: Request) {
  try {
    const {
      userId,
      activityKey,
      activityLabel,
      activityEmoji,
      symptomKeys,
      skipped,
      timestamp,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const createdAt = timestamp ? new Date(timestamp) : new Date();

    const log = await bodyActivityLog(prisma).create({
      data: {
        userId,
        activityKey: activityKey ?? "skip",
        activityLabel: activityLabel ?? "Skipped",
        activityEmoji: activityEmoji ?? null,
        symptomKeys: Array.isArray(symptomKeys) ? symptomKeys : [],
        skipped: !!skipped,
        createdAt,
      },
    });

    return NextResponse.json(log);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to log body activity" },
      { status: 500 },
    );
  }
}
