'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  const products = {
    '1': {
      id: '1',
      name: 'AMD Ryzen 9 7950X 16-Core Processor',
      price: 599,
      originalPrice: 699,
      rating: 4.8,
      reviewCount: 1247,
      category: 'CPUs & Processors',
      brand: 'AMD',
      inStock: true,
      badge: 'Best Seller',
      image:
        'https://readdy.ai/api/search-image?query=AMD%20Ryzen%209%207950X%20processor%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20with%20silver%20heat%20spreader%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20view%20of%20pins%20and%20branding%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=600&height=600&seq=prodcpu1-1&orientation=squarish',
      images: [
        'https://readdy.ai/api/search-image?query=AMD%20Ryzen%209%207950X%20processor%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20with%20silver%20heat%20spreader%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20view%20of%20pins%20and%20branding%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=600&height=600&seq=prodcpu1-1&orientation=squarish',
        'https://readdy.ai/api/search-image?query=AMD%20Ryzen%209%207950X%20processor%20side%20view%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20showing%20thickness%20and%20heat%20spreader%20detail%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20side%20profile%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=600&height=600&seq=prodcpu1-2&orientation=squarish',
        'https://readdy.ai/api/search-image?query=AMD%20Ryzen%209%207950X%20processor%20bottom%20view%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20showing%20pins%20and%20contacts%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20pin%20view%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=600&height=600&seq=prodcpu1-3&orientation=squarish',
      ],
      description:
        'The AMD Ryzen 9 7950X is a high-performance 16-core, 32-thread processor built on the advanced Zen 4 architecture. Perfect for content creation, gaming, and professional workloads.',
      specifications: {
        Cores: '16',
        Threads: '32',
        'Base Clock': '4.5 GHz',
        'Boost Clock': '5.7 GHz',
        Cache: '80MB',
        Socket: 'AM5',
        'Manufacturing Process': '5nm',
        TDP: '170W',
        'Memory Support': 'DDR5-5200',
        'PCIe Support': 'PCIe 5.0',
      },
      features: [
        'Zen 4 Architecture',
        '16 Cores, 32 Threads',
        'Up to 5.7 GHz Max Boost',
        'PCIe 5.0 Support',
        'DDR5 Memory Support',
        'AMD Precision Boost 2',
        'AMD Curve Optimizer',
        'Unlocked for Overclocking',
      ],
    },
  };

  const product = products[1];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    // In a real app, you might want to show a toast notification here
    addToCart(product, quantity);

    // Simulate API call delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  return (
    <div className="bg-gray-50">
      <div className="flex">
        <div className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    <span className="material-symbols-outlined !text-[20px] mr-2">
                      home
                    </span>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined !text-[20px]">
                      chevron_right
                    </span>
                    <Link
                      href={`/category/${product.category
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '-')}`}
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                    >
                      {product.category}
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined !text-[20px]">
                      chevron_right
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="flex space-x-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                          selectedImage === index
                            ? 'border-blue-500'
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${
                            i < Math.floor(product.rating) ? 'fill' : 'line'
                          } text-yellow-400 text-lg`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {isLoggedIn ? (
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-3xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-xl text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                          <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
                        <p className="text-lg font-semibold text-blue-600">
                          Please Login to See Price
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mb-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <i
                        className={`ri-${
                          product.inStock ? 'check' : 'close'
                        }-circle-line mr-1`}
                      ></i>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {product.badge && (
                      <span className="ml-3 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{product.description}</p>

                  <div className="flex items-center space-x-4 mb-8">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Quantity:
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 hover:bg-gray-50"
                        >
                          <span className="material-symbols-outlined !text-[20px] mt-2">
                            check_indeterminate_small
                          </span>
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-50"
                        >
                          <span className="material-symbols-outlined !text-[20px] mt-2">
                            add
                          </span>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isAddingToCart}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        product.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isAddingToCart ? (
                        <div className="flex items-center justify-center">
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Adding to Cart...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="material-symbols-outlined mr-2">
                            shopping_cart
                          </span>
                          Add to Cart
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button className="py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                      Specifications
                    </button>
                    <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Features
                    </button>
                    <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Reviews
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-900">
                            {key}:
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <i className="ri-check-circle-fill text-green-500 mr-2"></i>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
