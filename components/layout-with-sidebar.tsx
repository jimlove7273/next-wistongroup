"use client"

import type React from "react"

import { useState } from "react"
import { CategorySidebar } from "@/components/category-sidebar"
import { CategoryToggle } from "@/components/category-toggle"

export function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex">
      <CategorySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 min-h-screen">{children}</main>
      <CategoryToggle onClick={() => setSidebarOpen(true)} />
    </div>
  )
}
