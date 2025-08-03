const Contact = () => {
  return (
    <div className="p-6">
      <div className="text-2xl font-bold text-blue-800 mb-4">Contact Us</div>
      Feel free to contact us anytime during our normal business hours about any
      questions and inquiries.
      <br />
      <br />
      <div className="font-semibold">Office Address - USA</div>
      713 Brea Canyon Rd
      <br />
      Walnut, CA 91789
      <br />
      <br />
      <span className="font-semibold">Normal Business Hours:</span> Monday to
      Friday, 9am to 6pm
      <br />
      TEL - (909) 444-8214
      <br />
      FAX - (909) 444-1665
      <br />
      <br />
      <a
        className="text-blue-700 hover:underline"
        href="mailto:sales@wistongroup.com"
      >
        sales@wistongroup.com
      </a>
      <br />
      <a
        className="text-blue-700 hover:underline"
        href="mailto:purchasing@wistongroup.com"
      >
        purchasing@wistongroup.com
      </a>
      <br />
      <a
        className="text-blue-700 hover:underline"
        href="mailto:accounting@wistongroup.com"
      >
        accounting@wistongroup.com
      </a>
      <br />
      <a
        className="text-blue-700 hover:underline"
        href="mailto:rma@wistongroup.com"
      >
        rma@wistongroup.com
      </a>
      <div className="my-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.641029749514!2d-117.8495149847817!3d33.9068420806428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d00295a9bb7f%3A0x445ecedf2d85b46f!2s713%20Brea%20Canyon%20Rd%2C%20Walnut%2C%20CA%2091789!5e0!3m2!1sen!2sus!4v1234567890123"
          width="100%"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
