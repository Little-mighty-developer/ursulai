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
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: session.user.email,
        date: { gte: sevenDaysAgo },
      },
      select: { date: true },
    });

    const uniqueDates = new Set(
      entries.map((e) => e.date.toISOString().slice(0, 10)),
    );
    const uniqueDays = uniqueDates.size;
    const eligible = uniqueDays >= 1;

    return NextResponse.json({ eligible, uniqueDays });
  } catch (error) {
    console.error("Reflection eligibility error:", error);
    return NextResponse.json(
      { error: "Failed to check eligibility" },
      { status: 500 },
    );
  }
}
