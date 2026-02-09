'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { searchProducts } from '@/lib/products';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const filteredProducts = searchProducts(query);

  return (
    <div className="container px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
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
            No products found for your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
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
      <SearchResultsContent />
    </Suspense>
  );
}
