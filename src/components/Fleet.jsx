import React from 'react';
import { Users, Gauge, Fuel, ArrowRight, Briefcase, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';

const Fleet = () => {
  const { formatPrice } = useCurrency();
  const { vehicles } = useAppData();
  
  // Show only up to 6 vehicles on the home page fleet section
  const displayVehicles = vehicles.slice(0, 6);

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Verified Vehicles</h2>
          <p className="text-gray-500 font-medium">Choose from our premium fleet of well-maintained vehicles.</p>
        </div>
        <Link to="/vehicles" className="hidden md:flex items-center gap-2 text-[#EA580C] font-bold hover:text-[#d04b08] transition-colors">
          View All Fleet <ArrowRight size={18} />
        </Link>
      </div>
      
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x">
        {displayVehicles.map((v) => (
          <div key={v.id} className="min-w-[300px] md:min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group snap-start">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" src={v.img} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1e3a8a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                {v.type}
              </div>
              {v.rating && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1e3a8a] px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                  <Star size={12} className="text-[#EA580C] fill-current" /> {v.rating}
                </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h4 className="text-lg font-bold text-gray-900">{v.name}</h4>
              <div className="flex items-end gap-1 mt-1 mb-4">
                <span className="text-2xl font-extrabold text-[#EA580C]">{formatPrice(v.price)}</span>
                <span className="text-sm font-medium text-gray-500 mb-1">/day</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 font-medium mb-6 bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center gap-2"><Users size={16} className="text-[#1e3a8a]"/> {v.pax} Seats</div>
                <div className="flex items-center gap-2"><Gauge size={16} className="text-[#1e3a8a]"/> {v.trans}</div>
                <div className="flex items-center gap-2"><Briefcase size={16} className="text-[#1e3a8a]"/> {v.luggage || 2} Bags</div>
                <div className="flex items-center gap-2"><Fuel size={16} className="text-[#1e3a8a]"/> {v.fuel}</div>
              </div>
              
              <Link to={`/vehicles/${v.id}`} className="mt-auto w-full bg-[#1e3a8a] text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-[#152c6e] transition-colors shadow-md">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fleet;
