import { ChartLegend } from "@/components/ui/chart";
import { ProductType, DATASETS } from "@/types/DataTypes";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "@/utils/supabase/crud";
import { supabaseClient } from "@/utils/supabase/supabaseClient";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

/**
 * Get all Products from the database.
 * @returns Promise<ProductType[]> - Array of all Products
 */
export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const allProducts: ProductType[] = await getAll(DATASETS.PRODUCT);
    return allProducts;
  } catch (error) {
    console.error("Error fetching Products:", error);
    return [];
  }
}

/**
 * Get a single Product by ID.
 * @param id - The ID of the Product to retrieve
 * @returns Promise<ProductType | null> - The Product object or null if not found
 */
export async function getOneProduct(id: string): Promise<ProductType | null> {
  try {
    const product: ProductType = await getOne(DATASETS.PRODUCT, id);
    return product;
  } catch (error) {
    console.error("Error fetching Product:", error);
    return null;
  }
}

/**
 * Get a single Product by name (exact match).
 * @param name - The exact name of the Product to retrieve
 * @returns Promise<ProductType | null> - The Product object or null if not found
 */
export async function getProductByName(
  name: string,
): Promise<ProductType | null> {
  try {
    const supabase = supabaseClient;
    if (!supabase) {
      throw new Error("Supabase client initialization failed");
    }

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .eq("name", name);

    if (error) {
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0] as ProductType;
  } catch (error) {
    console.error("Error fetching Product by name:", error);
    return null;
  }
}

/**
 * Get a single Product by id (exact match).
 * @param id - The exact id of the Product to retrieve
 * @returns Promise<ProductType | null> - The Product object or null if not found
 */
export async function getProductById(id: number): Promise<ProductType | null> {
  try {
    const supabase = supabaseClient;
    if (!supabase) {
      throw new Error("Supabase client initialization failed");
    }

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .eq("id", id);

    if (error) {
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0] as ProductType;
  } catch (error) {
    console.error("Error fetching Product by id:", error);
    return null;
  }
}

/**
 * Get Products by category (client-side).
 * @param category - The category number to filter by
 * @returns Promise<ProductType[]> - Array of Products in the category
 */
export async function getProductsByCategory(
  category: number,
): Promise<ProductType[]> {
  try {
    const supabase = supabaseClient;
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .eq("category", category)
      .order("_order", { ascending: true });

    if (error) throw error;
    return data as ProductType[];
  } catch (error) {
    console.error("Error fetching Products by category:", error);
    return [];
  }
}

/**
 * Get Products by category (server-side).
 * @param category - The category number to filter by
 * @returns Promise<ProductType[]> - Array of Products in the category
 */
export async function getProductsByCategoryServer(
  category: number,
): Promise<ProductType[]> {
  try {
    const supabase = supabaseServer();
    if (!supabase) throw new Error("Supabase server initialization failed");

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .eq("category", category)
      .order("_order", { ascending: true });

    if (error) throw error;
    return data as ProductType[];
  } catch (error) {
    console.error("Error fetching Products by category (server):", error);
    return [];
  }
}

/**
 * Get Products by category and subcategory.
 * @param category - The category number to filter by
 * @param subcategory - The subcategory number to filter by
 * @returns Promise<ProductType[]> - Array of Products in the category and subcategory
 */
export async function getProductsByCategoryAndSubcategory(
  category: number,
  subcategory: number,
): Promise<ProductType[]> {
  try {
    const supabase = supabaseClient;
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .eq("category", category)
      .eq("subcategory", subcategory)
      .order("_order", { ascending: true });

    if (error) throw error;
    return data as ProductType[];
  } catch (error) {
    console.error(
      "Error fetching Products by category and subcategory:",
      error,
    );
    return [];
  }
}

/**
 * Search Products by name or text.
 * @param searchTerm - The term to search for in name or text fields
 * @returns Promise<ProductType[]> - Array of Products matching the search term
 */
export async function searchProducts(
  searchTerm: string,
): Promise<ProductType[]> {
  try {
    const supabase = supabaseClient;
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .or(`name.ilike.%${searchTerm}%,text.ilike.%${searchTerm}%`)
      .order("name", { ascending: true });

    if (error) throw error;
    return data as ProductType[];
  } catch (error) {
    console.error("Error searching Products:", error);
    return [];
  }
}

/**
 * Get top Products (where top field is not empty).
 * @returns Promise<ProductType[]> - Array of top Products
 */
export async function getTopProducts(): Promise<ProductType[]> {
  try {
    const supabase = supabaseClient;
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("*")
      .not("top", "is", null)
      .neq("top", "")
      .order("_morder", { ascending: true });

    if (error) throw error;
    return data as ProductType[];
  } catch (error) {
    console.error("Error fetching top Products:", error);
    return [];
  }
}

/**
 * Create a new Product.
 * @param product - The Product data to create
 * @returns Promise<ProductType | null> - The created Product or null if failed
 */
export async function createProduct(
  product: Omit<ProductType, "id">,
): Promise<ProductType | null> {
  try {
    const newProduct: ProductType = await createOne(
      DATASETS.PRODUCT,
      product as ProductType,
    );
    return newProduct;
  } catch (error) {
    console.error("Error creating Product:", error);
    return null;
  }
}

/**
 * Update an existing Product by ID.
 * @param id - The ID of the Product to update
 * @param updates - Partial Product data with updated values
 * @returns Promise<ProductType | null> - The updated Product or null if failed
 */
export async function updateProduct(
  id: string,
  updates: Partial<ProductType>,
): Promise<ProductType | null> {
  try {
    const updatedProduct: ProductType = await updateOne(
      DATASETS.PRODUCT,
      id,
      updates,
    );
    return updatedProduct;
  } catch (error) {
    console.error("Error updating Product:", error);
    return null;
  }
}

/**
 * Get all product names from the database.
 * @returns Promise<string[]> - Array of all product names
 */
export async function getAllProductNames(): Promise<string[]> {
  try {
    const supabase = supabaseClient;
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from(DATASETS.PRODUCT)
      .select("name")
      .order("name");

    if (error) {
      throw error;
    }

    return data.map((product: any) => product.name);
  } catch (error) {
    console.error("Error getting product names:", error);
    return [];
  }
}

/**
 * Delete a Product by ID.
 * @param id - The ID of the Product to delete
 * @returns Promise<boolean> - True if successfully deleted, false otherwise
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await deleteOne(DATASETS.PRODUCT, id);
    return true;
  } catch (error) {
    console.error("Error deleting Product:", error);
    return false;
  }
}

/**
 * Update Product order within a category.
 * @param id - The ID of the Product to reorder
 * @param newOrder - The new order value
 * @returns Promise<ProductType | null> - The updated Product or null if failed
 */
export async function updateProductOrder(
  id: string,
  newOrder: number,
): Promise<ProductType | null> {
  try {
    const updatedProduct: ProductType = await updateOne(DATASETS.PRODUCT, id, {
      _order: newOrder,
    } as Partial<ProductType>);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating Product order:", error);
    return null;
  }
}

/**
 * Update Product main order.
 * @param id - The ID of the Product to reorder
 * @param newOrder - The new main order value
 * @returns Promise<ProductType | null> - The updated Product or null if failed
 */
export async function updateProductMainOrder(
  id: string,
  newOrder: number,
): Promise<ProductType | null> {
  try {
    const updatedProduct: ProductType = await updateOne(DATASETS.PRODUCT, id, {
      _morder: newOrder,
    } as Partial<ProductType>);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating Product main order:", error);
    return null;
  }
}
