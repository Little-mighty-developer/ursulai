'use client';

import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
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
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Weather fetch failed");
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          setError("Could not fetch weather");
        }
        setLoading(false);
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return <div>Weather unavailable</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <span className="text-lg font-semibold mb-2">Weather</span>
      <span className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</span>
      <span className="capitalize">{weather.weather[0].description}</span>
      <span className="text-sm text-gray-500">{weather.name}</span>
    </div>
  );
}
