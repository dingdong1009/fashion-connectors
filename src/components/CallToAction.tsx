
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-light mb-4">Connect With Top Fashion Brands</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our platform to discover exclusive collections and connect directly with premium fashion brands worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            For Buyers
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
            For Brands
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
