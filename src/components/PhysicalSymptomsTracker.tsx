import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

const SYMPTOMS = [
  { key: "cramps", label: "Cramps", emoji: "⚡️" },
  { key: "muscle_spasms", label: "Muscle spasms", image: "/images/muscle-pain.png" },
  { key: "jitteriness", label: "Jitteriness", image: "/images/jitters.png" },
  { key: "headache", label: "Headache", emoji: "🤕 " },
  { key: "body_pain", label: "Body pain", emoji: "😣" },
  { key: "brain_fog", label: "Brain fog", emoji: "😶‍🌫️" },
  { key: "bloating", label: "Bloating", image: "/images/bloating.png" },
  { key: "fatigue", label: "Fatigue", emoji: "😐" },
  { key: "nausea", label: "Nausea", emoji: "🤢" },
  { key: "appetite_changes", label: "Appetite changes", emoji: "🥑" },
  { key: "skin_changes", label: "Skin changes", image: "/images/acne.png" },
];

interface SymptomTimestamps {
  [key: string]: { on: Date[]; off: Date[] };
}

const PhysicalSymptomsTracker: React.FC = () => {
  const [activeSymptoms, setActiveSymptoms] = useState<{ [key: string]: boolean }>({});
  const [timestamps, setTimestamps] = useState<SymptomTimestamps>({});
  const [showInfo, setShowInfo] = useState(false);
  const [feedback, setFeedback] = useState<{ [key: string]: "on" | "off" | null }>({});
  const infoRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const handleToggle = async (key: string) => {
    setActiveSymptoms((prev) => {
      const isActive = !prev[key];
      setTimestamps((ts) => {
        const now = new Date();
        const prevTimestamps = ts[key] || { on: [], off: [] };
        return {
          ...ts,
          [key]: {
            on: isActive ? [...prevTimestamps.on, now] : prevTimestamps.on,
            off: !isActive ? [...prevTimestamps.off, now] : prevTimestamps.off,
          },
        };
      });
      return { ...prev, [key]: isActive };
    });

    if (!userId) return;
    const eventType = !activeSymptoms[key] ? "on" : "off";
    const timestamp = new Date().toISOString();
    try {
      const res = await fetch("/api/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, symptomKey: key, eventType, timestamp }),
      });
      if (res.ok) {
        setFeedback((f) => ({ ...f, [key]: eventType }));
        setTimeout(() => setFeedback((f) => ({ ...f, [key]: null })), 1200);
      }
    } catch (e) {
      // Optionally handle error
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    }
    if (showInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInfo]);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 24, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ textAlign: "center", flex: 1 }}>Health</h2>
        <div style={{ position: "relative" }} ref={infoRef}>
          <button
            aria-label="How to use"
            onClick={() => setShowInfo((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              marginLeft: 8,
              color: "#4f46e5",
              padding: 4,
            }}
          >
            ℹ️
          </button>
          {showInfo && (
            <div
              style={{
                position: "absolute",
                top: 32,
                right: 0,
                zIndex: 10,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 8,
                boxShadow: "0 2px 12px #0001",
                padding: "14px 18px",
                width: 260,
                fontSize: 15,
                color: "#333",
              }}
            >
              <strong>How to use:</strong>
              <div style={{ marginTop: 6 }}>
                Tap a symptom to start tracking it. Tap again to stop. We'll record how long you experience each symptom. Each symptom is tracked independently.
              </div>
            </div>
          )}
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666" }}>
        Are you experiencing any of these?
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {SYMPTOMS.map((symptom) => (
          <button
            key={symptom.key}
            onClick={() => handleToggle(symptom.key)}
            style={{
              minWidth: 160,
              padding: "12px 18px",
              margin: 4,
              borderRadius: 16,
              border: activeSymptoms[symptom.key] ? "2px solid #4f46e5" : "1px solid #ddd",
              background: activeSymptoms[symptom.key] ? "#eef2ff" : "#fff",
              color: "#222",
              fontWeight: 500,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              boxShadow: activeSymptoms[symptom.key] ? "0 2px 8px #4f46e522" : "none",
              transition: "all 0.15s",
              position: "relative",
            }}
            disabled={!userId}
          >
            {symptom.image ? (
              <img src={symptom.image} alt={symptom.label} style={{ height: 24, width: 24, objectFit: "contain" }} />
            ) : (
              <span style={{ fontSize: 24 }}>{symptom.emoji}</span>
            )} {symptom.label}
            {feedback[symptom.key] === "on" && (
              <span style={{ position: "absolute", right: 10, top: 1, color: "#f87171", fontSize: 20 }}>❗️</span>
            )}
            {feedback[symptom.key] === "off" && (
              <span style={{ position: "absolute", right: 10, top: 1, color: "#a3e635", fontSize: 20 }}>✨</span>
            )}
          </button>
        ))}
      </div>
      {!userId && (
        <div style={{ color: "#b91c1c", textAlign: "center", marginTop: 12 }}>
          Please sign in to track your symptoms.
        </div>
      )}
    </div>
  );
};

export default PhysicalSymptomsTracker; 