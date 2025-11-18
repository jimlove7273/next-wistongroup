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

export default function RMADetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { rmas, deleteRMA } = useAdminData();
  const rmaId = parseInt(params.id);
  const rma = rmas.find((r) => r.id === rmaId);

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

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this RMA?')) {
      deleteRMA(rmaId);
      router.push('/admin/rmas');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RMA Details</h2>
          <p className="text-muted-foreground">View RMA information</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/rmas/${rmaId}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{rma.rmaid}</CardTitle>
          <CardDescription>Return Merchandise Authorization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">RMA Information</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">RMA ID:</span> {rma.rmaid}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {rma.date}
                </p>
                <p>
                  <span className="font-medium">Customer ID:</span>{' '}
                  {rma.customerID}
                </p>
                <p>
                  <span className="font-medium">Reason:</span>{' '}
                  {rma.forhwat || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Customer Information
              </h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Company:</span> {rma.company}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {rma.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {rma.phone}
                </p>
                <p>
                  <span className="font-medium">Fax:</span>{' '}
                  {rma.phone_f || 'N/A'}
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <div className="space-y-1">
                <p>{rma.address1}</p>
                {rma.address2 && <p>{rma.address2}</p>}
                <p>
                  {rma.city}, {rma.state} {rma.zipcode}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
