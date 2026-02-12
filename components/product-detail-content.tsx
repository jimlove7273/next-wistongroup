'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth-provider';
import { useCart } from '@/components/cart-provider';
import type { Product } from '@/lib/products';

export default function ProductDetailContent({
  product,
}: {
  product: Product;
}) {
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
    <div className="flex flex-col">
      <div className="mb-2">
        <Badge variant="secondary" className="mb-2">
          {product.brand}
        </Badge>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-sm text-muted-foreground mb-8">SKU: {product.sku}</p>
      </div>

      <div>
        <p className="text-foreground leading-relaxed">{product.description}</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Price:
            </span>
            {user ? (
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Please Login to See Price
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleAddToCart}
              size="lg"
              disabled={!user}
              className="px-16 py-3"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          {!user && (
            <p className="text-xs text-right text-muted-foreground mt-4">
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>{' '}
              to see pricing and add items to cart
            </p>
          )}
        </CardContent>
      </Card>

      {product.specifications &&
        Object.keys(product.specifications).length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Specifications</h2>
              <div className="space-y-2">
                {Object.entries(product.specifications)
                  .filter(([_, value]) => value && value !== 'N/A')
                  .map(([key, value]) => (
                    <div key={key} className="py-1">
                      <span className="text-foreground">◆ {value}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
