import React, { useState } from 'react';
import { Sparkles, Check, Send, CheckCircle2, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { CustomInquiry } from '../types/safari';

interface CustomSafariPlannerProps {
  onAddInquiry: (inquiry: CustomInquiry) => void;
}

export const CustomSafariPlanner: React.FC<CustomSafariPlannerProps> = ({ onAddInquiry }) => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['Rwanda', 'Tanzania']);
  const [travelStyle, setTravelStyle] = useState<'Ultra Luxury' | 'Classic Tented Camps' | 'Active Expedition'>('Ultra Luxury');
  const [partySize, setPartySize] = useState(2);
  const [duration, setDuration] = useState('7 - 9 Days');
  const [preferredMonth, setPreferredMonth] = useState('July - August 2026');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Mountain Gorilla Permits',
    'Great Migration River Crossing',
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleDestination = (dest: string) => {
    if (selectedDestinations.includes(dest)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const baseRatePerDay = travelStyle === 'Ultra Luxury' ? 1200 : travelStyle === 'Classic Tented Camps' ? 750 : 550;
  const daysMultiplier = duration === '4 - 6 Days' ? 5 : duration === '7 - 9 Days' ? 8 : 12;
  const permitsCost = selectedInterests.includes('Mountain Gorilla Permits') ? 1500 * partySize : 0;
  const estimatedTotal = (baseRatePerDay * daysMultiplier * partySize) + permitsCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: CustomInquiry = {
      id: `inq-${Date.now()}`,
      clientName: name,
      email: email,
      phone: phone,
      destinations: selectedDestinations,
      travelStyle: travelStyle,
      travelersCount: partySize,
      preferredMonth: preferredMonth,
      interests: selectedInterests,
      budgetTier: `$${Math.round(estimatedTotal * 0.9).toLocaleString()} - $${Math.round(estimatedTotal * 1.1).toLocaleString()} USD`,
      notes: notes,
      status: 'Pending Quote',
      estimatedBudget: estimatedTotal,
      submittedAt: new Date().toISOString().split('T')[0],
    };

    onAddInquiry(newInquiry);
    setSubmitted(true);
  };

  return (
    <section id="custom-planner" className="py-24 bg-white text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            Tailor-Made African Expeditions
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
            Design Your Custom Safari Itinerary
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 font-light leading-relaxed">
            Specify your dream destinations, wildlife priorities, and preferred encampment tier. Our field specialists will craft an exclusive, permit-guaranteed private safari proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                  Custom Safari Plan Received
                </h3>
                <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your custom inquiry has been submitted and sent for direct review by the PulseTrips Africa team.
                </p>
                <div className="inline-block px-4 py-2 bg-white border border-stone-300 rounded-xl text-amber-700 font-mono font-bold text-sm shadow-xs">
                  Estimated Total: ${estimatedTotal.toLocaleString()} USD ({partySize} Travelers)
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Build Another Itinerary
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Destinations Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>Step 1: Choose Your Destination Countries</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Rwanda', note: 'Volcanoes & Gorilla Haven' },
                      { name: 'Tanzania', note: 'Serengeti & Ngorongoro' },
                      { name: 'Kenya', note: 'Maasai Mara & Amboseli' },
                      { name: 'Uganda', note: 'Bwindi & Queen Elizabeth' },
                      { name: 'Zanzibar', note: 'Turquoise Spice Coast' },
                      { name: 'Botswana', note: 'Okavango Delta' },
                    ].map((dest) => {
                      const isSelected = selectedDestinations.includes(dest.name);
                      return (
                        <button
                          key={dest.name}
                          type="button"
                          onClick={() => toggleDestination(dest.name)}
                          className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-50 border-amber-600 text-stone-900 shadow-xs'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-stone-900">{dest.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-amber-700" />}
                          </div>
                          <span className="text-[11px] text-stone-500 mt-1">{dest.note}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Style & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-amber-700" />
                      <span>Step 2: Safari Accommodation Tier</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { tier: 'Ultra Luxury', desc: 'Private plunge pools, Singita & luxury partner estates' },
                        { tier: 'Classic Tented Camps', desc: 'Authentic Hemingway luxury canvas under the stars' },
                        { tier: 'Active Expedition', desc: 'Adventure trekking lodges & wilderness immersion' },
                      ].map((item) => (
                        <button
                          key={item.tier}
                          type="button"
                          onClick={() => setTravelStyle(item.tier as any)}
                          className={`w-full p-3 text-left rounded-xl border transition-all cursor-pointer ${
                            travelStyle === item.tier
                              ? 'bg-amber-50 border-amber-600 text-stone-900 shadow-xs'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold text-sm text-stone-900">
                            <span>{item.tier}</span>
                            {travelStyle === item.tier && <Check className="w-4 h-4 text-amber-700" />}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                      Trip Duration & Travelers
                    </label>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-stone-600 block mb-1 font-medium">Duration</span>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                        >
                          <option value="4 - 6 Days">4 - 6 Days (Primate or Big Five Focus)</option>
                          <option value="7 - 9 Days">7 - 9 Days (Comprehensive Classic Safari)</option>
                          <option value="10 - 14 Days">10 - 14 Days (Grand East Africa + Beach)</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-xs text-stone-600 block mb-1 font-medium">Party Size</span>
                        <div className="flex items-center gap-2">
                          {[1, 2, 4, 6].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setPartySize(num)}
                              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                partySize === num
                                  ? 'bg-amber-600 text-white border-amber-600 font-bold'
                                  : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
                              }`}
                            >
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-stone-600 block mb-1 font-medium">Target Travel Window</span>
                        <input
                          type="text"
                          value={preferredMonth}
                          onChange={(e) => setPreferredMonth(e.target.value)}
                          placeholder="e.g. October 2026 or Festive Season"
                          className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Wildlife Highlights */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                    Step 3: Wildlife & Experience Highlights
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Mountain Gorilla Permits',
                      'Great Migration River Crossing',
                      'Hot Air Balloon Sunrise Flight',
                      'Chimpanzee Habituation',
                      'Maasai Cultural Village Visit',
                      'Zanzibar Dhow Sunset Cruise',
                      'Private Photographic Ranger Guide',
                    ].map((interest) => {
                      const isSel = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isSel
                              ? 'bg-amber-100 border-amber-600 text-amber-900 font-semibold'
                              : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                          }`}
                        >
                          {isSel && <Check className="w-3.5 h-3.5 text-amber-700" />}
                          <span>{interest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Contact Details */}
                <div className="pt-4 border-t border-stone-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                    Step 4: Your Contact Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special desires (e.g. flight preferences, dietary needs, special milestone celebration)..."
                      className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-500">
                    Complimentary custom quote with zero obligation
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Itinerary Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Live Estimate Card */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-7 sticky top-28 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Safari Cost Calculation</span>
              </div>
              <h3 className="text-xl font-bold font-serif-display text-stone-900">
                Estimated Trip Value
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
              <span className="block text-xs text-stone-500">Total Estimate ({partySize} Travelers)</span>
              <div className="text-3xl font-bold text-stone-900 font-serif-display tabular-nums mt-1 text-amber-700">
                ${estimatedTotal.toLocaleString()}{' '}
                <span className="text-xs text-stone-500 font-sans font-normal">USD</span>
              </div>
              <span className="text-[11px] text-stone-400 block mt-1">
                Approx. ${(Math.round(estimatedTotal / partySize)).toLocaleString()} per guest
              </span>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span className="text-stone-500">Destinations</span>
                <span className="font-semibold text-stone-900">{selectedDestinations.join(' & ')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span className="text-stone-500">Lodging Standard</span>
                <span className="font-semibold text-stone-900">{travelStyle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span className="text-stone-500">Length</span>
                <span className="font-semibold text-stone-900">{duration}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span className="text-stone-500">Gorilla Permits</span>
                <span className="font-semibold text-stone-900">
                  {selectedInterests.includes('Mountain Gorilla Permits') ? `Included ($1,500/guest)` : 'None'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                All PulseTrips itineraries include private 4x4 Land Cruiser vehicle, English/French speaking naturalist guide, park conservation levies, and AMREF air evacuation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
