"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createTrip } from "@/lib/api/trips";
import { useTripStore } from "@/stores/trip-store";
import { LocationSearch } from "@/components/trip/location-search";
import { useAuth } from "@/components/providers/auth-provider";

export function TripCreator() {
  const router = useRouter();
  const setTrip = useTripStore((s) => s.setTrip);
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    setError(null);
    if (!title.trim()) { setError("Please enter a trip title"); return; }
    setLoading(true);
    try {
      const trip = await createTrip({
        title: title.trim(),
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
      });
      setTrip(trip);
      router.push(`/trips/${trip.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create trip");
    } finally {
      setLoading(false);
    }
  }, [title, startDate, endDate, router, setTrip]);

  if (!user) {
    return (
      <div className="text-center py-12 border border-dashed border-border-subtle rounded-lg">
        <span className="material-symbols-outlined text-4xl text-border-muted mb-4">lock</span>
        <p className="text-body-md text-text-secondary mb-4">Sign in to create a trip</p>
        <Link href="/auth/login?redirect=/trips/new" className="inline-block bg-accent-sky text-accent-sky-on px-6 py-2 rounded text-body-md font-medium hover:opacity-90 transition-opacity">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-gap-md">
      <div>
        <label htmlFor="title" className="block text-label-md text-text-secondary mb-1">Trip title</label>
        <input
          id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Summer in Japan"
          className="w-full px-3 py-2 border border-border-subtle rounded text-body-md text-primary bg-bg-canvas focus:border-primary focus:outline-none transition-soft"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="block text-label-md text-text-secondary mb-1">Start date</label>
          <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-border-subtle rounded text-body-md text-primary bg-bg-canvas focus:border-primary focus:outline-none transition-soft" />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-label-md text-text-secondary mb-1">End date</label>
          <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-border-subtle rounded text-body-md text-primary bg-bg-canvas focus:border-primary focus:outline-none transition-soft" />
        </div>
      </div>
      <LocationSearch />
      {error && <p className="text-body-md text-error bg-error-container/20 px-3 py-2 rounded">{error}</p>}
      <button
        type="button" onClick={handleCreate} disabled={loading}
        className="w-full bg-accent-green text-accent-green-on py-3 rounded text-body-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Creating…" : "Start planning"}
      </button>
    </div>
  );
}
