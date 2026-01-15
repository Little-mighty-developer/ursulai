"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface GratitudeEntry {
  id: string;
  content: string;
  createdAt: string;
}

function LoadingSkeleton() {
  return (
    <div
      className="bg-gradient-to-br from-orange-50 to-peach-50 rounded-xl shadow p-6 flex flex-col items-center animate-pulse"
      style={{
        background: "linear-gradient(to bottom right, #fff5f0, #ffe5d9)",
      }}
    >
      <div
        className="h-6 rounded w-3/4 mb-4"
        style={{ background: "#ffd7c7" }}
      ></div>
      <div
        className="h-4 rounded w-full mb-6"
        style={{ background: "#ffd7c7" }}
      ></div>
      <div className="flex gap-2 mb-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-6 h-6 relative">
            <Image
              src="/images/teddy-bear-empty.png"
              alt=""
              width={24}
              height={24}
              className="opacity-50"
            />
          </div>
        ))}
      </div>
      <div
        className="h-10 rounded-lg w-full"
        style={{ background: "#ffd7c7" }}
      ></div>
    </div>
  );
}

function ProgressBears({ filledCount }: { filledCount: number }) {
  return (
    <div className="flex gap-2 justify-center mb-4 flex-wrap">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="transition-all duration-300"
          style={{
            opacity: i < filledCount ? 1 : 0.4,
          }}
        >
          <Image
            src={
              i < filledCount
                ? "/images/teddy-bear.png"
                : "/images/teddy-bear-empty.png"
            }
            alt={i < filledCount ? "Filled gratitude" : "Empty gratitude"}
            width={24}
            height={24}
            className="transition-all duration-300"
          />
        </div>
      ))}
    </div>
  );
}

const GRATITUDE_PLACEHOLDERS = [
  "Something small that didn't make today harder.",
  "A moment that passed more easily than expected.",
  "Something your body did for you today.",
  "A sound, texture, or sight you noticed.",
  "Something that helped you get through.",
  "A comfort you didn't plan.",
  "Something that worked, even briefly.",
  "A moment you'd like to keep, you know the one.",
  "Something you'd probably forget if you didn't write it down.",
  "Something you're glad is here.",
  "Something that felt - real.",
];

export default function GratitudeWidget() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchEntries();
    }
  }, [session]);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/gratitude");
      if (response.ok) {
        const data = await response.json();
        setEntries(data || []);
      }
    } catch (error) {
      console.error("Error fetching gratitude entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntry = async (valueToSave?: string) => {
    const value = valueToSave ?? inputValue;
    if (!value.trim() || isSaving) return;

    // Early check using current state (prevent unnecessary requests)
    // Note: This may have stale closure, but server enforces limit as well
    if (entries.length >= 10) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/gratitude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: value }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save entry");
      }

      const newEntry = await response.json();
      // Use functional setState to avoid stale closure issue
      // This ensures we always use the latest entries state, preventing data loss
      setEntries((prevEntries) => {
        // Double-check limit using latest state (safeguard)
        if (prevEntries.length >= 10) return prevEntries;
        return [...prevEntries, newEntry];
      });
      setInputValue("");
    } catch (error) {
      console.error("Error saving gratitude entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValue = e.currentTarget.value;
      if (currentValue.trim()) {
        saveEntry(currentValue);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    if (currentValue.trim()) {
      saveEntry(currentValue);
    }
    // Reset styling
    e.target.style.borderColor = "rgba(255, 200, 180, 0.6)";
    e.target.style.boxShadow = "none";
  };

  if (!session) return null;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const placeholder =
    GRATITUDE_PLACEHOLDERS[entries.length] ??
    GRATITUDE_PLACEHOLDERS[GRATITUDE_PLACEHOLDERS.length - 1];

  return (
    <div
      className="rounded-xl shadow-sm p-5 flex flex-col w-full"
      style={{
        background:
          "linear-gradient(to bottom right, #fff5f0, #ffe5d9, #ffddd3)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-2 w-full">
        <span className="text-base">🌱</span>
        <h2 className="text-base font-semibold text-center text-gray-800">
          Gentle gratitude practice
        </h2>
      </div>

      {/* Subtext */}
      <p className="text-xs text-gray-600 mb-4 text-center leading-relaxed">
        Big things count.
        <br />
        Small things count.
        <br />
        Neutral things count.
      </p>

      {/* Progress teddy bears */}
      <ProgressBears filledCount={entries.length} />

      {/* Input field */}
      {entries.length < 10 && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-2.5 py-2 rounded-lg border text-sm text-gray-700 placeholder:text-[11px] placeholder:leading-tight placeholder:text-gray-400 transition-all focus:outline-none focus:ring-1"
          style={{
            borderColor: "rgba(255, 200, 180, 0.6)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#ffb89a";
            e.target.style.boxShadow = "0 0 0 1px #ffb89a";
          }}
          onBlur={handleBlur}
          disabled={isSaving}
        />
      )}

      {/* Show saved entries */}
      {entries.length > 0 && (
        <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="px-3 py-2 rounded-lg text-xs text-gray-600"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderColor: "rgba(255, 200, 180, 0.3)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {entry.content}
            </div>
          ))}
        </div>
      )}

      {entries.length >= 10 && (
        <p className="text-xs text-center text-gray-500 mt-2 italic">
          You've added 10 things today. ✨
        </p>
      )}
    </div>
  );
}
