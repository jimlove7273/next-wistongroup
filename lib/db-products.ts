import { createClient } from '@supabase/supabase-js';
import type { Product as DBProduct } from '@/components/dataTypes';
import type { Product } from '@/lib/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key for full access in server components
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Map database product to app product format
 */
function mapDBProductToAppProduct(dbProduct: DBProduct): Product {
  return {
    id: dbProduct.id.toString(),
    sku: dbProduct.partnumber || '',
    name: dbProduct.description || '',
    description: dbProduct.extra || '',
    price: dbProduct.price || 0,
    image: '/placeholder.svg', // Use placeholder since DB doesn't have image field
    category: dbProduct.list1 || 'Uncategorized',
    subcategory: dbProduct.list2 || 'General',
    brand: dbProduct.brand || 'Unknown',
    featured: dbProduct.featured === 1,
    weeklySpecial: dbProduct.specials === 1,
    specifications: {
      Color: dbProduct.color || 'N/A',
      Brand: dbProduct.brand || 'N/A',
      PartNumber: dbProduct.partnumber || 'N/A',
    },
  };
}

/**
 * Get featured products from database (featured = 1)
 */
export async function getFeaturedProducts(
  limit: number = 3,
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', 1)
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    console.log('Featured products fetched:', data?.length);
    return (data as DBProduct[]).map(mapDBProductToAppProduct);
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    return [];
  }
}

/**
 * Get special products from database (specials = 1)
 */
export async function getSpecialProducts(
  limit: number = 6,
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('specials', 1)
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching special products:', error);
      return [];
    }

    console.log('Special products fetched:', data?.length);
    return (data as DBProduct[]).map(mapDBProductToAppProduct);
  } catch (error) {
    console.error('Error in getSpecialProducts:', error);
    return [];
  }
}

/**
 * Get all active products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all products:', error);
      return [];
    }

    return (data as DBProduct[]).map(mapDBProductToAppProduct);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return [];
  }
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return mapDBProductToAppProduct(data as DBProduct);
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
}

/**
 * Get any available products as fallback
 */
export async function getFallbackProducts(
  limit: number = 6,
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching fallback products:', error);
      return [];
    }

    if (!data) {
      console.error('No data returned from fallback query');
      return [];
    }

    console.log('Fallback products fetched:', data.length, 'records');
    const mapped = data.map(mapDBProductToAppProduct);
    console.log('Fallback products mapped:', mapped.length);
    return mapped;
  } catch (error) {
    console.error('Error in getFallbackProducts:', error);
    return [];
  }
}
