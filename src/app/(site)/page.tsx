import HomeHero from "@/components/HomeHero";
import ProductList from "@/components/Products/List";

const Home = () => {
  return (
    <>
      <HomeHero />
      <div className="p-6 w-full xl:w-5/6 mx-auto my-10 grid gri-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductList />
        <ProductList />
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

export default Home;
