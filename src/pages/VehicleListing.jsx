import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Users, Gauge, Fuel, Filter, X, MapPin, Calendar, Briefcase, Star } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';

const VehicleListing = () => {
  const { vehicles } = useAppData();
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') || 'All';
  const pickup = searchParams.get('pickup');
  const dropoff = searchParams.get('dropoff');
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  const [filterType, setFilterType] = useState(searchType);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (searchType && searchType !== 'All') {
      setFilterType(searchType);
    }
  }, [searchType]);

  const filteredVehicles = filterType === 'All' ? vehicles : vehicles.filter(v => v.type === filterType);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-8">
        
        {pickup && dropoff && (
          <div className="bg-surface-container-low border border-sky-tint rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-himalayan-blue">
                <MapPin size={20} />
                <span className="font-bold">{pickup} <span className="text-on-surface-variant font-normal mx-1">→</span> {dropoff}</span>
              </div>
              {(start || end) && (
                <div className="flex items-center gap-2 text-himalayan-blue">
                  <Calendar size={20} />
                  <span className="font-bold">{start || 'Any Date'} <span className="text-on-surface-variant font-normal mx-1">-</span> {end || 'Any Date'}</span>
                </div>
              )}
            </div>
            <Link to="/" className="text-sm font-bold text-sunset-orange hover:underline">Modify Search</Link>
          </div>
        )}

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-himalayan-blue mb-2">Our Fleet</h1>
            <p className="text-on-surface-variant font-medium">Choose the perfect vehicle for your Himalayan adventure.</p>
          </div>
          <button 
            className="md:hidden flex items-center gap-2 bg-surface-container-low text-himalayan-blue px-4 py-2 rounded-lg font-bold border border-sky-tint"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter size={20} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className={`fixed inset-0 z-50 bg-black/50 md:hidden transition-opacity ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMobileFilters(false)}></div>
          
          <div className={`fixed md:static inset-y-0 left-0 w-3/4 max-w-sm bg-white md:bg-transparent z-50 p-6 md:p-0 md:w-1/4 transition-transform duration-300 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="font-headline-md text-xl font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}><X size={24} className="text-on-surface-variant" /></button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint sticky top-24">
              <h3 className="font-headline-md text-lg font-bold mb-4 border-b border-outline-variant/30 pb-2">Vehicle Type</h3>
              <div className="space-y-2">
                {['All', 'Economy', 'SUV / 4x4', 'Luxury', 'Van / Micro', 'EV'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input 
                      type="radio" 
                      name="vType" 
                      className="w-4 h-4 text-himalayan-blue bg-surface-container border-outline-variant focus:ring-himalayan-blue"
                      checked={filterType === type}
                      onChange={() => setFilterType(type)}
                    />
                    <span className="text-on-surface-variant font-medium group-hover:text-himalayan-blue transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map(v => (
              <div key={v.id} className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img alt={v.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" src={v.img} />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-himalayan-blue px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{v.type}</span>
                  {v.rating && (
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-himalayan-blue px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                      <Star size={12} className="text-sunset-orange fill-current" /> {v.rating}
                    </div>
                  )}
                  {v.urgency && (
                    <span className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                      v.urgency === 'High Demand' ? 'bg-sunset-orange text-white animate-pulse' :
                      v.urgency === 'Limited Availability' ? 'bg-yellow-400 text-yellow-900' :
                      'bg-green-500 text-white'
                    }`}>
                      {v.urgency === 'High Demand' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      {v.urgency}
                    </span>
                  )}
                </div>
                <h4 className="font-headline-md text-lg text-on-surface">{v.name}</h4>
                <div className="flex items-center gap-1 text-sunset-orange font-bold text-xl mt-1 mb-4">
                  {formatPrice(v.price)} <span className="text-sm text-on-surface-variant font-normal">/ day</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-6 mt-auto">
                  <div className="flex flex-col items-center justify-center bg-surface-container-low rounded-lg p-2 text-on-surface-variant">
                    <Users size={16} className="mb-1 text-himalayan-blue" />
                    <span className="text-xs font-bold">{v.pax} Seats</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-surface-container-low rounded-lg p-2 text-on-surface-variant">
                    <Gauge size={16} className="mb-1 text-himalayan-blue" />
                    <span className="text-xs font-bold">{v.trans}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-surface-container-low rounded-lg p-2 text-on-surface-variant">
                    <Briefcase size={16} className="mb-1 text-himalayan-blue" />
                    <span className="text-xs font-bold">{v.luggage || 2} Bags</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-surface-container-low rounded-lg p-2 text-on-surface-variant">
                    <Fuel size={16} className="mb-1 text-himalayan-blue" />
                    <span className="text-xs font-bold">{v.fuel}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/vehicles/${v.id}`} className="flex-1 text-center py-3 border border-himalayan-blue text-himalayan-blue rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">Details</Link>
                  <Link to={`/checkout?car=${v.id}`} className="flex-1 text-center py-3 bg-himalayan-blue text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors shadow-md">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
