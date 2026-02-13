import { createClient } from '@supabase/supabase-js';
import type { Customer } from '@/components/dataTypes';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Get single customer
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return Response.json(data);
    }

    // Get all customers
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    console.error('GET customers error:', error);
    return Response.json(
      { error: 'Failed to fetch customers' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body: Partial<Customer> = await request.json();

    // Strip id/created_at; let DB handle them
    const { id, created_at, ...dataToInsert } = body;

    const { data, error } = await supabase
      .from('customers')
      .insert([dataToInsert]) // no id here
      .select()
      .single();

    if (error) throw error;

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error('POST customers error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create customer';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'Customer ID is required' },
        { status: 400 },
      );
    }

    const body: Partial<Customer> = await request.json();

    const { data, error } = await supabase
      .from('customers')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    console.error('PUT customers error:', error);
    return Response.json(
      { error: 'Failed to update customer' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'Customer ID is required' },
        { status: 400 },
      );
    }

    const { error } = await supabase.from('customers').delete().eq('id', id);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE customers error:', error);
    return Response.json(
      { error: 'Failed to delete customer' },
      { status: 500 },
    );
  }
}
