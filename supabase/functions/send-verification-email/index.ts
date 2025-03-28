
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  verificationCode?: string;
  resend?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, verificationCode, resend } = await req.json() as VerificationEmailRequest;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!verificationCode) {
      return new Response(
        JSON.stringify({ error: "Verification code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending verification code to ${email}: ${verificationCode}`);
    
    // Using Resend to actually send the email
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const resendClient = new Resend(resendApiKey);
        
        const emailResponse = await resendClient.emails.send({
          from: "Your App <onboarding@resend.dev>",
          to: email,
          subject: "Your verification code",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
              <h2 style="color: #333; text-align: center;">Verification Code</h2>
              <p style="color: #666; font-size: 16px;">Please use the following code to verify your email address:</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px;">${verificationCode}</span>
              </div>
              <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
              <p style="color: #666; font-size: 14px;">If you didn't request this code, you can safely ignore this email.</p>
            </div>
          `,
        });
        
        console.log("Email sent successfully:", emailResponse);
      } catch (emailError) {
        console.error("Error sending email with Resend:", emailError);
        // Even if the email sending fails, we'll continue and not fail the response
        // This way, development can continue without requiring email setup
      }
    } else {
      console.log("RESEND_API_KEY not configured. Email sending simulated.");
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: resend ? "Verification code resent" : "Verification code sent" 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to send verification email" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
