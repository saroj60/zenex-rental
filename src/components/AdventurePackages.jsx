import React from 'react';
import { ArrowRight, Plane, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  /* Grid configurations for asymmetric editorial layout */
  const destinationsList = [
    {
      id: 'nepal',
      name: 'NEPAL',
      count: getCount('nepal') || 99,
      img: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1200',
      titleAbove: true,
      heightClass: 'h-[300px] md:h-[350px]',
      alignClass: 'md:translate-y-4',
    },
    {
      id: 'tibet',
      name: 'TIBET',
      count: getCount('tibet') || 9,
      img: 'https://images.unsplash.com/photo-1541088916327-be8b3296e676?q=80&w=1200',
      titleAbove: false,
      heightClass: 'h-[320px] md:h-[380px]',
      alignClass: 'md:-translate-y-4',
    },
    {
      id: 'bhutan',
      name: 'BHUTAN',
      count: getCount('bhutan') || 7,
      img: 'https://images.unsplash.com/photo-1578593139888-39622e2047de?q=80&w=1200',
      titleAbove: true,
      heightClass: 'h-[290px] md:h-[330px]',
      alignClass: 'md:translate-y-2',
    },
    {
      id: 'india',
      name: 'INDIA',
      count: getCount('india') || 4,
      img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200',
      titleAbove: false,
      heightClass: 'h-[310px] md:h-[360px]',
      alignClass: 'md:-translate-y-2',
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-[#F4F9F6] to-white">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#1e3a8a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3">
              <Compass size={14} className="animate-spin-slow text-emerald-600" />
              <span>Nepal & Beyond</span>
              <Plane size={12} className="rotate-[30deg] text-emerald-600 ml-1" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#1e3a8a] uppercase font-serif">
              TOP DESTINATIONS
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium md:pl-6 md:border-l border-emerald-500/20">
              Welcome to Nepal—a land of breathtaking mountains, vibrant cultures, and warm hospitality! Whether you're trekking through the Himalayas, exploring ancient cities, or immersing in local traditions, each destination offers a unique and enriching experience.
            </p>
          </div>
        </div>

        {/* Destination Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start pt-6 pb-12">
          {destinationsList.map((dest) => (
            <Link
              to={`/packages?destination=${dest.id}`}
              key={dest.id}
              className={`group flex flex-col bg-white border border-slate-200/60 hover:border-emerald-300 rounded-2xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 select-none cursor-pointer ${dest.alignClass}`}
            >
              
              {/* Layout Mode A: Title ABOVE Image */}
              {dest.titleAbove && (
                <div className="flex flex-col mb-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-widest text-slate-400 group-hover:text-[#1e3a8a] transition-colors font-serif">
                      {dest.name}
                    </h3>
                  </div>
                  <div className="h-[1px] bg-slate-100 w-full mt-2" />
                </div>
              )}

              {/* Image Container with overlapping Badge */}
              <div className={`relative ${dest.heightClass} w-full overflow-hidden rounded-xl bg-slate-50`}>
                
                {/* Image */}
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlap Badge */}
                <div className={`absolute z-20 ${
                  dest.titleAbove ? 'top-4 left-4' : 'bottom-4 left-4'
                }`}>
                  <span className="bg-[#2D6A4F] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                    {dest.count} Packages
                  </span>
                </div>

                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] md:text-xs font-extrabold tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg border border-white/20 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                    View Packages
                    <ArrowRight size={12} className="text-[#1e3a8a]" />
                  </div>
                </div>

              </div>

              {/* Layout Mode B: Title BELOW Image */}
              {!dest.titleAbove && (
                <div className="flex flex-col mt-4">
                  <div className="h-[1px] bg-slate-100 w-full mb-3" />
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-widest text-slate-400 group-hover:text-[#1e3a8a] transition-colors font-serif">
                      {dest.name}
                    </h3>
                  </div>
                </div>
              )}

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdventurePackages;


