
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // In a real implementation, you would use an email service provider here
    // For example:
    // - Resend: https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Mailgun: https://www.mailgun.com
    
    // For now, we'll just simulate sending an email
    console.log(`Sending verification code to ${email}: ${verificationCode || "Code would be generated"}`);
    
    // In a real implementation:
    /*
    const apiKey = Deno.env.get("EMAIL_API_KEY");
    if (!apiKey) {
      throw new Error("EMAIL_API_KEY is not set");
    }
    
    const emailResponse = await fetch("https://api.email-provider.com/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@yourdomain.com",
        to: email,
        subject: "Your verification code",
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>
              <p>This code will expire in 10 minutes.</p>`,
      }),
    });
    
    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Failed to send email: ${errorData.message}`);
    }
    */

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
