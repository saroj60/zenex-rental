import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const guestReviews = [
  {
    id: 1,
    rating: 5,
    title: "An unforgettable journey through Nepal.",
    text: "From the moment we arrived, everything was perfectly organized. Our guide was knowledgeable, friendly, and made the entire journey feel effortless. Nepal exceeded all our expectations.",
    name: "Fedor Treney",
    country: "Russia",
    date: "August 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    locationLabel: "ANNAPURNA · NEPAL",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800",
  },
  {
    id: 2,
    rating: 5,
    title: "Incredible Mustang off-road experience!",
    text: "Our Mustang jeep tour with Zenex Travel was incredible. The 4x4 they provided was immaculate for the rough terrain, and our guide was deeply knowledgeable. The entire tour package gave us total peace of mind.",
    name: "Sarah Jenkins",
    country: "USA",
    date: "March 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    locationLabel: "MUSTANG · NEPAL",
    image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800",
  },
  {
    id: 3,
    rating: 5,
    title: "Seamless Annapurna Base Camp Trek",
    text: "Booking our Annapurna trek was seamless. The team handled everything from the airport pickup to the permits and providing a highly experienced guide. Our entire trip was flawlessly organized. Highly recommend Zenex for any Nepal tour!",
    name: "David Chen",
    country: "Taiwan",
    date: "April 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    locationLabel: "ANNAPURNA BASE CAMP",
    image: "https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800",
  },
  {
    id: 4,
    rating: 5,
    title: "Stunning family Chitwan Jungle Safari",
    text: "We booked the Chitwan Jungle Safari Tour for our family of 8, and it was unforgettable. Zenex arranged the perfect minibus, a stunning eco-resort, and all the safari activities. Having a dedicated tour operator made everything comfortable.",
    name: "Elena Rodriguez",
    country: "Spain",
    date: "February 2026",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    locationLabel: "CHITWAN NATIONAL PARK",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=800",
  },
  {
    id: 5,
    rating: 5,
    title: "Everest Flight & Cultural Valley Tour",
    text: "An absolute dream come true. The Everest flight was breathtaking, and the guided historical tours around Kathmandu, Patan, and Bhaktapur durbar squares were rich in details. Exceptional hospitality from the local drivers.",
    name: "John Miller",
    country: "UK",
    date: "October 2025",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    locationLabel: "EVEREST REGION",
    image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800",
  },
  {
    id: 6,
    rating: 5,
    title: "Beautiful Pokhara Lakes & Sarangkot Sunrise",
    text: "Seeing the sunrise over the Himalayas from Sarangkot and boating on Fewa Lake was ethereal. The vehicle rentals were top-tier, exceptionally clean, and the booking coordinators responded to all our queries within minutes.",
    name: "Yuki Tanaka",
    country: "Japan",
    date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    locationLabel: "POKHARA · NEPAL",
    image: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=800",
  }
];

