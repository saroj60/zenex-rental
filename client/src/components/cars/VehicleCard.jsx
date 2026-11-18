import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Settings as TransmissionIcon,
  Fuel,
  Snowflake,
  Star,
  CheckCircle,
  Eye,
  ArrowRight,
  Heart,
  Calendar,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function VehicleCard({ vehicle, onBookNow }) {
  const navigate = useNavigate();
  const { rentalType, isFavorite, toggleFavorite } = useBooking();

  const isFav = isFavorite(vehicle._id);
  const carImage = vehicle.images?.[0] || '/cars/creta.png';

  // Extract pricing from backend calculation if present or fallback
  const calculated = vehicle.calculatedPricing;
  const durationDays = calculated?.durationDays || 2;
  const dailyRate =
    calculated?.dailyRate ||
    (rentalType === 'self_drive'
      ? vehicle.pricing?.dailySelfDrive || 7000
      : vehicle.pricing?.dailyWithDriver || 8500);

  const totalEstimatedPrice = calculated?.totalEstimatedPrice || dailyRate * durationDays;

  const isAvailable = vehicle.status?.toLowerCase() === 'available' || !vehicle.isBookedForDates;

  const handleCardClick = () => {
    navigate(`/cars/${vehicle._id || vehicle.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* 1. Image Container */}
      <div className="relative h-52 bg-gradient-to-b from-slate-50 to-slate-100/70 p-4 flex items-center justify-center overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-xs text-[#0755C9] border border-blue-200 shadow-2xs">
            {vehicle.category}
          </span>
          {vehicle.isFeatured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-2xs">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(vehicle._id);
          }}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-2xs transition-colors z-10 cursor-pointer"
          title={isFav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Vehicle Image */}
        <img
          src={carImage}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/cars/creta.png';
          }}
        />

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
              isAvailable
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            {isAvailable ? 'Available Now' : 'Reserved for Dates'}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3.5 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{vehicle.rating || 4.8}</span>
          <span className="text-slate-400 text-[10px]">({vehicle.reviewCount || 95})</span>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title, Brand & Registration */}
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-black text-slate-900 group-hover:text-[#0755C9] transition-colors truncate">
              {vehicle.name}
            </h3>
            <span className="text-xs font-semibold text-slate-400 flex-shrink-0 ml-2">
              {vehicle.modelYear || 2024}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {vehicle.brand} • <span className="text-slate-400 font-mono text-[11px]">{vehicle.registrationNumber}</span>
          </p>
        </div>

        {/* Specifications Pill Bar */}
        <div className="grid grid-cols-4 gap-1.5 py-2.5 border-y border-slate-100 text-[11px] text-slate-600 font-semibold text-center">
          <div className="p-1.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
            <Users className="w-3.5 h-3.5 text-slate-400 mb-1" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
            <TransmissionIcon className="w-3.5 h-3.5 text-slate-400 mb-1" />
            <span className="truncate">{vehicle.transmission || 'Auto'}</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
            <Fuel className="w-3.5 h-3.5 text-slate-400 mb-1" />
            <span className="truncate">{vehicle.fuelType || 'Petrol'}</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
            <Snowflake className="w-3.5 h-3.5 text-[#0755C9] mb-1" />
            <span>{vehicle.hasAC !== false ? 'AC' : 'Non-AC'}</span>
          </div>
        </div>

        {/* Rental Mode Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
          <span className="text-slate-400 font-medium">Rental Mode:</span>
          <span className="text-[#0755C9] font-black capitalize">
            {rentalType === 'self_drive' ? 'Self Drive' : 'With Chauffeur'}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400">{durationDays} {durationDays === 1 ? 'day trip' : 'days trip'}</span>
        </div>

        {/* 3. Pricing & Actions Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Total ({durationDays} {durationDays === 1 ? 'Day' : 'Days'})
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900">
                NPR {totalEstimatedPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block">
              NPR {dailyRate.toLocaleString()} / day
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0755C9] transition-colors"
              title="View Specifications & Features"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={!isAvailable}
              onClick={(e) => {
                e.stopPropagation();
                if (onBookNow) onBookNow(vehicle);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
