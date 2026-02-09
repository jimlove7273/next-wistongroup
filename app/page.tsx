import { LayoutWithSidebar } from '@/components/layout-with-sidebar';
import { ProductCard } from '@/components/product-card';
import { BrandShowcase } from '@/components/brand-showcase';
import {
  getFeaturedProducts,
  getSpecialProducts,
  getFallbackProducts,
} from '@/lib/db-products';

export default async function HomePage() {
  let featuredProducts = await getFeaturedProducts(3);
  let weeklySpecials = await getSpecialProducts(6);

  // Use fallback products if none are found
  if (featuredProducts.length === 0) {
    console.log('No featured products found, using fallback');
    const fallback = await getFallbackProducts(3);
    featuredProducts = fallback;
  }

  if (weeklySpecials.length === 0) {
    console.log('No special products found, using fallback');
    const fallback = await getFallbackProducts(6);
    weeklySpecials = fallback;
  }

  console.log(
    'HomePage - Featured:',
    featuredProducts.length,
    'Specials:',
    weeklySpecials.length,
  );

  return (
    <LayoutWithSidebar>
      <div className="mx-auto container px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 rounded-lg bg-linear-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="h-[300px] w-full overflow-hidden">
            <img
              src="/banner_01.jpg"
              alt="Hero banner"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-wide uppercase text-slate-500">
              Shop by Brand
            </h2>
            <div className="h-1 w-16 bg-blue-600 mt-2 rounded-full"></div>
          </div>
          <BrandShowcase />
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
      </div>
    </LayoutWithSidebar>
  );
}
