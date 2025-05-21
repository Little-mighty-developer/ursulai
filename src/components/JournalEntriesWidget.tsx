"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface JournalEntry {
  id: string;
  date: string;
  mood: string[];
  text: string;
}

export default function JournalEntriesWidget({
  count = 0,
}: {
  count?: number;
}) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    // TODO: Replace with real API call
    setEntries([
      {
        id: "1",
        date: "May 20",
        mood: ["😊", "⚡️", "💙"],
        text: "Morning clarity...",
      },
      {
        id: "2",
        date: "May 19",
        mood: ["😟", "🧘‍♂️", "🪫"],
        text: "A storm passed...",
      },
      {
        id: "3",
        date: "May 18",
        mood: ["😟", "🧘‍♂️", "🪫"],
        text: "(No title)",
      },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
      <span className="text-lg font-semibold mb-2">Journal Entries</span>
      <span className="text-4xl font-bold text-purple-700 mb-4">{count}</span>
      <Link href="/journal" legacyBehavior>
        <a className="block w-full mb-4 px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-center text-lg font-medium text-indigo-700 hover:bg-indigo-200 transition cursor-pointer shadow">
          What's fueling your transformation story?
        </a>
      </Link>
      <div className="w-full">
        {entries.slice(0, 3).map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-purple-50 transition mb-1"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-semibold">
                {entry.date}
              </span>
              <span className="text-base text-gray-800 font-medium truncate max-w-[120px]">
                {entry.text}
              </span>
            </div>
            <div className="flex gap-1 text-xl">
              {entry.mood.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
