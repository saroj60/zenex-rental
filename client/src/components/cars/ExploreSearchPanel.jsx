import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  UserCheck,
  Search,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  X,
  AlertCircle
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const NEPAL_LOCATIONS = [
  'Kathmandu Central Depot',
  'Tribhuvan Intl Airport (KTM)',
  'Lalitpur (Patan)',
  'Bhaktapur Durbar Square',
  'Pokhara Lakeside Hub',
  'Chitwan (Sauraha)',
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

export default function ExploreSearchPanel({ onSearch, isMobileFilterOpen, setIsMobileFilterOpen }) {
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

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [isExpanded, setIsExpanded] = useState(false);
  const [dateError, setDateError] = useState('');

  // Validate dates
  useEffect(() => {
    const today = getTodayString();
    if (startDate < today) {
      setDateError('Pickup date cannot be in the past.');
    } else if (endDate < startDate) {
      setDateError('Return date must be on or after pickup date.');
    } else {
      setDateError('');
    }
  }, [startDate, endDate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;
    setIsExpanded(false);
    if (onSearch) onSearch();
  };

  // Calculate rental duration in days
  const start = new Date(startDate || getTodayString());
  const end = new Date(endDate || startDate || getTodayString());
  const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-200/40 p-4 sm:p-5 mb-8">
      
      {/* Condensed Summary Header with Quick Edit Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left summary tags */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0755C9] font-black">
            <MapPin className="w-3.5 h-3.5" />
            <span>{pickupLocation}</span>
            {dropoffLocation && dropoffLocation !== pickupLocation && (
              <>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>{dropoffLocation}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{startDate} ({pickupTime}) → {endDate} ({returnTime})</span>
            <span className="px-1.5 py-0.5 rounded bg-white text-[11px] font-black text-slate-900 border border-slate-200">
              {diffDays} {diffDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold uppercase text-[11px]">
            {rentalType === 'self_drive' ? <Car className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
            <span>{rentalType === 'self_drive' ? 'Self Drive' : 'With Chauffeur'}</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Mobile Filter Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0755C9]" />
            <span>Filters</span>
          </button>

          {/* Toggle Expand Search Form */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isExpanded
                ? 'bg-slate-200 text-slate-800'
                : 'bg-[#0755C9] hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20'
            }`}
          >
            <span>{isExpanded ? 'Hide Search' : 'Modify Search'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>

      {/* Expanded Search Form */}
      {isExpanded && (
        <form onSubmit={handleFormSubmit} className="mt-5 pt-5 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
          
          {dateError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{dateError}</span>
            </div>
          )}

          {/* Rental Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Rental Mode:
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setRentalType('self_drive')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  rentalType === 'self_drive'
                    ? 'bg-[#0755C9] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Self Drive</span>
              </button>
              <button
                type="button"
                onClick={() => setRentalType('with_driver')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  rentalType === 'with_driver'
                    ? 'bg-[#0755C9] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>With Driver</span>
              </button>
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center justify-between text-xs font-black uppercase text-slate-600 mb-1">
                <span>Pickup Location</span>
                <span className="text-[10px] text-blue-600 font-bold lowercase">type any address</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="explore-pickup-hubs"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Type city, airport, hotel, or hub..."
                  className="w-full pl-3 pr-8 py-2.5 text-xs font-bold bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none transition-all"
                />
                <datalist id="explore-pickup-hubs">
                  {NEPAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-black uppercase text-slate-600 mb-1">
                <span>Drop-off Location</span>
                <span className="text-[10px] text-amber-600 font-bold lowercase">type any address</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="explore-dropoff-hubs"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Type return city, hotel, or hub..."
                  className="w-full pl-3 pr-8 py-2.5 text-xs font-bold bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none transition-all"
                />
                <datalist id="explore-dropoff-hubs">
                  {NEPAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Dates & Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Date</label>
              <input
                type="date"
                min={getTodayString()}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time</label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Return Date</label>
              <input
                type="date"
                min={startDate || getTodayString()}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Return Time</label>
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!!dateError}
              className="px-6 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>Update Availability</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
