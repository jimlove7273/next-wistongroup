"use client"

import Link from "next/link"
import { brands } from "@/lib/products"

// Brand icon mappings using Unicode/emoji representations
const brandIcons: { [key: string]: string } = {
  Intel: "⚙️",
  AMD: "⚙️",
  ASUS: "🖥️",
  MSI: "🎮",
  Gigabyte: "🔧",
  Corsair: "⚡",
  Kingston: "💾",
  "Western Digital": "💿",
  Seagate: "💿",
  Samsung: "📱",
  LG: "🖥️",
  Dell: "💻",
  HP: "🖨️",
  Lenovo: "💻",
  Microsoft: "🪟",
  Logitech: "🖱️",
  Razer: "🎮",
  NVIDIA: "🎨",
  "TP-Link": "📡",
  Linksys: "📡",
  "D-Link": "📡",
  Sony: "🎵",
  NEC: "🖥️",
  "Prudent Way": "🏪",
}

export function BrandShowcase() {
  return (
    <div className="flex flex-wrap gap-2">
      {brands.map((brand) => (
        <Link
          key={brand}
          href={`/products?brand=${encodeURIComponent(brand)}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 hover:from-primary hover:to-primary/80 text-slate-700 hover:text-white transition-all duration-200 text-sm font-medium hover:shadow-md"
        >
          <span className="text-lg">{brandIcons[brand] || "🏭"}</span>
          <span>{brand}</span>
        </Link>
      ))}
    </div>
  )
}
