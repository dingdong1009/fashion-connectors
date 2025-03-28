
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

const ussrCountryCodes = [
  { code: "+7", name: "Russia" },
  { code: "+375", name: "Belarus" },
  { code: "+374", name: "Armenia" },
  { code: "+994", name: "Azerbaijan" },
  { code: "+995", name: "Georgia" },
  { code: "+7 7", name: "Kazakhstan" },
  { code: "+996", name: "Kyrgyzstan" },
  { code: "+371", name: "Latvia" },
  { code: "+370", name: "Lithuania" },
  { code: "+373", name: "Moldova" },
  { code: "+992", name: "Tajikistan" },
  { code: "+993", name: "Turkmenistan" },
  { code: "+998", name: "Uzbekistan" },
  { code: "+372", name: "Estonia" }
];

interface SignupFormProps {
  email: string;
  onEditEmail: () => void;
  verifyCode: (code: string) => boolean;
  testCode?: string;
}

const SignupForm = ({ email, onEditEmail, verifyCode, testCode }: SignupFormProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState<"brand" | "buyer">("buyer");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [countryCode, setCountryCode] = useState("+7");
  const { signUp } = useAuth();
  const { toast } = useToast();
  const verificationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (verificationInputRef.current) {
      verificationInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeVerified) {
      toast({
        title: "Verification required",
        description: "Please verify your email with the code sent to your inbox.",
        variant: "destructive",
      });
      return;
    }
    
    if (!email || !password || !firstName || !lastName) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const fullName = `${firstName} ${lastName}`;
      const fullPhoneNumber = phoneNumber ? `${countryCode}${phoneNumber}` : "";
      
      // Log the data being passed to signUp
      console.log("Signup data:", {
        email,
        password,
        role,
        fullName,
        company,
        fullPhoneNumber,
        description
      });
      
      await signUp(
        email, 
        password, 
        role,
        fullName,
        company,
        fullPhoneNumber,
        description
      );
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error creating account",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.trim() === "") {
      setVerificationError("Please enter the verification code");
      return;
    }
    
    const isValid = verifyCode(verificationCode);
    if (isValid) {
      setCodeVerified(true);
      setVerificationError("");
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      });
    } else {
      setVerificationError("Invalid or expired code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      const expirationTime = new Date().getTime() + 10 * 60 * 1000;
      localStorage.setItem(`verification_${email}`, JSON.stringify({
        code: newVerificationCode,
        expires: expirationTime
      }));
      
      const response = await supabase.functions.invoke('send-verification-email', {
        body: {
          email,
          verificationCode: newVerificationCode,
          resend: true
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to resend verification code');
      }
      
      toast({
        title: "Code resent",
        description: `We've sent a new verification code to ${email}. Please check your inbox and spam folder.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setVerificationCode(code);
    
    if (code.length === 6 && !codeVerified) {
      const isValid = verifyCode(code);
      if (isValid) {
        setCodeVerified(true);
        setVerificationError("");
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
      } else {
        setVerificationError("Invalid or expired code. Please try again.");
      }
    }
  };

  return (
    <div className="relative w-full justify-center mt-28">
      <h1 className="text-2xl font-semibold mb-2">Create your personal account</h1>
      <p className="text-base mb-6">
        You are about to create your account. This will allow us to offer you a personalised and tailored experience both online and in-store.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-8">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 mt-1" />
          <div className="flex-1">
            <p className="text-sm mb-1">We've sent a verification code to</p>
            <p className="font-medium">{email}</p>
            {testCode && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800 font-medium">Test mode: Your verification code is</p>
                <p className="text-lg font-bold text-yellow-700">{testCode}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  This is shown for testing only. In production, you would receive this code via email.
                </p>
              </div>
            )}
          </div>
          <button 
            onClick={onEditEmail}
            className="text-black underline text-sm font-medium"
          >
            Edit
          </button>
        </div>
      </div>
      
      <p className="text-sm mb-4">Mandatory fields *</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            id="verification"
            placeholder="Verification code *"
            value={verificationCode}
            onChange={handleCodeChange}
            className={`pr-10 py-6 text-base ${verificationError ? "border-red-500" : ""}`}
            disabled={codeVerified}
            ref={verificationInputRef}
            maxLength={6}
          />
          <button
            type="button"
            onClick={handleResendCode}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Resend code"
            disabled={codeVerified || isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          {verificationError && (
            <p className="text-red-500 text-xs mt-1">{verificationError}</p>
          )}
          <p className="text-xs mt-1">The code will expire in 10 minutes</p>
        </div>
        
        {!codeVerified && !verificationError && verificationCode.length < 6 && (
          <Button 
            type="button" 
            onClick={handleVerifyCode}
            className="w-full py-6 text-base bg-black hover:bg-gray-800"
            disabled={isLoading}
          >
            VERIFY CODE
          </Button>
        )}
        
        {codeVerified && (
          <>
            <div className="space-y-3">
              <p className="font-medium">Register as</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={role === "brand" ? "default" : "outline"}
                  onClick={() => setRole("brand")}
                  className={`py-6 ${role === "brand" ? "bg-black hover:bg-gray-800" : ""}`}
                >
                  Brand
                </Button>
                <Button
                  type="button"
                  variant={role === "buyer" ? "default" : "outline"}
                  onClick={() => setRole("buyer")}
                  className={`py-6 ${role === "buyer" ? "bg-black hover:bg-gray-800" : ""}`}
                >
                  Buyer
                </Button>
              </div>
            </div>
            
            <Select>
              <SelectTrigger className="py-6 text-base">
                <SelectValue placeholder="Select title *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mr">Mr.</SelectItem>
                <SelectItem value="mrs">Mrs.</SelectItem>
                <SelectItem value="ms">Ms.</SelectItem>
                <SelectItem value="dr">Dr.</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="firstName"
                placeholder="First name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="py-6 text-base"
              />
              
              <Input
                id="lastName"
                placeholder="Last name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="py-6 text-base"
              />
            </div>
            
            <div className="flex">
              <Select defaultValue="+7" onValueChange={setCountryCode}>
                <SelectTrigger className="rounded-r-none w-32 py-6">
                  <SelectValue placeholder="+7" />
                </SelectTrigger>
                <SelectContent>
                  {ussrCountryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                id="phone"
                placeholder="Phone number (optional)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="rounded-l-none py-6 text-base"
              />
            </div>
            
            <Input
              id="company"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="py-6 text-base"
            />
            
            <Textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="py-2 text-base min-h-[100px]"
            />
            
            <div className="space-y-2 relative">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 py-6 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs">The password must be composed of 8 to 16 characters</p>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="marketing" 
                checked={marketingConsent} 
                onCheckedChange={(checked) => setMarketingConsent(checked === true)}
                className="mt-1"
              />
              <div>
                <Label htmlFor="marketing" className="text-sm font-normal cursor-pointer">
                  I agree to receive (by email, phone and other forms of electronic
                  communication) commercial communications, including marketing
                  and promotional messages, newsletter, advertising and catalogues
                  concerning our brand and products.
                </Label>
              </div>
            </div>
            
            <p className="text-sm">
              By clicking on "Register", you confirm that you have read and
              understood our Privacy Policy, you are over 16 years of age and that you
              want to register.
            </p>
            
            <Button 
              type="submit" 
              className="w-full py-6 text-base bg-black hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "CREATING ACCOUNT..." : "REGISTER"}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
