import React, { useState } from 'react';
import { Phone, CalendarCheck, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop for closing the menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 sm:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] pb-safe">
        
        {/* Expanding Menu */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${isOpen ? 'max-h-48 border-b border-gray-100' : 'max-h-0'}`}>
          <div className="flex flex-col p-3 gap-2">
            <Link to="/packages" onClick={() => setIsOpen(false)} className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100">
              Book Tours
            </Link>
            <Link to="/treks" onClick={() => setIsOpen(false)} className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100">
              Book Treks
            </Link>
            <Link to="/vehicles" onClick={() => setIsOpen(false)} className="bg-gray-50 text-gray-800 py-3 rounded-xl text-base font-bold text-center border border-gray-100">
              Book Vehicles
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between p-3 gap-3">
          <a href="tel:+9779767476521" className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-[#1e3a8a] py-3.5 rounded-xl font-bold active:scale-95 transition-transform">
            <Phone size={18} />
            Call Us
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#e53a24] text-white py-3.5 rounded-xl font-bold shadow-md active:scale-95 transition-all"
          >
            <CalendarCheck size={18} />
            Book Now
            <ChevronUp size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
