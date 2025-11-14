'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  User,
  ChevronDown,
  X,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart-provider';
import { useAuth } from '@/components/auth-provider';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const { items, removeItem, updateQuantity } = useCart();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <div className="w-full flex items-center justify-between gap-4 px-10">
            <div className="w-full flex items-center justify-between gap-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary">
                  Wiston Group
                </div>
              </Link>

              <div className="flex items-center">
                <nav className="hidden md:flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-blue-100"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-blue-100"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-blue-100"
                  >
                    Contact Us
                  </Link>
                </nav>
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {user ? (
                          <>
                            <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                              {user.email}
                            </div>
                            <Link
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              Profile
                            </Link>
                            <button
                              onClick={() => {
                                logout();
                                setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </>
                        ) : (
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-sky-200 text-sky-900 text-xs font-bold flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 bg-white w-full max-w-md h-screen flex flex-col z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-32">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-7 w-7 text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsCartOpen(false)}
              >
                Cancel
              </Button>
              <Link href="/cart" className="flex-1">
                <Button className="w-full" onClick={() => setIsCartOpen(false)}>
                  Proceed to Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
