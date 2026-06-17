import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, Search } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 w-full max-w-7xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex justify-between items-center px-6 py-3 border border-white/20">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Zenex Rental" className="h-12 w-auto drop-shadow-sm" />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-bold text-[#EA580C] border-b-2 border-[#EA580C] pb-1">Home</Link>
          <Link to="/vehicles" className="text-sm font-bold text-gray-700 hover:text-[#EA580C] transition-colors">Vehicles</Link>
          <Link to="/destinations" className="text-sm font-bold text-gray-700 hover:text-[#EA580C] transition-colors">Destinations</Link>
          <Link to="/packages" className="text-sm font-bold text-gray-700 hover:text-[#EA580C] transition-colors">Packages</Link>
          <Link to="/tours" className="text-sm font-bold text-gray-700 hover:text-[#EA580C] transition-colors">Tours</Link>
          <Link to="/about" className="text-sm font-bold text-gray-700 hover:text-[#EA580C] transition-colors">About</Link>
          <Link to="/contact" className="text-sm font-bold text-gray-700 hover:text-[#EA580C] transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">


          <a href="tel:+9779767476521" className="hidden sm:flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
            <Phone size={18} />
          </a>
          
          <Link to="/admin/login" className="hidden sm:flex text-sm font-bold text-[#1e3a8a] border-2 border-[#1e3a8a] px-4 py-2 rounded-lg hover:bg-[#1e3a8a] hover:text-white transition-colors">
            Login
          </Link>

          <Link to="/vehicles" className="hidden sm:flex bg-[#EA580C] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d04b08] transition-colors shadow-md">
            Book Now
          </Link>

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

            <Link to="/" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/vehicles" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Vehicles</Link>
            <Link to="/destinations" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Destinations</Link>
            <Link to="/packages" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
            <Link to="/tours" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Tours</Link>
            <Link to="/about" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-base font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="h-px bg-gray-100 my-2"></div>
            <a href="tel:+9779767476521" className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Phone size={18} /> Call Us
            </a>
            <Link to="/admin/login" className="text-base font-bold text-[#1e3a8a]" onClick={() => setIsMobileMenuOpen(false)}>Admin Login</Link>
            <Link to="/vehicles" className="bg-[#EA580C] text-white py-3 rounded-xl text-base font-bold text-center mt-2 block" onClick={() => setIsMobileMenuOpen(false)}>
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