const WhatOurGuestsSay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % guestReviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + guestReviews.length) % guestReviews.length);
  };

  const currentReview = guestReviews[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  return (
    <section className="relative py-20 px-4 md:px-8 bg-white overflow-hidden font-sans">
      
      {/* Decorative Himalayan Silhouette Contour (Extremely Subtle Background Detail) */}
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-[0.02] pointer-events-none z-0">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <path d="M0 120 L80 100 L160 130 L240 80 L320 110 L400 60 L480 120 L560 90 L640 140 L720 100 L800 70 L880 110 L960 50 L1040 100 L1120 70 L1200 130 L1280 80 L1360 110 L1440 40 L1440 200 L0 200 Z" fill="#0f3493" />
        </svg>
      </div>

      <div className="absolute top-10 left-10 w-48 h-48 opacity-[0.03] pointer-events-none z-0">
        {/* Subtle Route Map Dot Matrix Detail */}
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="1.5" fill="#e53a24" />
          <line x1="10" y1="10" x2="30" y2="40" stroke="#e53a24" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="30" cy="40" r="1.5" fill="#e53a24" />
          <line x1="30" y1="40" x2="60" y2="20" stroke="#e53a24" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="60" cy="20" r="1.5" fill="#e53a24" />
          <line x1="60" y1="20" x2="80" y2="70" stroke="#e53a24" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="70" r="2.5" fill="#E59A2F" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#e53a24] uppercase block mb-3">
            REAL STORIES FROM NEPAL
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3493] mb-4 tracking-tight">
            What Our Guests Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium text-sm md:text-base">
            Discover what travelers from around the world experienced with Zenex Travels.
          </p>
        </div>

        {/* Premium Testimonial Container (Unified Asymmetric Layout) */}
        <div className="bg-[#071624] rounded-[24px] shadow-[0_20px_50px_rgba(7,22,36,0.15)] border border-slate-800/40 overflow-hidden relative">
          
          {/* Subtle Himalayan Navy Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
            
            {/* Left Side: Testimonial Story & Details */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between relative z-10">
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex-1 flex flex-col justify-center"
                >
                  {/* Saffron Stars */}
                  <div className="flex gap-1.5 mb-6">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-[#E59A2F] text-[#E59A2F]" />
                    ))}
                  </div>

                  {/* Title & Testimonial Text */}
                  <blockquote className="space-y-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      “{currentReview.title}”
                    </h3>
                    <p className="text-slate-300 font-medium leading-relaxed text-sm md:text-base">
                      "{currentReview.text}"
                    </p>
                  </blockquote>

                  {/* Guest Info Card */}
                  <div className="flex items-center gap-4 border-t border-slate-800/80 pt-6 mb-8">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 shadow-md shrink-0 bg-slate-800">
                      <img src={currentReview.avatar} alt={currentReview.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-[15px] flex items-center gap-1.5">
                        {currentReview.name}
                        <span className="inline-flex items-center text-blue-400 fill-blue-400/10" title="Verified Customer">
                          <CheckCircle2 size={15} />
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {currentReview.country} &bull; {currentReview.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Row: Trust Platforms & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-800/40 pt-6 mt-auto">
                {/* Review Platforms Summary */}
                <div className="flex items-center gap-6">
                  <div className="text-left shrink-0">
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-[#E59A2F] text-[#E59A2F]" />
                      ))}
                    </div>
                    <p className="text-[11px] font-black text-white leading-none">4.9 / 5</p>
                    <p className="text-[9px] text-slate-500 font-bold tracking-tight mt-0.5">150+ Guest Reviews</p>
                  </div>

                  <div className="h-6 w-px bg-slate-800"></div>

                  <div className="flex items-center gap-4 text-xs font-extrabold text-slate-400">
                    <span className="hover:text-white transition-colors cursor-default">Tripadvisor</span>
                    <span className="hover:text-white transition-colors cursor-default">Google Reviews</span>
                  </div>
                </div>

                {/* Slider Navigation controls */}
                <div className="flex items-center gap-4 shrink-0">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white flex items-center justify-center transition-all bg-slate-900/50 hover:bg-slate-800/40 active:scale-95"
                    aria-label="Previous Review"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <span className="text-xs font-bold text-slate-400 min-w-[45px] text-center tracking-widest">
                    {String(currentReview.id).padStart(2, '0')} / {String(guestReviews.length).padStart(2, '0')}
                  </span>

                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white flex items-center justify-center transition-all bg-slate-900/50 hover:bg-slate-800/40 active:scale-95"
                    aria-label="Next Review"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Side: Travel Photograph (Asymmetric Display) */}
            <div className="lg:col-span-5 relative overflow-hidden min-h-[300px] lg:min-h-full bg-slate-950">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={currentReview.image}
                  alt={currentReview.locationLabel}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.05, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Subtly darkened bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Overlay Labels */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">GUEST EXPERIENCE</span>
                  <div className="flex items-center gap-1.5 text-white font-extrabold text-xs sm:text-sm tracking-wide">
                    <MapPin size={13} className="text-[#e53a24]" />
                    {currentReview.locationLabel}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Block (Unified inside section) */}
        <div className="mt-10 text-center relative z-10">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 max-w-xl mx-auto shadow-sm">
            <span className="text-[#0f3493] text-sm md:text-base font-bold text-center sm:text-left">
              Ready to create your own Nepal story?
            </span>
            <Link 
              to="/packages"
              className="inline-flex items-center gap-1.5 bg-[#0f3493] hover:bg-[#0a2366] text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Explore Packages
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatOurGuestsSay;
