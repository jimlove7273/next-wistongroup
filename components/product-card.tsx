"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sku: product.sku,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow p-8">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={`/products/${product.sku}.jpg`}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <p className="text-xs text-muted-foreground mb-1">{product.sku}</p>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          {user ? (
            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Login to see price</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-end">
        <Button
          onClick={handleAddToCart}
          className="px-8! py-5! mr-4"
          size="sm"
          disabled={!user}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
