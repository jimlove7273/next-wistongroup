// Database table type definitions for Wiston Group

type Customer = {
  id: number;
  created_at: string;
  customerID: string | null;
  company: string | null;
  dba: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  phone: string | null;
  sales: number | null;
  email: string | null;
  passwd: string | null;
  taxable: string | null;
};

type Product = {
  id: number;
  created_at: string;
  listid: number | null;
  partnumber: string | null;
  brand: string | null;
  description: string | null;
  color: string | null;
  price: number | null;
  discount: number | null;
  extra: string | null;
  featured: number | null;
  specials: number | null;
  buy: number | null;
  get: number | null;
  active: number | null;
  list1: string | null;
  list2: string | null;
  list3: string | null;
  list4: string | null;
  list5: string | null;
  list6: string | null;
  list7: string | null;
  list8: string | null;
  list9: string | null;
  list10: string | null;
  list11: string | null;
  list12: string | null;
  list13: string | null;
  list14: string | null;
  list15: string | null;
  list16: string | null;
  list17: string | null;
  list18: string | null;
  list19: string | null;
  list20: string | null;
  outofstock: number | null;
  freeshipping: number | null;
};

type Sale = {
  id: number;
  created_at: string;
  salesID: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
};

export type { Customer, Product, Sale };
