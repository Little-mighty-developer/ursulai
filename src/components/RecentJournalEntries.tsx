"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

function getPreview(text: string): string {
  // Get first sentence
  const sentenceMatch = text.match(/.*?[.!?](\s|$)/);
  const firstSentence = sentenceMatch ? sentenceMatch[0].trim() : text;
  // Get first 8 words
  const words = text.split(/\s+/).slice(0, 8).join(" ");
  // Return whichever is shorter
  return firstSentence.length <= words.length
    ? firstSentence
    : words + (text.split(/\s+/).length > 8 ? "..." : "");
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => setEntries(data.slice(0, 3))) // API returns most recent first
      .catch(() => setEntries([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return <div className="mt-8 text-gray-400">Loading recent entries...</div>;
  if (!entries.length) return null;

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-semibold flex-1">Recent Entries</h3>
        <Link
          href="/journal/history"
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          See all
        </Link>
      </div>
      <div className="space-y-2">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            href="/journal/history"
            className="block bg-gray-50 rounded-xl p-4 shadow hover:bg-indigo-50 transition"
            title="Go to journal history"
          >
            <div className="text-xs text-gray-500 mb-1">
              {formatDateTime(entry.date)}
            </div>
            <div className="text-gray-800">{getPreview(entry.content)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
