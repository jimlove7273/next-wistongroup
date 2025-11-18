'use client';

import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, lastActivity, updateLastActivity, isInitialized } =
    useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Handle automatic logout after 20 minutes of inactivity
  useEffect(() => {
    // Update activity on user interactions
    const handleUserActivity = () => {
      updateLastActivity();
    };

    // Add event listeners for user activity
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Check for inactivity every minute
    const inactivityCheckInterval = setInterval(() => {
      if (lastActivity) {
        const now = Date.now();
        const twentyMinutesInMs = 20 * 60 * 1000; // 20 minutes in milliseconds

        if (now - lastActivity > twentyMinutesInMs) {
          // Auto logout due to inactivity
          logout();
          router.push('/admin/login');
        }
      }
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      clearInterval(inactivityCheckInterval);
    };
  }, [lastActivity, logout, router, updateLastActivity]);

  useEffect(() => {
    // Only check auth status after provider is initialized
    if (isInitialized) {
      // Check if user is authenticated and not on login page
      if (user === null && pathname !== '/admin/login') {
        // Redirect to login if not authenticated
        router.push('/admin/login');
      } else {
        // User is authenticated or on login page, stop loading
        setIsLoading(false);
      }
    }
  }, [user, isInitialized, router, pathname]);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Customers', href: '/admin/customers' },
    { name: 'Products', href: '/admin/products' },
    { name: 'RMAs', href: '/admin/rmas' },
    { name: 'Sales', href: '/admin/sales' },
  ];

  // Show loading spinner while initializing or checking auth (but not on login page)
  if ((!isInitialized || isLoading) && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex"
      onClick={updateLastActivity}
      onKeyDown={updateLastActivity}
    >
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-md ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header */}
        <header className="bg-white shadow">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-gray-600">Hello, {user.name}</span>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  router.push('/admin/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
