import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path as needed

// Example in-memory user activity data (replace with your DB logic)
const userActivity: Record<
  string,
  { checkin?: boolean; mood?: boolean; reminder?: boolean; journal?: boolean }
> = {
  "2024-05-10": { checkin: true },
  "2024-05-11": { checkin: true, mood: true },
  "2024-05-12": { checkin: true, mood: true, reminder: true, journal: true },
  // ...more dates
};

// Function to determine engagement level
function getEngagementLevel(activity: {
  checkin?: boolean;
  mood?: boolean;
  reminder?: boolean;
  journal?: boolean;
}) {
  if (
    activity.journal &&
    activity.mood &&
    activity.reminder &&
    activity.checkin
  )
    return 3; // High
  if ((activity.mood || activity.reminder) && activity.checkin) return 2; // Medium
  if (activity.checkin) return 1; // Low
  return 0; // No engagement
}

// GET: Return engagement by date
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const userId = "test-user"; // Replace with real user logic later

    const entries = await prisma.engagement.findMany({
      where: {
        userId,
        ...(date ? { date: new Date(date) } : {}),
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    // Return more detailed error information
    return NextResponse.json(
      {
        error: "Failed to fetch entries",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST: Save engagement for today
export async function POST(req: Request) {
  try {
    const { date, checkin, mood, reminder, journal } = await req.json();
    const userId = "test-user"; // Replace with real user logic later

    const entry = await prisma.engagement.upsert({
      where: {
        userId_date: {
          userId,
          date: new Date(date),
        },
      },
      update: {
        checkin: checkin ?? false,
        mood: mood ?? false,
        reminder: reminder ?? false,
        journal: journal ?? false,
      },
      create: {
        userId,
        date: new Date(date),
        checkin: checkin ?? false,
        mood: mood ?? false,
        reminder: reminder ?? false,
        journal: journal ?? false,
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
