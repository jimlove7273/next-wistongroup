"use client"

import Link from "next/link"
import { brands } from "@/lib/products"
import { Card } from "@/components/ui/card"

export function BrandScroller() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4 animate-scroll hover:pause">
        {[...brands, ...brands].map((brand, index) => (
          <Link
            key={`${brand}-${index}`}
            href={`/products?brand=${encodeURIComponent(brand)}`}
            className="flex-shrink-0"
          >
            <Card className="px-6 py-4 hover:shadow-md transition-shadow cursor-pointer bg-card hover:bg-accent">
              <p className="font-semibold text-sm whitespace-nowrap">{brand}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
