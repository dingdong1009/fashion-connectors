
import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-[1481px] flex-col border-b">
        {/* Top row with logo and user icon */}
        <div className="flex items-center justify-between py-8 px-6">
          <h1 className="text-2xl font-light">MoiLoi</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
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
          <nav className="mx-auto flex max-w-[1481px] justify-center py-4">
            <ul className="flex space-x-8 text-sm">
              <li>
                <a href="#" className="hover:text-gray-500">
                  BRANDS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-500">
                  BUYERS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-500">
                  COLLECTIONS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-500">
                  SUSTAINABILITY
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-500">
                  TRADE SHOWS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-500">
                  MARKETPLACE
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-500">
                  INSIGHTS
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
