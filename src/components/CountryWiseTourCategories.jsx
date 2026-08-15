import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const CountryWiseTourCategories = () => {
  const { regions } = useAppData();
  const [activeCountry, setActiveCountry] = useState('Nepal');

  // Build country category data dynamically from database regions
  const tourData = ['Nepal', 'Tibet', 'Bhutan', 'India'].map(countryName => {
    // Fetch matching dynamic regions from database
    const dynamicRegions = (regions || [])
      .filter(r => (r.country || 'Nepal').toLowerCase() === countryName.toLowerCase() && (r.type === 'Tours' || r.type === 'Both'));

    const dynamicLinks = dynamicRegions.map(r => ({
      name: r.name,
      url: `/tours/category/${r.slug}`,
      image: r.image || 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070'
    }));

    return {
      country: countryName,
      categories: [
        {
          title: `Tours in ${countryName}`,
          links: dynamicLinks
        }
      ]
    };
  }).filter(destination => destination.categories[0].links.length > 0);

  const activeTab = tourData.find(t => t.country === activeCountry) || tourData[0];

  if (!activeTab) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 mt-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl text-white relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass size={14} className="animate-spin-slow" />
              Explore By Region
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sightseeing & Tour Regions
            </h2>
          </div>

          {/* Country Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 backdrop-blur-md">
            {tourData.map((destination) => (
              <button
                key={destination.country}
                onClick={() => setActiveCountry(destination.country)}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  activeCountry === destination.country
                    ? 'bg-gradient-to-r from-orange-500 to-[#e53a24] text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Globe size={15} />
                {destination.country}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Regions */}
      <div className="bg-slate-50/70 rounded-3xl p-6 md:p-8 border border-slate-200/80 backdrop-blur-md shadow-sm">
        {activeTab.categories.map((category) => (
          <div key={category.title}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.links.map((link) => (
                <Link
                  key={link.name}
                  to={link.url}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-orange-50/40 rounded-2xl border border-slate-200/70 hover:border-orange-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {link.image && (
                    <div className="w-full h-36 overflow-hidden relative">
                      <img src={link.image} alt={link.name} data-pin-nopin="true" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                        <ArrowUpRight size={14} className="text-slate-700 group-hover:text-orange-500 transition-colors" />
                      </div>
                    </div>
                  )}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div className="mt-1">
                      <h4 className="text-base font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-snug">
                        {link.name}
                      </h4>
                      <p className="text-xs font-medium text-slate-400 mt-2 flex items-center gap-1 group-hover:text-slate-500">
                        View Packages <ChevronRight size={12} />
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryWiseTourCategories;
