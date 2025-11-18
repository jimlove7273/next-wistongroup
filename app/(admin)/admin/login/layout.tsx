import type React from 'react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full bg-gray-50">{children}</div>;
}
