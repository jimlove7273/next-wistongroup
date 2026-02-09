import { createClient } from '@supabase/supabase-js';
import type { Product } from '@/components/dataTypes';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const featured = searchParams.get('featured');
    const specials = searchParams.get('specials');
    const limit = searchParams.get('limit');

    let query = supabase.from('products').select('*');

    if (id) {
      query = query.eq('id', id);
    }
    if (featured !== null && featured !== undefined) {
      query = query.eq('featured', parseInt(featured));
    }
    if (specials !== null && specials !== undefined) {
      query = query.eq('specials', parseInt(specials));
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    query = query.order('created_at', { ascending: false });

    if (id) {
      const { data, error } = await query.single();
      if (error) throw error;
      return Response.json(data);
    }

    const { data, error } = await query;
    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    console.error('GET products error:', error);
    return Response.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<Product> = await request.json();

    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error('POST products error:', error);
    return Response.json(
      { error: 'Failed to create product' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'Product ID is required' },
        { status: 400 },
      );
    }

    const body: Partial<Product> = await request.json();

    const { data, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    console.error('PUT products error:', error);
    return Response.json(
      { error: 'Failed to update product' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'Product ID is required' },
        { status: 400 },
      );
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE products error:', error);
    return Response.json(
      { error: 'Failed to delete product' },
      { status: 500 },
    );
  }
}
