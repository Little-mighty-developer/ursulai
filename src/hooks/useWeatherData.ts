"use client";

import { useEffect, useState, useCallback } from "react";

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

  const fetchWeather = useCallback(async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      setError("Weather API key not configured");
      setLoading(false);
      return;
    }

    // Fetch 2.5 weather (always fetch fresh, no cache)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    // Fetch 3.0 overview (cache daily)
    const today = new Date().toISOString().slice(0, 10);
    const overviewKey = `weather_overview_${today}`;
    let overviewData = null;

    try {
      // Check localStorage for cached overview
      if (typeof window !== "undefined" && localStorage.getItem(overviewKey)) {
        overviewData = JSON.parse(localStorage.getItem(overviewKey)!);
      } else {
        // Try to fetch 3.0 overview (this endpoint may not be available for all API keys)
        const overviewUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        try {
          const overviewRes = await fetch(overviewUrl);
          if (overviewRes.ok) {
            overviewData = await overviewRes.json();
            if (typeof window !== "undefined") {
              localStorage.setItem(overviewKey, JSON.stringify(overviewData));
            }
          }
        } catch (overviewErr) {
          // 3.0 API might not be available, continue without it
          console.warn("3.0 overview API not available:", overviewErr);
        }
      }

      // Fetch current weather (always fresh, no cache)
      const weatherRes = await fetch(weatherUrl, {
        cache: "no-store", // Ensure we always get fresh data
      });
      if (!weatherRes.ok) {
        const errorData = await weatherRes.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Weather API error: ${weatherRes.status}`,
        );
      }
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      setOverview(overviewData);
      setError(null); // Clear any previous errors
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Could not fetch weather";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    // Initial fetch
    navigator.geolocation.getCurrentPosition(fetchWeather, (error) => {
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
    });

    // Refresh weather data every 10 minutes
    const refreshInterval = setInterval(
      () => {
        navigator.geolocation.getCurrentPosition(fetchWeather, (error) => {
          console.warn("Failed to refresh weather:", error);
          // Don't set error state on refresh failures, just log
        });
      },
      10 * 60 * 1000,
    ); // 10 minutes

    return () => clearInterval(refreshInterval);
  }, [fetchWeather]);

  return { weather, overview, loading, error };
}
