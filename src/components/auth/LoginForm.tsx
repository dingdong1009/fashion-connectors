
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail } from "lucide-react";

interface LoginFormProps {
  email: string;
  onEditEmail: () => void;
}

const LoginForm = ({ email, onEditEmail }: LoginFormProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please provide both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
      toast({
        title: "Success",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full justify-center mt-28">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      
      <div className="bg-gray-50 p-4 rounded-md mb-8">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 mt-1" />
          <div className="flex-1">
            <p className="text-sm mb-1">Your e-mail</p>
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
      
      <p className="text-sm mb-1">Mandatory fields *</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Remember me
            </Label>
          </div>
          <Button variant="link" className="p-0 h-auto text-sm underline" type="button">
            Forgot your password?
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-6 text-base bg-black hover:bg-gray-800"
          disabled={isLoading}
        >
          {isLoading ? "SIGNING IN..." : "LOG IN"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
