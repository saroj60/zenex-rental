import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CountryWiseTrekCategories from '../components/CountryWiseTrekCategories';

const Treks = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO 
        title="Trekking in Nepal | Zenex Rental"
        description="Explore the majestic Himalayas with our guided trekking packages in Nepal."
      />
      
      {/* Hero / Header Section */}
      <div className="relative pt-32 pb-24 px-4 md:px-8 overflow-hidden min-h-[350px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop"
            alt="Trekking in Nepal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Trekking Packages
          </h1>
          <div className="text-sm font-semibold text-white/80 flex items-center justify-center gap-1.5">
            <Link to="/" className="hover:text-[#e53a24] text-white/95 transition-colors">Home</Link>
            <span className="text-white/40">&gt;</span>
            <span className="text-[#e53a24]">Treks</span>
          </div>
        </div>

        {/* Wave svg at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] md:h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0c4.14,1.83,8.37,3.58,12.75,5.18C83.84,25.43,158.74,48.51,234.34,58.82,263.63,62.8,292.82,61.76,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* Interactive Country-Wise Categories Section */}
      <CountryWiseTrekCategories />
    </div>
  );
};

export default Treks;
