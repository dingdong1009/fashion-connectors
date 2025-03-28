
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Women's Apparel",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
  },
  {
    id: 2,
    name: "Men's Collections",
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80",
  },
  {
    id: 4,
    name: "Sustainable Fashion",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light mb-2">Shop By Category</h2>
        <p className="text-gray-600 mb-10">Explore products across various fashion categories</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative h-80 overflow-hidden rounded-md">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                <h3 className="text-xl text-white font-medium mb-4">{category.name}</h3>
                <Button 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  View Products
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
