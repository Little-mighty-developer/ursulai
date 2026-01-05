"use client";

import { useState, useEffect } from "react";

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
}

function formatDate(): string {
  const date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  return `${dayName} · ${monthName} ${day}`;
}

export default function CalendarWidget() {
  const [dateString, setDateString] = useState<string>(formatDate());
  const [timeOfDay, setTimeOfDay] = useState<string>(getTimeOfDay());

  useEffect(() => {
    // Update every minute to catch time of day changes
    const interval = setInterval(() => {
      setDateString(formatDate());
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow p-6 flex flex-col items-center">
      <div className="text-center">
        <div className="text-xl font-semibold text-gray-800 mb-2">
          {dateString}
        </div>
        <div className="text-lg text-gray-600">{timeOfDay}</div>
      </div>
    </div>
  );
}
