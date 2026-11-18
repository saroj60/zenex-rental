import React from 'react';
import {
  Filter,
  RotateCcw,
  Check,
  X,
  ChevronDown,
  Sparkles,
  Car,
  Fuel,
  Users,
  Settings,
  DollarSign,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'SUV', label: 'SUV' },
  { id: 'Sedan', label: 'Sedan' },
  { id: 'Hatchback', label: 'Hatchback' },
  { id: 'Luxury', label: 'Luxury' },
  { id: 'Pickup', label: 'Pickup' },
  { id: 'Van', label: 'Van / Hiace' },
  { id: 'Electric', label: 'Electric (EV)' },
];

const TRANSMISSIONS = [
  { id: 'all', label: 'All' },
  { id: 'Automatic', label: 'Automatic' },
  { id: 'Manual', label: 'Manual' },
];

const FUEL_TYPES = [
  { id: 'all', label: 'All Fuels' },
  { id: 'Petrol', label: 'Petrol' },
  { id: 'Diesel', label: 'Diesel' },
  { id: 'Electric', label: 'Electric' },
  { id: 'Hybrid', label: 'Hybrid' },
];

const SEATS_OPTIONS = [
  { id: 'all', label: 'Any' },
  { id: '2', label: '2 Seats' },
  { id: '4', label: '4 Seats' },
  { id: '5', label: '5 Seats' },
  { id: '7', label: '7 Seats' },
  { id: '8+', label: '8+ Seats' },
];

const FEATURE_OPTIONS = [
  { id: 'AC', label: 'Air Conditioning (AC)' },
  { id: 'GPS', label: 'GPS Navigation' },
  { id: 'Bluetooth', label: 'Bluetooth Audio' },
  { id: 'Airbags', label: 'Safety Airbags' },
  { id: 'Sunroof', label: 'Panoramic Sunroof' },
];

const OCCASIONS = [
  { id: 'all', label: 'All Occasions' },
  { id: 'wedding', label: 'Wedding & Marriage' },
  { id: 'family-trip', label: 'Family Trips & Vacations' },
  { id: 'airport-transfer', label: 'Airport Pickup & Drop' },
  { id: 'tourism', label: 'Tourism & Sightseeing' },
  { id: 'pilgrimage', label: 'Religious & Pilgrimage' },
  { id: 'corporate', label: 'Business & Corporate' },
  { id: 'special-celebration', label: 'Birthday & Celebrations' },
  { id: 'festivals', label: 'Festivals & Gatherings' },
  { id: 'events', label: 'Events & Parties' },
  { id: 'medical-travel', label: 'Medical & Emergency' },
  { id: 'photoshoot', label: 'Photoshoots & Film' },
  { id: 'group-travel', label: 'Group Travel' },
];

export default function VehicleFilterSidebar({
  filters,
  setFilters,
  onReset,
  onApply,
  isOpenMobile,
  onCloseMobile,
}) {
  const handleFeatureToggle = (featureId) => {
    const current = filters.features || [];
    const updated = current.includes(featureId)
      ? current.filter((f) => f !== featureId)
      : [...current, featureId];
    setFilters({ ...filters, features: updated });
  };

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.occasion && filters.occasion !== 'all' ? 1 : 0) +
    (filters.transmission !== 'all' ? 1 : 0) +
    (filters.fuelType !== 'all' ? 1 : 0) +
    (filters.seats !== 'all' ? 1 : 0) +
    (filters.features?.length || 0) +
    (filters.minPrice > 0 || filters.maxPrice < 30000 ? 1 : 0);

  const filterContent = (
    <div className="space-y-6">
      
      {/* 1. Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0755C9]" />
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Filter Vehicles
          </h3>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#0755C9] text-white text-[10px] font-black flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. Rental Type */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
          Rental Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFilters({ ...filters, rentalType: 'self_drive' })}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
              filters.rentalType === 'self_drive'
                ? 'bg-[#0755C9] text-white border-[#0755C9] shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Self Drive
          </button>
          <button
            type="button"
            onClick={() => setFilters({ ...filters, rentalType: 'with_driver' })}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
              filters.rentalType === 'with_driver'
                ? 'bg-[#0755C9] text-white border-[#0755C9] shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            With Chauffeur
          </button>
        </div>
      </div>

      {/* 3. Vehicle Category */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
          Vehicle Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilters({ ...filters, category: cat.id })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors text-left ${
                  isSelected
                    ? 'bg-blue-50 text-[#0755C9] font-black'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#0755C9]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion / Travel Purpose */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
            Occasion / Purpose
          </label>
          {filters.occasion && filters.occasion !== 'all' && (
            <button
              type="button"
              onClick={() => setFilters({ ...filters, occasion: 'all' })}
              className="text-[10px] font-bold text-rose-500 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
          {OCCASIONS.map((occ) => {
            const isSelected = (filters.occasion || 'all') === occ.id;
            return (
              <button
                key={occ.id}
                type="button"
                onClick={() => setFilters({ ...filters, occasion: occ.id })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors text-left ${
                  isSelected
                    ? 'bg-blue-50 text-[#0755C9] font-black'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{occ.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#0755C9]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Range (NPR) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
            Daily Price Range
          </label>
          <span className="text-xs font-black text-[#0755C9]">
            NPR {filters.minPrice?.toLocaleString()} – {filters.maxPrice?.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="3000"
            max="30000"
            step="1000"
            value={filters.maxPrice || 30000}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[#0755C9] cursor-pointer"
          />
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>NPR 3,000</span>
            <span>NPR 15,000</span>
            <span>NPR 30,000+</span>
          </div>
        </div>
      </div>

      {/* 5. Seating Capacity */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
          Seating Capacity
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {SEATS_OPTIONS.map((seat) => {
            const isSelected = filters.seats === seat.id;
            return (
              <button
                key={seat.id}
                type="button"
                onClick={() => setFilters({ ...filters, seats: seat.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#0755C9] text-white border-[#0755C9]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {seat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Transmission */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
          Transmission
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {TRANSMISSIONS.map((t) => {
            const isSelected = filters.transmission === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilters({ ...filters, transmission: t.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#0755C9] text-white border-[#0755C9]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Fuel Type */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
          Fuel Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {FUEL_TYPES.map((f) => {
            const isSelected = filters.fuelType === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilters({ ...filters, fuelType: f.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#0755C9] text-white border-[#0755C9]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Vehicle Features */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
          Features & Amenities
        </label>
        <div className="space-y-2">
          {FEATURE_OPTIONS.map((feat) => {
            const isChecked = filters.features?.includes(feat.id);
            return (
              <label
                key={feat.id}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleFeatureToggle(feat.id)}
                  className="rounded text-[#0755C9] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>{feat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={onApply}
          className="w-full py-3 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
        >
          Reset All
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Desktop Sticky Left Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-soft sticky top-28">
          {filterContent}
        </div>
      </aside>

      {/* 2. Mobile Slide-Over Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-black text-slate-900">Search Filters</span>
                <button
                  onClick={onCloseMobile}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 flex-1">{filterContent}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
