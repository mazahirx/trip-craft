"use client";

import { useState } from "react";
import { useTripStore, type CheckpointWithStays } from "@/stores/trip-store";
import { LocationSearch } from "@/components/trip/location-search";
import type { GeocodeResult } from "@/lib/api/trips";

export function CheckpointEditor({ tripId }: { tripId: string }) {
  const checkpoints = useTripStore((s) => s.checkpoints);
  const addCheckpoint = useTripStore((s) => s.addCheckpoint);
  const removeCheckpoint = useTripStore((s) => s.removeCheckpoint);
  const [showForm, setShowForm] = useState(false);

  function handleAdd(location: GeocodeResult) {
    const cp: CheckpointWithStays = {
      id: crypto.randomUUID(),
      tripId,
      orderIndex: checkpoints.length,
      locationName: location.displayName,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      arrivalDate: null,
      departureDate: null,
      notes: null,
      stays: [],
    };
    addCheckpoint(cp);
    setShowForm(false);
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-zinc-900">
          Checkpoints ({checkpoints.length})
        </h2>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700"
        >
          Add stop
        </button>
      </div>

      {showForm && (
        <div className="mt-4">
          <LocationSearch
            onSelect={handleAdd}
            placeholder="Search for a city or place…"
          />
        </div>
      )}

      {checkpoints.length === 0 && !showForm && (
        <p className="mt-4 text-sm text-zinc-500">
          No checkpoints yet. Add your first stop.
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {checkpoints.map((cp, i) => (
          <li
            key={cp.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-zinc-100 px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-700">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-zinc-900 truncate">
                  {cp.locationName}
                </span>
              </div>
              {cp.arrivalDate && (
                <p className="mt-0.5 text-xs text-zinc-500">
                  {new Date(cp.arrivalDate).toLocaleDateString()}
                  {cp.departureDate && ` — ${new Date(cp.departureDate).toLocaleDateString()}`}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeCheckpoint(cp.id)}
              className="shrink-0 text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
