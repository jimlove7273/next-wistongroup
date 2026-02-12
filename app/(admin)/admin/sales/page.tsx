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
  CardFooter,
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
import { Eye, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
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

function CreateSalesForm({
  onSave,
  onCancel,
}: {
  onSave: (data: any) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    salesID: '',
  });

  return (
    <Card>
      <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto p-6">
        <div>
          <Label>Sales ID</Label>
          <Input
            value={form.salesID}
            onChange={(e) => setForm({ ...form, salesID: e.target.value })}
          />
        </div>
        <div>
          <Label>Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(form)}>Save</Button>
      </CardFooter>
    </Card>
  );
}

export default function SalesPage() {
  const { sales, deleteSale, updateSale } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [viewSale, setViewSale] = useState<SaleType | null>(null);
  const [editSale, setEditSale] = useState<SaleType | null>(null);
  const [createSalesOpen, setCreateSalesOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    salesID: '',
    name: '',
    email: '',
    password: '',
  });
  const [sortField, setSortField] = useState<string | null>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredSales = sales.filter(
    (sale) =>
      (sale.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sale.email || '').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedSales = [...filteredSales].sort((a, b) => {
    if (!sortField) return 0;
    const av = (a as any)[sortField];
    const bv = (b as any)[sortField];
    const as = (av || '').toString().toLowerCase();
    const bs = (bv || '').toString().toLowerCase();
    if (as < bs) return sortDir === 'asc' ? -1 : 1;
    if (as > bs) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sortedSales.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSales = sortedSales.slice(startIndex, startIndex + pageSize);

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
        <Dialog open={createSalesOpen} onOpenChange={setCreateSalesOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCreateSalesOpen(true)}>
              Create Sales
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[32rem] max-h-[75vh]">
            <DialogHeader>
              <DialogTitle>Create Sales</DialogTitle>
              <DialogDescription>Add a new sales record</DialogDescription>
            </DialogHeader>
            <Card>
              <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto p-6">
                <div>
                  <Label>Sales ID</Label>
                  <Input
                    value={createForm.salesID}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, salesID: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Name</Label>
                  <Input
                    value={createForm.name}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={createForm.email}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={createForm.password}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, password: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setCreateSalesOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    await useAdminData().addSale(createForm as any);
                    setCreateSalesOpen(false);
                  }}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </DialogContent>
        </Dialog>
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
                <TableHead>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      const field = 'id';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>ID</span>
                    {sortField === 'id' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead>Sales ID</TableHead>
                <TableHead>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      const field = 'name';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>Name</span>
                    {sortField === 'name' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      const field = 'email';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>Email</span>
                    {sortField === 'email' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{(sale as any).salesID}</TableCell>
                  <TableCell>{sale.name}</TableCell>
                  <TableCell>{sale.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
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
                            <DialogTitle>Edit Sales</DialogTitle>
                            <DialogDescription>
                              Edit the sale record
                            </DialogDescription>
                          </DialogHeader>
                          {editSale && (
                            <Card>
                              <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto p-6">
                                <div>
                                  <Label>Sales ID</Label>
                                  <Input
                                    value={(editSale as any).salesID || ''}
                                    onChange={(e) =>
                                      setEditSale({
                                        ...editSale,
                                        salesID: e.target.value,
                                      } as any)
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Name</Label>
                                  <Input
                                    value={editSale.name}
                                    onChange={(e) =>
                                      setEditSale({
                                        ...editSale,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <Input
                                    type="email"
                                    value={editSale.email}
                                    onChange={(e) =>
                                      setEditSale({
                                        ...editSale,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Password</Label>
                                  <Input
                                    type="password"
                                    value={editSale.password}
                                    onChange={(e) =>
                                      setEditSale({
                                        ...editSale,
                                        password: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-end space-x-2">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
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
                                  className="min-w-[100px]"
                                >
                                  Save Changes
                                </Button>
                              </CardFooter>
                            </Card>
                          )}
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
