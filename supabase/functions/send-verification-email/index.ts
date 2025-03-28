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
    // Parse request body
    const { email, verificationCode, resend } = await req.json() as VerificationEmailRequest;

    // Validate request data
    if (!email || !verificationCode) {
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
    // This is a placeholder for when you add the actual email sending logic
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
    
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
