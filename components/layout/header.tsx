import Link from "next/link";
import { HeaderNav } from "./header-nav";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-teal-700">
          TripCraft
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
