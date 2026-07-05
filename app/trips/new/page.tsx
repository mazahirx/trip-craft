import { AppShell } from "@/components/layout/app-shell";

export default function NewTripPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-zinc-900">Create a new trip</h1>
      <p className="mt-2 text-zinc-600">
        You&apos;ll start in anonymous mode — sign up anytime to save forever.
      </p>
      <p className="mt-8 rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
        Trip creation form — destination picker, companions, initial budget.
      </p>
    </AppShell>
  );
}
