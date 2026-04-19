import Link from "next/link";

export function Topnav() {
  return (
    <div className="hidden md:block bg-gray-800 text-white p-4 text-xs">
      <div className="flex justify-between items-center container mx-auto">
        <span className="font-semibold">
          713 Brea Canyon Road, Walnut, CA 91789 - Mon-Fri 8:30 AM - 5:30 PM PST
        </span>
        <nav className="flex gap-4">
          <Link
            href="/newsignup"
            className="text-slate-300 hover:text-white font-semibold"
          >
            Open Account
          </Link>
          <Link
            href="/about"
            className="text-slate-300 hover:text-white font-semibold"
          >
            About Wiston Group
          </Link>
          <Link
            href="/contact"
            className="text-slate-300 hover:text-white font-semibold"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
}
