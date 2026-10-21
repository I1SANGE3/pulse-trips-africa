import React, { useState } from 'react';
import { SafariPackage } from '../types/safari';
import { X, Check, ShieldCheck, Calendar, Users, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface PackageModalProps {
  packageData: SafariPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSubmitted?: (bookingDetails: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    travelers: number;
    travelDate: string;
    packageName: string;
    packageId: string;
    totalAmount: number;
    country: string;
  }) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  packageData,
  isOpen,
  onClose,
  onBookingSubmitted,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'book'>('itinerary');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-11-15');
  const [travelers, setTravelers] = useState(2);
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !packageData) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `PTA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsSuccess(true);

    if (onBookingSubmitted) {
      onBookingSubmitted({
        clientName: fullName,
        clientEmail: email,
        clientPhone: phone,
        travelers: Number(travelers),
        travelDate: travelDate,
        packageName: packageData.title,
        packageId: packageData.id,
        totalAmount: packageData.priceUsd * Number(travelers),
        country: packageData.country,
      });
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden text-stone-900 my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-modal-title"
      >
        {/* Top Image Banner */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden bg-stone-100">
          <img
            src={packageData.imageUrl}
            alt={packageData.imageAlt}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 p-2 rounded-full backdrop-blur-sm transition-colors shadow-md"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title inside hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{packageData.primaryDestination}</span>
              <span aria-hidden="true">·</span>
              <span>{packageData.durationDays} Days / {packageData.durationNights} Nights</span>
              <span aria-hidden="true">·</span>
              <span>{packageData.groupType}</span>
            </div>
            <h2 id="package-modal-title" className="text-2xl sm:text-3xl font-serif-display font-bold text-white text-balance">
              {packageData.title}
            </h2>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-6 py-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Day-by-Day Itinerary
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'inclusions'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Inclusions & Inclusions
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Book / Request Quote
            </button>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-xs text-stone-500 block">From</span>
            <span className="text-xl font-bold text-stone-900 tabular-nums font-serif-display">${packageData.priceUsd.toLocaleString()}</span>
            <span className="text-xs text-stone-500"> / guest</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-sm text-stone-700 space-y-6">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <p className="text-base text-stone-800 font-light leading-relaxed">
                {packageData.tagline}
              </p>

              <div className="border-l-2 border-amber-200 ml-3 pl-6 space-y-8">
                {packageData.itinerary.map((day) => (
                  <div key={day.day} className="relative group">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-xs" />
                    <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mb-1">
                      <span>Day {day.day}</span>
                      <span aria-hidden="true">·</span>
                      <span>{day.meals}</span>
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-2">{day.title}</h3>
                    <p className="text-stone-600 leading-relaxed mb-3">{day.description}</p>
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                      <strong className="text-stone-900 font-semibold">Lodge / Camp:</strong> {day.accommodation}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
                >
                  Proceed to Safari Booking
                </button>
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h3 className="text-sm font-bold text-emerald-800 mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Included in This Expedition</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {packageData.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500" />
                    <span>Not Included</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-stone-500">
                    {packageData.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-900 font-semibold mb-1">
                    Official Permit Clearance Guarantee
                  </strong>
                  PulseTrips Africa holds direct API and institutional partner access with the Rwanda Development Board (RDB) and Tanzania National Parks (TANAPA). Your tracking permits are guaranteed upon booking confirmation.
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
                >
                  Request Official Availability
                </button>
              </div>
            </div>
          )}

          {activeTab === 'book' && (
            <div>
              {isSuccess ? (
                <div className="p-8 text-center space-y-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                    Safari Reservation Request Received
                  </h3>
                  <p className="text-stone-600 max-w-md mx-auto text-sm">
                    Thank you, <strong>{fullName}</strong>. Your provisional reference number is:
                  </p>
                  <div className="inline-block py-2 px-4 rounded-xl bg-white border border-amber-500 font-mono text-base font-bold text-amber-700 tracking-wider shadow-xs">
                    {bookingRef}
                  </div>
                  <p className="text-xs text-stone-500 max-w-lg mx-auto">
                    A dedicated PulseTrips Safari Specialist will contact you within 4 hours with your full itinerary, permit reservation voucher, and deposit details.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Return to Website
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-stone-500">Selected Package: </span>
                      <strong className="text-stone-900">{packageData.title}</strong>
                    </div>
                    <div className="text-amber-700 font-bold tabular-nums">
                      Estimated Total: ${(packageData.priceUsd * travelers).toLocaleString()} USD ({travelers} travelers)
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name (Lead Guest) *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dr. Marcus Vance"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="m.vance@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Travel Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        <span>Party Size</span>
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                      >
                        <option value={1}>1 Traveler (Solo)</option>
                        <option value={2}>2 Travelers (Pair)</option>
                        <option value={3}>3 Travelers</option>
                        <option value={4}>4 Travelers</option>
                        <option value={6}>6 Travelers (Full Cruiser)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Special Requests & Preferences
                    </label>
                    <textarea
                      rows={3}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Vegetarian diet, camera gear support, special anniversary..."
                      className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      No immediate payment taken. Official voucher issued upon review.
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Safari Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
