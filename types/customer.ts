export type CustomerType = {
  id: number;
  created_at?: string;
  customerID?: string | null;
  company?: string | null;
  dba?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  phone?: string | null;
  sales?: number | null;
  email?: string | null;
  passwd?: string | null;
  taxable?: string | null;
};
