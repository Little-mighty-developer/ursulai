"use client";

import { useWeatherData } from "@/hooks/useWeatherData";

const conditionMeta: Record<
  string,
  { emoji: string; label: string; note: string }
> = {
  Clear: {
    emoji: "☀️",
    label: "Clear",
    note: "Clear skies — if you feel like moving, a gentle walk or stretch could help you settle.",
  },
  Clouds: {
    emoji: "🌤️",
    label: "Cloudy",
    note: "If conditions shifted earlier today, notice what your body is still carrying.",
  },
  Rain: {
    emoji: "🌧️",
    label: "Rainy",
    note: "Rain can invite a slower pace — a soft moment for letting your thoughts land.",
  },
  Drizzle: {
    emoji: "🌦️",
    label: "Drizzly",
    note: "Rain can invite a slower pace — a soft moment for letting your thoughts land.",
  },
  Snow: {
    emoji: "❄️",
    label: "Snowy",
    note: "Cold can linger in the body — warmth, rest, or something comforting might feel supportive.",
  },
  Thunderstorm: {
    emoji: "⛈️",
    label: "Stormy",
    note: "Charged conditions can stir up energy — gentle movement might help release some pressure.",
  },
  Mist: {
    emoji: "🌫️",
    label: "Misty",
    note: "A soft, muted day — no need to rush anything.",
  },
  Fog: {
    emoji: "🌫️",
    label: "Foggy",
    note: "A soft, muted day — no need to rush anything.",
  },
};

const defaultMeta = {
  emoji: "🌈",
  label: "",
  note: "Whatever the weather, it's a good moment to check in with yourself.",
};

export default function TodayCard() {
  const { weather, loading } = useWeatherData();

  const main = weather?.weather?.[0]?.main;
  const meta = (main && conditionMeta[main]) || {
    ...defaultMeta,
    label: main ?? "",
  };
  const temp = weather ? Math.round(weather.main.temp) : null;

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow p-6">
      <div className="text-lg text-gray-800">
        {loading ? (
          <span className="text-sm text-gray-500">Loading weather…</span>
        ) : weather ? (
          <span>
            {meta.emoji} {meta.label || "Today"}
            {temp !== null && <> · {temp}°C</>}
          </span>
        ) : null}
      </div>

      {weather && <p className="mt-3 text-sm text-gray-700">{meta.note}</p>}
    </div>
  );
}
