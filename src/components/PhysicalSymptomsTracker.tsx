import React, { useState, useRef, useEffect, RefObject } from "react";
import { useSession } from "next-auth/react";

const SYMPTOMS = [
  { key: "cramps", label: "Cramps", emoji: "⚡️" },
  {
    key: "muscle_spasms",
    label: "Muscle spasms",
    image: "/images/muscle-pain.png",
  },
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

function InfoTooltip({
  show,
  infoRef,
}: {
  show: boolean;
  infoRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        // Do nothing here; let parent handle closing
      }
    }
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, infoRef]);

  if (!show) return null;
  return (
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
        Tap a symptom to start tracking it. Tap again to stop. We'll record how
        long you experience each symptom. Each symptom is tracked independently.
      </div>
    </div>
  );
}

function SymptomButton({
  symptom,
  isActive,
  feedback,
  onClick,
  disabled,
}: {
  symptom: any;
  isActive: boolean;
  feedback: "on" | "off" | null;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: 160,
        padding: "12px 18px",
        margin: 4,
        borderRadius: 16,
        border: isActive ? "2px solid #4f46e5" : "1px solid #ddd",
        background: isActive ? "#eef2ff" : "#fff",
        color: "#222",
        fontWeight: 500,
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        boxShadow: isActive ? "0 2px 8px #4f46e522" : "none",
        transition: "all 0.15s",
        position: "relative",
      }}
      disabled={disabled}
    >
      {symptom.image ? (
        <img
          src={symptom.image}
          alt={symptom.label}
          style={{ height: 24, width: 24, objectFit: "contain" }}
        />
      ) : (
        <span style={{ fontSize: 24 }}>{symptom.emoji}</span>
      )}{" "}
      {symptom.label}
      {feedback === "on" && (
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 1,
            color: "#f87171",
            fontSize: 20,
          }}
        >
          ❗️
        </span>
      )}
      {feedback === "off" && (
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 1,
            color: "#a3e635",
            fontSize: 20,
          }}
        >
          ✨
        </span>
      )}
    </button>
  );
}

const PhysicalSymptomsTracker: React.FC = () => {
  const [activeSymptoms, setActiveSymptoms] = useState<{
    [key: string]: boolean;
  }>({});
  const [timestamps, setTimestamps] = useState<SymptomTimestamps>({});
  const [showInfo, setShowInfo] = useState(false);
  const [feedback, setFeedback] = useState<{
    [key: string]: "on" | "off" | null;
  }>({});
  const infoRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.email;

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

  // Arrange symptoms in an inverted pyramid: 4, 3, 2, 2
  const pyramidRows = [
    SYMPTOMS.slice(0, 4),
    SYMPTOMS.slice(4, 7),
    SYMPTOMS.slice(7, 9),
    SYMPTOMS.slice(9, 11),
  ];

  return (
    <div
      className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
      style={{
        minWidth: 400,
        maxWidth: 800,
        margin: "0 auto",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: 8,
        }}
      >
        <h2
          className="text-2xl font-bold text-center text-gray-900"
          style={{ margin: 0 }}
        >
          Health Tracker
        </h2>
        <div style={{ position: "relative", marginLeft: 10 }} ref={infoRef}>
          <button
            aria-label="How to use"
            onClick={() => setShowInfo((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              color: "#4f46e5",
              padding: 4,
              marginTop: 2,
            }}
          >
            ℹ️
          </button>
          <InfoTooltip show={showInfo} infoRef={infoRef} />
        </div>
      </div>
      <div className="text-center mb-6 text-lg">
        Are you feeling any of these?
      </div>
      <div style={{ width: "100%", marginBottom: 12 }}>
        {pyramidRows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              marginBottom: 18,
            }}
          >
            {row.map((symptom) => (
              <SymptomButton
                key={symptom.key}
                symptom={symptom}
                isActive={!!activeSymptoms[symptom.key]}
                feedback={feedback[symptom.key] || null}
                onClick={() => handleToggle(symptom.key)}
                disabled={!userId}
              />
            ))}
          </div>
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
