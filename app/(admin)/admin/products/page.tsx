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
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useAdminData } from '@/hooks/use-admin-data';
import { productType } from '@/types';
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

function CreateProductForm({
  onSave,
  onCancel,
}: {
  onSave: (data: any) => Promise<void> | void;
  onCancel: () => void;
}) {
  const empty: any = {
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
    outofstock: 0,
    freeshipping: 0,
  };
  for (let i = 1; i <= 20; i++) empty[`list${i}`] = '';
  const [form, setForm] = useState<any>(empty);
  return (
    <div className="space-y-3 max-h-[60vh] overflow-auto">
      <div>
        <Label>Part Number</Label>
        <Input
          value={form.partnumber}
          onChange={(e) => setForm({ ...form, partnumber: e.target.value })}
        />
      </div>
      <div>
        <Label>Brand</Label>
        <Input
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Buy</Label>
          <Input
            value={String(form.buy)}
            onChange={(e) =>
              setForm({ ...form, buy: parseInt(e.target.value || '0') })
            }
          />
        </div>
        <div>
          <Label>Get</Label>
          <Input
            value={String(form.get)}
            onChange={(e) =>
              setForm({ ...form, get: parseInt(e.target.value || '0') })
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Out of stock</Label>
          <select
            value={String(form.outofstock)}
            onChange={(e) =>
              setForm({ ...form, outofstock: parseInt(e.target.value) })
            }
            className="w-full border rounded px-2 py-1"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div>
          <Label>Free shipping</Label>
          <select
            value={String(form.freeshipping)}
            onChange={(e) =>
              setForm({ ...form, freeshipping: parseInt(e.target.value) })
            }
            className="w-full border rounded px-2 py-1"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 20 }).map((_, i) => {
          const key = `list${i + 1}`;
          return (
            <div key={key}>
              <Label>{key}</Label>
              <Input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(form)}>Save</Button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { products, deleteProduct, updateProduct, addProduct } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [viewProduct, setViewProduct] = useState<productType | null>(null);
  const [editProduct, setEditProduct] = useState<productType | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredProducts = products.filter((product) => {
    const part = (product.partnumber || '').toString().toLowerCase();
    const brand = (product.brand || '').toString().toLowerCase();
    const desc = (product.description || '').toString().toLowerCase();
    const term = searchTerm.toLowerCase();
    return part.includes(term) || brand.includes(term) || desc.includes(term);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    const av = (a as any)[sortField];
    const bv = (b as any)[sortField];
    const as = (av || '').toString().toLowerCase();
    const bs = (bv || '').toString().toLowerCase();
    if (as < bs) return sortDir === 'asc' ? -1 : 1;
    if (as > bs) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (value: string) => {
    setPageSize(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCreateOpen(true)}>Create Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
              <DialogDescription>Add a new product</DialogDescription>
            </DialogHeader>
            <CreateProductForm
              onSave={async (payload) => {
                await addProduct(payload);
                setCreateOpen(false);
              }}
              onCancel={() => setCreateOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search products..."
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
                      const field = 'partnumber';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>Part Number</span>
                    {sortField === 'partnumber' ? (
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
                      const field = 'brand';
                      if (sortField === field)
                        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      else {
                        setSortField(field);
                        setSortDir('asc');
                      }
                    }}
                  >
                    <span>Brand</span>
                    {sortField === 'brand' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium flex items-center space-x-2">
                    <span>{product.partnumber}</span>
                    {product.featured ? (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                        F
                      </span>
                    ) : null}
                    {product.specials ? (
                      <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                        S
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    {(product.description || '').length > 80
                      ? `${product.description.slice(0, 80)}...`
                      : product.description}
                  </TableCell>
                  <TableCell>${(product.price || 0).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-100 hover:border-blue-500"
                            title="View product details"
                            onClick={() => setViewProduct(product)}
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Product Details</DialogTitle>
                            <DialogDescription>
                              {product.partnumber}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-2 space-y-2">
                            <div>
                              <strong>Name: </strong>
                              <span>{product.description}</span>
                            </div>
                            <div>
                              <strong>Brand: </strong>
                              <span>{product.brand}</span>
                            </div>
                            <div>
                              <strong>Price: </strong>
                              <span>${(product.price || 0).toFixed(2)}</span>
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
                        open={editDialogOpen && editProduct?.id === product.id}
                        onOpenChange={(open) => {
                          setEditDialogOpen(open);
                          if (!open) {
                            setEditProduct(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-green-100 hover:border-green-500"
                            title="Edit product"
                            onClick={() => {
                              setEditProduct(product);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4 text-green-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription>
                              Update product information
                            </DialogDescription>
                          </DialogHeader>
                          {editProduct && (
                            <div className="space-y-3">
                              <div>
                                <Label>Part Number</Label>
                                <Input
                                  value={editProduct.partnumber}
                                  onChange={(e) =>
                                    setEditProduct({
                                      ...editProduct,
                                      partnumber: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Brand</Label>
                                <Input
                                  value={editProduct.brand}
                                  onChange={(e) =>
                                    setEditProduct({
                                      ...editProduct,
                                      brand: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Input
                                  value={editProduct.description}
                                  onChange={(e) =>
                                    setEditProduct({
                                      ...editProduct,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Color</Label>
                                <Input
                                  value={editProduct.color || ''}
                                  onChange={(e) =>
                                    setEditProduct({
                                      ...editProduct,
                                      color: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label>Price</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={String(editProduct.price || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        price: parseFloat(
                                          e.target.value || '0',
                                        ),
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Discount</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={String(editProduct.discount || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        discount: parseFloat(
                                          e.target.value || '0',
                                        ),
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Extra</Label>
                                <Input
                                  value={editProduct.extra || ''}
                                  onChange={(e) =>
                                    setEditProduct({
                                      ...editProduct,
                                      extra: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <Label>Featured</Label>
                                  <select
                                    value={String(editProduct.featured || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        featured: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full border rounded px-2 py-1"
                                  >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                  </select>
                                </div>
                                <div>
                                  <Label>Specials</Label>
                                  <select
                                    value={String(editProduct.specials || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        specials: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full border rounded px-2 py-1"
                                  >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                  </select>
                                </div>
                                <div>
                                  <Label>Active</Label>
                                  <select
                                    value={String(editProduct.active || 1)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        active: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full border rounded px-2 py-1"
                                  >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                  </select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label>Buy</Label>
                                  <Input
                                    type="number"
                                    value={String(editProduct.buy || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        buy: parseInt(e.target.value || '0'),
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Get</Label>
                                  <Input
                                    type="number"
                                    value={String(editProduct.get || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        get: parseInt(e.target.value || '0'),
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label>Out of stock</Label>
                                  <select
                                    value={String(editProduct.outofstock || 0)}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        outofstock: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full border rounded px-2 py-1"
                                  >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                  </select>
                                </div>
                                <div>
                                  <Label>Free shipping</Label>
                                  <select
                                    value={String(
                                      editProduct.freeshipping || 0,
                                    )}
                                    onChange={(e) =>
                                      setEditProduct({
                                        ...editProduct,
                                        freeshipping: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full border rounded px-2 py-1"
                                  >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                  </select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: 20 }).map((_, i) => {
                                  const key =
                                    `list${i + 1}` as keyof productType;
                                  return (
                                    <div key={key}>
                                      <Label>{key}</Label>
                                      <Input
                                        value={
                                          (editProduct[key] as string) || ''
                                        }
                                        onChange={(e) =>
                                          setEditProduct({
                                            ...editProduct,
                                            [key]: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          <DialogFooter className="pt-4 border-t">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              onClick={async () => {
                                if (editProduct) {
                                  await updateProduct(
                                    editProduct.id,
                                    editProduct as any,
                                  );
                                  setEditProduct(null);
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
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete{' '}
                              {product.partnumber}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              onClick={async () => {
                                await deleteProduct(product.id);
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
                {Math.min(startIndex + pageSize, sortedProducts.length)} of{' '}
                {sortedProducts.length}
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
