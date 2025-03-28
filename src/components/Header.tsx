
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
    <header className="border-b border-gray-200 py-4 px-6 md:px-12">
      <div className="container mx-auto max-w-[1481px] flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-16">
            <img 
              src="/lovable-uploads/1f168016-2a54-4e0e-86e3-5dff74b44f34.png" 
              alt="MoiLoi" 
              className="h-10"
            />
          </Link>
          
          <nav className="hidden lg:block">
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.path} 
                    className="text-xs uppercase tracking-wide hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center">
          <Link to="/account" className="p-1">
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
