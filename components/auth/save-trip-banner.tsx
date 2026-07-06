"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";

interface SaveTripBannerProps {
  checkpointCount: number;
}

export function SaveTripBanner({ checkpointCount }: SaveTripBannerProps) {
  const { isAnonymous } = useAuth();

  if (!isAnonymous || checkpointCount < 2) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-muted bg-surface px-spacing-gap-md py-spacing-gap-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-body-md font-semibold text-primary">Save this trip forever</p>
        <p className="text-body-md text-text-secondary">
          Sign up in seconds — your checkpoints and budget stay linked to your account.
        </p>
      </div>
      <Link
        href="/auth/login?redirect=/trips"
        className="shrink-0 bg-primary text-on-primary px-4 py-2 rounded text-body-md font-medium hover:opacity-90 transition-opacity text-center"
      >
        Create free account
      </Link>
    </div>
  );
}
