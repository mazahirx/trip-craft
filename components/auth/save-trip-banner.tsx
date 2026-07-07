"use client";

import Link from "next/link";

interface SaveTripBannerProps {
  checkpointCount: number;
}

export function SaveTripBanner({ checkpointCount }: SaveTripBannerProps) {
  if (checkpointCount < 2) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-muted bg-surface px-gap-md py-gap-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-body-md font-semibold text-primary">Save this trip</p>
        <p className="text-body-md text-text-secondary">Your checkpoints and budget are saved to your account.</p>
      </div>
      <Link
        href="/trips"
        className="shrink-0 bg-accent-sky text-accent-sky-on px-4 py-2 rounded text-body-md font-medium hover:opacity-90 transition-opacity text-center"
      >
        Back to trips
      </Link>
    </div>
  );
}
