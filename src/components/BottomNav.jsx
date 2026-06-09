import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center justify-between p-3 gap-3">
        <a href="tel:+9779800000000" className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-[#1e3a8a] py-3.5 rounded-xl font-bold active:scale-95 transition-transform">
          <Phone size={18} />
          Call Us
        </a>
        <Link to="/checkout" className="flex-1 flex items-center justify-center gap-2 bg-[#EA580C] text-white py-3.5 rounded-xl font-bold shadow-md active:scale-95 transition-transform">
          <CalendarCheck size={18} />
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
