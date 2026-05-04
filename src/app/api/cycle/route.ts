import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  addDaysUTC,
  averageCycleLengthFromStarts,
  clampCycleLength,
  currentCycleDay,
  formatISODate,
  getCyclePhase,
} from "@/lib/cycle";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { preferences: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const prefs = user.preferences;
    const enabled = prefs?.cycleTrackingEnabled ?? false;
    const typicalCycleLength = clampCycleLength(
      prefs?.typicalCycleLength ?? 28,
    );
    const showCycleBulkBackfill =
      enabled && !(prefs?.cycleBackfillOfferConsumed ?? false);

    const starts = await prisma.cyclePeriodStart.findMany({
      where: { userId: email },
      orderBy: { startDate: "desc" },
      take: 24,
    });

    const startDates = starts.map((s) => s.startDate);
    const estimatedCycleLength = averageCycleLengthFromStarts(
      startDates,
      typicalCycleLength,
    );

    const lastStart = starts[0]?.startDate ?? null;
    const today = new Date();

    let cycleDay: number | null = null;
    let phase = null;
    let nextPeriodExpected: string | null = null;
    let overdueHint: string | null = null;

    if (lastStart) {
      cycleDay = currentCycleDay(lastStart, today);
      phase = getCyclePhase(cycleDay, estimatedCycleLength);
      nextPeriodExpected = formatISODate(
        addDaysUTC(lastStart, estimatedCycleLength),
      );
      if (cycleDay > estimatedCycleLength + 2) {
        overdueHint =
          "Past your usual window? Log the new start when it arrives to reset.";
      }
    }

    return NextResponse.json({
      enabled,
      showCycleBulkBackfill,
      typicalCycleLength,
      estimatedCycleLength,
      lastPeriodStart: lastStart ? formatISODate(lastStart) : null,
      cycleDay,
      phase,
      nextPeriodExpected,
      overdueHint,
      recentStarts: starts.map((s) => ({
        id: s.id,
        startDate: formatISODate(s.startDate),
        notes: s.notes,
      })),
    });
  } catch (error) {
    console.error("GET /api/cycle:", error);
    return NextResponse.json(
      {
        error: "Failed to load cycle data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      cycleTrackingEnabled?: boolean;
      typicalCycleLength?: number;
      cycleBackfillOfferConsumed?: boolean;
    };

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data: {
      cycleTrackingEnabled?: boolean;
      typicalCycleLength?: number;
      cycleBackfillOfferConsumed?: boolean;
    } = {};

    if (typeof body.cycleTrackingEnabled === "boolean") {
      data.cycleTrackingEnabled = body.cycleTrackingEnabled;
    }
    if (body.typicalCycleLength !== undefined) {
      data.typicalCycleLength = clampCycleLength(
        Number(body.typicalCycleLength),
      );
    }
    if (typeof body.cycleBackfillOfferConsumed === "boolean") {
      data.cycleBackfillOfferConsumed = body.cycleBackfillOfferConsumed;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    const keys = Object.keys(data);
    if (keys.length === 1 && data.cycleBackfillOfferConsumed !== undefined) {
      const updated = await prisma.userPreference.updateMany({
        where: { userId: user.id },
        data: { cycleBackfillOfferConsumed: data.cycleBackfillOfferConsumed },
      });
      if (updated.count === 0) {
        return NextResponse.json(
          { error: "Save cycle settings on your profile first." },
          { status: 400 },
        );
      }
      return NextResponse.json({ ok: true });
    }

    await prisma.userPreference.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        intentions: [],
        cycleTrackingEnabled: data.cycleTrackingEnabled ?? false,
        typicalCycleLength: data.typicalCycleLength ?? clampCycleLength(28),
        cycleBackfillOfferConsumed: data.cycleBackfillOfferConsumed ?? false,
      },
      update: data,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/cycle:", error);
    return NextResponse.json(
      {
        error: "Failed to update cycle settings",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
