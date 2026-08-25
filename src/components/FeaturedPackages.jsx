import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, MapPin, Check, ChevronLeft, ChevronRight, Compass, ShieldCheck, HeartHandshake, BadgeDollarSign, Headphones, Map as MapIcon, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const FeaturedPackages = () => {
  const { packages, tourTrips, treks } = useAppData();

  const mappedTourTrips = (tourTrips || [])
    .filter(t => t.featured && t.status === 'Published')
    .map(t => ({
      id: t.slug || t.id,
      isTourTrip: true,
      title: t.title,
      img: t.image,
      category: t.category,
      location: t.destination,
      badge: t.badge,
      displayOrder: t.displayOrder ? parseInt(t.displayOrder, 10) : 99999,
      price: t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : (t.price ? `US$${t.price}` : 'From Price'),
      persons: `/ ${t.pricingInfo?.pricePer || 'Person'}`
    }));

  // Fallback static tours
  const staticTours = (packages || [])
    .filter(p => p.category === 'Tours')
    .map(p => ({
      id: p.id,
      isTourTrip: false,
      title: p.title,
      img: p.img,
      category: 'Tours',
      location: p.location,
      badge: 'Best Value',
      displayOrder: 99999,
      price: p.price,
      persons: p.persons ? `/ ${p.persons.replace('for ', '')}` : '/ Person'
    }));

  // Fallback static treks (from treksData or API treks)
  const staticFeaturedTreks = (treks || [])
    .slice(0, 8)
    .map(t => ({
      id: t.id,
      isTourTrip: false,
      title: t.title,
      img: t.image || t.img || 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070',
      category: 'Treks',
      location: t.quickFacts?.destination || t.destination || 'Nepal',
      badge: t.badge || 'Popular Trek',
      displayOrder: 99999,
      price: t.price ? `US$${t.price.replace('$', '').trim()}` : 'From Price',
      persons: '/ Person'
    }));

  // Separate Tours vs Treks lists
  const featuredToursList = [
    ...mappedTourTrips.filter(t => t.category === 'Tours' || t.category === 'Tours Packages'),
    ...staticTours.filter(p => !mappedTourTrips.some(m => m.title === p.title))
  ];
  featuredToursList.sort((a, b) => a.displayOrder - b.displayOrder);

  const featuredTreksList = [
    ...mappedTourTrips.filter(t => t.category === 'Treks'),
    ...staticFeaturedTreks.filter(p => !mappedTourTrips.some(m => m.title === p.title))
  ];
  featuredTreksList.sort((a, b) => a.displayOrder - b.displayOrder);

  const toursScrollRef = useRef(null);
  const treksScrollRef = useRef(null);
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [activeTrekIndex, setActiveTrekIndex] = useState(0);

  const getScrollWidth = (ref) => {
    if (ref.current && ref.current.firstChild) {
      return ref.current.firstChild.offsetWidth + 24; 
    }
    return 344;
  };

  const handleToursScroll = () => {
    if (toursScrollRef.current) {
      const scrollPos = toursScrollRef.current.scrollLeft;
      const width = getScrollWidth(toursScrollRef);
      setActiveTourIndex(Math.round(scrollPos / width));
    }
  };

  const handleTreksScroll = () => {
    if (treksScrollRef.current) {
      const scrollPos = treksScrollRef.current.scrollLeft;
      const width = getScrollWidth(treksScrollRef);
      setActiveTrekIndex(Math.round(scrollPos / width));
    }
  };

  useEffect(() => {
    const tRef = toursScrollRef.current;
    const kRef = treksScrollRef.current;
    if (tRef) tRef.addEventListener('scroll', handleToursScroll);
    if (kRef) kRef.addEventListener('scroll', handleTreksScroll);
    return () => {
      if (tRef) tRef.removeEventListener('scroll', handleToursScroll);
      if (kRef) kRef.removeEventListener('scroll', handleTreksScroll);
    };
  }, []);

  const featureCards = [
    { title: 'Expert Guides', desc: 'Certificated mountain guides with decades of terrain experience.', icon: Compass, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { title: 'Safe & Reliable', desc: '100% safety track record with robust backup support systems.', icon: ShieldCheck, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Customized Packages', desc: 'Tailor-made private itineraries fitting your speed and preference.', icon: Sparkles, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { title: 'Best Value', desc: 'Competitive direct pricing without hidden agency markups.', icon: BadgeDollarSign, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { title: '24/7 Support', desc: 'Round-the-clock emergency support line during your entire trip.', icon: Headphones, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { title: 'Local Experience', desc: 'Genuine Sherpa culture immersion and authentic homestays.', icon: HeartHandshake, color: 'bg-teal-50 text-teal-600 border-teal-100' }
  ];

  return (
    <section className="reveal reveal-up bg-[#ebf3fa] py-20 px-4 md:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* SECTION 1: FEATURED TOURS */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#e53a24]/10 text-[#e53a24] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <Star size={12} fill="currentColor" /> Premium Journeys
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f3493] leading-none tracking-tight">
                Featured Tours
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                Dynamically managed top-rated sightseeing and cultural holiday packages.
              </p>
            </div>
            
            {featuredToursList.length > 4 && (
              <div className="flex gap-3">
                <button 
                  onClick={() => toursScrollRef.current.scrollBy({ left: -getScrollWidth(toursScrollRef), behavior: 'smooth' })}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-[#e53a24] hover:border-[#e53a24] hover:shadow-md transition-all"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => toursScrollRef.current.scrollBy({ left: getScrollWidth(toursScrollRef), behavior: 'smooth' })}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-[#e53a24] hover:border-[#e53a24] hover:shadow-md transition-all"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          <div 
            ref={toursScrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredToursList.map((pkg) => (
              <Link 
                to={pkg.isTourTrip ? `/tour/${pkg.id}` : `/packages/${pkg.id}`} 
                key={pkg.id} 
                className="min-w-[280px] w-[280px] md:min-w-[310px] md:w-[310px] bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col snap-start shrink-0 group hover:shadow-2xl hover:shadow-[#0f3493]/5 hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              >
                {pkg.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-[#e53a24] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-md">
                    {pkg.badge}
                  </div>
                )}
                
                <div className="relative h-52 overflow-hidden">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {pkg.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-xs md:text-sm font-medium">
                    <MapPin size={15} className="text-[#e53a24]" />
                    <span className="line-clamp-1 drop-shadow-sm">{pkg.location}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base md:text-lg text-slate-800 font-bold mb-4 leading-snug line-clamp-2 group-hover:text-[#e53a24] transition-colors">
                    {pkg.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-[#e53a24] font-black text-xl">{pkg.price}</span>
                      <span className="text-slate-400 text-xs ml-1 font-medium">{pkg.persons}</span>
                    </div>
                    <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-[#e53a24] group-hover:text-white transition-colors duration-200">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {featuredToursList.length > 4 && (
            <div className="flex justify-center mt-2 gap-1.5">
              {Array.from({ length: Math.min(featuredToursList.length - 2, 8) }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeTourIndex % (featuredToursList.length - 2) ? 'bg-[#e53a24] w-6' : 'bg-slate-300'}`}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: FEATURED TREKS */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <MapIcon size={12} /> Wilderness Treks
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f3493] leading-none tracking-tight">
                Featured Treks
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                Himalayan mountain trails and peak climbing expeditions dynamically custom-curated.
              </p>
            </div>
            
            {featuredTreksList.length > 4 && (
              <div className="flex gap-3">
                <button 
                  onClick={() => treksScrollRef.current.scrollBy({ left: -getScrollWidth(treksScrollRef), behavior: 'smooth' })}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-[#e53a24] hover:border-[#e53a24] hover:shadow-md transition-all"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => treksScrollRef.current.scrollBy({ left: getScrollWidth(treksScrollRef), behavior: 'smooth' })}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-[#e53a24] hover:border-[#e53a24] hover:shadow-md transition-all"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          <div 
            ref={treksScrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredTreksList.map((pkg) => (
              <Link 
                to={pkg.isTourTrip ? `/tour/${pkg.id}` : `/treks/${pkg.id}`} 
                key={pkg.id} 
                className="min-w-[280px] w-[280px] md:min-w-[310px] md:w-[310px] bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col snap-start shrink-0 group hover:shadow-2xl hover:shadow-[#0f3493]/5 hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              >
                {pkg.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-[#e53a24] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-md">
                    {pkg.badge}
                  </div>
                )}
                
                <div className="relative h-52 overflow-hidden">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {pkg.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-xs md:text-sm font-medium">
                    <MapPin size={15} className="text-[#e53a24]" />
                    <span className="line-clamp-1 drop-shadow-sm">{pkg.location}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base md:text-lg text-slate-800 font-bold mb-4 leading-snug line-clamp-2 group-hover:text-[#e53a24] transition-colors">
                    {pkg.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-[#e53a24] font-black text-xl">{pkg.price}</span>
                      <span className="text-slate-400 text-xs ml-1 font-medium">{pkg.persons}</span>
                    </div>
                    <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-[#e53a24] group-hover:text-white transition-colors duration-200">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {featuredTreksList.length > 4 && (
            <div className="flex justify-center mt-2 gap-1.5">
              {Array.from({ length: Math.min(featuredTreksList.length - 2, 8) }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeTrekIndex % (featuredTreksList.length - 2) ? 'bg-[#e53a24] w-6' : 'bg-slate-300'}`}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: PACKAGE FEATURES */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} /> Quality Assurance
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-[#0f3493] leading-none tracking-tight">
              Package Features
            </h3>
            <p className="text-slate-500 font-medium">
              Why thousands of global travelers choose Zenex for their Nepalese vacations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.title} 
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${feat.color}`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base">
                      {feat.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedPackages;
