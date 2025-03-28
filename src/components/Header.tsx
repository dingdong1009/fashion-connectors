
import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Header = () => {
  const menuItems = [
    { label: "BRANDS", path: "/brands" },
    { label: "BUYERS", path: "/buyers" },
    { label: "COLLECTIONS", path: "/collections" },
    { label: "SUSTAINABILITY", path: "/sustainability" },
    { label: "TRADE SHOWS", path: "/trade-shows" },
    { label: "MARKETPLACE", path: "/marketplace" },
    { label: "INSIGHTS", path: "/insights" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-6 md:px-12 shadow-sm transition-all duration-300">
      <div className="container mx-auto max-w-[1481px] flex flex-col">
        {/* Top row with logo and user icon */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="transition-transform duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/1f168016-2a54-4e0e-86e3-5dff74b44f34.png" 
              alt="MoiLoi" 
              className="h-10"
            />
          </Link>
          
          <div className="flex items-center">
            <Link to="/account" className="p-1 transition-transform duration-300 hover:scale-110">
              <User size={20} />
            </Link>
          </div>
        </div>
        
        {/* Bottom row with navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8 justify-center">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path} 
                  className="text-xs uppercase tracking-wide relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
