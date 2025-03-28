
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

    console.log("Checking for profiles table...");

    // Execute a query to check if the profiles table exists
    const { data, error } = await supabase.from("profiles").select("id").limit(1);

    if (error) {
      console.error("Error checking profiles table:", error);
      
      if (error.message.includes("relation \"profiles\" does not exist")) {
        // Create the necessary SQL to set up the profiles table and trigger
        console.log("Profiles table doesn't exist, creating it...");
        
        // Create user_role enum if it doesn't exist
        const { error: enumError } = await supabase.rpc("create_user_role_enum");
        if (enumError) {
          console.error("Error creating user_role enum:", enumError);
        }
        
        // Create profiles table
        const { error: tableError } = await supabase.rpc("create_profiles_table");
        if (tableError) {
          console.error("Error creating profiles table:", tableError);
          return new Response(
            JSON.stringify({ error: "Failed to create profiles table" }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        
        console.log("Profiles table created successfully");
        return new Response(
          JSON.stringify({ message: "Profiles table created successfully" }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Profiles table exists:", data);
    return new Response(
      JSON.stringify({ message: "Profiles table exists", data }),
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
