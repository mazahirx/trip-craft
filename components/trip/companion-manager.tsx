"use client";

import { useState } from "react";
import { useTripStore } from "@/stores/trip-store";
import type { Companion } from "@/lib/db/schema";

export function CompanionManager() {
  const companions = useTripStore((s) => s.companions);
  const addCompanion = useTripStore((s) => s.addCompanion);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleAdd() {
    if (!name.trim()) return;
    const companion: Companion = {
      id: crypto.randomUUID(),
      tripId: "",
      name: name.trim(),
      color: null,
      avatarUrl: null,
    };
    addCompanion(companion);
    setName("");
    setShowForm(false);
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-zinc-900">
          Companions ({companions.length})
        </h2>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700"
        >
          Add companion
        </button>
      </div>

      {showForm && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700"
          >
            Add
          </button>
        </div>
      )}

      {companions.length === 0 && !showForm && (
        <p className="mt-4 text-sm text-zinc-500">
          No companions yet. Who are you traveling with?
        </p>
      )}

      <ul className="mt-4 space-y-1">
        {companions.map((c) => (
          <li key={c.id} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
            <span className="flex size-6 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-700">
              {c.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-zinc-900">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
