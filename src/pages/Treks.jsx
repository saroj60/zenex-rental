import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import RegionWiseTrekCategories from '../components/RegionWiseTrekCategories';

const Treks = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO 
        title="Trekking in Nepal | Zenex Rental"
        description="Explore the majestic Himalayas with our guided trekking packages in Nepal."
      />
      
      {/* Premium Hero Section */}
      <div className="relative h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-[#142B5F]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop"
            alt="Trekking in Nepal"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#142B5F]/95 via-[#142B5F]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-100 h-20 bottom-0 top-auto"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E59A2F] animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">Himalayan Adventures</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight max-w-3xl">
            Trekking Packages
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl font-medium mb-10 leading-relaxed">
            Embark on a journey of a lifetime. Experience the raw beauty, diverse cultures, and breathtaking landscapes of the Himalayan trails.
          </p>

          <div className="flex items-center gap-3 text-sm font-bold text-white/70 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#E59A2F] text-white transition-colors">Home</Link>
            <span className="text-[#0F766E]">&bull;</span>
            <span className="text-[#E59A2F]">Treks</span>
          </div>
        </div>
      </div>

      <RegionWiseTrekCategories />
    </div>
  );
};

export default Treks;
