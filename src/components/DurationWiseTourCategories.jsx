import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { Heart, MapPin, Clock, ArrowRight, ChevronDown, Star } from 'lucide-react';

const DurationWiseTourCategories = () => {
  const { packages, tourTrips } = useAppData();
  const [activeDuration, setActiveDuration] = useState(4);
  const [activeCountry, setActiveCountry] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const countries = ['All', 'Nepal', 'Bhutan', 'Tibet'];

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

  // Filter by country
  const filteredByCountry = useMemo(() => {
    if (activeCountry === 'All') return allTours;
    return allTours.filter(tour => {
      const loc = (tour.location || '').toLowerCase();
      const title = (tour.title || '').toLowerCase();
      const c = activeCountry.toLowerCase();
      return loc.includes(c) || title.includes(c);
    });
  }, [allTours, activeCountry]);

  // Extract unique days from titles
  const availableDurations = useMemo(() => {
    const days = new Set();
    filteredByCountry.forEach(tour => {
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
  }, [filteredByCountry]);

  useEffect(() => {
    if (availableDurations.length > 0 && !availableDurations.includes(activeDuration)) {
      setActiveDuration(availableDurations[0]);
    }
  }, [availableDurations, activeDuration]);

  // Get tours for the active duration
  const activeTours = useMemo(() => {
    const filtered = filteredByCountry.filter(tour => {
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
  }, [filteredByCountry, activeDuration, allTours.length]);

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
                
                <h3 className="text-xs font-bold text-[#64748B] tracking-wider mb-3 px-2">DESTINATION</h3>
                <div className="flex flex-wrap gap-2 mb-6 px-2">
                 {countries.map(c => (
                   <button 
                     key={c}
                     onClick={() => setActiveCountry(c)}
                     className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                       activeCountry === c 
                         ? 'bg-gradient-to-r from-orange-500 to-[#E59A2F] text-white shadow-sm border-transparent' 
                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                     }`}
                   >
                     {c}
                   </button>
                 ))}
                </div>

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
                          ? 'bg-gradient-to-r from-blue-700 to-indigo-850 text-white shadow-md'
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
            <div className="bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-100 p-6 sticky top-24">
              
              <h3 className="text-[11px] font-extrabold text-[#64748B] uppercase tracking-[0.15em] mb-4 pl-3">
                Destination
              </h3>
              <div className="flex flex-wrap gap-2 mb-8 pl-3">
                 {countries.map(c => (
                   <button 
                     key={c}
                     onClick={() => setActiveCountry(c)}
                     className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                       activeCountry === c 
                         ? 'bg-gradient-to-r from-orange-500 to-[#E59A2F] text-white border-transparent shadow-md transform scale-105' 
                         : 'bg-gray-100 text-[#64748B] hover:bg-gray-200 hover:text-gray-900 border-slate-100'
                     }`}
                   >
                     {c}
                   </button>
                 ))}
              </div>

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
                          ? 'bg-gradient-to-r from-blue-700 to-indigo-850 text-white shadow-md'
                          : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#172033]'
                      }`}
                    >
                      {/* Active Indicator Line */}
                      <span className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-[#E59A2F] transition-opacity duration-300 ${activeDuration === days ? 'opacity-100' : 'opacity-0'}`}></span>
                      
                      <span className="pl-1">{days} Days</span>
                      
                      <ArrowRight size={16} className={`transition-transform duration-300 ${activeDuration === days ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-[#0F766E]'}`} />
                    </button>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/packages" 
                className="w-full flex items-center justify-center gap-2 px-5 py-4 text-[14px] font-bold text-white bg-gradient-to-r from-[#1e3a8a] to-blue-750 rounded-xl hover:from-blue-900 hover:to-indigo-950 transition-all duration-300 shadow-sm hover:shadow-md group"
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
                  {activeDuration} Days Tours in <span className="text-orange-600 font-extrabold">{activeCountry === 'All' ? 'Nepal & Beyond' : activeCountry}</span>
                </h2>
                <p className="text-[#64748B] text-[15px] max-w-xl">
                  Explore our handpicked tour packages designed for unforgettable experiences.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm font-medium text-slate-700 bg-orange-55/40 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm hidden sm:inline-block">
                  {activeTours.length} packages
                </span>
                <Link to="/packages" className="group flex items-center gap-1.5 text-[14px] font-semibold text-[#64748B] hover:text-[#1e3a8a] transition-colors">
                  View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-[28px]">
              {activeTours.length > 0 ? (
                activeTours.map((tour, idx) => (
                  <Link
                    key={idx}
                    to={`/tour/${tour.id || tour.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group flex flex-col bg-white rounded-[16px] sm:rounded-[20px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(229,154,47,0.14)] border border-slate-100 hover:border-orange-500/20 overflow-hidden transition-all duration-300 sm:hover:-translate-y-1.5"
                  >
                    {/* Image Area */}
                    <div className="relative h-[200px] sm:h-[230px] overflow-hidden bg-slate-50">
                      <img 
                        src={tour.img || tour.image || 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800'} 
                        alt={tour.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"></div>
                      
                      {/* Save Button */}
                      <button className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow-md text-[#1e3a8a] hover:text-[#E59A2F] transition-colors z-10 group/btn">
                        <Heart size={14} className="sm:w-4 sm:h-4 group-hover/btn:fill-current transition-all" />
                      </button>

                      {/* Price Badge (Vibrant Orange Gradient) */}
                      {tour.price && (
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-orange-500 to-[#E59A2F] text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-md flex items-center gap-1 z-10 border border-white/20">
                          <span className="text-[9px] sm:text-[10px] font-bold text-orange-100 uppercase tracking-wider">From</span>
                          <span className="font-black text-white text-[13px] sm:text-[14px]">{tour.price}</span>
                        </div>
                      )}
                      
                      {/* Hover Arrow Overlay */}
                      <div className="hidden sm:flex absolute bottom-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full items-center justify-center shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <ArrowRight size={18} className="text-[#1e3a8a]" />
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                      {/* Dynamic Country Pill Badge */}
                      <div className="mb-2">
                        {(() => {
                          const country = (tour.location || 'Nepal').trim();
                          let colorClass = 'bg-blue-50 text-blue-750 border-blue-200/50';
                          if (country.toLowerCase().includes('nepal')) {
                            colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-250/50';
                          } else if (country.toLowerCase().includes('tibet')) {
                            colorClass = 'bg-orange-50 text-orange-700 border-orange-250/50';
                          } else if (country.toLowerCase().includes('bhutan')) {
                            colorClass = 'bg-purple-50 text-purple-750 border-purple-250/50';
                          } else if (country.toLowerCase().includes('india')) {
                            colorClass = 'bg-rose-50 text-rose-700 border-rose-250/50';
                          }
                          return (
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest border ${colorClass}`}>
                              {country}
                            </span>
                          );
                        })()}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-[16px] sm:text-[18px] font-bold text-[#172033] leading-snug group-hover:text-[#1e3a8a] transition-colors line-clamp-2 mb-3 sm:mb-4">
                        {tour.title}
                      </h3>
                      
                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] font-medium text-[#64748B] mt-auto">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <Clock size={14} className="text-[#0F766E]/70" />
                          <span>{activeDuration} Days</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <MapPin size={14} className="text-[#0F766E]/70" />
                          <span className="truncate max-w-[140px] sm:max-w-[120px]">{tour.location || 'Nepal'}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer Area */}
                    <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} className="fill-[#E59A2F] text-[#E59A2F]" />
                        ))}
                      </div>
                      <span className="text-[12px] sm:text-[13px] font-bold text-[#1e3a8a] group-hover:text-[#E59A2F] flex items-center gap-1 transition-colors">
                        View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                  </Link>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-12 sm:py-16 bg-white rounded-[16px] sm:rounded-[20px] border border-gray-100 shadow-sm">
                  <p className="text-[#64748B] text-[14px] sm:text-[15px]">No tours found for this duration.</p>
                  <button onClick={() => setActiveDuration(4)} className="mt-4 text-[#1e3a8a] font-semibold hover:underline text-sm sm:text-base">
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
