'use client';

import { useState } from 'react';
import { productType } from '@/types/products';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

type Props = {
  product: productType;
  imageIndex?: number;
};

const ProductCard = ({ product, imageIndex = 0 }: Props) => {
  const {
    id,
    name,
    price,
    originalPrice,
    rating,
    image,
    category,
    inStock,
    badge,
  } = product;
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  console.log("id", id);

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);

    // Simulate API call delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <Link href={`/product/${id}`}>
        <img src={`https://picsum.photos/600/400?random=${imageIndex}`} alt="Product Image" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" />
          {/* <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          /> */}
        </Link>

        {badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        )}

        {discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
            {name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`ri-star-${
                  i < Math.floor(rating) ? 'fill' : 'line'
                } text-yellow-400 text-sm`}
              ></i>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">${price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
          ) : (
            <div className="text-sm text-blue-600 font-medium">
              Please Login to See Price
            </div>
          )}
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock || isAdding}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <i className="ri-loader-4-line animate-spin mr-2"></i>
              Adding...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="material-symbols-outlined mr-2 text-sm">
                shopping_cart
              </span>
              Add to Cart
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
