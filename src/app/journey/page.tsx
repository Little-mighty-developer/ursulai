"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Period = "week" | "month" | "all";

interface JourneySummary {
  eligible: boolean;
  totalJournalEntries: number;
  threshold: number;
  period: Period;
  stats: {
    wins: number;
    journalEntries: number;
    gratitudeMoments: number;
    photos: number;
  };
  latestWin: { id: string; content: string; date: string } | null;
}

interface Win {
  id: string;
  content: string;
  date: string;
}

interface ProgressPhoto {
  id: string;
  dataUrl: string;
  caption: string | null;
  date: string;
}

interface Measurement {
  id: string;
  label: string;
  value: number;
  unit: string | null;
  date: string;
}

const PERIOD_LABELS: Record<Period, string> = {
  week: "This week",
  month: "This month",
  all: "All time",
};

function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Downscale an image client-side so it can be stored as a small data URL
async function downscaleImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = dataUrl;
  });

  const MAX_DIMENSION = 1000;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function StatCard({
  icon,
  iconBg,
  numberColor,
  count,
  label,
  periodLabel,
}: {
  icon: string;
  iconBg: string;
  numberColor: string;
  count: number;
  label: string;
  periodLabel: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className={`text-2xl font-bold leading-tight ${numberColor}`}>
          {count}
        </div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        <div className="text-xs text-gray-400">{periodLabel}</div>
      </div>
    </div>
  );
}

