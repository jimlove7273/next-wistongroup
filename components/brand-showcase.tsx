'use client';

import Image from 'next/image';
import Link from 'next/link';
import { brands } from '@/lib/products';

export function BrandShowcase() {
  return (
    <div className="flex flex-wrap gap-4">
      {brands.map((brand) => {
        const brandKey = brand.toLowerCase();
        const imgSrc = `/brands/${brandKey}.gif`;

        return (
          <Link
            key={brand}
            href={`/products?brand=${encodeURIComponent(brand)}`}
            className="
              p-3 bg-white rounded-lg shadow-sm
              hover:shadow-md transition-all duration-200
              flex items-center justify-center
            "
          >
            <Image
              src={imgSrc}
              alt={brand}
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>
        );
      })}
    </div>
  );
}
