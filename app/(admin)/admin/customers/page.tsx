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
import { CustomerType } from '@/types';
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

function CreateCustomerForm({
  onSave,
  onCancel,
}: {
  onSave: (data: any) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    company: '',
    dba: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    email: '',
    phone: '',
    customerID: '',
    passwd: '',
    sales: 1,
    taxable: 0,
  });

  return (
    <div className="space-y-5">
      {/* All Fields in 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="create-company" className="text-sm font-medium">
            Company Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="create-company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-dba" className="text-sm font-medium">
            DBA
          </Label>
          <Input
            id="create-dba"
            value={form.dba}
            onChange={(e) => setForm({ ...form, dba: e.target.value })}
            placeholder="Doing business as"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-customerID" className="text-sm font-medium">
            Customer ID
          </Label>
          <Input
            id="create-customerID"
            value={form.customerID}
            onChange={(e) => setForm({ ...form, customerID: e.target.value })}
            placeholder="Enter customer ID"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-email" className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="create-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="customer@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-phone" className="text-sm font-medium">
            Phone
          </Label>
          <Input
            id="create-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-passwd" className="text-sm font-medium">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            id="create-passwd"
            type="password"
            value={form.passwd}
            onChange={(e) => setForm({ ...form, passwd: e.target.value })}
            placeholder="Enter customer password"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="create-address1" className="text-sm font-medium">
            Address Line 1
          </Label>
          <Input
            id="create-address1"
            value={form.address1}
            onChange={(e) => setForm({ ...form, address1: e.target.value })}
            placeholder="Street address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-address2" className="text-sm font-medium">
            Address Line 2
          </Label>
          <Input
            id="create-address2"
            value={form.address2}
            onChange={(e) => setForm({ ...form, address2: e.target.value })}
            placeholder="Apt, suite, etc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-city" className="text-sm font-medium">
            City
          </Label>
          <Input
            id="create-city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-state" className="text-sm font-medium">
            State
          </Label>
          <Input
            id="create-state"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            placeholder="CA"
            maxLength={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="create-zipcode" className="text-sm font-medium">
            Zip Code
          </Label>
          <Input
            id="create-zipcode"
            value={form.zipcode}
            onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
            placeholder="12345"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(form)} className="min-w-[100px]">
          Create Customer
        </Button>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const { customers, deleteCustomer, addCustomer, updateCustomer } =
    useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [viewCustomer, setViewCustomer] = useState<CustomerType | null>(null);
  const [editCustomer, setEditCustomer] = useState<CustomerType | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createCustomerOpen, setCreateCustomerOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>('company');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredCustomers = customers.filter((customer) => {
    const company = (customer.company || '').toString().toLowerCase();
    const email = (customer.email || '').toString().toLowerCase();
    const term = searchTerm.toLowerCase();
    return company.includes(term) || email.includes(term);
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedCustomers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCustomers = sortedCustomers.slice(
    startIndex,
    startIndex + pageSize,
  );

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
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Dialog open={createCustomerOpen} onOpenChange={setCreateCustomerOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCreateCustomerOpen(true)}>
              Create Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Customer</DialogTitle>
              <DialogDescription>Add a new customer record</DialogDescription>
            </DialogHeader>
            <CreateCustomerForm
              onSave={async (payload) => {
                await addCustomer(payload as any);
                setCreateCustomerOpen(false);
              }}
              onCancel={() => setCreateCustomerOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search customers..."
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
                    <span>Customer ID</span>
                    {sortField === 'id' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      const field = 'company';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>Company</span>
                    {sortField === 'company' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
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
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      const field = 'phone';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>Phone</span>
                    {sortField === 'phone' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      const field = 'city';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>City</span>
                    {sortField === 'city' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell className="font-medium">
                    {customer.company}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-100 hover:border-blue-500"
                            title="View customer details"
                            onClick={() => setViewCustomer(customer)}
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Customer Details</DialogTitle>
                            <DialogDescription>
                              {customer.company}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-2 space-y-2">
                            <div>
                              <strong>Company: </strong>
                              <span>{customer.company}</span>
                            </div>
                            <div>
                              <strong>Email: </strong>
                              <span>{customer.email}</span>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose>
                              <Button>Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={
                          editDialogOpen && editCustomer?.id === customer.id
                        }
                        onOpenChange={(open) => {
                          setEditDialogOpen(open);
                          if (!open) {
                            setEditCustomer(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-green-100 hover:border-green-500"
                            title="Edit customer"
                            onClick={() => {
                              setEditCustomer(customer);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4 text-green-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Customer</DialogTitle>
                            <DialogDescription>
                              Update customer information
                            </DialogDescription>
                          </DialogHeader>
                          {editCustomer && (
                            <div className="space-y-5">
                              {/* All Fields in 3 Columns */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-company"
                                    className="text-sm font-medium"
                                  >
                                    Company Name{' '}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="edit-company"
                                    value={editCustomer.company || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        company: e.target.value,
                                      })
                                    }
                                    placeholder="Enter company name"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-dba"
                                    className="text-sm font-medium"
                                  >
                                    DBA
                                  </Label>
                                  <Input
                                    id="edit-dba"
                                    value={editCustomer.dba || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        dba: e.target.value,
                                      })
                                    }
                                    placeholder="Doing business as"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-customerID"
                                    className="text-sm font-medium"
                                  >
                                    Customer ID
                                  </Label>
                                  <Input
                                    id="edit-customerID"
                                    value={editCustomer.customerID || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        customerID: e.target.value,
                                      })
                                    }
                                    placeholder="Enter customer ID"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-email"
                                    className="text-sm font-medium"
                                  >
                                    Email{' '}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={editCustomer.email || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        email: e.target.value,
                                      })
                                    }
                                    placeholder="customer@example.com"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-phone"
                                    className="text-sm font-medium"
                                  >
                                    Phone
                                  </Label>
                                  <Input
                                    id="edit-phone"
                                    type="tel"
                                    value={editCustomer.phone || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        phone: e.target.value,
                                      })
                                    }
                                    placeholder="(555) 123-4567"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-passwd"
                                    className="text-sm font-medium"
                                  >
                                    Password
                                  </Label>
                                  <Input
                                    id="edit-passwd"
                                    type="password"
                                    value={editCustomer.passwd || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        passwd: e.target.value,
                                      })
                                    }
                                    placeholder="Leave blank to keep current"
                                  />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                  <Label
                                    htmlFor="edit-address1"
                                    className="text-sm font-medium"
                                  >
                                    Address Line 1
                                  </Label>
                                  <Input
                                    id="edit-address1"
                                    value={editCustomer.address1 || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        address1: e.target.value,
                                      })
                                    }
                                    placeholder="Street address"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-address2"
                                    className="text-sm font-medium"
                                  >
                                    Address Line 2
                                  </Label>
                                  <Input
                                    id="edit-address2"
                                    value={editCustomer.address2 || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        address2: e.target.value,
                                      })
                                    }
                                    placeholder="Apt, suite, etc."
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-city"
                                    className="text-sm font-medium"
                                  >
                                    City
                                  </Label>
                                  <Input
                                    id="edit-city"
                                    value={editCustomer.city || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        city: e.target.value,
                                      })
                                    }
                                    placeholder="City"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-state"
                                    className="text-sm font-medium"
                                  >
                                    State
                                  </Label>
                                  <Input
                                    id="edit-state"
                                    value={editCustomer.state || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        state: e.target.value,
                                      })
                                    }
                                    placeholder="CA"
                                    maxLength={2}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="edit-zipcode"
                                    className="text-sm font-medium"
                                  >
                                    Zip Code
                                  </Label>
                                  <Input
                                    id="edit-zipcode"
                                    value={editCustomer.zipcode || ''}
                                    onChange={(e) =>
                                      setEditCustomer({
                                        ...editCustomer,
                                        zipcode: e.target.value,
                                      })
                                    }
                                    placeholder="12345"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter className="pt-4 border-t">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              onClick={async () => {
                                if (editCustomer) {
                                  await updateCustomer(
                                    editCustomer.id,
                                    editCustomer as any,
                                  );
                                  setEditCustomer(null);
                                  setEditDialogOpen(false);
                                }
                              }}
                              className="min-w-[100px]"
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100 hover:border-red-500"
                            title="Delete customer"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {customer.company}
                              ?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              onClick={async () => {
                                await deleteCustomer(customer.id);
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
                {Math.min(startIndex + pageSize, filteredCustomers.length)} of{' '}
                {filteredCustomers.length}
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
