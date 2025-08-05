"use client";

import "material-symbols";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const mainCategories = [{ name: "RMA", href: "/rma", color: "orange" }];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white !text-[20px]">
                jamboard_kiosk
              </span>
            </div>
            <span className="text-xl font-bold text-gray-900">WistonGroup</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for computer parts..."
                className="w-full pl-10 lg:w-full px-4 py-2 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined !text-[#aaaaaa]">
                  search
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-4 items-center">
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            {/* Cart and Menu */}
            <div className="flex items-center justify-end space-x-4">
              <Link href="/cart" className="relative">
                <div className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-200 flex justify-end">
          <nav className="flex space-x-8 overflow-x-auto py-1">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`px-6 py-1 rounded-sm text-sm text-white font-semibold transition-colors whitespace-nowrap
                    bg-${category.color}-600 hover:bg-${category.color}-700`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
