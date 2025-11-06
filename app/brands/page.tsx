import Link from "next/link"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { brands } from "@/lib/products"

export default function BrandsPage() {
  return (
    <LayoutWithSidebar>
      <div className="container px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop by Brand</h1>
          <p className="text-muted-foreground">Browse products from your favorite manufacturers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link key={brand} href={`/products?brand=${encodeURIComponent(brand)}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex items-center justify-center h-full">
                  <p className="font-semibold text-center">{brand}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </LayoutWithSidebar>
  )
}
