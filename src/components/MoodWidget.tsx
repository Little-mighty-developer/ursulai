"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MoodWidget() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
      <span className="text-lg font-semibold mb-2">Mood check-in</span>
      <span className="text-4xl font-bold text-purple-700 mb-4">😊</span>
      <Link
        href="/mood"
        className="block w-full mb-4 px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-center text-lg font-medium text-indigo-700 hover:bg-indigo-200 transition cursor-pointer shadow"
      >
        Track your mood
      </Link>
    </div>
  );
}

