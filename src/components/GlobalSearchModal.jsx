import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, MapPin, Car, Mountain, Package } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { vehicles, destinations, packages, treks } = useAppData();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter Logic
  const lowerQuery = query.toLowerCase().trim();
  
  const filteredVehicles = lowerQuery ? vehicles.filter(v => 
    (v.name?.toLowerCase() || '').includes(lowerQuery) || 
    (v.type?.toLowerCase() || '').includes(lowerQuery)
  ).slice(0, 4) : [];

  const filteredDestinations = lowerQuery ? destinations.filter(d => 
    (d.name?.toLowerCase() || '').includes(lowerQuery) || 
    (d.desc?.toLowerCase() || '').includes(lowerQuery)
  ).slice(0, 4) : [];

  const filteredTreks = lowerQuery ? treks.filter(t => 
    (t.title?.toLowerCase() || '').includes(lowerQuery) || 
    (t.description?.toLowerCase() || '').includes(lowerQuery) ||
    (t.overview?.toLowerCase() || '').includes(lowerQuery)
  ).slice(0, 4) : [];

  // Assuming packages has title, id, category
  const filteredPackages = lowerQuery ? packages.filter(p => 
    (p.title?.toLowerCase() || '').includes(lowerQuery) || 
    (p.location?.toLowerCase() || '').includes(lowerQuery)
  ).slice(0, 4) : [];

  const handleResultClick = (path) => {
    onClose();
    navigate(path);
  };

  const hasResults = lowerQuery.length > 0 && (
    filteredVehicles.length > 0 || 
    filteredDestinations.length > 0 || 
    filteredTreks.length > 0 || 
    filteredPackages.length > 0
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-lg transition-all duration-300">
      {/* Search Header */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-12 pb-4">
        <div className="flex justify-end mb-2">
          <button 
            onClick={onClose}
            className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={22} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-white border-2 border-[#1e3a8a]/20 rounded-2xl py-3 pl-12 pr-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#e53a24] focus:ring-4 focus:ring-[#e53a24]/10 transition-all shadow-sm"
            placeholder="Search for treks, vehicles, tours..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto px-4 pb-20">
          
          {!lowerQuery && (
            <div className="text-center mt-20 text-gray-500">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl font-medium">What are you looking for?</p>
              <p className="text-sm mt-2">Try searching for "Everest", "Jeep", or "Pokhara"</p>
            </div>
          )}

          {lowerQuery && !hasResults && (
            <div className="text-center mt-20 text-gray-500">
              <p className="text-xl font-medium">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try adjusting your keywords.</p>
            </div>
          )}

          {/* Render Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            
            {/* Treks Section */}
            {filteredTreks.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a8a] mb-4 flex items-center border-b border-gray-200 pb-2">
                  <Mountain className="mr-2 text-[#e53a24]" size={20} />
                  Treks
                </h3>
                <div className="space-y-3">
                  {filteredTreks.map(trek => (
                    <button 
                      key={trek.id} 
                      onClick={() => handleResultClick(`/treks/${trek.id}`)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center group"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0 mr-4">
                        <img src={trek.image} alt={trek.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors line-clamp-1">{trek.title}</p>
                        <p className="text-xs text-gray-500">{trek.duration} • {trek.difficulty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tours Section */}
            {filteredPackages.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a8a] mb-4 flex items-center border-b border-gray-200 pb-2">
                  <Package className="mr-2 text-[#e53a24]" size={20} />
                  Tours & Packages
                </h3>
                <div className="space-y-3">
                  {filteredPackages.map(pkg => (
                    <button 
                      key={pkg.id} 
                      onClick={() => handleResultClick(`/packages/${pkg.id}`)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center group"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0 mr-4">
                        <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors line-clamp-1">{pkg.title}</p>
                        <p className="text-xs text-gray-500">{pkg.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicles Section */}
            {filteredVehicles.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a8a] mb-4 flex items-center border-b border-gray-200 pb-2">
                  <Car className="mr-2 text-[#e53a24]" size={20} />
                  Vehicles
                </h3>
                <div className="space-y-3">
                  {filteredVehicles.map(v => (
                    <button 
                      key={v.id} 
                      onClick={() => handleResultClick(`/vehicles/${v.id}`)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center group"
                    >
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg p-1 overflow-hidden shrink-0 mr-4">
                        <img src={v.img} alt={v.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors line-clamp-1">{v.name}</p>
                        <p className="text-xs text-gray-500">{v.type}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Destinations Section */}
            {filteredDestinations.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a8a] mb-4 flex items-center border-b border-gray-200 pb-2">
                  <MapPin className="mr-2 text-[#e53a24]" size={20} />
                  Destinations
                </h3>
                <div className="space-y-3">
                  {filteredDestinations.map(d => (
                    <button 
                      key={d.id} 
                      onClick={() => handleResultClick(`/destinations/${d.id}`)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center group"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0 mr-4">
                        <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors line-clamp-1">{d.name}</p>
                        <p className="text-xs text-gray-500">{d.region}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
