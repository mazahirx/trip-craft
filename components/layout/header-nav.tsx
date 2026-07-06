"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { SignOutButton } from "@/components/auth/auth-form";

export function HeaderNav() {
  const { user, isAnonymous } = useAuth();

  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link href="/trips/new" className="text-zinc-600 hover:text-zinc-900">
        New trip
      </Link>
      {user && !isAnonymous ? (
        <>
          <span className="hidden text-zinc-500 sm:inline">
            {user.email}
          </span>
          <SignOutButton />
        </>
      ) : (
        <Link
          href="/auth/login"
          className="rounded-lg bg-teal-600 px-3 py-1.5 font-medium text-white hover:bg-teal-700"
        >
          Save trips
        </Link>
      )}
    </nav>
  );
}
