import type React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { CartProvider } from '@/components/cart-provider';
import { AuthProvider } from '@/components/auth-provider';

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
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
