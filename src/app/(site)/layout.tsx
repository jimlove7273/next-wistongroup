"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCategories from "@/components/ProductCategories/Categories";
import { useState } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {isSidebarOpen && <ProductCategories />}

        <main className="flex-1">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
