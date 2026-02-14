import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "AI is not configured. Please add OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  try {
    const { action, content } = await request.json();

    if (!action || !["suggest", "polish"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use 'suggest' or 'polish'." },
        { status: 400 },
      );
    }

    if (action === "polish" && !content?.trim()) {
      return NextResponse.json(
        { error: "Content is required for polish." },
        { status: 400 },
      );
    }

    const systemPrompt =
      action === "suggest"
        ? `You are a gentle, wise companion helping someone write a daily "Note to Self" — a short reminder or pearl of wisdom they want to remember. Generate ONE brief, uplifting note (under 240 characters). Make it warm, encouraging, and easy to digest. No quotes or attribution. Examples: "Rest is part of the work." or "Today, one small step counts."`
        : `You are a helpful editor. Rewrite the user's "Note to Self" to be snappy, clear, and easy to digest. Keep it under 240 characters. Preserve their meaning and tone. Return ONLY the rewritten text, nothing else.`;

    const userContent =
      action === "suggest"
        ? "Suggest a pearl of wisdom for today's Note to Self."
        : content.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      max_tokens: 100,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "No response from AI." },
        { status: 500 },
      );
    }

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Note AI error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
