'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminData } from '@/hooks/use-admin-data';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { products, deleteProduct } = useAdminData();
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Product Not Found
          </h2>
          <p className="text-muted-foreground">
            The requested product could not be found
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>Product with ID {params.id} does not exist.</p>
            <div className="mt-4">
              <Link href="/admin/products">
                <Button>Back to Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      router.push('/admin/products');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Product Details</h2>
          <p className="text-muted-foreground">View product information</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/products/${productId}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{product.partnumber}</CardTitle>
          <CardDescription>
            {product.brand} - {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Product Information
              </h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Part Number:</span>{' '}
                  {product.partnumber}
                </p>
                <p>
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{' '}
                  {product.description}
                </p>
                <p>
                  <span className="font-medium">Color:</span>{' '}
                  {product.color || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Pricing</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Price:</span> $
                  {product.price.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Discount:</span>{' '}
                  {product.discount > 0
                    ? `$${product.discount.toFixed(2)}`
                    : 'None'}
                </p>
                <p>
                  <span className="font-medium">Final Price:</span> $
                  {(product.price - product.discount).toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Active:</span>{' '}
                  {product.active ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-medium">Featured:</span>{' '}
                  {product.featured ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-medium">Specials:</span>{' '}
                  {product.specials ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-medium">Out of Stock:</span>{' '}
                  {product.outofstock ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-medium">Free Shipping:</span>{' '}
                  {product.freeshipping ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
