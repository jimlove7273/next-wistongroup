import { LayoutWithSidebar } from '@/components/layout-with-sidebar';

export default function PrivacyPage() {
  return (
    <LayoutWithSidebar>
      {/* Hero Section */}
      <div
        className="w-full h-80 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: 'url(/amd-ryzen-9-processor.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-10 text-slate-900 sr-only">
          Privacy Policy
        </h1>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <p>
            Wiston Group, Inc. ("us", "we", or "our") operates this website (the
            "Service"). This Privacy Policy explains how we collect, use, and
            protect your information when you visit or make a purchase from our
            site.
          </p>

          <p>
            Our company primarily serves customers in the United States and
            Canada and sells computer components and related products. By using
            our Service, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>

          {/* INFORMATION COLLECTION */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Information We Collect
            </h2>

            <p>
              To provide our products and services, we collect only the
              information necessary to process your orders and support your
              account. We do <strong>not</strong> ask for unnecessary personal
              details.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-800">
              Personal Data
            </h3>
            <p>When placing an order or creating an account, we may collect:</p>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
              <li>Your first and last name</li>
              <li>Shipping and billing address</li>
              <li>Email address</li>
              <li>Phone number (for order or delivery-related contact)</li>
            </ul>

            <p className="mt-4">
              This information is used strictly for shipping, delivery updates,
              customer communication, and account management.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-800">
              Automatically Collected Data
            </h3>
            <p>
              Like most websites, we may collect Cookies and Usage Data that
              help us improve performance and user experience. This may include
              IP address, browser type, pages visited, time spent, and technical
              diagnostic data.
            </p>
          </section>

          {/* HOW DATA IS USED */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
              <li>To process and complete orders</li>
              <li>To ship products to your address</li>
              <li>To send order confirmations and tracking details</li>
              <li>To respond to customer service requests</li>
              <li>To improve our website and product offerings</li>
              <li>To maintain the security and reliability of our Service</li>
            </ul>

            <p className="mt-4">
              We do <strong>not</strong> use your information for marketing
              without your consent, and we do <strong>not</strong> sell, rent,
              or share your information with any third parties for commercial
              purposes.
            </p>
          </section>

          {/* DATA SHARING */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Sharing of Information
            </h2>

            <p>
              We do not sell or trade your personal information. However, we may
              share limited data with trusted service providers solely for
              operational reasons, such as:
            </p>

            <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
              <li>Shipping carriers (e.g., UPS, FedEx, USPS)</li>
              <li>Payment processors</li>
              <li>Fraud prevention services</li>
            </ul>

            <p className="mt-4">
              These third parties are required to protect your data and are not
              permitted to use it for any purpose other than fulfilling their
              specific service.
            </p>
          </section>

          {/* DATA SECURITY */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Data Security
            </h2>
            <p>
              We take data security seriously and use commercially acceptable
              methods to protect your Personal Data. However, please understand
              that no method of transmission over the internet or electronic
              storage is 100% secure. While we do our best to safeguard your
              information, we cannot guarantee absolute protection.
            </p>
          </section>

          {/* INTERNATIONAL */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              International Users
            </h2>
            <p>
              Our Service is primarily intended for customers located in the
              United States and Canada. If you access our Service from outside
              these regions, you acknowledge that your information may be
              transferred to and processed in these countries.
            </p>
          </section>

          {/* LINKS */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Links to Other Websites
            </h2>
            <p>
              Our website may contain links to third-party sites that are not
              operated by us. We are not responsible for the privacy practices
              or content of those websites. We recommend reviewing the privacy
              policies of any site you visit.
            </p>
          </section>

          {/* CHANGES */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy occasionally. Any changes will
              be posted on this page with an updated effective date. We
              encourage you to review this page periodically for updates.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how your
              information is handled, please contact us at:
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              Email: info@wistongroup.com
            </p>
          </section>
        </div>
      </main>
    </LayoutWithSidebar>
  );
}
