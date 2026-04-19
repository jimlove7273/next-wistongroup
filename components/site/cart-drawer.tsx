"use client";

import { RefObject } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  cartTotal: number;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartRef: RefObject<HTMLDivElement>;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  cartTotal,
  removeItem,
  updateQuantity,
  cartRef,
}: CartDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 bg-white w-full max-w-md h-screen flex flex-col z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
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
                    <h3 className="font-medium text-sm mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">{item.sku}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 cursor-pointer"
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Link href="/cart" className="flex-1">
                <Button className="w-full" onClick={onClose}>
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
