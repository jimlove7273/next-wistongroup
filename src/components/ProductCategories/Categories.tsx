"use client";

import { useState } from "react";

const categories = [
  {
    name: "Closeout Deals",
    subcategories: ["Hardware", "Software"],
  },
  {
    name: "Prudent Way",
    subcategories: [
      "AC/DC Universal Power Adapter",
      "USB/HDMI/VGA Adapter",
      "Switching Power Supply",
    ],
  },
  {
    name: "Office Essentials",
    subcategories: ["Stationery", "Furniture", "Storage Solutions"],
  },
  {
    name: "Networking",
    subcategories: ["Routers", "Cables", "Switches"],
  },
  {
    name: "Peripherals",
    subcategories: ["Keyboards", "Mice", "Monitors"],
  },
];

const ProductCategories = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <aside className="w-[256px] border-r border-gray-100 p-4">
      <p className="font-semibold mb-4">Product Categories</p>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name} className="border-b border-gray-100 pb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="p-2 rounde-lg flex justify-between items-center w-full text-left hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-900">
                {category.name}
              </span>
              <span className="material-symbols-outlined text-sm text-[#cadcde]">
                {openCategory === category.name ? "expand_less" : "expand_more"}
              </span>
            </button>

            {openCategory === category.name && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-700">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                  >
                    {sub}
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
