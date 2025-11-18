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

export default function SaleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { sales, deleteSale } = useAdminData();
  const saleId = parseInt(params.id);
  const sale = sales.find((s) => s.id === saleId);

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

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this sale record?')) {
      deleteSale(saleId);
      router.push('/admin/sales');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sale Details</h2>
          <p className="text-muted-foreground">View sale information</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/sales/${saleId}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sale Record #{sale.recno}</CardTitle>
          <CardDescription>Customer: {sale.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Customer Information
              </h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Name:</span> {sale.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {sale.email}
                </p>
                <p>
                  <span className="font-medium">Record No:</span> {sale.recno}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
