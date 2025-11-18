'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutWithSidebar } from '@/components/layout-with-sidebar';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { toProperCase } from '@/utils/general';

function ProductListContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const brand = searchParams.get('brand');

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.subcategory === subcategory,
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase(),
    );
  }

  const getTitle = () => {
    if (brand) return `${toProperCase(brand)} Products`;
    if (subcategory) return subcategory;
    if (category) return category;
    return 'All Products';
  };

  return (
    <div className="container px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <LayoutWithSidebar>
      <Suspense
        fallback={
          <div className="container px-4 py-8 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-48 mb-4" />
              <div className="h-4 bg-muted rounded w-32 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-80 bg-muted rounded" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ProductListContent />
      </Suspense>
    </LayoutWithSidebar>
  );
}
