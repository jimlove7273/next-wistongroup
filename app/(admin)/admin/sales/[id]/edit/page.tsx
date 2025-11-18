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

export default function EditSalePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { sales, updateSale } = useAdminData();
  const saleId = parseInt(params.id);
  const sale = sales.find((s) => s.id === saleId);

  const [formData, setFormData] = useState({
    recno: 0,
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (sale) {
      setFormData({
        recno: sale.recno,
        name: sale.name,
        email: sale.email,
        password: sale.password,
      });
    }
  }, [sale]);

  if (!sale) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sale Not Found</h2>
          <p className="text-muted-foreground">
            The requested sale could not be found
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>Sale with ID {params.id} does not exist.</p>
            <div className="mt-4">
              <Link href="/admin/sales">
                <Button>Back to Sales</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSale(saleId, formData);
    router.push('/admin/sales');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Sale</h2>
        <p className="text-muted-foreground">Update sale information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Sale Details</CardTitle>
            <CardDescription>Edit the sale information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/sales">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Update Sale</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
