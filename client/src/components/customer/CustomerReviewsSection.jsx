import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  CheckCircle,
  Car,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import api from '../../services/api';

export default function CustomerReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews/approved');
        if (res.data?.data) {
          setReviews(res.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch reviews:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#0755C9] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#10243A] tracking-tight">
            What Our Travelers Say
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Read verified experiences from travelers who explored Nepal's cities, highways, and mountain trails with our fleet.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#0755C9]" />
            <span className="text-xs font-bold">Loading verified customer reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-black text-slate-800">No Customer Reviews Yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Be the first to share your rental experience after your journey across Nepal!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => {
              const customerName = r.user?.name || 'Verified Customer';
              const customerAvatar = r.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=0755C9&color=fff`;
              const vehicleName = r.vehicle?.name || 'Nepal Fleet Car';
              const rating = r.rating || 5;

              return (
                <div
                  key={r._id}
                  className="p-6 rounded-3xl bg-white border border-slate-100 shadow-soft hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-slate-200 text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 text-blue-100" />
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed italic mb-6">
                      "{r.comment}"
                    </p>
                  </div>

                  {/* Customer & Car Info Footer */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={customerAvatar}
                        alt={customerName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=0755C9&color=fff`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-black text-slate-900 truncate">
                            {customerName}
                          </h4>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        </div>
                        <p className="text-[10px] font-bold text-[#0755C9] flex items-center gap-1 truncate mt-0.5">
                          <Car className="w-3 h-3 flex-shrink-0" />
                          <span>Rented: {vehicleName}</span>
                        </p>
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
