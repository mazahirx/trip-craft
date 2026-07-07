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
      <main className="pt-16 pb-24 px-margin-mobile md:ml-64 md:px-margin-page">
        <div className="mx-auto mt-8 md:mt-12 animate-in" style={{ maxWidth: "900px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
