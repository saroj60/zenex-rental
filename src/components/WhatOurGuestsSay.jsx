import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { travelVideos } from '../data/travelVideosData';

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

const getEmbedUrl = (url, platform, autoplay = false) => {
  if (!url) return '';
  if (platform.toLowerCase() === 'youtube') {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return `https://www.youtube.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
  }
  if (platform.toLowerCase() === 'vimeo') {
    let videoId = '';
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    if (match && match[3]) {
      videoId = match[3];
    }
    return `https://player.vimeo.com/video/${videoId}${autoplay ? '?autoplay=1' : ''}`;
  }
  return url;
};

const WhatOurGuestsSay = () => {
  const [testiIndex, setTestiIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  // Reset playing video when index changes
  useEffect(() => {
    setPlayingVideoId(null);
  }, [videoIndex]);

  // Touch Swipe States
  const [touchStartTesti, setTouchStartTesti] = useState(0);
  const [touchEndTesti, setTouchEndTesti] = useState(0);
  const [touchStartVideo, setTouchStartVideo] = useState(0);
  const [touchEndVideo, setTouchEndVideo] = useState(0);

  const findRelatedVideoIndex = (testimonial) => {
    if (!testimonial || !testimonial.destination) return -1;
    const destLower = testimonial.destination.toLowerCase();
    return travelVideos.findIndex(video => {
      const cleanVideoDest = video.destination.split('·')[0].trim().toLowerCase();
      return destLower.includes(cleanVideoDest) || cleanVideoDest.includes(destLower);
    });
  };

  const changeTestimonial = (newIndex, isManual = false) => {
    setTestiIndex(newIndex);
    const nextTesti = guestReviews[newIndex];
    const matchedIndex = findRelatedVideoIndex(nextTesti);
    
    if (isManual && matchedIndex !== -1) {
      setVideoIndex(matchedIndex);
    }
  };

  const handleNextTesti = () => {
    const nextIndex = (testiIndex + 1) % guestReviews.length;
    changeTestimonial(nextIndex, true);
  };

  const handlePrevTesti = () => {
    const prevIndex = (testiIndex - 1 + guestReviews.length) % guestReviews.length;
    changeTestimonial(prevIndex, true);
  };

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % travelVideos.length);
  };

  const handlePrevVideo = () => {
    setVideoIndex((prev) => (prev - 1 + travelVideos.length) % travelVideos.length);
  };

  const handleMouseEnterVideo = () => {
    if (!isTouchDevice && playingVideoId === null) {
      handleNextVideo();
    }
  };

  // Testimonial Swipe Handlers
  const handleTouchStartTesti = (e) => {
    setTouchStartTesti(e.targetTouches[0].clientX);
  };
  const handleTouchMoveTesti = (e) => {
    setTouchEndTesti(e.targetTouches[0].clientX);
  };
  const handleTouchEndTesti = () => {
    if (touchStartTesti - touchEndTesti > 50) {
      handleNextTesti();
    } else if (touchStartTesti - touchEndTesti < -50) {
      handlePrevTesti();
    }
    setTouchStartTesti(0);
    setTouchEndTesti(0);
  };

  // Video Swipe Handlers
  const handleTouchStartVideo = (e) => {
    setTouchStartVideo(e.targetTouches[0].clientX);
  };
  const handleTouchMoveVideo = (e) => {
    setTouchEndVideo(e.targetTouches[0].clientX);
  };
  const handleTouchEndVideo = () => {
    if (touchStartVideo - touchEndVideo > 50) {
      handleNextVideo();
    } else if (touchStartVideo - touchEndVideo < -50) {
      handlePrevVideo();
    }
    setTouchStartVideo(0);
    setTouchEndVideo(0);
  };

  // Auto-slide Testimonials (updates video index if a matching video is found)
  useEffect(() => {
    if (playingVideoId !== null) return;
    const timer = setInterval(() => {
      setTestiIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % guestReviews.length;
        const nextTesti = guestReviews[nextIndex];
        const matchedIndex = findRelatedVideoIndex(nextTesti);
        if (matchedIndex !== -1) {
          setVideoIndex(matchedIndex);
        }
        return nextIndex;
      });
    }, 5500); // 5.5s interval
    return () => clearInterval(timer);
  }, [playingVideoId]);

  // Auto-slide Videos independently
  useEffect(() => {
    if (playingVideoId !== null) return;
    const timer = setInterval(() => {
      setVideoIndex((prevIndex) => (prevIndex + 1) % travelVideos.length);
    }, 7500); // 7.5s interval
    return () => clearInterval(timer);
  }, [playingVideoId]);

  const currentReview = guestReviews[testiIndex];
  const currentVideo = travelVideos[videoIndex];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#F7FAFC] border-y border-[#e53a24]/15 overflow-x-hidden font-sans relative">
      
      {/* Decorative Himalayan Outline detail */}
      <div className="absolute top-10 right-10 w-24 h-24 opacity-[0.015] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 80 L35 45 L50 60 L75 30 L90 80 Z" fill="#142B5F" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Unified Testimonial + Video Block Container */}
        <div className="bg-white rounded-[24px] shadow-[0_12px_36px_rgba(20,43,95,0.03)] border border-[#e53a24]/10 p-5 sm:p-8 md:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            
            {/* LEFT COLUMN: Testimonial Carousel */}
            <div 
              className="lg:col-span-6 flex flex-col justify-between p-2 lg:pr-10 border-b lg:border-b-0 lg:border-r border-[#e53a24]/10 pb-8 lg:pb-0"
              onTouchStart={handleTouchStartTesti}
              onTouchMove={handleTouchMoveTesti}
              onTouchEnd={handleTouchEndTesti}
            >
              
              {/* Column Header */}
              <div className="text-left mb-6 md:mb-10 shrink-0">
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#0F9F9A] uppercase block mb-2">
                  REAL STORIES FROM NEPAL
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-[#142B5F] tracking-tight">
                  What Our Guests Say
                </h2>
              </div>

              {/* Review area */}
              <div className="flex-1 flex flex-col justify-center my-4">
                
                {/* Subtle Star Treatment */}
                <div className="flex gap-1 mb-4" aria-label={`Rating: ${currentReview.rating} out of 5 stars`}>
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#E6A23C] text-[#E6A23C]" />
                  ))}
                </div>

                {/* Title and Testimonial Quote */}
                <h3 className="text-lg md:text-2xl font-bold text-[#142B5F] mb-3 leading-snug">
                  “{currentReview.title}”
                </h3>
                <p className="text-[#172033]/85 font-medium leading-relaxed text-xs md:text-[15px] mb-6">
                  "{currentReview.text}"
                </p>

                {/* Elegant Guest Profile */}
                <div className="flex items-center gap-3 md:gap-4 mt-auto pt-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0 bg-slate-50">
                    <img src={currentReview.avatar} alt={`${currentReview.name} avatar`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#142B5F] text-sm md:text-[15px] flex items-center gap-1.5">
                      {currentReview.name}
                      <span className="text-[#0F9F9A] fill-[#0F9F9A]/10" title="Verified Traveler">
                        <CheckCircle2 size={13} />
                      </span>
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-slate-400 font-bold tracking-wide uppercase mt-0.5">
                      {currentReview.country} &bull; {currentReview.date}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Trust Platforms & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#e53a24]/10 pt-6 md:pt-8 mt-6 md:mt-10">
                
                {/* Review Platforms Summary */}
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-6">
                  <div className="text-left shrink-0">
                    <p className="text-sm md:text-base font-black text-[#142B5F] leading-none">4.9 / 5</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold tracking-wide uppercase mt-1">150+ Reviews</p>
                  </div>

                  <div className="h-8 w-px bg-slate-100"></div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-extrabold text-[#142B5F]">
                      <span className="cursor-default">Tripadvisor</span>
                      <span className="cursor-default">Google Reviews</span>
                    </div>
                    {/* Desktop View All link (hidden on mobile) */}
                    <Link to="/guest-reviews" className="hidden lg:inline-flex text-[#0F9F9A] hover:text-[#0b7e7a] text-[10px] font-bold tracking-wide items-center gap-0.5 mt-0.5 transition-colors duration-300 focus:ring-2 focus:ring-[#0F9F9A] focus:ring-offset-2 focus:outline-none rounded">
                      View All Guest Reviews &rarr;
                    </Link>
                  </div>
                </div>

                {/* Minimal Slider Navigation controls */}
                <div className="flex items-center justify-center gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <button 
                    onClick={handlePrevTesti}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-100 text-slate-400 hover:text-[#142B5F] hover:border-[#142B5F] flex items-center justify-center transition-all duration-300 hover:bg-[#F7FAFC] active:scale-95 focus:ring-2 focus:ring-[#0F9F9A] focus:ring-offset-2 focus:outline-none"
                    aria-label="Previous Review"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <span className="text-[10px] md:text-[11px] font-bold text-[#142B5F] min-w-[40px] text-center tracking-widest" aria-live="polite">
                    {String(currentReview.id).padStart(2, '0')} / {String(guestReviews.length).padStart(2, '0')}
                  </span>

                  <button 
                    onClick={handleNextTesti}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-100 text-slate-400 hover:text-[#142B5F] hover:border-[#142B5F] flex items-center justify-center transition-all duration-300 hover:bg-[#F7FAFC] active:scale-95 focus:ring-2 focus:ring-[#0F9F9A] focus:ring-offset-2 focus:outline-none"
                    aria-label="Next Review"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Travel Video Showcase */}
            <div 
              className="lg:col-span-6 flex flex-col justify-between p-2 lg:pl-6 pt-6 lg:pt-0"
              onTouchStart={handleTouchStartVideo}
              onTouchMove={handleTouchMoveVideo}
              onTouchEnd={handleTouchEndVideo}
            >
              
              {/* Column Header */}
              <div className="text-left mb-6 md:mb-10 shrink-0">
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#142B5F]/50 uppercase block mb-2">
                  SEE NEPAL
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-[#142B5F] tracking-tight mb-2">
                  Watch the Journey
                </h2>
                <p className="text-xs text-[#172033]/70 font-medium leading-relaxed">
                  Experience Nepal through our tours, destinations, and adventures.
                </p>
              </div>

              {/* Cinematic Video Card */}
              <div 
                onMouseEnter={handleMouseEnterVideo}
                className="relative rounded-[20px] overflow-hidden aspect-video bg-[#142B5F] group shadow-[0_8px_30px_rgba(20,43,95,0.06)] hover:shadow-[0_20px_40px_rgba(20,43,95,0.2)] border border-slate-100/50 my-auto w-full transition-shadow duration-500 cursor-pointer"
              >
                <div 
                  className="flex h-full transition-transform"
                  style={{ 
                    transform: `translateX(-${videoIndex * 100}%)`,
                    transitionDuration: '600ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {travelVideos.map((video) => {
                    const isPlaying = playingVideoId === video.id;
                    return (
                      <div key={video.id} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                        {/* Video / Iframe Wrapper with Hover Zoom */}
                        <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105">
                          {video.platform.toLowerCase() === 'direct' ? (
                            <video 
                              src={video.videoUrl} 
                              controls={isPlaying}
                              autoPlay={isPlaying}
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <iframe 
                              src={getEmbedUrl(video.videoUrl, video.platform, isPlaying)} 
                              className="w-full h-full border-0" 
                              allow="autoplay; encrypted-media; fullscreen" 
                              allowFullScreen 
                              title={video.title}
                            />
                          )}
                        </div>

                        {/* Transparent Event/Play Overlay when not playing */}
                        {!isPlaying && (
                          <div 
                            className="absolute inset-0 z-10 bg-black/10 flex flex-col justify-between p-4 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingVideoId(video.id);
                            }}
                          >
                            {/* Destination Label Overlay (top-left) */}
                            <div className="self-start bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase">
                              {video.destination}
                            </div>
                            
                            {/* Centered Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative group/play">
                                <div className="absolute -inset-4 rounded-full bg-[#e53a24]/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-1000 pointer-events-none"></div>
                                <div className="absolute -inset-2 rounded-full bg-[#e53a24]/50 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"></div>
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e53a24] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(229,58,36,0.4)] transition-all duration-500 transform group-hover:scale-110 group-hover:bg-[#d04b08]">
                                  <Play size={24} className="fill-current translate-x-0.5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Video Info and Selector Underneath */}
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#e53a24]/10 pt-6 md:pt-8">
                <div className="flex-1">
                  <h4 className="text-lg md:text-2xl font-bold text-[#142B5F] leading-snug">{currentVideo.title}</h4>
                  <p className="text-[#172033]/85 font-medium leading-relaxed text-xs md:text-[15px] mt-2">{currentVideo.description}</p>
                </div>

                {/* Video controls */}
                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-center">
                  <button 
                    onClick={handlePrevVideo}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-100 text-slate-400 hover:text-[#142B5F] hover:border-[#142B5F] flex items-center justify-center transition-all duration-300 hover:bg-[#F7FAFC] active:scale-95 focus:ring-2 focus:ring-[#0F9F9A] focus:ring-offset-2 focus:outline-none"
                    aria-label="Previous Video"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  
                  <span className="text-[10px] md:text-[11px] font-bold text-[#142B5F] min-w-[35px] text-center tracking-widest" aria-live="polite">
                    {String(currentVideo.id).padStart(2, '0')} / {String(travelVideos.length).padStart(2, '0')}
                  </span>

                  <button 
                    onClick={handleNextVideo}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-100 text-slate-400 hover:text-[#142B5F] hover:border-[#142B5F] flex items-center justify-center transition-all duration-300 hover:bg-[#F7FAFC] active:scale-95 focus:ring-2 focus:ring-[#0F9F9A] focus:ring-offset-2 focus:outline-none"
                    aria-label="Next Video"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile/Tablet view all link at the very bottom (stacked order) */}
          <div className="block lg:hidden text-center mt-8 pt-4 border-t border-[#e53a24]/10">
            <Link 
              to="/guest-reviews" 
              className="inline-flex items-center justify-center gap-1 text-[#0F9F9A] hover:text-[#0b7e7a] font-extrabold text-sm py-2 px-4 transition-colors duration-300 focus:ring-2 focus:ring-[#0F9F9A] focus:ring-offset-2 focus:outline-none rounded"
            >
              View All Guest Reviews &rarr;
            </Link>
          </div>

        </div>



      </div>
    </section>
  );
};

export default WhatOurGuestsSay;
