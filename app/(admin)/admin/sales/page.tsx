'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useAdminData } from '@/hooks/use-admin-data';
import { SaleType } from '@/types';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function SalesPage() {
  const { sales, deleteSale, updateSale } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [viewSale, setViewSale] = useState<SaleType | null>(null);
  const [editSale, setEditSale] = useState<SaleType | null>(null);

  const filteredSales = sales.filter(
    (sale) =>
      (sale.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sale.email || '').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredSales.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSales = filteredSales.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(parseInt(value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
          <p className="text-muted-foreground">Manage sales records</p>
        </div>
        <Link href="/admin/sales/new">
          <Button>Create Sale</Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Record No</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.name}</TableCell>
                  <TableCell>{sale.email}</TableCell>
                  <TableCell>{sale.recno}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-100 hover:border-blue-500"
                            title="View sale details"
                            onClick={() => setViewSale(sale)}
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Sale Details</DialogTitle>
                            <DialogDescription>
                              Order #{sale.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-2 space-y-2">
                            <div>
                              <strong>Customer: </strong>
                              <span>{sale.customerName}</span>
                            </div>
                            <div>
                              <strong>Total: </strong>
                              <span>${sale.total}</span>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose>
                              <Button>Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-green-100 hover:border-green-500"
                            title="Edit sale"
                            onClick={() => setEditSale(sale)}
                          >
                            <Pencil className="h-4 w-4 text-green-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Sale</DialogTitle>
                            <DialogDescription>
                              Edit the sale record
                            </DialogDescription>
                          </DialogHeader>
                          {editSale && (
                            <div className="mt-2 space-y-3">
                              <div>
                                <Label>Status</Label>
                                <Input
                                  value={editSale.status || ''}
                                  onChange={(e) =>
                                    setEditSale({
                                      ...editSale,
                                      status: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Total</Label>
                                <Input
                                  value={String(editSale.total || '')}
                                  onChange={(e) =>
                                    setEditSale({
                                      ...editSale,
                                      total: Number(e.target.value),
                                    })
                                  }
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button
                              onClick={async () => {
                                if (editSale) {
                                  await updateSale(
                                    editSale.id,
                                    editSale as any,
                                  );
                                  setEditSale(null);
                                }
                              }}
                            >
                              Save
                            </Button>
                            <DialogClose>
                              <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100 hover:border-red-500"
                            title="Delete sale"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete order #{sale.id}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              onClick={async () => {
                                await deleteSale(sale.id);
                              }}
                            >
                              Delete
                            </Button>
                            <DialogClose>
                              <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Rows per page
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="250">250</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {startIndex + 1}-
                {Math.min(startIndex + pageSize, filteredSales.length)} of{' '}
                {filteredSales.length}
              </span>
            </div>

            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {/* Page numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first, last, current, and nearby pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                }
                // Show ellipsis for gaps
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 py-1 text-sm">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
