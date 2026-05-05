"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ReflectionModal from "./ReflectionModal";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export default function JournalEntriesWidget() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eligible, setEligible] = useState(false);
  const [reflectionModal, setReflectionModal] = useState<
    "threads" | "lookback" | null
  >(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchEntries();
      fetchEligibility();
    }
  }, [session]);

  const fetchEligibility = async () => {
    try {
      const res = await fetch("/api/reflection/eligibility");
      if (res.ok) {
        const { eligible } = await res.json();
        setEligible(eligible);
      }
    } catch {
      setEligible(false);
    }
  };

  const fetchEntries = async () => {
    try {
      console.log(
        "[JournalEntriesWidget] Fetching entries for user:",
        session?.user?.email,
      );
      const response = await fetch("/api/journal");
      console.log(
        "[JournalEntriesWidget] Response status:",
        response.status,
        response.statusText,
      );

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (_e) {
          const text = await response.text();
          console.error(
            "[JournalEntriesWidget] Failed to parse error response. Raw text:",
            text,
          );
          errorData = {
            error: `HTTP ${response.status}: ${response.statusText}`,
            raw: text,
          };
        }
        const errorMessage =
          errorData.error ||
          errorData.details ||
          `Failed to fetch entries (${response.status})`;
        console.error("[JournalEntriesWidget] Error fetching entries:", {
          status: response.status,
          statusText: response.statusText,
          errorMessage,
          errorData,
        });
        // Don't throw - just log the error so the widget still renders
        return;
      }
      const data = await response.json();
      console.log(
        "[JournalEntriesWidget] Received entries:",
        data.length,
        data,
      );
      setEntries(data);
    } catch (error) {
      console.error(
        "[JournalEntriesWidget] Network or other error fetching entries:",
        error,
      );
      // Network errors or other issues - don't break the UI
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
      <span className="mb-2 text-base font-semibold leading-tight text-gray-900">
        Journal Entries
      </span>
      <span className="text-4xl font-bold text-purple-700 mb-4">
        {isLoading ? "..." : entries.length}
      </span>
      <Link
        href="/journal"
        className="block w-full mb-4 px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-center text-lg font-medium text-indigo-700 hover:bg-indigo-200 transition cursor-pointer shadow"
      >
        What&apos;s fueling your transformation story?
      </Link>
      {eligible && (
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => setReflectionModal("threads")}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium text-center py-1"
          >
            🧵 Threads Emerging
          </button>
          <button
            onClick={() => setReflectionModal("lookback")}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium text-center py-1"
          >
            🔎 Look Back
          </button>
        </div>
      )}
      <ReflectionModal
        type={reflectionModal === "threads" ? "threads" : "lookback"}
        isOpen={reflectionModal !== null}
        onClose={() => setReflectionModal(null)}
      />
    </div>
  );
}
