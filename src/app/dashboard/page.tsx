"use client";

import { useSession } from "next-auth/react";
import JournalEntriesWidget from "@/components/JournalEntriesWidget";
import WeatherWidget from "@/components/WeatherWidget";
import CalendarWidget from "@/components/CalendarWidget";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Access Denied</div>;

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Journal Entries Widget */}
        <JournalEntriesWidget count={28} />
        {/* Mood Widget */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Mood</span>
          {/* Mood icons/graph here */}
          <span>🙂 😐 🙁</span>
        </div>
        {/* Calendar Widget */}
        <CalendarWidget />
        {/* Weather Widget */}
        <WeatherWidget />
        {/* Health Widget */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Health</span>
          <ul className="text-left">
            <li>○ Headache</li>
            <li>○ Body pain</li>
            <li>○ Brain fog</li>
            <li>○ Bloating</li>
          </ul>
        </div>
        {/* Reminders Widget */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Reminders</span>
          <ul className="text-left">
            <li>○ Reminder 1</li>
            <li>○ Reminder 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
