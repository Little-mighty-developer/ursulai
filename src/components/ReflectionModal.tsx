"use client";

import { useState, useEffect } from "react";

type ReflectionType = "threads" | "lookback";

interface ThreadsResponse {
  type: "threads";
  thematicSummary: string;
  emotionalPatterns: string;
  reflectivePrompts: string[];
  disclaimer: string;
}

interface LookbackResponse {
  type: "lookback";
  summary: string;
  disclaimer: string;
}

interface CrisisResponse {
  crisisSupport: true;
  message: string;
}

type ReflectionResponse = ThreadsResponse | LookbackResponse | CrisisResponse;

interface ReflectionModalProps {
  type: ReflectionType;
  isOpen: boolean;
  onClose: () => void;
}

const TITLES: Record<ReflectionType, string> = {
  threads: "🧵 Threads Emerging",
  lookback: "🔎 Look Back",
};

export default function ReflectionModal({
  type,
  isOpen,
  onClose,
}: ReflectionModalProps) {
  const [data, setData] = useState<ReflectionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setData(null);
    setError(null);
    setIsLoading(true);
    fetch("/api/reflection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Something went wrong");
        }
        setData(json);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, type]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reflection-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="reflection-title" className="text-xl font-bold text-gray-900">
            {TITLES[type]}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {isLoading && (
          <div className="py-8 text-center text-gray-500">
            Reflecting on your entries...
          </div>
        )}

        {error && <div className="py-4 text-red-600 text-sm">{error}</div>}

        {data &&
          !("crisisSupport" in data && data.crisisSupport) &&
          "type" in data && (
            <div className="space-y-5 text-gray-700">
              {data.type === "lookback" && (
                <section>
                  <h3 className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
                    Summary of your week
                  </h3>
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {data.summary}
                  </p>
                </section>
              )}

              {data.type === "threads" && (
                <>
                  <section>
                    <h3 className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
                      What&apos;s showing up
                    </h3>
                    <p className="text-base leading-relaxed">
                      {data.thematicSummary}
                    </p>
                  </section>
                  {data.emotionalPatterns && (
                    <section>
                      <h3 className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
                        Emotional patterns
                      </h3>
                      <p className="text-base leading-relaxed">
                        {data.emotionalPatterns}
                      </p>
                    </section>
                  )}
                  {data.reflectivePrompts.length > 0 && (
                    <section>
                      <h3 className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
                        Prompts to sit with
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-base">
                        {data.reflectivePrompts.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 italic">
                  {data.disclaimer}
                </p>
              </div>
            </div>
          )}

        {data && "crisisSupport" in data && data.crisisSupport && (
          <div className="py-4">
            <p className="text-base text-gray-700 leading-relaxed">
              {data.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
