
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section2 from "@/components/Section2";
import TextSection from "@/components/TextSection";

const Events = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full mt-48">
          <div className="mx-auto max-w-[1481px]">
            <div className="relative h-[600px] w-full">
              <img
                src="https://www.prada.com/content/dam/pradanux/e-commerce/2025/02/Re-Nylon/Landing/Mosaic/1/Mosaic_landscape_DT.jpg"
                alt="Events"
                className="h-full w-full max-w-[1481px] object-cover"
              />
              <div className="absolute left-12 top-12 text-white">
                <h2 className="text-2xl font-light">Latest Events</h2>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <Section2 />
        </section>
        
        <section>
          <TextSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
