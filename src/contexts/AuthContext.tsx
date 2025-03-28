
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          fetchUserProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

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
      
      // Use signInWithOtp to check if email exists without signing in
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false // Only works with existing users
        }
      });
      
      // If there's no error or the error message contains "User already registered",
      // it means the user exists
      if (!error || error.message.includes("User already registered")) {
        console.log("Email exists check result: true");
        return true;
      }
      
      console.log("Email exists check result: false");
      return false;
    } catch (error) {
      console.error("Unexpected error checking email:", error);
      console.log("Defaulting to 'email does not exist' after error");
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

  const ensureDbSetup = async () => {
    try {
      console.log("Ensuring database is set up...");
      // Call the edge function to ensure the database is set up
      const { data, error } = await supabase.functions.invoke('ensure-profiles-table');
      
      if (error) {
        console.error("Error calling ensure-profiles-table:", error);
        console.error("Error details:", error.message, error.details);
        return false;
      }
      
      console.log("Database setup response:", data);
      return true;
    } catch (error) {
      console.error("Exception in ensureDbSetup:", error);
      return false;
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
      console.log("Full signup data:", { email, role, fullName, company, telephone, description });
      
      // First ensure the database is set up
      const dbSetupComplete = await ensureDbSetup();
      if (!dbSetupComplete) {
        throw new Error("Database setup issue. Please try again later.");
      }
      
      // Proceed with signup
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
        console.error("Error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        throw error;
      }
      
      console.log("Signup auth response:", data);
      console.log("Signup successful, user created:", data.user?.id);
      
      if (data.user) {
        try {
          console.log("Updating additional profile fields");
          const { error: profileError, data: profileData } = await supabase
            .from('profiles')
            .update({
              company,
              telephone,
              description
            })
            .eq('id', data.user.id);
          
          console.log("Profile update response:", profileData);
          
          if (profileError) {
            console.error("Error updating profile fields:", profileError);
            console.error("Profile error details:", {
              message: profileError.message,
              code: profileError.code,
              details: profileError.details,
              hint: profileError.hint
            });
          } else {
            console.log("Profile updated successfully");
          }
        } catch (profileError) {
          console.error("Exception updating profile:", profileError);
        }
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      console.error("Full error object:", error);
      
      if (error.status) {
        console.error("Error status:", error.status);
      }
      
      if (error.code) {
        console.error("Error code:", error.code);
      }
      
      toast({
        title: "Error creating account",
        description: error.message || "An error occurred during sign up. Please try again later.",
        variant: "destructive"
      });
      
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
