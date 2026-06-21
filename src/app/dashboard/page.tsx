"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import JournalEntriesWidget from "@/components/JournalEntriesWidget";
// import TodayCard from "@/components/TodayCard"; // Weather card hidden for now
import MoodTracker from "@/components/MoodTracker";
import CycleWidget from "@/components/CycleWidget";
// import PhysicalSymptomsWidget from "@/components/PhysicalSymptomsWidget"; // Body Check-in hidden for now
import NoteToSelf from "@/components/NoteToSelf";
import GratitudeWidget from "@/components/GratitudeWidget";
import JourneySoFarWidget from "@/components/JourneySoFarWidget";
import QuickCallButton from "@/components/QuickCallButton";
import Image from "next/image";

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

function HeaderDate() {
  const [dateString, setDateString] = useState<string>(formatDate());
  const [timeOfDay, setTimeOfDay] = useState<string>(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateString(formatDate());
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="font-semibold text-gray-800">{dateString}</div>
      <div className="text-sm text-gray-500">{timeOfDay}</div>
    </div>
  );
}

function DashboardCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl shadow p-6 flex flex-col items-center ${className}`}
      style={{ width: "100%" }}
    >
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Access Denied</div>;

  const userDisplayName = session.user?.name || session.user?.email || "User";
  const userEmail = session.user?.email || "";
  const userImage = session.user?.image || null;

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      {/* User Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {userImage && (
              <Image
                src={userImage}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-semibold text-gray-900 text-lg">
                {userDisplayName}
              </div>
              {session.user?.name && userEmail && (
                <div className="text-sm text-gray-600">{userEmail}</div>
              )}
            </div>
          </div>
          <HeaderDate />
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition"
            >
              Profile
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content — single column on small screens; 3 columns from lg */}
      <div className="flex flex-1 flex-col items-stretch px-4 py-6 sm:p-8">
        <div className="dashboard-main mx-auto flex w-full max-w-[1200px] flex-col gap-3 lg:flex-row lg:items-start lg:gap-8">
          {/* Left column — second on phones so logo/cycle stay up top */}
          <div className="order-2 flex w-full min-w-0 flex-col gap-3 lg:order-1 lg:w-[320px] lg:shrink-0">
            {/* Weather card hidden for now */}
            {/* <TodayCard /> */}
            <DashboardCard>
              <JournalEntriesWidget />
            </DashboardCard>
            {/* MoodTracker renders its own card styling */}
            <MoodTracker />
            {/* TODO: Body Check-in widget hidden for now; re-enable when ready */}
            {/* <DashboardCard>
              <PhysicalSymptomsWidget />
            </DashboardCard> */}
          </div>
          {/* Center: logo + note to self */}
          <div className="order-1 flex w-full min-w-0 flex-col items-center gap-3 lg:order-2 lg:w-[400px] lg:shrink-0">
            <Image
              src="/logo.png"
              alt="Ursul.ai Logo"
              width={360}
              height={360}
              className="bouncy-glow h-auto w-full max-w-[360px]"
            />
            <DashboardCard>
              <NoteToSelf />
            </DashboardCard>
          </div>
          {/* Right: gratitude + cycle */}
          <div className="order-3 flex w-full min-w-0 flex-col gap-3 lg:w-[400px] lg:shrink-0">
            <DashboardCard>
              <GratitudeWidget />
            </DashboardCard>
            <CycleWidget />
            {/* Only renders once the user has 3+ journal entries */}
            <JourneySoFarWidget />
          </div>
        </div>
        <div className="mx-auto mt-6 flex w-full max-w-[1200px] justify-center px-4">
          <QuickCallButton />
        </div>
      </div>
    </div>
  );
}
