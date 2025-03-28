
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 w-full">
      <div className="mx-auto max-w-[1481px] border-t pt-12 pb-4 px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold uppercase">Unseren Newsletter erhalten</h3>
            <div className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Email *" 
                className="w-full border-b py-2 outline-none" 
                required
              />
              <button className="ml-2 p-2">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
            <p className="mt-2 text-xs">
              Indem Sie auf "Anmelden" klicken, bestätigen Sie, dass Sie unsere
              Datenschutzerklärung gelesen und verstanden haben und dass Sie den
              Newsletter und andere Marketingmitteilungen, die darin beschrieben
              sind, erhalten möchten.
            </p>

            {/* Social Icons */}
            <div className="mt-4 flex space-x-4">
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor" 
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor" 
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor" 
                    d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"
                  />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor" 
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Spotify">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor" 
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.192.192-.459.3-.726.3s-.534-.108-.726-.3a1.03 1.03 0 0 1 0-1.452c.384-.384 1.068-.384 1.452 0 .4.4.4 1.052 0 1.452zM17.95 12.9a1.03 1.03 0 0 1-1.452 0 1.03 1.03 0 0 1 0-1.452 1.03 1.03 0 0 1 1.452 0c.4.4.4 1.052 0 1.452zm-1.633-3.496a1.21 1.21 0 0 1-1.704 0 1.21 1.21 0 0 1 0-1.704 1.21 1.21 0 0 1 1.704 0c.468.468.468 1.236 0 1.704z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Help */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold uppercase">Brauchen Sie Hilfe?</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Rufen Sie uns an 00 800 800 77232 *</li>
              <li>Schreiben Sie uns per WhatsApp</li>
              <li>Kontakte</li>
              <li>FAQ</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold uppercase">Exklusive Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Prada Services</li>
              <li>Ihre Bestellung verfolgen</li>
              <li>Rückgaben</li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold uppercase">Unternehmen</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Fondazione Prada</li>
              <li>Prada Group</li>
              <li>Luna Rossa</li>
              <li>Nachhaltigkeit</li>
              <li>Arbeiten Sie mit uns</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold uppercase">Rechtliche Bedingungen</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Impressum</li>
              <li>Datenschutzerklärung</li>
              <li>Cookie-Richtlinie</li>
              <li>Cookie-Einstellungen</li>
              <li>Verkaufsbedingungen</li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 border-t pt-4 text-xs text-gray-500">
          <p>©PRADA 2007 - 2025 | VAT no. 106.818.936</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
