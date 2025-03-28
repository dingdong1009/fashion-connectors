
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Brands from "./pages/Brands";
import Buyers from "./pages/Buyers";
import Solutions from "./pages/Solutions";
import Events from "./pages/Events";
import Showrooms from "./pages/Showrooms";
import Resources from "./pages/Resources";
import Curated from "./pages/Curated";
import Connect from "./pages/Connect";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/events" element={<Events />} />
            <Route path="/showrooms" element={<Showrooms />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/curated" element={<Curated />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
