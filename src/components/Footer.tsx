import React from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </span>
              <span className="text-xl font-bold font-serif-display text-white">
                PulseTrips <span className="text-amber-500 font-sans font-light text-sm tracking-widest uppercase ml-1">Africa</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Premier experiential safari operator licensed by the Rwanda Development Board (RDB) and Tanzania National Parks (TANAPA). Tailoring bespoke gorilla trekking, Great Migration safaris, and private expeditions.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>24/7 Safari Operations Hotline: +250 788 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>inquiries@pulsetrips.com</span>
              </div>
            </div>
          </div>

          {/* Expeditions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              Safaris & Treks
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Rwanda Mountain Gorilla Trek</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Serengeti Great Migration</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Ngorongoro Caldera Safari</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Zanzibar Bush & Beach</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Maasai Mara Conservancies</a></li>
            </ul>
          </div>

          {/* Regional Field Bases */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              Regional Operations
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Kigali HQ:</strong> KN 3 Ave, Kiyovu, Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Arusha Hub:</strong> Haile Selassie Rd, Arusha, Tanzania</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Nairobi Base:</strong> Wilson Airport Hangar 4, Nairobi</span>
              </li>
            </ul>
          </div>

          {/* Internal Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              Staff & Operations
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Internal system for Owner overview, vehicle fleet dispatch, and gorilla permit clearances.
            </p>
            <button
              onClick={onOpenLogin}
              className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-semibold text-amber-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Staff Portal Login</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} PulseTrips Africa Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-stone-300">Gorilla Permit Guarantee</span>
            <span>·</span>
            <span className="hover:text-stone-300">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
