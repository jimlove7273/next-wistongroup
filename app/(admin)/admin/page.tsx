'use client';

import { useAuth } from '@/components/auth-provider';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    // Only redirect after auth provider is initialized
    if (isInitialized) {
      if (user) {
        // User is authenticated, redirect to dashboard
        redirect('/admin/dashboard');
      } else {
        // User is not authenticated, redirect to login
        redirect('/admin/login');
      }
    }
  }, [user, isInitialized]);

  // Show nothing while checking auth state
  return null;
}
