"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NoteToSelf() {
  const { data: session } = useSession();
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
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
      {isSaved ? (
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
      ) : (
        <>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A thought I want to remember..."
            className="w-full text-center text-lg font-medium p-4 mb-4 rounded-2xl border-none outline-none resize-none"
            style={{
              background: "linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)",
              color: "#444",
              minHeight: 60,
              boxShadow: "0 2px 16px 0 rgba(80, 80, 200, 0.04)",
            }}
            rows={3}
            maxLength={240}
          />
          <button
            onClick={saveNote}
            disabled={isSaving || !note.trim()}
            className="w-full py-2 rounded-2xl text-lg font-bold text-white"
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
        </>
      )}
    </div>
  );
}
