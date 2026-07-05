"use client";

import { useTripSummary } from "@/stores/trip-store";

interface TripSummaryBarProps {
  currency?: string;
}

export function TripSummaryBar({ currency = "USD" }: TripSummaryBarProps) {
  const { totalDays, totalBudget, perPerson } = useTripSummary();

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  return (
    <div className="flex flex-wrap items-center gap-6 rounded-xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
      <SummaryItem label="Duration" value={`${totalDays} days`} />
      <SummaryItem label="Total budget" value={formatter.format(totalBudget)} />
      <SummaryItem label="Per person" value={formatter.format(perPerson)} />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="text-lg font-semibold text-zinc-900">{value}</p>
    </div>
  );
}
