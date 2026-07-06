"use client";

import { useTripSummary } from "@/stores/trip-store";

interface TripSummaryBarProps {
  currency?: string;
}

export function TripSummaryBar({ currency = "USD" }: TripSummaryBarProps) {
  const { totalDays, totalBudget, perPerson } = useTripSummary();
  const formatter = new Intl.NumberFormat(undefined, { style: "currency", currency });

  return (
    <div className="flex flex-wrap items-center gap-6 border border-border-subtle rounded-lg bg-surface px-spacing-gap-md py-spacing-gap-sm">
      <SummaryItem label="Duration" value={`${totalDays} days`} />
      <SummaryItem label="Total budget" value={formatter.format(totalBudget)} />
      <SummaryItem label="Per person" value={formatter.format(perPerson)} />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-label-md uppercase tracking-wide text-text-secondary">{label}</p>
      <p className="text-headline-md text-primary">{value}</p>
    </div>
  );
}
