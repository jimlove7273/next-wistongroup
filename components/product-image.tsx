"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src?: string;
  alt: string;
  sku?: string;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  sku,
  className,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  // Try multiple image sources in order of preference
  const getImageSrc = () => {
    if (src && src !== "/placeholder.svg") {
      return src;
    }
    if (sku && process.env.NEXT_PUBLIC_SUPABASE_STORAGE) {
      return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${sku}.jpg`;
    }
    return "/placeholder.svg";
  };

  const imageSrc = getImageSrc();

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {!imageError && imageSrc !== "/placeholder.svg" ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-500 max-w-xs">
              {sku ? `Product ${sku}` : "Product Image"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
}
