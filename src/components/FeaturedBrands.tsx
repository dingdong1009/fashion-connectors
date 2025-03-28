
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredBrands = [
  {
    id: 1,
    name: "Elegance Paris",
    category: "High Fashion",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    description: "Luxury French fashion house specializing in women's wear and accessories.",
  },
  {
    id: 2,
    name: "Nordic Minimalist",
    category: "Contemporary",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
    description: "Scandinavian designs focusing on sustainable, timeless pieces.",
  },
  {
    id: 3,
    name: "Milano Couture",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    description: "Italian craftsmanship with a modern twist for the discerning buyer.",
  },
];

const FeaturedBrands = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light mb-2">Featured Brands</h2>
        <p className="text-gray-600 mb-10">Discover exclusive collections from top fashion houses</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBrands.map((brand) => (
            <Card key={brand.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="h-64 w-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${brand.image})` }}
              />
              <CardHeader>
                <CardTitle>{brand.name}</CardTitle>
                <CardDescription>{brand.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{brand.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Collection</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="mx-auto">
            Explore All Brands
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
