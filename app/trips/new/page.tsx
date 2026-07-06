import { AppShell } from "@/components/layout/app-shell";
import { TripCreator } from "@/components/trip/trip-creator";

export default function NewTripPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold text-zinc-900">Create a new trip</h1>
        <p className="mt-2 text-zinc-600">
          You&apos;ll start in anonymous mode — sign up anytime to save forever.
        </p>
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6">
          <TripCreator />
        </div>
      </div>
    </AppShell>
  );
}
