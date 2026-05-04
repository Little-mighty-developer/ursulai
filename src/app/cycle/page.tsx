"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CycleTracker from "@/components/CycleTracker";

export default function CyclePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-4xl flex flex-col items-center relative">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="self-end mb-4 px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        >
          Close
        </button>
        <CycleTracker />
      </div>
    </div>
  );
}
