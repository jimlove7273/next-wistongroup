import { LayoutWithSidebar } from '@/components/layout-with-sidebar';

export default function AboutPage() {
  return (
    <LayoutWithSidebar>
      {/* Hero Section */}
      <div
        className="w-full h-96 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: 'url(/intel-core-i9.png)' }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Wiston Group
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your trusted partner in technology solutions and premium computer
            components
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 sr-only">
          About Wiston Group
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            Our Mission
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Here at Wiston Group, we seek to uphold our goal of helping
            customers grow their business by offering the best prices possible
            on premium computer products. Every effort at providing excellent
            products at lower prices is made: we work directly with
            manufacturers and suppliers so that the final product coming to the
            customer is cheaper while still maintaining a premium grade. We
            carefully select products that are unique and profitable so that our
            customers can build their business on not just one, but many
            different angles.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            It's Easy to Do Business With Us
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We believe simpler is better. The process of starting an account
            with our company is much shorter and more convenient, so that the
            turn around time is within a few hours, not a few days. Starting on
            the first day of business our dedicated sales team will serve each
            and every customer with the same attention and respect, no matter
            how large or small your business is. Our focused sales team works
            hard to ensure that every step of the purchasing process from order
            to delivery is friendly, precise, and on-time. At Wiston Group,
            doing business is easy and hassle free.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            Premium Products and Low Prices, Everyday
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            From our weekly promotions to our competitively priced products, our
            team strives to provide the best deals as often as possible to meet
            the needs of our customers in this fast-paced, dynamic world. Our
            experienced management team understands the importance of customer
            feedback and knows where to buy high quality products at the best
            prices.
          </p>
        </section>

        <section className="mb-12 pb-12 border-b border-slate-200">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            100% Customer Satisfaction
          </h2>
          <p className="text-slate-700 leading-relaxed">
            While providing premium, low-priced products for our customers is
            important, ensuring that our customers are 100% satisfied with our
            service ranks even higher. We listen attentively to our customer's
            demands and take their feedback and comments seriously. Every step
            is taken to ensure that customer service is as easy and hassle-free
            as possible. Returning problematic merchandise is only one-click
            away; customers only need to fill out the online form and wait for
            their authorization number that will be issued within 24 hours. Our
            team here at Wiston Group are always available for any inquiries.
            For our valuable customers, we take great effort to give them an
            enjoyable and hassle-free business experience.
          </p>
        </section>
      </main>
    </LayoutWithSidebar>
  );
}
