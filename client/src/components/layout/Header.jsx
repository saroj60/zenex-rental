import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NepalLogo from '../common/NepalLogo';
import { useAuth } from '../../context/AuthContext';
import {
  Smartphone,
  Monitor,
  Shield,
  LayoutGrid,
  Menu,
  X,
  User,
  Calendar,
  Phone,
  Compass,
  ArrowRight,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import AuthModal from '../customer/AuthModal';

const Header = ({ isMobileView, setIsMobileView }) => {
  const { user, isAdmin, switchUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isShowcase = location.pathname === '/showcase';
  const isEmbedded = typeof window !== 'undefined' && window.self !== window.top;

  const scrollToAnchor = (anchorId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/' && location.pathname !== '/home') {
      navigate(`/${anchorId}`);
      setTimeout(() => {
        const el = document.querySelector(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.querySelector(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* 1. LEFT: Nepal Car Rental Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5">
                <NepalLogo size="md" />
              </Link>
            </div>

            {/* 2. CENTER: Main Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-sm font-bold text-slate-600">
              <Link
                to="/"
                className={`hover:text-[#0755C9] transition-colors ${
                  location.pathname === '/' || location.pathname === '/home' ? 'text-[#0755C9] font-black' : ''
                }`}
              >
                Home
              </Link>

              <Link
                to="/cars"
                className={`hover:text-[#0755C9] transition-colors ${
                  location.pathname === '/cars' ? 'text-[#0755C9] font-black' : ''
                }`}
              >
                Explore Cars
              </Link>

              <Link
                to="/how-it-works"
                className={`hover:text-[#0755C9] transition-colors ${
                  location.pathname === '/how-it-works' ? 'text-[#0755C9] font-black' : ''
                }`}
              >
                How It Works
              </Link>

              <Link
                to="/about"
                className={`hover:text-[#0755C9] transition-colors ${
                  location.pathname === '/about' ? 'text-[#0755C9] font-black' : ''
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`hover:text-[#0755C9] transition-colors ${
                  location.pathname === '/contact' ? 'text-[#0755C9] font-black' : ''
                }`}
              >
                Contact
              </Link>

              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  isAdminRoute
                    ? 'bg-[#0755C9] text-white shadow-sm'
                    : 'bg-blue-50 text-[#0755C9] hover:bg-blue-100'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </nav>

            {/* 3. RIGHT: Actions (Login, Sign Up, My Bookings, Persona) */}
            <div className="flex items-center gap-2.5">
              
              {/* My Bookings Button */}
              <Link
                to="/bookings"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#0755C9]" />
                <span>My Bookings</span>
              </Link>

              {/* User Authentication state */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all text-xs font-bold text-slate-800"
                  >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0755C9&color=fff`}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 capitalize">{user.role || 'Customer'}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Customer Dashboard
                      </Link>
                      <Link
                        to="/bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        My Bookings
                      </Link>
                      <Link
                        to="/profile?tab=profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Profile Settings
                      </Link>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0755C9] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Developer Testing Persona Toggle (compact) */}
              <div className="hidden xl:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => switchUser('customer')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    user?.role === 'customer'
                      ? 'bg-[#0755C9] text-white shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to customer profile"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => switchUser('admin')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    user?.role === 'admin'
                      ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to admin profile"
                >
                  Admin
                </button>
              </div>

              {/* Mobile View Toggle */}
              {setIsMobileView && !isAdminRoute && !isEmbedded && (
                <button
                  type="button"
                  onClick={() => setIsMobileView(!isMobileView)}
                  className={`hidden sm:flex items-center justify-center p-2 rounded-xl border transition-colors ${
                    isMobileView
                      ? 'bg-blue-50 text-[#0755C9] border-blue-200'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title={isMobileView ? 'Switch to Full Web View' : 'Switch to Phone Simulator Frame'}
                >
                  {isMobileView ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                </button>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer select-none"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
              </button>

            </div>

          </div>
        </div>

        {/* 4. MOBILE SLIDE-DOWN DRAWER & BACKDROP */}
        {mobileMenuOpen && (
          <>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-16 sm:top-20 bg-slate-950/60 backdrop-blur-xs z-30 lg:hidden transition-opacity"
              aria-hidden="true"
            />
            <div className="lg:hidden relative z-40 bg-white border-b border-slate-200 px-5 pt-3 pb-8 space-y-4 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto no-scrollbar animate-in slide-in-from-top-4 duration-200">
              <nav className="flex flex-col space-y-1 text-sm font-bold text-slate-700">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/cars"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Explore Cars</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left"
                >
                  <span>Contact & Support</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left text-slate-600"
                >
                  <span>FAQs & Help</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>My Bookings</span>
                  <Calendar className="w-4 h-4 text-[#0755C9]" />
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 rounded-xl hover:bg-blue-50 flex items-center justify-between text-[#0755C9]"
                >
                  <span>Admin Dashboard</span>
                  <Shield className="w-4 h-4" />
                </Link>
              </nav>

              {/* Mobile Auth actions */}
              {!user ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-xl border border-slate-200 text-xs font-black text-slate-800 text-center hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-xl bg-[#0755C9] text-white text-xs font-black text-center shadow-md shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.99] transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0755C9&color=fff`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-800 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{user.role || 'Customer'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {/* Quick 24/7 Helpline */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">24/7 Roadside Hotline</span>
                <a href="tel:+97714428900" className="font-mono font-bold text-[#0755C9] hover:underline">
                  +977 1-4428900
                </a>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
