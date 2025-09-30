'use client';

import 'material-symbols';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from '@/components/CartDrawer';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const loginRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();
  const { user, isLoggedIn, login, logout } = useAuth();

  const mainCategories = [{ name: 'RMA', href: '/rma', color: 'green' }];

  const productCategories = [
    {
      name: 'Closeout Deals',
      subcategories: ['Hardware', 'Software'],
    },
    {
      name: 'Prudent Way',
      subcategories: [
        'AC/DC Universal Power Adapter',
        'USB/HDMI/VGA Adapter',
        'Switching Power Supply',
      ],
    },
    {
      name: 'Office Essentials',
      subcategories: ['Stationery', 'Furniture', 'Storage Solutions'],
    },
    {
      name: 'Networking',
      subcategories: ['Routers', 'Cables', 'Switches'],
    },
    {
      name: 'Peripherals',
      subcategories: ['Keyboards', 'Mice', 'Monitors'],
    },
    {
      name: 'Computer Components',
      subcategories: ['CPUs', 'GPUs', 'RAM', 'Storage', 'Motherboards'],
    },
    {
      name: 'Accessories',
      subcategories: ['Cables', 'Adapters', 'Cases', 'Cooling'],
    },
    {
      name: 'Software',
      subcategories: ['Operating Systems', 'Office Suites', 'Security'],
    },
    {
      name: 'Servers',
      subcategories: ['Rackmount Servers', 'Tower Servers', 'Blade Servers'],
    },
    {
      name: 'Networking Equipment',
      subcategories: ['Switches', 'Routers', 'Firewalls', 'Wireless'],
    },
  ];

  const colorMap: Record<string, string> = {
    orange: 'bg-orange-600 hover:bg-orange-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
  };

  const cartCount = getTotalItems();

  // Close login dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setIsLoginOpen(false);
      }
    };

    if (isLoginOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginOpen]);

  // Close categories panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoriesOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const success = login(email, password);
    
    if (success) {
      setIsLoginOpen(false);
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoginOpen(false);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    alert(`Password reset link sent to ${forgotEmail}`);
    setForgotEmail('');
    setIsForgotPassword(false);
    setIsLoginOpen(false);
  };

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Product Categories Button */}
            <button
              onClick={() => setIsCategoriesOpen(true)}
              className="md:hidden flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
              <span className="ml-1 text-sm font-medium">Products</span>
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 mx-auto md:mx-0"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white !text-[20px]">
                  jamboard_kiosk
                </span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                WistonGroup
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for computer parts..."
                  className="w-full pl-10 lg:w-full px-4 py-2 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined !text-[#aaaaaa]">
                    search
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-4 items-center">
              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </Link>
              </nav>

              {/* User Actions */}
              <div className="flex items-center justify-end space-x-4">
                {/* Login Button */}
                <div className="relative" ref={loginRef}>
                  <button
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    className={`relative flex items-center justify-center transition-colors ${
                      isLoggedIn
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <span className="material-symbols-outlined flex items-center">
                      {isLoggedIn ? 'account_circle' : 'person'}
                    </span>
                    {isLoggedIn && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </button>

                  {/* Login Dropdown */}
                  {isLoginOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      {isLoggedIn ? (
                        /* Logged In View */
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-blue-600">
                                person
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 pt-4">
                            <button
                              onClick={handleLogout}
                              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      ) : isForgotPassword ? (
                        /* Forgot Password View */
                        <div className="p-6">
                          <button
                            onClick={() => setIsForgotPassword(false)}
                            className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                          >
                            <span className="material-symbols-outlined text-sm mr-1">
                              arrow_back
                            </span>
                            Back to login
                          </button>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Reset Password
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Enter your email address and we&apos;ll send you a link to
                            reset your password.
                          </p>
                          <form onSubmit={handleForgotPassword}>
                            <div className="mb-4">
                              <label
                                htmlFor="forgot-email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Email address
                              </label>
                              <input
                                id="forgot-email"
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Send Reset Link
                            </button>
                          </form>
                        </div>
                      ) : (
                        /* Login View */
                        <div className="p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Sign in to your account
                          </h3>
                          {loginError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                              <p className="text-sm text-red-600">{loginError}</p>
                            </div>
                          )}
                          <form onSubmit={handleLogin}>
                            <div className="mb-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Email address
                              </label>
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Password
                              </label>
                              <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                              />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <input
                                  id="remember-me"
                                  name="remember-me"
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor="remember-me"
                                  className="ml-2 block text-sm text-gray-700"
                                >
                                  Remember me
                                </label>
                              </div>
                              <div className="text-sm">
                                <button
                                  type="button"
                                  onClick={() => setIsForgotPassword(true)}
                                  className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                  Forgot password?
                                </button>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Sign in
                            </button>
                          </form>
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-xs text-blue-800">
                              <strong>Demo Account:</strong><br />
                              Email: demo@wistongroup.com<br />
                              Password: demo123
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden w-8 h-8 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Navigation - Desktop */}
          <div className="border-t border-gray-200 flex justify-end hidden md:block">
            <nav className="flex justify-end space-x-8 overflow-x-auto">
              {mainCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`px-6 py-2 rounded-sm text-sm text-white font-semibold transition-colors whitespace-nowrap ${
                    colorMap[category.color]
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30"
          >
            <div className="px-4 py-2 space-y-1">
              {/* Main Categories */}
              {mainCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  {category.name}
                </Link>
              ))}

              {/* Navigation Links */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  href="/about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Product Categories Slide-in Panel */}
      <>
        {isCategoriesOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          ></div>
        )}

        <div
          ref={categoriesRef}
          className={`fixed top-0 left-0 z-50 h-full w-full max-w-xs transform transition-transform duration-300 ease-in-out bg-white shadow-xl ${
            isCategoriesOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-medium text-gray-900">
                Product Categories
              </h2>
              <button
                onClick={() => setIsCategoriesOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {productCategories.map((category) => (
                  <li key={category.name} className="border-b border-gray-200">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="p-2 rounded-lg flex justify-between items-center w-full text-left hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                      <span className="material-symbols-outlined text-sm text-[#cadcde]">
                        {openCategory === category.name
                          ? 'expand_less'
                          : 'expand_more'}
                      </span>
                    </button>

                    {openCategory === category.name && (
                      <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-700">
                        {category.subcategories.map((sub) => (
                          <li
                            key={sub}
                            className="px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
