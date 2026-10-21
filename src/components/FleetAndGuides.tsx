import React from 'react';
import { INITIAL_FLEET_VEHICLES, INITIAL_GUIDES } from '../data/mockData';
import { Radio, Shield, Star, Award, Compass, CheckCircle } from 'lucide-react';

export const FleetAndGuides: React.FC = () => {
  return (
    <section id="fleet-guides" className="py-24 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            Expedition Infrastructure
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
            Custom Safari Fleet & Naturalist Rangers
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 font-light leading-relaxed">
            The difference between an ordinary tour and an unforgettable African journey lies in vehicle engineering and guide mastery.
          </p>
        </div>

        {/* Fleet Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-7 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Custom Pop-Up 4x4 Land Cruisers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every vehicle features 360-degree pop-up photography roofs, high-clearance suspension, long-range fuel tanks, and heavy-duty sand winches.
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Guaranteed window seat for every guest</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Onboard 220V inverter chargers for cameras</span>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Long-Range VHF Radio Dispatch</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Real-time communication with park ranger stations, national wildlife authorities, and guides for prompt wildlife location notices.
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>24/7 Operations dispatch monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Satellite distress and tracking beacon</span>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Wilderness Medical & Air Evac</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Fully stocked trauma medical kits and automatic enrollment in AMREF Flying Doctors emergency bush airstrip medical airlift coverage.
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certified Wilderness First Responder guides</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Built-in chilled drinks cooler in every cruiser</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ranger Guides Roster */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                Field Naturalists
              </p>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                Meet Your Lead Safari Rangers
              </h3>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Over 50+ combined years of East African wildlife tracking
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={guide.avatarUrl}
                      alt={guide.name}
                      className="w-14 h-14 rounded-xl object-cover border border-amber-300"
                    />
                    <div>
                      <h4 className="text-base font-bold text-stone-900 leading-snug">{guide.name}</h4>
                      <span className="text-xs text-amber-700 font-semibold">{guide.experienceYears} Years Tracking</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mb-3 font-light leading-relaxed">
                    {guide.specialty}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-stone-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{guide.certifications[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{guide.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="tabular-nums">{guide.rating}</span>
                  </div>
                  <span className="text-stone-500 tabular-nums">{guide.completedSafaris} Safaris Led</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
