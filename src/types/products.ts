export type productListType = {
  id: number | string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
  badge: string;
}[];

export type productType = {
  id: number | string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
  badge?: string;
};
