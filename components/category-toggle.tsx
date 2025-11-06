"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryToggleProps {
  onClick: () => void
}

export function CategoryToggle({ onClick }: CategoryToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="lg:hidden fixed bottom-4 left-4 z-30 shadow-lg bg-transparent"
      onClick={onClick}
    >
      <Menu className="h-4 w-4 mr-2" />
      Categories
    </Button>
  )
}
