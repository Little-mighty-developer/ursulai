"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar-custom.css";
import { useState } from "react";

// Example engagement data
const engagementByDate: Record<string, number> = {
  "2024-05-10": 1,
  "2024-05-11": 2,
  "2024-05-12": 3,
};

const engagementLabels = {
  1: { color: "bg-blue-200", label: "Low" },
  2: { color: "bg-pink-200", label: "Medium" },
  3: { color: "bg-purple-300", label: "High" },
};

function getEngagementClass(level: number | undefined, isToday: boolean) {
  if (!level) return isToday ? "border-2 border-indigo-400" : "";
  const base = engagementLabels[level].color + " rounded-full font-bold";
  return isToday ? `${base} border-2 border-indigo-400` : base;
}

export default function CalendarWidget() {
  const [value, setValue] = useState<Date>(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      const iso = date.toISOString().slice(0, 10);
      const level = engagementByDate[iso];
      const isToday = new Date().toDateString() === date.toDateString();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday=0, Saturday=6

      let classes = "";
      if (level) {
        classes += getEngagementClass(level, isToday) + " ";
      }
      if (isWeekend) {
        classes += "bg-purple-100 "; // Tailwind's lavender-like color
      }
      if (isToday) {
        classes += "bg-blue-300 text-white border-2 border-blue-500 ";
      }
      return classes.trim();
    }
    return "";
  }

  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      const iso = date.toISOString().slice(0, 10);
      const level = engagementByDate[iso];
      if (level && hoveredDate === iso) {
        return (
          <div className="absolute z-20 mt-8 left-1/2 -translate-x-1/2 bg-white text-xs text-gray-700 rounded shadow-lg px-2 py-1">
            {engagementLabels[level].emoji} {engagementLabels[level].label}{" "}
            engagement
          </div>
        );
      }
    }
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow p-6 flex flex-col items-center">
      <div className="text-xl font-bold mb-2">Calendar</div>
      <Calendar
        value={value}
        onChange={setValue}
        tileClassName={tileClassName}
        tileContent={tileContent}
        onMouseOver={({ activeStartDate, date, view }) => {
          if (view === "month") setHoveredDate(date.toISOString().slice(0, 10));
        }}
        onMouseOut={() => setHoveredDate(null)}
      />
      <button
        className="mt-2 px-3 py-1 bg-blue-200 text-blue-900 rounded-full font-semibold text-xs hover:bg-blue-300 transition"
        onClick={() => setValue(new Date())}
      >
        Today
      </button>
      <div className="flex gap-2 mt-4 text-xs items-center">
        <span className="flex items-center gap-1">
          <span className="bg-blue-200 rounded-full px-2">🩵</span>Low
        </span>
        <span className="flex items-center gap-1">
          <span className="bg-pink-300 rounded-full px-2">💖</span>Medium
        </span>
        <span className="flex items-center gap-1">
          <span className="bg-purple-400 text-white rounded-full px-2">💜</span>
          High
        </span>
        <span className="ml-2 border-2 border-blue-400 rounded-full px-2">
          Today
        </span>
      </div>
    </div>
  );
}
