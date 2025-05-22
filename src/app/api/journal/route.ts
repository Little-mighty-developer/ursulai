import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch journal entries for the user
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: session.user.email,
      },
      orderBy: {
        date: "desc",
      },
      take: 10, // Limit to last 10 entries
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch entries",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST: Create a new journal entry
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create the journal entry
    const entry = await prisma.journalEntry.create({
      data: {
        userId: session.user.email,
        content: content.trim(),
        date: today,
      },
    });

    // Update engagement tracking
    await prisma.engagement.upsert({
      where: {
        userId_date: {
          userId: session.user.email,
          date: today,
        },
      },
      update: {
        journal: true,
      },
      create: {
        userId: session.user.email,
        date: today,
        login: true,
        checkin: true,
        mood: false,
        reminder: false,
        journal: true,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      {
        error: "Failed to create entry",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
} 