export default function JourneyPage() {
  const { data: session, status } = useSession();

  const [period, setPeriod] = useState<Period>("week");
  const [summary, setSummary] = useState<JourneySummary | null>(null);
  const [wins, setWins] = useState<Win[]>([]);
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Wins UI state
  const [showAddWin, setShowAddWin] = useState(false);
  const [winInput, setWinInput] = useState("");
  const [isSavingWin, setIsSavingWin] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showAllWins, setShowAllWins] = useState(false);

  // Photos UI state
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Measurements UI state
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);
  const [measurementLabel, setMeasurementLabel] = useState("");
  const [measurementValue, setMeasurementValue] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [isSavingMeasurement, setIsSavingMeasurement] = useState(false);

  const fetchSummary = useCallback(async (p: Period) => {
    try {
      const res = await fetch(`/api/journey/summary?period=${p}`);
      if (res.ok) setSummary(await res.json());
    } catch (error) {
      console.error("[Journey] Error fetching summary:", error);
    }
  }, []);

  const fetchLists = useCallback(async () => {
    try {
      const [winsRes, photosRes, measurementsRes] = await Promise.all([
        fetch("/api/wins"),
        fetch("/api/photos"),
        fetch("/api/measurements"),
      ]);
      if (winsRes.ok) setWins(await winsRes.json());
      if (photosRes.ok) setPhotos(await photosRes.json());
      if (measurementsRes.ok) setMeasurements(await measurementsRes.json());
    } catch (error) {
      console.error("[Journey] Error fetching lists:", error);
    }
  }, []);

  useEffect(() => {
    if (!session?.user?.email) return;
    Promise.all([fetchSummary(period), fetchLists()]).finally(() =>
      setIsLoading(false),
    );
  }, [session]);

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    fetchSummary(p);
  };

  const saveWin = async () => {
    if (!winInput.trim() || isSavingWin) return;
    setIsSavingWin(true);
    try {
      const res = await fetch("/api/wins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: winInput }),
      });
      if (res.ok) {
        const win = await res.json();
        setWins((prev) => [win, ...prev]);
        setWinInput("");
        setShowAddWin(false);
        fetchSummary(period);
      }
    } catch (error) {
      console.error("[Journey] Error saving win:", error);
    } finally {
      setIsSavingWin(false);
    }
  };

  const deleteWin = async (id: string) => {
    setOpenMenuId(null);
    try {
      const res = await fetch(`/api/wins/${id}`, { method: "DELETE" });
      if (res.ok) {
        setWins((prev) => prev.filter((w) => w.id !== id));
        fetchSummary(period);
      }
    } catch (error) {
      console.error("[Journey] Error deleting win:", error);
    }
  };

  const handlePhotoSelected = async (file: File | undefined) => {
    if (!file || isUploadingPhoto) return;
    setIsUploadingPhoto(true);
    try {
      const dataUrl = await downscaleImage(file);
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl }),
      });
      if (res.ok) {
        const photo = await res.json();
        setPhotos((prev) => [photo, ...prev]);
        fetchSummary(period);
      }
    } catch (error) {
      console.error("[Journey] Error uploading photo:", error);
    } finally {
      setIsUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== id));
        fetchSummary(period);
      }
    } catch (error) {
      console.error("[Journey] Error deleting photo:", error);
    }
  };

  const saveMeasurement = async () => {
    if (
      !measurementLabel.trim() ||
      !measurementValue.trim() ||
      isSavingMeasurement
    )
      return;
    setIsSavingMeasurement(true);
    try {
      const res = await fetch("/api/measurements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: measurementLabel,
          value: measurementValue,
          unit: measurementUnit,
        }),
      });
      if (res.ok) {
        const measurement = await res.json();
        setMeasurements((prev) => [measurement, ...prev]);
        setMeasurementLabel("");
        setMeasurementValue("");
        setMeasurementUnit("");
        setShowAddMeasurement(false);
      }
    } catch (error) {
      console.error("[Journey] Error saving measurement:", error);
    } finally {
      setIsSavingMeasurement(false);
    }
  };

  const deleteMeasurement = async (id: string) => {
    try {
      const res = await fetch(`/api/measurements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMeasurements((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("[Journey] Error deleting measurement:", error);
    }
  };

  if (status === "loading" || (session && isLoading)) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center text-gray-500">
        Loading your journey...
      </div>
    );
  }
  if (!session) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center text-gray-500">
        Access Denied
      </div>
    );
  }

  // Locked state — the journey unlocks after a few journal entries
  if (summary && !summary.eligible) {
    const remaining = summary.threshold - summary.totalJournalEntries;
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md text-center">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Your journey is just beginning
          </h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            This space opens up once you&apos;ve written {summary.threshold}{" "}
            journal entries — {remaining} more to go. No rush, it&apos;ll be
            here when you&apos;re ready. 💜
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/journal"
              className="px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-medium hover:opacity-90 transition"
            >
              Write a journal entry
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const periodLabel = PERIOD_LABELS[period];
  const visibleWins = showAllWins ? wins : wins.slice(0, 3);
  const visiblePhotos = showAllPhotos ? photos : photos.slice(0, 2);

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-8">
        <Link
          href="/dashboard"
          className="inline-block mb-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Back to dashboard
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>🌱</span> The Journey So Far
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              A space to notice your progress, celebrate your wins and reflect
              on your growth. 💜
            </p>
          </div>
          <div className="relative">
            <select
              value={period}
              onChange={(e) => handlePeriodChange(e.target.value as Period)}
              className="appearance-none bg-white border border-purple-200 rounded-xl pl-9 pr-8 py-2 text-sm font-medium text-gray-700 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="all">All time</option>
            </select>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm">
              📅
            </span>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              ▾
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatCard
            icon="⭐"
            iconBg="bg-purple-100"
            numberColor="text-purple-600"
            count={summary?.stats.wins ?? 0}
            label="Wins recorded"
            periodLabel={periodLabel}
          />
          <StatCard
            icon="📕"
            iconBg="bg-pink-100"
            numberColor="text-pink-600"
            count={summary?.stats.journalEntries ?? 0}
            label="Journal entries"
            periodLabel={periodLabel}
          />
          <StatCard
            icon="💛"
            iconBg="bg-amber-100"
            numberColor="text-amber-500"
            count={summary?.stats.gratitudeMoments ?? 0}
            label="Gratitude moments"
            periodLabel={periodLabel}
          />
          <StatCard
            icon="📷"
            iconBg="bg-green-100"
            numberColor="text-green-600"
            count={summary?.stats.photos ?? 0}
            label={summary?.stats.photos === 1 ? "Photo added" : "Photos added"}
            periodLabel={periodLabel}
          />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          {/* Wins */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-purple-100 p-6">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>✨</span> Wins
              </h2>
              <button
                onClick={() => setShowAddWin((v) => !v)}
                className="px-3 py-1.5 rounded-xl border border-purple-200 text-sm font-medium text-purple-700 hover:bg-purple-50 transition"
              >
                + Add a win
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Little (or big!) things you&apos;re proud of.
            </p>

            {showAddWin && (
              <div className="flex gap-2 mb-4">
                <input
                  autoFocus
                  type="text"
                  value={winInput}
                  onChange={(e) => setWinInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveWin();
                    if (e.key === "Escape") setShowAddWin(false);
                  }}
                  placeholder="What are you proud of today?"
                  className="flex-1 px-3 py-2 rounded-xl border border-purple-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button
                  onClick={saveWin}
                  disabled={isSavingWin || !winInput.trim()}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            )}

            {wins.length === 0 && !showAddWin ? (
              <p className="text-sm text-gray-400 text-center py-6">
                No wins recorded yet. Showing up counts too. 💜
              </p>
            ) : (
              <div className="divide-y divide-purple-50">
                {visibleWins.map((win) => (
                  <div key={win.id} className="flex items-center gap-3 py-3">
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-sm shrink-0">
                      ✨
                    </div>
                    <span className="flex-1 text-sm text-gray-800 min-w-0">
                      {win.content}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">
                      {formatShortDate(win.date)}
                    </span>
                    <div className="relative shrink-0">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === win.id ? null : win.id)
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition text-sm"
                        aria-label="Win options"
                      >
                        ⋮
                      </button>
                      {openMenuId === win.id && (
                        <div className="absolute right-0 top-9 z-10 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-28">
                          <button
                            onClick={() => deleteWin(win.id)}
                            className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {wins.length > 3 && (
              <button
                onClick={() => setShowAllWins((v) => !v)}
                className="block mx-auto mt-4 text-sm font-medium text-purple-600 hover:text-purple-800 transition"
              >
                {showAllWins ? "Show fewer wins" : "View all wins"} ›
              </button>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Photos */}
            <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span>📷</span> Photos{" "}
                  <span className="text-xs font-normal text-gray-400">
                    (optional)
                  </span>
                </h2>
                <button
                  onClick={() => photoInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="px-3 py-1.5 rounded-xl border border-purple-200 text-sm font-medium text-purple-700 hover:bg-purple-50 transition disabled:opacity-50"
                >
                  {isUploadingPhoto ? "Adding..." : "+ Add photo"}
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoSelected(e.target.files?.[0])}
                />
              </div>

              {photos.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  No photos yet — only if it feels right for you.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {visiblePhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.dataUrl}
                        alt={photo.caption || "Progress photo"}
                        className="w-full aspect-square object-cover rounded-2xl"
                      />
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                        aria-label="Delete photo"
                      >
                        ✕
                      </button>
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] text-white bg-black/40 rounded-full px-2 py-0.5">
                        {formatShortDate(photo.date)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {photos.length > 2 && (
                <button
                  onClick={() => setShowAllPhotos((v) => !v)}
                  className="block mx-auto mt-4 text-sm font-medium text-purple-600 hover:text-purple-800 transition"
                >
                  {showAllPhotos ? "Show fewer photos" : "View all photos"} ›
                </button>
              )}
            </div>

            {/* Measurements */}
            <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span>📝</span> Measurements{" "}
                  <span className="text-xs font-normal text-gray-400">
                    (optional)
                  </span>
                </h2>
                <button
                  onClick={() => setShowAddMeasurement((v) => !v)}
                  className="px-3 py-1.5 rounded-xl border border-purple-200 text-sm font-medium text-purple-700 hover:bg-purple-50 transition"
                >
                  + Add
                </button>
              </div>

              {showAddMeasurement && (
                <div className="flex flex-col gap-2 mb-4">
                  <input
                    autoFocus
                    type="text"
                    value={measurementLabel}
                    onChange={(e) => setMeasurementLabel(e.target.value)}
                    placeholder="What (e.g. waist, energy, weight)"
                    className="px-3 py-2 rounded-xl border border-purple-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={measurementValue}
                      onChange={(e) => setMeasurementValue(e.target.value)}
                      placeholder="Value"
                      className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-purple-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <input
                      type="text"
                      value={measurementUnit}
                      onChange={(e) => setMeasurementUnit(e.target.value)}
                      placeholder="Unit"
                      className="w-20 px-3 py-2 rounded-xl border border-purple-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button
                      onClick={saveMeasurement}
                      disabled={
                        isSavingMeasurement ||
                        !measurementLabel.trim() ||
                        !measurementValue.trim()
                      }
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {measurements.length === 0 ? (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-400 flex-1">
                    No measurements added yet.
                    <br />
                    <span className="text-xs">
                      Only add what feels right for you.
                    </span>
                  </p>
                  <span className="text-3xl">⚖️</span>
                </div>
              ) : (
                <div className="divide-y divide-purple-50">
                  {measurements.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 py-2.5">
                      <span className="flex-1 text-sm text-gray-800 min-w-0">
                        {m.label}
                      </span>
                      <span className="text-sm font-semibold text-purple-700 shrink-0">
                        {m.value}
                        {m.unit ? ` ${m.unit}` : ""}
                      </span>
                      <span className="text-xs text-gray-400 shrink-0">
                        {formatShortDate(m.date)}
                      </span>
                      <button
                        onClick={() => deleteMeasurement(m.id)}
                        className="text-xs text-gray-300 hover:text-rose-500 transition shrink-0"
                        aria-label="Delete measurement"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer affirmation */}
        <div className="mt-4 bg-purple-100/70 rounded-2xl py-4 px-6 text-center text-sm text-purple-800">
          💜 You&apos;re showing up for yourself. That&apos;s something to be
          proud of. 🐻
        </div>
      </div>
    </div>
  );
}
