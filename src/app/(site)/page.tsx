import HomeBrandList from '@/components/HomePage/BrandList';
import HomeHero from '@/components/HomePage/HomeHero';
import FeaturedProducts from '@/components/Products/Featured';
import WeeklyProducts from '@/components/Products/Weekly';

const Home = () => {
  return (
    <>
      <HomeHero />
      <FeaturedProducts />
      <WeeklyProducts />
      <HomeBrandList />
    </>
  );
};

export default Home;
