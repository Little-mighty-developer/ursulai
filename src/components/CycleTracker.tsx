"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
  CYCLE_BACKFILL_LOOKBACK_MONTHS,
  CYCLE_BACKFILL_MAX_STARTS,
  formatDateWarm,
  isIsoDateStrictlyInThePast,
  parseBulkCycleDateLines,
} from "@/lib/cycle";

type Phase = {
  key: string;
  label: string;
  seasonHint: string;
};

type CyclePayload = {
  enabled: boolean;
  showCycleBulkBackfill?: boolean;
  typicalCycleLength: number;
  estimatedCycleLength: number;
  lastPeriodStart: string | null;
  cycleDay: number | null;
  phase: Phase | null;
  nextPeriodExpected: string | null;
  overdueHint: string | null;
  recentStarts: { id: string; startDate: string; notes: string | null }[];
};

function localISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function minBackfillDate(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 15);
  return localISODate(d);
}

export default function CycleTracker() {
  const { data: session } = useSession();
  const [data, setData] = useState<CyclePayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(() => localISODate(new Date()));
  const [periodNote, setPeriodNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [insights, setInsights] = useState<Record<string, string> | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkFeedback, setBulkFeedback] = useState<string | null>(null);

  const maxPickerDate = localISODate(new Date());
  const minPickerDate = minBackfillDate();

  const refresh = useCallback(() => {
    if (!session) return;
    fetch("/api/cycle")
      .then((r) => {
        if (!r.ok) throw new Error("Could not load cycle data");
        return r.json();
      })
      .then((j: CyclePayload) => {
        setData(j);
        setLoadError(null);
      })
      .catch(() => setLoadError("Something went wrong loading your cycle."));
  }, [session]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logPeriod = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cycle/period-starts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          notes: periodNote.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      setStartDate(localISODate(new Date()));
      setPeriodNote("");
      refresh();
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveBulk = async () => {
    if (!bulkText.trim()) return;
    const { ok: parsedOk } = parseBulkCycleDateLines(bulkText);
    const notStrictlyPast = parsedOk.filter(
      (iso) => !isIsoDateStrictlyInThePast(iso),
    );
    if (notStrictlyPast.length > 0) {
      setLoadError(
        `Backfill only accepts dates before today (not today or the future). Use the calendar form above for today. Remove: ${notStrictlyPast.join(", ")}`,
      );
      return;
    }
    setBulkSaving(true);
    setBulkFeedback(null);
    setLoadError(null);
    try {
      const res = await fetch("/api/cycle/period-starts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulk: bulkText }),
      });
      const j = (await res.json().catch(() => ({}))) as {
        mode?: string;
        created?: number;
        skippedDuplicate?: number;
        skippedFuture?: number;
        skippedToday?: number;
        skippedTooOld?: number;
        invalidTokens?: string[];
        truncated?: boolean;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(j.error || "Bulk save failed");
      }
      if (j.mode !== "bulk") {
        throw new Error("Unexpected response");
      }
      const parts: string[] = [];
      parts.push(`Saved ${j.created ?? 0} new date(s).`);
      if (j.skippedDuplicate)
        parts.push(`${j.skippedDuplicate} were already on your list.`);
      if (j.skippedFuture)
        parts.push(`${j.skippedFuture} future date(s) skipped.`);
      if (j.skippedToday)
        parts.push(
          `${j.skippedToday} were today — use the form above for today.`,
        );
      if (j.skippedTooOld)
        parts.push(
          `${j.skippedTooOld} older than ${CYCLE_BACKFILL_LOOKBACK_MONTHS} months skipped.`,
        );
      if (j.invalidTokens?.length) {
        const sample = j.invalidTokens.slice(0, 4).join(", ");
        parts.push(
          `Could not read: ${sample}${j.invalidTokens.length > 4 ? "…" : ""} (use yyyy-mm-dd).`,
        );
      }
      if (j.truncated)
        parts.push(
          `Kept the ${CYCLE_BACKFILL_MAX_STARTS} most recent starts from your list.`,
        );
      setBulkFeedback(parts.join(" "));
      setBulkText("");
      refresh();
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Bulk save failed");
    } finally {
      setBulkSaving(false);
    }
  };

  const dismissBulkOffer = async () => {
    setLoadError(null);
    try {
      const res = await fetch("/api/cycle", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cycleBackfillOfferConsumed: true }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not save preference");
      }
      setBulkText("");
      setBulkFeedback(null);
      refresh();
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  const removeStart = async (id: string) => {
    if (!confirm("Remove this period start?")) return;
    const res = await fetch(
      `/api/cycle/period-starts?id=${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      setLoadError("Could not delete that entry.");
      return;
    }
    refresh();
  };

  const fetchInsights = async () => {
    setInsightLoading(true);
    setInsightError(null);
    setInsights(null);
    try {
      const res = await fetch("/api/cycle/insights", { method: "POST" });
      const j = await res.json();
      if (j.crisisSupport) {
        setInsightError(j.message);
        return;
      }
      if (!res.ok) {
        setInsightError(j.error || "Insights unavailable.");
        return;
      }
      setInsights(j);
    } catch {
      setInsightError("Could not load insights.");
    } finally {
      setInsightLoading(false);
    }
  };

  if (!session) return null;

  if (!data?.enabled) {
    return (
      <div className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto text-center">
        <p className="text-gray-700 mb-4 leading-relaxed">
          This space is resting. Turn it on in{" "}
          <a
            href="/profile"
            className="text-purple-700 underline font-medium decoration-purple-300 underline-offset-2 hover:text-purple-800"
          >
            Profile
          </a>{" "}
          whenever you want it.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow p-8 max-w-2xl mx-auto">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-50/60 via-transparent to-rose-50/40"
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-6 relative">
          <h2 className="font-serif text-2xl sm:text-[1.65rem] text-center text-gray-800">
            Your cycle log
          </h2>
          <div className="relative">
            <button
              type="button"
              className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-600"
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
              onClick={() => setShowTip(!showTip)}
              aria-label="About cycle tracking"
            >
              <span className="text-sm font-semibold">?</span>
            </button>
            {showTip && (
              <div className="absolute top-full right-0 mt-2 w-80 p-5 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50">
                <p className="mb-2">
                  This is optional, private, and approximate — phases here use a
                  simple calendar model, not medical testing.
                </p>
                {data.showCycleBulkBackfill ? (
                  <p className="mb-2">
                    A one-time box below accepts only <strong>past</strong>{" "}
                    start dates (before today); use the calendar for today. Up
                    to {CYCLE_BACKFILL_MAX_STARTS} dates in the last{" "}
                    {CYCLE_BACKFILL_LOOKBACK_MONTHS} months, or skip it.
                  </p>
                ) : null}
                <p className="mb-2">
                  Over time you can log period starts, PCOS or cycle notes in
                  your journal, and symptoms in the dashboard widget; gentle
                  insights use what you actually record.
                </p>
                <p className="text-amber-200 font-medium">
                  Nothing is scored or compared to other people.
                </p>
              </div>
            )}
          </div>
        </div>

        {loadError && (
          <p className="text-red-600 text-sm text-center mb-4">{loadError}</p>
        )}

        {data.lastPeriodStart ? (
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600/80 mb-2">
              Right now
            </p>
            <p className="font-serif text-3xl text-purple-900 leading-snug">
              {data.phase?.label ?? "—"}
            </p>
            {data.cycleDay != null && (
              <p className="text-base text-gray-600 mt-1">
                About day {data.cycleDay} of this cycle
              </p>
            )}
            {data.phase?.seasonHint && (
              <p className="text-gray-600 mt-3 max-w-md mx-auto leading-relaxed text-[0.95rem]">
                {data.phase.seasonHint}
              </p>
            )}
            {data.nextPeriodExpected && (
              <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
                Next around{" "}
                <span className="font-medium text-gray-800">
                  {formatDateWarm(data.nextPeriodExpected)}
                </span>
                .
              </p>
            )}
            {data.overdueHint && (
              <p className="text-sm text-amber-900 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mt-4 max-w-md mx-auto leading-relaxed">
                {data.overdueHint}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
            Jot the first day of your most recent bleed. You can tweak the list
            below if your thumb slips.
          </p>
        )}

        <div className="border border-gray-100 rounded-xl bg-purple-50/30 p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First day of bleeding
          </label>
          <p className="text-xs text-gray-500 mb-3 max-w-md mx-auto text-center leading-relaxed">
            Choose any past date (or today) — fine for catching up old cycles.
          </p>
          <div className="flex flex-col gap-3 items-stretch max-w-md mx-auto">
            <input
              type="date"
              min={minPickerDate}
              max={maxPickerDate}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 w-full bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <textarea
              value={periodNote}
              onChange={(e) => setPeriodNote(e.target.value)}
              placeholder="Optional: e.g. spotting, PCOS flare, travel — for you only"
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <button
              type="button"
              disabled={saving}
              onClick={logPeriod}
              className="px-5 py-3 rounded-xl w-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 shadow-md transition"
            >
              {saving ? "Saving…" : "Save this start date"}
            </button>
          </div>
        </div>

        {data.showCycleBulkBackfill ? (
          <div className="border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-800 mb-1 text-center">
              One-time backfill
            </h3>
            <p className="text-xs text-gray-500 mb-3 text-center leading-relaxed max-w-md mx-auto">
              Only shown once. Each line must be a{" "}
              <code className="text-[11px] bg-white px-1 rounded">
                yyyy-mm-dd
              </code>{" "}
              <strong>before today</strong> (use the calendar above if bleeding
              started today). Within the last {CYCLE_BACKFILL_LOOKBACK_MONTHS}{" "}
              months only; up to {CYCLE_BACKFILL_MAX_STARTS} dates. Duplicates
              are skipped.
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => {
                setBulkText(e.target.value);
                setBulkFeedback(null);
              }}
              placeholder={"2024-01-06\n2024-02-01\n2024-03-02"}
              rows={5}
              className="w-full max-w-md mx-auto block border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 bg-white font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            />
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <button
                type="button"
                disabled={bulkSaving || !bulkText.trim()}
                onClick={saveBulk}
                className="px-4 py-2 rounded-lg border border-purple-200 bg-white text-sm font-medium text-purple-800 hover:bg-purple-50 disabled:opacity-50"
              >
                {bulkSaving ? "Adding…" : "Add all from list"}
              </button>
              <button
                type="button"
                disabled={bulkSaving}
                onClick={dismissBulkOffer}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Skip — I&apos;ll add dates myself
              </button>
            </div>
            {bulkFeedback && (
              <p className="text-xs text-gray-600 mt-3 text-center max-w-md mx-auto leading-relaxed">
                {bulkFeedback}
              </p>
            )}
          </div>
        ) : null}

        {data.recentStarts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Dates you&apos;ve saved
            </h3>
            <ul className="space-y-2">
              {data.recentStarts.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-2 text-sm bg-gray-50 border border-gray-100 rounded-lg px-3 py-2"
                >
                  <span className="text-gray-700">
                    {formatDateWarm(row.startDate)}
                    {row.notes ? (
                      <span className="text-gray-500"> — {row.notes}</span>
                    ) : null}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStart(row.id)}
                    className="text-purple-700 hover:text-purple-900 text-sm shrink-0 underline decoration-purple-300 underline-offset-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-serif text-lg text-gray-800 mb-2 text-center">
            Gentle insights
          </h3>
          <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed max-w-md mx-auto">
            Pulled from your dates, moods, symptom toggles, and journals — not
            textbook cycle talk.
          </p>
          <div className="flex justify-center mb-4">
            <button
              type="button"
              disabled={insightLoading}
              onClick={fetchInsights}
              className="px-5 py-2 rounded-xl border border-purple-200 bg-white text-purple-800 font-medium hover:bg-purple-50 disabled:opacity-50 transition"
            >
              {insightLoading ? "Gathering threads…" : "Gather gentle insights"}
            </button>
          </div>
          {insightError && (
            <p className="text-sm text-center text-red-600 mb-2">
              {insightError}
            </p>
          )}
          {insights && (
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              {insights.summary && (
                <p>
                  <span className="font-medium text-gray-900">Summary · </span>
                  {insights.summary}
                </p>
              )}
              {insights.movement && (
                <p>
                  <span className="font-medium text-gray-900">Movement · </span>
                  {insights.movement}
                </p>
              )}
              {insights.solitude && (
                <p>
                  <span className="font-medium text-gray-900">
                    Space & boundaries ·{" "}
                  </span>
                  {insights.solitude}
                </p>
              )}
              {insights.cravings && (
                <p>
                  <span className="font-medium text-gray-900">Cravings · </span>
                  {insights.cravings}
                </p>
              )}
              {insights.seasonPrep && (
                <p>
                  <span className="font-medium text-gray-900">
                    Your season prep ·{" "}
                  </span>
                  {insights.seasonPrep}
                </p>
              )}
              {insights.disclaimer && (
                <p className="text-xs text-gray-500 pt-2">
                  {insights.disclaimer}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
