"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { items } = useCart();
  const { user, logout } = useAuth();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur `supports-backdrop-filter:bg-background/60">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user ? (
                    <>
                      <DropdownMenuItem className="font-medium">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-sky-200 text-sky-900 text-xs font-bold flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
