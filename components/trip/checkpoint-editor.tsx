"use client";

import { useState } from "react";
import { useTripStore, type CheckpointWithStays } from "@/stores/trip-store";

export function CheckpointEditor({ tripId }: { tripId: string }) {
  const checkpoints = useTripStore((s) => s.checkpoints);
  const addCheckpoint = useTripStore((s) => s.addCheckpoint);
  const removeCheckpoint = useTripStore((s) => s.removeCheckpoint);
  const [showForm, setShowForm] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  function handleAdd() {
    if (!newLocation.trim()) return;
    const cp: CheckpointWithStays = {
      id: crypto.randomUUID(),
      tripId,
      orderIndex: checkpoints.length,
      locationName: newLocation.trim(),
      latitude: null,
      longitude: null,
      arrivalDate: null,
      departureDate: null,
      notes: null,
      stays: [],
    };
    addCheckpoint(cp);
    setNewLocation("");
    setShowForm(false);
  }

  return (
    <div className="space-y-0 relative">
      {checkpoints.map((cp) => (
        <div key={cp.id} className="itinerary-item group relative flex gap-gap-lg pb-8 md:pb-12">
          <div className="vertical-line" />
          <div className="relative z-10">
            <div className="w-6 h-6 rounded-full bg-primary border-4 border-bg-canvas ring-1 ring-border-subtle flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px] text-on-primary">drag_indicator</span>
            </div>
          </div>
          <div className="flex-grow pt-0.5 min-w-0">
            <div className="flex justify-between items-start mb-2 gap-2">
              <div className="min-w-0">
                <h4 className="text-body-lg md:text-headline-md font-bold text-primary truncate">{cp.locationName}</h4>
                <span className="text-text-secondary text-label-md">
                  {cp.arrivalDate
                    ? `${new Date(cp.arrivalDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}${cp.departureDate ? ` — ${new Date(cp.departureDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : ""}`
                    : "Date TBD"}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="px-2 py-0.5 bg-hover-fill rounded-full text-label-md text-text-secondary">Stay</span>
                <button type="button" onClick={() => removeCheckpoint(cp.id)} className="text-label-md text-text-secondary hover:text-error transition-colors">Remove</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-md mt-4">
              <div className="p-3 md:p-4 border border-border-subtle rounded-lg hover:border-border-muted transition-colors bg-surface-container-lowest">
                <div className="flex items-center gap-2 mb-2 text-text-secondary">
                  <span className="material-symbols-outlined text-[18px]">hotel</span>
                  <span className="text-label-md font-semibold uppercase tracking-wider">Lodging</span>
                </div>
                <p className="text-body-md text-text-secondary italic">{cp.stays?.length ? cp.stays[0].name : "No lodging set"}</p>
              </div>
              <div className="p-3 md:p-4 border border-border-subtle rounded-lg hover:border-border-muted transition-colors bg-surface-container-lowest">
                <div className="flex items-center gap-2 mb-2 text-text-secondary">
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  <span className="text-label-md font-semibold uppercase tracking-wider">Notes</span>
                </div>
                <p className="text-body-md text-text-secondary leading-relaxed">{cp.notes || "No notes for this stop."}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="relative flex gap-gap-lg group">
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-6 h-6 rounded-full bg-bg-canvas border border-dashed border-border-muted flex items-center justify-center hover:bg-hover-fill transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-text-secondary">add</span>
          </button>
        </div>
        <div className="flex-grow">
          {showForm ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Search for a city or place…"
                className="flex-1 bg-transparent border-b border-border-subtle focus:border-primary outline-none text-body-md py-1 placeholder:text-text-secondary"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
                autoFocus
              />
              <button type="button" onClick={handleAdd} className="text-label-md text-primary font-medium hover:opacity-80">Add</button>
              <button type="button" onClick={() => { setShowForm(false); setNewLocation(""); }} className="text-label-md text-text-secondary hover:text-primary">Cancel</button>
            </div>
          ) : (
            <button type="button" onClick={() => setShowForm(true)} className="text-text-secondary text-body-md hover:text-primary transition-colors flex items-center gap-2">
              <span>Add a new stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
