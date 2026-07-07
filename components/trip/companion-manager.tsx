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
    const companion: Companion = { id: crypto.randomUUID(), tripId: "", name: name.trim(), color: null, avatarUrl: null };
    addCompanion(companion);
    setName("");
    setShowForm(false);
  }

  return (
    <div className="border border-border-subtle rounded-lg bg-surface p-gap-md">
      <div className="flex items-center justify-between">
        <h2 className="text-headline-md text-primary">Companions ({companions.length})</h2>
        <button type="button" onClick={() => setShowForm(true)} className="bg-accent-green text-accent-green-on px-3 py-1.5 rounded text-label-md font-medium hover:opacity-90 transition-opacity">Add companion</button>
      </div>
      {showForm && (
        <div className="mt-4 flex gap-2">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
            className="flex-1 px-3 py-2 border border-border-subtle rounded text-body-md text-primary bg-bg-canvas focus:border-primary focus:outline-none transition-soft" />
          <button type="button" onClick={handleAdd} className="bg-accent-green text-accent-green-on px-4 py-2 rounded text-body-md font-medium hover:opacity-90 transition-opacity">Add</button>
        </div>
      )}
      {companions.length === 0 && !showForm && <p className="mt-4 text-body-md text-text-secondary">No companions yet. Who are you traveling with?</p>}
      <ul className="mt-4 space-y-1">
        {companions.map((c) => (
          <li key={c.id} className="flex items-center gap-2 px-3 py-2 text-body-md">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary-container text-label-md text-on-primary-container">{c.name.charAt(0).toUpperCase()}</span>
            <span className="text-primary">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
