'use client';

import { useState, useEffect } from 'react';
import { CustomerType } from '@/types/customer';
import { productType } from '@/types/products';
import { RMAType } from '@/types/rma';
import { RMAItemsType } from '@/types/rmaitems';
import { SaleType } from '@/types/sales';

// Simulated data
const initialCustomers: CustomerType[] = [
  {
    id: 1,
    companyName: 'Tech Solutions Inc.',
    contact: 'John Smith',
    address1: '123 Tech Street',
    address2: 'Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zipcode: '94105',
    email: 'john@techsolutions.com',
    phone: '555-123-4567',
    fax: '555-123-4568',
  },
  {
    id: 2,
    companyName: 'Digital Innovations LLC',
    contact: 'Jane Doe',
    address1: '456 Innovation Blvd',
    address2: '',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    email: 'jane@digitalinnovations.com',
    phone: '555-987-6543',
    fax: '555-987-6544',
  },
];

const initialProducts: productType[] = [
  {
    id: 1,
    recno: 1001,
    istid: 1,
    partnumber: 'CPU-I7-12700K',
    brand: 'Intel',
    description: 'Intel Core i7-12700K Desktop Processor',
    color: 'Silver',
    price: 399.99,
    discount: 0,
    extra: '',
    featured: 1,
    specials: 0,
    buy: 0,
    get: 0,
    active: 1,
    list1: '',
    list2: '',
    list3: '',
    list4: '',
    list5: '',
    list6: '',
    list7: '',
    list8: '',
    list9: '',
    list10: '',
    list11: '',
    list12: '',
    list13: '',
    list14: '',
    list15: '',
    list16: '',
    list17: '',
    list18: '',
    list19: '',
    list20: '',
    outofstock: 0,
    freeshipping: 1,
  },
  {
    id: 2,
    recno: 1002,
    istid: 2,
    partnumber: 'GPU-RTX3080',
    brand: 'NVIDIA',
    description: 'NVIDIA GeForce RTX 3080 Graphics Card',
    color: 'Black',
    price: 699.99,
    discount: 50,
    extra: 'Limited Time Offer',
    featured: 1,
    specials: 1,
    buy: 0,
    get: 0,
    active: 1,
    list1: '',
    list2: '',
    list3: '',
    list4: '',
    list5: '',
    list6: '',
    list7: '',
    list8: '',
    list9: '',
    list10: '',
    list11: '',
    list12: '',
    list13: '',
    list14: '',
    list15: '',
    list16: '',
    list17: '',
    list18: '',
    list19: '',
    list20: '',
    outofstock: 0,
    freeshipping: 0,
  },
];

const initialRMAs: RMAType[] = [
  {
    id: 1,
    recno: 2001,
    customerID: 'CUST-001',
    company: 'Tech Solutions Inc.',
    address1: '123 Tech Street',
    address2: 'Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zipcode: '94105',
    email: 'john@techsolutions.com',
    phone: '555-123-4567',
    phone_f: '555-123-4568',
    date: '2023-06-15',
    rmaid: 'RMA-001',
    forhwat: 'Defective product',
  },
];

const initialRMAItems: RMAItemsType[] = [
  {
    id: 1,
    recno: 3001,
    invoice: 'INV-1001',
    date: '2023-06-15',
    qty: 1,
    itemno: 'CPU-I7-12700K',
    serialnumber: 'SN-123456789',
    description: 'Intel Core i7-12700K Desktop Processor',
  },
];

const initialSales: SaleType[] = [
  {
    id: 1,
    recno: 4001,
    name: 'John Smith',
    email: 'john@techsolutions.com',
    password: 'hashed_password_1',
  },
  {
    id: 2,
    recno: 4002,
    name: 'Jane Doe',
    email: 'jane@digitalinnovations.com',
    password: 'hashed_password_2',
  },
];

export function useAdminData() {
  // Customers
  const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers);

  // Products
  const [products, setProducts] = useState<productType[]>(initialProducts);

  // RMAs
  const [rmas, setRmas] = useState<RMAType[]>(initialRMAs);

  // RMA Items
  const [rmaItems, setRmaItems] = useState<RMAItemsType[]>(initialRMAItems);

  // Sales
  const [sales, setSales] = useState<SaleType[]>(initialSales);

  // Customer CRUD operations
  const addCustomer = (customer: Omit<CustomerType, 'id'>) => {
    const newCustomer = {
      ...customer,
      id: Math.max(...customers.map((c) => c.id), 0) + 1,
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id: number, customer: Partial<CustomerType>) => {
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, ...customer } : c)),
    );
  };

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  // Product CRUD operations
  const addProduct = (product: Omit<productType, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, product: Partial<productType>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...product } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
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

  // Sales CRUD operations
  const addSale = (sale: Omit<SaleType, 'id'>) => {
    const newSale = {
      ...sale,
      id: Math.max(...sales.map((s) => s.id), 0) + 1,
    };
    setSales([...sales, newSale]);
  };

  const updateSale = (id: number, sale: Partial<SaleType>) => {
    setSales(sales.map((s) => (s.id === id ? { ...s, ...sale } : s)));
  };

  const deleteSale = (id: number) => {
    setSales(sales.filter((s) => s.id !== id));
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
