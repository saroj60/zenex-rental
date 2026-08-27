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
    video: {
      title: "Chitwan Jungle Safari",
      duration: "1:48 mins",
      thumbnail: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=800",
      location: "CHITWAN · NEPAL"
    }
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
    video: {
      title: "Trekking Annapurna Circuit",
      duration: "1:24 mins",
      thumbnail: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800",
      location: "ANNAPURNA · NEPAL"
    }
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
    video: {
      title: "Off-Road Jeep Adventure",
      duration: "2:05 mins",
      thumbnail: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800",
      location: "MUSTANG · NEPAL"
    }
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
    video: {
      title: "Annapurna Base Camp Trek",
      duration: "1:15 mins",
      thumbnail: "https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800",
      location: "ABC · NEPAL"
    }
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
    video: {
      title: "Himalayan Helicopter Tour",
      duration: "2:10 mins",
      thumbnail: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800",
      location: "EVEREST · NEPAL"
    }
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
    video: {
      title: "Pokhara & Phewa Lake Tour",
      duration: "1:30 mins",
      thumbnail: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=800",
      location: "POKHARA · NEPAL"
    }
  }
];

const WhatOurGuestsSay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % guestReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + guestReviews.length) % guestReviews.length);
  };

  const currentReview = guestReviews[currentIndex];

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
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#E59A2F] text-[#E59A2F]" />
                  ))}
                </div>

                {/* Title and Testimonial Quote */}
                <h3 className="text-xl md:text-2xl font-bold text-[#0f3493] mb-4 leading-tight">
                  “{currentReview.title}”
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base mb-8">
                  "{currentReview.text}"
                </p>

                {/* Guest Details */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0 bg-slate-50">
                    <img src={currentReview.avatar} alt={currentReview.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f3493] text-[15px] flex items-center gap-1">
                      {currentReview.name}
                      <span className="text-[#0F766E] fill-[#0F766E]/10" title="Verified Traveler">
                        <CheckCircle2 size={15} />
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
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
                    <p className="text-[15px] font-black text-[#0f3493] leading-none">4.9 / 5</p>
                    <p className="text-[11px] text-gray-500 font-bold tracking-tight mt-1">150+ Guest Reviews</p>
                  </div>

                  <div className="h-8 w-px bg-slate-200"></div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-4 text-xs font-extrabold text-[#0f3493]">
                      <span className="hover:text-teal-600 transition-colors cursor-default">Tripadvisor</span>
                      <span className="hover:text-teal-600 transition-colors cursor-default">Google Reviews</span>
                    </div>
                    <Link to="/guest-reviews" className="text-[#0F766E] hover:text-[#0a5c56] text-[11px] font-black tracking-wide flex items-center gap-0.5 mt-1 transition-colors">
                      View All Guest Reviews &rarr;
                    </Link>
                  </div>
                </div>

                {/* Slider Navigation controls */}
                <div className="flex items-center gap-4 shrink-0">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-slate-250 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Previous Review"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <span className="text-xs font-bold text-[#0f3493] min-w-[50px] text-center tracking-widest">
                    {String(currentReview.id).padStart(2, '0')} / {String(guestReviews.length).padStart(2, '0')}
                  </span>

                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-slate-250 hover:border-slate-400 text-slate-500 hover:text-[#0f3493] flex items-center justify-center transition-colors hover:bg-slate-50 active:scale-95"
                    aria-label="Next Review"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Travel Video Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-between p-2 lg:pl-4">
              
              {/* Premium Video Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group shadow-md border border-slate-200/40">
                <img 
                  src={currentReview.video.thumbnail} 
                  alt={currentReview.video.title} 
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
                    GUEST MEMORY &bull; {currentReview.video.duration}
                  </span>
                  <h4 className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                    {currentReview.video.location}
                  </h4>
                </div>
              </div>

              {/* Video Info Selector Underneath */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-[15px] font-black text-[#0f3493] uppercase tracking-wider">{currentReview.video.title}</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Explore authentic, unedited travel video clip captured in Nepal.</p>
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
