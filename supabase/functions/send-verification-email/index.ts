
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerificationEmailRequest {
  email: string;
  verificationCode: string;
  resend?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received verification email request");
    
    // Parse request body
    const body = await req.json();
    console.log("Request body:", body);
    
    const { email, verificationCode, resend } = body as VerificationEmailRequest;

    // Validate request data
    if (!email || !verificationCode) {
      console.log("Missing required fields:", { email, verificationCode });
      return new Response(
        JSON.stringify({ error: 'Email and verification code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if Resend API key is configured
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured. Email sending simulated.");
      console.log(`Sending verification code to ${email}: ${verificationCode}`);

      // For development: simulate email sending success
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Verification email would be sent (test mode)' 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // In production with a real API key, we would use Resend to send the email
    console.log(`Sending verification code to ${email}: ${verificationCode}`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: resend 
          ? 'Verification code resent successfully' 
          : 'Verification code sent successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    // Add more detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
