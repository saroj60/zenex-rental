import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { Heart, MapPin, Clock, ArrowRight, ChevronDown, Star } from 'lucide-react';

const DurationWiseTourCategories = () => {
  const { packages, tourTrips } = useAppData();
  const [activeDuration, setActiveDuration] = useState(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Get all tours from packages and tourTrips
  const allTours = useMemo(() => {
    const mappedTourTrips = (tourTrips || [])
      .filter(t => t.status === 'Published' && (t.category === 'Tours' || t.category === 'Tours Packages'))
      .map(t => ({
        id: t.slug || t.id,
        title: t.title,
        img: t.image || t.img || 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=600',
        price: t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : (t.price ? `US$${t.price}` : null),
        location: t.destination || 'Nepal',
        isTourTrip: true
      }));
    const standardPackages = (packages || []).filter(p => p.category === 'Tours' && !mappedTourTrips.some(m => m.title === p.title));
    return [...mappedTourTrips, ...standardPackages];
  }, [packages, tourTrips]);

  // Extract unique days from titles
  const availableDurations = useMemo(() => {
    const days = new Set();
    allTours.forEach(tour => {
      const match = tour.title.match(/^(\d+)\s+Days?/i);
      if (match) {
        days.add(parseInt(match[1], 10));
      }
    });
    
    // Sort days ascending
    let sortedDays = Array.from(days).sort((a, b) => a - b);
    
    // Fallback if none found
    if (sortedDays.length === 0) {
      sortedDays = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }
    return sortedDays;
  }, [allTours]);

  useEffect(() => {
    if (availableDurations.length > 0 && !availableDurations.includes(activeDuration)) {
      setActiveDuration(availableDurations[0]);
    }
  }, [availableDurations, activeDuration]);

  // Get tours for the active duration
  const activeTours = useMemo(() => {
    const filtered = allTours.filter(tour => {
      const match = tour.title.match(/^(\d+)\s+Days?/i);
      return match && parseInt(match[1], 10) === activeDuration;
    });
    
    // Fallback data for preview purposes
    if (filtered.length === 0 && allTours.length === 0) {
      return [
        { title: `${activeDuration} Days Luxury Kathmandu & Pokhara Tour`, location: 'Nepal', price: 'US$750', id: 'ktm-pokhara' },
        { title: `${activeDuration} Days Kathmandu, Chitwan & Nagarkot Tour`, location: 'Nepal', price: 'US$850', id: 'ktm-chitwan-nagarkot' },
        { title: `${activeDuration} Days Everest Base Camp Trek`, location: 'Nepal', price: 'US$1200', id: 'ebc' },
        { title: `${activeDuration} Days Annapurna Circuit Experience`, location: 'Nepal', price: 'US$950', id: 'abc' },
        { title: `${activeDuration} Days Bhutan Cultural Tour`, location: 'Bhutan', price: 'US$1500', id: 'bhutan-culture' }
      ];
    }
    return filtered;
  }, [allTours, activeDuration]);

  return (
    <div className="w-full bg-[#F8FAFC] py-16 font-sans">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden w-full">
            <button 
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full flex items-center justify-between bg-white px-5 py-4 rounded-[16px] shadow-sm text-[#172033] font-semibold border border-gray-100"
            >
              <span>Filter & Duration</span>
              <ChevronDown size={20} className={`transition-transform duration-300 ${mobileFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mobile Dropdown Menu */}
            {mobileFilterOpen && (
              <div className="mt-2 bg-white rounded-[16px] shadow-lg border border-gray-100 p-4 absolute z-20 left-4 right-4 sm:left-6 sm:right-6">
                <h3 className="text-xs font-bold text-[#64748B] tracking-wider mb-3 px-2">TOUR DURATION</h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableDurations.map((days) => (
                    <button
                      key={days}
                      onClick={() => {
                        setActiveDuration(days);
                        setMobileFilterOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-[14px] font-medium rounded-xl transition-all ${
                        activeDuration === days
                          ? 'bg-[#142B5F] text-white shadow-md'
                          : 'text-[#64748B] bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <div className="bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50 p-6 sticky top-24">
              <h3 className="text-[11px] font-extrabold text-[#64748B] uppercase tracking-[0.15em] mb-4 pl-3">
                Tour Duration
              </h3>
              <ul className="flex flex-col gap-1.5 mb-6">
                {availableDurations.map((days) => (
                  <li key={days}>
                    <button
                      onClick={() => setActiveDuration(days)}
                      className={`relative w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-300 overflow-hidden group ${
                        activeDuration === days
                          ? 'bg-[#142B5F] text-white shadow-md'
                          : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#172033]'
                      }`}
                    >
                      {/* Active Indicator Line */}
                      <span className={`absolute left-0 top-0 bottom-0 w-1 bg-[#E59A2F] transition-opacity duration-300 ${activeDuration === days ? 'opacity-100' : 'opacity-0'}`}></span>
                      
                      <span className="pl-1">{days} Days</span>
                      
                      <ArrowRight size={16} className={`transition-transform duration-300 ${activeDuration === days ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-[#0F766E]'}`} />
                    </button>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/packages" 
                className="w-full flex items-center justify-center gap-2 px-5 py-4 text-[14px] font-bold text-white bg-[#142B5F] rounded-xl hover:bg-[#10224b] transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                View All Tours 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:flex-1">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
              <div>
                <h2 className="text-[28px] sm:text-[32px] text-[#172033] font-bold tracking-tight mb-2">
                  {activeDuration} Days Tours in Nepal
                </h2>
                <p className="text-[#64748B] text-[15px] max-w-xl">
                  Explore our handpicked Nepal tour packages designed for unforgettable experiences.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm font-medium text-[#64748B] bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hidden sm:inline-block">
                  {activeTours.length} packages
                </span>
                <Link to="/packages" className="group flex items-center gap-1.5 text-[14px] font-semibold text-[#64748B] hover:text-[#142B5F] transition-colors">
                  View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[28px]">
              {activeTours.length > 0 ? (
                activeTours.map((tour, idx) => (
                  <Link
                    key={idx}
                    to={`/tour/${tour.id || tour.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group flex flex-col bg-white rounded-[20px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] border border-transparent hover:border-gray-50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  >
                    {/* Image Area */}
                    <div className="relative h-[230px] overflow-hidden bg-gray-100">
                      <img 
                        src={tour.img || tour.image || 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800'} 
                        alt={tour.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Save Button */}
                      <button className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md text-[#142B5F] hover:text-[#E59A2F] transition-colors z-10 group/btn">
                        <Heart size={16} className="group-hover/btn:fill-current transition-all" />
                      </button>

                      {/* Price Badge */}
                      {tour.price && (
                        <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 z-10">
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">From</span>
                          <span className="font-extrabold text-[#142B5F] text-[14px]">{tour.price}</span>
                        </div>
                      )}
                      
                      {/* Hover Arrow Overlay */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <ArrowRight size={18} className="text-[#142B5F]" />
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Destination Label */}
                      <div className="text-[11px] font-extrabold text-[#0F766E] uppercase tracking-widest mb-2.5">
                         {tour.location || 'Nepal'}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-[18px] font-bold text-[#172033] leading-snug group-hover:text-[#142B5F] transition-colors line-clamp-2 mb-4">
                        {tour.title}
                      </h3>
                      
                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-[#64748B] mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-[#0F766E]/70" />
                          <span>{activeDuration} Days</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-[#0F766E]/70" />
                          <span className="truncate max-w-[120px]">{tour.location || 'Nepal'}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer Area */}
                    <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} className="fill-[#E59A2F] text-[#E59A2F]" />
                        ))}
                      </div>
                      <span className="text-[13px] font-bold text-[#142B5F] group-hover:text-[#E59A2F] flex items-center gap-1 transition-colors">
                        View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                  </Link>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-16 bg-white rounded-[20px] border border-gray-100 shadow-sm">
                  <p className="text-[#64748B] text-[15px]">No tours found for this duration.</p>
                  <button onClick={() => setActiveDuration(4)} className="mt-4 text-[#142B5F] font-semibold hover:underline">
                    Back to 4 Days Tours
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DurationWiseTourCategories;
