
import React from "react";
import { Button } from "@/components/ui/button";

const Section2 = () => {
  return (
    <div className="mx-auto max-w-[1481px] py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative">
          <img
            src="https://www.prada.com/content/dam/pradanux/e-commerce/2025/02/Re-Nylon/Landing/Mosaic/2/Mosaic_landscape_DT.jpg"
            alt="Prada Re-Nylon Collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute left-8 top-8 text-white">
            <h2 className="text-2xl font-light">Be In The Center of the Light</h2>
            <Button 
              variant="outline" 
              className="mt-4 border-white text-black hover:bg-white hover:text-grey"
            >
              ENTDECKEN
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6">
          <h2 className="mb-6 text-3xl font-light">Sustainable Fashion</h2>
          <p className="mb-4 text-gray-600">
            Discover the innovative Prada Re-Nylon collection, crafted from
            regenerated nylon yarn recovered from ocean plastic. Our commitment to
            sustainability drives us to transform waste materials into luxury products.
          </p>
          <p className="mb-6 text-gray-600">
            The SEA BEYOND initiative reflects our dedication to preserving marine
            ecosystems while creating timeless, eco-conscious fashion for the
            modern world.
          </p>
          <Button 
            variant="outline" 
            className="w-fit border-black text-black hover:bg-black hover:text-white"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section2;
