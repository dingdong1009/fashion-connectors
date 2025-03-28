
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailEntry from "@/components/auth/EmailEntry";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "login" | "signup">("email");
  const { user, checkEmailExists } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleEmailSubmit = async (submittedEmail: string) => {
    try {
      setIsLoading(true);
      setEmail(submittedEmail);
      
      // Check if email exists in Supabase
      const emailExists = await checkEmailExists(submittedEmail);
      console.log("Email exists check result:", emailExists);
      
      if (emailExists) {
        // User exists, go to login
        setStep("login");
      } else {
        // User doesn't exist, send verification code and go to signup
        await sendVerificationEmail(submittedEmail);
        setStep("signup");
      }
    } catch (error: any) {
      console.error("Error checking email:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while checking your email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      // Generate a random 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the code temporarily in localStorage with an expiration time (10 minutes)
      const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds
      localStorage.setItem(`verification_${email}`, JSON.stringify({
        code: verificationCode,
        expires: expirationTime
      }));
      
      // Call the edge function to send the email with the code
      const response = await supabase.functions.invoke('send-verification-email', {
        body: {
          email,
          verificationCode
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to send verification email');
      }
      
      toast({
        title: "Verification code sent",
        description: "We've sent a verification code to your email.",
      });
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      toast({
        title: "Error sending verification code",
        description: error.message || "Failed to send verification email",
        variant: "destructive",
      });
      // Continue to signup form even if email sending fails
      setStep("signup");
    }
  };

  const handleEditEmail = () => {
    setStep("email");
  };

  const verifyCode = (enteredCode: string): boolean => {
    const storedData = localStorage.getItem(`verification_${email}`);
    if (!storedData) return false;
    
    const { code, expires } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    
    // Check if code is valid and not expired
    if (code === enteredCode && currentTime < expires) {
      return true;
    }
    
    return false;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          {step === "email" && (
            <EmailEntry onSubmit={handleEmailSubmit} isLoading={isLoading} />
          )}
          
          {step === "login" && (
            <LoginForm 
              email={email} 
              onEditEmail={handleEditEmail}
            />
          )}
          
          {step === "signup" && (
            <SignupForm 
              email={email} 
              onEditEmail={handleEditEmail}
              verifyCode={verifyCode}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
