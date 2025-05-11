"use client";

import { useEffect, useState } from "react";

function getWeatherSuggestion(
  main: string,
  isSunrise: boolean,
  isSunset: boolean,
  humidity: number,
) {
  if (isSunrise) {
    return {
      emoji: "🌅",
      message:
        "Sunrise! A new day, a new beginning. Take a deep breath and set an intention for today.",
    };
  }
  if (isSunset) {
    return {
      emoji: "🌇",
      message:
        "Sunset—time to wind down. Reflect on one thing you're grateful for today.",
    };
  }
  if (humidity > 80) {
    return {
      emoji: "💧",
      message:
        "It's quite humid. Remember to hydrate and take breaks if you feel sluggish.",
    };
  }
  switch (main) {
    case "Clear":
      return {
        emoji: "☀️",
        message:
          "Clear skies — a perfect backdrop for a 10-minute walking meditation. Imagine the world as your personal orchestra today: what sounds rise and fall as you move through it?",
      };
    case "Clouds":
      return {
        emoji: "☁️",
        message:
          "A cloudy day is no match for a sunny disposition. What's one bright thing you're holding on to today?",
      };
    case "Rain":
      return {
        emoji: "🌧️",
        message:
          "If you want the rainbow, you gotta put up with the rain. What do the sounds of rain feel like to your senses?",
      };
    case "Snow":
      return {
        emoji: "❄️",
        message:
          "It's chilly outside — perfect for staying cozy. What little comforts can you offer yourself today?",
      };
    case "Thunderstorm":
      return {
        emoji: "⛈️",
        message:
          "Not all storms come to disrupt your life, some come to clear your path. What are you ready to release? Or are you set to bring the thunder?",
      };
    default:
      return {
        emoji: "🌈",
        message:
          "Whatever the weather, it's a great day to journal and care for yourself!",
      };
  }
}

function formatTime(unixUtc: number, timezoneOffset: number) {
  // Show time in the weather location's local time
  const localUnix = unixUtc + timezoneOffset;
  const date = new Date(localUnix * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatTimeUserTZ(unixUtc: number) {
  const date = new Date(unixUtc * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

        // Fetch 2.5 weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        // Fetch 3.0 overview (cache daily)
        const today = new Date().toISOString().slice(0, 10);
        const overviewKey = `weather_overview_${today}`;
        let overviewData = null;
        if (localStorage.getItem(overviewKey)) {
          overviewData = JSON.parse(localStorage.getItem(overviewKey)!);
        } else {
          const overviewUrl = `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
          const overviewRes = await fetch(overviewUrl);
          if (overviewRes.ok) {
            overviewData = await overviewRes.json();
            localStorage.setItem(overviewKey, JSON.stringify(overviewData));
          }
        }

        try {
          const weatherRes = await fetch(weatherUrl);
          if (!weatherRes.ok) throw new Error("Weather fetch failed");
          const weatherData = await weatherRes.json();
          setWeather(weatherData);
          setOverview(overviewData);
        } catch (err) {
          setError("Could not fetch weather");
        }
        setLoading(false);
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      },
    );
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return <div>Weather unavailable</div>;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const sunrise = weather.sys.sunrise;
  const sunset = weather.sys.sunset;
  const location = weather.name;

  const weatherOverview =
    overview?.weather_overview ?? weather.weather[0].description;

  const { emoji, message } = getWeatherSuggestion(
    weather.weather[0].main,
    Math.floor(Date.now() / 1000) >= sunrise &&
      Math.floor(Date.now() / 1000) < sunrise + 1800,
    Math.floor(Date.now() / 1000) >= sunset &&
      Math.floor(Date.now() / 1000) < sunset + 1800,
    humidity,
  );

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow p-6 flex flex-col items-center">
      <span className="text-lg font-semibold mb-2">Weather</span>
      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="w-20 h-20 mb-2 drop-shadow-lg animate-float"
      />
      <div className="relative flex items-center">
        <span className="text-5xl font-extrabold">{temp}°C</span>
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
      <div className="flex gap-4 mt-2 text-sm text-gray-600">
        <span>Humidity: {humidity}%</span>
        <span>Wind: {wind} m/s</span>
      </div>
      <div className="flex gap-4 mt-2 text-sm text-gray-600">
        <span>🌅 Sunrise: {formatTimeUserTZ(sunrise)}</span>
        <span>🌆 Sunset: {formatTimeUserTZ(sunset)}</span>
      </div>
      <div className="mt-4 text-center">
        <span className="text-2xl">{emoji}</span>
        <p className="text-sm text-gray-800 mt-1">{message}</p>
      </div>
    </div>
  );
}
