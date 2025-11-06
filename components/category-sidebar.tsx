"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, X } from "lucide-react"
import { categories } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategorySidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CategorySidebar({ isOpen, onClose }: CategorySidebarProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-300 z-40 transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Categories</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-0">
            {categories.map((category, index) => (
              <div key={category.name}>
                {category.subcategories.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <span>{category.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          openCategory === category.name ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    {/* Subcategories with smooth animation */}
                    {openCategory === category.name && (
                      <div className="ml-0 space-y-0 bg-white/50 animate-in fade-in duration-200">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            href={`/products?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subcategory)}`}
                            className="block px-6 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border-l-2 border-slate-300 hover:border-blue-500"
                            onClick={onClose}
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="block px-4 py-3 text-sm font-semibold text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>
                )}
                {/* Dotted divider between categories */}
                {index < categories.length - 1 && <div className="border-t border-dotted border-slate-300 my-1" />}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
