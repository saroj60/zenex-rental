import React, { useState, useEffect } from 'react';
import SearchWidget from './SearchWidget';
import { ArrowRight, Star, ShieldCheck, MapPin, Calendar, Users, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
const heroImages = [
  'https://plus.unsplash.com/premium_photo-1664303406409-a3e28b9ada9b?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1666358188946-4fea8727e3d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1755621191116-6d93ea3242d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1641584495089-5914d85d9bcc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1697729944636-0b630fe30ad6?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1663657477633-2595ae39672b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1704266410584-bb3890a02eaa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1780690165069-32978b08e556?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJ5ZCUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1571113908007-5d6aae13d73e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlZGRpbmclMjBjYXJ8ZW58MHx8MHx8fDA%3D'
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
      <section className="relative min-h-[85vh] md:min-h-[600px] lg:min-h-[650px] w-full flex flex-col pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8">
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
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-start pt-8 md:pt-16 flex-1 mb-16 md:mb-0">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-white/20 shadow-sm">
              <Star className="fill-current text-[#1e3a8a]" size={14}/> 
              Premium Guided Tours & Car Rentals in Nepal
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-3 md:mb-5 drop-shadow-lg">
              Premium Travels, Tours &<br className="hidden sm:block"/> Car Rental in Nepal
              <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mt-3 sm:mt-4 drop-shadow-md">
                - Kathmandu to Himalayas -
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-5 md:mb-6 max-w-lg leading-relaxed drop-shadow-md font-medium">
              Explore the majestic Himalayas with our expertly crafted tour packages, and enjoy reliable, affordable car rentals in Kathmandu and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <Link to="/packages" className="w-full sm:w-auto text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-[#1e3a8a] hover:bg-[#152c6e]">
                Explore Packages
                <div className="bg-white rounded-full p-1 text-[#1e3a8a]">
                  <ArrowRight size={16} strokeWidth={3} />
                </div>
              </Link>
              <Link to="/vehicles" className="w-full sm:w-auto text-white border-2 border-white/60 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                Rent a Car
              </Link>
              <a href="tel:+9779767476521" className="w-full sm:w-auto text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg bg-[#e53a24] hover:bg-[#d04b08]">
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
        <div className="relative md:absolute left-0 right-0 md:bottom-8 z-20 md:px-8 flex justify-center mt-8 md:mt-0">
          <div className="w-full max-w-7xl">
            <SearchWidget activeTab={activeTab} />
          </div>
        </div>
      </section>
      
      {/* Spacer for the floating widget on desktop */}
      <div className="hidden md:block h-[40px]"></div>
    </>
  );
};

export default Hero;
