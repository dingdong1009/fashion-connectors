
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  bgImage: string;
}

const Hero = ({ title, subtitle, ctaText, ctaLink, bgImage }: HeroProps) => {
  return (
    <div className="relative mx-auto w-full max-w-[1481px] h-[600px] bg-cover bg-center" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/20">
        <div className="container mx-auto h-full px-4 max-w-[1481px]">
          <div className="flex h-full flex-col justify-center text-white">
            <h2 className="mb-3 text-4xl font-light">{title}</h2>
            {subtitle && <p className="mb-6 text-xl">{subtitle}</p>}
            <div>
              <Button 
                asChild
                variant="outline" 
                className="uppercase tracking-wider text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                <a href={ctaLink}>{ctaText}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
