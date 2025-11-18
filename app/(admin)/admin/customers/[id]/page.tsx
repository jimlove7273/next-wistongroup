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

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { customers, deleteCustomer } = useAdminData();
  const customerId = parseInt(params.id);
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Customer Not Found
          </h2>
          <p className="text-muted-foreground">
            The requested customer could not be found
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>Customer with ID {params.id} does not exist.</p>
            <div className="mt-4">
              <Link href="/admin/customers">
                <Button>Back to Customers</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(customerId);
      router.push('/admin/customers');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Customer Details
          </h2>
          <p className="text-muted-foreground">View customer information</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/customers/${customerId}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{customer.companyName}</CardTitle>
          <CardDescription>Contact: {customer.contact}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Email:</span> {customer.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {customer.phone}
                </p>
                <p>
                  <span className="font-medium">Fax:</span>{' '}
                  {customer.fax || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <div className="space-y-1">
                <p>{customer.address1}</p>
                {customer.address2 && <p>{customer.address2}</p>}
                <p>
                  {customer.city}, {customer.state} {customer.zipcode}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
