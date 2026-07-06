"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

const navItems = [
  { href: "/trips", icon: "map", label: "My Trips" },
  { href: "/trips/new", icon: "layers", label: "Templates" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

const bottomItems = [
  { href: "/help", icon: "help", label: "Help" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isAnonymous, user } = useAuth();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface border-r border-border-subtle z-50 py-spacing-gap-lg px-spacing-gap-md">
      <div className="mb-spacing-gap-lg px-2">
        <Link href="/">
          <h1 className="text-headline-md font-bold text-primary tracking-tight">
            TripCraft
          </h1>
          <p className="text-label-md text-text-secondary mt-1">
            Minimal Travel Planning
          </p>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
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

      <div className="pt-spacing-gap-lg border-t border-border-subtle space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded transition-colors text-text-secondary hover:bg-hover-fill hover:text-primary"
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-body-md">{item.label}</span>
          </Link>
        ))}
        {!isAnonymous && user && (
          <button
            onClick={async () => {
              const { signOut } = await import("@/lib/auth/client");
              await signOut();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-3 py-2 rounded transition-colors text-text-secondary hover:bg-hover-fill hover:text-primary w-full text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-body-md">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
