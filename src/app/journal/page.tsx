"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = async () => {
    if (!session?.user?.email) {
      setError("You must be logged in to save journal entries");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: entry }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save entry");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save entry");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          What's fueling your transformation story?
        </h2>
        <textarea
          className="w-full mt-4 mb-6 p-4 rounded-2xl border-none outline-none resize-none text-lg bg-gradient-to-br from-indigo-50 to-purple-50 shadow"
          rows={8}
          placeholder="Let your thoughts flow..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}
        <div className="flex gap-4 w-full justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || !entry.trim()}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        {/* Placeholder for future AI prompt and Ursul.ai guidance */}
        <div className="mt-8 text-center text-gray-400 italic">
          (AI-powered prompts and Ursul.ai guidance coming soon)
        </div>
      </div>
    </div>
  );
}
