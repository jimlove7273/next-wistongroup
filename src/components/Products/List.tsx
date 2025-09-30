import { productListType, productType } from "@/types/products";
import ProductCard from "./Card";

interface ProductListProps {
  index?: number;
}

const ProductList = ({ index = 0 }: ProductListProps) => {
  const featuredProducts: productListType = [
    {
      id: `${index + 1}`,
      name: "AMD Ryzen 9 7950X 16-Core Processor",
      price: 599,
      originalPrice: 699,
      rating: 4.8,
      image:
        "https://readdy.ai/api/search-image?query=AMD%20Ryzen%209%207950X%20processor%20on%20clean%20white%20background%2C%20modern%20CPU%20chip%20with%20silver%20heat%20spreader%2C%20professional%20product%20photography%2C%20high-end%20computer%20component%2C%20detailed%20view%20of%20pins%20and%20branding%2C%20minimalist%20tech%20aesthetic%2C%20studio%20lighting&width=400&height=300&seq=cpu1&orientation=landscape",
      category: "CPUs & Processors",
      inStock: true,
      badge: "Best Seller",
    },
  ];

  return (
    <div className="w-full">
      {featuredProducts.map((product: productType) => (
        <ProductCard key={product.id} product={product} imageIndex={index} />
      ))}
    </div>
  );
};

export default ProductList;
