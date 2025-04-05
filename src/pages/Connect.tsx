
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextSection from "@/components/TextSection";

const Connect = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full mt-48">
          <div className="mx-auto max-w-[1481px]">
            <div className="relative h-[600px] w-full">
              <img
                src="https://www.prada.com/content/dam/pradanux/e-commerce/2025/02/Re-Nylon/Landing/Mosaic/1/Mosaic_landscape_DT.jpg"
                alt="Connect"
                className="h-full w-full max-w-[1481px] object-cover"
              />
              <div className="absolute left-12 top-12 text-white">
                <h2 className="text-2xl font-light">Connect With Us</h2>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mx-auto max-w-[1481px] py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center p-6">
              <h2 className="mb-6 text-3xl font-light">Get in Touch</h2>
              <p className="mb-4 text-gray-600">
                We'd love to hear from you. Whether you're a brand looking to showcase your 
                collection or a buyer seeking the perfect addition to your inventory, our team 
                is here to help connect you with the right partners.
              </p>
              <p className="mb-6 text-gray-600">
                Fill out the form and one of our representatives will contact you shortly.
              </p>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Full Name</label>
                  <input type="text" className="w-full border p-2" placeholder="Your name" />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Email</label>
                  <input type="email" className="w-full border p-2" placeholder="Your email" />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Message</label>
                  <textarea className="w-full border p-2 h-32" placeholder="Your message"></textarea>
                </div>
                <Button 
                  variant="outline" 
                  className="w-fit border-black text-black hover:bg-black hover:text-white"
                >
                  SUBMIT
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
