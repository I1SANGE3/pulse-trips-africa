import React, { useState } from 'react';
import {
  AuthenticatedUser,
  FleetVehicle,
  SafariGuide,
  ParkPermit,
  BookingRecord
} from '../types/safari';
import {
  Compass,
  Truck,
  ShieldCheck,
  Radio,
  CheckCircle,
  MapPin,
  ExternalLink,
  Plane,
  Search
} from 'lucide-react';

interface OperationsManagerPortalProps {
  currentUser: AuthenticatedUser;
  vehicles: FleetVehicle[];
  guides: SafariGuide[];
  permits: ParkPermit[];
  bookings: BookingRecord[];
  onUpdateVehicleStatus: (vehicleId: string, status: FleetVehicle['status'], location?: string) => void;
  onUpdatePermitStatus: (permitId: string, status: ParkPermit['status']) => void;
  onNavigateView: (view: 'public' | 'admin') => void;
}

export const OperationsManagerPortal: React.FC<OperationsManagerPortalProps> = ({
  currentUser,
  vehicles,
  guides,
  permits,
  bookings,
  onUpdateVehicleStatus,
  onUpdatePermitStatus,
  onNavigateView,
}) => {
  const [activeTab, setActiveTab] = useState<'dispatch' | 'permits' | 'fleet' | 'guides'>('dispatch');
  const [permitSearch, setPermitSearch] = useState('');

  const activeVehiclesCount = vehicles.filter((v) => v.status === 'On Safari').length;
  const clearedPermitsCount = permits.filter((p) => p.status === 'Cleared at Gate' || p.status === 'Secured').length;

  const filteredPermits = permits.filter((p) =>
    p.guestName.toLowerCase().includes(permitSearch.toLowerCase()) ||
    p.permitNumber.toLowerCase().includes(permitSearch.toLowerCase()) ||
    p.parkName.toLowerCase().includes(permitSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      {/* Operations Portal Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xl shadow-xs">
              {currentUser.avatarInitials || 'OM'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold font-serif-display text-stone-900">
                  Safari Field Operations & Logistics Portal
                </h1>
                {/* Specific Role Badge: Operation Manager */}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide uppercase">
                  Operation Manager
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Signed in as: <strong className="text-emerald-800 font-semibold">{currentUser.roleDisplayName}</strong> ({currentUser.name}) · PulseTrips Africa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigateView('admin')}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Owner Financial View</span>
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
            onClick={() => setActiveTab('dispatch')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dispatch'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Daily Safari Dispatch</span>
          </button>
          <button
            onClick={() => setActiveTab('permits')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'permits'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Gorilla & Park Permits Tracker</span>
            <span className="px-1.5 py-0.2 bg-stone-100 rounded-full text-[10px] text-stone-700 font-bold">
              {permits.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fleet'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>4x4 Fleet Equipment & Readiness</span>
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'guides'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <span>Ranger Guides in the Field</span>
          </button>
        </div>
      </header>

      {/* Main Operations Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: DAILY SAFARI DISPATCH */}
        {activeTab === 'dispatch' && (
          <div className="space-y-8">
            {/* Ops Banner */}
            <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Daily Field Logistics
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
                  Welcome, Operation Manager ({currentUser.name})
                </h2>
                <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
                  Real-time monitoring of Toyota Land Cruiser movements, national park gate clearances at Volcanoes NP, Serengeti Seronera, and airport meet & greets.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="text-center">
                  <span className="text-[10px] text-stone-500 block uppercase">Cruisers in Field</span>
                  <span className="text-xl font-bold text-stone-900 tabular-nums">{activeVehiclesCount} Active</span>
                </div>
                <div className="h-8 w-px bg-stone-300" />
                <div className="text-center">
                  <span className="text-[10px] text-stone-500 block uppercase">Permits Cleared</span>
                  <span className="text-xl font-bold text-emerald-700 tabular-nums">{clearedPermitsCount} / {permits.length}</span>
                </div>
              </div>
            </div>

            {/* Active Vehicles Board */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Real-Time Fleet & Expedition Dispatch Board</span>
                </h3>
                <span className="text-xs text-stone-500">Update status in real-time</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {vehicles.map((veh) => (
                  <div
                    key={veh.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                          {veh.plateNumber}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          veh.status === 'On Safari'
                            ? 'bg-emerald-100 text-emerald-800'
                            : veh.status === 'Ready for Dispatch'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {veh.status}
                        </span>
                      </div>

                      <h4 className="font-semibold text-stone-900 text-sm">{veh.model}</h4>
                      <div className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{veh.currentLocation}</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                        <div>
                          <strong className="text-stone-700">Assigned Guide: </strong>
                          <span className="text-stone-900 font-medium">{veh.assignedGuide}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500">Fuel Level:</span>
                          <span className="font-mono font-semibold text-amber-700">{veh.fuelLevelPercent}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100">
                      <label className="block text-[11px] text-stone-500 mb-1">
                        Update Dispatch Status:
                      </label>
                      <select
                        value={veh.status}
                        onChange={(e) => onUpdateVehicleStatus(veh.id, e.target.value as any)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                      >
                        <option value="On Safari">On Safari (En Route / Game Drive)</option>
                        <option value="Ready for Dispatch">Ready for Dispatch (Base Yard)</option>
                        <option value="In Inspection">In Inspection / Cleanout</option>
                        <option value="Scheduled Service">Scheduled Service Workshop</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Airport Transfer Flight Manifest */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Plane className="w-4 h-4 text-emerald-700" />
                <span>Today's Airport Arrival & Pickups Manifest</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-600 uppercase font-semibold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-4">Flight & Airport</th>
                      <th className="py-2.5 px-4">Guest Details</th>
                      <th className="py-2.5 px-4">Arrival ETA</th>
                      <th className="py-2.5 px-4">Driver & Cruiser</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                        WB 402 · Kigali Intl (KGL)
                      </td>
                      <td className="py-3 px-4">Dr. Marcus Vance & Family (2)</td>
                      <td className="py-3 px-4 text-amber-700 font-mono font-semibold">14:20 Local</td>
                      <td className="py-3 px-4">Jean-Paul Habimana · RAD 482B</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          Guest Received
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                        KQ 102 · Nairobi (JKIA)
                      </td>
                      <td className="py-3 px-4">Catherine Dubois (2)</td>
                      <td className="py-3 px-4 text-amber-700 font-mono font-semibold">18:45 Local</td>
                      <td className="py-3 px-4">Amara Ndung'u · KDG 812A</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-semibold">
                          Transfer Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GORILLA & PARK PERMITS TRACKER */}
        {activeTab === 'permits' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                  Gorilla & National Park Permits Verification
                </h2>
                <p className="text-xs text-stone-500">
                  Direct official liaison with Rwanda Development Board (RDB) and TANAPA
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={permitSearch}
                  onChange={(e) => setPermitSearch(e.target.value)}
                  placeholder="Search guest or permit code..."
                  className="pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-400 w-64 focus:outline-none focus:border-emerald-600 shadow-xs"
                />
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Permit Code</th>
                      <th className="py-3 px-4">Guest & Passport</th>
                      <th className="py-3 px-4">Park & Activity</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Issuing Authority</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Gate Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredPermits.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-800">
                          {p.permitNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-stone-900 block">{p.guestName}</span>
                          <span className="text-[11px] text-stone-500 font-mono">PPT: {p.passportNumber}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-stone-900 block font-medium">{p.activity}</span>
                          <span className="text-[11px] text-stone-500">{p.parkName}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-900 whitespace-nowrap">
                          {p.date}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          {p.issuingAuthority}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            p.status === 'Cleared at Gate'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'Secured'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <select
                            value={p.status}
                            onChange={(e) => onUpdatePermitStatus(p.id, e.target.value as any)}
                            className="bg-stone-50 border border-stone-300 text-[11px] text-stone-900 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-600 cursor-pointer"
                          >
                            <option value="Cleared at Gate">Cleared at Gate</option>
                            <option value="Secured">Secured & Verified</option>
                            <option value="In Processing">In Processing</option>
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

        {/* TAB 3: 4X4 FLEET READINESS */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                Vehicle Pre-Departure Equipment Audits
              </h2>
              <p className="text-xs text-stone-500">
                Mandatory checks before departure into Volcanoes NP, Serengeti, or Maasai Mara
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((v) => (
                <div key={v.id} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        {v.plateNumber}
                      </span>
                      <h4 className="font-bold text-stone-900 text-base mt-1">{v.model}</h4>
                    </div>
                    <span className="text-xs text-stone-500">
                      Last Serviced: {v.lastServiceDate}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-stone-800">
                      <CheckCircle className={`w-4 h-4 ${v.equipmentStatus.popUpRoof ? 'text-emerald-600' : 'text-stone-300'}`} />
                      <span>360° Pop-Up Roof</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-800">
                      <CheckCircle className={`w-4 h-4 ${v.equipmentStatus.vhfRadio ? 'text-emerald-600' : 'text-stone-300'}`} />
                      <span>Long-Range VHF Radio</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-800">
                      <CheckCircle className={`w-4 h-4 ${v.equipmentStatus.inverterChargers ? 'text-emerald-600' : 'text-rose-500'}`} />
                      <span>220V Camera Chargers</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-800">
                      <CheckCircle className={`w-4 h-4 ${v.equipmentStatus.medicalKit ? 'text-emerald-600' : 'text-stone-300'}`} />
                      <span>Trauma First Aid Kit</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-stone-500">Base: {v.currentLocation}</span>
                    <span className="text-amber-700 font-semibold font-mono">Fuel: {v.fuelLevelPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RANGER GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                Ranger Guide Deployments
              </h2>
              <p className="text-xs text-stone-500">
                Field guides currently rostered across Rwanda, Tanzania, and Kenya
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guides.map((g) => (
                <div key={g.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={g.avatarUrl}
                        alt={g.name}
                        className="w-12 h-12 rounded-xl object-cover border border-amber-300"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{g.name}</h4>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-semibold ${
                          g.status === 'In Field'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {g.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 mb-2">
                      {g.specialty}
                    </p>

                    {g.currentTrip && (
                      <div className="p-2 rounded bg-stone-50 border border-stone-200 text-[11px] text-amber-800 font-mono mb-2">
                        {g.currentTrip}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 flex justify-between">
                    <span>{g.experienceYears} Years Exp</span>
                    <span className="text-amber-700 font-semibold">★ {g.rating}</span>
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
