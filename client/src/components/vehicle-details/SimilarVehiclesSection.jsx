import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  Star,
  Users,
  Settings,
  ArrowRight,
  Loader2
} from 'lucide-react';
import api from '../../services/api';

export default function SimilarVehiclesSection({ vehicleId, rentalType = 'with_driver' }) {
  const navigate = useNavigate();
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vehicleId) return;

    const fetchSimilar = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/vehicles/${vehicleId}/similar`);
        if (res.data?.data) {
          setSimilar(res.data.data);
        }
      } catch (err) {
        console.warn('Could not load similar vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [vehicleId]);

  if (!loading && similar.length === 0) return null;

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-[#10243A] tracking-tight">
            Similar Rental Vehicles You May Like
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            Alternative cars available in the same category & price tier
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/cars')}
          className="text-xs font-black text-[#0755C9] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="py-8 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#0755C9]" />
          <span className="text-xs font-bold">Finding comparable cars...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {similar.map((v) => {
            const dailyPrice =
              rentalType === 'self_drive'
                ? v.pricing?.dailySelfDrive || 7000
                : v.pricing?.dailyWithDriver || 8500;

            return (
              <div
                key={v._id}
                onClick={() => {
                  navigate(`/cars/${v._id || v.slug}`);
                  window.scrollTo(0, 0);
                }}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative h-40 bg-slate-50 rounded-2xl p-3 flex items-center justify-center overflow-hidden mb-3">
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white/90 text-[#0755C9] border border-blue-200">
                    {v.category}
                  </span>
                  <img
                    src={v.images?.[0] || '/cars/creta.png'}
                    alt={v.name}
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/cars/creta.png';
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-[#0755C9] transition-colors truncate">
                      {v.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {v.modelYear || 2024}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {v.seats} Seats
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Settings className="w-3 h-3 text-slate-400" />
                      {v.transmission}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-400 block">From</span>
                      <span className="text-sm font-black text-slate-900">
                        NPR {dailyPrice.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-500"> /day</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#0755C9] group-hover:bg-[#0755C9] group-hover:text-white font-extrabold text-[11px] transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
