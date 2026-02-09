import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get count of all products
    const { data: allProducts, error: allError } = await supabase
      .from('products')
      .select('id', { count: 'exact' });

    // Get featured products
    const { data: featured, error: featuredError } = await supabase
      .from('products')
      .select('id, description, brand, price, featured, specials')
      .eq('featured', 1);

    // Get special products
    const { data: specials, error: specialsError } = await supabase
      .from('products')
      .select('id, description, brand, price, featured, specials')
      .eq('specials', 1);

    // Get sample of first 5 products
    const { data: sample, error: sampleError } = await supabase
      .from('products')
      .select('id, description, brand, price, featured, specials')
      .limit(5);

    return Response.json({
      totalProducts: allProducts?.length || 0,
      featuredCount: featured?.length || 0,
      specialsCount: specials?.length || 0,
      featured: featured || [],
      specials: specials || [],
      sample: sample || [],
      errors: {
        all: allError?.message,
        featured: featuredError?.message,
        specials: specialsError?.message,
        sample: sampleError?.message,
      },
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
