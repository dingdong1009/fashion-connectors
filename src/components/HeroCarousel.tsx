
import React from "react";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
  return (
    <div className="relative w-full flex justify-center mt-48">
      <div className="w-full max-w-[1481px]">
        <div className="relative h-[600px] w-full">
          <img
            src="https://www.prada.com/content/dam/pradanux/e-commerce/2025/02/Re-Nylon/Landing/Mosaic/1/Mosaic_landscape_DT.jpg"
            alt="Prada Collection"
            className="h-full w-full max-w-[1481px] object-cover"
          />
          <div className="absolute left-12 top-12 text-white">
            <h2 className="text-2xl font-light">Prada Re-Nylon for SEA BEYOND</h2>
            <Button 
              variant="outline" 
              className="mt-4 border-white text-white hover:bg-white hover:text-black"
            >
              ENTDECKEN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
