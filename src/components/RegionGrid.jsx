import React from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const RegionGrid = () => {
  const { regions, tourTrips } = useAppData();

  if (!regions || regions.length === 0) return null;

  return (
    <div className="py-16 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center uppercase">Explore By Region</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {regions.map(region => {
            const count = (Array.isArray(tourTrips) ? tourTrips : []).filter(t => t.region === region.name).length;
            return (
              <Link to={`/region/${region.slug}`} key={region.id} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  {region.image ? (
                    <img 
                      src={region.image} 
                      alt={region.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 border-t border-gray-100">
                  <h3 className="text-[17px] font-bold text-gray-800 uppercase tracking-wide group-hover:text-[#e53a24] transition-colors">{region.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{count} Packages</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegionGrid;
