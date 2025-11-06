import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { ProductCard } from "@/components/product-card"
import { BrandShowcase } from "@/components/brand-showcase"
import { products } from "@/lib/products"

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured)
  const weeklySpecials = products.filter((p) => p.weeklySpecial)

  return (
    <LayoutWithSidebar>
      <div className="container px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Your Trusted Source for Computer Components
          </h1>
          <p className="text-lg text-muted-foreground mb-6 text-pretty max-w-2xl">
            Discover premium hardware, cutting-edge technology, and unbeatable deals on the components you need to build
            or upgrade your system.
          </p>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Weekly Specials */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Weekly Specials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklySpecials.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Brand</h2>
          <BrandShowcase />
        </section>
      </div>
    </LayoutWithSidebar>
  )
}
