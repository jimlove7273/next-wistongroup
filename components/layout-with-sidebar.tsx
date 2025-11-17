"use client";

import type React from "react";
import { useState } from "react";
import { CategorySidebar } from "@/components/category-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <CategorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 min-h-screen">{children}</main>
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed bottom-4 left-4 z-30 shadow-lg bg-white text-gray-900 hover:bg-gray-100"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-4 w-4 mr-2" />
        Categories
      </Button>
    </div>
  );
}
