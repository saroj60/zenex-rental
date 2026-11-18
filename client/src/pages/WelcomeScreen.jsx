import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NepalLogo from '../components/common/NepalLogo';
import NepalBackdrop from '../components/common/NepalBackdrop';
import CarIllustrations from '../components/common/CarIllustrations';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, ShieldCheck, MapPin, Eye, Sparkles } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('customer@nepalcarrental.com');
  const [password, setPassword] = useState('customerpassword123');
  const [name, setName] = useState('Saroj');
  const [phone, setPhone] = useState('+977 9841892011');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetStarted = () => {
    navigate('/home');
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (authMode === 'login') {
        await login(email, password);
      }
      setShowAuthModal(false);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[720px] h-full flex flex-col justify-between overflow-hidden p-6 sm:p-8">
      {/* Authentic Nepal Mountain & Buddhist Stupa Backdrop (Matches Reference Screen 1) */}
      <NepalBackdrop />

      {/* Top Header Logo */}
      <div className="relative z-10 pt-2 text-center flex flex-col items-center">
        <div className="inline-flex p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-soft border border-white/80 mb-2">
          <NepalLogo size="lg" />
        </div>
        <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide mt-1 bg-white/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/50">
          Rent a Car Anywhere in Nepal
        </h2>
      </div>

      {/* Hero White Hyundai Creta Car & Carousel Indicator (Exact match to Screen 1) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
        <div className="relative w-full max-w-md flex items-center justify-center px-4">
          {/* Soft ambient lighting behind vehicle */}
          <div className="absolute w-72 h-44 rounded-full bg-white/70 blur-2xl"></div>

          {/* Real White Hyundai Creta Car Photo */}
          <div className="relative z-10 w-full flex items-center justify-center transform hover:scale-[1.03] transition-transform duration-300">
            <img
              src="/cars/creta.png"
              alt="Nepal Car Rental Hyundai Creta"
              className="max-h-56 max-w-sm w-full object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)]"
            />
          </div>
        </div>

        {/* Carousel Pagination dots matching screenshot (Center dot active royal blue) */}
        <div className="flex items-center gap-2 mt-6">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
          <span className="w-7 h-2.5 rounded-full bg-[#0755C9] transition-all shadow-xs"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
        </div>
      </div>

      {/* Action Buttons (Get Started, Login, Sign Up) */}
      <div className="relative z-10 w-full max-w-sm mx-auto space-y-3 pb-2">
        <button
          type="button"
          onClick={handleGetStarted}
          className="w-full py-4 rounded-2xl bg-[#0755C9] text-white font-extrabold text-base shadow-lg shadow-blue-600/30 hover:bg-[#053E94] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
        >
          <span>Get Started</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => openAuth('login')}
            className="py-3 px-4 rounded-2xl bg-white border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs hover:bg-slate-50 active:scale-[0.99] transition-all"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => openAuth('signup')}
            className="py-3 px-4 rounded-2xl bg-white border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs hover:bg-slate-50 active:scale-[0.99] transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {authMode === 'login' ? 'Customer Login' : 'Create Account'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {authMode === 'login' ? 'Access your saved trips and rentals' : 'Join Nepal Car Rental in seconds'}
            </p>

            {error && <div className="mb-3 p-2 bg-rose-50 text-rose-600 text-xs rounded-lg">{error}</div>}

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0755C9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Phone (+977)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0755C9]"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0755C9]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0755C9]"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-[#0755C9] text-white text-xs font-bold shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : authMode === 'login' ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
