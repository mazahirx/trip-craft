"use client";

import { useEffect, useState } from "react";
import { useTripStore } from "@/stores/trip-store";
import { fetchTrip } from "@/lib/api/trips";
import { TripSummaryBar } from "@/components/trip/trip-summary-bar";
import { CheckpointEditor } from "@/components/trip/checkpoint-editor";
import { BudgetEditor } from "@/components/trip/budget-editor";
import { CompanionManager } from "@/components/trip/companion-manager";
import { SaveTripBanner } from "@/components/auth/save-trip-banner";

export function TripView({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { trip, setTrip, setCompanions, setCheckpoints, setBudgetItems, setNotes, checkpoints, reset } = useTripStore();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-zinc-500">Loading trip…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!trip) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{trip.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Created {new Date(trip.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <SaveTripBanner checkpointCount={checkpoints.length} />
      <TripSummaryBar currency={trip.currency} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CheckpointEditor tripId={tripId} />
          <BudgetEditor tripId={tripId} />
        </div>
        <div className="space-y-6">
          <CompanionManager />
        </div>
      </div>
    </div>
  );
}
