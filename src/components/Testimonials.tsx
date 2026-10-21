import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            Verified Traveler Experiences
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
            Memories Etched in the African Wilderness
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-light mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <div className="font-bold text-stone-900 text-sm">{t.author}</div>
                <div className="text-xs text-stone-500">{t.location}</div>
                <div className="text-xs text-amber-800 font-semibold mt-1">{t.trip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
