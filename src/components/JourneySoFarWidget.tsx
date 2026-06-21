"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface JourneySummary {
  eligible: boolean;
  stats: {
    wins: number;
    journalEntries: number;
    gratitudeMoments: number;
    photos: number;
  };
  latestWin: { id: string; content: string; date: string } | null;
}

function StatRow({
  icon,
  iconBg,
  count,
  label,
}: {
  icon: string;
  iconBg: string;
  count: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <span className="text-2xl font-bold text-gray-800 w-8 text-center shrink-0">
        {count}
      </span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}

// Only appears once the user has 3+ journal entries (eligibility from the API)
export default function JourneySoFarWidget() {
  const { data: session } = useSession();
  const [summary, setSummary] = useState<JourneySummary | null>(null);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/journey/summary?period=week");
        if (res.ok) setSummary(await res.json());
      } catch (error) {
        console.error("[JourneySoFarWidget] Error fetching summary:", error);
      }
    };
    fetchSummary();
  }, [session]);

  if (!session || !summary?.eligible) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col w-full">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-semibold leading-tight text-gray-900 flex items-center gap-2">
          <span>🌱</span> The Journey So Far
        </h2>
        <span className="text-lg" aria-hidden>
          🐾
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-gray-400 shrink-0">This week</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <StatRow
          icon="⭐"
          iconBg="bg-purple-100"
          count={summary.stats.wins}
          label={summary.stats.wins === 1 ? "win recorded" : "wins recorded"}
        />
        <StatRow
          icon="📕"
          iconBg="bg-pink-100"
          count={summary.stats.journalEntries}
          label={
            summary.stats.journalEntries === 1
              ? "journal entry"
              : "journal entries"
          }
        />
        <StatRow
          icon="💛"
          iconBg="bg-amber-100"
          count={summary.stats.gratitudeMoments}
          label={
            summary.stats.gratitudeMoments === 1
              ? "gratitude moment"
              : "gratitude moments"
          }
        />
      </div>

      {summary.latestWin && (
        <div className="mb-5">
          <div className="text-sm text-gray-500 mb-2">Latest footprint:</div>
          <div className="flex items-center gap-3 bg-purple-50 rounded-2xl px-4 py-3">
            <span className="text-base shrink-0">✨</span>
            <span className="text-sm text-gray-700">
              {summary.latestWin.content}
            </span>
          </div>
        </div>
      )}

      <Link
        href="/journey"
        className="block w-full px-4 py-3 rounded-2xl border border-purple-200 text-center text-sm font-semibold text-purple-700 hover:bg-purple-50 transition"
      >
        Open Journey
      </Link>
    </div>
  );
}
