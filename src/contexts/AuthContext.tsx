
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
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
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setProfile(null);
      } else {
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
      
      // First, try to get user by email (admin-only in Supabase)
      // For non-admin clients, we'll use a sign-in attempt to check
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Don't create user if they don't exist
        }
      });
      
      console.log("Email check response:", data, error);
      
      // If there's an error with a specific message about user not found
      // or if the error is about OTP being disabled, we need to check the error type
      
      if (error) {
        if (error.message.includes("not found") || 
            error.message.toLowerCase().includes("user not found") ||
            error.message.toLowerCase().includes("user doesn't exist")) {
          console.log("Email doesn't exist based on error message:", email);
          return false;
        }
        
        // For OTP disabled errors, we need to check for a more specific status code
        if (error.status === 422 && error.message.includes("otp_disabled")) {
          // This means OTP is disabled, but we still need to know if the user exists
          
          // If OTP is disabled but the user exists, we typically get a successful response
          // or a different error message. Otherwise, we'd get a specific "user not found" error.
          // Let's try to sign in with a fake password to see if the user exists
          
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password: "this_is_definitely_not_the_password" // Fake password to force an error
          });
          
          if (signInError) {
            // If error says "Invalid login credentials", it means user exists but password is wrong
            // If error says "User not found" or similar, user doesn't exist
            const userExists = signInError.message.includes("Invalid login credentials");
            console.log("Email exists (password check):", userExists, email);
            return userExists;
          }
        }
      }
      
      // If we got here without returning, assume the email exists
      console.log("Email likely exists (default case):", email);
      return false; // Default to false since our checks didn't conclusively find the user
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
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
      
      // Only include essential user data in auth metadata
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
        throw error;
      }
      
      console.log("Signup successful:", data);
      
      // After successful signup, update the profile table with additional data
      if (data.user) {
        console.log("Updating profile for user:", data.user.id);
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
          // Don't throw here as the signup itself was successful
        }
      }
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
