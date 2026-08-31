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
      
      // Format region display names cleaner if they are just the raw names
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
            Explore Trekking Regions
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl mx-auto font-medium">
            Find the perfect Himalayan trek categorized by the world's most famous trekking regions.
          </p>
        </div>

        {/* Country Switcher Tabs */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {availableCountries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeCountry === country
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'text-[#64748B] bg-white border border-slate-200 hover:bg-slate-50'
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
              return (
                <Link 
                  key={region.slug} 
                  to={targetUrl} 
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-slate-150 relative shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={region.image || 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800'} 
                      alt={region.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Title & Count */}
                  <div className="mt-3">
                    <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                      {region.displayName}
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      {region.count > 0 ? `${region.count} Packages` : '0 Packages'}
                    </p>
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
