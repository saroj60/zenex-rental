import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, DollarSign, MapPin, CheckCircle2, ArrowLeft, Calendar,
  Mountain, Bed, Utensils, Users, Sun, Check, X, Map, Car, Star,
  ShieldCheck, CalendarCheck, FileText, Info, HelpCircle, Heart, Phone, Plus, Minus, Image as ImageIcon,
  AlertTriangle, Backpack, PlaneTakeoff
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import SEO from '../components/SEO';

const TrekDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { treks } = useAppData();
  
  const [trek, setTrek] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [packageType, setPackageType] = useState('Budget');
  const [date, setDate] = useState('');
  const [persons, setPersons] = useState(2);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  
  // Active tab state for sticky nav
  const [activeTab, setActiveTab] = useState('overview');

  const getBasePriceNum = () => {
    if (!trek || !trek.price) return 0;
    const basePriceStr = trek.price.replace(/[^0-9.]/g, '');
    return parseFloat(basePriceStr) || 0;
  };

  const getDiscountedPerPersonPrice = (pax) => {
    if (trek?.groupDiscounts) {
      if (pax >= 16 && trek.groupDiscounts["16"]) return trek.groupDiscounts["16"];
      if (pax >= 12 && trek.groupDiscounts["12"]) return trek.groupDiscounts["12"];
      if (pax >= 8 && trek.groupDiscounts["8"]) return trek.groupDiscounts["8"];
      if (pax >= 4 && trek.groupDiscounts["4"]) return trek.groupDiscounts["4"];
      if (pax >= 2 && trek.groupDiscounts["2"]) return trek.groupDiscounts["2"];
    }

    const base = getBasePriceNum();
    if (!base) return 0;
    
    // Fallback Group discount logic
    if (pax >= 16) return base - 145;
    if (pax >= 12) return base - 140;
    if (pax >= 8) return base - 115;
    if (pax >= 4) return base - 95;
    return base;
  };

  const calculatePrice = () => {
    const discountedBase = getDiscountedPerPersonPrice(persons);
    if (!discountedBase) return trek?.price || null;
    
    let multiplier = 1;
    if (packageType === 'Comfort') multiplier = 1.3;
    if (packageType === 'Standard') multiplier = 1.5;
    if (packageType === 'Luxury') multiplier = 1.8;
    
    const finalPrice = Math.round(discountedBase * persons * multiplier);
    return `US$${finalPrice}`;
  };

  const currentPrice = calculatePrice();
  const perPersonPrice = getDiscountedPerPersonPrice(persons);

  const handleBookPackage = () => {
    const message = `Hi! I would like to book the following trek:\nTrek: ${trek.title}\nType: ${packageType}\nDate: ${date}\nPersons: ${persons}\nTotal Price: ${currentPrice}`;
    window.open(`mailto:info@zenextravel.com.np?subject=Booking Request: ${trek.title}&body=${encodeURIComponent(message)}`, '_blank');
  };

  const handleQuickInquiry = () => {
    const message = `Hi! I have some questions about the ${trek.title}. Can you please help me?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadPDF = () => {
    // html2canvas doesn't support modern oklch colors used by Tailwind v4.
    // The native browser print dialog is much more robust for generating PDFs.
    window.print();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky nav height
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Note: activeTab will also update automatically via scroll listener, but setting it here provides instant feedback
      setActiveTab(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'gallery', 'itinerary', 'cost', 'info', 'faqs'];
      // The sticky nav offset is around 80px, add a bit more so it triggers as soon as the section header hits the nav
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= elementTop) {
            setActiveTab(prev => {
              if (prev !== section) return section;
              return prev;
            });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundTrek = treks.find(t => t.id === id);
    setTrek(foundTrek);
  }, [id, treks]);

  useEffect(() => {
    if (!trek) return;
    const images = trek.gallery?.length ? trek.gallery : [trek.image || '/images/trek.png'];
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [trek]);

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trek not found</h2>
          <Link to="/treks" className="text-[#e53a24] hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Treks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <SEO 
        title={`${trek.title} | Zenex Rental`}
        description={trek.description}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-gray-900">
        {(() => {
          const images = trek.gallery?.length ? trek.gallery : [trek.image || '/images/trek.png'];
          return images.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url("${img}")` }}
            />
          ));
        })()}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-fade-scale">
            <Link to="/treks" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors uppercase tracking-widest text-sm font-semibold">
              <ArrowLeft size={18} /> Back to Treks
            </Link>
            
            <div className="flex flex-col gap-4">
              <h1 
                className="text-4xl md:text-6xl font-bold leading-tight text-white mb-4 drop-shadow-lg max-w-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {trek.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                {trek.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-bold">
                      {trek.rating} <span className="text-sm font-normal text-white/80">({trek.reviewsCount || 0} reviews)</span>
                    </span>
                  </div>
                )}
                {trek.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white/80" />
                    <span className="text-lg font-medium">{trek.duration}</span>
                  </div>
                )}
                {trek.difficulty && (
                  <div className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-white/80" />
                    <span className="text-lg font-medium">{trek.difficulty}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[#00a2d3] shadow-md border-b border-blue-600 w-full transition-all">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              { id: 'itinerary', label: 'Itinerary', icon: Map },
              { id: 'cost', label: 'Cost Details', icon: DollarSign },
              { id: 'info', label: 'Essential Info', icon: Info },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 text-sm font-bold tracking-wide whitespace-nowrap transition-colors border-b-4 ${
                    activeTab === tab.id
                      ? 'bg-[#008fba] text-white border-green-500'
                      : 'text-white/90 hover:bg-[#0096c4] hover:text-white border-transparent'
                  }`}
                >
                  <Icon size={18} /> {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Main Content */}
            <div id="trek-details-content" className="lg:col-span-2 space-y-10">
              
              {/* Quick Facts Grid (Redesigned) */}
              <div id="overview" className="bg-[#eff6f1] rounded-2xl p-6 md:p-8 border border-green-100 shadow-sm scroll-mt-40">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Trip Facts</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {trek.facts ? (
                  Object.entries(trek.facts).map(([key, value], idx) => {
                    const icons = {
                      "Country": MapPin,
                      "Duration": Calendar,
                      "Trip Grade": Mountain,
                      "Max. Altitude": Mountain,
                      "Starts": Map,
                      "Ends": CheckCircle2,
                      "Activities": Users,
                      "Accomodation": Bed,
                      "Meals": Utensils,
                      "Best Time": Sun
                    };
                    const IconComponent = icons[key] || CheckCircle2;
                    return (
                      <div key={idx} className="flex gap-3">
                        <IconComponent className="w-6 h-6 text-gray-500 shrink-0" />
                        <div>
                          <p className="text-[11px] text-gray-500 uppercase font-semibold">{key}</p>
                          <p className="text-sm font-bold text-gray-900">{value}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex gap-3">
                      <MapPin className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Country</p><p className="text-sm font-bold text-gray-900">Nepal</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Calendar className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Duration</p><p className="text-sm font-bold text-gray-900">{trek.duration}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Mountain className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Trip Grade</p><p className="text-sm font-bold text-gray-900">{trek.difficulty}</p></div>
                    </div>
                    {trek.quickFacts?.maxAltitude && (
                      <div className="flex gap-3">
                        <Mountain className="w-6 h-6 text-gray-500 shrink-0" />
                        <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Max. Altitude</p><p className="text-sm font-bold text-gray-900">{trek.quickFacts.maxAltitude}</p></div>
                      </div>
                    )}
                    {trek.quickFacts?.region && (
                      <div className="flex gap-3">
                        <Map className="w-6 h-6 text-gray-500 shrink-0" />
                        <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Starts</p><p className="text-sm font-bold text-gray-900">Kathmandu</p></div>
                      </div>
                    )}
                    {trek.quickFacts?.region && (
                      <div className="flex gap-3">
                        <CheckCircle2 className="w-6 h-6 text-gray-500 shrink-0" />
                        <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Ends</p><p className="text-sm font-bold text-gray-900">Kathmandu</p></div>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Users className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Activities</p><p className="text-sm font-bold text-gray-900">{trek.activity || 'Trekking'}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Bed className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Accommodation</p><p className="text-sm font-bold text-gray-900 line-clamp-1">{trek.quickFacts?.accommodation || 'Hotel / Lodges'}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Utensils className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Meals</p><p className="text-sm font-bold text-gray-900 line-clamp-1">{trek.quickFacts?.meals || 'Breakfast, Lunch & Dinner'}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Sun className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Best Time</p><p className="text-sm font-bold text-gray-900 line-clamp-1">{trek.quickFacts?.bestSeason || 'Spring & Autumn'}</p></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Highlights */}
            {trek.highlights && trek.highlights.length > 0 && (
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Highlights of {trek.title}</h2>
                <ul className="space-y-4">
                  {trek.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <CheckCircle2 className="w-6 h-6 text-green-500" strokeWidth={2} />
                      </div>
                      <span className="text-gray-700 leading-relaxed text-[15px]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Overview text */}
            <div className="pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Explore {trek.title}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                {trek.description}
              </p>
            </div>

            {/* Gallery Section */}
            {trek.gallery && trek.gallery.length > 0 && (
              <div id="gallery" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Trip Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {trek.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                      <img 
                        src={img} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Route Map Section */}
            {trek.routeMap && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Route Map</h2>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                  <img 
                    src={trek.routeMap} 
                    alt={`${trek.title} Route Map`} 
                    className="w-full h-auto object-contain" 
                  />
                </div>
              </div>
            )}

            {/* Detailed Itinerary */}
            {trek.itinerary && trek.itinerary.length > 0 && (
              <div id="itinerary" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {trek.itinerary.map((day, index) => {
                    const colors = [
                      "bg-blue-50 border-blue-100 text-blue-600 dot-bg-blue-400",
                      "bg-green-50 border-green-100 text-green-600 dot-bg-green-400",
                      "bg-orange-50 border-orange-100 text-orange-600 dot-bg-orange-400",
                      "bg-purple-50 border-purple-100 text-purple-600 dot-bg-purple-400",
                      "bg-rose-50 border-rose-100 text-rose-600 dot-bg-rose-400",
                      "bg-teal-50 border-teal-100 text-teal-600 dot-bg-teal-400"
                    ];
                    const currentColors = colors[index % colors.length];
                    const circleClass = currentColors.split(' ').slice(0, 3).join(' ');
                    const dotClass = currentColors.split(' ')[3].replace('dot-', '');

                    return (
                    <div key={day.day} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-sm shrink-0 ${circleClass}`}>
                          D {day.day}
                        </div>
                        <div className="w-px h-full bg-gray-200 my-2 group-last:hidden"></div>
                      </div>
                      <div className="pb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{day.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">{day.details}</p>
                        {day.highlights && (
                          <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                              <Star className="text-yellow-500 w-4 h-4 fill-current" />
                              Day Highlights
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                              {Object.entries(day.highlights).map(([k, v]) => (
                                <div key={k} className="flex items-start gap-2 text-sm text-gray-700">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dotClass}`}></div>
                                  <span className="font-semibold text-gray-800">{k}:</span> {v}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            )}

            {/* Includes / Excludes */}
            {(trek.costIncludes || trek.costExcludes) && (
              <div id="cost" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Cost Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {trek.costIncludes && (
                    <div className="bg-green-50 p-6 rounded-2xl">
                      <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                        <Check className="text-green-600" /> What's Included
                      </h4>
                      <ul className="space-y-3">
                        {trek.costIncludes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {trek.costExcludes && (
                    <div className="bg-red-50 p-6 rounded-2xl">
                      <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                        <X className="text-red-600" /> What's Excluded
                      </h4>
                      <ul className="space-y-3">
                        {trek.costExcludes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Essential Info (Rich Design) */}
            {(trek.additionalInfo || trek.difficultyInfo || trek.altitudeSickness || trek.equipmentList || trek.equipment || trek.flightInfo || trek.extendedInfo || trek.luklaFlightInfo) && (
              <div id="info" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Essential Info</h2>
                
                {/* Lukla Flight Info */}
                {trek.luklaFlightInfo && (
                  <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-sky-900 mb-4 flex items-center gap-2">
                      <Info className="text-sky-600" size={24} /> 
                      Lukla Flight Information
                    </h3>
                    <div className="space-y-4">
                      {trek.luklaFlightInfo.map((info, idx) => (
                        <div key={idx} className="bg-white/60 rounded-xl p-4 border border-sky-50">
                          <h4 className="font-bold text-sky-800 mb-1">{info.season}</h4>
                          <p className="text-sky-900/80 text-sm leading-relaxed">{info.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trek Difficulty */}
                {trek.difficultyInfo && (
                  <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                      <Mountain className="text-orange-600" size={24} /> 
                      Difficulty Level
                    </h3>
                    <p className="text-orange-900/80 leading-relaxed text-[15px]">
                      {trek.difficultyInfo}
                    </p>
                  </div>
                )}

                {/* Flight Info */}
                {trek.flightInfo && (
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <PlaneTakeoff className="text-indigo-600" size={24} /> 
                      {trek.flightInfo.title}
                    </h3>
                    <div className="space-y-4">
                      {trek.flightInfo.routes.map((route, idx) => (
                        <div key={idx} className="bg-white/60 rounded-xl p-4 border border-indigo-50">
                          <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-indigo-500" />
                            {route.name}
                          </h4>
                          <p className="text-indigo-900/80 text-sm leading-relaxed pl-6">
                            {route.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Altitude Sickness */}
                {trek.altitudeSickness && (
                  <div className="bg-red-50/70 border border-red-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="text-red-600" size={24} /> 
                      Altitude Sickness & Remedies
                    </h3>
                    <p className="text-red-900/80 leading-relaxed text-[15px] mb-4">
                      {trek.altitudeSickness.description}
                    </p>
                    <div className="space-y-2">
                      {trek.altitudeSickness.prevention.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={18} className="text-red-500 shrink-0 mt-0.5" />
                          <span className="text-red-900/80 text-[15px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment List */}
                {(trek.equipmentList || trek.equipment) && (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Backpack className="text-blue-600" size={24} /> 
                      Equipment List
                    </h3>
                    {trek.equipment && trek.equipment.description && (
                      <p className="text-blue-900/80 leading-relaxed text-[15px] mb-6">
                        {trek.equipment.description}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(trek.equipmentList || trek.equipment?.categories || []).map((category, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-blue-800 mb-2">{category.category || category.name}</h4>
                          <ul className="space-y-1">
                            {category.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-blue-900/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fallback for simple additional Info */}
                {trek.additionalInfo && !trek.difficultyInfo && !trek.altitudeSickness && !trek.equipmentList && (
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <p className="text-blue-900 leading-relaxed text-[15px]">
                      {trek.additionalInfo}
                    </p>
                  </div>
                )}

                {/* Extended Info Array */}
                {trek.extendedInfo && trek.extendedInfo.map((section, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    
                    {section.description && (
                      <p className="text-gray-700 leading-relaxed text-[15px] mb-4">{section.description}</p>
                    )}
                    
                    {section.paragraphs && (
                      <div className="space-y-4 mb-4">
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{p}</p>
                        ))}
                      </div>
                    )}
                    
                    {section.items && (
                      <ul className="space-y-3 mb-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                            <div className="mt-1.5"><CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={2} /></div>
                            <span className="leading-relaxed">
                              {item.split('**').map((text, index) => 
                                index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{text}</strong> : text
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.subsections && (
                      <div className="space-y-6 mb-4">
                        {section.subsections.map((sub, i) => (
                          <div key={i}>
                            <h4 className="font-bold text-gray-800 mb-3">{sub.subtitle}</h4>
                            {sub.description && (
                              <p className="text-gray-700 leading-relaxed text-[15px] mb-3">{sub.description}</p>
                            )}
                            {sub.items && (
                              <ul className="space-y-2">
                                {sub.items.map((item, j) => (
                                  <li key={j} className="flex items-start gap-2 text-gray-700 text-[15px]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                                    <span className="leading-relaxed">
                                      {item.split('**').map((text, index) => 
                                        index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{text}</strong> : text
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.table && (
                      <div className="overflow-x-auto mb-4 rounded-xl border border-gray-200">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              {section.table.headers.map((th, i) => (
                                <th key={i} className="p-4 font-bold text-gray-800 text-sm">{th}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                                {row.map((cell, j) => (
                                  <td key={j} className="p-4 text-gray-700 text-[15px]">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {section.footer && (
                      <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                          {section.footer.split('**').map((text, index) => 
                            index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{text}</strong> : text
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Dates & Availability */}
            {trek.datesAvailability && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Dates & Availability</h2>
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed text-[15px]">{trek.datesAvailability}</p>
                </div>
              </div>
            )}

            {/* Add-ons & Options */}
            {trek.addOns && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Add-ons & Options</h2>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">{trek.addOns.intro}</p>
                  {trek.addOns.options.map((opt, idx) => (
                    <div key={idx} className="bg-orange-50/50 p-5 rounded-xl border border-orange-100">
                      <p className="text-gray-800 text-[15px]">
                        <span className="font-bold text-orange-800">{opt.title}:</span> {opt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Steps */}
            {trek.bookingSteps && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Booking Process</h2>
                <p className="text-gray-600 mb-6">{trek.bookingSteps.intro}</p>
                <div className="space-y-3">
                  {trek.bookingSteps.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {trek.faqs && trek.faqs.length > 0 && (
              <div id="faqs" className="scroll-mt-40">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {trek.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                      <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-44 space-y-6">
              
              {/* Main Booking Card (Redesigned) */}
              <div className="bg-[#e9f4f7] rounded-[20px] p-6 shadow-sm border border-blue-50 relative">
                
                {/* Price Display */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Price Per Person</p>
                    <div className="flex items-end gap-2">
                      <h3 className="text-3xl font-bold text-gray-900">
                        {perPersonPrice ? `US$${perPersonPrice}` : 'TBA'}
                      </h3>
                      {trek.originalPrice && (
                        <span className="text-lg text-gray-400 line-through mb-1">{trek.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 flex flex-col items-center group">
                    <Heart size={28} className="fill-current group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-medium mt-1 text-gray-600">Favorite</span>
                  </button>
                </div>

                {/* Group Discount Toggle */}
                <div 
                  onClick={() => setIsDiscountOpen(!isDiscountOpen)}
                  className="bg-white rounded-xl p-4 flex justify-between items-center mb-6 cursor-pointer border border-gray-100 hover:border-gray-200 transition-colors shadow-sm select-none"
                >
                  <span className="font-bold text-gray-800 text-sm">Group Discount Price</span>
                  <div className="text-gray-600 transition-transform duration-300">
                    {isDiscountOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {/* Discount Table */}
                {isDiscountOpen && (
                  <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 shadow-sm text-sm animate-fade-in-up">
                    <div className="flex justify-between text-gray-800 font-bold border-b border-gray-100 pb-2 mb-2">
                      <span>No. of traveler</span>
                      <span>Price per person</span>
                    </div>
                    <div className="space-y-3 pt-1 text-gray-600 font-medium">
                      <div className="flex justify-between">
                        <span>2 - 3 pax</span>
                        <span>US${getDiscountedPerPersonPrice(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>4 - 7 pax</span>
                        <span>US${getDiscountedPerPersonPrice(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>8 - 11 pax</span>
                        <span>US${getDiscountedPerPersonPrice(8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 - 15 pax</span>
                        <span>US${getDiscountedPerPersonPrice(12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>16 - 20 pax</span>
                        <span>US${getDiscountedPerPersonPrice(16)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {/* Date & Travelers Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Date</p>
                      <input 
                        type="date" 
                        className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none cursor-pointer" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-3 relative cursor-pointer">
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Travelers</p>
                      <select 
                        className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none cursor-pointer appearance-none"
                        value={persons}
                        onChange={(e) => setPersons(Number(e.target.value))}
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 Persons</option>
                        <option value={3}>3 Persons</option>
                        <option value={4}>4 Persons</option>
                        <option value={5}>5+ Persons</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <button onClick={handleBookPackage} className="w-full bg-[#00a2d3] hover:bg-[#0096c4] text-white py-3.5 px-4 font-bold text-[15px] rounded-xl transition-all shadow-md">
                      BOOK THIS TRIP
                    </button>
                    <button onClick={handleQuickInquiry} className="w-full bg-[#0ba14b] hover:bg-[#098b41] text-white py-3.5 px-4 font-bold text-[15px] rounded-xl transition-all shadow-md">
                      MAKE AN INQUIRY
                    </button>
                    <button onClick={handleDownloadPDF} className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 font-bold text-[15px] rounded-xl transition-all shadow-sm flex justify-center items-center gap-2">
                      <FileText size={18} className="text-gray-600" />
                      DOWNLOAD AS PDF
                    </button>
                  </div>
                  
                  {/* Extension Note */}
                  <p className="text-xs text-center text-gray-500 mt-4 italic">
                    It is possible to extend this trek with Everest Base Camp or Everest Gokyo Ri Trekking
                  </p>
                </div>
              </div>
              

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TrekDetail;
