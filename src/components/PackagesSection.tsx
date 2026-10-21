import React, { useState } from 'react';
import { SafariPackage } from '../types/safari';
import { Clock, Star, MapPin, ArrowRight, Check } from 'lucide-react';

interface PackagesSectionProps {
  packages: SafariPackage[];
  filterDestination: string;
  filterCategory: string;
  onSelectPackage: (pkg: SafariPackage) => void;
  onBookPackage: (pkg: SafariPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  filterDestination,
  filterCategory,
  onSelectPackage,
  onBookPackage,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'Rwanda' | 'Tanzania' | 'Kenya' | 'Multi-Country'>('all');

  const filtered = packages.filter((pkg) => {
    // Tab filter
    if (activeTab !== 'all' && pkg.country !== activeTab) {
      return false;
    }
    // Search bar destination filter
    if (filterDestination !== 'All Destinations') {
      if (filterDestination === 'Multi-Country' && pkg.country !== 'Multi-Country') return false;
      if (filterDestination !== 'Multi-Country' && pkg.country !== filterDestination) return false;
    }
    // Search bar category filter
    if (filterCategory !== 'All Expeditions') {
      if (pkg.category !== filterCategory) return false;
    }
    return true;
  });

  return (
    <section id="packages" className="py-24 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
              Signature Safari Packages
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
              Curated African Safari Packages
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 font-light leading-relaxed">
              Every package includes guaranteed official park permits, custom 4x4 pop-up roof Land Cruisers, luxury full-board lodging, and private guides.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setActiveTab('Rwanda')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'Rwanda'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rwanda (Gorillas)
            </button>
            <button
              onClick={() => setActiveTab('Tanzania')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'Tanzania'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tanzania (Serengeti)
            </button>
            <button
              onClick={() => setActiveTab('Kenya')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'Kenya'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kenya (Maasai Mara)
            </button>
            <button
              onClick={() => setActiveTab('Multi-Country')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'Multi-Country'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bush & Beach
            </button>
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-200 transition-all flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Country Pill */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-stone-900 font-medium px-3 py-1 rounded-lg text-xs shadow-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{pkg.country}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="tabular-nums">{pkg.rating}</span>
                    <span className="text-stone-200 font-normal">({pkg.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mb-2">
                    <span>{pkg.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pkg.groupType}</span>
                    <span aria-hidden="true">·</span>
                    <span>Best: {pkg.bestSeason}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-5">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-2 mb-6">
                    {pkg.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-5 border-t border-stone-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-stone-500">All-Inclusive from</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums font-serif-display">
                        ${pkg.priceUsd.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
