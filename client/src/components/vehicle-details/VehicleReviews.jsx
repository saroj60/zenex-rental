import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import api from '../../services/api';

export default function VehicleReviews({ vehicleId, averageRating = 4.8, reviewCount = 0 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vehicleId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/vehicles/${vehicleId}/reviews`);
        if (res.data?.data) {
          setReviews(res.data.data);
        }
      } catch (err) {
        console.warn('Could not load vehicle reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [vehicleId]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-[#10243A]">
            Verified Customer Reviews
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            Feedback from travelers who booked and drove this vehicle in Nepal
          </p>
        </div>

        {/* Aggregate Score Pill */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl self-start sm:self-auto">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-black text-slate-900">{averageRating.toFixed(1)}</span>
          <span className="text-xs font-semibold text-slate-500">
            ({reviewCount || reviews.length} verified ratings)
          </span>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="py-8 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#0755C9]" />
          <span className="text-xs font-bold">Loading traveler reviews...</span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-xs font-black text-slate-700">No Reviews Recorded Yet</h4>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
            Be the first customer to rent this vehicle and share your trip experience across Nepal!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => {
            const customerName = r.user?.name || 'Verified Customer';
            const customerAvatar =
              r.user?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=0755C9&color=fff`;

            return (
              <div
                key={r._id}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={customerAvatar}
                      alt={customerName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=0755C9&color=fff`;
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">{customerName}</span>
                        {r.user?.isVerified && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
                            <ShieldCheck className="w-2.5 h-2.5" /> Verified Renter
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent trip'}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (r.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
