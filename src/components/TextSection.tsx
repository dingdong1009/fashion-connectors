
import React from "react";
import { Separator } from "@/components/ui/separator";

const TextSection = () => {
  return (
    <div className="mx-auto max-w-[1481px] px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-3xl font-light">Our Vision</h2>
        <Separator className="mx-auto mb-8 w-24" />
        <p className="mb-6 text-lg text-gray-700">
          At MoiLoi, we believe in the transformative power of fashion that respects both people and planet. 
          Our curated collections bring together established brands and emerging designers who share our 
          commitment to quality, craftsmanship, and sustainability.
        </p>
        <p className="mb-6 text-lg text-gray-700">
          By fostering connections between buyers and innovative brands, we create a marketplace that 
          celebrates creativity while promoting responsible practices throughout the fashion industry.
        </p>
        <p className="text-lg text-gray-700">
          Join us in shaping a future where style and sustainability go hand in hand, driving positive 
          change across the global fashion landscape.
        </p>
      </div>
    </div>
  );
};

export default TextSection;
