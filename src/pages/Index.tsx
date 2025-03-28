
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBrands from "@/components/FeaturedBrands";
import CategorySection from "@/components/CategorySection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const heroImage = "https://www.prada.com/content/dam/pradanux/e-commerce/2025/02/Re-Nylon/Landing/Mosaic/1/Mosaic_landscape_DT.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero 
          title="Premium Fashion Collections" 
          subtitle="Connect with leading fashion brands for wholesale opportunities"
          ctaText="EXPLORE NOW"
          ctaLink="/collections"
          bgImage={heroImage}
        />
        
        <FeaturedBrands />
        
        <CategorySection />
        
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
