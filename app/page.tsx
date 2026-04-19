import { LayoutWithSidebar } from "@/components/layout-with-sidebar";
import { ProductCard } from "@/components/product-card";
import { BrandShowcase } from "@/components/brand-showcase";
import {
  getFeaturedProducts,
  getSpecialProducts,
  getFallbackProducts,
} from "@/lib/db-products";

export default async function HomePage() {
  let featuredProducts = await getFeaturedProducts(3);
  let weeklySpecials = await getSpecialProducts(6);

  // Use fallback products if none are found
  if (featuredProducts.length === 0) {
    const fallback = await getFallbackProducts(3);
    featuredProducts = fallback;
  }

  if (weeklySpecials.length === 0) {
    const fallback = await getFallbackProducts(6);
    weeklySpecials = fallback;
  }

  console.log(
    "HomePage - Featured:",
    featuredProducts,
    "Specials:",
    weeklySpecials,
  );

  return (
    <LayoutWithSidebar>
      <div className="px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 -mx-4 md:mx-0 md:rounded-lg overflow-hidden bg-linear-to-r from-primary/10 via-accent/10 to-primary/10">
          <img
            src="/banner_01.jpg"
            alt="Hero banner"
            className="w-full h-auto object-cover md:h-[300px]"
          />
        </section>

        {/* Featured Products */}
        <section className="container mx-auto mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Weekly Specials */}
        <section className="mb-12 bg-slate-50">
          <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Weekly Specials
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
              {weeklySpecials.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-center text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Brands we carry
            </h2>
            <div className="mb-8 w-full mt-3 text-slate-600 max-w-xl mx-auto text-center">
              Direct relationships with leading manufacturers ensure authentic
              product and warranty support.
            </div>
          </div>
          <BrandShowcase />
        </section>
      </div>
    </LayoutWithSidebar>
  );
}
