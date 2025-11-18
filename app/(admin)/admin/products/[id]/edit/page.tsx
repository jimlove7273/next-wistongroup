'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAdminData } from '@/hooks/use-admin-data';
import Link from 'next/link';

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { products, updateProduct } = useAdminData();
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  const [formData, setFormData] = useState({
    recno: 0,
    istid: 0,
    partnumber: '',
    brand: '',
    description: '',
    color: '',
    price: 0,
    discount: 0,
    extra: '',
    featured: 0,
    specials: 0,
    buy: 0,
    get: 0,
    active: 1,
    list1: '',
    list2: '',
    list3: '',
    list4: '',
    list5: '',
    list6: '',
    list7: '',
    list8: '',
    list9: '',
    list10: '',
    list11: '',
    list12: '',
    list13: '',
    list14: '',
    list15: '',
    list16: '',
    list17: '',
    list18: '',
    list19: '',
    list20: '',
    outofstock: 0,
    freeshipping: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        recno: product.recno,
        istid: product.istid,
        partnumber: product.partnumber,
        brand: product.brand,
        description: product.description,
        color: product.color,
        price: product.price,
        discount: product.discount,
        extra: product.extra,
        featured: product.featured,
        specials: product.specials,
        buy: product.buy,
        get: product.get,
        active: product.active,
        list1: product.list1,
        list2: product.list2,
        list3: product.list3,
        list4: product.list4,
        list5: product.list5,
        list6: product.list6,
        list7: product.list7,
        list8: product.list8,
        list9: product.list9,
        list10: product.list10,
        list11: product.list11,
        list12: product.list12,
        list13: product.list13,
        list14: product.list14,
        list15: product.list15,
        list16: product.list16,
        list17: product.list17,
        list18: product.list18,
        list19: product.list19,
        list20: product.list20,
        outofstock: product.outofstock,
        freeshipping: product.freeshipping,
      });
    }
  }, [product]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(productId, formData);
    router.push('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Edit the product information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnumber">Part Number</Label>
                <Input
                  id="partnumber"
                  name="partnumber"
                  value={formData.partnumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="featured">Featured</Label>
                <Input
                  id="featured"
                  name="featured"
                  type="number"
                  value={formData.featured}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specials">Specials</Label>
                <Input
                  id="specials"
                  name="specials"
                  type="number"
                  value={formData.specials}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="active">Active</Label>
                <Input
                  id="active"
                  name="active"
                  type="number"
                  value={formData.active}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/products">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Update Product</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
