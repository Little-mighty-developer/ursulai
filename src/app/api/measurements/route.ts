import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch all measurements for the user (newest first)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const measurements = await prisma.measurement.findMany({
      where: { userId: session.user.email },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(measurements);
  } catch (error) {
    console.error("[Measurements API] Error fetching measurements:", error);
    return NextResponse.json(
      { error: "Failed to fetch measurements" },
      { status: 500 },
    );
  }
}

// POST: Add a new measurement
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { label, value, unit } = await req.json();
    const numericValue = Number(value);
    if (!label?.trim() || !Number.isFinite(numericValue)) {
      return NextResponse.json(
        { error: "A label and numeric value are required" },
        { status: 400 },
      );
    }

    const measurement = await prisma.measurement.create({
      data: {
        userId: session.user.email,
        label: label.trim(),
        value: numericValue,
        unit: unit?.trim() || null,
      },
    });

    return NextResponse.json(measurement);
  } catch (error) {
    console.error("[Measurements API] Error creating measurement:", error);
    return NextResponse.json(
      { error: "Failed to save measurement" },
      { status: 500 },
    );
  }
}
