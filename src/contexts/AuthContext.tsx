
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type UserRole = "admin" | "sales_manager" | "brand" | "buyer";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  company?: string | null;
  telephone?: string | null;
  description?: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string, 
    password: string, 
    role?: UserRole, 
    fullName?: string,
    company?: string,
    telephone?: string,
    description?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  checkEmailExists: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Fetch user profile when session changes
          fetchUserProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.id);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setProfile(null);
      } else {
        console.log("Profile fetched successfully:", data);
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      setProfile(null);
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      console.log("Checking if email exists:", email);
      
      // Try a simple auth check first
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      // If there's an error with specific messaging about user not found
      if (error) {
        if (error.message.includes("not found") || 
            error.message.toLowerCase().includes("user not found") ||
            error.message.toLowerCase().includes("user doesn't exist")) {
          console.log("Email doesn't exist based on error message");
          return false;
        }
        
        // For other errors, we can try a different approach
        if (error.status === 422 && error.message.includes("otp_disabled")) {
          console.log("OTP is disabled, trying password check");
          
          // Try a fake password sign-in to see if user exists
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password: "checking_if_user_exists_only"
          });
          
          if (signInError) {
            // If error says "Invalid login credentials", it means user exists but password is wrong
            // If error says "User not found" or similar, user doesn't exist
            const userExists = signInError.message.includes("Invalid login credentials");
            console.log("Email exists check result:", userExists);
            return userExists;
          }
        }
      }
      
      // By default, return false if we couldn't conclusively determine
      return false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Signing in user:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      console.log("Sign in successful:", data.user?.id);
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    role: UserRole = "buyer", 
    fullName: string = "",
    company: string = "",
    telephone: string = "",
    description: string = ""
  ) => {
    try {
      setLoading(true);
      console.log("Signing up user with role:", role);
      
      // First, check if we can create the user in auth system
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      console.log("Signup successful, user created:", data.user?.id);
      
      // The database trigger should auto-create the profile,
      // but let's manually update additional profile fields
      if (data.user) {
        try {
          console.log("Updating additional profile fields");
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              company,
              telephone,
              description
            })
            .eq('id', data.user.id);
          
          if (profileError) {
            console.error("Error updating profile fields:", profileError);
            // Continue as the basic profile was created
          } else {
            console.log("Profile updated successfully");
          }
        } catch (profileError) {
          console.error("Exception updating profile:", profileError);
          // Continue as the basic profile was created
        }
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Signing out user");
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      profile,
      signIn, 
      signUp, 
      signOut,
      loading,
      checkEmailExists
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
