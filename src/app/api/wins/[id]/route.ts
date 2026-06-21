import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE: Remove a win (only if it belongs to the user)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const result = await prisma.win.deleteMany({
      where: { id, userId: session.user.email },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Win not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Wins API] Error deleting win:", error);
    return NextResponse.json(
      { error: "Failed to delete win" },
      { status: 500 },
    );
  }
}
