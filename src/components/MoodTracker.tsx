"use client";

import React, { useState } from "react";

const SLIDER_CLASSES = [
  "w-full h-3 rounded-full appearance-none cursor-pointer",
  "bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2",
  // Thumb (WebKit)
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7",
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
  "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-purple-200",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-300",
  "[&::-webkit-slider-thumb]:transition-transform",
  "[&::-webkit-slider-thumb]:hover:scale-110",
  // Thumb (Firefox)
  "[&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7",
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white",
  "[&::-moz-range-thumb]:shadow-md",
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-300",
].join(" ");

function energyWords(value: number): string {
  if (value < -0.33) return "drained";
  if (value > 0.33) return "energised";
  return "steady";
}

function moodWords(value: number): string {
  if (value < -0.33) return "difficult";
  if (value > 0.33) return "good";
  return "mixed";
}

export default function MoodTracker() {
  const [energy, setEnergy] = useState(0); // → arousal
  const [mood, setMood] = useState(0); // → valence
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);

    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().toISOString(),
        valence: mood,
        arousal: energy,
        notes: notes.trim() || null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const error = await res.json();
      console.error("API error:", error);
      alert("Failed to save mood: " + (error.details || error.error));
      return;
    }

    setSaved(true);
    setNotes("");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-lg p-5 max-w-xl w-full mx-auto">
      <h2 className="mb-2 text-base font-semibold leading-tight text-center text-gray-900">
        Vibe Check Minis 🧡
      </h2>

      <div className="space-y-4">
        {/* Energy */}
        <div>
          <label
            htmlFor="energy-slider"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Energy
          </label>
          <input
            id="energy-slider"
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            aria-valuetext={energyWords(energy)}
            className={SLIDER_CLASSES}
          />
          <div className="flex justify-between mt-1.5 text-xs text-gray-500">
            <span>😴 Drained</span>
            <span>⚡ Energised</span>
          </div>
        </div>

        {/* Mood */}
        <div>
          <label
            htmlFor="mood-slider"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Mood
          </label>
          <input
            id="mood-slider"
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={mood}
            onChange={(e) => setMood(parseFloat(e.target.value))}
            aria-valuetext={moodWords(mood)}
            className={SLIDER_CLASSES}
          />
          <div className="flex justify-between mt-1.5 text-xs text-gray-500">
            <span>😔 Difficult</span>
            <span>🌥️ Mixed</span>
            <span>😊 Good</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="mood-notes" className="sr-only">
            Optional notes about how you&apos;re feeling
          </label>
          <textarea
            id="mood-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes about how you're feeling…"
            rows={2}
            className="w-full px-3 py-2 bg-white/70 rounded-2xl text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
          />
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-8 py-2 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-full font-semibold hover:from-indigo-500 hover:to-purple-500 transition shadow-md disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <p
            role="status"
            aria-live="polite"
            className={`absolute right-0 top-1/2 -translate-y-1/2 text-sm text-purple-500 transition-opacity duration-300 ${
              saved ? "opacity-100" : "opacity-0"
            }`}
          >
            Noted 💜
          </p>
        </div>
      </div>
    </div>
  );
}
