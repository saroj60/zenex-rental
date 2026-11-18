import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Fuel,
  Settings as TransmissionIcon,
  Snowflake,
  Star,
  CheckCircle,
  Car,
  UserCheck,
  ArrowRight,
  Loader2,
  Heart,
  Eye,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import api from '../../services/api';

const CATEGORIES = [
  { id: 'all', label: 'All Fleet' },
  { id: 'SUV', label: 'SUV' },
  { id: 'Hatchback', label: 'Hatchback' },
  { id: 'Sedan', label: 'Sedan' },
  { id: 'Premium', label: 'Premium' },
  { id: 'Van/Hiace', label: 'Van / Hiace' },
  { id: 'Electric Vehicles', label: 'Electric (EV)' },
];

export default function PopularVehiclesSection() {
  const navigate = useNavigate();
  const { rentalType, isFavorite, toggleFavorite, setSelectedCategory } = useBooking();

  const [activeCategory, setActiveCategory] = useState('all');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, [activeCategory]);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (activeCategory !== 'all') {
        params.category = activeCategory;
      }
      const res = await api.get('/vehicles', { params });
      if (res.data?.data) {
        setVehicles(res.data.data);
      }
    } catch (err) {
      console.error('Error loading vehicles:', err);
      setError('Unable to load vehicles from server. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookVehicle = (vehicle) => {
    setSelectedCategory(vehicle.category);
    navigate(`/cars/${vehicle._id || vehicle.slug}`);
  };

  const handleViewDetails = (vehicle) => {
    navigate(`/cars/${vehicle._id || vehicle.slug}`);
  };

  return (
    <section id="popular-vehicles" className="py-20 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#0755C9] text-xs font-black uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Verified Nepal Rental Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#10243A] tracking-tight">
              Find Your Perfect Ride
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium mt-1 max-w-xl">
              Choose from our carefully selected collection of rental vehicles, all insured and inspected for Nepal highway conditions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/cars')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-2xs hover:shadow-sm transition-all"
          >
            <span>View All Fleet</span>
            <ArrowRight className="w-4 h-4 text-[#0755C9]" />
          </button>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0755C9] text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Vehicle Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#0755C9]" />
            <span className="text-sm font-semibold">Loading available vehicles from Nepal fleet...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-rose-100 shadow-sm">
            <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">{error}</p>
            <button
              onClick={fetchVehicles}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0755C9] text-white text-xs font-bold"
            >
              Retry
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Car className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-black text-slate-800">No vehicles available in this category</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching categories or view our full fleet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {vehicles.map((v) => {
              const carImage = v.images?.[0] || '/cars/creta.png';
              const priceWithDriver = v.pricing?.dailyWithDriver || 8500;
              const priceSelfDrive = v.pricing?.dailySelfDrive || 7000;
              const activePrice = rentalType === 'self_drive' ? priceSelfDrive : priceWithDriver;
              const isFav = isFavorite(v._id);

              return (
                <div
                  key={v._id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Image & Badges Container */}
                  <div className="relative h-52 bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 flex items-center justify-center overflow-hidden">
                    {/* Top Tag Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#0755C9] border border-blue-200 shadow-2xs">
                        {v.category}
                      </span>
                      {v.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-2xs">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(v._id)}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-2xs transition-colors z-10 cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>

                    {/* Vehicle Photography */}
                    <img
                      src={carImage}
                      alt={v.name}
                      loading="lazy"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/cars/creta.png';
                      }}
                    />

                    {/* Status Pill */}
                    <div className="absolute bottom-3 left-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          v.status === 'rented'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${v.status === 'rented' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                        {v.status === 'rented' ? 'Currently Rented' : 'Available Now'}
                      </span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 right-3.5 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{v.rating || 4.8}</span>
                      <span className="text-slate-400 text-[10px]">({v.reviewCount || 120})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Title & Brand */}
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-base font-black text-slate-900 group-hover:text-[#0755C9] transition-colors">
                          {v.name}
                        </h3>
                        <span className="text-xs font-semibold text-slate-400">
                          {v.modelYear || 2024}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {v.brand} • <span className="text-slate-400 font-mono text-[11px]">{v.registrationNumber}</span>
                      </p>
                    </div>

                    {/* Specification Badges */}
                    <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 text-[11px] text-slate-600 font-semibold">
                      <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-xl">
                        <Users className="w-3.5 h-3.5 text-slate-400 mb-1" />
                        <span>{v.seats} Seats</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-xl">
                        <TransmissionIcon className="w-3.5 h-3.5 text-slate-400 mb-1" />
                        <span className="truncate">{v.transmission || 'Manual'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-xl">
                        <Fuel className="w-3.5 h-3.5 text-slate-400 mb-1" />
                        <span className="truncate">{v.fuelType || 'Petrol'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-xl">
                        <Snowflake className="w-3.5 h-3.5 text-[#0755C9] mb-1" />
                        <span>{v.hasAC !== false ? 'AC' : 'Non-AC'}</span>
                      </div>
                    </div>

                    {/* Rental Mode Support */}
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                      <span className="text-slate-400 font-medium">Options:</span>
                      <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3 h-3" /> With Driver
                      </span>
                      <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3 h-3" /> Self Drive
                      </span>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Daily Rate (NPR)
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-slate-900">
                            NPR {activePrice.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">/ day</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewDetails(v)}
                          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBookVehicle(v)}
                          className="px-4 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
