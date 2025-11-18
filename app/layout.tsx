import type React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { AuthProvider } from '@/components/auth-provider';
import { ConditionalLayout } from '@/components/conditional-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Wiston Group - Computer Components & Hardware',
  description:
    'Your trusted source for computer components, hardware, and technology solutions',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          <CartProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
