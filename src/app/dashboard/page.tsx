"use client";

import { useSession } from "next-auth/react";
import JournalEntriesWidget from "@/components/JournalEntriesWidget";
import WeatherWidget from "@/components/WeatherWidget";
import CalendarWidget from "@/components/CalendarWidget";
import MoodTracker from "@/components/MoodTracker";
import PhysicalSymptomsTracker from "@/components/PhysicalSymptomsTracker";
import NoteToSelf from "@/components/NoteToSelf";
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
        className="grid"
        style={{
          gridTemplateColumns: "320px 400px 320px",
          gap: "32px",
          width: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Left column: Weather at top, Health below */}
        <div style={{ gridColumn: 1, gridRow: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: "32px",
            }}
          >
            <DashboardCard>
              <WeatherWidget />
            </DashboardCard>
            <DashboardCard>
              <NoteToSelf />
            </DashboardCard>
            <DashboardCard>
              <PhysicalSymptomsTracker />
            </DashboardCard>
          </div>
        </div>
        {/* Center column: flex stack for organic placement */}
        <div style={{ gridColumn: 2, gridRow: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <Image
              src="/logo.png"
              alt="Ursul.ai Logo"
              width={160}
              height={160}
              className="bouncy-glow"
            />
            <div style={{ width: 260 }}>
              <DashboardCard>
                <JournalEntriesWidget />
              </DashboardCard>
            </div>
            <DashboardCard>
              <CalendarWidget />
            </DashboardCard>
          </div>
        </div>
        {/* Right column: Mood at top, Note to Self at bottom */}
        <div
          style={{
            gridColumn: 3,
            gridRow: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <DashboardCard className="mb-8">
              <MoodTracker />
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
}
