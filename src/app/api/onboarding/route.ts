import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      intentions?: string[];
      energyPreference?: string;
      checkInStyle?: string;
      trackingPreference?: string;
    };
    const {
      intentions = [],
      energyPreference,
      checkInStyle,
      trackingPreference,
    } = body;

    const now = new Date();
    const hasPreferences =
      (Array.isArray(intentions) && intentions.length > 0) ||
      energyPreference ||
      checkInStyle ||
      trackingPreference;

    await prisma.user.update({
      where: { id: user.id },
      data: { onboardingCompletedAt: now },
    });

    if (hasPreferences) {
      await prisma.userPreference.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          intentions: Array.isArray(intentions) ? intentions : [],
          energyPreference: energyPreference || null,
          checkInStyle: checkInStyle || null,
          trackingPreference: trackingPreference || null,
        },
        update: {
          intentions: Array.isArray(intentions) ? intentions : [],
          energyPreference: energyPreference || null,
          checkInStyle: checkInStyle || null,
          trackingPreference: trackingPreference || null,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save onboarding:", error);
    return NextResponse.json(
      {
        error: "Failed to save preferences",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { preferences: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      onboardingCompleted: !!user.onboardingCompletedAt,
      preferences: user.preferences,
    });
  } catch (error) {
    console.error("Failed to fetch onboarding status:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
