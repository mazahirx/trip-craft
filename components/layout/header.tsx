import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-teal-700">
          TripCraft
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/trips/new" className="text-zinc-600 hover:text-zinc-900">
            New trip
          </Link>
          <Link href="/auth/login" className="text-zinc-600 hover:text-zinc-900">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
