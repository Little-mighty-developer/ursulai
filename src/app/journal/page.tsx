"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save entry to backend
    setTimeout(() => {
      setIsSaving(false);
      router.push("/dashboard");
    }, 800);
  };

  const handleCancel = () => {
    router.push("/");
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
            className="px-6 py-2 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition"
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
