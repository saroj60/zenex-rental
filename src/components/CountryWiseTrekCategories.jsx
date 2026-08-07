import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { megaMenuData } from '../data/navigationData';
import { ChevronRight, Compass, Mountain, ArrowUpRight } from 'lucide-react';

const CountryWiseTrekCategories = () => {
  // Filter data to ONLY include treks
  const trekDestinations = megaMenuData.Destinations.map(destination => {
    const filteredCategories = destination.categories.map(category => ({
      ...category,
      links: category.links.filter(link => link.url.includes('/treks') || link.name.toLowerCase().includes('trek') || link.name.toLowerCase().includes('peak'))
    })).filter(category => category.links.length > 0);
    
    return {
      ...destination,
      categories: filteredCategories
    };
  }).filter(destination => destination.categories.length > 0);

  const [activeTab, setActiveTab] = useState(trekDestinations.length > 0 ? trekDestinations[0] : null);

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
              Trekking Regions & Trails
            </h2>
          </div>

          {/* Country Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 backdrop-blur-md">
            {trekDestinations.map((destination) => (
              <button
                key={destination.country}
                onClick={() => setActiveTab(destination)}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  activeTab.country === destination.country
                    ? 'bg-gradient-to-r from-orange-500 to-[#e53a24] text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Mountain size={15} />
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
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-orange-50/40 p-5 rounded-2xl border border-slate-200/70 hover:border-orange-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="w-8 h-8 rounded-xl bg-orange-100/80 text-orange-600 flex items-center justify-center font-bold text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      <Mountain size={16} />
                    </span>
                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                  
                  <div>
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-snug">
                      {link.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1 group-hover:text-slate-500">
                      View Packages <ChevronRight size={12} />
                    </p>
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

export default CountryWiseTrekCategories;
