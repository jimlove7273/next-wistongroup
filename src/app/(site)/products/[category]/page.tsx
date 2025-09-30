"use client";
import "material-symbols";

import ProductCard from "@/components/Products/Card";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductCatgoryList = () => {
  const params = useParams();
  const category = params.category as string;
  const categoryName = category
    ? category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : "Category";
  const [sortBy, setSortBy] = useState<string>("");

  const allProducts = [
    {
      id: "1",
      name: "AMD Ryzen 9 7950X 16-Core Processor",
      price: 599,
      originalPrice: 699,
      rating: 4.8,
      reviewCount: 1247,
      image:
        "https://readdy.ai/api/search-image?query=AMD%20Ryzen%209%207950X%20processor%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20with%20silver%20heat%20spreader%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20view%20of%20pins%20and%20branding%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=300&height=300&seq=catcpu1&orientation=squarish",
      category: "CPUs & Processors",
      brand: "AMD",
      inStock: true,
      badge: "Best Seller",
    },
    {
      id: "2",
      name: "Intel Core i9-13900K Processor",
      price: 549,
      originalPrice: 599,
      rating: 4.7,
      reviewCount: 983,
      image:
        "https://readdy.ai/api/search-image?query=Intel%20Core%20i9-13900K%20processor%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20with%20blue%20Intel%20branding%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20view%20of%20pins%20and%20heat%20spreader%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=300&height=300&seq=catcpu2&orientation=squarish",
      category: "CPUs & Processors",
      brand: "Intel",
      inStock: true,
    },
    {
      id: "3",
      name: "AMD Ryzen 7 7700X 8-Core Processor",
      price: 349,
      originalPrice: 399,
      rating: 4.6,
      reviewCount: 756,
      image:
        "https://readdy.ai/api/search-image?query=AMD%20Ryzen%207%207700X%20processor%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20with%20silver%20heat%20spreader%2C%20professional%20product%20photography%2C%20mid-range%20computer%20component%2C%20detailed%20view%20of%20pins%20and%20branding%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=300&height=300&seq=catcpu3&orientation=squarish",
      category: "CPUs & Processors",
      brand: "AMD",
      inStock: true,
    },
  ];

  return (
    <div className="flex-1 lg:ml-0 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <span className="material-symbols-outlined">home</span>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined">
                  keyboard_arrow_right
                </span>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {categoryName}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">Showing {0} products</p>
        </div>

        {/* Products Grid */}
        <div>
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  // onAddToCart={handleAddToCart}
                />
              ))}
            </div>

          {/* Pagination */}
          {/*{totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}*/}
        </div>
      </div>
    </div>
  );
};

export default ProductCatgoryList;
