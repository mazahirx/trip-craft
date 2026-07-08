"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { useState } from "react";

const navItems = [
  { href: "/trips", icon: "map", label: "My Trips" },
  { href: "/trips/new", icon: "layers", label: "Templates" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

const bottomItems = [
  { href: "/help", icon: "help", label: "Help" },
  { href: "https://github.com/mazahirx/trip-craft", icon: "star", label: "Star on GitHub", external: true },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      <div className="mb-gap-lg px-2">
        <Link href="/" onClick={onNavigate}>
          <h1 className="text-headline-md font-bold text-primary tracking-tight">TripCraft</h1>
          <p className="text-label-md text-text-secondary mt-1">Minimal Travel Planning</p>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "/trips"
            ? (pathname === "/trips" || (pathname.startsWith("/trips/") && !pathname.startsWith("/trips/new")))
            : item.href === "/trips/new"
            ? (pathname === "/trips/new")
            : (pathname === item.href || pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-gap-sm px-3 py-2 rounded transition-colors ${
                isActive
                  ? "bg-hover-fill text-primary font-semibold"
                  : "text-text-secondary hover:bg-hover-fill hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-body-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-gap-lg border-t border-border-subtle space-y-1">
        {bottomItems.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-gap-sm px-3 py-2 rounded transition-colors text-text-secondary hover:bg-hover-fill hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-body-md">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-gap-sm px-3 py-2 rounded transition-colors text-text-secondary hover:bg-hover-fill hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-body-md">{item.label}</span>
            </Link>
          )
        )}
        {user && (
          <button
            onClick={async () => {
              const { signOut } = await import("@/lib/auth/client");
              await signOut();
              window.location.href = "/";
            }}
            className="flex items-center gap-gap-sm px-3 py-2 rounded transition-colors text-text-secondary hover:bg-hover-fill hover:text-primary w-full text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-body-md">Logout</span>
          </button>
        )}
      </div>
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface border-r border-border-subtle z-50 py-gap-lg px-gap-md">
        <SidebarContent />
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 h-full bg-surface border-r border-border-subtle py-gap-lg px-gap-md overflow-y-auto">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
      <button
        className="fixed bottom-4 left-4 z-40 md:hidden bg-accent-sky text-accent-sky-on p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
      </button>
    </>
  );
}
