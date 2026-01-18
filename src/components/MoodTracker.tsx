"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";

// Each petal maps to valence (pleasant/unpleasant) and arousal (low/high energy)
const WHEEL_SIZE = 400; // pixels
const PETAL_LENGTH = 150; // pixels

interface PetalRegion {
  id: number;
  angle: number; // in degrees, 0 = right, clockwise
  valence: number; // -1 (unpleasant) to +1 (pleasant)
  arousal: number; // -1 (low energy) to +1 (high energy)
  color: string;
  lightColor: string; // lighter variant for contrast
  darkColor: string; // darker variant for contrast
  descriptors: string[]; // words that might describe this region
}

// Define 8 regions in a circle
const REGIONS: PetalRegion[] = [
  {
    id: 0,
    angle: 0, // Right
    valence: 1.0,
    arousal: 0.0,
    color: "#FCD34D", // warm yellow
    lightColor: "#FEF9C3", // lighter for better contrast
    darkColor: "#D97706", // darker for better contrast
    descriptors: ["content", "steady", "balanced", "settled"],
  },
  {
    id: 1,
    angle: 45, // Upper right
    valence: 0.7,
    arousal: 0.7,
    color: "#34D399", // bright green
    lightColor: "#D1FAE5", // lighter
    darkColor: "#059669", // darker
    descriptors: ["energized", "bright", "lively", "up"],
  },
  {
    id: 2,
    angle: 90, // Top
    valence: 0.0,
    arousal: 1.0,
    color: "#60A5FA", // bright blue
    lightColor: "#DBEAFE", // lighter
    darkColor: "#2563EB", // darker
    descriptors: ["alert", "awake", "present", "sharp"],
  },
  {
    id: 3,
    angle: 135, // Upper left
    valence: -0.7,
    arousal: 0.7,
    color: "#F87171", // coral red
    lightColor: "#FEE2E2", // lighter
    darkColor: "#DC2626", // darker
    descriptors: ["restless", "edgy", "tense", "wound up"],
  },
  {
    id: 4,
    angle: 180, // Left
    valence: -1.0,
    arousal: 0.0,
    color: "#A78BFA", // muted purple
    lightColor: "#EDE9FE", // lighter
    darkColor: "#7C3AED", // darker
    descriptors: ["heavy", "flat", "dull", "weighed down"],
  },
  {
    id: 5,
    angle: 225, // Lower left
    valence: -0.7,
    arousal: -0.7,
    color: "#94A3B8", // cool gray
    lightColor: "#F1F5F9", // lighter
    darkColor: "#475569", // darker
    descriptors: ["tired", "drained", "low", "spent"],
  },
  {
    id: 6,
    angle: 270, // Bottom
    valence: 0.0,
    arousal: -1.0,
    color: "#C084FC", // soft purple
    lightColor: "#F3E8FF", // lighter
    darkColor: "#9333EA", // darker
    descriptors: ["calm", "quiet", "still", "peaceful"],
  },
  {
    id: 7,
    angle: 315, // Lower right
    valence: 0.7,
    arousal: -0.7,
    color: "#FBBF24", // warm amber
    lightColor: "#FEF3C7", // lighter
    darkColor: "#D97706", // darker
    descriptors: ["gentle", "warm", "soft", "eased"],
  },
];

function generateReflection(region: PetalRegion): string {
  // Pick 2-3 descriptors randomly for a natural, non-clinical tone
  const selected = [...region.descriptors]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2 + Math.floor(Math.random() * 2));

  // Vary the phrasing for more natural language
  const phraseIndex = Math.floor(Math.random() * 3);

  if (phraseIndex === 0) {
    return `This area often holds feelings like ${selected.join(", ")}.`;
  } else if (phraseIndex === 1) {
    return `Sometimes this space feels ${selected.join(" or ")}.`;
  } else {
    return `This region might carry a sense of ${selected.join(", ")}.`;
  }
}

interface MoodTrackerProps {
  onMoodSelect?: (data: {
    valence: number;
    arousal: number;
    regionId: number;
    color: string;
  }) => void;
}

