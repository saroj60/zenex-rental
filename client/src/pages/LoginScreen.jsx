import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NepalLogo from '../components/common/NepalLogo';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  KeyRound,
  Sparkles,
  Car,
  ChevronLeft
} from 'lucide-react';

export default function LoginScreen() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Validate form before submission
  const validate = () => {
    if (!identifier.trim()) {
      setError('Please enter your email address or mobile number.');
      return false;
    }

    // Check if it's either an email or a valid Nepal phone
    const isEmail = identifier.includes('@');
    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier.trim())) {
        setError('Please enter a valid email address (e.g. customer@nepalcarrental.com).');
        return false;
      }
    } else {
      const digits = identifier.replace(/\D/g, '');
      if (digits.length < 10) {
        setError('Please enter a valid 10-digit Nepal mobile number (e.g. 9841892011).');
        return false;
      }
    }

    if (!password) {
      setError('Please enter your account password.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);
    try {
      await login(identifier, password, rememberMe);
      navigate(redirectPath);
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
        'Invalid credentials. Please verify your email/phone and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Quick helper to fill demo credentials
  const fillCredentials = (type) => {
    setError('');
    if (type === 'customer_email') {
      setIdentifier('customer@nepalcarrental.com');
      setPassword('customerpassword123');
    } else if (type === 'customer_phone') {
      setIdentifier('9841892011');
      setPassword('customerpassword123');
    } else if (type === 'admin') {
      setIdentifier('admin@nepalcarrental.com');
      setPassword('adminpassword123');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top back navigation */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0755C9] transition-colors bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200/80"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>Need help?</span>
          <a href="tel:+977014422334" className="text-[#0755C9] font-bold hover:underline">
            +977 01-4422334
          </a>
        </div>
      </div>

      {/* Main Login Card / Split container */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden my-auto">
        
        {/* Left Visual Highlight Panel (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#10243A] via-[#0D3B75] to-[#0755C9] p-8 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <NepalLogo size="md" />
            <div className="mt-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[11px] font-bold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Verified Nepal Fleet
              </span>
              <h2 className="text-2xl font-black text-white leading-tight">
                Seamless Road Journeys Across Nepal
              </h2>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Rent trusted 4WD SUVs, hatchbacks, and tourist vans for Kathmandu, Pokhara, Mustang, and Everest highways.
              </p>
            </div>
          </div>

          {/* Value Badges */}
          <div className="relative z-10 space-y-3 mt-8">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center shrink-0">
                <Car className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Instant Online Confirmation</p>
                <p className="text-[10px] text-blue-200">No hidden fees, 100% insured fleet</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="font-bold text-white">eSewa & Khalti Payments</p>
                <p className="text-[10px] text-blue-200">Instant digital receipts & security</p>
              </div>
            </div>
          </div>

          {/* Ambient Glow */}
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-[#10243A] tracking-tight">
              Customer Sign In
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Welcome back! Access your car bookings, driver details, and receipts.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/90 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identifier (Email or Phone) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address or Nepal Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. customer@nepalcarrental.com or 9841892011"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs font-semibold text-[#0755C9] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#0755C9] rounded-md border-slate-300 focus:ring-[#0755C9] cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-600">Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0755C9] hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials for Reviewers & Testers */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#0755C9]" />
              Quick Demo Logins
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillCredentials('customer_phone')}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-slate-800 group-hover:text-[#0755C9]">Saroj (Mobile)</div>
                <div className="text-[10px] text-slate-500 font-mono">9841892011</div>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('customer_email')}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-slate-800 group-hover:text-[#0755C9]">Saroj (Email)</div>
                <div className="text-[10px] text-slate-500 font-mono truncate">customer@nepalcarrental.com</div>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-xs text-slate-600">
            Don't have an account yet?{' '}
            <Link
              to={redirectPath !== '/' ? `/register?redirect=${encodeURIComponent(redirectPath)}` : '/register'}
              className="text-[#0755C9] font-bold hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 mt-6">
        © {new Date().getFullYear()} Nepal Car Rental Pvt. Ltd. All rights reserved. Kathmandu & Pokhara.
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        onSwitchToLogin={() => setForgotModalOpen(false)}
      />
    </div>
  );
}
