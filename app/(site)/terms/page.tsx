import { LayoutWithSidebar } from '@/components/layout-with-sidebar';

export default function TermsPage() {
  return (
    <LayoutWithSidebar>
      {/* Hero Section */}
      <div
        className="w-full h-80 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: 'url(/asus-rog-motherboard.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Use
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 sr-only">
          Terms of Use
        </h1>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Agreement to Terms
            </h2>
            <p>
              These Terms of Use constitute a legally binding agreement between
              you (“you”) and Wiston Group, Inc. (“we,” “us,” or “our”)
              regarding your access to and use of this website (the “Site”). By
              accessing or using the Site, you acknowledge that you have read,
              understood, and agree to be bound by these Terms.
            </p>
            <p className="mt-4">
              If you do not agree with these Terms, you are prohibited from
              using the Site and must discontinue use immediately.
            </p>
          </section>

          {/* Accounts */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Account Registration & Responsibilities
            </h2>
            <p>
              If you create an account on our Site, you agree to provide
              accurate and complete information. You are responsible for
              maintaining the confidentiality of your login credentials and for
              all activities that occur under your account.
            </p>
            <p className="mt-4">
              We are not responsible for any unauthorized use of your account.
              You agree to notify us immediately of any suspected breach or
              unauthorized access.
            </p>
          </section>

          {/* E-commerce */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Product Information & Orders
            </h2>
            <p>
              We make every effort to display accurate product descriptions,
              pricing, and images. However, we do not guarantee that all
              information is error-free, complete, or current. We reserve the
              right to correct any errors, update information, or cancel orders
              if product details or pricing are inaccurate.
            </p>
            <p className="mt-4">
              All orders are subject to acceptance and availability. We reserve
              the right to refuse or cancel any order at our discretion.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Shipping & Service Regions
            </h2>
            <p>
              Wiston Group, Inc. primarily provides products and services within
              the United States and Canada. Orders placed outside these regions
              may not be accepted or may incur additional restrictions.
            </p>
          </section>

          {/* RMA / Returns */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Returns, RMAs & Warranty
            </h2>
            <p>
              Return merchandise authorization (RMA) policies vary by product
              type and manufacturer. By submitting an RMA, you agree to follow
              all instructions provided by our support team, including packaging
              requirements and deadlines.
            </p>
            <p className="mt-4">
              Products returned without prior authorization may be rejected or
              incur additional processing fees.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Intellectual Property Rights
            </h2>
            <p>
              All content on the Site—including text, images, graphics, logos,
              software, and other materials (“Content”)—is the property of
              Wiston Group, Inc. or its licensors. You may not copy, reproduce,
              modify, distribute, or create derivative works based on the
              Content without our express written permission.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Prohibited Activities
            </h2>
            <p>You agree not to engage in activities such as:</p>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
              <li>Using the Site for unlawful or fraudulent purposes</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Uploading harmful code, viruses, or disruptive material</li>
              <li>Interfering with the Site’s performance or security</li>
              <li>Reselling access to the Site or any part of its services</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Termination of Access
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to the
              Site at our sole discretion, without notice, for conduct that
              violates these Terms or is otherwise harmful to our business,
              users, or partners.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Disclaimer
            </h2>
            <p>
              The Site is provided on an “as-is” and “as-available” basis. We
              disclaim all warranties, express or implied, including but not
              limited to merchantability, fitness for a particular purpose, and
              non-infringement. We do not guarantee that the Site will be
              uninterrupted, error-free, or secure.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Wiston Group, Inc. shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including loss of revenue,
              data, profits, or business opportunities arising from your use of
              the Site.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Changes to These Terms
            </h2>
            <p>
              We may update or modify these Terms of Use at any time. Changes
              will be posted on this page, and your continued use of the Site
              after changes are posted constitutes your acceptance of the
              revised Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us
              through the contact page on our website.
            </p>
          </section>
        </div>
      </main>
    </LayoutWithSidebar>
  );
}
