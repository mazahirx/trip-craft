import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Plan your next adventure
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Pick destinations, add checkpoints, track budget and duration in real
          time — no account required.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/trips/new"
            className="rounded-lg bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
          >
            Start planning
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Sign in to save trips
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
