"use client";

import React, { useState } from "react";
import { useWeatherData } from "@/hooks/useWeatherData";

const weatherSuggestions: Record<
  string,
  { emoji: string; message: string | React.ReactNode }
> = {
  Clear: {
    emoji: "🚶‍♀️",
    message:
      "Clear skies right now. If you feel like moving, a gentle walk or stretch could help you settle into the day. Notice the rhythm of your breath as you move.",
  },
  Clouds: {
    emoji: "🧘‍♀️",
    message: (
      <>
        It's cloudy at the moment.{" "}
        <strong>
          If conditions shifted earlier today, notice what your body is still
          carrying.
        </strong>
      </>
    ),
  },
  Rain: {
    emoji: "📓",
    message:
      "Rainy conditions can invite a slower pace. This could be a soft moment for journalling or letting your thoughts land without rushing them.",
  },
  Snow: {
    emoji: "☕",
    message:
      "Cold exposure can linger in the body even after it passes. Warmth, rest, or something comforting might feel especially supportive right now.",
  },
  Thunderstorm: {
    emoji: "🤸‍♀️",
    message:
      "Charged conditions can stir up energy in the body. Gentle movement, shaking it out, or stretching might help release some pressure.",
  },
};

function getTemperatureNuance(feelsLike: number) {
  if (feelsLike <= 0) {
    return " Cold exposure earlier today may still be affecting your body — gentle warmth or movement can help.";
  } else if (feelsLike <= 10) {
    return " Cool air can sharpen the senses, but the body may tire more easily over time.";
  } else if (feelsLike <= 20) {
    return " This temperature is often comfortable — a nice window for light movement or fresh air.";
  } else if (feelsLike <= 27) {
    return " Warmth can feel soothing, but pacing yourself and staying hydrated may support your energy.";
  } else {
    return " Heat can be draining — rest, shade, and hydration can make a big difference today.";
  }
}

function getWeatherSuggestion(
  main: string,
  isSunrise: boolean,
  isSunset: boolean,
  feelsLike: number,
): { emoji: string; message: string | React.ReactNode } {
  if (isSunrise) {
    return {
      emoji: "🌅🧘‍♀️",
      message:
        "A transition moment. If it feels right, pause for one slow breath and set a gentle intention for the day.",
    };
  }
  if (isSunset) {
    return {
      emoji: "🌇📷",
      message:
        "The day is winding down. You might like to notice one small detail that stayed with you — a colour, a moment, a feeling.",
    };
  }

  const base = weatherSuggestions[main] || {
    emoji: "🌈",
    message:
      "Whatever the weather, it's a great day to journal and care for yourself!",
  };

  const nuance = getTemperatureNuance(feelsLike);

  const message = (
    <>
      {base.message} {nuance}
    </>
  );

  return {
    emoji: base.emoji,
    message,
  };
}

function formatTimeUserTZ(unixUtc: number) {
  const date = new Date(unixUtc * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function WeatherWidget() {
  const { weather, overview, loading, error } = useWeatherData();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showFullSuggestion, setShowFullSuggestion] = useState(false);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center">
        <span className="text-lg font-semibold mb-2">Today's Atmosphere</span>
        <div className="text-gray-600">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col items-center">
        <span className="text-lg font-semibold mb-2">Today's Atmosphere</span>
        <div className="text-red-600 text-sm text-center">{error}</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex w-full flex-col items-center">
        <span className="text-lg font-semibold mb-2">Today's Atmosphere</span>
        <div className="text-gray-600 text-sm">Weather unavailable</div>
      </div>
    );
  }

  // 2.5 data
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const sunrise = weather.sys.sunrise;
  const sunset = weather.sys.sunset;
  const location = weather.name;

  // 3.0 data
  const weatherOverview: string =
    (typeof overview?.weather_overview === "string"
      ? overview.weather_overview
      : null) ?? weather.weather[0].description;

  const { emoji, message } = getWeatherSuggestion(
    weather.weather[0].main,
    Math.floor(Date.now() / 1000) >= sunrise &&
      Math.floor(Date.now() / 1000) < sunrise + 1800,
    Math.floor(Date.now() / 1000) >= sunset &&
      Math.floor(Date.now() / 1000) < sunset + 1800,
    feelsLike,
  );

  return (
    <div className="flex w-full flex-col items-center">
      <span className="text-base font-semibold mb-2">Today's Atmosphere</span>
      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="h-14 w-14 sm:h-16 sm:w-16 mb-2 drop-shadow-lg animate-float"
      />
      <div className="relative flex items-center">
        <span className="text-3xl sm:text-4xl font-extrabold">{temp}°C</span>
        <span
          className="ml-2 cursor-pointer text-gray-400"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ⓘ
          {showTooltip && (
            <span className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded bg-white p-2 text-xs text-gray-700 shadow-lg z-10">
              {weatherOverview}
            </span>
          )}
        </span>
      </div>
      <span className="text-sm text-gray-500 italic mt-1">
        {location} feels like {feelsLike}°C
      </span>
      <div className="mt-2 grid w-full grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
        <span>Humidity: {humidity}%</span>
        <span className="text-right">Wind: {wind} m/s</span>
        <span>🌅 {formatTimeUserTZ(sunrise)}</span>
        <span className="text-right">🌆 {formatTimeUserTZ(sunset)}</span>
      </div>
      <div className="mt-3 w-full text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">{emoji}</span>
          <button
            type="button"
            onClick={() => setShowFullSuggestion((v) => !v)}
            className="text-xs font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            {showFullSuggestion ? "Less" : "More"}
          </button>
        </div>
        <p
          className={[
            "mt-1 text-sm text-gray-800",
            showFullSuggestion ? "" : "max-h-10 overflow-hidden",
          ].join(" ")}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
