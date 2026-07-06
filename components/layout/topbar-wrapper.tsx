"use client";

import { TopBar } from "./topbar";

interface TopBarWrapperProps {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function TopBarWrapper(props: TopBarWrapperProps) {
  return <TopBar {...props} />;
}
