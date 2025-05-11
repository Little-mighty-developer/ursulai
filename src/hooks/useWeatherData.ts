"use client";

import { useEffect, useState } from "react";

export function useWeatherData() {
  const [weather, setWeather] = useState<any>(null); // 2.5
  const [overview, setOverview] = useState<any>(null); // 3.0
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { weather, overview, loading, error };
}
