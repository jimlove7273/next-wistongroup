import { LayoutWithSidebar } from '@/components/layout-with-sidebar';

const NewSignupPage = () => {
  return (
    <LayoutWithSidebar>
      {/* Hero Section */}
      <div
        className="w-full h-80 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: 'url(/corsair-power-supply.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            New Customer Sign Up
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 sr-only">
          New Customer Sign Up
        </h1>
        <p className="text-slate-700 leading-relaxed mb-4">
          Thank you for choosing Wiston Group Inc. to meet your needs of
          obtaining the accurate source of computer parts.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In order to set up your account and compliance with the government
          Sales and Use Tax Laws, please provide all of the following documents
          to us.
        </p>

        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 my-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            Required Documents
          </h2>
          <ol className="list-decimal list-outside pl-6 space-y-4 text-slate-700">
            <li>
              A completed, signed and dated New Customer Account Application.
              <br />
              <em className="text-sm text-slate-600">
                (click to download the form - link disabled)
              </em>
            </li>
            <li>
              A copy of your state issued Reseller's Permit, which is currently
              valid and showing the matched company name and address on your New
              Customer Account Application.
              <br />
              <em className="text-sm text-slate-600">
                (States of Alaska, Deleware, Montana, New Hampshire and Oregon
                are excluded from this item)
              </em>
            </li>
            <li>
              <div>For your chosen payment method:</div>
              <ul className="list-disc list-outside pl-6 mt-2 space-y-2">
                <li>
                  <strong>For COD account (payment by company check):</strong>
                  <br />A copy of your company's voided check.
                </li>
                <li>
                  <strong>For Credit Card account:</strong>
                  <br />A completed and signed Credit Card Authorization Form.
                  <br />
                  <em className="text-sm text-slate-600">
                    (click to download the form - link disabled)
                  </em>
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Submission</h2>
          <p className="text-slate-700 leading-relaxed">
            Please Fax, email, or mail your completed documents to us at:
          </p>
          <address className="mt-4 not-italic text-slate-700 leading-relaxed">
            <strong>Wiston Group Inc.</strong>
            <br />
            713 Brea Canyon Road,
            <br />
            Walnut, CA 91789
            <br />
            <strong>Fax:</strong> (909) 444-1665
          </address>
        </div>
      </main>
    </LayoutWithSidebar>
  );
};

export default NewSignupPage;
