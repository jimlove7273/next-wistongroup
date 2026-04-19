import Link from "next/link";
import { PhoneSVG, EmailSVG, LocationSVG, HoursSVG } from "@/components/svg";

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
              <LocationSVG className="w-4 h-4 text-[#C8102E]" />
              713 Brea Canyon Road, Walnut, CA 91789
            </div>
            <div className="flex gap-3 my-1 text-sm text-slate-200 leading-relaxed">
              <PhoneSVG className="w-4 h-4 text-[#C8102E]" />
              (909) 444-8214
            </div>
            <div className="flex items-center gap-3 my-1 text-sm text-slate-200 leading-relaxed">
              <EmailSVG className="w-4 h-4 text-[#C8102E]" />
              sales@wistongroup.com
            </div>
            <div className="flex items-center gap-3 my-1 text-sm text-slate-200 leading-relaxed">
              <HoursSVG className="w-4 h-4 text-[#C8102E]" />
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
