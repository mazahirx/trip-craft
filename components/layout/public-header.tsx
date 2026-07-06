"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";

export function PublicHeader() {
  const { user, isAnonymous } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-canvas/80 backdrop-blur-md border-b border-border-subtle">
      <nav className="flex justify-between items-center h-16 px-spacing-margin-mobile md:px-spacing-margin-page max-w-max-width-content mx-auto">
        <div className="flex items-center gap-spacing-gap-sm">
          <Link href="/" className="text-headline-md font-bold text-primary">
            TripCraft
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-spacing-gap-lg">
          <Link
            href="/trips"
            className="text-text-secondary text-body-md hover:text-primary transition-soft"
          >
            My Trips
          </Link>
          {user && !isAnonymous ? (
            <span className="text-text-secondary text-body-md">{user.email}</span>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-text-secondary text-body-md hover:text-primary transition-soft"
              >
                Sign in
              </Link>
              <Link
                href="/auth/login"
                className="bg-primary text-on-primary px-spacing-gap-md py-spacing-gap-sm rounded-lg text-label-md font-medium hover:opacity-90 transition-soft"
              >
                Launch App
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden p-spacing-base">
          <span className="material-symbols-outlined text-primary">menu</span>
        </button>
      </nav>
    </header>
  );
}
