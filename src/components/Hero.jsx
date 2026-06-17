import React, { useState, useEffect } from 'react';
import SearchWidget from './SearchWidget';
import { ArrowRight, Play, Star, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  'https://images.unsplash.com/photo-1489595672898-26572ba975a3?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1683140916567-6d3cea90caf6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1718180555560-0c5f890f8098?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' or 'tours'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <section className="relative min-h-[1000px] md:min-h-[800px] md:h-[800px] w-full flex flex-col pt-32 pb-16 md:pb-48 px-4 md:px-8">
        <div className="absolute inset-0 z-0 bg-black">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              alt="Zenex Fleet in the Himalayas"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              src={img}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/70 via-black/50 md:via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 md:via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center flex-1 mb-8 md:mb-0">
          <div className="max-w-2xl">
            
            {/* Tab Toggle */}
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-1 w-max mb-6 border border-white/30 shadow-lg">
              <button
                onClick={() => setActiveTab('cars')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                  activeTab === 'cars' ? 'bg-[#EA580C] text-white shadow-md' : 'text-white hover:bg-white/10'
                }`}
              >
                🚗 Car Rentals
              </button>
              <button
                onClick={() => setActiveTab('tours')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                  activeTab === 'tours' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-white hover:bg-white/10'
                }`}
              >
                🏔️ Travel Tours
              </button>
            </div>

            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20 shadow-sm">
              <Star className={`fill-current ${activeTab === 'cars' ? 'text-[#EA580C]' : 'text-[#1e3a8a]'}`} size={14}/> 
              {activeTab === 'cars' ? '#1 Car Rental Service in Nepal' : 'Premium Guided Tours in Nepal'}
            </span>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-lg">
              {activeTab === 'cars' ? (
                <>Rent Premium Cars <br/>Across Nepal</>
              ) : (
                <>Discover Amazing <br/>Tours & Treks</>
              )}
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg leading-relaxed drop-shadow-md font-medium">
              {activeTab === 'cars' 
                ? 'Affordable Self-Drive & Chauffeur Car Rental in Kathmandu and beyond. Book instantly with trusted local service.'
                : 'Explore the majestic Himalayas, rich cultural heritage, and exotic wildlife with our expertly crafted tour packages.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <Link to={activeTab === 'cars' ? "/vehicles" : "/packages"} className={`w-full sm:w-auto text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${activeTab === 'cars' ? 'bg-[#EA580C] hover:bg-[#d04b08]' : 'bg-[#1e3a8a] hover:bg-[#152c6e]'}`}>
                {activeTab === 'cars' ? 'Book Now' : 'Explore Packages'}
                <div className={`bg-white rounded-full p-1 ${activeTab === 'cars' ? 'text-[#EA580C]' : 'text-[#1e3a8a]'}`}>
                  <ArrowRight size={16} strokeWidth={3} />
                </div>
              </Link>
              <Link to={activeTab === 'cars' ? "/vehicles" : "/tours"} className="w-full sm:w-auto text-white border-2 border-white/60 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                {activeTab === 'cars' ? 'View Fleet' : 'View Destinations'}
              </Link>
              <a href="tel:+9779767476521" className={`w-full sm:w-auto text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg ${activeTab === 'cars' ? 'bg-[#1e3a8a] hover:bg-[#152c6e]' : 'bg-[#EA580C] hover:bg-[#d04b08]'}`}>
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
            <SearchWidget activeTab={activeTab} />
          </div>
        </div>
      </section>
      
      {/* Spacer for the floating widget on desktop */}
      <div className="hidden md:block h-[300px]"></div>
    </>
  );
};

export default Hero;
