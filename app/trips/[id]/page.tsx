import { AppShell } from "@/components/layout/app-shell";
import { TripSummaryBar } from "@/components/trip/trip-summary-bar";

interface TripPageProps {
  params: Promise<{ id: string }>;
}

export default async function TripPage({ params }: TripPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Trip planner</h1>
          <p className="mt-1 text-sm text-zinc-500">Trip ID: {id}</p>
        </div>
        <TripSummaryBar />
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-zinc-900">Checkpoints</h2>
            <p className="mt-4 text-sm text-zinc-500">
              Multi-city route editor with MapLibre map.
            </p>
          </section>
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-zinc-900">Budget</h2>
            <p className="mt-4 text-sm text-zinc-500">
              Line items with instant rollup.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
