"use client";

import { useSession, signOut } from "next-auth/react";
import JournalEntriesWidget from "@/components/JournalEntriesWidget";
import WeatherWidget from "@/components/WeatherWidget";
import CalendarWidget from "@/components/CalendarWidget";
import MoodWidget from "@/components/MoodWidget";
import PhysicalSymptomsWidget from "@/components/PhysicalSymptomsWidget";
import NoteToSelf from "@/components/NoteToSelf";
import GratitudeWidget from "@/components/GratitudeWidget";
import QuickCallButton from "@/components/QuickCallButton";
import Image from "next/image";

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
      <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-8 flex flex-col items-center flex-1">
        <div
          className="dashboard-main"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "32px",
            width: "1200px",
            margin: "0 auto",
            alignItems: "flex-start",
          }}
        >
          {/* Left column */}
          <div
            style={{
              width: 320,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <DashboardCard>
              <WeatherWidget />
            </DashboardCard>
            <DashboardCard>
              <NoteToSelf />
            </DashboardCard>
          </div>
          {/* Center column */}
          <div
            style={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Image
              src="/logo.png"
              alt="Ursul.ai Logo"
              width={360}
              height={360}
              className="bouncy-glow"
            />
            <DashboardCard>
              <JournalEntriesWidget />
            </DashboardCard>
            <DashboardCard>
              <PhysicalSymptomsWidget />
            </DashboardCard>
          </div>
          {/* Right column */}
          <div
            style={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "right",
              gap: "12px",
            }}
          >
            <DashboardCard>
              <CalendarWidget />
            </DashboardCard>
            <DashboardCard>
              <GratitudeWidget />
            </DashboardCard>
            <DashboardCard>
              <MoodWidget />
            </DashboardCard>
          </div>
        </div>
        <QuickCallButton />
      </div>
    </div>
  );
}
