import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/db-products";
import ProductDetailContent from "@/components/product-detail-content";
import RelatedProducts from "@/components/related-products";
import ProductImage from "@/components/product-image";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);
  console.log("product 1", product);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 lg:px-8 mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <ProductImage
            src={product.image}
            alt={product.name}
            sku={product.sku}
            className="aspect-square rounded-lg"
          />

          {/* Product Info */}
          <ProductDetailContent product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}
