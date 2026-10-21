import React, { useState } from 'react';
import {
  AuthenticatedUser,
  SafariPackage,
  BookingRecord,
  CustomInquiry
} from '../types/safari';
import {
  DollarSign,
  TrendingUp,
  Users,
  Compass,
  CheckCircle,
  FileText,
  Edit3,
  Search,
  ExternalLink,
  Save,
  Check
} from 'lucide-react';

interface AdminOwnerPortalProps {
  currentUser: AuthenticatedUser;
  packages: SafariPackage[];
  bookings: BookingRecord[];
  inquiries: CustomInquiry[];
  onUpdatePackagePrice: (packageId: string, newPrice: number) => void;
  onUpdateBookingStatus: (bookingId: string, status: BookingRecord['status']) => void;
  onApproveInquiry: (inquiryId: string) => void;
  onNavigateView: (view: 'public' | 'operations') => void;
}

export const AdminOwnerPortal: React.FC<AdminOwnerPortalProps> = ({
  currentUser,
  packages,
  bookings,
  inquiries,
  onUpdatePackagePrice,
  onUpdateBookingStatus,
  onApproveInquiry,
  onNavigateView,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'packages' | 'inquiries'>('overview');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Financial calculations
  const totalRevenue = bookings.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalDeposits = bookings.reduce((acc, b) => acc + b.depositPaid, 0);
  const activeBookingsCount = bookings.filter((b) => b.status === 'Active On Safari' || b.status === 'Confirmed').length;
  const pendingInquiriesCount = inquiries.filter((inq) => inq.status === 'Pending Quote').length;

  const handleStartEditPrice = (pkg: SafariPackage) => {
    setEditingPriceId(pkg.id);
    setTempPrice(pkg.priceUsd);
  };

  const handleSavePrice = (pkgId: string) => {
    if (tempPrice > 0) {
      onUpdatePackagePrice(pkgId, tempPrice);
    }
    setEditingPriceId(null);
  };

  const filteredBookings = bookings.filter((b) =>
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      {/* Executive Portal Top Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-serif-display font-bold text-xl shadow-xs">
              {currentUser.avatarInitials || 'OW'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold font-serif-display text-stone-900">
                  Owner Executive Management Portal
                </h1>
                {/* Specific Role Badge: Owner */}
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold tracking-wide uppercase">
                  Owner
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Signed in as: <strong className="text-amber-700 font-semibold">{currentUser.roleDisplayName}</strong> ({currentUser.name}) · PulseTrips Africa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigateView('operations')}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>Switch to Operation Manager View</span>
            </button>
            <button
              onClick={() => onNavigateView('public')}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </button>
          </div>
        </div>

        {/* Portal Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-stone-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Owner Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <span>Confirmed Safari Bookings</span>
            <span className="px-1.5 py-0.2 bg-stone-100 rounded-full text-[10px] text-stone-700 font-bold">
              {bookings.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Package Pricing & Margin Control
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <span>Custom Safari Inquiries</span>
            {pendingInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-600 text-white font-bold rounded-full text-[10px]">
                {pendingInquiriesCount} new
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Owner Welcome Banner */}
            <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                  Executive Owner Control
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
                  Welcome, Owner ({currentUser.name})
                </h2>
                <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
                  High-level oversight of company gross safari bookings, profit margins, active client expeditions in Rwanda and Tanzania, and bespoke itinerary quote authorizations.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block uppercase">Safari Season</span>
                  <span className="text-sm font-bold text-emerald-700">High Peak Season</span>
                </div>
                <div className="h-8 w-px bg-stone-300" />
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block uppercase">Permits Secured</span>
                  <span className="text-sm font-bold text-amber-800">100% Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-3">
                  <span className="font-medium">Gross Safari Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold font-serif-display text-stone-900 tabular-nums">
                  ${totalRevenue.toLocaleString()}
                </div>
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last quarter</span>
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-3">
                  <span className="font-medium">Collected Deposits</span>
                  <CheckCircle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-bold font-serif-display text-stone-900 tabular-nums">
                  ${totalDeposits.toLocaleString()}
                </div>
                <span className="text-xs text-stone-500 mt-1 block">
                  Receivable: ${(totalRevenue - totalDeposits).toLocaleString()}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-3">
                  <span className="font-medium">Active Safari Groups</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-bold font-serif-display text-stone-900 tabular-nums">
                  {activeBookingsCount}
                </div>
                <span className="text-xs text-stone-500 mt-1 block">
                  In field across Rwanda & Tanzania
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-3">
                  <span className="font-medium">Custom Inquiries</span>
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-bold font-serif-display text-stone-900 tabular-nums">
                  {inquiries.length}
                </div>
                <span className="text-xs text-amber-800 mt-1 block font-semibold">
                  {pendingInquiriesCount} awaiting owner sign-off
                </span>
              </div>
            </div>

            {/* Bookings & Inquiries Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Confirmed bookings snippet */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-stone-900 text-base">Active & Upcoming Expeditions</h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{b.clientName}</div>
                        <div className="text-stone-600">{b.packageName}</div>
                        <div className="text-stone-500 text-[11px] mt-0.5">
                          Ref: <span className="font-mono text-amber-800 font-semibold">{b.bookingReference}</span> · Guide: {b.assignedGuide}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-stone-900 tabular-nums">${b.totalAmount.toLocaleString()}</div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold mt-1 ${
                          b.status === 'Active On Safari'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Inquiries snippet */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-stone-900 text-base">Bespoke Proposals Pipeline</h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
                  >
                    Review Inquiries
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{inq.clientName}</div>
                        <div className="text-stone-600">{inq.destinations.join(' & ')} · {inq.travelStyle}</div>
                        <div className="text-amber-800 font-mono text-[11px] mt-0.5 font-semibold">
                          Budget: {inq.budgetTier}
                        </div>
                      </div>
                      <div>
                        {inq.status === 'Approved by Owner' ? (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => onApproveInquiry(inq.id)}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                          >
                            Approve Quote
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MASTER LEDGER */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                  Client Safari Reservations
                </h2>
                <p className="text-xs text-stone-500">
                  Manage confirmed itineraries, payments, and assigned guides
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client, ref or package..."
                  className="pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-400 w-64 focus:outline-none focus:border-amber-600 shadow-xs"
                />
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Ref & Client</th>
                      <th className="py-3 px-4">Safari Expedition</th>
                      <th className="py-3 px-4">Dates & Guests</th>
                      <th className="py-3 px-4">Financials (USD)</th>
                      <th className="py-3 px-4">Assigned Guide & Fleet</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-amber-800 font-bold block">{b.bookingReference}</span>
                          <span className="font-semibold text-stone-900">{b.clientName}</span>
                          <span className="text-[11px] text-stone-500 block">{b.clientEmail}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-stone-900 font-semibold block">{b.packageName}</span>
                          <span className="text-[11px] text-stone-500">{b.country}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-stone-900 block font-medium">{b.travelDate}</span>
                          <span className="text-stone-500">{b.travelers} Guests</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap tabular-nums">
                          <span className="font-bold text-stone-900 block">${b.totalAmount.toLocaleString()}</span>
                          <span className="text-[11px] text-emerald-700 font-medium">Paid: ${b.depositPaid.toLocaleString()}</span>
                          {b.balanceDue > 0 && (
                            <span className="text-[11px] text-amber-700 block">Due: ${b.balanceDue.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-stone-900 block font-medium">{b.assignedGuide}</span>
                          <span className="text-[11px] text-stone-500">{b.vehicleAssigned}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            b.status === 'Active On Safari'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Confirmed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-stone-200 text-stone-700'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <select
                            value={b.status}
                            onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                            className="bg-stone-50 border border-stone-300 text-[11px] text-stone-900 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-600 cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Active On Safari">Active On Safari</option>
                            <option value="Permits Pending">Permits Pending</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGE PRICING */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                Safari Package Pricing & Profitability Controls
              </h2>
              <p className="text-xs text-stone-500">
                Adjust base per-person rates and seasonal markups directly. Updates immediately reflect on the public website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-2">
                      <span>{pkg.country}</span>
                      <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif-display text-stone-900 mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-500 block">Current Public Price</span>
                        {editingPriceId === pkg.id ? (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-stone-700 text-sm font-semibold">$</span>
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(Number(e.target.value))}
                              className="w-28 px-2 py-1 bg-stone-50 border border-amber-500 rounded text-sm text-stone-900 font-bold tabular-nums"
                            />
                            <button
                              onClick={() => handleSavePrice(pkg.id)}
                              className="p-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded cursor-pointer"
                              title="Save price"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold font-serif-display text-stone-900 tabular-nums">
                            ${pkg.priceUsd.toLocaleString()}{' '}
                            <span className="text-xs text-stone-500 font-sans font-normal">USD</span>
                          </div>
                        )}
                      </div>

                      {editingPriceId !== pkg.id && (
                        <button
                          onClick={() => handleStartEditPrice(pkg)}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                          <span>Adjust Price</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOM INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                Bespoke Safari Requests Awaiting Owner Sign-Off
              </h2>
              <p className="text-xs text-stone-500">
                Review high-value custom requests submitted by prospective guests
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-stone-900">{inq.clientName}</h3>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        inq.status === 'Approved by Owner'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600">
                      <span>Email: {inq.email}</span> · <span>Phone: {inq.phone}</span> · <span>Submitted: {inq.submittedAt}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-600">
                      <span className="text-stone-900 font-semibold">Destinations: {inq.destinations.join(', ')}</span>
                      <span>·</span>
                      <span>{inq.travelStyle}</span>
                      <span>·</span>
                      <span>{inq.travelersCount} Travelers</span>
                      <span>·</span>
                      <span className="text-amber-800 font-semibold">{inq.budgetTier}</span>
                    </div>

                    {inq.notes && (
                      <p className="text-xs text-stone-600 italic bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        "{inq.notes}"
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    {inq.status !== 'Approved by Owner' && (
                      <button
                        onClick={() => onApproveInquiry(inq.id)}
                        className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & Issue Quote</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
