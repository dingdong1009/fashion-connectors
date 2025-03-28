
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import SalesManagerDashboard from "@/pages/dashboards/SalesManagerDashboard";
import BrandDashboard from "@/pages/dashboards/BrandDashboard";
import BuyerDashboard from "@/pages/dashboards/BuyerDashboard";

const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      {profile?.role === "admin" && <AdminDashboard />}
      {profile?.role === "sales_manager" && <SalesManagerDashboard />}
      {profile?.role === "brand" && <BrandDashboard />}
      {profile?.role === "buyer" && <BuyerDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
