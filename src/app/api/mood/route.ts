import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, date, moods } = await req.json();
    // moods: [{ moodType: string, value: number }, ...]
    const entries = await prisma.$transaction(
      moods.map((mood: { moodType: string, value: number }) =>
        prisma.moodEntry.create({
          data: {
            userId,
            moodType: mood.moodType,
            value: mood.value,
            createdAt: new Date(date),
          },
        })
      )
    );
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create mood entries" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const moodType = searchParams.get("moodType");
    const userId = "test-user"; // Replace with real user logic

    const entries = await prisma.moodEntry.findMany({
      where: {
        userId,
        ...(moodType ? { moodType } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mood entries" }, { status: 500 });
  }
}
