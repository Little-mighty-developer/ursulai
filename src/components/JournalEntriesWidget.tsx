"use client";

export default function JournalEntriesWidget({
  count = 0,
}: {
  count?: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <span className="text-lg font-semibold mb-2">Journal Entries</span>
      <span className="text-4xl font-bold text-purple-700">{count}</span>
    </div>
  );
}
