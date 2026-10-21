import React, { useState } from 'react';
import { Compass, ShieldCheck, UserCheck, LogOut, ArrowRight, Menu, X, Phone } from 'lucide-react';
import { AuthenticatedUser } from '../types/safari';

interface NavbarProps {
  currentUser: AuthenticatedUser | null;
  currentView: 'public' | 'admin' | 'operations';
  onOpenLogin: () => void;
  onLogout: () => void;
  onNavigateView: (view: 'public' | 'admin' | 'operations') => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onOpenLogin,
  onLogout,
  onNavigateView,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner when Authenticated */}
      {currentUser && (
        <div className="bg-stone-900 border-b border-stone-800 text-stone-200 text-xs py-2 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Signed in as: <strong>{currentUser.roleDisplayName}</strong></span>
              </span>
              <span className="text-stone-400 hidden sm:inline">
                {currentUser.title} ({currentUser.name})
              </span>
            </div>

            <div className="flex items-center gap-3">
              {currentView === 'public' ? (
                <button
                  onClick={() => onNavigateView(currentUser.role === 'admin' ? 'admin' : 'operations')}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>Open {currentUser.roleDisplayName} Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigateView('public')}
                  className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>View Public Website</span>
                </button>
              )}

              <button
                onClick={onLogout}
                className="px-2.5 py-1 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-900 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigateView('public');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              <span className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </span>
              <span className="font-serif-display font-bold text-stone-900">
                PulseTrips <span className="text-amber-700 font-sans font-medium text-sm tracking-widest uppercase ml-1">Africa</span>
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a href="#destinations" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
              Destinations
            </a>
            <a href="#packages" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
              Safari Packages
            </a>
            <a href="#custom-planner" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
              Tailor-Made Trips
            </a>
            <a href="#fleet-guides" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
              Fleet & Rangers
            </a>
            <a href="#testimonials" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
              Reviews
            </a>
          </nav>

          {/* Zone 3: Primary Actions & Staff Link */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <button
                onClick={() => onNavigateView(currentUser.role === 'admin' ? 'admin' : 'operations')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors border border-stone-200 cursor-pointer whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>{currentUser.roleDisplayName} Portal</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-stone-500" />
                <span>Staff Portal</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-xl transition-all shadow-md shadow-amber-600/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Safari
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-5 space-y-4 animate-fade-in text-sm font-medium shadow-lg">
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-800 hover:text-amber-700 py-1"
            >
              Destinations
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-800 hover:text-amber-700 py-1"
            >
              Safari Packages
            </a>
            <a
              href="#custom-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-800 hover:text-amber-700 py-1"
            >
              Tailor-Made Trips
            </a>
            <a
              href="#fleet-guides"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-800 hover:text-amber-700 py-1"
            >
              Fleet & Rangers
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-800 hover:text-amber-700 py-1"
            >
              Guest Reviews
            </a>

            <div className="pt-3 border-t border-stone-200">
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView(currentUser.role === 'admin' ? 'admin' : 'operations');
                  }}
                  className="w-full text-left py-2 text-amber-700 flex items-center justify-between font-semibold"
                >
                  <span>Go to {currentUser.roleDisplayName} Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full text-left py-2 text-stone-700 hover:text-amber-700 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-stone-500" />
                  <span>Staff & Dispatch Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
