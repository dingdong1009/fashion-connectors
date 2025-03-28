
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Checking for user_role enum...");
    
    // First check if user_role enum exists
    const { error: enumCheckError } = await supabase.rpc("create_user_role_enum");
    if (enumCheckError) {
      console.error("Error checking/creating user_role enum:", enumCheckError);
      return new Response(
        JSON.stringify({ error: "Failed to create user_role enum: " + enumCheckError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    console.log("User_role enum checked/created successfully");

    console.log("Checking for profiles table...");
    
    // Then check/create the profiles table
    const { error: tableError } = await supabase.rpc("create_profiles_table");
    if (tableError) {
      console.error("Error creating profiles table:", tableError);
      return new Response(
        JSON.stringify({ error: "Failed to create profiles table: " + tableError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Profiles table checked/created successfully");
    return new Response(
      JSON.stringify({ message: "Database setup completed successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
