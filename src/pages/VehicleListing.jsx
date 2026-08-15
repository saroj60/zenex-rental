import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link, useSearchParams } from 'react-router-dom';
import { Users, Gauge, Fuel, Filter, X, MapPin, Calendar, MessageCircle, Star, Search } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';
import { useBooking } from '../context/BookingContext';
import HiacePricingCard from '../components/HiacePricingCard';
import ScorpioPricingCard from '../components/ScorpioPricingCard';
import CarPricingCard from '../components/CarPricingCard';
import BusPricingCard from '../components/BusPricingCard';
import CoasterPricingCard from '../components/CoasterPricingCard';
import CarModelsCard from '../components/CarModelsCard';
import SelfDriveCard from '../components/SelfDriveCard';

const VehicleListing = () => {
  const { vehicles } = useAppData();
  const { isVehicleAvailable } = useBooking();

  const getVehicleDetailsPath = (vehicle) => {
    const name = vehicle.name.toLowerCase();
    if (name.includes('hiace')) return '/vehicles/hiace-routes';
    if (name.includes('scorpio')) return '/vehicles/scorpio-routes';
    if (name.includes('bus')) return '/vehicles/bus-routes';
    if (name.includes('coaster')) return '/vehicles/coaster-routes';
    if (name.includes('wedding') || name.includes('model') || vehicle.type === 'Luxury') return '/vehicles/car-models';
    if (name.includes('self drive') || name.includes('self-drive')) return '/vehicles/self-drive';
    return '/vehicles/car-routes';
  };
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') || 'All';
  const urlPickup = searchParams.get('pickup');
  const urlDropoff = searchParams.get('dropoff');
  const urlStart = searchParams.get('start');
  const urlEnd = searchParams.get('end');

  // Booking Widget State
  const [driverMode, setDriverMode] = useState('self');
  const [pickupLoc, setPickupLoc] = useState(urlPickup || 'Kathmandu Airport (TIA)');
  const [customPickup, setCustomPickup] = useState('');
  const [dropoffLoc, setDropoffLoc] = useState(urlDropoff || 'Kathmandu Airport (TIA)');
  const [customDropoff, setCustomDropoff] = useState('');
  
  // Date State
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(urlStart || today);
  const [endDate, setEndDate] = useState(urlEnd || tomorrow);
  const [days, setDays] = useState(1);

  // Filter State
  const [filterType, setFilterType] = useState(searchType);
  const [sortBy, setSortBy] = useState('recommended');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [transFilter, setTransFilter] = useState('All');
  const [seatFilter, setSeatFilter] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { formatPrice } = useCurrency();

  // Hero Slider State
  const heroSlides = [
    { title: 'Toyota Hiace', price: 8000, img: 'https://www.toyota.com.sg/showroom/new-models/-/media/27acd1d10dfc4ad29f13efd4415627c0.jpg' },
    { title: 'Mahindra Scorpio', price: 8000, img: 'https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg' },
    { title: 'Standard Car', price: 5500, img: 'https://nissan-nepal.com/assets/images/product/nissan-new-car.jpg' },
    { title: 'Tourist Bus', price: 15000, img: 'https://tourpokhara.com/wp-content/uploads/2023/09/Tourist-bus.jpg' },
    { title: 'Toyota Coaster', price: 12000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTmOTRvXlpRu1DFUtFy-oRCbC0EZtbBoNC490O4k9-g&s=10' },
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
    // Simulate network fetch for professional feel
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [filterType]);

  useEffect(() => {
    if (searchType && searchType !== 'All') {
      setFilterType(searchType);
    }
  }, [searchType]);

  // Calculate days
  useEffect(() => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diffTime = e - s;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays > 0 ? diffDays : 1);
    }
  }, [startDate, endDate]);

  let filteredList = vehicles;

  if (filterType !== 'All') {
    filteredList = filteredList.filter(v => v.type === filterType);
  }
  if (fuelFilter !== 'All') {
    filteredList = filteredList.filter(v => v.fuel === fuelFilter);
  }
  if (transFilter !== 'All') {
    filteredList = filteredList.filter(v => v.trans === transFilter);
  }
  if (seatFilter !== 'All') {
    if (seatFilter === '4') filteredList = filteredList.filter(v => parseInt(v.pax) <= 4);
    if (seatFilter === '5-7') filteredList = filteredList.filter(v => parseInt(v.pax) >= 5 && parseInt(v.pax) <= 7);
    if (seatFilter === '8+') filteredList = filteredList.filter(v => parseInt(v.pax) >= 8);
  }

  filteredList = filteredList.filter(v => isVehicleAvailable(v.id, startDate, endDate));
  if (searchQuery.trim() !== '') {
    filteredList = filteredList.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const filteredVehicles = [...filteredList].sort((a, b) => {
    const priceA = driverMode === 'self' ? a.price : (a.priceWithDriver || a.price + 1500);
    const priceB = driverMode === 'self' ? b.price : (b.priceWithDriver || b.price + 1500);
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating-desc') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    return 0; 
  });

  const handleWhatsAppBooking = (vehicle) => {
    const finalPickup = pickupLoc === 'Other' ? customPickup : pickupLoc;
    const finalDropoff = dropoffLoc === 'Other' ? customDropoff : dropoffLoc;
    const pricePerDay = driverMode === 'self' ? vehicle.price : (vehicle.priceWithDriver || vehicle.price + 1500);
    const totalPrice = pricePerDay * days;
    
    const message = `Hi Zenex Travel, I'd like to book a vehicle!

*Vehicle:* ${vehicle.name}
*Type:* ${driverMode === 'self' ? 'Self Drive' : 'With Driver'}
*Pickup Date:* ${startDate}
*Dropoff Date:* ${endDate} (${days} Days)
*Pickup Location:* ${finalPickup}
*Dropoff Location:* ${finalDropoff}

*Estimated Total:* ${formatPrice(totalPrice)}

Is this available?`;

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
        "description": `${v.type} for rent. Features: ${v.pax} seats, ${v.trans}.`,
        "offers": {
          "@type": "Offer",
          "price": v.price,
          "priceCurrency": "NPR"
        }
      }
    }))
  };

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Our Fleet | Car Rentals in Nepal"
        description="Browse our fleet of economy, SUV, luxury, and electric vehicles. Calculate real-time prices for self-drive or chauffeur services and book instantly via WhatsApp."
        canonicalUrl="https://zenextravel.com.np/vehicles"
        structuredData={structuredData}
      />
      
      {/* Vehicle Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-end pb-12 justify-center pt-16">
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
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-lg leading-tight transition-all duration-300">
              {heroSlides[currentImageIndex]?.title || 'Our Premium Fleet'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md font-medium max-w-2xl">
              Choose from our wide range of well-maintained vehicles for self-drive or with a professional driver.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-full md:w-auto">
            <div className="text-white">
              <p className="text-sm text-white/70 font-semibold uppercase">Starting From</p>
              <p className="text-3xl font-black">{formatPrice(heroSlides[currentImageIndex]?.price || 0)} <span className="text-base font-medium">/ Day</span></p>
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
      
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-16">
        
        {/* Interactive Booking Widget */}
        <div className="bg-white rounded-2xl shadow-xl border border-sky-tint p-6 mb-12">
          <h2 className="text-2xl font-bold text-himalayan-blue mb-6">Plan Your Trip</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Experience</label>
              <select 
                value={driverMode} 
                onChange={e => setDriverMode(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue"
              >
                <option value="self">Self Drive</option>
                <option value="driver">With Driver</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Pickup Location</label>
              <select 
                value={pickupLoc} 
                onChange={e => setPickupLoc(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue mb-2"
              >
                <option value="Kathmandu Airport (TIA)">Kathmandu Airport (TIA)</option>
                <option value="Thamel City Center">Thamel City Center</option>
                <option value="Pokhara Airport">Pokhara Airport</option>
                <option value="Other">Other (Enter Below)</option>
              </select>
              {pickupLoc === 'Other' && (
                <input 
                  type="text" 
                  placeholder="Enter custom pickup"
                  value={customPickup}
                  onChange={e => setCustomPickup(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 text-sm outline-none"
                />
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Dropoff Location</label>
              <select 
                value={dropoffLoc} 
                onChange={e => setDropoffLoc(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue mb-2"
              >
                <option value="Kathmandu Airport (TIA)">Kathmandu Airport (TIA)</option>
                <option value="Thamel City Center">Thamel City Center</option>
                <option value="Pokhara Airport">Pokhara Airport</option>
                <option value="Other">Other (Enter Below)</option>
              </select>
              {dropoffLoc === 'Other' && (
                <input 
                  type="text" 
                  placeholder="Enter custom dropoff"
                  value={customDropoff}
                  onChange={e => setCustomDropoff(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 text-sm outline-none"
                />
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Pickup Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Dropoff Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue"
              />
            </div>

          </div>
        </div>

        {/* Special Vehicle Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 w-full">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => {
              const detailsPath = getVehicleDetailsPath(vehicle);
              const pricePerDay = driverMode === 'self' ? vehicle.price : (vehicle.priceWithDriver || vehicle.price + 1500);
              
              return (
                <div 
                  key={vehicle.id}
                  className="bg-white shadow-sm border border-sky-tint hover:shadow-md transition-shadow group flex flex-col w-full max-w-sm p-4 rounded-2xl mb-6 text-left"
                >
                  <Link to={detailsPath} className="relative overflow-hidden rounded-lg block cursor-pointer mb-4">
                    <img 
                      alt={vehicle.name} 
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500 h-48"
                      loading="lazy" 
                      src={vehicle.img} 
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/economy_car.png'; }} 
                    />
                    <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#1e3a8a] shadow-sm">
                      {vehicle.type}
                    </span>
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 text-[#1e3a8a]">
                      <Star size={12} className="text-[#e53a24] fill-current" /> {vehicle.rating || '4.8'}
                    </div>
                  </Link>
                  
                  <h3 className="font-headline-md font-bold text-gray-900 mb-1 text-2xl">{vehicle.name}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-gray-500 text-sm font-medium">Starting from</span>
                    <span className="font-bold text-[#e53a24] text-xl">{formatPrice(pricePerDay)}</span>
                    <span className="text-gray-500 text-sm font-medium">/ Day</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto mb-6">
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-3">
                      <Users size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a]">{vehicle.seats} Seats</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-3">
                      <Gauge size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a]">{vehicle.trans}</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-3">
                      <Fuel size={18} className="text-[#1e3a8a] mb-1.5" />
                      <span className="text-xs font-semibold text-[#1e3a8a]">{vehicle.fuel}</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-xl text-center flex flex-col items-center justify-center p-3">
                      <span className="w-5 h-5 inline-flex items-center justify-center text-[#1e3a8a] mb-1.5 font-bold text-xs">💼</span>
                      <span className="text-xs font-semibold text-[#1e3a8a]">{vehicle.luggage} Bags</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-auto">
                    <Link 
                      to={detailsPath} 
                      className="w-full font-bold text-xs hover:bg-[#1e3a8a] hover:text-white transition-colors text-center py-3 rounded-xl border-2 border-[#1e3a8a] text-[#1e3a8a]"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleWhatsAppBooking(vehicle)}
                      className="w-full text-white font-bold text-xs hover:bg-[#1ebd5a] transition-colors shadow-sm flex justify-center items-center gap-2 py-3 rounded-xl bg-[#25D366]"
                    >
                      <MessageCircle size={16} /> Book via WhatsApp
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 w-full">
              <p className="text-gray-500 font-medium text-lg">No vehicles found matching your filters.</p>
              <button 
                onClick={() => {
                  setFilterType('All');
                  setFuelFilter('All');
                  setTransFilter('All');
                  setSeatFilter('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-[#e53a24] font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VehicleListing;
