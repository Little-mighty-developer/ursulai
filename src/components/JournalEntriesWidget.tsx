"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export default function JournalEntriesWidget({
  count = 0,
}: {
  count?: number;
}) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchEntries();
    }
  }, [session]);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/journal");
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
      <span className="text-lg font-semibold mb-2">Journal Entries</span>
      <span className="text-4xl font-bold text-purple-700 mb-4">
        {isLoading ? "..." : entries.length}
      </span>
      <Link
        href="/journal"
        className="block w-full mb-4 px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-center text-lg font-medium text-indigo-700 hover:bg-indigo-200 transition cursor-pointer shadow"
      >
        What's fueling your transformation story?
      </Link>
    </div>
  );
}
