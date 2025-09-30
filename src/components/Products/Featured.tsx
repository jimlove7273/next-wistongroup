import ProductList from "@/components/Products/List";

const FeaturedProducts = () => {
  return (
    <>
      {/* Section Header */}
      <div className="text-center mt-10 mb-8">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
          <span className="mx-4 text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Handpicked for You
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Featured Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Discover our carefully selected products that stand out for quality and value
        </p>
      </div>

      {/* Products Grid */}
      <div className="pb-6 w-full xl:w-2/3 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProductList key={index} index={index} />
        ))}
      </div>
    </>
  );
};

export default FeaturedProducts;
