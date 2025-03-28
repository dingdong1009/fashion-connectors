
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="relative h-[600px] w-full">
              <img
                src="/lovable-uploads/7a1f2a4e-7130-4dc5-ac94-bb8fb1329102.png"
                alt="Prada Re-Nylon for SEA BEYOND"
                className="h-full w-full object-cover"
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
          </CarouselItem>
          <CarouselItem>
            <div className="relative h-[600px] w-full">
              <img
                src="/lovable-uploads/7a1f2a4e-7130-4dc5-ac94-bb8fb1329102.png"
                alt="Prada Collection"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-12 top-12 text-white">
                <h2 className="text-2xl font-light">Prada Summer Collection</h2>
                <Button 
                  variant="outline" 
                  className="mt-4 border-white text-white hover:bg-white hover:text-black"
                >
                  EXPLORE
                </Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
