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

export default function EditRMAPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { rmas, updateRMA } = useAdminData();
  const rmaId = parseInt(params.id);
  const rma = rmas.find((r) => r.id === rmaId);

  const [formData, setFormData] = useState({
    recno: 0,
    customerID: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    email: '',
    phone: '',
    phone_f: '',
    date: '',
    rmaid: '',
    forhwat: '',
  });

  useEffect(() => {
    if (rma) {
      setFormData({
        recno: rma.recno,
        customerID: rma.customerID,
        company: rma.company,
        address1: rma.address1,
        address2: rma.address2,
        city: rma.city,
        state: rma.state,
        zipcode: rma.zipcode,
        email: rma.email,
        phone: rma.phone,
        phone_f: rma.phone_f,
        date: rma.date,
        rmaid: rma.rmaid,
        forhwat: rma.forhwat,
      });
    }
  }, [rma]);

  if (!rma) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RMA Not Found</h2>
          <p className="text-muted-foreground">
            The requested RMA could not be found
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>RMA with ID {params.id} does not exist.</p>
            <div className="mt-4">
              <Link href="/admin/rmas">
                <Button>Back to RMAs</Button>
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
    updateRMA(rmaId, formData);
    router.push('/admin/rmas');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit RMA</h2>
        <p className="text-muted-foreground">Update RMA information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>RMA Details</CardTitle>
            <CardDescription>Edit the RMA information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rmaid">RMA ID</Label>
                <Input
                  id="rmaid"
                  name="rmaid"
                  value={formData.rmaid}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerID">Customer ID</Label>
                <Input
                  id="customerID"
                  name="customerID"
                  value={formData.customerID}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="forhwat">Reason for RMA</Label>
              <Input
                id="forhwat"
                name="forhwat"
                value={formData.forhwat}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Address Line 1</Label>
              <Input
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">Address Line 2</Label>
              <Input
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/rmas">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Update RMA</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
