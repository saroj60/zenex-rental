import React from 'react';
import { Users, Gauge, Fuel, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const BusPricingCard = () => {
  const { formatPrice } = useCurrency();

  const handleBook = () => {
    const message = `Hi Zenex Travel, I'm interested in booking a Tourist Bus (30-35 Seater). Could you please provide more details on availability?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint hover:shadow-md transition-shadow group flex flex-col w-full max-w-sm mx-auto mb-12">
      <Link to="/vehicles/bus-routes" className="relative overflow-hidden rounded-lg mb-4 block cursor-pointer">
        <img 
          alt="Tourist Bus" 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600" 
          onError={(e) => { e.target.onerror = null; e.target.src = '/images/economy_car.png'; }} 
        />
        <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#1e3a8a] shadow-sm">
          Bus
        </span>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 text-[#1e3a8a]">
          <Star size={12} className="text-[#e53a24] fill-current" /> 4.6
        </div>
      </Link>
      
      <h3 className="font-headline-md text-2xl font-bold text-gray-900 mb-1">Tourist Bus</h3>
      <div className="flex items-center gap-1.5 mb-4">
        <span className="text-gray-500 text-sm font-medium">Starting from</span>
        <span className="text-xl font-bold text-[#e53a24]">{formatPrice(15000)}</span>
        <span className="text-gray-500 text-sm font-medium">/ Day</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6 mt-auto">
        <div className="bg-[#f0f4f8] rounded-xl p-3 text-center flex flex-col items-center justify-center">
          <Users size={18} className="text-[#1e3a8a] mb-1.5" />
          <span className="text-sm font-semibold text-[#1e3a8a]">30-35 Seats</span>
        </div>
        <div className="bg-[#f0f4f8] rounded-xl p-3 text-center flex flex-col items-center justify-center">
          <Gauge size={18} className="text-[#1e3a8a] mb-1.5" />
          <span className="text-sm font-semibold text-[#1e3a8a]">Manual</span>
        </div>
        <div className="bg-[#f0f4f8] rounded-xl p-3 text-center flex flex-col items-center justify-center">
          <Fuel size={18} className="text-[#1e3a8a] mb-1.5" />
          <span className="text-sm font-semibold text-[#1e3a8a]">Diesel</span>
        </div>
        <div className="bg-[#f0f4f8] rounded-xl p-3 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <span className="material-symbols-outlined text-[#1e3a8a] mb-1.5 text-[18px]">luggage</span>
          <span className="text-sm font-semibold text-[#1e3a8a]">20+ Bags</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <Link 
          to={`/vehicles/bus-routes`} 
          className="w-full py-3 rounded-xl border-2 border-[#1e3a8a] text-[#1e3a8a] font-bold text-sm hover:bg-[#1e3a8a] hover:text-white transition-colors text-center"
        >
          View Details
        </Link>
        <button 
          onClick={handleBook}
          className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1ebd5a] transition-colors shadow-sm flex justify-center items-center gap-2"
        >
          <MessageCircle size={18} /> Book via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default BusPricingCard;
