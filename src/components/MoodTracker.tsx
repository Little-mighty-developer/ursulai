import React, { useState, useEffect } from "react";
import { MoodSlider } from "./MoodSlider";

const moodCategories = [
  {
    key: "energy",
    label: "Energy",
    emojis: ["😩", "😊", "⚡️"],
    tooltips: ["Exhausted", "Steady", "Energized"],
    gradient: "from-yellow-200 via-yellow-300 to-yellow-400",
  },
  {
    key: "calmness",
    label: "Calmness",
    emojis: ["😰", "😐", "🧘‍♂️"],
    tooltips: ["Stressed", "Calm", "Relaxed"],
    gradient: "from-blue-200 via-blue-300 to-blue-400",
  },
  {
    key: "connection",
    label: "Connection",
    emojis: ["🥶", "🤝", "👯‍♂️"],
    tooltips: ["Isolated", "Connected", "Social"],
    gradient: "from-pink-200 via-pink-300 to-pink-400",
  },
  {
    key: "anticipation",
    label: "Anticipation",
    emojis: ["😟", "😐", "🎉"],
    tooltips: ["Anxious", "Neutral", "Excited"],
    gradient: "from-red-200 via-red-300 to-red-400",
  },
  {
    key: "socialBattery",
    label: "Social Battery",
    emojis: ["🪫", "⚡", "🔋"],
    tooltips: ["Drained", "Recharging", "Charged"],
    gradient: "from-green-200 via-green-300 to-green-400",
  },
  {
    key: "joy",
    label: "Joy",
    emojis: ["😐", "🙂", "😂"],
    tooltips: ["Numb", "Happy", "Ecstatic"],
    gradient: "from-purple-200 via-purple-300 to-purple-400",
  },
  {
    key: "sadness",
    label: "Sadness",
    emojis: ["😔", "🛡️", "🌟"],
    tooltips: ["Heavy", "Resilient", "Hopeful"],
    gradient: "from-indigo-200 via-indigo-300 to-indigo-400",
  },
  {
    key: "desire",
    label: "Desire",
    emojis: ["😣", "🚪", "🫦"],
    tooltips: ["Frustrated", "Content", "Aroused"],
    gradient: "from-rose-200 via-rose-300 to-rose-400",
  },
];

export default function MoodTracker() {
  const [moods, setMoods] = useState<{ [key: string]: number }>(
    Object.fromEntries(moodCategories.map((cat) => [cat.key, 1])), // default to mid
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    moodCategories.forEach((cat) => {
      fetch(`/api/mood?moodType=${cat.key}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) setMoods((prev) => ({ ...prev, [cat.key]: data[0].value }));
        });
    });
  }, []);

  const handleChange = (key: string, value: number) => {
    setMoods((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = "test-user";
    const date = new Date().toISOString();

    const moodsArray = moodCategories.map((cat) => ({
      moodType: cat.key,
      value: moods[cat.key],
    }));

    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        date,
        moods: moodsArray,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("API error:", error);
      alert("Failed to submit moods: " + error.details);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Mood</h2>
      {moodCategories.map((cat) => (
        <MoodSlider
          key={cat.key}
          label={cat.label}
          value={moods[cat.key]}
          onChange={(val) => handleChange(cat.key, val)}
          emojis={cat.emojis}
          gradient={cat.gradient}
          tooltips={cat.tooltips}
        />
      ))}
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full font-semibold flex items-center gap-2"
      >
        Save Mood
        {saved && (
          <span className="ml-2 text-green-400 animate-bounce">✅</span>
        )}
      </button>
    </form>
  );
}
