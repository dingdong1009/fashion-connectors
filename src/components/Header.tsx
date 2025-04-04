
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"EN" | "RU">("EN");

  // Track scroll position to apply different styles for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "EN" ? "RU" : "EN");
  };

  return <header className={`w-full fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="mx-auto flex max-w-[1481px] flex-col border-b">
        {/* Top row with logo and user icon */}
        <div className="flex items-center justify-between py-8">
          <div className="h-10">
            <Link to="/">
              <img src="/lovable-uploads/062d0258-dcd0-4f16-a095-956d0ec0e2d4.png" alt="MoiLoi Logo" className="h-full" />
            </Link>
          </div>
          
        </div>

        {/* Bottom row with navigation */}
        <div className="mx-auto w-full max-w-[1481px] border-t">
          <nav className="mx-auto flex max-w-[1481px] justify-between py-4">
            <ul className="flex space-x-8 text-xs">
              <li>
                <Link to="/brands" className="relative group hover:text-gray-700 transition-colors duration-200">
                  BRANDS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="relative group hover:text-gray-700 transition-colors duration-200">
                  BUYERS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="relative group hover:text-gray-700 transition-colors duration-200">
                  SOLUTIONS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="relative group hover:text-gray-700 transition-colors duration-200">
                  EVENTS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/showrooms" className="relative group hover:text-gray-700 transition-colors duration-200">
                  SHOWROOMS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="relative group hover:text-gray-700 transition-colors duration-200">
                  RESOURCES
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/curated" className="relative group hover:text-gray-700 transition-colors duration-200">
                  CURATED
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
            </ul>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={toggleLanguage}
                className="relative group text-xs tracking-wider px-2 transition-all duration-300 ease-in-out hover:text-gray-700"
              >
                <span className={`transition-opacity duration-300 ease-in-out ${language === "EN" ? "opacity-100" : "opacity-0 absolute"}`}>
                  EN
                </span>
                <span className={`transition-opacity duration-300 ease-in-out ${language === "RU" ? "opacity-100" : "opacity-0 absolute"}`}>
                  RU
                </span>
                <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              
              <Link to="/connect" className="relative group text-xs tracking-wider transition-all duration-300 ease-in-out hover:text-gray-700">
                CONNECT
                <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;
