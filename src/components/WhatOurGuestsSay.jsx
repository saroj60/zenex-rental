import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Play, CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const guestReviews = [
  {
    id: 1,
    rating: 5,
    title: "Stunning family Chitwan Jungle Safari",
    text: "We booked the Chitwan Jungle Safari Tour for our family of 8, and it was unforgettable. Zenex arranged the perfect minibus, a stunning eco-resort, and all the safari activities. Having a dedicated tour operator made everything comfortable.",
    name: "Elena Rodriguez",
    country: "Spain",
    date: "February 2026",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    destination: "CHITWAN NATIONAL PARK",
  },
  {
    id: 2,
    rating: 5,
    title: "An unforgettable journey through Nepal.",
    text: "From the moment we arrived, everything was perfectly organized. Our guide was knowledgeable, friendly, and made the entire journey feel effortless. Nepal exceeded all our expectations.",
    name: "Fedor Treney",
    country: "Russia",
    date: "August 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    destination: "ANNAPURNA CIRCUIT",
  },
  {
    id: 3,
    rating: 5,
    title: "Incredible Mustang off-road experience!",
    text: "Our Mustang jeep tour with Zenex Travel was incredible. The 4x4 they provided was immaculate for the rough terrain, and our guide was deeply knowledgeable. The entire tour package gave us total peace of mind.",
    name: "Sarah Jenkins",
    country: "USA",
    date: "March 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    destination: "MUSTANG REGION",
  },
  {
    id: 4,
    rating: 5,
    title: "Seamless Annapurna Base Camp Trek",
    text: "Booking our Annapurna trek was seamless. The team handled everything from the airport pickup to the permits and providing a highly experienced guide. Our entire trip was flawlessly organized. Highly recommend Zenex for any Nepal tour!",
    name: "David Chen",
    country: "Taiwan",
    date: "April 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    destination: "ANNAPURNA BASE CAMP",
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
    destination: "EVEREST BASE CAMP",
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
    destination: "POKHARA VALLEY",
  }
];

import { travelVideos } from '../data/travelVideosData';

