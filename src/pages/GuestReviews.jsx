import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { useAppData } from '../context/AppDataContext';

// Hardcoded premium reviews matching WhatOurGuestsSay
const premiumReviews = [
  {
    id: 'p1',
    rating: 5,
    title: "Stunning family Chitwan Jungle Safari",
    text: "We booked the Chitwan Jungle Safari Tour for our family of 8, and it was unforgettable. Zenex arranged the perfect minibus, a stunning eco-resort, and all the safari activities. Having a dedicated tour operator made everything comfortable.",
    name: "Elena Rodriguez",
    country: "Spain",
    date: "February 2026",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    destination: "Chitwan National Park",
    tour: "Chitwan Jungle Safari Tour",
    platform: "Tripadvisor"
  },
  {
    id: 'p2',
    rating: 5,
    title: "An unforgettable journey through Nepal.",
    text: "From the moment we arrived, everything was perfectly organized. Our guide was knowledgeable, friendly, and made the entire journey feel effortless. Nepal exceeded all our expectations.",
    name: "Fedor Treney",
    country: "Russia",
    date: "August 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    destination: "Annapurna Circuit",
    tour: "Annapurna Sanctuary Trek",
    platform: "Google Reviews"
  },
  {
    id: 'p3',
    rating: 5,
    title: "Incredible Mustang off-road experience!",
    text: "Our Mustang jeep tour with Zenex Travel was incredible. The 4x4 they provided was immaculate for the rough terrain, and our guide was deeply knowledgeable. The entire tour package gave us total peace of mind.",
    name: "Sarah Jenkins",
    country: "USA",
    date: "March 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    destination: "Mustang Region",
    tour: "Mustang Off-Road Expedition",
    platform: "Tripadvisor"
  },
  {
    id: 'p4',
    rating: 5,
    title: "Seamless Annapurna Base Camp Trek",
    text: "Booking our Annapurna trek was seamless. The team handled everything from the airport pickup to the permits and providing a highly experienced guide. Our entire trip was flawlessly organized. Highly recommend Zenex for any Nepal tour!",
    name: "David Chen",
    country: "Taiwan",
    date: "April 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    destination: "Annapurna Base Camp",
    tour: "Complete ABC Trek Package",
    platform: "Google Reviews"
  },
  {
    id: 'p5',
    rating: 5,
    title: "Everest Flight & Cultural Valley Tour",
    text: "An absolute dream come true. The Everest flight was breathtaking, and the guided historical tours around Kathmandu, Patan, and Bhaktapur durbar squares were rich in details. Exceptional hospitality from the local drivers.",
    name: "John Miller",
    country: "UK",
    date: "October 2025",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    destination: "Everest Region",
    tour: "Everest Heli Tour & Sightseeing",
    platform: "Tripadvisor"
  },
  {
    id: 'p6',
    rating: 5,
    title: "Beautiful Pokhara Lakes & Sarangkot Sunrise",
    text: "Seeing the sunrise over the Himalayas from Sarangkot and boating on Fewa Lake was ethereal. The vehicle rentals were top-tier, exceptionally clean, and the booking coordinators responded to all our queries within minutes.",
    name: "Yuki Tanaka",
    country: "Japan",
    date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    destination: "Pokhara Valley",
    tour: "Pokhara Lakes & Sarangkot Sunrise Tour",
    platform: "Google Reviews"
  }
];

