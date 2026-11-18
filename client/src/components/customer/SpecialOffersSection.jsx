import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tag,
  Percent,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Calendar,
  Gift
} from 'lucide-react';
import api from '../../services/api';

export default function SpecialOffersSection() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get('/coupons/active');
        if (res.data?.data) {
          setCoupons(res.data.data);
        }
      } catch (err) {
        console.warn('Could not load offers:', err.message);
      }
    };
    fetchOffers();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section id="offers" className="py-20 bg-gradient-to-br from-[#0F2236] via-[#10243A] to-[#0755C9] text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Hero */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Gift className="w-3.5 h-3.5" />
            <span>Exclusive Promotional Deals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Your Next Journey Starts Here
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl">
            Discover great rental deals and explore Nepal with comfort. Apply these verified seasonal promo codes at checkout for instant savings.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="px-6 py-3 rounded-2xl bg-[#0755C9] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-700/30 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Offers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.length === 0 ? (
            // Default placeholder if none in DB
            <div className="col-span-full p-8 text-center bg-white/5 rounded-3xl border border-white/10 text-slate-300">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-sm font-bold">New seasonal discounts launching soon! Check back daily.</p>
            </div>
          ) : (
            coupons.map((coupon) => (
              <div
                key={coupon._id || coupon.code}
                className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 p-6 flex flex-col justify-between hover:bg-white/15 hover:border-amber-400/50 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}% OFF`
                        : `NPR ${coupon.discountValue} OFF`}
                    </span>
                    <span className="text-[11px] text-slate-300 font-mono">
                      Max: NPR {coupon.maxDiscountAmount?.toLocaleString() || '5,000'}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-1">
                    {coupon.code}
                  </h3>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                    Valid on all reservations above NPR {coupon.minRentalAmount?.toLocaleString() || '5,000'}.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Valid thru {new Date(coupon.validUntil).toLocaleDateString()}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(coupon.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#10243A] hover:bg-amber-400 font-black text-xs transition-colors cursor-pointer"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
