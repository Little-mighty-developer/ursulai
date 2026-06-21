import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch all wins for the user (newest first)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wins = await prisma.win.findMany({
      where: { userId: session.user.email },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(wins);
  } catch (error) {
    console.error("[Wins API] Error fetching wins:", error);
    return NextResponse.json(
      { error: "Failed to fetch wins" },
      { status: 500 },
    );
  }
}

// POST: Record a new win
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const win = await prisma.win.create({
      data: {
        userId: session.user.email,
        content: content.trim(),
      },
    });

    return NextResponse.json(win);
  } catch (error) {
    console.error("[Wins API] Error creating win:", error);
    return NextResponse.json(
      { error: "Failed to create win" },
      { status: 500 },
    );
  }
}
