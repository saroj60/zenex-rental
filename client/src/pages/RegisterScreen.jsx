import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NepalLogo from '../components/common/NepalLogo';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
  Check,
  X
} from 'lucide-react';

export default function RegisterScreen() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  // Live Password Strength Evaluation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-200' };

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600', width: 'w-1/4' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600', width: 'w-2/4' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-blue-500', text: 'text-blue-600', width: 'w-3/4' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600', width: 'w-full' };
      default:
        return { score: 0, label: 'Too short', color: 'bg-rose-500', text: 'text-rose-600', width: 'w-1/12' };
    }
  }, [formData.password]);

  // Client-side validations
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please provide your full name as shown on your Nepali citizenship or passport.');
      return false;
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address (e.g. yourname@example.com).');
      return false;
    }

    // Nepal phone validation: 10 digits starting with 98 or 97, or with +977 prefix
    const phoneClean = formData.phone.replace(/[\s\-]/g, '');
    const nepalPhoneRegex = /^(?:\+?977)?[9][78]\d{8}$/;
    if (!nepalPhoneRegex.test(phoneClean)) {
      setError('Please enter a valid Nepal mobile number (10 digits starting with 98 or 97, e.g. 9841892011).');
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify both password entries.');
      return false;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms & Conditions and Privacy Policy to register.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: 'customer',
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(redirectPath);
      }, 1200);
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.message ||
        'Unable to complete registration. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top navigation */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0755C9] transition-colors bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200/80"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>Already registered?</span>
          <Link
            to={redirectPath !== '/' ? `/login?redirect=${encodeURIComponent(redirectPath)}` : '/login'}
            className="text-[#0755C9] font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Registration Card / Split container */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden my-auto">
        
        {/* Left Visual Highlight Panel (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#10243A] via-[#0D3B75] to-[#0755C9] p-8 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <NepalLogo size="md" />
            <div className="mt-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[11px] font-bold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Join 1,200+ Nepal Travelers
              </span>
              <h2 className="text-2xl font-black text-white leading-tight">
                Create Your Nepal Car Rental Account
              </h2>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Book premium vehicles in Kathmandu, Pokhara, Chitwan and off-road Himalayan terrains with verified chauffeurs or self-drive freedom.
              </p>
            </div>
          </div>

          {/* Perks checklist */}
          <div className="relative z-10 space-y-3 mt-8">
            <div className="flex items-start gap-3 text-xs">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-white">Instant Rental Approvals</p>
                <p className="text-[11px] text-blue-200">No lengthy paperwork. Fast digital verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-white">Exclusive Promo Codes</p>
                <p className="text-[11px] text-blue-200">Save up to NPR 1,500 on weekly rentals.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-white">24/7 Nepal Highway Support</p>
                <p className="text-[11px] text-blue-200">Emergency breakdown & replacement vehicle.</p>
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
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join Nepal Car Rental in seconds. Start booking trips across Nepal.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/90 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="font-bold">Account created successfully! Redirecting you now...</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Karki"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Nepal Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nepal Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX or +977 98XXXXXXXX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Used for instant SMS booking alerts and chauffeur contact.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400"
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

              {/* Live Password Strength Meter */}
              {formData.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Strength:</span>
                    <span className={`font-bold ${passwordStrength.text}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${passwordStrength.color} ${passwordStrength.width}`}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] focus:ring-3 focus:ring-blue-100 text-sm text-slate-900 transition-all outline-hidden font-medium placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Match indicator */}
              {formData.confirmPassword && (
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  {formData.password === formData.confirmPassword ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Passwords match
                    </span>
                  ) : (
                    <span className="text-rose-500 font-medium flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Passwords do not match
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1.5">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 text-[#0755C9] rounded-md border-slate-300 focus:ring-[#0755C9] cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to the{' '}
                  <a href="#terms" className="text-[#0755C9] font-bold hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-[#0755C9] font-bold hover:underline">
                    Rental Policy
                  </a>{' '}
                  of Nepal Car Rental.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 px-4 rounded-xl bg-[#0755C9] hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Account Created!</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Already have an account */}
          <div className="mt-6 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <Link
              to={redirectPath !== '/' ? `/login?redirect=${encodeURIComponent(redirectPath)}` : '/login'}
              className="text-[#0755C9] font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 mt-6">
        © {new Date().getFullYear()} Nepal Car Rental Pvt. Ltd. All rights reserved. Kathmandu & Pokhara.
      </div>
    </div>
  );
}
