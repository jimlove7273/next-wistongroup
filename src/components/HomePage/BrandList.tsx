const HomeBrandList = () => {
  const brands = [
    { src: "/brands/amd.gif", alt: "AMD", slug: "amd" },
    { src: "/brands/asus.gif", alt: "ASUS", slug: "asus" },
    { src: "/brands/intel.gif", alt: "Intel", slug: "intel" },
    { src: "/brands/kingston.gif", alt: "Kingston", slug: "kingston" },
    { src: "/brands/linksys.gif", alt: "Linksys", slug: "linksys" },
    { src: "/brands/liteon.png", alt: "LiteOn", slug: "liteon" },
    { src: "/brands/logitech.gif", alt: "Logitech", slug: "logitech" },
    { src: "/brands/msi.gif", alt: "MSI", slug: "msi" },
    { src: "/brands/nec.gif", alt: "NEC", slug: "nec" },
    { src: "/brands/prudentway.gif", alt: "PrudentWay", slug: "prudentway" },
    { src: "/brands/samsung.gif", alt: "Samsung", slug: "samsung" },
    { src: "/brands/seagate.gif", alt: "Seagate", slug: "seagate" },
    { src: "/brands/sony.png", alt: "Sony", slug: "sony" },
    { src: "/brands/syba.gif", alt: "Syba", slug: "syba" },
    { src: "/brands/tplink.gif", alt: "TP-Link", slug: "tplink" },
    { src: "/brands/wt.gif", alt: "WT", slug: "wt" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Brands</h2>
          <p className="text-gray-600">Trusted by industry leaders worldwide</p>
        </div>
        
        {/* Grid of brands */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={`/products/${brand.slug}`}
              className="group bg-white rounded-lg p-4 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200 grayscale hover:grayscale-0 hover:-translate-y-1"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBrandList;
