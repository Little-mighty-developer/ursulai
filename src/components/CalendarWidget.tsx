"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar-custom.css";
import { useState, useEffect } from "react";

// Engagement levels
const engagementLabels = {
  1: { color: "bg-blue-200", label: "Low" },
  2: { color: "bg-pink-200", label: "Medium" },
  3: { color: "bg-purple-300", label: "High" },
};

function getEngagementClass(level: number | undefined, isToday: boolean) {
  if (!level) return isToday ? "border-2 border-blue-400" : "";
  const base = engagementLabels[level].color + " rounded-full font-bold";
  return isToday ? `${base} border-2 border-blue-400` : base;
}

function tileClassName(engagementByDate: Record<string, number>) {
  return ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const iso = date.toISOString().slice(0, 10);
      const level = engagementByDate[iso];
      const isToday = new Date().toDateString() === date.toDateString();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      if (isToday) {
        return "bg-blue-400 text-white border-2 border-blue-600 rounded-full";
      }

      let classes = "";
      if (level) {
        classes += getEngagementClass(level, false) + " ";
      }
      if (isWeekend) {
        classes += "bg-purple-100 ";
      }
      return classes.trim();
    }
    return "";
  };
}

function CalendarLegend() {
  return (
    <div className="flex gap-2 mt-4 text-xs items-center">
      <span className="flex items-center gap-1">
        <span className="bg-blue-200 rounded-full px-2">&nbsp;</span>Low
      </span>
      <span className="flex items-center gap-1">
        <span className="bg-pink-200 rounded-full px-2">&nbsp;</span>Medium
      </span>
      <span className="flex items-center gap-1">
        <span className="bg-purple-300 rounded-full px-2">&nbsp;</span>High
      </span>
    </div>
  );
}

export default function CalendarWidget() {
  const [engagementByDate, setEngagementByDate] = useState<
    Record<string, number>
  >({});
  const [value, setValue] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchEngagement() {
      const res = await fetch("/api/engagement");
      if (res.ok) {
        const data = await res.json();
        setEngagementByDate(data);
      }
    }
    fetchEngagement();
  }, []);

  const goToToday = () => {
    const today = new Date();
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setActiveStartDate(firstOfMonth);
    setValue(today);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow p-6 flex flex-col items-center">
      <Calendar
        value={value}
        onChange={setValue}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate!)
        }
        tileClassName={tileClassName(engagementByDate)}
      />
      <button
        className="mt-2 px-3 py-1 bg-blue-200 text-blue-900 rounded-full font-semibold text-xs hover:bg-blue-300 transition"
        onClick={goToToday}
      >
        Today
      </button>
      <CalendarLegend />
    </div>
  );
}
