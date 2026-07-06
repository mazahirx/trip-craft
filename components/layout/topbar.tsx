"use client";

import { useAuth } from "@/components/providers/auth-provider";

interface TopBarProps {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function TopBar({ title, breadcrumb, actions }: TopBarProps) {
  const { user, isAnonymous } = useAuth();

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-bg-canvas border-b border-border-subtle">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-page max-w-max-width-content mx-auto">
        <div className="flex items-center gap-gap-md min-w-0">
          {breadcrumb && (
            <div className="hidden md:flex items-center gap-2 text-text-secondary text-body-md mr-2 truncate">
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  <span className="truncate">{crumb.label}</span>
                </span>
              ))}
            </div>
          )}
          <h2 className="text-body-lg md:text-headline-md font-bold text-primary truncate">{title}</h2>
        </div>
        <div className="flex items-center gap-gap-md shrink-0">
          {actions}
          {user && !isAnonymous && (
            <span className="hidden sm:inline text-label-md text-text-secondary truncate max-w-[120px]">{user.email}</span>
          )}
          {isAnonymous && (
            <a
              href="/auth/login"
              className="bg-primary text-on-primary px-3 md:px-4 py-1.5 rounded text-label-md md:text-body-md font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Save trips
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
