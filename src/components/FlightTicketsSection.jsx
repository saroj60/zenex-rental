import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, Mountain, Globe, Clock, ShieldCheck, ArrowRight, 
  Sparkles, Ticket, CheckCircle2, MessageCircle, Phone, MapPin, 
  Send
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const flightRoutes = [
  {
    id: 'ktm-pkr',
    category: 'Domestic',
    from: 'Kathmandu (KTM)',
    to: 'Pokhara (PKR)',
    duration: '25 Mins',
    frequency: '20+ Flights Daily',
    basePriceNpr: 4500,
    tag: 'Most Popular',
    tagColor: 'bg-blue-50 text-[#1e3a8a] border-blue-200',
    description: 'Quickest gateway to Phewa Lake, Annapurna Base Camp, and Poon Hill treks.',
    airlines: 'Buddha Air, Yeti, Shree'
  },
  {
    id: 'ktm-lua',
    category: 'Trek Gateway',
    from: 'Kathmandu (KTM)',
    to: 'Lukla (LUA)',
    duration: '35 Mins',
    frequency: 'Morning Flights',
    basePriceNpr: 9500,
    tag: 'Everest Gateway',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Tenzing-Hillary Airport gateway for Everest Base Camp and Gokyo Lakes expeditions.',
    airlines: 'Tara Air, Summit, Sita'
  },
  {
    id: 'ktm-bhr',
    category: 'Domestic',
    from: 'Kathmandu (KTM)',
    to: 'Bharatpur / Chitwan (BHR)',
    duration: '20 Mins',
    frequency: '8+ Flights Daily',
    basePriceNpr: 4000,
    tag: 'Wildlife Safari',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Fly directly into Chitwan National Park for tiger, rhino, and jungle safaris.',
    airlines: 'Buddha Air, Yeti Airlines'
  },
  {
    id: 'ktm-bwa',
    category: 'Domestic',
    from: 'Kathmandu (KTM)',
    to: 'Bhairahawa / Lumbini (BWA)',
    duration: '35 Mins',
    frequency: '10+ Flights Daily',
    basePriceNpr: 4800,
    tag: 'Birthplace of Buddha',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Gautam Buddha International Airport access for spiritual pilgrimage to Lumbini.',
    airlines: 'Buddha Air, Shree, Yeti'
  },
  {
    id: 'pkr-jmo',
    category: 'Mountain',
    from: 'Pokhara (PKR)',
    to: 'Jomsom / Muktinath (JMO)',
    duration: '20 Mins',
    frequency: 'Early Morning',
    basePriceNpr: 6500,
    tag: 'Mustang Access',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Dramatic flight through the Kali Gandaki Gorge to Muktinath Temple and Upper Mustang.',
    airlines: 'Tara Air, Summit Air'
  },
  {
    id: 'intl-flights',
    category: 'International',
    from: 'Kathmandu (KTM)',
    to: 'Worldwide Destinations',
    duration: 'Direct & Transit',
    frequency: 'Daily Connections',
    basePriceNpr: 28000,
    tag: 'Global Hubs',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Best discounted fares for Dubai, Doha, Delhi, Bangkok, Singapore, Europe & USA.',
    airlines: 'Nepal Airlines, Qatar, Emirates, FlyDubai'
  }
];

