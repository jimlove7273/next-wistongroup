'use client';

import { useState } from 'react';
import Link from 'next/link';
import { productCategories as categories } from '@/app/data/categories';

const ProductCategories = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <aside className="hidden bg-slate-100 md:block w-[256px] border-r border-gray-100 p-4">
      <p className="font-semibold mb-4">Product Categories</p>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name} className="border-b border-gray-200">
            <button
              onClick={() => toggleCategory(category.name)}
              className="p-2 rounde-lg flex justify-between items-center w-full text-left hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-900">
                {category.name}
              </span>
              <span className="material-symbols-outlined text-sm text-[#cadcde]">
                {openCategory === category.name ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {openCategory === category.name && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-700">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/products/${sub.slug}`}
                      className="block px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProductCategories;
