"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { toProperCase } from "@/utils/general";
import { getCategoryPathByValue } from "@/utils/pathtools";

function ProductListContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const brand = searchParams.get("brand");

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // debugger;

  // Fetch products with server-side filtering when subcategory is specified
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use server-side filtering if subcategory is specified
        const apiUrl = subcategory
          ? `/api/products?listid=${encodeURIComponent(subcategory)}`
          : "/api/products";

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const mappedData = Array.isArray(data) ? data : [];
        setAllProducts(mappedData);
      } catch (e) {
        console.error("Error fetching products", e);
        setAllProducts(products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subcategory]);

  let filteredProducts = allProducts || [];

  // Apply client-side filtering for non-subcategory filters
  if (category && !subcategory) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  // If subcategory is used, products should already be filtered server-side
  // But add client-side backup filtering just in case
  if (subcategory) {
    const targetListId = parseInt(subcategory);
    // Only filter client-side if we got unfiltered results
    if (filteredProducts.some((p) => p.listid !== targetListId)) {
      filteredProducts = filteredProducts.filter((p) => {
        if (p.listid === null || p.listid === undefined) {
          return false;
        }
        return p.listid === targetListId;
      });
    }
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase(),
    );
  }

  const getTitle = () => {
    if (brand) return `${toProperCase(brand)} Products`;
    if (subcategory) {
      const categoryInfo = getCategoryPathByValue(parseInt(subcategory));
      return categoryInfo?.label || `Category ${subcategory}`;
    }
    if (category) return category;
    return "All Products";
  };

  return (
    <div className="container px-4 py-8 lg:px-8">
      <div className="mb-8">
        <div className="text-xs text-gray-400 mb-4">
          Home &gt;{" "}
          {subcategory
            ? (getCategoryPathByValue(parseInt(subcategory))?.path ?? "")
            : getTitle()}
        </div>
        <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
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
    <>
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
    </>
  );
}
