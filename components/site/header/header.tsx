"use client";

import Link from "next/link";
import {
  ShoppingCart,
  User,
  UserCircle,
  X,
  Trash2,
  Plus,
  Minus,
  LogIn,
  Search,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Topnav } from "./topnav";
import { CartDrawer } from "../cart-drawer";
import { MobileMenu } from "../mobile";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items, removeItem, updateQuantity } = useCart();
  const { user, logout, login } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/products/search?q=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

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
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b bg-background/95">
        <Topnav />
        <header className="w-full lg:container mx-auto backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="h-16 flex items-center px-4 bg-white">
            <div className="flex w-full items-center justify-between gap-4">
              {/* Left: Brand */}
              <div className="flex justify-start">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="text-xl md:text-2xl font-bold text-primary">
                    Wiston Group
                  </div>
                </Link>
              </div>

              {/* Center: Search - Hidden on mobile */}
              <div className="hidden md:flex flex-none justify-center">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative w-full">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-64 lg:w-full rounded-full bg-slate-50 py-5 pl-10 pr-24 border border-gray-300 focus:border-[#c8102e] focus:!border-[#c8102e] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c8102e]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#c8102e] hover:bg-[#a10d25] text-white rounded-full px-4 h-8"
                    >
                      Search
                    </Button>
                  </div>
                </form>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>

              {/* Right: Nav & Actions */}
              <div className="hidden md:flex justify-end items-center gap-2">
                <nav className="flex items-center gap-2">
                  <Link
                    href="/rma"
                    className={`text-xs font-bold transition-colors px-5 py-2 rounded-md ${
                      pathname === "/rma"
                        ? "bg-[lab(40_52.27_31.04)] text-white"
                        : "bg-[lab(40_52.27_31.04)] text-white hover:opacity-90"
                    }`}
                  >
                    RMA Request
                  </Link>
                </nav>
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant={user ? "ghost" : "outline"}
                    size={user ? "icon" : "sm"}
                    className={
                      user
                        ? "relative"
                        : "rounded-md flex items-center gap-2 px-4"
                    }
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {user ? (
                      <UserCircle className="h-5 w-5 text-blue-800" />
                    ) : (
                      <>
                        <User className="h-5 w-5 text-gray-400" />
                        Sign In
                      </>
                    )}
                    {user && <span className="sr-only">User menu</span>}
                  </Button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                              Login to Your Account
                            </h3>
                            <form onSubmit={handleLogin} className="space-y-3">
                              <div className="space-y-1">
                                <Label
                                  htmlFor="dropdown-email"
                                  className="text-xs"
                                >
                                  Email
                                </Label>
                                <Input
                                  id="dropdown-email"
                                  type="email"
                                  placeholder="Enter your email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  className="h-9 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c8102e]"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  htmlFor="dropdown-password"
                                  className="text-xs"
                                >
                                  Password
                                </Label>
                                <Input
                                  id="dropdown-password"
                                  type="password"
                                  placeholder="Enter your password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                  className="h-9 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c8102e]"
                                />
                              </div>
                              <Button
                                type="submit"
                                className="w-full h-9"
                                disabled={isLoggingIn}
                              >
                                <LogIn className="h-4 w-4" />
                                {isLoggingIn ? "Logging in..." : "Login"}
                              </Button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  className="bg-[#c8102e] hover:bg-[#a10d25] text-white rounded-md flex items-center gap-2 px-4"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="ml-1 bg-white text-[#c8102e] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        user={user}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoggingIn={isLoggingIn}
        handleLogin={handleLogin}
        logout={logout}
        mobileMenuRef={mobileMenuRef}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        cartTotal={cartTotal}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        cartRef={cartRef}
      />

      {/* Login Error Modal */}
      {loginError && (
        <Dialog open={!!loginError} onOpenChange={() => setLoginError(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Error</DialogTitle>
              <DialogDescription>{loginError}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>OK</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
