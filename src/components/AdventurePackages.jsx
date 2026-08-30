import React from 'react';
import { ArrowRight, Plane, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppData } from '../context/AppDataContext';

/* ─── Destination matching helper ────────────────────────────────── */
const isPackageInDestination = (pkg, destName) => {
  const loc = (pkg.location || '').toLowerCase();
  const dest = destName.toLowerCase();
  const title = (pkg.title || '').toLowerCase();
  
  if (dest === 'nepal') {
    const otherCountries = ['tibet', 'bhutan', 'india', 'kailash', 'lhasa'];
    const hasOtherCountry = otherCountries.some(country => loc.includes(country) || title.includes(country));
    if (hasOtherCountry) return false;
    
    const nepalKeywords = ['nepal', 'kathmandu', 'pokhara', 'chitwan', 'lumbini', 'muktinath', 'ghorepani', 'annapurna', 'bandipur', 'chandragiri'];
    return nepalKeywords.some(city => loc.includes(city) || title.includes(city));
  }

  if (dest === 'tibet') {
    const tibetKeywords = ['tibet', 'lhasa', 'kailash', 'mansarovar'];
    return tibetKeywords.some(keyword => loc.includes(keyword) || title.includes(keyword));
  }

  if (dest === 'bhutan') {
    return loc.includes('bhutan') || title.includes('bhutan');
  }

  if (dest === 'india') {
    return loc.includes('india') || title.includes('india');
  }
  
  return loc.includes(dest) || title.includes(dest);
};

const AdventurePackages = () => {
  const { packages, tourTrips } = useAppData();

  /* Combine all packages dynamically to get correct counts */
  const mappedTourTrips = (tourTrips || [])
    .filter(t => t.status === 'Published')
    .map(t => ({
      title: t.title,
      location: t.destination,
    }));

  const combinedPackages = [...mappedTourTrips, ...packages.filter(p => !mappedTourTrips.some(m => m.title === p.title))];

  const getCount = (country) => {
    return combinedPackages.filter(pkg => isPackageInDestination(pkg, country)).length;
  };

  /* Grid configurations with uniform heights and verified images */
  const destinationsList = [
    {
      id: 'nepal',
      name: 'NEPAL',
      count: getCount('nepal') || 99,
      img: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1200',
      titleAbove: true,
    },
    {
      id: 'tibet',
      name: 'TIBET',
      count: getCount('tibet') || 9,
      img: '/images/Incredible Himalaya Tour to Tibet, Nepal & Bhutan 15 Days.jpg',
      titleAbove: false,
    },
    {
      id: 'bhutan',
      name: 'BHUTAN',
      count: getCount('bhutan') || 7,
      img: 'https://www.nepalpackagetour.com/public/uploads/bhutan_tour/Tiger%20nest.jpg',
      titleAbove: true,
    },
    {
      id: 'india',
      name: 'INDIA',
      count: getCount('india') || 4,
      img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200',
      titleAbove: false,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-20 overflow-hidden bg-[#1e3a8a]/12 border-y border-[#1e3a8a]/20"
    >
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#1e3a8a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e53a24]/10 text-[#e53a24] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Compass size={12} fill="currentColor" />
              <span>Nepal & Beyond</span>
              <Plane size={12} className="rotate-[30deg] ml-1" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1e3a8a] leading-none tracking-tight">
              Top Destinations
            </h2>
          </div>
          <div className="lg:max-w-xl">
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium lg:pl-6 lg:border-l border-emerald-500/20">
              Welcome to Nepal—a land of breathtaking mountains, vibrant cultures, and warm hospitality! Whether you're trekking through the Himalayas, exploring ancient cities, or immersing in local traditions, each destination offers a unique and enriching experience.
            </p>
          </div>
        </div>

        {/* Destination Editorial Grid — Fully Aligned Card Sizes */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch pt-2 pb-12">
          {destinationsList.map((dest) => (
            <motion.div key={dest.id} variants={itemVariants}>
              <Link
                to={`/country/${dest.id}`}
                className="group flex flex-col h-[380px] md:h-[420px] bg-white border border-slate-200/60 hover:border-emerald-300 rounded-2xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 select-none cursor-pointer"
              >
                
                {/* Layout Mode A: Title ABOVE Image */}
                {dest.titleAbove ? (
                  <div className="flex flex-col h-full">
                    <div className="pt-1 pb-3">
                      <h3 className="text-xl md:text-2xl font-black tracking-wider text-slate-400 group-hover:text-[#1e3a8a] transition-colors uppercase">
                        {dest.name}
                      </h3>
                      <div className="h-[1px] bg-slate-100 w-full mt-3" />
                    </div>
                    
                    {/* Image Container */}
                    <div className="relative flex-1 overflow-hidden rounded-xl bg-slate-50">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Overlap Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-[#2D6A4F] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                          {dest.count} Packages
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] md:text-xs font-extrabold tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg border border-white/20 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                          View Packages
                          <ArrowRight size={12} className="text-[#1e3a8a]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Layout Mode B: Title BELOW Image */
                  <div className="flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative flex-1 overflow-hidden rounded-xl bg-slate-50">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Overlap Badge */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="bg-[#2D6A4F] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                          {dest.count} Packages
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] md:text-xs font-extrabold tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg border border-white/20 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                          View Packages
                          <ArrowRight size={12} className="text-[#1e3a8a]" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 pb-1">
                      <div className="h-[1px] bg-slate-100 w-full mb-3" />
                      <h3 className="text-xl md:text-2xl font-black tracking-wider text-slate-400 group-hover:text-[#1e3a8a] transition-colors uppercase">
                        {dest.name}
                      </h3>
                    </div>
                  </div>
                )}

              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default AdventurePackages;


