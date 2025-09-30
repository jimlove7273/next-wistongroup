import ProductList from "@/components/Products/List";

const WeeklyProducts = () => {
  return (
    <>
      {/* Section Header */}
      <div className="text-center mt-10 mb-8">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
          <span className="mx-4 text-sm font-semibold text-purple-600 uppercase tracking-wider">
            Fresh This Week
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Weekly Specials
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Check out our latest arrivals and special deals updated every week
        </p>
      </div>

      {/* Products Grid */}
      <div className="pb-6 w-full xl:w-2/3 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductList key={index} index={index + 3} />
        ))}
      </div>
    </>
  );
};

export default WeeklyProducts;
