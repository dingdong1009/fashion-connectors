
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ShoppingBag, Heart, Calendar, User } from "lucide-react";

interface EmailEntryProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

const EmailEntry = ({ onSubmit, isLoading }: EmailEntryProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="relative w-full justify-center mt-48">
      <h1 className="text-2xl font-semibold mb-4">Enter your email</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="E-mail address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="py-6 text-base"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-6 text-base bg-black hover:bg-gray-800"
          disabled={isLoading}
        >
          {isLoading ? "CHECKING..." : "NEXT"}
        </Button>
      </form>
      
      <div className="mt-12 pt-12 border-t border-gray-200">
        <p className="text-lg font-medium mb-6">Enjoy a unique shopping experience with your personal account</p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <ShoppingBag className="w-5 h-5" />
            <p>Check the details and monitor the status of your orders and returns</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Heart className="w-5 h-5" />
            <p>Create a wishlist to save your favorite items</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5" />
            <p>View your private appointments and requests</p>
          </div>
          
          <div className="flex items-center gap-4">
            <User className="w-5 h-5" />
            <p>Receive tailored assistance from our Client Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailEntry;
