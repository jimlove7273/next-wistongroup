"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/products";

export default function ProductDetailContent({
  product,
}: {
  product: Product;
}) {
  const { user } = useAuth();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const price =
      product.discount && product.discount > 0
        ? product.discount
        : product.price;
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.image,
      sku: product.sku,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="text-center lg:text-left">
        <Badge
          variant="secondary"
          className="mb-2 px-2 py-0.5 text-xs font-medium"
        >
          {product.brand}
        </Badge>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900 leading-tight">
          {product.name}
        </h1>
        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
      </div>

      {/* Description & Promotions Section */}
      {(product.description ||
        ((product.buy || 0) > 0 && (product.get || 0) > 0)) && (
        <Card className="shadow-sm border border-gray-100 border-t-4 border-t-slate-400 bg-white overflow-hidden">
          {product.description && (
            <CardHeader className="py-3 px-5 border-b border-gray-50 bg-gray-50/30">
              <CardTitle className="text-base font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                Description
              </CardTitle>
            </CardHeader>
          )}
          <CardContent className="p-5">
            {product.description && (
              <p className="text-gray-700 leading-relaxed text-sm">
                {product.description}
              </p>
            )}
            {(product.buy || 0) > 0 && (product.get || 0) > 0 && (
              <div
                className={`${
                  product.description ? "mt-4" : ""
                } inline-flex items-center px-3 py-1 bg-linear-to-r from-red-500 to-red-600 text-white rounded-full shadow-sm text-sm`}
              >
                <span className="font-semibold">
                  Buy {product.buy || 0} Get {product.get || 0} Free!
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Price and Add to Cart Section */}
      <Card className="shadow-sm border border-blue-100 border-t-4 border-t-blue-500 bg-linear-to-b from-blue-50/50 to-white overflow-hidden">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                <h2 className="text-base font-bold uppercase tracking-wider text-blue-900/70">
                  Current Price
                </h2>
              </div>
              {user ? (
                <div className="flex items-baseline gap-3">
                  {product.discount && product.discount > 0 ? (
                    <>
                      <span className="text-base text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ${product.discount.toFixed(2)}
                      </span>
                      <Badge
                        variant="destructive"
                        className="ml-1 text-[10px] px-1.5 py-0"
                      >
                        Sale
                      </Badge>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground italic">
                  Please log in to see pricing
                </span>
              )}
            </div>

            {user && (
              <div className="lg:self-end">
                <Button
                  onClick={handleAddToCart}
                  size="default"
                  className="px-6 py-2 text-base font-semibold bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Specifications Section */}
      {product.specifications &&
        Object.keys(product.specifications).length > 0 && (
          <Card className="shadow-sm border border-gray-100 border-t-4 border-t-gray-800">
            <CardHeader className="px-5 border-b border-gray-50 bg-gray-50/30 pb-0!">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-gray-800 rounded-full"></div>
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(product.specifications)
                  .filter(([_, value]) => value && value !== "N/A")
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start space-x-2 p-2 bg-gray-50 rounded-md"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                      <span className="text-gray-700 text-sm font-medium capitalize">
                        {key
                          .replace(/_/g, " ")
                          .replace("PartNumber", "Part Number")
                          .replace(/^Spec(\d+)/, "$1")}
                        :{" "}
                        <span className="font-normal text-gray-600">
                          {value}
                        </span>
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
