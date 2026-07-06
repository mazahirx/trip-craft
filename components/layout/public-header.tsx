"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

export function PublicHeader() {
  const { user, isAnonymous } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-canvas/80 backdrop-blur-md border-b border-border-subtle">
      <nav className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-page max-w-max-width-content mx-auto">
        <div className="flex items-center gap-gap-sm">
          <Link href="/" className="text-headline-md font-bold text-primary">
            TripCraft
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4 gap-gap-lg">
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
                className="bg-primary text-on-primary px-gap-md py-gap-sm rounded-lg text-label-md font-medium hover:opacity-90 transition-soft"
              >
                Launch App
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden p-base" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className="material-symbols-outlined text-primary">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-bg-canvas border-b border-border-subtle px-margin-mobile py-gap-md space-y-gap-sm">
          <Link href="/trips" className="block text-body-md text-text-secondary hover:text-primary transition-soft" onClick={() => setMobileOpen(false)}>My Trips</Link>
          {user && !isAnonymous ? (
            <span className="block text-body-md text-text-secondary">{user.email}</span>
          ) : (
            <>
              <Link href="/auth/login" className="block text-body-md text-text-secondary hover:text-primary transition-soft" onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link href="/auth/login" className="block text-center bg-primary text-on-primary px-gap-md py-gap-sm rounded-lg text-label-md font-medium hover:opacity-90 transition-soft" onClick={() => setMobileOpen(false)}>Launch App</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
