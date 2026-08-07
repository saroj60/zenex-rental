import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Compass, ShieldCheck, ArrowRight, Car, Globe, Building2, Users, Languages, Info, Clock, Zap, Phone, ChevronDown, Plane, Bus, Wallet, ThermometerSun, Camera } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import SEO from '../components/SEO';

const getIcon = (iconName) => {
  const icons = {
    FaGlobe: Globe,
    FaCity: Building2,
    FaUsers: Users,
    FaLanguage: Languages,
    FaPrayingHands: Info,
    FaClock: Clock,
    FaBolt: Zap,
    FaPhone: Phone
  };
  const IconComponent = icons[iconName] || Info;
  return <IconComponent className="text-[#e53a24] mb-3 group-hover:scale-110 transition-transform duration-300" size={28} />;
};

const DestinationDetail = () => {
  const { id } = useParams();
  const { destinations, packages } = useAppData();
  const dest = destinations.find(d => d.id === id) || destinations[0];
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [id]);

  const destinationPackages = packages.filter(p => {
    if (p.category !== 'Tours' && p.category !== 'Treks') return false;
    const loc = (p.location || '').toLowerCase();
    const title = (p.title || '').toLowerCase();
    const searchTerms = [dest.id.toLowerCase(), dest.name.split(' ')[0].toLowerCase()];
    return searchTerms.some(term => loc.includes(term) || title.includes(term));
  });

  const sortedPackages = [...destinationPackages].sort((a, b) => {
    const daysA = parseInt(a.title.match(/\d+/) || [0], 10);
    const daysB = parseInt(b.title.match(/\d+/) || [0], 10);
    return daysA - daysB;
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": dest.name,
    "description": dest.desc,
    "image": dest.img
  };

  return (
    <div className="bg-[#F4F6F8] min-h-screen">
      <SEO 
        title={`${dest.name} Travel Guide | Best Time, Weather & Tours`}
        description={`Plan your trip to ${dest.name}, Nepal. Get essential travel information, weather data, budget estimates, and discover the best tour packages.`}
        canonicalUrl={`https://zenextravel.com.np/destinations/${dest.id}`}
        structuredData={structuredData}
      />
      
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2f4c] via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/destinations" className="text-blue-200 hover:text-white mb-6 inline-block font-medium transition-colors">
              &larr; Back to Destinations
            </Link>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
              {dest.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl font-medium drop-shadow-md">
              {dest.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-6">Trip Overview</h2>
              <div className="prose prose-lg text-gray-700 mb-8 max-w-none" dangerouslySetInnerHTML={{ __html: dest.extendedOverview || dest.desc }} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Calendar className="text-[#e53a24] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Best Time</span>
                  <span className="text-gray-900 font-bold">{dest.bestTime}</span>
                </div>
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Compass className="text-[#e53a24] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Terrain</span>
                  <span className="text-gray-900 font-bold">{dest.terrain}</span>
                </div>
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <ShieldCheck className="text-[#e53a24] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Safety Rating</span>
                  <span className="text-gray-900 font-bold">Excellent</span>
                </div>
              </div>
            </div>

            {/* Travel Information Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* How to Get There */}
              {dest.getThere && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-3">
                    <Plane className="text-[#e53a24]" /> How to Get There
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    {dest.getThere.flight && (
                      <div className="flex gap-3">
                        <Plane size={20} className="mt-1 flex-shrink-0 text-gray-400" />
                        <div><strong className="block text-gray-900">By Air:</strong> {dest.getThere.flight}</div>
                      </div>
                    )}
                    {dest.getThere.bus && (
                      <div className="flex gap-3">
                        <Bus size={20} className="mt-1 flex-shrink-0 text-gray-400" />
                        <div><strong className="block text-gray-900">By Bus:</strong> {dest.getThere.bus}</div>
                      </div>
                    )}
                    {dest.getThere.carRental && (
                      <div className="flex gap-3">
                        <Car size={20} className="mt-1 flex-shrink-0 text-gray-400" />
                        <div><strong className="block text-gray-900">By Private Car:</strong> {dest.getThere.carRental}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Where to Stay */}
              {dest.stayOptions && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-3">
                    <Building2 className="text-[#e53a24]" /> Where to Stay
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <div><strong className="block text-gray-900">Luxury (4-5 Star)</strong> {dest.stayOptions.luxury}</div>
                    <div><strong className="block text-gray-900">Mid-Range</strong> {dest.stayOptions.midRange}</div>
                    <div><strong className="block text-gray-900">Budget / Backpackers</strong> {dest.stayOptions.budget}</div>
                  </div>
                </div>
              )}

              {/* Budget & Costs */}
              {dest.budget && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-3">
                    <Wallet className="text-[#e53a24]" /> Budget Estimates
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <div><strong className="block text-gray-900">Daily Costs:</strong> {dest.budget.daily}</div>
                    <div><strong className="block text-gray-900">Food & Dining:</strong> {dest.budget.food}</div>
                  </div>
                </div>
              )}

              {/* Local Transport & Safety */}
              {(dest.transportTips || dest.safetyInfo) && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-3">
                    <ShieldCheck className="text-[#e53a24]" /> Transport & Safety
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    {dest.transportTips && <div><strong className="block text-gray-900">Local Transport:</strong> {dest.transportTips}</div>}
                    {dest.safetyInfo && <div><strong className="block text-gray-900">Safety Tips:</strong> {dest.safetyInfo}</div>}
                  </div>
                </div>
              )}
            </div>

            {/* Weather & Climate Data */}
            {dest.weatherData && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 flex items-center gap-3">
                  <ThermometerSun className="text-[#e53a24]" /> Weather & Climate Guide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dest.weatherData.map((weather, idx) => (
                    <div key={idx} className="bg-[#F4F6F8] p-4 rounded-xl text-center border border-gray-200">
                      <h4 className="font-bold text-[#1e3a8a] text-sm mb-2">{weather.season}</h4>
                      <p className="text-2xl font-extrabold text-[#e53a24] mb-2">{weather.temp}</p>
                      <p className="text-xs text-gray-600 font-medium">{weather.condition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {dest.gallery && dest.gallery.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 flex items-center gap-3">
                  <Camera className="text-[#e53a24]" /> Destination Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dest.gallery.map((img, idx) => (
                    <div key={idx} className="h-40 md:h-48 overflow-hidden rounded-xl">
                      <img src={img} alt={`${dest.name} Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Removed Need a Vehicle widget */}

            {sortedPackages.length > 0 && (
              <div>
                <h3 className="text-xl font-extrabold text-[#1e3a8a] mb-6">Top Packages for {dest.name}</h3>
                <div className="space-y-4">
                  {sortedPackages.slice(0, 3).map(pkg => (
                    <Link key={pkg.id} to={`/packages/${pkg.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className="h-32 relative">
                        <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#1e3a8a] px-2 py-1 rounded text-xs font-bold">
                          {pkg.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors line-clamp-2">{pkg.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
