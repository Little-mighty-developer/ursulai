import React, { useState } from "react";

type MoodSliderProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
  emojis: string[];
  gradient: string;
  tooltips: string[];
};

export function MoodSlider({
  label,
  value,
  onChange,
  emojis,
  gradient,
  tooltips,
}: MoodSliderProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{label}</span>
        <span
          className="text-2xl relative"
          onMouseEnter={() => setHovered(value)}
          onMouseLeave={() => setHovered(null)}
        >
          {emojis[value]}
          {hovered !== null && tooltips && tooltips[value] && (
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow">
              {tooltips[value]}
            </span>
          )}
        </span>
      </div>
      <div
        className={`w-full h-4 rounded-full bg-gradient-to-r ${gradient} flex items-center relative`}
      >
        <input
          type="range"
          min={0}
          max={2}
          value={value ?? 0}
          onChange={handleChange}
          className="w-full h-4 bg-transparent appearance-none"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1">
        {emojis.map((emoji, idx) => (
          <span
            key={idx}
            className="relative cursor-pointer"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {emoji}
            {hovered === idx && (
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow z-10 whitespace-nowrap">
                {tooltips[idx]}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
