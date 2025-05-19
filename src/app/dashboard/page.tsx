"use client";

import { useSession } from "next-auth/react";
import JournalEntriesWidget from "@/components/JournalEntriesWidget";
import WeatherWidget from "@/components/WeatherWidget";
import CalendarWidget from "@/components/CalendarWidget";
import MoodTracker from "@/components/MoodTracker";
import Masonry from "react-masonry-css";
import PhysicalSymptomsTracker from "@/components/PhysicalSymptomsTracker";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Access Denied</div>;

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Dashboard</h1>
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="flex w-auto"
        columnClassName="masonry-column"
      >
        <JournalEntriesWidget />
        <CalendarWidget />
        <WeatherWidget />
        <MoodTracker />
        <div className="bg-white rounded-xl shadow p-6">
          <PhysicalSymptomsTracker />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <span className="text-lg font-semibold mb-2">Reminders</span>
          <ul className="text-left">
            <li>○ Reminder 1</li>
            <li>○ Reminder 2</li>
          </ul>
        </div>
      </Masonry>
    </div>
  );
}