export default function MoodTracker({ onMoodSelect }: MoodTrackerProps) {
  const [selectedRegion, setSelectedRegion] = useState<PetalRegion | null>(
    null,
  );
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
  const [reflection, setReflection] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [moodNotes, setMoodNotes] = useState<string>("");
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  const { data: session } = useSession();

  // Calculate petal path - flower-like rounded petal
  const getPetalPath = (region: PetalRegion, isHovered: boolean) => {
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    const angleRad = (region.angle * Math.PI) / 180;
    const length = isHovered ? PETAL_LENGTH * 1.15 : PETAL_LENGTH;
    const baseWidth = isHovered ? 70 : 60;

    // Petal tip (rounded)
    const tipX = centerX + Math.cos(angleRad) * length;
    const tipY = centerY - Math.sin(angleRad) * length;

    // Base points (wider at center)
    const perpAngle = angleRad + Math.PI / 2;
    const halfBaseWidth = baseWidth / 2;

    const leftBaseX = centerX + Math.cos(perpAngle) * halfBaseWidth;
    const leftBaseY = centerY - Math.sin(perpAngle) * halfBaseWidth;

    const rightBaseX = centerX - Math.cos(perpAngle) * halfBaseWidth;
    const rightBaseY = centerY + Math.sin(perpAngle) * halfBaseWidth;

    // Mid points for smoother curves
    const midLength = length * 0.65;
    const midX = centerX + Math.cos(angleRad) * midLength;
    const midY = centerY - Math.sin(angleRad) * midLength;

    // Control points for left curve
    const leftControl1X = leftBaseX + Math.cos(angleRad) * 20;
    const leftControl1Y = leftBaseY - Math.sin(angleRad) * 20;
    const leftControl2X = midX + Math.cos(perpAngle) * 30;
    const leftControl2Y = midY - Math.sin(perpAngle) * 30;

    // Control points for right curve
    const rightControl1X = midX - Math.cos(perpAngle) * 30;
    const rightControl1Y = midY + Math.sin(perpAngle) * 30;
    const rightControl2X = rightBaseX + Math.cos(angleRad) * 20;
    const rightControl2Y = rightBaseY - Math.sin(angleRad) * 20;

    // Tip control point for rounded tip
    const tipControlX = tipX - Math.cos(angleRad) * 15;
    const tipControlY = tipY + Math.sin(angleRad) * 15;

    return `M ${centerX} ${centerY}
            L ${leftBaseX} ${leftBaseY}
            C ${leftControl1X} ${leftControl1Y}, ${leftControl2X} ${leftControl2Y}, ${midX} ${midY}
            Q ${tipControlX} ${tipControlY}, ${tipX} ${tipY}
            Q ${tipControlX} ${tipControlY}, ${midX} ${midY}
            C ${rightControl1X} ${rightControl1Y}, ${rightControl2X} ${rightControl2Y}, ${rightBaseX} ${rightBaseY}
            Z`;
  };

  const selectRegion = (
    region: PetalRegion,
    clickX?: number,
    clickY?: number,
  ) => {
    setSelectedRegion(region);
    const reflectionText = generateReflection(region);
    setReflection(reflectionText);

    if (clickX !== undefined && clickY !== undefined) {
      setClickPosition({ x: clickX, y: clickY });
    }

    if (onMoodSelect) {
      onMoodSelect({
        valence: region.valence,
        arousal: region.arousal,
        regionId: region.id,
        color: region.color,
      });
    }
  };

  const handlePetalClick = (
    region: PetalRegion,
    event: React.MouseEvent<SVGPathElement>,
  ) => {
    // Get click coordinates relative to the SVG
    const svg = wheelRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectRegion(region, x, y);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    region: PetalRegion,
    index: number,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleKeySelect(region);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % REGIONS.length;
      const nextRegion = REGIONS[nextIndex];
      const nextElement = document.getElementById(`petal-${nextRegion.id}`);
      nextElement?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + REGIONS.length) % REGIONS.length;
      const prevRegion = REGIONS[prevIndex];
      const prevElement = document.getElementById(`petal-${prevRegion.id}`);
      prevElement?.focus();
    }
  };

  const handleKeySelect = (region: PetalRegion) => {
    // For keyboard selection, place dot at the center of the petal
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    const angleRad = (region.angle * Math.PI) / 180;
    const midLength = PETAL_LENGTH * 0.5;
    const x = centerX + Math.cos(angleRad) * midLength;
    const y = centerY - Math.sin(angleRad) * midLength;

    selectRegion(region, x, y);
  };

  const handleSubmit = async () => {
    if (!selectedRegion) {
      return;
    }

    const date = new Date().toISOString();

    // Save as a single mood entry with new structure
    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        valence: selectedRegion.valence,
        arousal: selectedRegion.arousal,
        region: selectedRegion.id,
        clickX: clickPosition?.x,
        clickY: clickPosition?.y,
        notes: moodNotes.trim() || null,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("API error:", error);
      alert("Failed to save mood: " + (error.details || error.error));
      return;
    }

    setSaved(true);
    setMoodNotes(""); // Clear notes after successful save
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          How are you right now?
        </h2>
        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-300"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            aria-label="How to use the mood tracker"
            aria-expanded={showTooltip}
          >
            <span className="text-sm text-gray-500 font-semibold">?</span>
          </button>
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 w-80 p-5 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 pointer-events-auto animate-fade-in">
              <div className="space-y-3">
                <p>Emotions don&apos;t always fit into neat categories.</p>
                <p>
                  This space lets you check in without naming or explaining —
                  just noticing where you land today.
                </p>
                <p>
                  Over time, this can help you see gentle trends in energy and
                  tone, without forcing meaning onto any single day.
                </p>
                <p className="text-purple-300 font-medium">
                  Nothing here is scored, ranked, or judged.
                </p>
              </div>
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <svg
          ref={wheelRef}
          width={WHEEL_SIZE}
          height={WHEEL_SIZE}
          viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          className="mb-6"
          aria-label="Mood selection wheel with colored petals"
        >
          {REGIONS.map((region, index) => {
            const isHovered = hoveredRegion === region.id;
            const isSelected = selectedRegion?.id === region.id;
            const path = getPetalPath(region, isHovered || isSelected);

            return (
              <g key={region.id}>
                <path
                  id={`petal-${region.id}`}
                  d={path}
                  fill={
                    isSelected
                      ? region.darkColor
                      : isHovered
                        ? region.color
                        : region.lightColor
                  }
                  stroke={isSelected ? region.darkColor : region.color}
                  strokeWidth={isSelected ? 3 : 1}
                  opacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
                  className="transition-all duration-200 cursor-pointer"
                  onClick={(e) => handlePetalClick(region, e)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onKeyDown={(e) => handleKeyDown(e, region, index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Mood region ${region.id + 1} of ${REGIONS.length}`}
                  style={{
                    filter: isSelected
                      ? "drop-shadow(0 4px 8px rgba(0,0,0,0.15))"
                      : isHovered
                        ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                        : undefined,
                  }}
                />
              </g>
            );
          })}
          {/* Center circle */}
          <circle
            cx={WHEEL_SIZE / 2}
            cy={WHEEL_SIZE / 2}
            r={30}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth={2}
            className="pointer-events-none"
          />
          {/* Click position dot */}
          {clickPosition && (
            <circle
              cx={clickPosition.x}
              cy={clickPosition.y}
              r={6}
              fill="white"
              stroke="#1F2937"
              strokeWidth={2.5}
              className="pointer-events-none animate-fade-in"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
          )}
        </svg>

        {reflection && (
          <p className="text-sm text-gray-600 italic mb-6 text-center max-w-md animate-fade-in">
            {reflection}
          </p>
        )}

        {selectedRegion && (
          <>
            <div className="w-full max-w-md mb-4">
              <textarea
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                placeholder="Optional notes about how you're feeling..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                rows={3}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold flex items-center gap-2 hover:from-indigo-600 hover:to-purple-600 transition shadow-lg"
            >
              {saved ? (
                <>
                  <span>Saved</span>
                  <span className="text-green-300">✓</span>
                </>
              ) : (
                "Save"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
