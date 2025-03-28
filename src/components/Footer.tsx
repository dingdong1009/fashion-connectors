
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Instagram, Twitter, Youtube, TikTok } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Newsletter section */}
        <div className="mb-14">
          <h3 className="text-lg font-medium uppercase mb-4">Unseren Newsletter erhalten</h3>
          <div className="flex items-center max-w-md">
            <Input 
              type="email" 
              placeholder="Email *"
              className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white"
            />
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs mt-4 text-gray-400 max-w-md">
            Indem Sie auf "Anmelden" klicken, bestätigen Sie, dass Sie unsere Datenschutzerklärung gelesen und verstanden haben und dass Sie den Newsletter und andere Marketingmitteilungen, die darin beschrieben sind, erhalten möchten.
          </p>
          <div className="flex space-x-6 mt-6">
            <Link to="#" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Youtube">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Spotify">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </Link>
            <Link to="#" aria-label="Discord">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
            </Link>
            <Link to="#" aria-label="TikTok">
              <TikTok className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <Separator className="bg-gray-800 mb-10" />
        
        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-lg font-medium uppercase mb-4">Brauchen Sie Hilfe?</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white">Rufen Sie uns an 00 800 800 77232</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Schreiben Sie uns per WhatsApp</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Kontakte</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium uppercase mb-4">Exklusive Services</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white">Prada Services</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Ihre Bestellung verfolgen</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Rückgaben</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium uppercase mb-4">Unternehmen</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white">Fondazione Prada</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Prada Group</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Luna Rossa</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Nachhaltigkeit</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Arbeiten Sie mit uns</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium uppercase mb-4">Rechtliche Bedingungen</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white">Impressum</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Datenschutzerklärung</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Cookie-Richtlinie</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Cookie-Einstellungen</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Verkaufsbedingungen</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          <p>© {currentYear} Fashion Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
