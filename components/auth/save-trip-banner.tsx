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
    <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-amber-900">Save this trip forever</p>
        <p className="text-sm text-amber-800">
          Sign up in seconds — your checkpoints and budget stay linked to your account.
        </p>
      </div>
      <Link
        href="/auth/login?redirect=/trips"
        className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Create free account
      </Link>
    </div>
  );
}
