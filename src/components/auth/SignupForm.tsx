
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, RefreshCw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SignupFormProps {
  email: string;
  onEditEmail: () => void;
}

const SignupForm = ({ email, onEditEmail }: SignupFormProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState<"brand" | "buyer">("buyer");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await signUp(
        email, 
        password, 
        role,
        fullName,
        company,
        phoneNumber
      );
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
            className="pr-10 py-6 text-base"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Resend code"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <p className="text-xs mt-1">The code will expire in 10 minutes</p>
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
          <Select defaultValue="+1">
            <SelectTrigger className="rounded-r-none w-32 py-6">
              <SelectValue placeholder="+1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+1">+1</SelectItem>
              <SelectItem value="+44">+44</SelectItem>
              <SelectItem value="+86">+86</SelectItem>
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
        
        <div className="space-y-3">
          <p className="font-medium">Register as</p>
          <RadioGroup 
            value={role} 
            onValueChange={(value) => setRole(value as "brand" | "buyer")}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="brand" id="brand" />
              <Label htmlFor="brand" className="font-normal cursor-pointer">Brand</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buyer" id="buyer" />
              <Label htmlFor="buyer" className="font-normal cursor-pointer">Buyer</Label>
            </div>
          </RadioGroup>
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
      </form>
    </div>
  );
};

export default SignupForm;
