import type { ReactNode } from "react";
import { PublicHeader } from "./public-header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-canvas">
      <PublicHeader />
      <main>{children}</main>
    </div>
  );
}
