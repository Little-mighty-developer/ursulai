import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Photos are stored as downscaled base64 data URLs; keep them reasonably small.
const MAX_DATA_URL_LENGTH = 2_500_000; // ~1.8MB of image data

// GET: Fetch all progress photos for the user (newest first)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const photos = await prisma.progressPhoto.findMany({
      where: { userId: session.user.email },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("[Photos API] Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}

// POST: Add a new progress photo
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { dataUrl, caption } = await req.json();
    if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "A valid image is required" },
        { status: 400 },
      );
    }
    if (dataUrl.length > MAX_DATA_URL_LENGTH) {
      return NextResponse.json(
        { error: "Image is too large" },
        { status: 413 },
      );
    }

    const photo = await prisma.progressPhoto.create({
      data: {
        userId: session.user.email,
        dataUrl,
        caption: caption?.trim() || null,
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error("[Photos API] Error creating photo:", error);
    return NextResponse.json(
      { error: "Failed to save photo" },
      { status: 500 },
    );
  }
}
