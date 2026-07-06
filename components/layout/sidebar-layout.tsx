import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBarWrapper } from "./topbar-wrapper";

interface SidebarLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumb?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function SidebarLayout({
  children,
  title = "TripCraft",
  breadcrumb,
  actions,
}: SidebarLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-canvas">
      <Sidebar />
      <TopBarWrapper title={title} breadcrumb={breadcrumb} actions={actions} />
      <main className="pt-24 pb-16 px-spacing-margin-mobile md:ml-64 md:px-spacing-margin-page">
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
