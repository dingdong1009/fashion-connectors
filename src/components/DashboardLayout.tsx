
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "sales_manager" | "brand" | "buyer";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, profile, signOut, loading } = useAuth();

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If role check is required and user doesn't have required role
  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-6">You don't have permission to access this page.</p>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-28">
        <div className="mx-auto max-w-[1481px] px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome, {profile?.full_name || profile?.email}! 
                Role: {profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1).replace('_', ' ')}
              </p>
            </div>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
          
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
