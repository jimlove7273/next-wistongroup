import type React from 'react';
import { LayoutWithSidebar } from '@/components/layout-with-sidebar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
