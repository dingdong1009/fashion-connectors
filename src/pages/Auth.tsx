
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
      
      // Set the step based on whether the email exists
      if (emailExists) {
        // User exists, go to login
        setStep("login");
      } else {
        // User doesn't exist, go to signup
        setStep("signup");
      }
      
      console.log("Email exists:", emailExists, "Setting step to:", emailExists ? "login" : "signup");
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

  const handleEditEmail = () => {
    setStep("email");
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
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
