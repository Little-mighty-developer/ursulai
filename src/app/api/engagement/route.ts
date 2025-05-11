import { NextResponse } from "next/server";

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

export async function GET() {
  // Build engagementByDate object
  const engagementByDate: Record<string, number> = {};
  for (const [date, activity] of Object.entries(userActivity)) {
    const level = getEngagementLevel(activity);
    if (level > 0) engagementByDate[date] = level;
  }

  return NextResponse.json(engagementByDate);
}
