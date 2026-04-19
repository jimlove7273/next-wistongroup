"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, LogIn, FileText, User, Mail, Lock } from "lucide-react";
import { RefObject } from "react";
import { cn } from "@/lib/utils";

interface UserProfile {
  email: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  user: UserProfile | null;
  email: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  password: string;
  isLoggingIn: boolean;
  handleLogin: (e: React.FormEvent) => void;
  logout: () => void;
  mobileMenuRef: RefObject<HTMLDivElement>;
}

export function MobileMenu({
  isOpen,
  onClose,
  pathname,
  searchQuery,
  setSearchQuery,
  handleSearch,
  user,
  email,
  setEmail,
  password,
  setPassword,
  isLoggingIn,
  handleLogin,
  logout,
  mobileMenuRef,
}: MobileMenuProps) {
  // Common style for inputs to remove gray focus ring and use red border
  const inputFocusClasses =
    "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c8102e]";

  return (
    <div
      ref={mobileMenuRef}
      className={cn(
        "fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-2xl z-50 transition-all duration-300 ease-in-out transform origin-top",
        isOpen
          ? "scale-y-100 opacity-100 visible"
          : "scale-y-95 opacity-0 invisible",
      )}
    >
      <div className="max-h-[80vh] overflow-y-auto p-5 space-y-6">
        {/* Search Section */}
        <section>
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className={cn(
                  "w-full rounded-full pl-10 pr-24 h-11 border-gray-300",
                  inputFocusClasses,
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#c8102e] hover:bg-[#a10d25] text-white rounded-full px-5 h-9 text-sm font-semibold transition-colors"
              >
                Search
              </Button>
            </div>
          </form>
        </section>

        {/* Navigation Section */}
        <section className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
            Quick Links
          </p>
          <nav className="grid grid-cols-1 gap-2">
            <Link
              href="/rma"
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-bold text-xs",
                pathname === "/rma"
                  ? "bg-[lab(40_52.27_31.04)] text-white shadow-sm"
                  : "bg-[lab(40_52.27_31.04)] text-white hover:opacity-90 border border-transparent",
              )}
              onClick={onClose}
            >
              <FileText className="h-5 w-5" />
              <span>RMA Request</span>
            </Link>
          </nav>
        </section>

        {/* Account Section */}
        <section className="pt-4 border-t border-gray-100 space-y-4">
          {user ? (
            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 font-medium mb-0.5">
                    Logged in as
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/profile"
                  className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-white text-sm font-semibold text-gray-700 border border-gray-200 hover:border-blue-300 transition-colors"
                  onClick={onClose}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-white text-sm font-semibold text-red-600 border border-red-100 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <LogIn className="h-4 w-4 text-[#c8102e]" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                  Login to Your Account
                </h3>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="mobile-email"
                      className="text-xs font-semibold text-gray-600 ml-1"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="mobile-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={cn(
                          "h-11 rounded-xl pl-10 border-gray-300",
                          inputFocusClasses,
                        )}
                      />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="mobile-password"
                      className="text-xs font-semibold text-gray-600 ml-1"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="mobile-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={cn(
                          "h-11 rounded-xl pl-10 border-gray-300",
                          inputFocusClasses,
                        )}
                      />
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#c8102e] hover:bg-[#a10d25] text-white rounded-xl font-bold shadow-lg shadow-red-900/10 transition-all flex gap-2 items-center justify-center"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </span>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
