import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';
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
    <header className={`fixed top-4 left-0 right-0 z-50 px-4 md:px-8 w-full max-w-7xl mx-auto transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}`}>
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex justify-between items-center px-6 py-3 border border-white/20">
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
          
          <Link to="/destinations" className={getLinkClass('/destinations')}>Destinations</Link>
          <Link to="/treks" className={getLinkClass('/treks')}>Treks</Link>
          <Link to="/packages" className={getLinkClass('/packages')}>Tours</Link>
          <Link to="/vehicles" className={getLinkClass('/vehicles')}>Vehicles</Link>
          <Link to="/blogs" className={getLinkClass('/blogs')}>Blogs</Link>
          <Link to="/about" className={getLinkClass('/about')}>About</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">


          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Search size={18} />
          </button>

          <a href="tel:+9779767476521" className="hidden sm:flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
            <Phone size={18} />
          </a>
          

          <div className="relative group hidden sm:block">
            <button className="bg-[#e53a24] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d04b08] transition-colors shadow-md flex items-center gap-1">
              Book Now <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2">
              <div className="absolute -top-4 right-0 w-full h-4 bg-transparent"></div>
              <div className="flex flex-col py-2">
                <Link to="/packages" className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#e53a24]">Tours</Link>
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
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="flex flex-col py-4 px-6 gap-4">

            <Link to="/" className={getMobileLinkClass('/')} onClick={() => {
              setIsMobileMenuOpen(false);
              if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Home</Link>
            
            <Link to="/destinations" className={getMobileLinkClass('/destinations')} onClick={() => setIsMobileMenuOpen(false)}>Destinations</Link>
            <Link to="/treks" className={getMobileLinkClass('/treks')} onClick={() => setIsMobileMenuOpen(false)}>Treks</Link>
            <Link to="/packages" className={getMobileLinkClass('/packages')} onClick={() => setIsMobileMenuOpen(false)}>Tours</Link>
            <Link to="/vehicles" className={getMobileLinkClass('/vehicles')} onClick={() => setIsMobileMenuOpen(false)}>Vehicles</Link>
            <Link to="/blogs" className={getMobileLinkClass('/blogs')} onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
            <Link to="/about" className={getMobileLinkClass('/about')} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="h-px bg-gray-100 my-2"></div>
            <a href="tel:+9779767476521" className="text-base font-bold text-gray-800 flex items-center gap-2">
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
                  <Link to="/packages" className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Book Tours</Link>
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
