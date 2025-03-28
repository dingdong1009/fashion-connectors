
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to apply different styles for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="mx-auto flex max-w-[1481px] flex-col border-b">
        {/* Top row with logo and user icon */}
        <div className="flex items-center justify-between py-8 px-6">
          <h1 className="text-2xl font-light">MoiLoi</h1>
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

        {/* Bottom row with navigation */}
        <div className="mx-auto w-full max-w-[1481px] border-t">
          <nav className="mx-auto flex max-w-[1481px] justify-start py-4 px-6">
            <ul className="flex space-x-8 text-xs">
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  BRANDS
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  BUYERS
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  COLLECTIONS
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  SUSTAINABILITY
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  TRADE SHOWS
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  MARKETPLACE
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative group hover:text-gray-700 transition-colors duration-200">
                  INSIGHTS
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
