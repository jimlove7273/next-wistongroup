'use client';

import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if we're in an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  // Don't render until we're on the client side
  if (!isClient) {
    return <>{children}</>;
  }

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