const FlightTicketsSection = () => {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('all');

  const filteredRoutes = activeTab === 'all' 
    ? flightRoutes 
    : flightRoutes.filter(r => r.category.toLowerCase().includes(activeTab.toLowerCase()));

  const handleBookFlight = (route) => {
    const text = `Hi Zenex Travel! I want to inquire/book flight tickets for: ${route.from} to ${route.to} (${route.duration}). Please share current availability and best rates.`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookMountainFlight = () => {
    const text = `Hi Zenex Travel! I want to book the Everest Scenic Mountain Flight (Guaranteed Window Seat). Please share departure schedules and prices.`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(text)}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1e3a8a] border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Plane size={14} className="text-[#1e3a8a] animate-pulse" />
              <span>Domestic &amp; International Air Ticketing</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#1e3a8a] tracking-tight leading-tight mb-3">
              Book Flight Tickets in Nepal
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
              Instant domestic flights, scenic 1-hour Everest mountain flights, and global international tickets at guaranteed lowest agent fares.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              to="/flight-ticketing-nepal" 
              className="inline-flex items-center gap-2 text-[#e53a24] font-bold hover:text-white transition-all bg-[#e53a24]/10 hover:bg-[#e53a24] px-5 py-2.5 rounded-xl text-xs md:text-sm shadow-xs"
            >
              <span>Explore All Air Routes</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Spotlight Banner: Everest Mountain Flight */}
        <div className="relative mb-12 rounded-3xl overflow-hidden shadow-xl border border-blue-900/10 bg-gradient-to-r from-[#0a192f] via-[#1e3a8a] to-[#0f172a] text-white">
          <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop" 
              alt="Airplane over snow mountains" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow-sm">
                <Sparkles size={13} fill="currentColor" />
                <span>#1 Himalayan Experience</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                Everest Scenic Mountain Flight (1 Hour)
              </h3>
              
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Witness Mount Everest (8,848m), Lhotse, Makalu, and Cho Oyu from above the clouds. Depart early morning from Kathmandu with a <strong>guaranteed window seat</strong> and receive an official personalized flight certificate signed by the captain.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-blue-100 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-blue-200 uppercase font-semibold">Duration</span>
                    <strong className="text-white text-xs">60 Mins Flight</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                  <Ticket size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-blue-200 uppercase font-semibold">Seating</span>
                    <strong className="text-white text-xs">100% Window Seat</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <Mountain size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-blue-200 uppercase font-semibold">Route</span>
                    <strong className="text-white text-xs">Kathmandu ⇄ Everest</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleBookMountainFlight}
                  className="inline-flex items-center justify-center gap-2 bg-[#e53a24] hover:bg-[#d04b08] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Book Mountain Flight on WhatsApp</span>
                </button>

                <Link
                  to="/flight-ticketing-nepal"
                  className="inline-flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-sm transition-colors"
                >
                  <span>Flight Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800&auto=format&fit=crop" 
                  alt="Everest View from flight" 
                  className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">Guaranteed Departure</span>
                  <p className="text-white font-extrabold text-base leading-snug">Himalayan Panorama Over Mt. Everest</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Filter Tabs */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Popular Flights' },
              { id: 'domestic', label: 'Domestic Nepal' },
              { id: 'mountain', label: 'Mountain & Trek' },
              { id: 'international', label: 'International' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
            Showing <strong className="text-slate-900">{filteredRoutes.length}</strong> top flight sectors
          </span>
        </div>

        {/* Flight Routes Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredRoutes.map((route) => (
            <motion.div
              key={route.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl border border-slate-200/90 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e3a8a] via-[#0F766E] to-[#e53a24] opacity-80" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border tracking-wider ${route.tagColor}`}>
                    {route.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                    <Clock size={12} className="text-slate-400" />
                    <span>{route.duration}</span>
                  </div>
                </div>

                {/* From / To Route Visual */}
                <div className="my-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Departure</span>
                      <h4 className="text-sm font-extrabold text-slate-900 truncate">{route.from}</h4>
                    </div>

                    <div className="flex flex-col items-center px-2 shrink-0">
                      <Plane size={16} className="text-[#1e3a8a] transform rotate-90 my-0.5" />
                      <span className="text-[9px] text-slate-400 font-semibold uppercase">{route.duration}</span>
                    </div>

                    <div className="min-w-0 flex-1 text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Destination</span>
                      <h4 className="text-sm font-extrabold text-[#1e3a8a] truncate">{route.to}</h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3 font-normal">
                  {route.description}
                </p>

                <div className="text-[11px] text-slate-500 mb-4 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span className="truncate"><strong>Airlines:</strong> {route.airlines}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black text-[#e53a24]">
                      {formatPrice(route.basePriceNpr)}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">/ person</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleBookFlight(route)}
                  className="inline-flex items-center gap-1.5 bg-[#1e3a8a] hover:bg-[#152c6e] text-white px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-sm hover:shadow group/btn cursor-pointer"
                >
                  <MessageCircle size={13} />
                  <span>Book Ticket</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 4 Trust Value Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0 shadow-xs">
              <Ticket size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">Instant e-Tickets</h5>
              <p className="text-[11px] text-slate-500">Delivered via WhatsApp &amp; Email</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">Best Rate Guarantee</h5>
              <p className="text-[11px] text-slate-500">No hidden fees, official fares</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
              <Mountain size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">Guaranteed Window</h5>
              <p className="text-[11px] text-slate-500">For Everest mountain flights</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
              <Clock size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">24/7 Agent Support</h5>
              <p className="text-[11px] text-slate-500">Weather delay &amp; reschedule help</p>
            </div>
          </div>
        </div>

        {/* Bottom Help Desk Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-[#1e3a8a] to-slate-900 rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Phone size={20} className="text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">Need Customized Air Itinerary or Group Booking?</h4>
              <p className="text-xs text-blue-200">Talk directly to our ticketing specialists for instant seat availability and discounted charter rates.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/9779767476521?text=Hi%20Zenex%20Travel!%20I%20need%20assistance%20with%20flight%20ticketing."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+9779767476521"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <Phone size={14} />
              <span>+977 9767476521</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FlightTicketsSection;
