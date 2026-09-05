import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, MapPin, Car, Mountain, Package } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { featuredPackages } from '../data/packagesData';
import { treksData } from '../data/treksData';

const STATIC_VEHICLES = [
  { id: 1, name: 'Suzuki Swift', type: 'Hatchback / Sedan', img: '/images/economy_car.png' },
  { id: 2, name: 'Toyota Fortuner', type: 'SUV / 4x4', img: '/images/suv_car.png' },
  { id: 3, name: 'Kia EV6', type: 'EV', img: '/images/luxury_car.png' },
  { id: 4, name: 'Toyota Hiace', type: 'Van / Micro', img: 'https://www.toyota.com.sg/showroom/new-models/-/media/27acd1d10dfc4ad29f13efd4415627c0.jpg' },
  { id: 5, name: 'Mahindra Scorpio', type: 'SUV / 4x4', img: 'https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg' },
  { id: 6, name: 'Standard Car', type: 'Sedan', img: 'https://nissan-nepal.com/assets/images/product/nissan-new-car.jpg' },
  { id: 7, name: 'Tourist Bus', type: 'Minibus', img: 'https://tourpokhara.com/wp-content/uploads/2023/09/Tourist-bus.jpg' },
  { id: 8, name: 'Toyota Coaster', type: 'Minibus', img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 9, name: 'Wedding Cars', type: 'Luxury', img: '/vehicles/wedding car.avif' },
  { id: 10, name: 'Self Drive Cars', type: 'Economy', img: '/vehicles/self drive.jpg' },
];

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { vehicles: ctxVehicles, destinations, packages: ctxPackages, treks: ctxTreks, tourTrips } = useAppData();

  // Always fall back to static data so search works immediately on page load
  const vehicles = (ctxVehicles && ctxVehicles.length > 0) ? ctxVehicles : STATIC_VEHICLES;
  const packages = Array.isArray(ctxPackages) ? ctxPackages : [];
  const treks = Array.isArray(ctxTreks) ? ctxTreks : [];

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
  
  const isCarQuery = lowerQuery === 'car' || lowerQuery === 'cars' || lowerQuery === 'vehicle' || lowerQuery === 'vehicles' || lowerQuery === 'rental' || lowerQuery === 'rent';
  const isJeepQuery = lowerQuery === 'jeep' || lowerQuery === 'jeeps' || lowerQuery === 'suv' || lowerQuery === '4x4' || lowerQuery === '4wd';
  const isBusQuery = lowerQuery === 'bus' || lowerQuery === 'coaster' || lowerQuery === 'micro' || lowerQuery === 'van';
  const isTrekQuery = lowerQuery === 'trek' || lowerQuery === 'treks' || lowerQuery === 'hike' || lowerQuery === 'hikes' || lowerQuery === 'hiking' || lowerQuery === 'climb' || lowerQuery === 'climbing' || lowerQuery === 'walking';
  const isTourQuery = lowerQuery === 'tour' || lowerQuery === 'tours' || lowerQuery === 'trip' || lowerQuery === 'trips' || lowerQuery === 'package' || lowerQuery === 'packages';

  const filteredVehicles = lowerQuery ? vehicles.filter(v => {
    const name = (v.name?.toLowerCase() || '');
    const type = (v.type?.toLowerCase() || '');
    
    if (name.includes(lowerQuery) || type.includes(lowerQuery)) return true;
    
    if (isCarQuery && (type.includes('sedan') || type.includes('ev') || type.includes('suv') || type.includes('van') || type.includes('micro'))) return true;
    if (isJeepQuery && (type.includes('suv') || type.includes('4x4'))) return true;
    if (isBusQuery && (type.includes('van') || type.includes('micro') || type.includes('bus') || type.includes('coaster'))) return true;
    
    return false;
  }).slice(0, 4) : [];

  const filteredDestinations = lowerQuery ? destinations.filter(d => 
    (d.name?.toLowerCase() || '').includes(lowerQuery) || 
    (d.desc?.toLowerCase() || '').includes(lowerQuery)
  ).slice(0, 4) : [];

  const filteredTreks = lowerQuery ? [
    ...treks.filter(t => {
      const title = (t.title?.toLowerCase() || '');
      const desc = (t.description?.toLowerCase() || '') + ' ' + (t.overview?.toLowerCase() || '');
      
      if (title.includes(lowerQuery) || desc.includes(lowerQuery)) return true;
      if (isTrekQuery && (title.includes('trek') || title.includes('camp') || title.includes('circuit') || title.includes('pass'))) return true;
      return false;
    }),
    ...(tourTrips || []).filter(t => {
      const title = (t.title?.toLowerCase() || '');
      const desc = (t.shortDescription?.toLowerCase() || '');
      const isTrekType = t.type?.toLowerCase() === 'treks' || t.type?.toLowerCase() === 'trek';
      
      if (!isTrekType) return false;
      if (title.includes(lowerQuery) || desc.includes(lowerQuery)) return true;
      if (isTrekQuery && (title.includes('trek') || title.includes('camp') || title.includes('circuit') || title.includes('pass'))) return true;
      return false;
    })
  ].slice(0, 4) : [];

  const filteredPackages = lowerQuery ? [
    ...packages.filter(p => {
      const title = (p.title?.toLowerCase() || '');
      const loc = (p.location?.toLowerCase() || '');
      
      if (title.includes(lowerQuery) || loc.includes(lowerQuery)) return true;
      if (isTourQuery && (title.includes('tour') || title.includes('package') || title.includes('hills') || title.includes('valley'))) return true;
      return false;
    }),
    ...(tourTrips || []).filter(t => {
      const title = (t.title?.toLowerCase() || '');
      const desc = (t.shortDescription?.toLowerCase() || '');
      const isTourType = t.type?.toLowerCase() === 'tours' || t.type?.toLowerCase() === 'tour';
      
      if (!isTourType) return false;
      if (title.includes(lowerQuery) || desc.includes(lowerQuery)) return true;
      if (isTourQuery && (title.includes('tour') || title.includes('package') || title.includes('hills') || title.includes('valley'))) return true;
      return false;
    })
  ].slice(0, 4) : [];

  const getVehicleDetailPath = (v) => {
    const name = (v.name || '').toLowerCase();
    if (name.includes('hiace')) return '/vehicles/hiace-routes';
    if (name.includes('scorpio')) return '/vehicles/scorpio-routes';
    if (name.includes('bus')) return '/vehicles/bus-routes';
    if (name.includes('coaster')) return '/vehicles/coaster-routes';
    if (name.includes('wedding') || v.type === 'Luxury') return '/vehicles/car-models';
    if (name.includes('self drive') || name.includes('self-drive')) return '/vehicles/self-drive';
    return '/vehicles/car-routes';
  };

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
            <div className="mt-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Everest Trek', 'Kathmandu Tour', 'Hiace', 'Scorpio', 'Pokhara', 'Annapurna', 'Chitwan Safari', 'Self Drive'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#1e3a8a] hover:text-white text-gray-700 text-sm font-semibold rounded-full transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Browse Categories</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { onClose(); navigate('/vehicles'); }} className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors text-left">
                  <span className="text-2xl">🚗</span>
                  <div><p className="font-bold text-gray-800 text-sm">Vehicle Rentals</p><p className="text-xs text-gray-500">Cars, Vans & Buses</p></div>
                </button>
                <button onClick={() => { onClose(); navigate('/treks'); }} className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors text-left">
                  <span className="text-2xl">🏔️</span>
                  <div><p className="font-bold text-gray-800 text-sm">Treks</p><p className="text-xs text-gray-500">Everest, Annapurna & more</p></div>
                </button>
                <button onClick={() => { onClose(); navigate('/packages'); }} className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-2xl transition-colors text-left">
                  <span className="text-2xl">🗺️</span>
                  <div><p className="font-bold text-gray-800 text-sm">Tour Packages</p><p className="text-xs text-gray-500">Nepal, Tibet & Bhutan</p></div>
                </button>
                <button onClick={() => { onClose(); navigate('/destinations'); }} className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors text-left">
                  <span className="text-2xl">📍</span>
                  <div><p className="font-bold text-gray-800 text-sm">Destinations</p><p className="text-xs text-gray-500">Kathmandu, Pokhara & more</p></div>
                </button>
              </div>
            </div>
          )}

          {lowerQuery && !hasResults && (
            <div className="mt-8">
              <div className="text-center py-8 text-gray-500">
                <p className="text-xl font-medium">No results for "{query}"</p>
                <p className="text-sm mt-2">Try one of these instead:</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {['Everest', 'Kathmandu', 'Hiace', 'Scorpio', 'Pokhara', 'Annapurna'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#e53a24] hover:text-white text-gray-700 text-sm font-semibold rounded-full transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
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
                        <img src={pkg.img || pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors line-clamp-1">{pkg.title}</p>
                        <p className="text-xs text-gray-500">{pkg.location || `${pkg.duration || ''} • ${pkg.difficulty || ''}`}</p>
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
                      onClick={() => handleResultClick(getVehicleDetailPath(v))}
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
