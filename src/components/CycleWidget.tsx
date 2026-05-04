"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { formatDateWarm } from "@/lib/cycle";

type CycleGet = {
  enabled: boolean;
  cycleDay: number | null;
  phase: { label: string; seasonHint: string } | null;
  nextPeriodExpected: string | null;
  lastPeriodStart: string | null;
};

export default function CycleWidget() {
  const { data: session } = useSession();
  const [data, setData] = useState<CycleGet | null>(null);

  useEffect(() => {
    if (!session) return;
    fetch("/api/cycle")
      .then((r) => r.json())
      .then((j: CycleGet & { error?: string }) => {
        if (j && typeof j.enabled === "boolean") setData(j);
        else setData(null);
      })
      .catch(() => setData(null));
  }, [session]);

  if (!session) return null;
  if (!data?.enabled) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-white shadow p-6 flex flex-col items-center">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-50/70 via-white to-rose-50/50"
        aria-hidden
      />
      <div className="relative flex flex-col items-center w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600/80 mb-1">
          Rhythm
        </p>
        {!data.lastPeriodStart ? (
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-[260px]">
              When you&apos;re ready, note when bleeding began — we&apos;ll meet
              you there with a soft day count, not a chart.
            </p>
            <Link
              href="/cycle"
              className="block w-full px-4 py-3 rounded-2xl bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 text-center text-lg font-medium text-purple-800 hover:from-rose-100 hover:via-purple-100 hover:to-indigo-100 transition cursor-pointer shadow"
            >
              Begin gently
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p className="font-serif text-3xl sm:text-[1.85rem] text-purple-900 leading-snug mb-1">
              {data.phase?.label ?? "—"}
            </p>
            {data.cycleDay != null && (
              <p className="text-sm text-gray-600 mb-2">
                About{" "}
                <span className="font-medium text-gray-800">
                  day {data.cycleDay}
                </span>{" "}
                of this cycle
              </p>
            )}
            {data.phase?.seasonHint && (
              <p className="text-[0.95rem] text-gray-600 text-center mb-4 leading-relaxed max-w-[280px]">
                {data.phase.seasonHint}
              </p>
            )}
            {data.nextPeriodExpected && (
              <p className="text-sm text-gray-500 mb-4">
                Next around{" "}
                <span className="font-medium text-gray-800">
                  {formatDateWarm(data.nextPeriodExpected)}
                </span>
                .
              </p>
            )}
            <Link
              href="/cycle"
              className="block w-full px-4 py-3 rounded-2xl bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 text-center text-lg font-medium text-purple-800 hover:from-rose-100 hover:via-purple-100 hover:to-indigo-100 transition cursor-pointer shadow"
            >
              Add or adjust dates
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
