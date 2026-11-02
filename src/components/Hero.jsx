import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, ChevronDown, Compass, Mountain, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchWidget from './SearchWidget';

const heroImages = [
  '/hero-kathmandu-durbar.jpg',       // Kathmandu Durbar Square
  '/hero-paragliding-mountain.jpg',   // Paragliding near Machhapuchhre, Pokhara
  '/hero-chitwan-elephant.jpg',       // Chitwan elephant safari
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=100&w=2000&auto=format&fit=crop', // High res mountain peak
  'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=100&w=2000&auto=format&fit=crop', // High res mountain road with vehicle
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=100&w=2000&auto=format&fit=crop'  // High res Everest base camp / Nepal landscape
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => setCurrentImageIndex((idx + heroImages.length) % heroImages.length);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(currentImageIndex + (diff > 0 ? 1 : -1));
    }
    setTouchStartX(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[600px] lg:min-h-[680px] w-full flex flex-col pt-24 md:pt-32 pb-4 md:pb-6 px-4 md:px-8 border-b border-gray-150">

      {/* Background image slider */}
      <div
        className="absolute inset-0 z-0 bg-black overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile: horizontal slide */}
        <div
          className="flex md:hidden h-full transition-transform duration-500 ease-in-out"
          style={{ width: `${heroImages.length * 100}%`, transform: `translateX(-${(currentImageIndex * 100) / heroImages.length}%)` }}
        >
          {heroImages.map((img, idx) => (
            <div key={idx} className="h-full flex-shrink-0" style={{ width: `${100 / heroImages.length}%` }}>
              <img
                src={img}
                alt="Zenex Fleet in the Himalayas"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Desktop: crossfade */}
        <div className="hidden md:block absolute inset-0">
          {heroImages.map((img, idx) => (
            <motion.img
              key={idx}
              initial={{ scale: 1.1 }}
              animate={{ scale: idx === currentImageIndex ? 1 : 1.1, opacity: idx === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="Zenex Fleet in the Himalayas"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={img}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/40 via-black/30 md:via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 md:via-transparent to-transparent"></div>
      </div>

      {/* Dot indicators — mobile only */}
      <div className="absolute bottom-[130px] sm:bottom-[100px] left-1/2 -translate-x-1/2 z-20 flex md:hidden items-center gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end flex-1 pb-4 md:pb-6">
        <motion.div 
          className="w-full flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-4 drop-shadow-lg max-w-2xl">
            Premium Travels, Tours &<br className="hidden sm:block"/> Car Rental in Nepal
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-start gap-2.5 mb-5 md:mb-6 w-full flex-wrap">
            {/* Explore Packages Dropdown */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="w-full sm:w-auto text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-[#1e3a8a] hover:bg-[#152c6e] text-[11px] md:text-xs cursor-pointer select-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span>Explore Packages</span>
                <div className={`bg-white rounded-full p-0.5 text-[#1e3a8a] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown size={11} strokeWidth={3} />
                </div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-full sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                  >
                    <Link
                      to="/tours"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors shadow-xs">
                        <Compass size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors">
                            Tour Packages
                          </h4>
                          <ArrowRight size={13} className="text-slate-400 group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          Sightseeing, Cultural & Wildlife Tours
                        </p>
                      </div>
                    </Link>

                    <div className="h-px bg-slate-100 my-1 mx-2" />

                    <Link
                      to="/treks"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors group text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                        <Mountain size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            Trek Packages
                          </h4>
                          <ArrowRight size={13} className="text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          Himalayan Base Camps & Circuit Trails
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a 
              href="#flight-tickets"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('flight-tickets');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto text-white border border-white/60 px-4 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 hover:border-white transition-all text-[11px] md:text-xs backdrop-blur-sm cursor-pointer shadow-xs"
            >
              <Plane size={13} className="text-sky-300" /> Book Flight
            </a>
            <Link to="/vehicles" className="w-full sm:w-auto text-white border border-white/60 px-4 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 hover:border-white transition-colors text-[11px] md:text-xs backdrop-blur-sm">
              Rent a Car
            </Link>
            <a href="tel:+9779767476521" className="w-full sm:w-auto text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md bg-[#e53a24] hover:bg-[#d04b08] text-[11px] md:text-xs">
              <Phone size={12} fill="currentColor" /> Call Now
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full md:w-[70%] max-w-[480px]">
            <SearchWidget activeTab="tours" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
