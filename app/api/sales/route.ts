import { createClient } from '@supabase/supabase-js';
import type { Sale } from '@/components/dataTypes';

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

    if (id) {
      // Get single sale
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return Response.json(data);
    }

    // Get all sales
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    console.error('GET sales error:', error);
    return Response.json({ error: 'Failed to fetch sales' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<Sale> = await request.json();

    const { data, error } = await supabase
      .from('sales')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error('POST sales error:', error);
    return Response.json({ error: 'Failed to create sale' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Sale ID is required' }, { status: 400 });
    }

    const body: Partial<Sale> = await request.json();

    const { data, error } = await supabase
      .from('sales')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    console.error('PUT sales error:', error);
    return Response.json({ error: 'Failed to update sale' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Sale ID is required' }, { status: 400 });
    }

    const { error } = await supabase.from('sales').delete().eq('id', id);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE sales error:', error);
    return Response.json({ error: 'Failed to delete sale' }, { status: 500 });
  }
}
