import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .eq('passwd', password)
      .single();

    if (error || !data) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // Map customer data to User interface
    const userData = {
      id: data.id.toString(),
      email: data.email,
      name: data.company || data.email.split('@')[0],
      companyName: data.company,
      contact: data.phone,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      phone: data.phone,
      fax: data.fax,
      passwd: data.passwd,
      isAdmin: false, // Customers are not admins
    };

    return Response.json(userData);
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
