import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LayoutWithSidebar } from "@/components/layout-with-sidebar";

export default function ContactPage() {
  return (
    <LayoutWithSidebar>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-slate-900">Contact Us</h1>
        <p className="text-slate-600 mb-12">
          We'd love to hear from you. Get in touch with us today.
        </p>

        <div className="mb-12 border rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=Wiston%20Group%2C%20713%20Brea%20Canyon%20Rd%2C%20Walnut%2C%20CA%2091789&output=embed"
          ></iframe>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Phone className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                  <p className="text-slate-700">(888) 822-0008</p>
                  <p className="text-sm text-slate-600">
                    Mon-Fri, 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
                    <div className="font-medium text-slate-600">General:</div>
                    <Link
                      href="mailto:info@wistongroup.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      info@wistongroup.com
                    </Link>

                    <div className="font-medium text-slate-600">Sales:</div>
                    <Link
                      href="mailto:sales@wistongroup.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      sales@wistongroup.com
                    </Link>

                    <div className="font-medium text-slate-600">
                      Purchasing:
                    </div>
                    <Link
                      href="mailto:purchasing@wistongroup.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      purchasing@wistongroup.com
                    </Link>

                    <div className="font-medium text-slate-600">
                      Accounting:
                    </div>
                    <Link
                      href="mailto:accounting@wistongroup.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      accounting@wistongroup.com
                    </Link>

                    <div className="font-medium text-slate-600">RMA:</div>
                    <Link
                      href="mailto:rma@wistongroup.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      rma@wistongroup.com
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                  <p className="text-slate-700">Wiston Group</p>
                  <p className="text-slate-700">
                    713 Brea Canyon Rd
                    <br />
                    Walnut, CA 91789
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Send us a Message
            </h2>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
    </LayoutWithSidebar>
  );
}
