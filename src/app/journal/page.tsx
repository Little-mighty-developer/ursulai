"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RecentJournalEntries from "@/components/RecentJournalEntries";

// Extend Window interface for SpeechRecognition
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [noSpeechWarning, setNoSpeechWarning] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // Tracks whether the user wants recording on, without re-triggering effects
  const shouldListenRef = useRef(false);
  const noSpeechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTranscriptTimeRef = useRef<number>(Date.now());
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = async () => {
    if (!session?.user?.email) {
      setError("You must be logged in to save journal entries");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: entry }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage =
          data.error || data.details || "Failed to save entry";
        throw new Error(errorMessage);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save entry");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  // Handle clicking outside tooltip to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setNoSpeechWarning(false);
        lastTranscriptTimeRef.current = Date.now();

        // Clear any existing timeout
        if (noSpeechTimeoutRef.current) {
          clearTimeout(noSpeechTimeoutRef.current);
        }

        // Set timeout to warn if no speech detected after 3 seconds
        noSpeechTimeoutRef.current = setTimeout(() => {
          const timeSinceLastTranscript =
            Date.now() - lastTranscriptTimeRef.current;
          if (timeSinceLastTranscript >= 3000 && shouldListenRef.current) {
            setNoSpeechWarning(true);
          }
        }, 3000);
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        // Update last transcript time if we got any results
        if (finalTranscript || interimTranscript) {
          lastTranscriptTimeRef.current = Date.now();
          setNoSpeechWarning(false);

          // Clear and reset the timeout
          if (noSpeechTimeoutRef.current) {
            clearTimeout(noSpeechTimeoutRef.current);
          }
        }

        // Append final transcript to entry
        if (finalTranscript) {
          setEntry((prev) => {
            const newEntry = prev + finalTranscript;
            return newEntry;
          });
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        shouldListenRef.current = false;
        setIsListening(false);
        setNoSpeechWarning(false);

        // Clear timeout on error
        if (noSpeechTimeoutRef.current) {
          clearTimeout(noSpeechTimeoutRef.current);
        }

        if (event.error === "aborted") {
          // The session was cancelled (e.g. tab backgrounded or stopped
          // mid-start); not a real failure, so don't alarm the user.
          return;
        }

        if (event.error === "not-allowed") {
          setError(
            "Microphone access denied. Please enable microphone permissions in your browser settings.",
          );
        } else if (event.error === "no-speech") {
          setError(
            "No speech detected. Please move closer to your microphone and try again.",
          );
        } else if (event.error === "audio-capture") {
          setError(
            "No microphone found. Please check your microphone connection.",
          );
        } else if (event.error === "network") {
          setError("Network error. Please check your internet connection.");
        } else {
          setError(
            `Speech recognition error: ${event.error}. Please try again.`,
          );
        }
      };

      recognition.onend = () => {
        // Mobile browsers often end the session after each phrase even with
        // continuous = true, so restart while the user still wants to record.
        if (shouldListenRef.current) {
          try {
            recognition.start();
            return;
          } catch (err) {
            console.error("Error restarting recognition:", err);
            shouldListenRef.current = false;
          }
        }

        setIsListening(false);
        setNoSpeechWarning(false);

        // Clear timeout when recognition ends
        if (noSpeechTimeoutRef.current) {
          clearTimeout(noSpeechTimeoutRef.current);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      shouldListenRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
      setNoSpeechWarning(false);
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
      }
    } else {
      setError(null);
      setNoSpeechWarning(false);
      try {
        shouldListenRef.current = true;
        recognitionRef.current.start();
      } catch (err) {
        console.error("Error starting recognition:", err);
        shouldListenRef.current = false;
        setError("Failed to start voice recording. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 mb-2 relative">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            What&apos;s fueling your transformation story?
          </h2>
          {isSupported && (
            <div className="relative" ref={tooltipRef}>
              <button
                type="button"
                aria-label="How to use voice-to-text"
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                aria-expanded={showTooltip}
              >
                <span className="text-sm text-gray-500 font-semibold">?</span>
              </button>
              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 w-80 p-5 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 pointer-events-auto">
                  <div className="space-y-3">
                    <p>
                      Click the microphone button to start recording. Speak
                      clearly and move closer to your microphone for best
                      results.
                    </p>
                    <p>
                      If you&apos;re using Google Chrome, you can enable
                      &quot;Voice Isolation&quot; in your microphone settings to
                      reduce background noise and system sounds.
                    </p>
                    <p className="text-purple-300 font-medium">
                      The microphone will pick up your voice, not system sounds.
                    </p>
                  </div>
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-full mt-4 mb-6 relative">
          <textarea
            className="w-full p-4 pr-12 rounded-2xl border-none outline-none resize-none text-lg text-gray-900 placeholder-gray-400 bg-gradient-to-br from-indigo-50 to-purple-50 shadow"
            rows={8}
            placeholder="Let your thoughts flow..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          {isSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute top-3 right-3 p-3 rounded-full transition-all ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white shadow-lg`}
              title={isListening ? "Stop recording" : "Start voice recording"}
              disabled={isSaving}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isListening ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                )}
              </svg>
            </button>
          )}
          {isListening && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2 text-red-500 text-sm font-medium">
              <span className="animate-pulse">●</span>
              Listening...
            </div>
          )}
        </div>
        {isListening && (
          <p className="w-full -mt-3 mb-4 text-center text-xs text-gray-500">
            Recording is on — tap the red button when you&apos;re done so it
            stops listening. 🎙️
          </p>
        )}
        {noSpeechWarning && isListening && (
          <div className="w-full mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-xl border border-yellow-300">
            <div className="font-semibold mb-1">No speech detected</div>
            <div className="text-sm">
              Please move closer to your microphone and speak clearly. The
              microphone will pick up your voice, not system sounds.
            </div>
          </div>
        )}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}
        <div className="flex gap-4 w-full justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || !entry.trim()}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <RecentJournalEntries />
        <div className="mt-8 text-center text-gray-600 text-sm">
          Journal 3 days in a week to unlock{" "}
          <Link
            href="/dashboard"
            className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
          >
            Threads Emerging
          </Link>{" "}
          and{" "}
          <Link
            href="/dashboard"
            className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
          >
            Look Back
          </Link>{" "}
          — AI reflections on your dashboard.
        </div>
      </div>
    </div>
  );
}
