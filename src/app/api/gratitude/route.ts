import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get today's gratitude entries for the user
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const entries = await prisma.gratitudeEntry.findMany({
      where: {
        userId: session.user.email,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching gratitude entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch gratitude entries" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if gratitudeEntry model is available
    if (!prisma.gratitudeEntry) {
      console.error(
        "Prisma client missing gratitudeEntry model. Please restart the dev server.",
      );
      return NextResponse.json(
        { error: "Database model not available. Please restart the server." },
        { status: 500 },
      );
    }

    const { content } = await request.json();
    // Allow empty content - no minimum character requirement
    if (content === undefined || content === null) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }
    // Validate that content is a string
    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Content must be a string" },
        { status: 400 },
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user already has 10 entries today
    const existingEntries = await prisma.gratitudeEntry.count({
      where: {
        userId: session.user.email,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (existingEntries >= 10) {
      return NextResponse.json(
        { error: "Maximum 10 gratitude entries per day" },
        { status: 400 },
      );
    }

    // Create the gratitude entry
    const entry = await prisma.gratitudeEntry.create({
      data: {
        userId: session.user.email,
        content: content.trim(),
        date: today,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error saving gratitude entry:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    // Check if it's a table doesn't exist error
    if (
      errorMessage.includes("does not exist") ||
      errorMessage.includes("relation")
    ) {
      return NextResponse.json(
        {
          error:
            "Database table not found. Please run the migration: npm run db:migrate",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Failed to save gratitude entry", details: errorMessage },
      { status: 500 },
    );
  }
}
