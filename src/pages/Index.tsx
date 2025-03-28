
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import Section2 from "@/components/Section2";
import TextSection from "@/components/TextSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full">
          <HeroCarousel />
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

export default Index;
