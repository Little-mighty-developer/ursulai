"use client";

import { useEffect, useState } from "react";

interface WeatherCondition {
  icon: string;
  main: string;
  description: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface WeatherSys {
  sunrise: number;
  sunset: number;
}

interface WeatherWind {
  speed: number;
}

export interface WeatherData {
  weather: WeatherCondition[];
  main: WeatherMain;
  wind: WeatherWind;
  sys: WeatherSys;
  name: string;
}

export interface OverviewData {
  [key: string]: unknown;
}

export function useWeatherData() {
  const [weather, setWeather] = useState<WeatherData | null>(null); // 2.5
  const [overview, setOverview] = useState<OverviewData | null>(null); // 3.0
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      setError("Weather API key not configured");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch 2.5 weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        // Fetch 3.0 overview (cache daily)
        const today = new Date().toISOString().slice(0, 10);
        const overviewKey = `weather_overview_${today}`;
        let overviewData = null;

        try {
          // Check localStorage for cached overview
          if (
            typeof window !== "undefined" &&
            localStorage.getItem(overviewKey)
          ) {
            overviewData = JSON.parse(localStorage.getItem(overviewKey)!);
          } else {
            // Try to fetch 3.0 overview (this endpoint may not be available for all API keys)
            const overviewUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            try {
              const overviewRes = await fetch(overviewUrl);
              if (overviewRes.ok) {
                overviewData = await overviewRes.json();
                if (typeof window !== "undefined") {
                  localStorage.setItem(
                    overviewKey,
                    JSON.stringify(overviewData),
                  );
                }
              }
            } catch (overviewErr) {
              // 3.0 API might not be available, continue without it
              console.warn("3.0 overview API not available:", overviewErr);
            }
          }

          // Fetch current weather
          const weatherRes = await fetch(weatherUrl);
          if (!weatherRes.ok) {
            const errorData = await weatherRes.json().catch(() => ({}));
            throw new Error(
              errorData.message || `Weather API error: ${weatherRes.status}`,
            );
          }
          const weatherData = await weatherRes.json();
          setWeather(weatherData);
          setOverview(overviewData);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Could not fetch weather";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let errorMessage = "Location permission denied";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage =
            "Location permission denied. Please enable location access.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out.";
        }
        setError(errorMessage);
        setLoading(false);
      },
    );
  }, []);

  return { weather, overview, loading, error };
}
