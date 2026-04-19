import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* First column - twice as wide */}
          <div className="flex flex-2 flex-col md:col-span-3">
            <h3 className="text-lg font-bold mb-4">WISTON GROUP</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Authorized distributor of computer components, hardware and
              software to resellers, system integrators and IT professionals.
              Serving North America since 2007.
            </p>
            <div className="flex gap-3 items-center mt-4 mb-1 text-sm text-slate-200 leading-relaxed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-map-pin w-4 h-4 text-[#C8102E]"
                aria-hidden="true"
                x-file-name="Footer"
                x-line-number="32"
                x-column="53"
                x-component="MapPin"
                x-id="Footer_32_53"
                x-dynamic="false"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              713 Brea Canyon Road, Walnut, CA 91789
            </div>
            <div className="flex gap-3 my-1 text-sm text-slate-200 leading-relaxed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-phone w-4 h-4 text-[#C8102E]"
                aria-hidden="true"
                x-file-name="Footer"
                x-line-number="33"
                x-column="53"
                x-component="Phone"
                x-id="Footer_33_53"
                x-dynamic="false"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              (626) 581-8886
            </div>
            <div className="flex items-center gap-3 my-1 text-sm text-slate-200 leading-relaxed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-mail w-4 h-4 text-[#C8102E]"
                aria-hidden="true"
                x-file-name="Footer"
                x-line-number="34"
                x-column="53"
                x-component="Mail"
                x-id="Footer_34_53"
                x-dynamic="false"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              </svg>
              sales@wistongroup.com
            </div>
            <div className="flex items-center gap-3 my-1 text-sm text-slate-200 leading-relaxed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-clock w-4 h-4 text-[#C8102E]"
                aria-hidden="true"
                x-file-name="Footer"
                x-line-number="35"
                x-column="53"
                x-component="Clock"
                x-id="Footer_35_53"
                x-dynamic="false"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Mon-Fri 8:30 AM - 5:30 PM PST
            </div>
          </div>

          <div className="flex flex-1">&nbsp;</div>

          {/* Second column */}
          <div className="flex flex-1 flex-col">
            <h4 className="text-md font-semibold mb-4">ACCOUNT</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/newsignup"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Open Account
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/rma"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  RMA Request
                </Link>
              </li>
              <li>
                <Link
                  href="/orderstatus"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Order Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Third column */}
          <div className="flex flex-col flex-1">
            <h4 className="text-md font-semibold mb-4">COMPANY</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  News Announcement
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-700"></div>

      {/* Copyright notice at the bottom */}
      <div className="container mx-auto px-4">
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2007–{new Date().getFullYear()} Wiston Group, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-4">&nbsp;</div>
        </div>
      </div>
    </footer>
  );
}
