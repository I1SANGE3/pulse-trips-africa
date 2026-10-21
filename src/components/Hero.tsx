import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Compass, ChevronRight, ShieldCheck, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onSearch: (destination: string, category: string) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenBooking }) => {
  const [destination, setDestination] = useState('All Destinations');
  const [category, setCategory] = useState('All Expeditions');
  const [month, setMonth] = useState('Any Month');
  const [guests, setGuests] = useState('2 Guests');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(destination, category);
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-stone-900 text-white">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="African savannah sunrise with elephant herd and Mount Kilimanjaro"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim for high contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/50 to-stone-950/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Natural human editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <span>Official Licensed Safari Operator</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Rwanda RDB & Tanzania TANAPA Accredited</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-display tracking-tight text-white leading-tight mb-6 text-balance">
            Unforgettable Journeys Across East & Southern Africa
          </h1>

          <p className="text-lg sm:text-xl text-stone-100 leading-relaxed font-light mb-8 max-w-2xl">
            Bespoke wildlife safaris, gorilla trekking in Rwanda & Uganda, and Great Migration expeditions tailored by local conservation specialists.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold rounded-xl text-base shadow-xl hover:shadow-amber-500/30 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>Explore All Safaris</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <a
              href="#custom-planner"
              className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl text-base backdrop-blur-md border border-white/20 transition-colors flex items-center gap-2"
            >
              <span>Tailor-Made Trip</span>
            </a>
          </div>

          {/* Clean proof metadata */}
          <div className="mt-10 pt-6 border-t border-white/20 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>100% Guaranteed Gorilla Permits</span>
            </div>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Private 4x4 Cruisers & VHF Radio</span>
            </div>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>AMREF Flying Doctors Medical Evacuation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safari Search Bar Floating Over Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white/95 text-stone-900 border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Destination</span>
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="All Destinations">All Destinations</option>
              <option value="Rwanda">Rwanda (Gorillas & Volcanoes)</option>
              <option value="Tanzania">Tanzania (Serengeti & Crater)</option>
              <option value="Kenya">Kenya (Maasai Mara)</option>
              <option value="Uganda">Uganda (Bwindi Primates)</option>
              <option value="Multi-Country">Bush & Beach (Serengeti + Zanzibar)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Trip Type</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="All Expeditions">All Trip Types</option>
              <option value="Gorilla Trek">Gorilla Trekking</option>
              <option value="Big Five Safari">Great Migration & Big Five</option>
              <option value="Bush & Beach">Bush & Beach Safari</option>
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Travel Season</span>
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="Any Month">Any Season</option>
              <option value="Dry Season (Jun-Oct)">Dry Season (Jun - Oct)</option>
              <option value="Migration High (Jul-Sep)">River Crossings (Jul - Sep)</option>
              <option value="Calving Season (Jan-Mar)">Calving Season (Jan - Mar)</option>
            </select>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Travelers</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="Solo Traveler">Solo Traveler (1)</option>
              <option value="2 Guests">Couple / Pair (2)</option>
              <option value="Small Family (3-4)">Family (3 - 4)</option>
              <option value="Private Group (5-8)">Private Group (5 - 8)</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer h-[42px]"
            >
              <Search className="w-4 h-4" />
              <span>Search Safaris</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
