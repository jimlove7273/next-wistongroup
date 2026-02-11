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
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function RMAsPage() {
  const { rmas, deleteRMA } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const filteredRMAs = rmas.filter((rma) => {
    const id = (rma.rmaid || '').toString().toLowerCase();
    const company = (rma.company || '').toString().toLowerCase();
    const email = (rma.email || '').toString().toLowerCase();
    const term = searchTerm.toLowerCase();
    return id.includes(term) || company.includes(term) || email.includes(term);
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRMAs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRMAs = filteredRMAs.slice(startIndex, startIndex + pageSize);

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
          <h2 className="text-3xl font-bold tracking-tight">RMAs</h2>
          <p className="text-muted-foreground">
            Manage Return Merchandise Authorizations
          </p>
        </div>
        <Link href="/admin/rmas/new">
          <Button>Create RMA</Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search RMAs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RMA ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRMAs.map((rma) => (
                <TableRow key={rma.id}>
                  <TableCell className="font-medium">{rma.rmaid}</TableCell>
                  <TableCell>{rma.company}</TableCell>
                  <TableCell>{rma.email}</TableCell>
                  <TableCell>{rma.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/rmas/${rma.id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-100 hover:border-blue-500"
                          title="View RMA details"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </Link>
                      <Link href={`/admin/rmas/${rma.id}/edit`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-green-100 hover:border-green-500"
                          title="Edit RMA"
                        >
                          <Pencil className="h-4 w-4 text-green-600" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-100 hover:border-red-500"
                        onClick={() => deleteRMA(rma.id)}
                        title="Delete RMA"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
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
                {Math.min(startIndex + pageSize, filteredRMAs.length)} of{' '}
                {filteredRMAs.length}
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
