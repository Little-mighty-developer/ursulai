"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// TODO: Fix the onboarding quiz before re-enabling. It currently flashes in and
// out with no stable condition: the quiz renders immediately on load while the
// GET /api/onboarding check is still in flight, then the dashboard redirect
// yanks it away. Gate rendering on the fetch result (loading state) instead of
// showing the quiz optimistically. Re-enable by setting this to true.
const ONBOARDING_QUIZ_ENABLED = false;

type Step = "welcome" | "q1" | "q2" | "q3" | "q4" | "close";

const INTENTIONS = [
  { id: "reflection", label: "Gentle reflection", emoji: "🌿" },
  { id: "patterns", label: "Understanding patterns", emoji: "🧭" },
  { id: "support", label: "Emotional support", emoji: "🫶" },
  { id: "writing", label: "Writing things out", emoji: "✍️" },
  { id: "curious", label: "Just curious", emoji: "🕯" },
  { id: "unsure", label: "Not sure yet", emoji: "⏳" },
] as const;

const ENERGY_OPTIONS = [
  { id: "simple", label: "Simple, minimal", emoji: "🌊" },
  { id: "guidance", label: "A little guidance", emoji: "🌤" },
  { id: "structure", label: "I like structure when it's gentle", emoji: "🌱" },
] as const;

const CHECKIN_OPTIONS = [
  { id: "visual", label: "Moving something visual", emoji: "🖱" },
  { id: "writing", label: "Writing a few words", emoji: "✍️" },
  { id: "thinking", label: "Thinking quietly", emoji: "💭" },
  { id: "changes", label: "It changes day to day", emoji: "🔁" },
] as const;

const TRACKING_OPTIONS = [
  { id: "patterns", label: "I like patterns", emoji: "📅" },
  { id: "gentle", label: "Gently, when it happens", emoji: "🌱" },
  { id: "no-pressure", label: "I don't want pressure", emoji: "🙅" },
  { id: "see-how", label: "I'll see how it goes", emoji: "🤷" },
] as const;

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [intentions, setIntentions] = useState<string[]>([]);
  const [energyPreference, setEnergyPreference] = useState<string | null>(null);
  const [checkInStyle, setCheckInStyle] = useState<string | null>(null);
  const [trackingPreference, setTrackingPreference] = useState<string | null>(
    null,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/register");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    if (!ONBOARDING_QUIZ_ENABLED) {
      // Quiz disabled: skip straight to the dashboard. We deliberately don't
      // mark onboarding complete, so users will see the quiz once it's fixed.
      router.push("/dashboard");
      return;
    }

    fetch("/api/onboarding")
      .then((res) => res.json())
      .then((data) => {
        if (data.onboardingCompleted) {
          router.push("/dashboard");
        }
      })
      .catch(() => {});
  }, [status, router]);

  const toggleIntention = (id: string) => {
    setIntentions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intentions,
          energyPreference,
          checkInStyle,
          trackingPreference,
        }),
      });
      router.push("/dashboard");
    } catch {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      router.push("/dashboard");
    } catch {
      setSaving(false);
    }
  };

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    !ONBOARDING_QUIZ_ENABLED
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 via-purple-50/50 to-amber-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const containerClass =
    "min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-purple-50/50 to-amber-50 px-6 py-12";

  return (
    <div className={containerClass}>
      <div className="max-w-lg w-full">
        {/* Logo - same size and animation as dashboard */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Ursul.ai Logo"
            width={360}
            height={360}
            className="bouncy-glow"
          />
        </div>

        {/* Welcome */}
        {step === "welcome" && (
          <div className="animate-fade-in text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              ✨ Welcome to Ursul
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This is a space for noticing, not fixing.
              <br />
              <br />
              If you&apos;d like, you can answer a few gentle questions to help
              Ursul feel more like yours.
              <br />
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStep("q1")}
                className="w-full bg-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-purple-600 transition shadow-sm"
              >
                Let&apos;s begin
              </button>
              <button
                onClick={handleSkip}
                disabled={saving}
                className="w-full bg-white/80 text-gray-600 font-medium py-3 px-6 rounded-xl hover:bg-white hover:text-gray-800 transition border border-gray-200"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Q1: Intention */}
        {step === "q1" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              What brings you here right now?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Pick any that feel right
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {INTENTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleIntention(opt.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition border ${
                    intentions.includes(opt.id)
                      ? "bg-purple-100 border-purple-300 text-purple-800"
                      : "bg-white border-gray-200 text-gray-700 hover:border-purple-200"
                  }`}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStep("q2")}
                className="w-full bg-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-purple-600 transition shadow-sm"
              >
                Continue
              </button>
              <button
                onClick={handleSkip}
                disabled={saving}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Q2: Energy */}
        {step === "q2" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              On most days, what feels easier?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Choose one that feels right
            </p>
            <div className="flex flex-col gap-2 mb-8">
              {ENERGY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setEnergyPreference(opt.id)}
                  className={`px-4 py-3 rounded-xl text-left font-medium transition border ${
                    energyPreference === opt.id
                      ? "bg-purple-100 border-purple-300 text-purple-800"
                      : "bg-white border-gray-200 text-gray-700 hover:border-purple-200"
                  }`}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStep("q3")}
                className="w-full bg-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-purple-600 transition shadow-sm"
              >
                Continue
              </button>
              <button
                onClick={handleSkip}
                disabled={saving}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Q3: Check-in style */}
        {step === "q3" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              When checking in with yourself, what feels best?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Choose one that feels right
            </p>
            <div className="flex flex-col gap-2 mb-8">
              {CHECKIN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCheckInStyle(opt.id)}
                  className={`px-4 py-3 rounded-xl text-left font-medium transition border ${
                    checkInStyle === opt.id
                      ? "bg-purple-100 border-purple-300 text-purple-800"
                      : "bg-white border-gray-200 text-gray-700 hover:border-purple-200"
                  }`}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStep("q4")}
                className="w-full bg-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-purple-600 transition shadow-sm"
              >
                Continue
              </button>
              <button
                onClick={handleSkip}
                disabled={saving}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Q4: Tracking */}
        {step === "q4" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              How do you feel about tracking over time?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Choose one that feels right
            </p>
            <div className="flex flex-col gap-2 mb-8">
              {TRACKING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTrackingPreference(opt.id)}
                  className={`px-4 py-3 rounded-xl text-left font-medium transition border ${
                    trackingPreference === opt.id
                      ? "bg-purple-100 border-purple-300 text-purple-800"
                      : "bg-white border-gray-200 text-gray-700 hover:border-purple-200"
                  }`}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStep("close")}
                className="w-full bg-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-purple-600 transition shadow-sm"
              >
                Continue
              </button>
              <button
                onClick={handleSkip}
                disabled={saving}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Close */}
        {step === "close" && (
          <div className="animate-fade-in text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome 🤍
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This space is yours now.
              <br />
              <br />
              Come as you are.
            </p>
            <button
              onClick={handleComplete}
              disabled={saving}
              className="w-full bg-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-purple-600 transition shadow-sm disabled:opacity-70"
            >
              ✨ Step inside
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
