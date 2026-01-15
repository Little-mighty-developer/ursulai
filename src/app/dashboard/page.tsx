"use client";

import { useSession } from "next-auth/react";
import JournalEntriesWidget from "@/components/JournalEntriesWidget";
import WeatherWidget from "@/components/WeatherWidget";
import CalendarWidget from "@/components/CalendarWidget";
import MoodTracker from "@/components/MoodTracker";
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

  return (
    <div className="min-h-screen bg-purple-50 p-8 flex flex-col items-center">
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
            <MoodTracker />
          </DashboardCard>
        </div>
      </div>
      <QuickCallButton />
    </div>
  );
}
