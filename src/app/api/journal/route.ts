import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch journal entries for the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log(
      "[Journal API] Session:",
      session ? "exists" : "null",
      session?.user,
    );

    if (!session?.user?.email) {
      console.log("[Journal API] No session or email found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    console.log("[Journal API] Fetching entries for user:", userEmail);

    try {
      // First, let's check if there are any entries at all
      const allEntries = await prisma.journalEntry.findMany({
        take: 5,
      });
      console.log("[Journal API] Total entries in DB:", allEntries.length);
      if (allEntries.length > 0) {
        console.log("[Journal API] Sample entry userId:", allEntries[0].userId);
        console.log("[Journal API] User email from session:", userEmail);
        console.log(
          "[Journal API] Match check:",
          allEntries[0].userId === userEmail,
        );
      }

      const entries = await prisma.journalEntry.findMany({
        where: {
          userId: userEmail,
        },
        orderBy: {
          date: "desc",
        },
        take: 10, // Limit to last 10 entries
      });

      console.log("[Journal API] Found entries for user:", entries.length);
      return NextResponse.json(entries);
    } catch (dbError) {
      console.error("[Journal API] Database error:", dbError);
      throw dbError;
    }
  } catch (error) {
    console.error("[Journal API] Error fetching entries:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("[Journal API] Error details:", { errorMessage, errorStack });

    return NextResponse.json(
      {
        error: "Failed to fetch entries",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}

// POST: Create a new journal entry
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const { content } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const now = new Date(); // Use the actual current date and time

    console.log("[Journal API] Creating entry for user:", userEmail);
    console.log("[Journal API] Content length:", content.trim().length);

    // Create the journal entry
    const entry = await prisma.journalEntry.create({
      data: {
        userId: userEmail,
        content: content.trim(),
        date: now,
      },
    });

    console.log(
      "[Journal API] Entry created with ID:",
      entry.id,
      "userId:",
      entry.userId,
    );
    return NextResponse.json(entry);
  } catch (error) {
    console.error("[Journal API] Error creating entry:", error);
    return NextResponse.json(
      {
        error: "Failed to create entry",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
