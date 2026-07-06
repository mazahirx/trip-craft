"use client";

import { useEffect, useState } from "react";
import { useTripStore } from "@/stores/trip-store";
import { fetchTrip } from "@/lib/api/trips";
import { CheckpointEditor } from "@/components/trip/checkpoint-editor";
import { SaveTripBanner } from "@/components/auth/save-trip-banner";

export function TripView({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    trip, companions, setTrip, setCompanions, setCheckpoints, setBudgetItems, setNotes, checkpoints, reset,
  } = useTripStore();

  useEffect(() => {
    reset();
    async function load() {
      try {
        const data = await fetchTrip(tripId);
        setTrip(data);
        setCompanions(data.companions);
        setCheckpoints(data.checkpoints);
        setBudgetItems(data.budgetItems);
        setNotes(data.notes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load trip");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tripId, reset, setTrip, setCompanions, setCheckpoints, setBudgetItems, setNotes]);

  if (loading) return <div className="flex items-center justify-center py-20"><span className="text-body-md text-text-secondary">Loading trip…</span></div>;
  if (error) return <div className="rounded-lg border border-error-container/50 bg-error-container/10 p-6 text-center"><p className="text-body-md text-error">{error}</p></div>;
  if (!trip) return null;

  const totalDays = trip.startDate && trip.endDate
    ? Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-10">
      <div className="relative w-full h-64 overflow-hidden rounded-xl bg-surface">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-border-muted">image</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-headline-lg md:text-display tracking-tight text-primary">{trip.title}</h2>
          <p className="text-text-secondary text-body-md md:text-body-lg mt-2">
            {trip.startDate
              ? `${new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${trip.endDate ? new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"}`
              : "No dates set"}
          </p>
        </div>
        <div className="flex gap-gap-sm flex-wrap">
          <span className="px-2 py-1 bg-surface-container text-text-secondary text-label-md rounded border border-border-subtle flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            {totalDays > 0 ? `${totalDays} days` : "Draft"}
          </span>
          <span className="px-2 py-1 bg-surface-container text-text-secondary text-label-md rounded border border-border-subtle flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">group</span>
            {companions.length} Travelers
          </span>
        </div>
      </div>

      <SaveTripBanner checkpointCount={checkpoints.length} />
      <CheckpointEditor tripId={tripId} />
    </div>
  );
}
