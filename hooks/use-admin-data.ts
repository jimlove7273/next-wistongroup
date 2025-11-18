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
  {
    id: 3,
    recno: 4003,
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    password: 'hashed_password_3',
  },
  {
    id: 4,
    recno: 4004,
    name: 'Emily Williams',
    email: 'emily.williams@email.com',
    password: 'hashed_password_4',
  },
  {
    id: 5,
    recno: 4005,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    password: 'hashed_password_5',
  },
  {
    id: 6,
    recno: 4006,
    name: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    password: 'hashed_password_6',
  },
  {
    id: 7,
    recno: 4007,
    name: 'David Miller',
    email: 'david.miller@email.com',
    password: 'hashed_password_7',
  },
  {
    id: 8,
    recno: 4008,
    name: 'Lisa Wilson',
    email: 'lisa.wilson@email.com',
    password: 'hashed_password_8',
  },
  {
    id: 9,
    recno: 4009,
    name: 'James Moore',
    email: 'james.moore@email.com',
    password: 'hashed_password_9',
  },
  {
    id: 10,
    recno: 4010,
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@email.com',
    password: 'hashed_password_10',
  },
  {
    id: 11,
    recno: 4011,
    name: 'William Anderson',
    email: 'william.anderson@email.com',
    password: 'hashed_password_11',
  },
  {
    id: 12,
    recno: 4012,
    name: 'Patricia Thomas',
    email: 'patricia.thomas@email.com',
    password: 'hashed_password_12',
  },
  {
    id: 13,
    recno: 4013,
    name: 'Christopher Jackson',
    email: 'christopher.jackson@email.com',
    password: 'hashed_password_13',
  },
  {
    id: 14,
    recno: 4014,
    name: 'Mary White',
    email: 'mary.white@email.com',
    password: 'hashed_password_14',
  },
  {
    id: 15,
    recno: 4015,
    name: 'Daniel Harris',
    email: 'daniel.harris@email.com',
    password: 'hashed_password_15',
  },
  {
    id: 16,
    recno: 4016,
    name: 'Linda Martin',
    email: 'linda.martin@email.com',
    password: 'hashed_password_16',
  },
  {
    id: 17,
    recno: 4017,
    name: 'Matthew Thompson',
    email: 'matthew.thompson@email.com',
    password: 'hashed_password_17',
  },
  {
    id: 18,
    recno: 4018,
    name: 'Barbara Garcia',
    email: 'barbara.garcia@email.com',
    password: 'hashed_password_18',
  },
  {
    id: 19,
    recno: 4019,
    name: 'Anthony Martinez',
    email: 'anthony.martinez@email.com',
    password: 'hashed_password_19',
  },
  {
    id: 20,
    recno: 4020,
    name: 'Elizabeth Robinson',
    email: 'elizabeth.robinson@email.com',
    password: 'hashed_password_20',
  },
  {
    id: 21,
    recno: 4021,
    name: 'Donald Clark',
    email: 'donald.clark@email.com',
    password: 'hashed_password_21',
  },
  {
    id: 22,
    recno: 4022,
    name: 'Susan Rodriguez',
    email: 'susan.rodriguez@email.com',
    password: 'hashed_password_22',
  },
  {
    id: 23,
    recno: 4023,
    name: 'Joseph Lewis',
    email: 'joseph.lewis@email.com',
    password: 'hashed_password_23',
  },
  {
    id: 24,
    recno: 4024,
    name: 'Margaret Lee',
    email: 'margaret.lee@email.com',
    password: 'hashed_password_24',
  },
  {
    id: 25,
    recno: 4025,
    name: 'Thomas Walker',
    email: 'thomas.walker@email.com',
    password: 'hashed_password_25',
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
