import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, User, Snowflake } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import CarIllustrations from './CarIllustrations';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const { rentalType, toggleFavorite, isFavorite } = useBooking();

  const isFav = isFavorite(vehicle._id);
  const price = rentalType === 'self_drive' ? vehicle.pricing.dailySelfDrive : vehicle.pricing.dailyWithDriver;

  const handleCardClick = () => {
    navigate(`/cars/${vehicle._id}`);
  };

  const handleFavClick = (e) => {
    e.stopPropagation();
    toggleFavorite(vehicle._id);
  };

  // Determine illustration variant based on vehicle name
  const getIllustrationVariant = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('creta')) return 'creta';
    if (lower.includes('fortuner')) return 'fortuner';
    if (lower.includes('swift')) return 'swift';
    if (lower.includes('hiace')) return 'hiace';
    return 'creta';
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-100 shadow-soft hover:shadow-elevated transition-all duration-200 cursor-pointer flex gap-3.5 items-center group relative"
    >
      {/* Car Image / Vector Art on Left (Screen C) */}
      <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-xl bg-slate-50/80 flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden border border-slate-100/80 group-hover:scale-[1.03] transition-transform">
        <CarIllustrations variant={getIllustrationVariant(vehicle.name)} className="w-full h-auto" />
      </div>

      {/* Car Details on Right (Screen C) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
        <div>
          {/* Title & Favorite */}
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-[#0755C9] transition-colors">
              {vehicle.name}
            </h3>
            <button
              type="button"
              onClick={handleFavClick}
              className="text-slate-400 hover:text-rose-500 transition-colors p-1 -mr-1"
              aria-label="Add to favorites"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Category & Seater (e.g. SUV • 5 Seater) */}
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">
            {vehicle.category} • {vehicle.seats} Seater
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-800">{vehicle.rating?.toFixed(1) || '4.8'}</span>
            <span className="text-[11px] text-slate-400 font-medium">({vehicle.reviewCount || 126})</span>
          </div>
        </div>

        {/* Pricing and Feature Badges */}
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400">Rental Price</div>
            <div className="text-xs sm:text-sm font-extrabold text-[#0E1726]">
              NPR {price?.toLocaleString()} <span className="text-[10px] font-semibold text-slate-500">/day</span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-wrap justify-end">
            <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              <User className="w-2.5 h-2.5 text-slate-500" />
              {rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}
            </span>
            {vehicle.hasAC && (
              <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold bg-blue-50 text-[#0755C9] px-2 py-0.5 rounded-full">
                <Snowflake className="w-2.5 h-2.5" />
                AC
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
