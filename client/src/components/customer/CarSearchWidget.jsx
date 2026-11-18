import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  UserCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  X,
  Edit3
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import api from '../../services/api';

const NEPAL_LOCATIONS = [
  'Kathmandu Central Depot',
  'Tribhuvan Intl Airport (KTM)',
  'Thamel Hub (Kathmandu)',
  'Lalitpur (Patan Durbar Square)',
  'Bhaktapur Durbar Square',
  'Pokhara Lakeside Hub',
  'Pokhara Domestic Airport',
  'Chitwan (Sauraha Depot)',
  'Lumbini Peace Park',
  'Janakpur City Center',
  'Mustang (Jomsom Depot)',
  'Nagarkot Hill Station',
  'Biratnagar Airport Hub',
];

const TIME_OPTIONS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
];

export default function CarSearchWidget({ className = '' }) {
  const navigate = useNavigate();
  const {
    rentalType,
    setRentalType,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    pickupTime,
    setPickupTime,
    returnTime,
    setReturnTime,
  } = useBooking();

  // Helper for Nepal today's date formatted as YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [sameDropoff, setSameDropoff] = useState(true);
  const [availableCount, setAvailableCount] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [dateError, setDateError] = useState('');

  // Editable Location States & Menus
  const [pickupInput, setPickupInput] = useState(pickupLocation || 'Kathmandu Central Depot');
  const [showPickupMenu, setShowPickupMenu] = useState(false);
  const [dropoffInput, setDropoffInput] = useState(dropoffLocation || 'Kathmandu Central Depot');
  const [showDropoffMenu, setShowDropoffMenu] = useState(false);

  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target)) {
        setShowPickupMenu(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(e.target)) {
        setShowDropoffMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Synchronize when context changes
  useEffect(() => {
    if (pickupLocation && pickupLocation !== pickupInput) {
      setPickupInput(pickupLocation);
    }
  }, [pickupLocation]);

  useEffect(() => {
    if (dropoffLocation && dropoffLocation !== dropoffInput && !sameDropoff) {
      setDropoffInput(dropoffLocation);
    }
  }, [dropoffLocation, sameDropoff]);

  // Validate dates
  useEffect(() => {
    const todayStr = getTodayDateString();
    if (startDate < todayStr) {
      setDateError('Pickup date cannot be in the past.');
    } else if (endDate < startDate) {
      setDateError('Return date must be on or after pickup date.');
    } else {
      setDateError('');
    }
  }, [startDate, endDate]);

  // Synchronize dropoff location if sameDropoff is checked
  useEffect(() => {
    if (sameDropoff) {
      setDropoffInput(pickupInput);
      setDropoffLocation(pickupInput);
    }
  }, [sameDropoff, pickupInput, setDropoffLocation]);

  // Fetch real available vehicle count for the chosen parameters
  useEffect(() => {
    let isCancelled = false;
    const checkVehicles = async () => {
      if (dateError) return;
      setCheckingAvailability(true);
      try {
        const res = await api.get('/vehicles/availability', {
          params: {
            startDate,
            endDate,
            rentalType,
          },
        });
        if (!isCancelled && res.data?.data) {
          setAvailableCount(res.data.data.length);
        }
      } catch (err) {
        // Fallback to general vehicles count
        try {
          const fallbackRes = await api.get('/vehicles');
          if (!isCancelled && fallbackRes.data?.data) {
            setAvailableCount(fallbackRes.data.data.length);
          }
        } catch {
          if (!isCancelled) setAvailableCount(null);
        }
      } finally {
        if (!isCancelled) setCheckingAvailability(false);
      }
    };

    checkVehicles();
    return () => {
      isCancelled = true;
    };
  }, [startDate, endDate, rentalType, dateError]);

  const handlePickupChange = (e) => {
    const val = e.target.value;
    setPickupInput(val);
    setPickupLocation(val);
    setShowPickupMenu(true);
  };

  const handleSelectPickup = (loc) => {
    setPickupInput(loc);
    setPickupLocation(loc);
    setShowPickupMenu(false);
  };

  const handleDropoffChange = (e) => {
    const val = e.target.value;
    setDropoffInput(val);
    setDropoffLocation(val);
    setShowDropoffMenu(true);
  };

  const handleSelectDropoff = (loc) => {
    setDropoffInput(loc);
    setDropoffLocation(loc);
    setShowDropoffMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (dateError) return;
    navigate('/cars');
  };

  // Filter suggestion lists
  const filteredPickupList = NEPAL_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes((pickupInput || '').toLowerCase())
  );

  const filteredDropoffList = NEPAL_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes((dropoffInput || '').toLowerCase())
  );

  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-3.5 xs:p-4 sm:p-6 lg:p-7 relative transition-all w-full max-w-full overflow-visible z-20 ${className}`}
    >
      {/* 1. Integrated Rental Mode Segmented Switcher & Availability Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 pb-3 sm:pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0">
            Mode:
          </span>
          <div className="inline-flex w-full xs:w-auto p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setRentalType('self_drive')}
              className={`flex-1 xs:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-black transition-all cursor-pointer ${
                rentalType === 'self_drive'
                  ? 'bg-[#0755C9] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-3.5 h-3.5 shrink-0" />
              <span>Self Drive</span>
            </button>

            <button
              type="button"
              onClick={() => setRentalType('with_driver')}
              className={`flex-1 xs:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-black transition-all cursor-pointer ${
                rentalType === 'with_driver'
                  ? 'bg-[#0755C9] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 shrink-0" />
              <span>With Chauffeur</span>
            </button>
          </div>
        </div>

        {/* Live Availability Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold self-start sm:self-auto">
          {checkingAvailability ? (
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0755C9]" />
              <span>Checking live fleet...</span>
            </div>
          ) : availableCount !== null ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>
                <b className="font-black">{availableCount} vehicles</b> ready in Nepal
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Date Validation Alert */}
      {dateError && (
        <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{dateError}</span>
        </div>
      )}

      {/* 2. Main Search Fields Form */}
      <form onSubmit={handleSearch} className="space-y-3 sm:space-y-4">
        {/* Row 1: Editable Pickup and Drop-off Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5">
          
          {/* Pickup Location (User can type manually or pick suggestion) */}
          <div className="space-y-1 relative" ref={pickupRef}>
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#0755C9]" /> Pickup Location
              </span>
              <span className="text-[10px] text-blue-600 font-bold lowercase">type any address</span>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={pickupInput}
                onChange={handlePickupChange}
                onFocus={() => setShowPickupMenu(true)}
                placeholder="Type city, airport, hotel or hub..."
                className="w-full pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/90 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#0755C9] focus:ring-2 focus:ring-blue-100 rounded-xl outline-none transition-all min-h-[44px]"
              />
              
              {pickupInput ? (
                <button
                  type="button"
                  onClick={() => {
                    setPickupInput('');
                    setPickupLocation('');
                    setShowPickupMenu(true);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Clear location"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              )}

              {/* Autocomplete / Suggested Hubs Menu */}
              {showPickupMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 py-1 scrollbar-thin animate-in fade-in duration-150">
                  {/* Custom location item */}
                  {pickupInput.trim() && !NEPAL_LOCATIONS.includes(pickupInput.trim()) && (
                    <button
                      type="button"
                      onClick={() => handleSelectPickup(pickupInput)}
                      className="w-full px-3.5 py-2 text-left text-xs font-extrabold text-[#0755C9] bg-blue-50/70 hover:bg-blue-100/70 flex items-center gap-2 border-b border-blue-100 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
                      <span className="truncate">Use custom address: <b>"{pickupInput}"</b></span>
                    </button>
                  )}

                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Popular Nepal Rental Hubs
                  </div>

                  {filteredPickupList.length > 0 ? (
                    filteredPickupList.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleSelectPickup(loc)}
                        className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                          pickupLocation === loc
                            ? 'bg-blue-50 text-[#0755C9]'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{loc}</span>
                        </span>
                        {pickupLocation === loc && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-3.5 py-2 text-xs text-slate-500 font-medium">
                      Press enter to use "{pickupInput}" as your custom pickup point.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Drop-off Location (Can mirror pickup or type manually) */}
          <div className="space-y-1 relative" ref={dropoffRef}>
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Drop-off Location
              </span>
              <label className="flex items-center gap-1 text-[11px] font-bold text-[#0755C9] cursor-pointer lowercase">
                <input
                  type="checkbox"
                  checked={sameDropoff}
                  onChange={(e) => setSameDropoff(e.target.checked)}
                  className="rounded text-[#0755C9] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
                <span>same as pickup</span>
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                disabled={sameDropoff}
                value={sameDropoff ? pickupInput : dropoffInput}
                onChange={handleDropoffChange}
                onFocus={() => !sameDropoff && setShowDropoffMenu(true)}
                placeholder={sameDropoff ? 'Same as pickup location' : 'Type dropoff city, hotel, or hub...'}
                className={`w-full pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-bold text-slate-900 border rounded-xl outline-none transition-all min-h-[44px] ${
                  sameDropoff
                    ? 'opacity-65 cursor-not-allowed bg-slate-100 border-slate-200'
                    : 'bg-slate-50/90 hover:bg-white focus:bg-white border-slate-200 focus:border-[#0755C9] focus:ring-2 focus:ring-blue-100'
                }`}
              />

              {!sameDropoff && dropoffInput ? (
                <button
                  type="button"
                  onClick={() => {
                    setDropoffInput('');
                    setDropoffLocation('');
                    setShowDropoffMenu(true);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Clear location"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : !sameDropoff ? (
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              ) : null}

              {/* Dropoff Autocomplete Menu */}
              {!sameDropoff && showDropoffMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 py-1 scrollbar-thin animate-in fade-in duration-150">
                  {dropoffInput.trim() && !NEPAL_LOCATIONS.includes(dropoffInput.trim()) && (
                    <button
                      type="button"
                      onClick={() => handleSelectDropoff(dropoffInput)}
                      className="w-full px-3.5 py-2 text-left text-xs font-extrabold text-[#0755C9] bg-blue-50/70 hover:bg-blue-100/70 flex items-center gap-2 border-b border-blue-100 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
                      <span className="truncate">Use custom address: <b>"{dropoffInput}"</b></span>
                    </button>
                  )}

                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Popular Nepal Rental Hubs
                  </div>

                  {filteredDropoffList.length > 0 ? (
                    filteredDropoffList.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleSelectDropoff(loc)}
                        className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                          dropoffLocation === loc
                            ? 'bg-blue-50 text-[#0755C9]'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{loc}</span>
                        </span>
                        {dropoffLocation === loc && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-3.5 py-2 text-xs text-slate-500 font-medium">
                      Press enter to use "{dropoffInput}" as your custom drop-off point.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Paired Pickup & Return Dates and Times */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {/* Pickup Date */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-700 truncate">
              <Calendar className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
              <span>Pickup Date</span>
            </label>
            <input
              type="date"
              min={getTodayDateString()}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-2.5 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none transition-all cursor-pointer min-h-[44px]"
            />
          </div>

          {/* Pickup Time */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-700 truncate">
              <Clock className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
              <span>Pickup Time</span>
            </label>
            <div className="relative">
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full pl-2.5 pr-7 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none transition-all cursor-pointer appearance-none min-h-[44px]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Return Date */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-700 truncate">
              <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Return Date</span>
            </label>
            <input
              type="date"
              min={startDate || getTodayDateString()}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-2.5 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none transition-all cursor-pointer min-h-[44px]"
            />
          </div>

          {/* Return Time */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-700 truncate">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Return Time</span>
            </label>
            <div className="relative">
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full pl-2.5 pr-7 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none transition-all cursor-pointer appearance-none min-h-[44px]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 3: Prominent Full-Width Search Available Cars Button */}
        <div className="pt-2 sm:pt-3 space-y-2.5">
          <button
            type="submit"
            disabled={!!dateError || checkingAvailability}
            className="w-full py-3.5 sm:py-4 px-6 min-h-[48px] bg-gradient-to-r from-[#0755C9] via-blue-600 to-[#0755C9] hover:from-blue-600 hover:to-[#0755C9] active:scale-[0.99] text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search Available Cars</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          {/* Micro Trust Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-0.5">
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              100% Insured Fleet
            </span>
            <span className="text-slate-300">•</span>
            <span>Zero Hidden Fees</span>
            <span className="text-slate-300">•</span>
            <span>24/7 Roadside Rescue</span>
          </div>
        </div>
      </form>
    </div>
  );
}
