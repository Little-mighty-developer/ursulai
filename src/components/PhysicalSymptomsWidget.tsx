"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

type Suggestion = { key: string; label: string; emoji?: string | null };

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const LAST_BODY_CHECKIN_AT_KEY = "ursulai:lastBodyCheckinAt";

export default function PhysicalSymptomsWidget() {
  const { data: session } = useSession();
  const userId = session?.user?.email;
  const [lastBodyCheckinAt, setLastBodyCheckinAt] = useState<Date | null>(null);
  const [activeSymptoms, setActiveSymptoms] = useState<string[]>([]);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [acknowledgement, setAcknowledgement] = useState("");
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSupportedToast, setShowSupportedToast] = useState(false);

  if (!session) return null;

  useEffect(() => {
    if (!userId) return;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const readLocal = () => {
      try {
        const raw =
          typeof window !== "undefined" && window.localStorage
            ? window.localStorage.getItem(LAST_BODY_CHECKIN_AT_KEY)
            : null;
        const ts = raw ? new Date(raw) : null;
        if (!ts || Number.isNaN(ts.getTime())) {
          setLastBodyCheckinAt(null);
          return;
        }

        setLastBodyCheckinAt(ts);

        const remaining = TWO_HOURS_MS - (Date.now() - ts.getTime());
        if (hideTimer) clearTimeout(hideTimer);
        if (remaining > 0) {
          hideTimer = setTimeout(() => {
            setLastBodyCheckinAt((current) => {
              if (!current) return null;
              return Date.now() - current.getTime() >= TWO_HOURS_MS
                ? null
                : current;
            });
          }, remaining + 250);
        }
      } catch {
        setLastBodyCheckinAt(null);
      }
    };

    readLocal();
    const onStorage = (e: StorageEvent) => {
      if (e.key === LAST_BODY_CHECKIN_AT_KEY) readLocal();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [userId]);

  const hasRecentBodyCheckin =
    !!lastBodyCheckinAt &&
    Date.now() - lastBodyCheckinAt.getTime() < TWO_HOURS_MS;

  const symptomSnapshotForSuggestions = useMemo(
    () => activeSymptoms,
    [activeSymptoms],
  );

  const openSupport = async () => {
    if (!userId) return;
    setIsSupportOpen(true);
    setLoadingSuggestions(true);
    setAcknowledgement("");
    try {
      const activeRes = await fetch(
        `/api/symptoms?userId=${encodeURIComponent(userId)}&activeOnly=true`,
      );
      const active = activeRes.ok ? await activeRes.json() : [];
      const keys = Array.isArray(active) ? active : [];
      setActiveSymptoms(keys);

      const suggestRes = await fetch("/api/body-support/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptomKeys: keys }),
      });
      const suggestJson = suggestRes.ok ? await suggestRes.json() : null;
      setAcknowledgement(
        typeof suggestJson?.acknowledgement === "string"
          ? suggestJson.acknowledgement
          : "",
      );
      const sugg = suggestJson?.suggestions;
      setSuggestions(Array.isArray(sugg) ? sugg : []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const logChoice = async (choice: Suggestion | null) => {
    if (!userId) return;
    try {
      await fetch("/api/body-support/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          activityKey: choice?.key,
          activityLabel: choice?.label,
          activityEmoji: choice?.emoji ?? null,
          symptomKeys: symptomSnapshotForSuggestions,
          skipped: choice === null,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // keep it soft: no error UI
    } finally {
      setIsSupportOpen(false);
      setShowSupportedToast(true);
      setTimeout(() => setShowSupportedToast(false), 1200);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full relative">
      <h2 className="mb-2 text-base font-semibold leading-tight text-center text-gray-900">
        🌿 Body Check-in
      </h2>
      <span className="text-4xl font-bold text-purple-700 mb-4">🏥</span>
      <Link
        href="/symptoms"
        className="block w-full mb-4 px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-center text-lg font-medium text-indigo-700 hover:bg-indigo-200 transition cursor-pointer shadow"
      >
        Tune into your body
      </Link>

      {hasRecentBodyCheckin && (
        <button
          type="button"
          onClick={openSupport}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium text-center py-1"
        >
          ✨ How would you like to support your body right now?
        </button>
      )}

      {showSupportedToast && (
        <div className="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-center">
          <div className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-lg ring-1 ring-black/5">
            ✨ Body supported
          </div>
        </div>
      )}

      {isSupportOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsSupportOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 text-center text-base font-semibold text-gray-900">
              ✨ How would you like to support your body right now?
            </div>

            {loadingSuggestions ? (
              <div className="py-6 text-center text-sm text-gray-500">
                Noticing what you logged…
              </div>
            ) : (
              <>
                {acknowledgement && (
                  <p className="mb-3 text-sm text-gray-700 text-center">
                    {acknowledgement}
                  </p>
                )}
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.slice(0, 3).map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => logChoice(s)}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition shadow-sm bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-900 ring-1 ring-purple-200 hover:ring-purple-300"
                    >
                      <span className="mr-2">{s.emoji || "•"}</span>
                      {s.label}
                    </button>
                  ))}
                  {suggestions.length === 0 && (
                    <div className="py-3 text-center text-sm text-gray-600">
                      Nothing specific surfaced—choose what feels most natural.
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsSupportOpen(false)}
                className="w-full rounded-2xl bg-white px-4 py-2 text-sm font-medium text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => logChoice(null)}
                className="w-full rounded-2xl bg-white px-4 py-2 text-sm font-medium text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
              >
                Skip
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-gray-500">
              This app rewards attunement, not performance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
