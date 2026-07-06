"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TripWithRelations } from "@/lib/trip-utils";
import { createClient } from "@/lib/db/supabase-client";

export function TripsDashboard() {
  const [trips, setTrips] = useState<TripWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }
        const res = await fetch("/api/trips");
        if (res.ok) setTrips(await res.json());
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><span className="text-body-md text-text-secondary">Loading trips…</span></div>;
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center justify-between mb-spacing-gap-lg">
          <h3 className="text-headline-md text-primary">Upcoming Trips</h3>
          {trips.length > 2 && (
            <button className="text-label-md text-text-secondary hover:text-primary flex items-center gap-1">
              View All <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
            </button>
          )}
        </div>
        {trips.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border-subtle rounded-lg">
            <span className="material-symbols-outlined text-4xl text-border-muted mb-4">map</span>
            <p className="text-body-md text-text-secondary mb-4">No trips yet. Start planning your next adventure.</p>
            <Link href="/trips/new" className="inline-block bg-primary text-on-primary px-6 py-2 rounded text-body-md font-medium hover:opacity-90 transition-opacity">
              Create your first trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-gap-lg">
            {trips.slice(0, 4).map((trip) => (
              <Link key={trip.id} href={`/trips/${trip.id}`} className="group cursor-pointer border border-border-subtle hover:border-primary transition-all duration-300 p-spacing-base rounded-lg">
                <div className="relative aspect-[16/9] overflow-hidden rounded mb-spacing-gap-sm bg-surface">
                  <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    <span className="material-symbols-outlined text-3xl">map</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {trip.startDate && trip.endDate
                      ? `${Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} Days`
                      : "Draft"}
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h4 className="text-headline-md text-primary group-hover:text-primary transition-colors truncate">{trip.title}</h4>
                  <p className="text-body-md text-text-secondary mt-1">
                    {trip.startDate
                      ? `${new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${trip.endDate ? new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"}`
                      : "No dates set"}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    {trip.checkpoints?.slice(0, 3).map((cp) => (
                      <span key={cp.id} className="px-2 py-0.5 bg-hover-fill text-label-md rounded">{cp.locationName.split(",")[0]}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-spacing-gap-lg">
          <h3 className="text-headline-md text-primary">Templates & Drafts</h3>
          <Link href="/trips/new" className="bg-primary text-on-primary px-3 py-1 rounded text-label-md hover:opacity-90 transition-opacity flex items-center gap-1">
            <span className="material-symbols-outlined !text-[14px]">add</span> New Draft
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-spacing-gap-md h-[320px]">
          <Link href="/trips/new" className="col-span-2 relative group cursor-pointer overflow-hidden rounded-lg border border-border-subtle bg-surface flex items-center justify-center">
            <div className="text-center p-6">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">auto_awesome</span>
              <h5 className="text-body-lg text-primary">Quick Start</h5>
              <p className="text-text-secondary text-[12px] mt-1">Create a new trip</p>
            </div>
          </Link>
          <div className="col-span-1 grid grid-rows-2 gap-spacing-gap-md">
            <Link href="/trips/new" className="relative group cursor-pointer overflow-hidden rounded-lg border border-border-subtle bg-surface flex flex-col justify-center items-center p-4 text-center">
              <span className="material-symbols-outlined text-primary mb-2">auto_awesome</span>
              <h5 className="text-body-lg text-primary">Quick Start</h5>
              <p className="text-text-secondary text-[12px] mt-1">AI-generated itinerary</p>
            </Link>
            <Link href="/trips/new" className="relative group cursor-pointer overflow-hidden rounded-lg border border-border-subtle bg-primary flex flex-col justify-center items-center p-4 text-center text-on-primary">
              <span className="material-symbols-outlined mb-2">map</span>
              <h5 className="text-body-lg">Blank Map</h5>
              <p className="text-on-primary/70 text-[12px] mt-1">Start from scratch</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
