import React from 'react';
import SearchWidget from './SearchWidget';
import { ArrowRight, Play, Star, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <section className="relative min-h-[1000px] md:min-h-[800px] md:h-[800px] w-full flex flex-col pt-32 pb-16 md:pb-48 px-4 md:px-8">
        <div className="absolute inset-0 z-0">
          <img
            alt="NepalDrive Fleet in the Himalayas"
            className="w-full h-full object-cover"
            src="/hero-custom.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/70 via-black/50 md:via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 md:via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center flex-1 mb-8 md:mb-0">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20 shadow-sm">
              <Star className="text-[#EA580C] fill-current" size={14}/> #1 Car Rental Service in Nepal
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-lg">
              Rent Premium Cars <br/>Across Nepal
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg leading-relaxed drop-shadow-md font-medium">
              Affordable Self-Drive & Chauffeur Car Rental in Kathmandu and beyond. Book instantly with trusted local service.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <Link to="/vehicles" className="w-full sm:w-auto bg-[#EA580C] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#d04b08] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Book Now
                <div className="bg-white text-[#EA580C] rounded-full p-1">
                  <ArrowRight size={16} strokeWidth={3} />
                </div>
              </Link>
              <Link to="/vehicles" className="w-full sm:w-auto text-white border-2 border-white/60 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                View Fleet
              </Link>
              <a href="tel:+9779800000000" className="w-full sm:w-auto text-white bg-[#1e3a8a] px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#152c6e] transition-colors shadow-lg">
                <Phone size={18} fill="currentColor" /> Call Now
              </a>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-8 text-sm font-bold text-white/90 drop-shadow-md">
              <span className="flex items-center gap-2"><div className="bg-green-500 rounded-full p-0.5"><Check size={14} className="text-white"/></div> 24/7 Support</span>
              <span className="flex items-center gap-2"><div className="bg-green-500 rounded-full p-0.5"><Check size={14} className="text-white"/></div> Fully Insured</span>
              <span className="flex items-center gap-2"><div className="bg-green-500 rounded-full p-0.5"><Check size={14} className="text-white"/></div> Transparent Pricing</span>
            </div>
          </div>
        </div>

        {/* Floating Search Widget */}
        <div className="relative md:absolute left-0 right-0 md:bottom-0 md:translate-y-1/2 z-20 md:px-8 flex justify-center mt-8 md:mt-0">
          <div className="w-full max-w-7xl">
            <SearchWidget />
          </div>
        </div>
      </section>
      
      {/* Spacer for the floating widget on desktop */}
      <div className="hidden md:block h-[300px]"></div>
    </>
  );
};

export default Hero;
