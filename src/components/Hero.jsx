import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, MapPin, Calendar, Users, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
const heroImages = [
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=100&w=2000&auto=format&fit=crop', // High res mountain peak
  'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=100&w=2000&auto=format&fit=crop', // High res mountain road with vehicle
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=100&w=2000&auto=format&fit=crop'  // High res Everest base camp / Nepal landscape
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('tours'); // Default to tours

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <section className="relative min-h-[90vh] md:min-h-[600px] lg:min-h-[680px] w-full flex flex-col pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8">
        <div className="absolute inset-0 z-0 bg-black">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              alt="Zenex Fleet in the Himalayas"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              src={img}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/70 via-black/50 md:via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 md:via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center flex-1 mb-8 md:mb-0">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold mb-3 border border-white/20 shadow-sm">
              <Star className="fill-current text-[#1e3a8a]" size={10}/> 
              Premium Guided Tours & Car Rentals in Nepal
            </span>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2.5 md:mb-3.5 drop-shadow-lg">
              Premium Travels, Tours &<br className="hidden sm:block"/> Car Rental in Nepal
              <span className="block text-lg sm:text-xl md:text-2xl font-bold text-white/95 mt-1 sm:mt-1.5 drop-shadow-md">
                - Kathmandu to Himalayas -
              </span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-white/75 mb-3.5 md:mb-4.5 max-w-md leading-relaxed drop-shadow-md font-medium">
              Explore the majestic Himalayas with our expertly crafted tour packages, and enjoy reliable, affordable car rentals in Kathmandu and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-2.5 md:gap-3 mb-3.5 md:mb-4.5">
              <Link to="/packages" className="w-full sm:w-auto text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-[#1e3a8a] hover:bg-[#152c6e] text-xs">
                Explore Packages
                <div className="bg-white rounded-full p-0.5 text-[#1e3a8a]">
                  <ArrowRight size={12} strokeWidth={3} />
                </div>
              </Link>
              <Link to="/vehicles" className="w-full sm:w-auto text-white border-2 border-white/60 px-4 md:px-5 py-1.5 md:py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-xs">
                Rent a Car
              </Link>
              <a href="tel:+9779767476521" className="w-full sm:w-auto text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md bg-[#e53a24] hover:bg-[#d04b08] text-xs">
                <Phone size={14} fill="currentColor" /> Call Now
              </a>
            </div>
 
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 md:gap-6 text-xs font-bold text-white/85 drop-shadow-md">
              <span className="flex items-center gap-1.5"><div className="bg-green-500 rounded-full p-0.5"><Check size={12} className="text-white"/></div> 24/7 Support</span>
              <span className="flex items-center gap-1.5"><div className="bg-green-500 rounded-full p-0.5"><Check size={12} className="text-white"/></div> Fully Insured</span>
              <span className="flex items-center gap-1.5"><div className="bg-green-500 rounded-full p-0.5"><Check size={12} className="text-white"/></div> Transparent Pricing</span>
            </div>
          </div>
        </div>
 
      </section>
    </>
  );
};

export default Hero;
