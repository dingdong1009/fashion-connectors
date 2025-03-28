
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

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

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="mx-auto flex max-w-[1481px] flex-col border-b">
        {/* Top row with logo */}
        <div className="flex items-center justify-between py-8">
          <div className="h-10">
            <img 
              src="/lovable-uploads/062d0258-dcd0-4f16-a095-956d0ec0e2d4.png" 
              alt="MoiLoi Logo" 
              className="h-full" 
            />
          </div>
        </div>

        {/* Bottom row with navigation */}
        <div className="mx-auto w-full max-w-[1481px] border-t">
          <nav className="mx-auto flex max-w-[1481px] justify-between py-4">
            <ul className="flex space-x-8 text-xs">
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  BRANDS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  BUYERS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  COLLECTIONS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  SUSTAINABILITY
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  TRADE SHOWS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  MARKETPLACE
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  INSIGHTS
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
            </ul>
            
            <div className="flex items-center space-x-4">
              {/* Language selector */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs font-medium hover:bg-transparent" 
                onClick={toggleLanguage}
              >
                {language === "EN" ? "EN" : "RU"}
              </Button>
              
              {/* User account button */}
              <Button variant="ghost" size="icon" className="rounded-full hover:scale-105 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                </svg>
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
