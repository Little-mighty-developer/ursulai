import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, symptomKey, eventType, timestamp } = await req.json();
    if (!userId || !symptomKey || !eventType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
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
    return NextResponse.json(
      { error: "Failed to log symptom event" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const activeOnly = searchParams.get("activeOnly") === "true";
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    if (activeOnly) {
      // Get all events for the user, ordered by symptomKey and timestamp desc
      const events = await prisma.symptomEvent.findMany({
        where: { userId },
        orderBy: [{ symptomKey: "asc" }, { timestamp: "desc" }],
      });
      // Find the latest event for each symptomKey
      const latestBySymptom: { [key: string]: any } = {};
      for (const event of events) {
        if (!latestBySymptom[event.symptomKey]) {
          latestBySymptom[event.symptomKey] = event;
        }
      }
      // Only return symptomKeys where the latest event is 'on'
      const activeSymptoms = Object.entries(latestBySymptom)
        .filter(([_, event]) => event.eventType === "on")
        .map(([symptomKey]) => symptomKey);
      return NextResponse.json(activeSymptoms);
    } else {
      const events = await prisma.symptomEvent.findMany({
        where: { userId },
        orderBy: { timestamp: "desc" },
      });
      return NextResponse.json(events);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch symptom events" },
      { status: 500 },
    );
  }
}
