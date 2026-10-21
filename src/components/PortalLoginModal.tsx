import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, X, AlertCircle, Shield } from 'lucide-react';
import { AuthenticatedUser } from '../types/safari';

interface PortalLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthenticatedUser) => void;
}

export const PortalLoginModal: React.FC<PortalLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    setTimeout(() => {
      setIsLoading(false);

      if (!cleanEmail || !cleanPass) {
        setError('Please enter both your work email and password.');
        return;
      }

      // Admin / Owner detection:
      const isAdmin =
        cleanEmail === 'admin@pulsetrips.com' ||
        cleanEmail === 'owner@pulsetrips.com' ||
        cleanEmail === 'admin' ||
        cleanEmail.includes('admin') ||
        cleanEmail.includes('owner');

      // Operation Manager detection:
      const isOps =
        cleanEmail === 'operations@pulsetrips.com' ||
        cleanEmail === 'ops@pulsetrips.com' ||
        cleanEmail === 'manager@pulsetrips.com' ||
        cleanEmail === 'operation' ||
        cleanEmail === 'ops' ||
        cleanEmail.includes('operation') ||
        cleanEmail.includes('ops') ||
        cleanEmail.includes('manager');

      if (isAdmin) {
        // As instructed: "if the admin signs in in his portal he will have to admin as the owner"
        onLoginSuccess({
          id: 'usr-admin-owner',
          name: 'Placide Isange',
          email: cleanEmail.includes('@') ? cleanEmail : 'admin@pulsetrips.com',
          role: 'admin',
          roleDisplayName: 'Owner',
          title: 'Owner & Managing Director',
          avatarInitials: 'OW',
        });
        onClose();
        return;
      }

      if (isOps) {
        // As instructed: "for the side of operation manager when he signs in he will have to see operation manger as the person who signed in"
        onLoginSuccess({
          id: 'usr-operation-mgr',
          name: 'Emmanuel Mugabo',
          email: cleanEmail.includes('@') ? cleanEmail : 'operations@pulsetrips.com',
          role: 'operation_manager',
          roleDisplayName: 'Operation Manager',
          title: 'Head of Operations & Safari Dispatch',
          avatarInitials: 'OM',
        });
        onClose();
        return;
      }

      setError('Authentication failed. Please check your credentials or contact system administrator.');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden text-stone-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-login-title"
      >
        {/* Top colored accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600" />

        <div className="p-7">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 transition-colors p-1.5 rounded-lg hover:bg-stone-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 id="portal-login-title" className="text-xl font-bold font-serif-display text-stone-900">
                Staff & Partner Portal
              </h2>
              <p className="text-xs text-stone-500">
                PulseTrips Africa Management System
              </p>
            </div>
          </div>

          {/* Secure notice without exposing any credentials */}
          <div className="mb-6 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <span>
              Authorized personnel only. Please sign in with your designated PulseTrips staff credentials.
            </span>
          </div>

          {/* Error notice */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Work Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@pulsetrips.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-300 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <p className="text-[11px] text-stone-400">
              PulseTrips Africa © 2026 · Confidential & Secure Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
