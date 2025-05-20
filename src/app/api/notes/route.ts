import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get today's note for the user
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const note = await prisma.dailyNote.findUnique({
      where: {
        userId_date: {
          userId: session.user.email,
          date: today,
        },
      },
    });

    return NextResponse.json(note || { content: "" });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Upsert the note - create if doesn't exist, update if it does
    const note = await prisma.dailyNote.upsert({
      where: {
        userId_date: {
          userId: session.user.email,
          date: today,
        },
      },
      update: {
        content,
      },
      create: {
        userId: session.user.email,
        content,
        date: today,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error saving note:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
