import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Car, Search, X } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { featuredPackages } from '../data/packagesData';

/* ─── Highlight matching text ────────────────────────────────────── */
const Highlight = ({ text = '', query = '' }) => {
  if (!query.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[#1e3a8a]/10 text-[#1e3a8a] font-bold rounded px-0.5 not-italic">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

/* ─── Category badge colour helper ───────────────────────────────── */
const categoryColor = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('trek'))     return 'bg-green-100 text-green-700';
  if (c.includes('safari') || c.includes('wildlife')) return 'bg-amber-100 text-amber-700';
  if (c.includes('heli'))     return 'bg-purple-100 text-purple-700';
  if (c.includes('cultural')) return 'bg-rose-100 text-rose-700';
  return 'bg-blue-100 text-blue-700';
};

/* ════════════════════════════════════════════════════════════════════ */

const SearchWidget = ({ activeTab = 'cars' }) => {
  /* ── Cars state ─────────────────────────────────────────────────── */
  const [pickupLocation,  setPickupLocation]  = useState('Kathmandu, Nepal');
  const [dropoffLocation, setDropoffLocation] = useState('Kathmandu, Nepal');
  const [pickupDate,  setPickupDate]  = useState('');
  const [returnDate,  setReturnDate]  = useState('');
  const [vehicleType, setVehicleType] = useState('SUV / 4x4');
  const [isSearching, setIsSearching] = useState(false);

  /* ── Tour live-search state ─────────────────────────────────────── */
  const [tourQuery,    setTourQuery]    = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const inputRef  = useRef(null);

  const navigate = useNavigate();
  const { packages: ctxPackages, tourTrips } = useAppData();

  /* Merge context + static packages, de-dupe by id */
  const allPackages = (() => {
    const safePackages = Array.isArray(ctxPackages) ? ctxPackages : [];
    const safeTourTrips = Array.isArray(tourTrips) ? tourTrips : [];
    const base  = safePackages;
    const trips = safeTourTrips.map(t => ({
      id:       t.id,
      title:    t.title,
      location: t.destinations?.join(', ') || t.location || '',
      category: t.type || 'Tour',
      img:      t.heroImage || t.images?.[0] || t.img || '',
      price:    t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : (t.price || ''),
    }));
    const ids = new Set(base.map(p => p.id));
    return [...base, ...trips.filter(t => !ids.has(t.id))];
  })();

  /* Live filter */
  const q = tourQuery.trim().toLowerCase();
  const filteredPackages = q.length < 1 ? [] : allPackages.filter(p =>
    (p.title    || '').toLowerCase().includes(q) ||
    (p.location || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q) ||
    (p.tripCode || '').toLowerCase().includes(q)
  ).slice(0, 8);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Cars search */
  const handleCarSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const params = new URLSearchParams({
        pickup:  pickupLocation,
        dropoff: dropoffLocation,
        start:   pickupDate,
        end:     returnDate,
        type:    vehicleType,
      });
      navigate(`/vehicles?${params.toString()}`);
    }, 400);
  };

  /* Package click */
  const handlePackageClick = (pkg) => {
    setShowDropdown(false);
    setTourQuery('');
    navigate(`/packages/${pkg.id}`);
  };

  /* ── JSX ─────────────────────────────────────────────────────────── */
  return (
    <div className={activeTab === 'cars' ? "bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-lg" : "w-full"}>

      {/* ══ Cars Tab ══════════════════════════════════════════════════ */}
      {activeTab === 'cars' && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-300/50 bg-[#F4F6F8]/80 backdrop-blur-md rounded-2xl p-2">

          <div className="p-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <MapPin size={14} className="text-gray-400" /> Pickup Location
            </label>
            <input
              type="text" list="location-options"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="City or Airport"
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none placeholder:text-gray-400 text-sm p-0"
            />
          </div>

          <div className="p-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <MapPin size={14} className="text-gray-400" /> Drop-off Location
            </label>
            <input
              type="text" list="location-options"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="City or Airport"
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none placeholder:text-gray-400 text-sm p-0"
            />
          </div>

          <datalist id="location-options">
            <option value="Kathmandu, Nepal" />
            <option value="Pokhara, Nepal" />
            <option value="Chitwan, Nepal" />
            <option value="Lumbini, Nepal" />
            <option value="Mustang, Nepal" />
            <option value="Tribhuvan International Airport (KTM)" />
          </datalist>

          <div className="p-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Calendar size={14} className="text-gray-400" /> Pickup Date
            </label>
            <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none cursor-pointer text-sm" />
          </div>

          <div className="p-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Calendar size={14} className="text-gray-400" /> Return Date
            </label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none cursor-pointer text-sm" />
          </div>

          <div className="p-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Car size={14} className="text-gray-400" /> Vehicle Type
            </label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 appearance-none outline-none cursor-pointer text-sm">
              <option value="SUV / 4x4">SUV / 4x4</option>
              <option value="Economy">Economy</option>
              <option value="Sedan">Sedan</option>
              <option value="Luxury">Luxury</option>
              <option value="EV">EV</option>
              <option value="Van / Micro">Van / Micro</option>
              <option value="Minibus">Minibus</option>
              <option value="Pickup Truck">Pickup Truck</option>
            </select>
          </div>

          <div className="p-2 flex">
            <button
              onClick={handleCarSearch}
              className={`w-full bg-[#1e3a8a] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                isSearching ? 'scale-95 opacity-90' : 'hover:bg-[#152c6e] shadow-md hover:shadow-lg'
              }`}
            >
              <Search size={18} /> Search Vehicles
            </button>
          </div>
        </div>
      )}

      {/* ══ Tours Tab — Live Search ════════════════════════════════════ */}
      {activeTab === 'tours' && (
        <div ref={searchRef} className="relative">

          {/* Search input */}
          <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 border ${
            showDropdown && tourQuery ? 'bg-white border-[#1e3a8a]/25 ring-2 ring-[#1e3a8a]/25 shadow-xl' : 'bg-transparent backdrop-blur-sm border-white/50 hover:bg-white/10'
          }`}>
            <Search size={18} className={`shrink-0 transition-colors ${showDropdown && tourQuery ? 'text-[#1e3a8a]' : 'text-white/90'}`} />
            <input
              ref={inputRef}
              type="text"
              value={tourQuery}
              onChange={(e) => { setTourQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search destinations, tours, packages…"
              className={`flex-1 bg-transparent border-none outline-none font-semibold text-sm md:text-base placeholder:font-medium transition-colors ${
                showDropdown && tourQuery ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-white/80'
              }`}
            />
            {tourQuery && (
              <button
                onClick={() => { setTourQuery(''); setShowDropdown(false); inputRef.current?.focus(); }}
                className={`p-1.5 rounded-full transition-colors shrink-0 ${
                  showDropdown && tourQuery ? 'hover:bg-gray-200 text-gray-400 hover:text-gray-600' : 'hover:bg-white/20 text-white/80 hover:text-white'
                }`}
                aria-label="Clear"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {showDropdown && tourQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[440px] overflow-y-auto">

              {filteredPackages.length > 0 ? (
                <>
                  {/* Header row */}
                  <div className="sticky top-0 bg-white/90 backdrop-blur px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {filteredPackages.length} result{filteredPackages.length !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => { setShowDropdown(false); navigate('/packages'); }}
                      className="text-xs font-bold text-[#1e3a8a] hover:underline"
                    >
                      Browse all →
                    </button>
                  </div>

                  {/* Result rows */}
                  {filteredPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageClick(pkg)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left group border-b border-gray-50 last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <img
                          src={pkg.img || pkg.image || '/images/trek.png'}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { e.target.src = '/images/trek.png'; }}
                        />
                      </div>

                      {/* Name + location */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm leading-snug truncate group-hover:text-[#1e3a8a] transition-colors">
                          <Highlight text={pkg.title || ''} query={tourQuery} />
                        </p>
                        {pkg.location && (
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 truncate">
                            <MapPin size={10} className="shrink-0 text-gray-400" />
                            <Highlight text={pkg.location} query={tourQuery} />
                          </p>
                        )}
                      </div>

                      {/* Badge + price */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap ${categoryColor(pkg.category)}`}>
                          {pkg.category || 'Tour'}
                        </span>
                        {pkg.price && (
                          <span className="text-xs font-bold text-[#e53a24] whitespace-nowrap">{pkg.price}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                /* No results */
                <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                    <Search size={22} className="text-gray-300" />
                  </div>
                  <p className="font-bold text-gray-700 text-sm">No packages found for "{tourQuery}"</p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">Try "Everest", "Kathmandu" or "Safari"</p>
                  <button
                    onClick={() => { setShowDropdown(false); navigate('/packages'); }}
                    className="text-xs font-bold text-[#1e3a8a] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors"
                  >
                    Browse all packages →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default SearchWidget;
