import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products"

export default function RelatedProducts({
  currentProductId,
  category,
}: { currentProductId: string; category: string }) {
  const relatedProducts = products.filter((p) => p.category === category && p.id !== currentProductId).slice(0, 4)

  if (relatedProducts.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{relatedProduct.sku}</p>
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {relatedProduct.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
