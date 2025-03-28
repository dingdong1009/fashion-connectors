
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-lg font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">Our Story</Link></li>
              <li><Link to="/team" className="text-gray-600 hover:text-gray-900">Our Team</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-gray-900">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">For Brands</h3>
            <ul className="space-y-2">
              <li><Link to="/brands/join" className="text-gray-600 hover:text-gray-900">Join as a Brand</Link></li>
              <li><Link to="/brands/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
              <li><Link to="/brands/success-stories" className="text-gray-600 hover:text-gray-900">Success Stories</Link></li>
              <li><Link to="/brands/resources" className="text-gray-600 hover:text-gray-900">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">For Buyers</h3>
            <ul className="space-y-2">
              <li><Link to="/buyers/register" className="text-gray-600 hover:text-gray-900">Register</Link></li>
              <li><Link to="/buyers/how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link></li>
              <li><Link to="/buyers/testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link></li>
              <li><Link to="/buyers/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest fashion industry updates.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © {currentYear} Fashion Connect. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link to="/cookies" className="text-gray-600 hover:text-gray-900">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
