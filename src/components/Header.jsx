import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Search, ChevronDown, ChevronRight, Mail } from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal';
import MegaMenu from './MegaMenu';
import { megaMenuData } from '../data/navigationData';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileBookOpen, setIsMobileBookOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState(null);
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return isActive 
      ? "text-sm font-bold text-[#e53a24] border-b-2 border-[#e53a24] pb-1"
      : "text-sm font-bold text-gray-700 hover:text-[#e53a24] transition-colors";
  };

  const getMobileLinkClass = (path) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return isActive
      ? "text-base font-bold text-[#e53a24]"
      : "text-base font-bold text-gray-800";
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/85 shadow-sm flex justify-between items-center px-4 md:px-12 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-3" onClick={() => {
            setIsMobileMenuOpen(false);
            if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <img src="/logo.jpg" alt="Zenex Rental" className="h-12 w-12 rounded-full object-cover drop-shadow-sm border-2 border-white" />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[#1e3a8a] text-lg sm:text-xl tracking-tight">
                Zenex Travels
              </span>
              <span className="text-xs text-[#e53a24] font-semibold mt-0.5">
                and Tours
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className={getLinkClass('/')} onClick={() => {
            if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>Home</Link>
          
          <Link to="/treks" className={getLinkClass('/treks')}>Treks</Link>
          <Link to="/tours" className={getLinkClass('/tours')}>Tours</Link>
          <Link to="/vehicles" className={getLinkClass('/vehicles')}>Vehicles</Link>
          <Link to="/destinations" className={getLinkClass('/destinations')}>Destinations</Link>
          <Link to="/blogs" className={getLinkClass('/blogs')}>Blogs</Link>
          <Link to="/about" className={getLinkClass('/about')}>About</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Talk to Janardhan WhatsApp & Call Widget Dropdown */}
          <div className="hidden xl:flex items-center gap-3 mr-2 shrink-0">
            <div className="relative group">
              <div className="flex items-center gap-3 hover:opacity-95 transition-opacity select-none cursor-pointer py-1.5 px-2.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100">
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.332a9.936 9.936 0 004.93 1.302c5.506 0 9.99-4.478 9.99-9.985S17.519 2 12.012 2zm0 18.29a8.275 8.275 0 01-4.218-1.155l-.302-.18-3.13.82.836-3.05-.198-.316a8.278 8.278 0 01-1.268-4.426c.001-4.57 3.72-8.29 8.29-8.29s8.29 3.72 8.29 8.29-3.719 8.29-8.288 8.29zm4.55-6.2c-.25-.124-1.477-.727-1.705-.81-.228-.083-.393-.124-.559.124-.166.248-.641.81-.786.973-.145.163-.29.182-.539.058a6.8 6.8 0 01-1.996-1.232 7.487 7.487 0 01-1.383-1.722c-.145-.248-.015-.382.11-.506.113-.112.25-.29.374-.435.124-.145.166-.248.25-.414.083-.166.04-.31-.02-.435-.06-.124-.559-1.347-.766-1.844-.2-.486-.403-.42-.559-.427h-.477a.92.92 0 00-.663.31c-.228.248-.87.85-.87 2.07s.89 2.4 1.014 2.565c.124.166 1.752 2.675 4.244 3.75.592.256 1.055.409 1.414.523.596.19 1.138.163 1.567.099.478-.072 1.477-.604 1.684-1.159.207-.555.207-1.03.145-1.13-.062-.099-.228-.155-.477-.28z"/>
                    </svg>
                    <span className="text-[10px] font-bold text-gray-500">Talk to Janardhan</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[13px] font-black text-gray-700 tracking-tight">+977 9860156046</span>
                    <ChevronDown size={11} className="text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                  </div>
                </div>
                <img 
                  src="/images/zenexexpert.png" 
                  alt="Janardhan Gautam" 
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                />
              </div>

              {/* Contact Dropdown Options */}
              <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50">
                <div className="absolute -top-3 right-0 w-full h-3 bg-transparent"></div>
                <div className="flex flex-col py-2.5 divide-y divide-gray-50">
                  <div className="px-4 py-1.5 pb-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Travel Expert</p>
                    <p className="text-xs font-bold text-gray-800 mt-0.5">Janardhan Gautam</p>
                  </div>
                  <div className="py-1">
                    <a 
                      href="https://wa.me/9779860156046?text=Hi%20Janardhan,%20I'd%20like%20to%20inquire%20about%20a%20trip/vehicle!"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      <svg className="w-4 h-4 text-green-500 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.332a9.936 9.936 0 004.93 1.302c5.506 0 9.99-4.478 9.99-9.985S17.519 2 12.012 2zm0 18.29a8.275 8.275 0 01-4.218-1.155l-.302-.18-3.13.82.836-3.05-.198-.316a8.278 8.278 0 01-1.268-4.426c.001-4.57 3.72-8.29 8.29-8.29s8.29 3.72 8.29 8.29-3.719 8.29-8.288 8.29zm4.55-6.2c-.25-.124-1.477-.727-1.705-.81-.228-.083-.393-.124-.559.124-.166.248-.641.81-.786.973-.145.163-.29.182-.539.058a6.8 6.8 0 01-1.996-1.232 7.487 7.487 0 01-1.383-1.722c-.145-.248-.015-.382.11-.506.113-.112.25-.29.374-.435.124-.145.166-.248.25-.414.083-.166.04-.31-.02-.435-.06-.124-.559-1.347-.766-1.844-.2-.486-.403-.42-.559-.427h-.477a.92.92 0 00-.663.31c-.228.248-.87.85-.87 2.07s.89 2.4 1.014 2.565c.124.166 1.752 2.675 4.244 3.75.592.256 1.055.409 1.414.523.596.19 1.138.163 1.567.099.478-.072 1.477-.604 1.684-1.159.207-.555.207-1.03.145-1.13-.062-.099-.228-.155-.477-.28z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                    <a 
                      href="tel:+9779860156046"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#e53a24] transition-colors"
                    >
                      <Phone size={14} className="text-blue-600 shrink-0" />
                      Call Directly
                    </a>
                  </div>
                  <div className="py-1">
                    <Link 
                      to="/contact"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#e53a24] transition-colors"
                    >
                      <Mail size={14} className="text-slate-500 shrink-0" />
                      Email & Enquiry Form
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="tel:+9779860156046" className="hidden sm:flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
            <Phone size={18} />
          </a>
          

          <div className="relative group hidden sm:block">
            <button className="bg-[#e53a24] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d04b08] transition-colors shadow-md flex items-center gap-1">
              Book Now <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2">
              <div className="absolute -top-4 right-0 w-full h-4 bg-transparent"></div>
              <div className="flex flex-col py-2">
                <Link to="/tours" className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#e53a24]">Tours</Link>
                <Link to="/treks" className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#e53a24]">Treks</Link>
                <Link to="/vehicles" className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#e53a24]">Vehicles</Link>
              </div>
            </div>
          </div>

          <button 
            className="lg:hidden text-gray-700 p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-b border-gray-100 overflow-hidden flex flex-col">
          <div className="flex flex-col py-4 px-6 gap-4">

            <Link to="/" className={getMobileLinkClass('/')} onClick={() => {
              setIsMobileMenuOpen(false);
              if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Home</Link>
            
            <Link to="/treks" className={getMobileLinkClass('/treks')} onClick={() => setIsMobileMenuOpen(false)}>Treks</Link>
            <Link to="/tours" className={getMobileLinkClass('/tours')} onClick={() => setIsMobileMenuOpen(false)}>Tours</Link>
            <Link to="/vehicles" className={getMobileLinkClass('/vehicles')} onClick={() => setIsMobileMenuOpen(false)}>Vehicles</Link>
            <Link to="/destinations" className={getMobileLinkClass('/destinations')} onClick={() => setIsMobileMenuOpen(false)}>Destinations</Link>
            <Link to="/blogs" className={getMobileLinkClass('/blogs')} onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
            <Link to="/about" className={getMobileLinkClass('/about')} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="h-px bg-gray-100 my-2"></div>
            
            {/* Mobile Janardhan Chat Card */}
            <a 
              href="https://wa.me/9779860156046?text=Hi%20Janardhan,%20I'd%20like%20to%20inquire%20about%20a%20trip/vehicle!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-green-50/40 hover:bg-green-50 rounded-2xl border border-green-100/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img 
                  src="/images/zenexexpert.png" 
                  alt="Janardhan Gautam" 
                  className="w-11 h-11 rounded-full object-cover border border-white shadow-sm"
                />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.332a9.936 9.936 0 004.93 1.302c5.506 0 9.99-4.478 9.99-9.985S17.519 2 12.012 2zm0 18.29a8.275 8.275 0 01-4.218-1.155l-.302-.18-3.13.82.836-3.05-.198-.316a8.278 8.278 0 01-1.268-4.426c.001-4.57 3.72-8.29 8.29-8.29s8.29 3.72 8.29 8.29-3.719 8.29-8.288 8.29zm4.55-6.2c-.25-.124-1.477-.727-1.705-.81-.228-.083-.393-.124-.559.124-.166.248-.641.81-.786.973-.145.163-.29.182-.539.058a6.8 6.8 0 01-1.996-1.232 7.487 7.487 0 01-1.383-1.722c-.145-.248-.015-.382.11-.506.113-.112.25-.29.374-.435.124-.145.166-.248.25-.414.083-.166.04-.31-.02-.435-.06-.124-.559-1.347-.766-1.844-.2-.486-.403-.42-.559-.427h-.477a.92.92 0 00-.663.31c-.228.248-.87.85-.87 2.07s.89 2.4 1.014 2.565c.124.166 1.752 2.675 4.244 3.75.592.256 1.055.409 1.414.523.596.19 1.138.163 1.567.099.478-.072 1.477-.604 1.684-1.159.207-.555.207-1.03.145-1.13-.062-.099-.228-.155-.477-.28z"/>
                    </svg>
                    Talk to Janardhan
                  </span>
                  <span className="text-sm font-bold text-gray-800 mt-0.5">+977 9860156046</span>
                </div>
              </div>
              <span className="bg-[#00a859] text-white text-xs font-bold px-3 py-1.5 rounded-xl">Chat</span>
            </a>

            <div className="h-px bg-gray-100 my-2"></div>
            <a href="tel:+9779860156046" className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Phone size={18} /> Call Us
            </a>

            <div className="mt-2">
              <button 
                className="w-full bg-[#e53a24] text-white py-3 rounded-xl text-base font-bold text-center flex justify-center items-center gap-2"
                onClick={() => setIsMobileBookOpen(!isMobileBookOpen)}
              >
                Book Now <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileBookOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileBookOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-2">
                  <Link to="/tours" className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Book Tours</Link>
                  <Link to="/treks" className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Book Treks</Link>
                  <Link to="/vehicles" className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Book Vehicles</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
