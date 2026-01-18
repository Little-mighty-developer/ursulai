import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { date, valence, arousal, region, clickX, clickY, notes } =
      await req.json();

    if (
      valence === undefined ||
      arousal === undefined ||
      region === undefined
    ) {
      return NextResponse.json(
        { error: "valence, arousal, and region are required" },
        { status: 400 },
      );
    }

    const entry = await prisma.moodEntry.create({
      data: {
        userId: session.user.email,
        valence: parseFloat(valence),
        arousal: parseFloat(arousal),
        region: parseInt(region),
        clickX: clickX ? parseFloat(clickX) : null,
        clickY: clickY ? parseFloat(clickY) : null,
        notes: notes && notes.trim() ? notes.trim() : null,
        createdAt: date ? new Date(date) : new Date(),
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Failed to create mood entry:", error);
    return NextResponse.json(
      {
        error: "Failed to create mood entry",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(_req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = await prisma.moodEntry.findMany({
      where: {
        userId: session.user.email,
      },
      orderBy: { createdAt: "desc" },
      take: 100, // Limit to most recent 100 entries
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Failed to fetch mood entries:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch mood entries",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
