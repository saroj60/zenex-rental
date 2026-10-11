import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Gauge, 
  Fuel, 
  Filter, 
  X, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Star, 
  Search, 
  Clock, 
  RotateCcw, 
  Car, 
  Briefcase,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';
import { useBooking } from '../context/BookingContext';

const getLocalDateString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const POPULAR_LOCATIONS = [
  'Kathmandu Airport (TIA)',
  'Thamel, Kathmandu',
  'Patan / Lalitpur',
  'Bhaktapur Durbar Square',
  'Pokhara Airport',
  'Lakeside, Pokhara',
  'Chitwan (Sauraha)',
  'Nagarkot Hill Station',
  'Other'
];

const VEHICLE_CATEGORIES = [
  'All',
  'SUV / 4x4',
  'Sedan/Hatchback',
  'Electric EV',
  'Van / Micro',
  'Bus',
  'Luxury'
];

const VehicleListing = () => {
  const { vehicles } = useAppData();
  const { isVehicleAvailable } = useBooking();
  const { formatPrice } = useCurrency();

  const getVehicleDetailsPath = (vehicle) => {
    const name = vehicle.name.toLowerCase();
    if (name.includes('hiace')) return '/vehicles/hiace-routes';
    if (name.includes('scorpio')) return '/vehicles/scorpio-routes';
    if (name.includes('bus')) return '/vehicles/bus-routes';
    if (name.includes('coaster')) return '/vehicles/coaster-routes';
    if (name.includes('ev van') || name.includes('ev-van') || (name.includes('ev') && name.includes('van'))) return '/vehicles/ev-van-routes';
    if (name.includes('ev') || name.includes('electric') || vehicle.type === 'Electric EV') return '/vehicles/ev-routes';
    if (name.includes('fortuner') || name.includes('land cruiser') || name.includes('cruiser')) return '/vehicles/fortuner-routes';
    if (name.includes('wedding') || name.includes('model') || vehicle.type === 'Luxury') return '/vehicles/wedding-cars';
    if (name.includes('self drive') || name.includes('self-drive')) return '/vehicles/self-drive';
    if (name.includes('standard') || name.includes('sedan')) return '/vehicles/car-routes';
    return '/vehicles/car-routes';
  };

  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') || 'All';
  const urlDriver = searchParams.get('driver');
  const urlPickup = searchParams.get('pickup');
  const urlDropoff = searchParams.get('dropoff');
  const urlStart = searchParams.get('start');
  const urlEnd = searchParams.get('end');

  // Booking Widget State - default to 'all' (All Experiences) unless specified in URL
  const initialDriverMode = urlDriver || (searchType.toLowerCase().includes('self') ? 'self' : 'all');
  const [driverMode, setDriverMode] = useState(initialDriverMode); // 'all', 'self', 'driver'
  const [pickupLoc, setPickupLoc] = useState(urlPickup || 'Kathmandu Airport (TIA)');
  const [customPickup, setCustomPickup] = useState('');
  const [dropoffLoc, setDropoffLoc] = useState(urlDropoff || 'Kathmandu Airport (TIA)');
  const [customDropoff, setCustomDropoff] = useState('');
  
  // Date State with accurate local timezone dates
  const today = getLocalDateString(0);
  const tomorrow = getLocalDateString(1);
  const [startDate, setStartDate] = useState(urlStart || today);
  const [endDate, setEndDate] = useState(urlEnd || tomorrow);
  const [days, setDays] = useState(1);

  // Filter & Search State
  const [filterType, setFilterType] = useState(searchType);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Hero Slider State
  const heroSlides = [
    { title: 'EV cars', price: 6000, img: '/vehicles/byd_atto_1.png' },
    { title: 'Toyota Land Cruiser', price: 25000, img: '/vehicles/offroad_4x4_suv.jpg' },
    { title: 'Luxury Buses', price: 15000, img: '/vehicles/tourist_bus_nepal.png' },
    { title: 'Toyota Hiace', price: 8000, img: 'https://www.toyota.com.sg/showroom/new-models/-/media/27acd1d10dfc4ad29f13efd4415627c0.jpg' },
    { title: 'Mahindra Scorpio / Jeep', price: 8000, img: 'https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg' },
    { title: 'Wedding Cars', price: 8000, img: '/vehicles/wedding car.avif' },
    { title: 'Self Drive Cars', price: 5000, img: '/vehicles/self drive.jpg' }
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchType && searchType !== 'All') {
      setFilterType(searchType);
    }
  }, [searchType]);

  // Calculate days accurately whenever startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diffTime = e.getTime() - s.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays > 0 ? diffDays : 1);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (val) => {
    setStartDate(val);
    if (val && (!endDate || new Date(endDate) <= new Date(val))) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      const y = nextDay.getFullYear();
      const m = String(nextDay.getMonth() + 1).padStart(2, '0');
      const d = String(nextDay.getDate()).padStart(2, '0');
      setEndDate(`${y}-${m}-${d}`);
    }
  };

  const handleEndDateChange = (val) => {
    if (startDate && new Date(val) <= new Date(startDate)) {
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const y = nextDay.getFullYear();
      const m = String(nextDay.getMonth() + 1).padStart(2, '0');
      const d = String(nextDay.getDate()).padStart(2, '0');
      setEndDate(`${y}-${m}-${d}`);
    } else {
      setEndDate(val);
    }
  };

  const handleDriverModeChange = (mode) => {
    setDriverMode(mode);
    // If switching to self-drive while Bus or Van/Micro is selected, reset category to All so 0-results is avoided
    if (mode === 'self' && (filterType === 'Bus' || filterType === 'Van / Micro')) {
      setFilterType('All');
    }
  };

  const handleCategoryChange = (cat) => {
    setFilterType(cat);
    // If selecting Bus or Van/Micro while in self-drive mode, smoothly adjust to all experiences
    if (driverMode === 'self' && (cat === 'Bus' || cat === 'Van / Micro')) {
      setDriverMode('all');
    }
  };

  const handleResetTrip = () => {
    setDriverMode('all');
    setPickupLoc('Kathmandu Airport (TIA)');
    setCustomPickup('');
    setDropoffLoc('Kathmandu Airport (TIA)');
    setCustomDropoff('');
    setStartDate(today);
    setEndDate(tomorrow);
    setFilterType('All');
    setSearchQuery('');
    setSortBy('recommended');
  };

  const scrollToFleet = () => {
    const el = document.getElementById('fleet-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter vehicles
  let filteredList = vehicles || [];

  // 1. Filter by Experience Mode
  if (driverMode === 'self') {
    // Only genuine self-drive passenger cars/SUVs/EVs:
    // Exclude large tourist buses, coasters, 14-seater commercial vans (Hiace & EV Van), and wedding chauffeur cars
    filteredList = filteredList.filter(v => {
      const name = (v.name || '').toLowerCase();
      const type = (v.type || '').toLowerCase();
      if (type === 'bus' || name.includes('bus') || name.includes('coaster')) return false;
      if (name.includes('hiace') || name.includes('van') || type.includes('van')) return false;
      if (name.includes('wedding')) return false;
      return true;
    });
  } else if (driverMode === 'driver') {
    // Exclude the dedicated self-drive placeholder card
    filteredList = filteredList.filter(v => {
      const name = (v.name || '').toLowerCase();
      return !name.includes('self drive');
    });
  }

  // 2. Filter by Vehicle Category
  if (filterType !== 'All') {
    if (filterType === 'Electric EV') {
      filteredList = filteredList.filter(v => v.type === 'Electric EV' || v.type === 'EV' || v.fuel === 'Electric');
    } else {
      filteredList = filteredList.filter(v => v.type === filterType);
    }
  }

  // 3. Filter by Booking Availability
  filteredList = filteredList.filter(v => isVehicleAvailable(v.id, startDate, endDate));

  // 4. Search Query Filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredList = filteredList.filter(v => 
      v.name.toLowerCase().includes(q) || 
      (v.type && v.type.toLowerCase().includes(q))
    );
  }

  // 5. Sort Vehicles
  const filteredVehicles = [...filteredList].sort((a, b) => {
    const priceA = driverMode === 'driver' ? (a.priceWithDriver || a.price + 1500) : a.price;
    const priceB = driverMode === 'driver' ? (b.priceWithDriver || b.price + 1500) : b.price;
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating-desc') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    return 0; 
  });

  const finalPickup = pickupLoc === 'Other' ? (customPickup.trim() || 'Custom Location') : pickupLoc;
  const finalDropoff = dropoffLoc === 'Other' ? (customDropoff.trim() || 'Custom Location') : dropoffLoc;

  const handleWhatsAppBooking = (vehicle) => {
    const isSelf = driverMode === 'self';
    const isDriver = driverMode === 'driver';
    const pricePerDay = isDriver ? (vehicle.priceWithDriver || vehicle.price + 1500) : vehicle.price;
    const totalPrice = pricePerDay * days;
    const experienceText = isSelf 
      ? 'Self Drive (Drive Yourself)' 
      : isDriver 
        ? 'With Professional Driver' 
        : 'Flexible (Self Drive or Driver)';
    
    const message = `Hi Zenex Travel, I'd like to book a vehicle!

*Vehicle:* ${vehicle.name}
*Experience:* ${experienceText}
*Pickup Date:* ${startDate}
*Dropoff Date:* ${endDate} (${days} ${days === 1 ? 'Day' : 'Days'})
*Pickup Location:* ${finalPickup}
*Dropoff Location:* ${finalDropoff}

*Daily Rate:* ${formatPrice(pricePerDay)} / Day
*Estimated Total:* ${formatPrice(totalPrice)}

Is this vehicle available?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9779767476521?text=${encodedMessage}`, '_blank');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredVehicles.map((v, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": v.name,
        "image": v.img,
        "description": `${v.type} for rent. Features: ${v.seats || v.pax} seats, ${v.trans}.`,
        "offers": {
          "@type": "Offer",
          "price": v.price,
          "priceCurrency": "NPR"
        }
      }
    }))
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen">
      <SEO 
        keywords="Car Rental Nepal, Rent SUV Nepal, Scorpio Hire Kathmandu, Hiace Rental Nepal, Zenex Travels, Zenex Travel, Self Drive Nepal" 
        title="Car Rental Nepal Fleet | Rent SUV, Scorpio, Hiace & Sedan | Zenex Travels"
        description="Rent vehicles in Nepal with driver or self-drive. Explore Suzuki Swift, Toyota Fortuner 4x4, Mahindra Scorpio, Toyota Hiace, and Tourist Buses at best rates."
        canonicalUrl="https://www.zenextravels.com/vehicles"
        structuredData={structuredData}
      />
      
      {/* Vehicle Hero Section */}
      <section className="relative h-[380px] md:h-[480px] w-full flex items-end pb-12 justify-center pt-16">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {heroSlides.map((slide, idx) => (
            <img
              key={idx}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              src={slide.img}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="inline-block bg-[#e53a24] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-lg">
              Featured Fleet
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg leading-tight transition-all duration-300">
              {heroSlides[currentImageIndex]?.title || 'Our Premium Fleet'}
            </h1>
            <p className="text-base md:text-lg text-white/90 drop-shadow-md font-medium max-w-2xl">
              Choose from our wide range of well-maintained vehicles for self-drive or with a professional driver.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-5 rounded-2xl w-full md:w-auto">
            <div className="text-white">
              <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Starting From</p>
              <p className="text-2xl md:text-3xl font-black">{formatPrice(heroSlides[currentImageIndex]?.price || 0)} <span className="text-sm font-medium">/ Day</span></p>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-[#e53a24] w-6' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-16">
        
        {/* Interactive Booking & Trip Planning Widget */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 md:p-7 mb-10 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-gray-100 gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] tracking-tight">Plan Your Trip</h2>
              <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">
                Set your dates, experience, and pickup location to see tailored rates and availability
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-[#eff4ff] text-[#1e3a8a] text-xs font-bold px-3 py-1.5 rounded-full border border-[#d2e4ff]">
                <Clock size={14} className="text-[#e53a24]" />
                {days} {days === 1 ? 'Day Rental' : 'Days Rental'}
              </span>
              {driverMode === 'self' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1.5 rounded-full border border-emerald-200">
                  <CheckCircle2 size={13} /> Self Drive
                </span>
              )}
              {driverMode === 'driver' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1.5 rounded-full border border-blue-200">
                  <CheckCircle2 size={13} /> Driver Included
                </span>
              )}
              {driverMode === 'all' && (
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-full border border-gray-200">
                  <Car size={13} /> All Experiences
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Experience */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Car size={14} className="text-[#1e3a8a]" /> Experience
              </label>
              <select 
                value={driverMode} 
                onChange={e => handleDriverModeChange(e.target.value)}
                className="w-full bg-[#f8faff] border border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all cursor-pointer shadow-xs"
              >
                <option value="all">All Experiences</option>
                <option value="self">Self Drive (Drive Yourself)</option>
                <option value="driver">With Driver (Chauffeur)</option>
              </select>
            </div>

            {/* 2. Pickup Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-[#1e3a8a]" /> Pickup Location
              </label>
              <select 
                value={pickupLoc} 
                onChange={e => setPickupLoc(e.target.value)}
                className="w-full bg-[#f8faff] border border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all cursor-pointer"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc === 'Other' ? 'Other (Enter Custom Location)' : loc}</option>
                ))}
              </select>
            </div>

            {/* 3. Dropoff Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-[#e53a24]" /> Dropoff Location
              </label>
              <select 
                value={dropoffLoc} 
                onChange={e => setDropoffLoc(e.target.value)}
                className="w-full bg-[#f8faff] border border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all cursor-pointer"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc === 'Other' ? 'Other (Enter Custom Location)' : loc}</option>
                ))}
              </select>
            </div>

            {/* 4. Pickup Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={14} className="text-[#1e3a8a]" /> Pickup Date
              </label>
              <input 
                type="date" 
                value={startDate} 
                min={today}
                onChange={e => handleStartDateChange(e.target.value)}
                className="w-full bg-[#f8faff] border border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all cursor-pointer"
              />
            </div>

            {/* 5. Dropoff Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={14} className="text-[#1e3a8a]" /> Dropoff Date
              </label>
              <input 
                type="date" 
                value={endDate} 
                min={startDate || today}
                onChange={e => handleEndDateChange(e.target.value)}
                className="w-full bg-[#f8faff] border border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all cursor-pointer"
              />
            </div>

          </div>

          {/* Conditional Custom Location Inputs */}
          {(pickupLoc === 'Other' || dropoffLoc === 'Other') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              {pickupLoc === 'Other' && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Custom Pickup Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Hotel Yak & Yeti, Durbarmarg"
                    value={customPickup}
                    onChange={e => setCustomPickup(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#1e3a8a] rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                  />
                </div>
              )}
              {dropoffLoc === 'Other' && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Custom Dropoff Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Pokhara Lakeside Hotel"
                    value={customDropoff}
                    onChange={e => setCustomDropoff(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#1e3a8a] rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                  />
                </div>
              )}
            </div>
          )}

          {/* Action & Feedback Footer */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-600 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                Trip Summary: <strong className="text-gray-800">{finalPickup}</strong> → <strong className="text-gray-800">{finalDropoff}</strong> ({days} {days === 1 ? 'day' : 'days'})
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={handleResetTrip}
                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-xs font-bold px-3 py-2.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                title="Reset all filters to defaults"
              >
                <RotateCcw size={14} /> Reset
              </button>
              <button 
                onClick={scrollToFleet}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#162a63] text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Search size={15} /> Find Vehicles ({filteredVehicles.length})
              </button>
            </div>
          </div>
        </div>

        {/* Fleet Section Header with Filters & Search */}
        <div id="fleet-results" className="pt-2 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1e3a8a] tracking-tight">
                Available Fleet
              </h2>
              <p className="text-gray-500 text-sm font-medium mt-0.5">
                Showing {filteredVehicles.length} vehicles ready for your {days}-day rental ({startDate} to {endDate})
              </p>
            </div>

            {/* Search Input & Sort */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative min-w-[220px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search vehicle model..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs md:text-sm font-medium focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm font-semibold text-gray-700 outline-none cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: Highest</option>
              </select>
            </div>
          </div>

          {/* Quick Experience Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-200/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Experience:</span>
              <div className="inline-flex bg-gray-100 p-1 rounded-xl gap-1">
                <button
                  onClick={() => handleDriverModeChange('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    driverMode === 'all'
                      ? 'bg-white text-[#1e3a8a] shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Experiences
                </button>
                <button
                  onClick={() => handleDriverModeChange('self')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    driverMode === 'self'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🚗 Self Drive
                </button>
                <button
                  onClick={() => handleDriverModeChange('driver')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    driverMode === 'driver'
                      ? 'bg-[#1e3a8a] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  👤 With Driver
                </button>
              </div>
            </div>

            {driverMode !== 'all' && (
              <button
                onClick={() => handleDriverModeChange('all')}
                className="text-xs font-semibold text-gray-500 hover:text-[#1e3a8a] underline cursor-pointer"
              >
                Clear experience filter
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {VEHICLE_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterType === category 
                    ? 'bg-[#1e3a8a] text-white shadow-sm' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category === 'All' ? 'All Fleet' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Informational Banner when Self-Drive is active */}
        {driverMode === 'self' && (
          <div className="mb-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700 font-bold shrink-0 text-xl">
                🚗
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-950">Self-Drive Fleet Active</p>
                <p className="text-xs text-emerald-800">
                  Showing vehicles available to drive yourself. Looking for specific hatchback & compact SUV daily rates?
                </p>
              </div>
            </div>
            <Link 
              to="/vehicles/self-drive" 
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              View 13+ Self-Drive Models <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Vehicle Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 w-full">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => {
              const detailsPath = getVehicleDetailsPath(vehicle);
              const pricePerDay = driverMode === 'driver' ? (vehicle.priceWithDriver || vehicle.price + 1500) : vehicle.price;
              const totalPrice = pricePerDay * days;
              const detailsQuery = `?start=${startDate}&end=${endDate}&pickup=${encodeURIComponent(finalPickup)}&dropoff=${encodeURIComponent(finalDropoff)}&driver=${driverMode}`;

              return (
                <div 
                  key={vehicle.id}
                  className="bg-white shadow-sm border border-sky-tint hover:shadow-md transition-shadow group flex flex-col justify-between w-full max-w-[285px] p-3.5 rounded-xl text-left"
                >
                  <div>
                    {/* Framed Image Container */}
                    <Link to={`${detailsPath}${detailsQuery}`} className="relative overflow-hidden rounded-lg block cursor-pointer mb-2.5 bg-slate-100 border border-slate-200/60 h-36">
                      <img 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" 
                        src={vehicle.img} 
                        data-pin-nopin="true"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/economy_car.png'; }} 
                      />
                      <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#1e3a8a] shadow-sm">
                        {vehicle.type}
                      </span>
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 text-[#1e3a8a]">
                        <Star size={12} className="text-[#e53a24] fill-current" /> {vehicle.rating || '4.8'}
                      </div>
                    </Link>
                    
                    <h3 className="font-headline-md font-bold text-gray-900 mb-1 text-lg leading-snug line-clamp-1">{vehicle.name}</h3>
                    
                    {/* Pricing with Live Trip Duration Total */}
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-gray-500 text-xs font-medium">Starting from</span>
                      <span className="font-bold text-[#e53a24] text-lg">{formatPrice(pricePerDay)}</span>
                      <span className="text-gray-500 text-xs font-medium">/ Day</span>
                    </div>

                    {/* Experience Badge */}
                    <div className="mb-1.5">
                      {driverMode === 'self' ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 size={11} /> Self-Drive
                        </span>
                      ) : driverMode === 'driver' ? (
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 inline-flex items-center gap-1">
                          <CheckCircle2 size={11} /> Driver Included
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          Self Drive & Driver Options
                        </span>
                      )}
                    </div>

                    {days > 1 && (
                      <div className="mb-2.5">
                        <span className="text-[11px] font-semibold text-gray-600 bg-[#eff4ff] px-2 py-0.5 rounded border border-[#d2e4ff]">
                          Total: <strong>{formatPrice(totalPrice)}</strong> ({days} Days)
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* 4 Feature Pills with Identical Height */}
                  <div className="grid grid-cols-2 gap-2 mt-auto mb-3.5">
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-2 h-[58px]">
                      <Users size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a] truncate w-full px-1">{vehicle.seats || vehicle.pax || 4} Seats</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-2 h-[58px]">
                      <Gauge size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a] truncate w-full px-1">{vehicle.trans || 'Manual'}</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-2 h-[58px]">
                      <Fuel size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a] truncate w-full px-1">{vehicle.fuel || 'Petrol'}</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center relative overflow-hidden p-2 h-[58px]">
                      <Briefcase size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a] truncate w-full px-1">{vehicle.luggage || 2} Bags</span>
                    </div>
                  </div>

                  {/* Buttons pinned to bottom */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link 
                      to={`${detailsPath}${detailsQuery}`} 
                      className="w-full font-bold text-xs hover:bg-[#1e3a8a] hover:text-white transition-colors text-center py-2.5 rounded-lg border border-[#1e3a8a] text-[#1e3a8a]"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleWhatsAppBooking(vehicle)}
                      className="w-full text-white font-bold text-xs hover:bg-[#1ebd5a] transition-colors shadow-sm flex justify-center items-center gap-2 py-2.5 rounded-lg bg-[#25D366] cursor-pointer"
                    >
                      <MessageCircle size={16} /> Book via WhatsApp
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-sm max-w-xl mx-auto">
              <Car size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-1">No vehicles found</h3>
              <p className="text-gray-500 font-medium text-sm mb-6">
                No vehicles match your current search criteria ({filterType !== 'All' ? `Type: ${filterType}, ` : ''}{driverMode === 'self' ? 'Self Drive, ' : ''}{days} Days).
              </p>
              <button 
                onClick={handleResetTrip}
                className="inline-flex items-center gap-2 bg-[#e53a24] hover:bg-[#d04b08] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw size={16} /> Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VehicleListing;
