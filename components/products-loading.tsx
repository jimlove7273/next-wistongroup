"use client";

import { Package, Loader2 } from "lucide-react";

interface ProductsLoadingProps {
  type?: "main" | "skeleton";
  count?: number;
}

export default function ProductsLoading({
  type = "main",
  count = 9
}: ProductsLoadingProps) {
  if (type === "skeleton") {
    return (
      <div className="container px-4 py-8 lg:px-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-4 bg-muted rounded w-48 mb-4" />
            <div className="h-8 bg-muted rounded w-64 mb-2" />
            <div className="h-4 bg-muted rounded w-32" />
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-8">
                {/* Image skeleton */}
                <div className="aspect-square bg-muted rounded mb-4 flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/50" />
                </div>

                {/* Content skeleton */}
                <div className="space-y-3 p-4">
                  <div className="h-3 bg-muted rounded w-20" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                  <div className="h-5 bg-muted rounded w-24" />
                </div>

                {/* Button skeleton */}
                <div className="p-2 flex justify-end">
                  <div className="h-8 bg-muted rounded w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main loading state
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        {/* Spinning loader */}
        <Loader2 className="w-12 h-12 text-primary animate-spin" />

        {/* Pulsing background circle */}
        <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full animate-ping" />
      </div>

      {/* Loading text with typing animation */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Loading Products
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-muted-foreground">Please wait</span>
          <div className="flex space-x-1">
            <div
              className="w-1 h-1 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-1 h-1 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-1 h-1 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>

      {/* Progress bar effect */}
      <div className="mt-6 w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
