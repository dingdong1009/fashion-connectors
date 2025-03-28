
-- Function to create user_role enum if it doesn't exist
CREATE OR REPLACE FUNCTION create_user_role_enum()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('admin', 'sales_manager', 'brand', 'buyer');
  END IF;
END;
$$;

-- Function to create profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_profiles_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    -- Create profiles table
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      email TEXT NOT NULL,
      full_name TEXT,
      role user_role NOT NULL DEFAULT 'buyer',
      company TEXT,
      telephone TEXT,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create trigger function to handle new users
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $func$
    BEGIN
      INSERT INTO public.profiles (id, email, full_name, role)
      VALUES (
        new.id, 
        new.email, 
        COALESCE(new.raw_user_meta_data->>'full_name', ''), 
        COALESCE((new.raw_user_meta_data->>'role')::user_role, 'buyer')
      );
      RETURN new;
    END;
    $func$;

    -- Create trigger for user creation
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- Add RLS policies for profiles table
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    -- Create policies for users to manage their own profiles
    CREATE POLICY "Users can view own profile" 
    ON public.profiles 
    FOR SELECT 
    USING (auth.uid() = id);

    CREATE POLICY "Users can update own profile" 
    ON public.profiles 
    FOR UPDATE 
    USING (auth.uid() = id);
  END IF;
END;
$$;
