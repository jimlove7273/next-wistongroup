import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white !text-[20px]">
                  jamboard_kiosk
                </span>
              </div>
              <span className="text-xl font-bold">WistonGroup</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for high-quality computer parts and
              components. Building the future of computing.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/social/facebook.png"
                  alt="Facebook"
                  width="40"
                  height="40"
                />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/social/twitter.png"
                  alt="Twitter"
                  width="40"
                  height="40"
                />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/social/instagram.png"
                  alt="Instagram"
                  width="40"
                  height="40"
                />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/social/youtube.png"
                  alt="YouTube"
                  width="40"
                  height="40"
                />
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="text-gray-400">
              713 Brea Canyon Road
              <br />
              Walnut, CA 9178
              <br />
              <br />
              Phone: 909.444.8214
              <br />
              Fax: 909.444.1665
              <br />
              <br />
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get the latest deals and tech news.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-1/2 *:px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                <img
                  src="/envelope.png"
                  alt="Send Email"
                  width="30"
                  height="30"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 WistonGroup. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
