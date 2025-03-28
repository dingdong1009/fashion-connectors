
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing environment variables for Supabase access');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log("Creating profiles table...");
    
    // Check if the public.profiles table exists
    const { data: tableExists, error: checkError } = await supabase
      .from('information_schema.tables')
      .select('*')
      .eq('table_schema', 'public')
      .eq('table_name', 'profiles')
      .maybeSingle();
    
    console.log("Check for profiles table result:", tableExists, checkError);
    
    if (!tableExists) {
      // Create the profiles table
      const { error: createError } = await supabase.rpc('exec', {
        query: `
          CREATE TABLE public.profiles (
            id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
            email TEXT NOT NULL,
            full_name TEXT,
            role user_role NOT NULL DEFAULT 'buyer',
            company TEXT,
            telephone TEXT,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
          );

          ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

          CREATE POLICY "Public profiles are viewable by everyone."
            ON public.profiles FOR SELECT
            USING (true);

          CREATE POLICY "Users can insert their own profile."
            ON public.profiles FOR INSERT
            WITH CHECK (auth.uid() = id);

          CREATE POLICY "Users can update own profile."
            ON public.profiles FOR UPDATE
            USING (auth.uid() = id);

          -- Function to handle new user signup
          CREATE OR REPLACE FUNCTION public.handle_new_user()
          RETURNS TRIGGER AS $$
          BEGIN
            INSERT INTO public.profiles (id, email, full_name, role)
            VALUES (
              new.id,
              new.email,
              COALESCE(new.raw_user_meta_data->>'full_name', ''),
              (COALESCE(new.raw_user_meta_data->>'role', 'buyer'))::user_role
            );
            RETURN new;
          END;
          $$ LANGUAGE plpgsql SECURITY DEFINER;

          -- Trigger to call handle_new_user on user creation
          DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
          CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
        `
      });
      
      if (createError) {
        console.error("Error creating profiles table:", createError);
        throw new Error(`Failed to create profiles table: ${createError.message}`);
      }
      
      console.log("Profiles table created successfully");
    } else {
      console.log("Profiles table already exists");
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Profiles table setup verified"
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in create-profiles-table function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unknown error occurred"
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