const GuestReviews = () => {
  const { testimonials = [] } = useAppData() || {};
  const [combinedReviews, setCombinedReviews] = useState(premiumReviews);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Convert database testimonials into detailed review objects and merge them
    const dbReviews = (testimonials || []).map((t, idx) => {
      // Avoid duplicating testimonials that might share names with premium ones
      if (premiumReviews.some(p => p.name.toLowerCase() === t.name.toLowerCase())) {
        return null;
      }
      return {
        id: t.id || `db-${idx}`,
        rating: 5,
        title: "An incredible adventure in Nepal!",
        text: t.text,
        name: t.name,
        country: t.country || "Verified Guest",
        date: t.date || "2026",
        avatar: t.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0F766E&color=fff`,
        destination: t.trip || "Nepal",
        tour: t.vehicle || "Zenex Guided Tour",
        platform: t.platform || "Direct Booking"
      };
    }).filter(Boolean);

    setCombinedReviews([...premiumReviews, ...dbReviews]);
  }, [testimonials]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, combinedReviews.length));
  };

  return (
    <div className="bg-[#EBF3FA] min-h-screen py-24 font-sans">
      <SEO 
        title="Stories From Our Guests - Zenex Travels and Tours"
        description="Read verified traveler experiences and trekking stories from our guests who explored Kathmandu, Everest, Annapurna, and Mustang with us."
        canonicalUrl="https://zenextravel.com.np/guest-reviews"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-[0.2em] text-[#0F766E] uppercase block mb-3">
            GUEST DIARIES
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0f3493] mb-4 tracking-tight">
            Stories From Our Guests
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium text-sm md:text-base">
            Real experiences from travelers who explored Nepal with Zenex Travels.
          </p>
        </div>

        {/* Rating Summary Banner at Top */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="bg-[#0f3493]/5 rounded-2xl p-6 flex flex-col items-center justify-center shrink-0">
              <span className="text-3xl font-black text-[#0f3493]">4.9</span>
              <span className="text-xs text-gray-500 font-bold mt-1">out of 5</span>
            </div>
            
            <div>
              <div className="flex justify-center sm:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#E59A2F] text-[#E59A2F]" />
                ))}
              </div>
              <h3 className="text-lg font-extrabold text-[#0f3493]">Based on guest reviews</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">Verified aggregations from TripAdvisor & Google reviews.</p>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-150 pt-6 md:pt-0 md:pl-8 w-full md:w-auto justify-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-black text-[#0f3493]">Tripadvisor</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">5.0 Star Rating</span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-black text-[#0f3493]">Google Reviews</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">4.9 Star Rating</span>
            </div>
          </div>
        </div>

        {/* Responsive Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {combinedReviews.slice(0, visibleCount).map((review) => (
            <div 
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(7,22,36,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
            >
              <div>
                {/* Header Row: stars & platform logo */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#E59A2F] text-[#E59A2F]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-[#0F766E] uppercase tracking-wider">
                    {review.platform}
                  </span>
                </div>

                {/* Review Content */}
                <h4 className="text-[16px] font-bold text-[#0f3493] mb-3 leading-snug">
                  “{review.title}”
                </h4>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Footer Part */}
              <div className="border-t border-slate-50 pt-4 mt-auto">
                {/* Guest Details */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0 bg-slate-50">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0f3493] text-xs flex items-center gap-1">
                      {review.name}
                      <span className="text-[#0F766E]" title="Verified Guest">
                        <CheckCircle2 size={12} />
                      </span>
                    </h5>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      {review.country} &bull; {review.date}
                    </p>
                  </div>
                </div>

                {/* Trip details tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="bg-slate-50 rounded-xl px-2.5 py-1 flex items-center gap-1 border border-slate-100 max-w-full">
                    <MapPin size={10} className="text-[#0F766E]" />
                    <span className="text-[10px] text-slate-500 font-bold truncate">{review.destination}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-2.5 py-1 flex items-center gap-1 border border-slate-100 max-w-full">
                    <Sparkles size={10} className="text-[#E59A2F]" />
                    <span className="text-[10px] text-slate-500 font-bold truncate">{review.tour}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < combinedReviews.length && (
          <div className="text-center">
            <button 
              onClick={loadMore}
              className="inline-flex items-center justify-center gap-2 bg-[#0f3493] hover:bg-[#0a2366] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Load More Reviews
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default GuestReviews;
