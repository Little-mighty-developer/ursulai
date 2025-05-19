import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, symptomKey, eventType, timestamp } = await req.json();
    if (!userId || !symptomKey || !eventType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const event = await prisma.symptomEvent.create({
      data: {
        userId,
        symptomKey,
        eventType,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Failed to log symptom event" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const events = await prisma.symptomEvent.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch symptom events" }, { status: 500 });
  }
} 