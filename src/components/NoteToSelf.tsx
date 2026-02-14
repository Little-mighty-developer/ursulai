"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NoteToSelf() {
  const { data: session } = useSession();
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchNote();
    }
  }, [session]);

  const fetchNote = async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      if (data.content) {
        setNote(data.content);
        setIsSaved(true);
      } else {
        setNote("");
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    if (!note.trim()) return;
    setIsSaving(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: note }),
      });
      if (!response.ok) {
        throw new Error("Failed to save note");
      }
      setIsSaved(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const callAi = async (action: "suggest" | "polish") => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/notes/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          ...(action === "polish" && { content: note }),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      if (data.content) {
        setNote(data.content.slice(0, 240));
      }
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!session) return null;

  if (isLoading) {
    return (
      <div
        className="bg-white rounded-3xl shadow-lg p-5 animate-pulse"
        style={{ minWidth: 260 }}
      >
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>
        <div className="h-16 bg-gray-100 rounded-2xl mb-4"></div>
        <div className="h-10 bg-purple-200 rounded-2xl w-3/4 mx-auto"></div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center"
      style={{ minWidth: 260 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
        Note to Self{" "}
        <span role="img" aria-label="sparkles">
          ✨
        </span>
      </h2>
      {isSaved && !isEditing ? (
        <>
          <div
            className="w-full text-center text-lg font-medium p-4 mb-2 rounded-2xl"
            style={{
              border: "2.5px solid gold",
              background: "#fffbe8",
              color: "#7c5e00",
              boxShadow: "0 2px 16px 0 rgba(200, 180, 80, 0.08)",
              minHeight: 60,
            }}
          >
            {note}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium mt-1"
          >
            Edit · Polish with AI
          </button>
        </>
      ) : (
        <>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setAiError(null);
            }}
            placeholder="A thought I want to remember..."
            className="w-full text-center text-lg font-medium p-4 mb-2 rounded-2xl border-none outline-none resize-none"
            style={{
              background: "linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)",
              color: "#444",
              minHeight: 60,
              boxShadow: "0 2px 16px 0 rgba(80, 80, 200, 0.04)",
            }}
            rows={3}
            maxLength={240}
          />
          <div className="flex gap-3 justify-center mb-3">
            <button
              onClick={() => callAi("suggest")}
              disabled={isAiLoading}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAiLoading ? "..." : "Suggest"}
            </button>
            <button
              onClick={() => callAi("polish")}
              disabled={isAiLoading || !note.trim()}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Polish
            </button>
          </div>
          {aiError && <p className="text-sm text-red-600 mb-2">{aiError}</p>}
          <div className="flex gap-2 w-full">
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
            <button
              onClick={saveNote}
              disabled={isSaving || !note.trim()}
              className="flex-1 py-2 rounded-2xl text-lg font-bold text-white"
              style={{
                background: isSaving
                  ? "#a78bfa"
                  : "linear-gradient(90deg, #a78bfa 0%, #c084fc 100%)",
                opacity: isSaving || !note.trim() ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
