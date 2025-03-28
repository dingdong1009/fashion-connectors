import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Custom TikTok icon component
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Custom Discord icon component
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor"
    {...props}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
  </svg>
);

// Custom Spotify icon component
const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor"
    {...props}
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Newsletter section */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">UNSEREN NEWSLETTER ERHALTEN</h3>
            <div className="flex items-center border-b border-black mb-4">
              <Input 
                type="email" 
                placeholder="Email *"
                className="bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-8"
              />
              <ArrowRight className="h-5 w-5" />
            </div>
            <p className="text-xs mb-4">
              Indem Sie auf "Anmelden" klicken, bestätigen Sie, dass Sie unsere {" "}
              <Link to="#" className="underline">Datenschutzerklärung</Link> gelesen und verstanden haben und dass Sie den Newsletter und andere Marketingmitteilungen, die darin beschrieben sind, erhalten möchten.
            </p>
            <div className="flex space-x-4 mt-4">
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
                <SpotifyIcon className="h-5 w-5" />
              </Link>
              <Link to="#" aria-label="Discord">
                <DiscordIcon className="h-5 w-5" />
              </Link>
              <Link to="#" aria-label="TikTok">
                <TikTokIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Help section */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">BRAUCHEN SIE HILFE?</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="#" className="hover:underline">Rufen Sie uns an 00 800 800 77232</Link></li>
              <li><Link to="#" className="hover:underline">Schreiben Sie uns per WhatsApp</Link></li>
              <li><Link to="#" className="hover:underline">Kontakte</Link></li>
              <li><Link to="#" className="hover:underline">FAQ</Link></li>
              <li><Link to="#" className="hover:underline">Sitemap</Link></li>
            </ul>
          </div>
          
          {/* Exclusive Services section */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">EXKLUSIVE SERVICES</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="#" className="hover:underline">Prada Services</Link></li>
              <li><Link to="#" className="hover:underline">Ihre Bestellung verfolgen</Link></li>
              <li><Link to="#" className="hover:underline">Rückgaben</Link></li>
            </ul>
          </div>
          
          {/* Company section */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">UNTERNEHMEN</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="#" className="hover:underline">Fondazione Prada</Link></li>
              <li><Link to="#" className="hover:underline">Prada Group</Link></li>
              <li><Link to="#" className="hover:underline">Luna Rossa</Link></li>
              <li><Link to="#" className="hover:underline">Nachhaltigkeit</Link></li>
              <li><Link to="#" className="hover:underline">Arbeiten Sie mit uns</Link></li>
            </ul>
          </div>
          
          {/* Legal section */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">RECHTLICHE BEDINGUNGEN</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="#" className="hover:underline">Impressum</Link></li>
              <li><Link to="#" className="hover:underline">Datenschutzerklärung</Link></li>
              <li><Link to="#" className="hover:underline">Cookie-Richtlinie</Link></li>
              <li><Link to="#" className="hover:underline">Cookie-Einstellungen</Link></li>
              <li><Link to="#" className="hover:underline">Verkaufsbedingungen</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="text-xxs text-gray-500">
          <p>©PRADA 2007 - {currentYear} | VAT no. 105.818.936</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
