import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* First column - twice as wide */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Wiston Group</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for computer components, hardware, and
              technology solutions. We provide high-quality products and
              exceptional service to meet all your computing needs.
            </p>
          </div>

          {/* Second column */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Third column */}
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright notice at the bottom */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2007–{new Date().getFullYear()} Wiston Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
