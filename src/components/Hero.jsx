import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, MapPin, Calendar, Users, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchWidget from './SearchWidget';

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
      <section className="relative min-h-[92vh] md:min-h-[640px] lg:min-h-[720px] w-full flex flex-col pt-24 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 border-b border-gray-150">
        <div className="absolute inset-0 z-0 bg-black">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              alt="Zenex Fleet in the Himalayas"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              src={img}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 md:from-black/40 via-black/30 md:via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 md:via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center flex-1 mb-12 md:mb-16">
          <div className="max-w-xl">

            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2.5 md:mb-3.5 drop-shadow-lg">
              Premium Travels, Tours &<br className="hidden sm:block"/> Car Rental in Nepal
            </h1>

            
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

          </div>
        </div>

        {/* Overlapping Floating Search Widget */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 w-full max-w-5xl mx-auto px-4 md:px-8">
          <SearchWidget activeTab="tours" />
        </div>
 
      </section>
    </>
  );
};

export default Hero;
