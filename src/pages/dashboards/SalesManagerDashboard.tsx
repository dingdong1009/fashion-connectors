
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SalesManagerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-light">Sales Manager Dashboard</h2>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="brands">Brand Management</TabsTrigger>
          <TabsTrigger value="buyers">Buyer Relations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Managed Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">152</div>
                <p className="text-xs text-muted-foreground">
                  +12 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">348</div>
                <p className="text-xs text-muted-foreground">
                  +28 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64</div>
                <p className="text-xs text-muted-foreground">
                  +18 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Brand Acquisitions</CardTitle>
                <CardDescription>New brands added this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Luxury Apparel Co.</p>
                      <p className="text-sm text-muted-foreground">Premium fashion brand</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Urban Aesthetics</p>
                      <p className="text-sm text-muted-foreground">Streetwear and casual</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Eco Couture</p>
                      <p className="text-sm text-muted-foreground">Sustainable fashion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Buyer Engagement</CardTitle>
                <CardDescription>Recent buyer activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Metro Retailers</p>
                      <p className="text-sm text-muted-foreground">Viewed 12 brand catalogs</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Fashion Forward Inc.</p>
                      <p className="text-sm text-muted-foreground">Scheduled 3 meetings</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Trend Setters Co.</p>
                      <p className="text-sm text-muted-foreground">Connected with 5 new brands</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Leads</CardTitle>
              <CardDescription>Manage potential brand and buyer connections</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Leads management interface placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="brands" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Management</CardTitle>
              <CardDescription>Manage brand relationships and catalogs</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Brand management interface placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="buyers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Buyer Relations</CardTitle>
              <CardDescription>Manage buyer accounts and preferences</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Buyer relations interface placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesManagerDashboard;
