import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Play, CheckCircle2, Volume2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const guestTestimonials = [
  {
    id: 1,
    rating: 5,
    title: "An unforgettable journey through Nepal.",
    text: "From the moment we arrived, everything was perfectly organized. Our guide was knowledgeable, friendly, and made the entire journey feel effortless. Nepal exceeded all our expectations.",
    name: "Fedor Treney",
    country: "Russia",
    date: "August 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
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
  }
];

const travelVideos = [
  {
    id: 1,
    location: "ANNAPURNA · NEPAL",
    title: "Trekking Annapurna Circuit",
    duration: "1:24 mins",
    thumbnail: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800",
  },
  {
    id: 2,
    location: "EVEREST BASE CAMP",
    title: "Himalayan Helicopter Tour",
    duration: "2:05 mins",
    thumbnail: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800",
  },
  {
    id: 3,
    location: "MUSTANG · NEPAL",
    title: "Off-Road Jeep Adventure",
    duration: "1:48 mins",
    thumbnail: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800",
  }
];

const WhatOurGuestsSay = () => {
  const [testiIndex, setTestiIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const handleNextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % guestTestimonials.length);
  };

  const handlePrevTesti = () => {
    setTestiIndex((prev) => (prev - 1 + guestTestimonials.length) % guestTestimonials.length);
  };

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % travelVideos.length);
  };

  const handlePrevVideo = () => {
    setVideoIndex((prev) => (prev - 1 + travelVideos.length) % travelVideos.length);
  };

  const currentTesti = guestTestimonials[testiIndex];
  const currentVideo = travelVideos[videoIndex];

  return (
    <section className="py-20 px-4 md:px-8 bg-[#EBF3FA] border-y border-slate-200/60 overflow-hidden font-sans relative">
      
      {/* Decorative Himalayan Outline detail */}
      <div className="absolute top-10 right-10 w-24 h-24 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 80 L35 45 L50 60 L75 30 L90 80 Z" fill="#0f3493" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#0F766E] uppercase block mb-3">
            REAL STORIES FROM NEPAL
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3493] mb-4 tracking-tight">
            What Our Guests Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium text-sm md:text-base">
            Discover what travelers from around the world experienced with Zenex Travels.
          </p>
        </div>

        {/* Unified Testimonial + Video Block Container */}
        <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(7,22,36,0.06)] border border-slate-100 p-6 md:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* LEFT COLUMN: Testimonial Carousel */}
            <div className="lg:col-span-6 flex flex-col justify-between p-2 lg:pr-8 border-b lg:border-b-0 lg:border-r border-slate-100 pb-10 lg:pb-0">
              <div className="flex-1 flex flex-col justify-center">
                
                {/* Saffron Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(currentTesti.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#E59A2F] text-[#E59A2F]" />
                  ))}
                </div>

                {/* Title and Testimonial Quote */}
                <h3 className="text-xl md:text-2xl font-bold text-[#0f3493] mb-4 leading-tight">
                  “{currentTesti.title}”
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base mb-8">
                  "{currentTesti.text}"
                </p>

                {/* Guest Details */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0 bg-slate-50">
                    <img src={currentTesti.avatar} alt={currentTesti.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f3493] text-[15px] flex items-center gap-1">
                      {currentTesti.name}
                      <span className="text-[#0F766E] fill-[#0F766E]/10" title="Verified Traveler">
                        <CheckCircle2 size={15} />
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      {currentTesti.country} &bull; {currentTesti.date}
                    </p>
                  </div>
                </div>

              </div>

              {/* Left Carousel Controls */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-50">
                <div className="flex gap-1.5">
                  {guestTestimonials.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setTestiIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === testiIndex ? 'w-6 bg-[#0f3493]' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-2 ml-auto">
                  <button 
                    onClick={handlePrevTesti}
                    className="w-9 h-9 rounded-full border border-slate-250 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Previous Testimonial"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button 
                    onClick={handleNextTesti}
                    className="w-9 h-9 rounded-full border border-slate-250 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Next Testimonial"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Travel Video Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-between p-2 lg:pl-4">
              
              {/* Premium Video Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group shadow-md border border-slate-200/40">
                <img 
                  src={currentVideo.thumbnail} 
                  alt={currentVideo.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Bottom subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

                {/* Premium Pulse Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-lg hover:bg-[#0c5c56] transition-all hover:scale-110 active:scale-95 group/play z-10 relative">
                    <span className="absolute inset-0 rounded-full bg-[#0F766E]/30 animate-ping pointer-events-none scale-105"></span>
                    <Play size={24} className="fill-white translate-x-0.5" />
                  </button>
                </div>

                {/* Location Overlay details */}
                <div className="absolute bottom-4 left-5 z-10 text-left">
                  <span className="text-[9px] font-black text-slate-300 tracking-wider uppercase block mb-1">
                    GUEST MEMORY &bull; {currentVideo.duration}
                  </span>
                  <h4 className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                    {currentVideo.location}
                  </h4>
                </div>
              </div>

              {/* Video Info and Selector Underneath */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-[15px] font-black text-[#0f3493] uppercase tracking-wider">{currentVideo.title}</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Explore authentic, unedited travel video clip captured in Nepal.</p>
                </div>

                {/* Video controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center ml-auto sm:ml-0">
                  <button 
                    onClick={handlePrevVideo}
                    className="w-9 h-9 rounded-full border border-slate-250 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Previous Video"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  
                  <span className="text-xs font-extrabold text-slate-400 min-w-[40px] text-center">
                    {currentVideo.id} / {travelVideos.length}
                  </span>

                  <button 
                    onClick={handleNextVideo}
                    className="w-9 h-9 rounded-full border border-slate-250 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Next Video"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM CTA: Unified inside the same section wrapper */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-5 bg-white border border-slate-100 rounded-2xl px-6 py-4 max-w-xl mx-auto shadow-sm">
            <span className="text-[#0f3493] text-sm md:text-base font-bold text-center sm:text-left">
              Ready to create your own Nepal story?
            </span>
            <Link 
              to="/packages"
              className="inline-flex items-center gap-1.5 bg-[#0f3493] hover:bg-[#0a2366] text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 shrink-0"
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
