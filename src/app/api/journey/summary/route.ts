import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// The Journey page/widget unlocks once the user has journalled this many times.
const ELIGIBILITY_THRESHOLD = 3;

type Period = "week" | "month" | "all";

function periodStart(period: Period): Date | undefined {
  const now = new Date();
  if (period === "week") {
    // Week starts on Monday
    const day = now.getDay();
    const diff = (day + 6) % 7;
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setDate(start.getDate() - diff);
    return start;
  }
  if (period === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return undefined;
}

// GET: Aggregate journey stats for a period + eligibility + latest win
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.email;
    const { searchParams } = new URL(req.url);
    const periodParam = searchParams.get("period");
    const period: Period =
      periodParam === "month" || periodParam === "all" ? periodParam : "week";

    const since = periodStart(period);
    const dateFilter = since ? { gte: since } : undefined;

    const [
      totalJournalEntries,
      wins,
      journalEntries,
      gratitudeMoments,
      photos,
      latestWin,
    ] = await Promise.all([
      prisma.journalEntry.count({ where: { userId } }),
      prisma.win.count({ where: { userId, date: dateFilter } }),
      prisma.journalEntry.count({ where: { userId, date: dateFilter } }),
      prisma.gratitudeEntry.count({ where: { userId, date: dateFilter } }),
      prisma.progressPhoto.count({ where: { userId, date: dateFilter } }),
      prisma.win.findFirst({
        where: { userId },
        orderBy: { date: "desc" },
        select: { id: true, content: true, date: true },
      }),
    ]);

    return NextResponse.json({
      eligible: totalJournalEntries >= ELIGIBILITY_THRESHOLD,
      totalJournalEntries,
      threshold: ELIGIBILITY_THRESHOLD,
      period,
      stats: { wins, journalEntries, gratitudeMoments, photos },
      latestWin,
    });
  } catch (error) {
    console.error("[Journey API] Error building summary:", error);
    return NextResponse.json(
      { error: "Failed to load journey summary" },
      { status: 500 },
    );
  }
}
