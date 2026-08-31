import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const TrekRegionGrid = () => {
  const { treks, tourTrips, packages, regions } = useAppData();
  const [activeCountry, setActiveCountry] = useState('Nepal');

  const availableCountries = ['Nepal', 'Tibet', 'Bhutan', 'India'];

  // Flatten all packages to count matches
  const combinedList = useMemo(() => {
    return [
      ...treks.map(t => ({
        title: t.title,
        region: t.region || t.quickFacts?.region || '',
        location: t.location || t.destination || ''
      })),
      ...tourTrips.filter(t => t.status === 'Published').map(t => ({
        title: t.title,
        region: t.region || '',
        location: t.destination || ''
      })),
      ...packages.map(p => ({
        title: p.title,
        region: p.region || p.location || '',
        location: p.location || ''
      }))
    ];
  }, [treks, tourTrips, packages]);

  // Get regions dynamically for the selected country
  const filteredRegions = useMemo(() => {
    if (!regions || regions.length === 0) return [];
    
    return regions.filter(r => {
      const countryMatch = (r.country || 'Nepal').toLowerCase() === activeCountry.toLowerCase();
      if (!countryMatch) return false;
      
      if (activeCountry === 'Nepal') {
        // Only show trekking regions for Nepal
        return r.type === 'Treks' || r.type === 'Both';
      }
      
      // Show all regions for other countries
      return true;
    });
  }, [regions, activeCountry]);

  // Calculate dynamic counts
  const regionsWithCounts = useMemo(() => {
    return filteredRegions.map(region => {
      const normalizedSlug = region.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
      const count = combinedList.filter(item => {
        const titleLower = (item.title || '').toLowerCase();
        const regProp = (item.region || '').toLowerCase();
        const locProp = (item.location || '').toLowerCase();

        return regProp.replace(/[^a-z0-9]/g, '').includes(normalizedSlug) || 
               locProp.replace(/[^a-z0-9]/g, '').includes(normalizedSlug) || 
               titleLower.replace(/[^a-z0-9]/g, '').includes(normalizedSlug);
      }).length;

      // Make name display format uppercase
      let displayName = region.name.toUpperCase();
      
      if (displayName === 'EVEREST') displayName = 'EVEREST REGION TREKS';
      else if (displayName === 'ANNAPURNA') displayName = 'ANNAPURNA REGION TREKS';
      else if (displayName === 'MANASLU') displayName = 'MANASLU REGION TREKS';
      else if (displayName === 'LANGTANG') displayName = 'LANGTANG REGION TREKS';
      else if (displayName === 'MUSTANG') displayName = 'MUSTANG REGION TREKS';
      else if (displayName === 'KANCHENJUNGA') displayName = 'KANCHENJUNGA REGION TREKS';
      else if (displayName === 'DOLPO') displayName = 'DOLPO REGION TREKS';
      else if (displayName === 'DHAULAGIRI') displayName = 'DHAULAGIRI REGION TREKS';
      else if (displayName === 'ROLWALING') displayName = 'ROLWALING REGION TREKS';
      else if (displayName === 'MAKALU') displayName = 'MAKALU REGION TREKS';
      else if (displayName === 'FAR-WEST') displayName = 'FAR-WEST REGION TREKS';

      return {
        ...region,
        displayName,
        count
      };
    });
  }, [filteredRegions, combinedList]);

  return (
    <div className="w-full bg-[#f4f9fc] py-16 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] uppercase tracking-wide">
            Explore <span className="text-orange-600 font-black">Trekking Regions</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl mx-auto font-medium">
            Find the perfect Himalayan trek categorized by the world's most famous trekking regions.
          </p>
        </div>

        {/* Country Switcher Tabs (Colorful) */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {availableCountries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeCountry === country
                  ? 'bg-gradient-to-r from-orange-500 to-[#E59A2F] text-white shadow-md border-transparent transform scale-105'
                  : 'text-[#64748B] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Grid */}
        {regionsWithCounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {regionsWithCounts.map(region => {
              const targetUrl = region.type === 'Treks' ? `/treks/region/${region.slug}` : `/region/${region.slug}`;
              
              // Color coding border highlight
              let highlightColor = 'group-hover:border-emerald-500/30';
              if (activeCountry === 'Tibet') highlightColor = 'group-hover:border-orange-500/30';
              else if (activeCountry === 'Bhutan') highlightColor = 'group-hover:border-purple-500/30';
              else if (activeCountry === 'India') highlightColor = 'group-hover:border-rose-500/30';

              return (
                <Link 
                  key={region.slug} 
                  to={targetUrl} 
                  className="group flex flex-col cursor-pointer bg-white rounded-[24px] p-3 border border-slate-100 hover:border-orange-500/20 shadow-sm hover:shadow-[0_16px_36px_-8px_rgba(229,154,47,0.18)] transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-slate-105 relative">
                    <img 
                      src={region.image || 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800'} 
                      alt={region.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Shadow Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-85 pointer-events-none"></div>
                    
                    {/* Floating Country Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-800 shadow-sm uppercase tracking-wider">
                      {region.country || activeCountry}
                    </div>
                  </div>

                  {/* Title & Count */}
                  <div className="mt-4 px-2 pb-2">
                    <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                      {region.displayName}
                    </h3>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100/60 shadow-sm">
                        {region.count > 0 ? `${region.count} Active Packages` : '0 Packages'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-lg mx-auto">
            <p className="text-slate-500 font-medium">No trekking regions found for {activeCountry}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrekRegionGrid;
