import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  ShieldCheck,
  Star,
  Search,
  ArrowRight,
  Compass,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import CarSearchWidget from './CarSearchWidget';

export default function HeroSection() {
  const navigate = useNavigate();

  const scrollToSearch = () => {
    const el = document.getElementById('search-widget-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/cars');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10243A] via-[#0E1F33] to-[#F5F8FC] pt-4 pb-12 sm:pt-8 sm:pb-20 lg:pt-14 lg:pb-28">
      {/* Background Mountain Panorama Backdrop with subtle gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay">
        <img
          src="/landscapes/annapurna.jpg"
          alt="Annapurna Range Nepal"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80';
          }}
        />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[260px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* 1. Combined Trust Badge (Compact Single Row) */}
        <div className="flex items-center justify-center mb-3 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold shadow-xs max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-bold tracking-tight">Nepal's #1 Fleet</span>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1 text-amber-300 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>4.9★ (2.4k+ Trips)</span>
            </div>
          </div>
        </div>

        {/* 2. Hero Heading & Shortened Description */}
        <div className="text-center max-w-4xl mx-auto space-y-2 sm:space-y-3 mb-4 sm:mb-6 px-1">
          {/* Max 2 Lines Heading */}
          <h1 className="text-[26px] xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] max-w-2xl mx-auto">
            Explore Nepal{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
              Your Way.
            </span>
          </h1>

          {/* Shortened 2-3 Readable Lines Description */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 font-medium max-w-xl mx-auto leading-relaxed px-1">
            Premium 4WD SUVs, sedans & vans with self-drive freedom or licensed mountain chauffeurs across Kathmandu, Pokhara & beyond.
          </p>

          {/* 3. Streamlined CTAs: 1 Primary Button + 1 Secondary Text Action */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 pt-1 sm:pt-2 w-full max-w-sm mx-auto">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={scrollToSearch}
              className="w-full xs:w-auto px-6 py-2.5 sm:py-3 min-h-[44px] rounded-xl bg-[#0755C9] hover:bg-blue-600 active:scale-[0.98] text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Find Available Cars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Secondary Fleet Action Link */}
            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="w-full xs:w-auto px-3.5 py-2 text-xs sm:text-sm font-bold text-sky-200 hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer hover:bg-white/5 rounded-xl"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Explore Our Fleet</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Luxury Vehicle Showcase (Consistent Aspect Ratio, Rounded Corners & Object-fit) */}
        <div className="relative max-w-xs xs:max-w-sm sm:max-w-md mx-auto my-3 sm:my-5 px-1">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900/60 backdrop-blur-md group">
            <div className="aspect-[16/9] w-full overflow-hidden relative">
              <img
                src="/cars/creta.png"
                alt="Nepal Car Rental Premium Fleet SUV"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/cars/fortuner.jpg';
                }}
              />
              {/* Luxury dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Vehicle Badge Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white select-none">
                <span className="font-bold bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xs">
                  <Car className="w-3.5 h-3.5 text-sky-400" />
                  <span>Hyundai Creta 4WD</span>
                </span>
                <span className="font-black text-amber-300 bg-slate-900/85 backdrop-blur-xs px-2 py-1 rounded-lg border border-white/10 text-[10px] shadow-xs">
                  From NPR 7,000/day
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Car Search Widget Mounted Prominently */}
        <div id="search-widget-section" className="relative z-20 pt-2 sm:pt-4">
          <CarSearchWidget />
        </div>

        {/* 6. Value Prop Micro-Highlights Below Search Card */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="block text-base sm:text-lg font-black text-[#10243A]">42+</span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Fleet Vehicles</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="block text-base sm:text-lg font-black text-emerald-600">100%</span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Insured Fleet</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="block text-base sm:text-lg font-black text-[#0755C9]">Self Drive</span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">& Chauffeur</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="block text-base sm:text-lg font-black text-amber-600">24/7</span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Highway Rescue</span>
          </div>
        </div>

      </div>
    </section>
  );
}
