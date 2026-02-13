"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { toProperCase } from "@/utils/general";
import { getCategoryPathByValue } from "@/utils/pathtools";
import { Button } from "@/components/ui/button";
import { Search, Package, ArrowLeft, Home } from "lucide-react";
import ProductsLoading from "@/components/products-loading";

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
        <ProductsLoading type="main" />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No products found
          </h2>

          <p className="text-gray-600 mb-6 max-w-md text-center">
            {subcategory || category || brand
              ? `Sorry, we couldn't find any products matching your criteria in "${getTitle()}".`
              : "We couldn't find any products at the moment."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-3">
              Try picking another category from our menu
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Suspense fallback={<ProductsLoading type="skeleton" count={9} />}>
        <ProductListContent />
      </Suspense>
    </>
  );
}
