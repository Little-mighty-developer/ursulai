"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [typicalLength, setTypicalLength] = useState(28);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showBulkBackfillOffer, setShowBulkBackfillOffer] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/cycle")
      .then((r) => r.json())
      .then((d) => {
        setEnabled(!!d.enabled);
        setShowBulkBackfillOffer(!!d.showCycleBulkBackfill);
        if (typeof d.typicalCycleLength === "number") {
          setTypicalLength(d.typicalCycleLength);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  const saveCycleSettings = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cycle", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cycleTrackingEnabled: enabled,
          typicalCycleLength: typicalLength,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage("Saved.");
      const cycle = await fetch("/api/cycle").then((r) => r.json());
      setShowBulkBackfillOffer(!!cycle.showCycleBulkBackfill);
    } catch {
      setMessage("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <Link
            href="/dashboard"
            className="text-sm text-rose-700 font-medium hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Signed in as</p>
            <p className="font-medium text-gray-900">{session.user?.email}</p>
          </div>

          <section className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Cycle & hormone tracking
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Completely optional. When on, you can log period starts and see a
              simple day-and-phase readout on the dashboard. Insights only look
              at your own journals, moods, and symptoms — not population
              statistics. This does not diagnose or treat anything (including
              PCOS); use clinicians for medical care.
            </p>

            {loading ? (
              <p className="text-sm text-gray-500">Loading settings…</p>
            ) : (
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-gray-800">
                    Enable cycle tracking on my account
                  </span>
                </label>

                {enabled && showBulkBackfillOffer && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50/60 px-3 py-2.5 text-sm text-gray-700 leading-relaxed">
                    After you save, open your{" "}
                    <Link
                      href="/cycle"
                      className="font-medium text-purple-800 underline decoration-purple-300 underline-offset-2"
                    >
                      cycle log
                    </Link>{" "}
                    once — you&apos;ll get a <strong>one-time</strong> paste box
                    for up to about a year of past period starts (or you can
                    skip it there).
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Typical cycle length (days)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Used until the app has enough of your period starts to
                    average your own rhythm (about 21–45 days).
                  </p>
                  <input
                    type="number"
                    min={21}
                    max={45}
                    value={typicalLength}
                    onChange={(e) =>
                      setTypicalLength(Number(e.target.value) || 28)
                    }
                    className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <button
                  type="button"
                  disabled={saving}
                  onClick={saveCycleSettings}
                  className="px-5 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save cycle settings"}
                </button>
                {message && (
                  <p className="text-sm text-gray-600" role="status">
                    {message}
                  </p>
                )}
                {enabled && (
                  <p className="text-sm">
                    <Link
                      href="/cycle"
                      className="text-rose-700 font-medium underline"
                    >
                      Open cycle log
                    </Link>
                  </p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