const getEmbedUrl = (url, platform) => {
  if (!url) return '';
  if (platform.toLowerCase() === 'youtube') {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  if (platform.toLowerCase() === 'vimeo') {
    let videoId = '';
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    if (match && match[3]) {
      videoId = match[3];
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  return url;
};

const WhatOurGuestsSay = () => {
  const [testiIndex, setTestiIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isPlayMode, setIsPlayMode] = useState(false);

  const findRelatedVideoIndex = (testimonial) => {
    if (!testimonial || !testimonial.destination) return -1;
    const destLower = testimonial.destination.toLowerCase();
    return travelVideos.findIndex(video => {
      const cleanVideoDest = video.destination.split('·')[0].trim().toLowerCase();
      return destLower.includes(cleanVideoDest) || cleanVideoDest.includes(destLower);
    });
  };

  const changeTestimonial = (newIndex) => {
    setTestiIndex(newIndex);
    const nextTesti = guestReviews[newIndex];
    const matchedIndex = findRelatedVideoIndex(nextTesti);
    if (matchedIndex !== -1) {
      setVideoIndex(matchedIndex);
      setIsPlayMode(false);
    }
  };

  const handleNextTesti = () => {
    const nextIndex = (testiIndex + 1) % guestReviews.length;
    changeTestimonial(nextIndex);
  };

  const handlePrevTesti = () => {
    const prevIndex = (testiIndex - 1 + guestReviews.length) % guestReviews.length;
    changeTestimonial(prevIndex);
  };

  const handleNextVideo = () => {
    setIsPlayMode(false);
    setVideoIndex((prev) => (prev + 1) % travelVideos.length);
  };

  const handlePrevVideo = () => {
    setIsPlayMode(false);
    setVideoIndex((prev) => (prev - 1 + travelVideos.length) % travelVideos.length);
  };

  const currentReview = guestReviews[testiIndex];
  const currentVideo = travelVideos[videoIndex];

  return (
    <section className="py-20 px-4 md:px-8 bg-[#EBF3FA] border-y border-slate-200/60 overflow-hidden font-sans relative">
      
      {/* Decorative Himalayan Outline detail */}
      <div className="absolute top-10 right-10 w-24 h-24 opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 80 L35 45 L50 60 L75 30 L90 80 Z" fill="#0f3493" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Unified Testimonial + Video Block Container */}
        <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(7,22,36,0.06)] border border-slate-100 p-6 md:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* LEFT COLUMN: Testimonial Carousel */}
            <div className="lg:col-span-6 flex flex-col justify-between p-2 lg:pr-8 border-b lg:border-b-0 lg:border-r border-slate-100 pb-10 lg:pb-0">
              
              {/* Column Header */}
              <div className="text-left mb-8 shrink-0">
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#0F766E] uppercase block mb-2">
                  REAL STORIES FROM NEPAL
                </span>
                <h2 className="text-2xl md:text-3.5xl font-black text-[#0f3493] tracking-tight">
                  What Our Guests Say
                </h2>
              </div>

              <div className="flex-1 flex flex-col justify-center my-4">
                
                {/* Saffron Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#E59A2F] text-[#E59A2F]" />
                  ))}
                </div>

                {/* Title and Testimonial Quote */}
                <h3 className="text-lg md:text-xl font-bold text-[#0f3493] mb-3 leading-snug">
                  “{currentReview.title}”
                </h3>
                <p className="text-gray-650 font-medium leading-relaxed text-xs md:text-sm mb-6">
                  "{currentReview.text}"
                </p>

                {/* Guest Details */}
                <div className="flex items-center gap-4 mt-auto pt-2">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-105 shadow-sm shrink-0 bg-slate-55">
                    <img src={currentReview.avatar} alt={currentReview.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f3493] text-sm flex items-center gap-1">
                      {currentReview.name}
                      <span className="text-[#0F766E] fill-[#0F766E]/10" title="Verified Traveler">
                        <CheckCircle2 size={13} />
                      </span>
                    </h4>
                    <p className="text-[11px] text-gray-400 font-semibold">
                      {currentReview.country} &bull; {currentReview.date}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Trust Platforms & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-6 mt-8">
                {/* Review Platforms Summary */}
                <div className="flex items-center gap-6">
                  <div className="text-left shrink-0">
                    <p className="text-[14px] font-black text-[#0f3493] leading-none">4.9 / 5</p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-tight mt-1">150+ Guest Reviews</p>
                  </div>

                  <div className="h-8 w-px bg-slate-200"></div>

                  <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-3 text-xs font-extrabold text-[#0f3493]">
                      <span className="hover:text-teal-600 transition-colors cursor-default">Tripadvisor</span>
                      <span className="hover:text-teal-600 transition-colors cursor-default">Google Reviews</span>
                    </div>
                    <Link to="/guest-reviews" className="text-[#0F766E] hover:text-[#0a5c56] text-[10px] font-black tracking-wide flex items-center gap-0.5 mt-0.5 transition-colors">
                      View All Guest Reviews &rarr;
                    </Link>
                  </div>
                </div>

                {/* Slider Navigation controls */}
                <div className="flex items-center gap-4 shrink-0">
                  <button 
                    onClick={handlePrevTesti}
                    className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Previous Review"
                  >
                    <ArrowLeft size={15} />
                  </button>

                  <span className="text-[11px] font-bold text-[#0f3493] min-w-[45px] text-center tracking-widest">
                    {String(currentReview.id).padStart(2, '0')} / {String(guestReviews.length).padStart(2, '0')}
                  </span>

                  <button 
                    onClick={handleNextTesti}
                    className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Next Review"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Travel Video Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-between p-2 lg:pl-4">
              
              {/* Column Header */}
              <div className="text-left mb-8 shrink-0">
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#0f3493]/60 uppercase block mb-2">
                  SEE NEPAL
                </span>
                <h2 className="text-2xl md:text-3.5xl font-black text-[#0f3493] tracking-tight mb-2">
                  Watch the Journey
                </h2>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Experience Nepal through our tours, destinations, and adventures.
                </p>
              </div>

              {/* Premium Video Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group shadow-md border border-slate-200/40 my-auto">
                {isPlayMode ? (
                  currentVideo.platform.toLowerCase() === 'direct' ? (
                    <video 
                      src={currentVideo.videoUrl} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-cover rounded-2xl" 
                    />
                  ) : (
                    <iframe 
                      src={getEmbedUrl(currentVideo.videoUrl, currentVideo.platform)} 
                      className="w-full h-full rounded-2xl" 
                      allow="autoplay; encrypted-media; fullscreen" 
                      allowFullScreen 
                      title={currentVideo.title}
                    />
                  )
                ) : (
                  <>
                    <img 
                      src={currentVideo.thumbnail} 
                      alt={currentVideo.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Bottom subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

                    {/* Premium Pulse Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={() => setIsPlayMode(true)}
                        className="w-14 h-14 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-lg hover:bg-[#0c5c56] transition-all hover:scale-110 active:scale-95 group/play z-10 relative"
                      >
                        <span className="absolute inset-0 rounded-full bg-[#0F766E]/30 animate-ping pointer-events-none scale-105"></span>
                        <Play size={20} className="fill-white translate-x-0.5" />
                      </button>
                    </div>

                    {/* Location Overlay details */}
                    <div className="absolute bottom-4 left-5 z-10 text-left">
                      <span className="text-[9px] font-black text-slate-300 tracking-wider uppercase block mb-1">
                        GUEST VIDEO &bull; {currentVideo.platform}
                      </span>
                      <h4 className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                        {currentVideo.destination}
                      </h4>
                    </div>
                  </>
                )}
              </div>

              {/* Video Info and Selector Underneath */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <div>
                  <h4 className="text-[14px] font-black text-[#0f3493] uppercase tracking-wider">{currentVideo.title}</h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">{currentVideo.description}</p>
                </div>

                {/* Video controls */}
                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center ml-auto sm:ml-0">
                  <button 
                    onClick={handlePrevVideo}
                    className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Previous Video"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  
                  <span className="text-[11px] font-bold text-[#0f3493] min-w-[40px] text-center tracking-widest">
                    {String(currentVideo.id).padStart(2, '0')} / {String(travelVideos.length).padStart(2, '0')}
                  </span>

                  <button 
                    onClick={handleNextVideo}
                    className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
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
