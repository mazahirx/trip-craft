"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTripStore } from "@/stores/trip-store";
import { fetchTrip } from "@/lib/api/trips";
import { CheckpointEditor } from "@/components/trip/checkpoint-editor";
import { SaveTripBanner } from "@/components/auth/save-trip-banner";

export function TripView({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    trip, companions, setTrip, setCompanions, setCheckpoints, setBudgetItems, setNotes, checkpoints, reset, coverImageUrl, setCoverImage,
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

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !trip) return;
    setUploading(true);
    try {
      const { createClient } = await import("@/lib/db/supabase-client");
      const supabase = createClient();
      await supabase.auth.getUser();
      const ext = file.name.split(".").pop();
      const filePath = `${trip.id}/cover.${ext}`;
      const { data, error: uploadError } = await supabase.storage
        .from("trip-covers")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("trip-covers")
        .getPublicUrl(data.path);
      setCoverImage(publicUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-in"><svg className="animate-spin h-6 w-6 text-accent-sky" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg></div></div>;
  if (error) return <div className="rounded-lg border border-error-container/50 bg-error-container/10 p-6 text-center"><p className="text-body-md text-error">{error}</p></div>;
  if (!trip) return null;

  const totalDays = trip.startDate && trip.endDate
    ? Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-10">
      <div
        className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl bg-surface cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        {coverImageUrl ? (
          <Image src={coverImageUrl} alt="Trip cover" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-border-muted">image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-4 py-2 rounded-lg text-body-md flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            {uploading ? "Uploading…" : "Change cover"}
          </div>
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />

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
