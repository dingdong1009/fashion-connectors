
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
  const [currentVerificationCode, setCurrentVerificationCode] = useState<string>("");
  const [emailCheckError, setEmailCheckError] = useState<string | null>(null);
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
      setEmailCheckError(null);
      
      console.log("Checking email existence:", submittedEmail);
      
      // Check if email exists in Supabase
      const emailExists = await checkEmailExists(submittedEmail);
      console.log("Final email exists determination:", emailExists);
      
      if (emailExists) {
        // User exists, go to login
        console.log("User exists, moving to login step");
        setStep("login");
      } else {
        // User doesn't exist, send verification code and go to signup
        console.log("User doesn't exist, sending verification code");
        const verificationCode = await sendVerificationEmail(submittedEmail);
        setCurrentVerificationCode(verificationCode);
        setStep("signup");
      }
    } catch (error: any) {
      console.error("Error checking email:", error);
      setEmailCheckError(error.message || "An error occurred while checking your email");
      toast({
        title: "Error",
        description: error.message || "An error occurred while checking your email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (email: string): Promise<string> => {
    try {
      console.log("Preparing to send verification code to:", email);
      
      // Generate a random 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Generated verification code:", verificationCode);
      
      // Store the code temporarily in localStorage with an expiration time (10 minutes)
      const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds
      localStorage.setItem(`verification_${email}`, JSON.stringify({
        code: verificationCode,
        expires: expirationTime
      }));
      
      console.log("Stored verification code in localStorage");
      
      // Call the edge function to send the email with the code
      console.log("Calling edge function to send verification email");
      const response = await supabase.functions.invoke('send-verification-email', {
        body: {
          email,
          verificationCode
        },
      });
      
      console.log("Edge function response:", response);
      
      if (response.error) {
        console.error("Edge function error:", response.error);
        throw new Error(response.error.message || 'Failed to send verification email');
      }
      
      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${email}. Please check your inbox and spam folder.`,
      });

      return verificationCode;
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      console.error("Full error object:", error);
      
      toast({
        title: "Error sending verification code",
        description: error.message || "Failed to send verification email",
        variant: "destructive",
      });
      // Continue to signup form even if email sending fails
      return "";
    }
  };

  const handleEditEmail = () => {
    setStep("email");
    setEmailCheckError(null);
  };

  const verifyCode = (enteredCode: string): boolean => {
    console.log("Verifying code:", enteredCode);
    
    const storedData = localStorage.getItem(`verification_${email}`);
    if (!storedData) {
      console.log("No stored verification data found");
      return false;
    }
    
    const { code, expires } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    
    console.log("Stored code:", code);
    console.log("Entered code:", enteredCode);
    console.log("Current time:", currentTime);
    console.log("Expiration time:", expires);
    
    // Check if code is valid and not expired
    if (code === enteredCode && currentTime < expires) {
      console.log("Code verification successful");
      return true;
    }
    
    console.log("Code verification failed");
    return false;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          {emailCheckError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
              <p className="font-medium">Error checking email</p>
              <p className="text-sm">{emailCheckError}</p>
            </div>
          )}
          
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
              testCode={currentVerificationCode}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
