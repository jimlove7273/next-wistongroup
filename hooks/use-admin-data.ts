'use client';

import { useState, useEffect } from 'react';
import { CustomerType } from '@/types/customer';
import { productType } from '@/types/products';
import { RMAType } from '@/types/rma';
import { RMAItemsType } from '@/types/rmaitems';
import { SaleType } from '@/types/sales';

// No initial mock data — start with empty arrays and fetch real data on mount

export function useAdminData() {
  // Customers
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  // Products
  const [products, setProducts] = useState<productType[]>([]);

  // RMAs
  const [rmas, setRmas] = useState<RMAType[]>([]);

  // RMA Items
  const [rmaItems, setRmaItems] = useState<RMAItemsType[]>([]);

  // Sales
  const [sales, setSales] = useState<SaleType[]>([]);

  // Fetch real data from API on mount
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const [prodRes, custRes, salesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/customers'),
          fetch('/api/sales'),
        ]);

        if (!mounted) return;

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(
            (prodData || []).map((p: any) => ({
              ...p,
              id: typeof p.id === 'string' ? parseInt(p.id) : p.id,
            })),
          );
        }

        if (custRes.ok) {
          const custData = await custRes.json();
          setCustomers(
            (custData || []).map((c: any) => ({
              ...c,
              id: typeof c.id === 'string' ? parseInt(c.id) : c.id,
            })),
          );
        }

        if (salesRes.ok) {
          const salesData = await salesRes.json();
          setSales(
            (salesData || []).map((s: any) => ({
              ...s,
              id: typeof s.id === 'string' ? parseInt(s.id) : s.id,
            })),
          );
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // Customer CRUD operations (wired to API)
  const addCustomer = async (customer: Omit<CustomerType, 'id'>) => {
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create customer');
      }
      const created = await res.json();
      setCustomers((prev) => [
        ...prev,
        {
          ...created,
          id:
            typeof created.id === 'string' ? parseInt(created.id) : created.id,
        },
      ]);
    } catch (err) {
      console.error('addCustomer error:', err);
      alert(
        `Error adding customer: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    }
  };

  const updateCustomer = async (
    id: number,
    customer: Partial<CustomerType>,
  ) => {
    try {
      const res = await fetch(`/api/customers?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!res.ok) throw new Error('Failed to update customer');
      const updated = await res.json();
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updated } : c)),
      );
    } catch (err) {
      console.error('updateCustomer error:', err);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      const res = await fetch(`/api/customers?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete customer');
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('deleteCustomer error:', err);
    }
  };

  // Product CRUD operations (API-backed)
  const addProduct = async (product: Omit<productType, 'id'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to create product');
      const created = await res.json();
      setProducts((prev) => [
        ...prev,
        {
          ...created,
          id:
            typeof created.id === 'string' ? parseInt(created.id) : created.id,
        },
      ]);
    } catch (err) {
      console.error('addProduct error:', err);
    }
  };

  const updateProduct = async (id: number, product: Partial<productType>) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to update product');
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p)),
      );
    } catch (err) {
      console.error('updateProduct error:', err);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('deleteProduct error:', err);
    }
  };

  // RMA CRUD operations
  const addRMA = (rma: Omit<RMAType, 'id'>) => {
    const newRMA = {
      ...rma,
      id: Math.max(...rmas.map((r) => r.id), 0) + 1,
    };
    setRmas([...rmas, newRMA]);
  };

  const updateRMA = (id: number, rma: Partial<RMAType>) => {
    setRmas(rmas.map((r) => (r.id === id ? { ...r, ...rma } : r)));
  };

  const deleteRMA = (id: number) => {
    setRmas(rmas.filter((r) => r.id !== id));
  };

  // Sales CRUD operations (API-backed)
  const addSale = async (sale: Omit<SaleType, 'id'>) => {
    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      if (!res.ok) throw new Error('Failed to create sale');
      const created = await res.json();
      setSales((prev) => [
        ...prev,
        {
          ...created,
          id:
            typeof created.id === 'string' ? parseInt(created.id) : created.id,
        },
      ]);
    } catch (err) {
      console.error('addSale error:', err);
    }
  };

  const updateSale = async (id: number, sale: Partial<SaleType>) => {
    try {
      const res = await fetch(`/api/sales?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      if (!res.ok) throw new Error('Failed to update sale');
      const updated = await res.json();
      setSales((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updated } : s)),
      );
    } catch (err) {
      console.error('updateSale error:', err);
    }
  };

  const deleteSale = async (id: number) => {
    try {
      const res = await fetch(`/api/sales?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete sale');
      setSales((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('deleteSale error:', err);
    }
  };

  return {
    // Data
    customers,
    products,
    rmas,
    rmaItems,
    sales,

    // Customer operations
    addCustomer,
    updateCustomer,
    deleteCustomer,

    // Product operations
    addProduct,
    updateProduct,
    deleteProduct,

    // RMA operations
    addRMA,
    updateRMA,
    deleteRMA,

    // Sales operations
    addSale,
    updateSale,
    deleteSale,
  };
}
