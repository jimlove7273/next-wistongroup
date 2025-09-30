import ProductList from "@/components/Products/List";

const WeeklyProducts = () => {
  return (
    <>
      <div className="text-2xl font-semibold mt-10 text-center">
        Weekly Products
      </div>
      <div className="pb-6 w-full xl:w-2/3 mx-auto my-10 grid gri-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
      </div>
    </>
  );
};

export default WeeklyProducts;
