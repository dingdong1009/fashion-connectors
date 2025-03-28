
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const BuyerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-light">Buyer Dashboard</h2>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discover">Discover Brands</TabsTrigger>
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="orders">Orders & Samples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connected Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">
                  +5 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Viewed Catalogs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">152</div>
                <p className="text-xs text-muted-foreground">
                  +26 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Samples Requested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +8 from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Brands</CardTitle>
                <CardDescription>Based on your preferences and history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Luxury Apparel Co.</p>
                      <p className="text-sm text-muted-foreground">Premium fashion apparel</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Urban Aesthetics</p>
                      <p className="text-sm text-muted-foreground">Streetwear and casual</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Eco Couture</p>
                      <p className="text-sm text-muted-foreground">Sustainable fashion</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Fashion shows and exhibitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Summer Fashion Week</p>
                      <p className="text-sm text-muted-foreground">May 15-20, New York</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      RSVP
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Sustainable Fashion Expo</p>
                      <p className="text-sm text-muted-foreground">June 5-8, Los Angeles</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      RSVP
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">Digital Showroom Festival</p>
                      <p className="text-sm text-muted-foreground">Online, June 12-15</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="discover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discover Brands</CardTitle>
              <CardDescription>Find and connect with new brands</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Brand discovery interface placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Brand Connections</CardTitle>
              <CardDescription>Manage your brand relationships</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Brand connections interface placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders & Samples</CardTitle>
              <CardDescription>Track your orders and sample requests</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Orders management interface placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerDashboard;
