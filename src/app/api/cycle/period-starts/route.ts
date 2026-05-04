import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  CYCLE_BACKFILL_LOOKBACK_MONTHS,
  CYCLE_BACKFILL_MAX_STARTS,
  formatISODate,
  isIsoDateOnOrBeforeToday,
  isIsoDateStrictlyInThePast,
  isIsoDateWithinRollingMonths,
  parseBulkCycleDateLines,
  parseISODateOnly,
} from "@/lib/cycle";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      startDate?: string;
      notes?: string | null;
      bulk?: string;
    };

    const email = session.user.email;

    if (typeof body.bulk === "string" && body.bulk.trim()) {
      const userRow = await prisma.user.findUnique({
        where: { email },
        include: { preferences: true },
      });
      if (!userRow?.preferences?.cycleTrackingEnabled) {
        return NextResponse.json(
          { error: "Turn on cycle tracking first." },
          { status: 403 },
        );
      }
      if (userRow.preferences.cycleBackfillOfferConsumed) {
        return NextResponse.json(
          { error: "This one-time backfill is already finished." },
          { status: 403 },
        );
      }

      const { ok, bad } = parseBulkCycleDateLines(body.bulk);

      let skippedFuture = 0;
      let skippedToday = 0;
      let skippedTooOld = 0;
      const eligible: string[] = [];
      for (const iso of ok) {
        if (!isIsoDateOnOrBeforeToday(iso)) {
          skippedFuture++;
          continue;
        }
        if (!isIsoDateStrictlyInThePast(iso)) {
          skippedToday++;
          continue;
        }
        if (
          !isIsoDateWithinRollingMonths(iso, CYCLE_BACKFILL_LOOKBACK_MONTHS)
        ) {
          skippedTooOld++;
          continue;
        }
        eligible.push(iso);
      }

      eligible.sort(
        (a, b) => parseISODateOnly(b).getTime() - parseISODateOnly(a).getTime(),
      );
      const limited = eligible.slice(0, CYCLE_BACKFILL_MAX_STARTS);
      const truncated = eligible.length > CYCLE_BACKFILL_MAX_STARTS;

      let created = 0;
      let skippedDuplicate = 0;

      await prisma.$transaction(async (tx) => {
        for (const iso of limited) {
          if (!isIsoDateStrictlyInThePast(iso)) {
            continue;
          }
          const startDate = parseISODateOnly(iso);
          const existing = await tx.cyclePeriodStart.findFirst({
            where: { userId: email, startDate },
          });
          if (existing) {
            skippedDuplicate++;
            continue;
          }
          await tx.cyclePeriodStart.create({
            data: { userId: email, startDate, notes: null },
          });
          created++;
        }
        if (created > 0) {
          await tx.userPreference.update({
            where: { userId: userRow.id },
            data: { cycleBackfillOfferConsumed: true },
          });
        }
      });

      return NextResponse.json({
        mode: "bulk" as const,
        created,
        skippedDuplicate,
        skippedFuture,
        skippedToday,
        skippedTooOld,
        invalidTokens: bad,
        truncated,
      });
    }

    if (!body.startDate || typeof body.startDate !== "string") {
      return NextResponse.json(
        { error: "startDate (YYYY-MM-DD) or bulk text is required" },
        { status: 400 },
      );
    }

    if (!isIsoDateOnOrBeforeToday(body.startDate)) {
      return NextResponse.json(
        { error: "Use today or a past date" },
        { status: 400 },
      );
    }

    let startDate: Date;
    try {
      startDate = parseISODateOnly(body.startDate);
    } catch {
      return NextResponse.json(
        { error: "Invalid startDate (use YYYY-MM-DD)" },
        { status: 400 },
      );
    }

    const existing = await prisma.cyclePeriodStart.findFirst({
      where: { userId: email, startDate },
    });
    if (existing) {
      return NextResponse.json({
        id: existing.id,
        startDate: formatISODate(existing.startDate),
        notes: existing.notes,
        deduped: true,
      });
    }

    const row = await prisma.cyclePeriodStart.create({
      data: {
        userId: email,
        startDate,
        notes:
          typeof body.notes === "string" && body.notes.trim()
            ? body.notes.trim().slice(0, 2000)
            : null,
      },
    });

    return NextResponse.json({
      id: row.id,
      startDate: formatISODate(row.startDate),
      notes: row.notes,
    });
  } catch (error) {
    console.error("POST /api/cycle/period-starts:", error);
    return NextResponse.json(
      {
        error: "Failed to log period start",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const email = session.user.email;
    const deleted = await prisma.cyclePeriodStart.deleteMany({
      where: { id, userId: email },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/cycle/period-starts:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
