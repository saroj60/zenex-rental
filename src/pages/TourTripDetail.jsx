import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { packageExtraData } from './PackageDetail';
import { Map as MapIcon, Clock, MapPin, Compass, Coffee, Check, Play, ImageIcon, Calendar, List, DollarSign, ChevronDown, ChevronUp, CheckCircle2, XCircle, BookOpen, Puzzle, Briefcase, HelpCircle, ChevronRight, Globe, CalendarDays, Activity, Mountain, Bed, Utensils, CloudSun, Car, Heart, FileText, Info } from 'lucide-react';
import { generatePackagePDF } from '../utils/pdfGenerator';
import TrustReviewBadges from '../components/TrustReviewBadges';
import { formatDuration } from '../utils/duration';

const TourTripDetail = () => {
  const { slug, id } = useParams();
  const tripIdOrSlug = slug || id;
  const { tourTrips, packages } = useAppData();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [expandedDay, setExpandedDay] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(true);
  const [travelers, setTravelers] = useState("2");
  const [date, setDate] = useState("");
  const formatAltitude = (alt, unit) => {
    if (!alt) return '-';
    const num = parseInt(String(alt).replace(/[^0-9]/g, ''));
    if (isNaN(num)) return alt;
    const unitStr = unit || (String(alt).includes('ft') ? 'ft' : 'm');
    if (unitStr.toLowerCase() === 'm' || unitStr.toLowerCase() === 'meters') {
      return `${num.toLocaleString()}m / ${Math.round(num * 3.28084).toLocaleString()}ft`;
    } else {
      return `${Math.round(num / 3.28084).toLocaleString()}m / ${num.toLocaleString()}ft`;
    }
  };

  const getWalkingOrHiking = (day) => {
    if (day.modeOfTravel) return day.modeOfTravel;
    if (day.dayNumber === 1 || day.title.toLowerCase().includes('arrival')) return '-';
    return 'Walking';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveTab(sectionId);
    }
  };

  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }

      const sections = ['overview', 'gallery', 'outline-itinerary', 'itinerary', 'route-map', 'cost', 'info', 'equipment'];
      const scrollPosition = currentY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + currentY;
          if (scrollPosition >= elementTop) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide subnav scrollable container to keep active tab centered as user scrolls
  useEffect(() => {
    if (!activeTab) return;
    const activeBtn = document.getElementById(`subnav-btn-${activeTab}`);
    const navContainer = document.getElementById('subnav-scroll-container');
    if (activeBtn && navContainer) {
      const containerWidth = navContainer.clientWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
      navContainer.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (tourTrips && tourTrips.length > 0) {
      const foundTrip = tourTrips.find(t => t.slug === tripIdOrSlug || t.id === tripIdOrSlug);
      if (foundTrip && foundTrip.status === 'Published') {
        setTrip(foundTrip);
        return;
      }
    }
    if (packages && packages.length > 0) {
      const foundPkg = packages.find(p => p.id === tripIdOrSlug);
      if (foundPkg) {
        const extra = packageExtraData[foundPkg.id] || {};
        const mappedTrip = {
          id: foundPkg.id,
          title: foundPkg.title,
          image: foundPkg.img,
          category: foundPkg.category,
          destination: foundPkg.location,
          price: foundPkg.price ? foundPkg.price.replace('US$', '') : '',
          shortDescription: extra.overview 
            ? (extra.overview.replace(/<[^>]*>/g, '').split(/[.!?]/)[0] + '.') 
            : foundPkg.title,
          description: extra.overview || foundPkg.title,
          status: 'Published',
          featured: false,
          quickFacts: {
            duration: extra.quickInfo?.find(q => q.label === 'Duration')?.value || foundPkg.duration || '',
            difficulty: extra.quickInfo?.find(q => q.label === 'Grade')?.value || 'Easy',
            maxAltitude: extra.quickInfo?.find(q => q.label === 'Max. Altitude')?.value || '',
            bestTime: extra.quickInfo?.find(q => q.label === 'Best Season')?.value || '',
            minTravelers: 2,
            maxTravelers: 12
          },
          itinerary: extra.itinerary?.map((it, idx) => ({
            dayNumber: idx + 1,
            title: it.title || `Day ${idx + 1}`,
            description: it.desc || ''
          })) || [],
          inclusions: extra.inclusions?.map(inc => ({ title: inc })) || [],
          exclusions: extra.exclusions?.map(exc => ({ title: exc })) || [],
          equipment: [],
          faqs: []
        };
        setTrip(mappedTrip);
      }
    }
  }, [tripIdOrSlug, tourTrips, packages]);

  if (!trip) {
    return (
      <div className="py-24 text-center">
        <MapIcon size={64} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Trip Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">We couldn't find the trip you're looking for. It may have been removed or is currently unavailable.</p>
        <button onClick={() => navigate(-1)} className="bg-[#e53a24] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d04b08] transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (!trip || isGeneratingPDF) return;
    try {
      setIsGeneratingPDF(true);
      await generatePackagePDF(trip);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const toggleDay = (idx) => setExpandedDay(expandedDay === idx ? -1 : idx);
  const toggleFaq = (idx) => setExpandedFaq(expandedFaq === idx ? null : idx);

  return (
    <div className="bg-gray-50 font-sans pb-20">
      
      {/* Hero Section (Clean Image Banner / Flex Grid Gallery) */}
      <div className="relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-gray-900 p-2 md:p-3">
        {(() => {
          const images = [];
          if (trip.image) images.push(trip.image);
          if (trip.gallery && trip.gallery.length > 0) {
            trip.gallery.forEach(img => {
              const url = typeof img === 'object' ? (img.url || img.src) : img;
              if (url && !images.includes(url)) images.push(url);
            });
          }
          const displayImages = images.length > 0 ? images : ['/images/trek.png'];

          if (displayImages.length === 1) {
            return (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-85"
                style={{ backgroundImage: `url("${displayImages[0]}")` }}
              />
            );
          }

          if (displayImages.length === 2) {
            return (
              <div className="flex h-full w-full gap-2 md:gap-3 relative z-0">
                {displayImages.slice(0, 2).map((img, idx) => (
                  <div 
                    key={idx}
                    className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-1 hover:flex-[1.2] group"
                  >
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                      style={{ backgroundImage: `url("${img}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div className="flex h-full w-full gap-2 md:gap-3 relative z-0">
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[2] hover:flex-[2.5] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[1] hover:flex-[1.4] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[1] || displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[1] hover:flex-[1.4] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[2] || displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Trip Header details below Hero */}
      <div className="bg-white border-b border-gray-150 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="bg-[#e53a24] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{trip.category}</span>
            {trip.featured && <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Featured</span>}
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-slate-200"><MapPin size={14}/> {trip.destination}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1 leading-tight tracking-tight">{trip.title}</h1>
          <TrustReviewBadges title={trip.title} />
          {trip.shortDescription && (
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-4xl font-medium">{trip.shortDescription}</p>
          )}
        </div>
      </div>

      {/* Navigation Tabs (Sticky) */}
      <div className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky ${isScrolledDown ? 'top-0' : 'top-[56px] md:top-[68px]'} z-40 shadow-sm w-full transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-2 md:px-8">
          <div id="subnav-scroll-container" className="flex items-center gap-1 md:gap-2 overflow-x-auto whitespace-nowrap scroll-smooth touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              { id: 'outline-itinerary', label: 'Outline Itinerary', icon: List },
              { id: 'itinerary', label: 'Itinerary', icon: MapIcon },
              ...(trip.routeMap ? [{ id: 'route-map', label: 'Route Map', icon: Globe }] : []),
              ...((trip.inclusions?.length > 0 || trip.exclusions?.length > 0) ? [{ id: 'cost', label: 'Cost Details', icon: DollarSign }] : []),
              { id: 'info', label: 'Essential Info', icon: Info },
              { id: 'equipment', label: 'Equipment', icon: Briefcase }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`subnav-btn-${tab.id}`}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex items-center gap-1.5 py-3 md:py-3.5 px-3.5 md:px-4 font-bold text-xs uppercase tracking-wider border-b-2 md:border-b-4 transition-all duration-200 shrink-0 select-none cursor-pointer rounded-t-lg ${
                    activeTab === tab.id
                      ? 'border-[#e53a24] text-[#e53a24] bg-red-50/50 scale-[1.02]'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={14} className="shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10 md:space-y-12">
            
            {/* Overview Section */}
            <section id="overview" className="space-y-8 md:space-y-12 scroll-mt-28">
              
              {/* TRIP FACTS GRID */}
              <div className="bg-[#eef5ef] p-4 sm:p-6 md:p-8 rounded-2xl border border-emerald-100/50 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Trip Facts</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
                  {trip.country && (
                    <div className="flex items-center gap-3">
                      <Globe className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Country</p><p className="text-sm font-bold text-gray-800">{trip.country}</p></div>
                    </div>
                  )}
                  {trip.duration && (
                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Duration</p><p className="text-sm font-bold text-gray-800">{formatDuration(trip.duration, trip.durationUnit)}</p></div>
                    </div>
                  )}
                  {trip.grade && (
                    <div className="flex items-center gap-3">
                      <Activity className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Trip Grade</p><p className="text-sm font-bold text-gray-800">{trip.grade}</p></div>
                    </div>
                  )}
                  {trip.maxAltitude && (
                    <div className="flex items-center gap-3">
                      <Mountain className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Max. Altitude</p><p className="text-sm font-bold text-gray-800">{trip.maxAltitude} {trip.altitudeUnit}</p></div>
                    </div>
                  )}
                  {trip.startLocation && (
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Starts</p><p className="text-sm font-bold text-gray-800">{trip.startLocation}</p></div>
                    </div>
                  )}
                  {trip.endLocation && (
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Ends</p><p className="text-sm font-bold text-gray-800">{trip.endLocation}</p></div>
                    </div>
                  )}
                  {trip.activities && (
                    <div className="flex items-center gap-3">
                      <Compass className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Activities</p><p className="text-sm font-bold text-gray-800">{Array.isArray(trip.activities) ? trip.activities.join(' / ') : trip.activities}</p></div>
                    </div>
                  )}
                  {trip.accommodation && (
                    <div className="flex items-center gap-3">
                      <Bed className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Accommodation</p><p className="text-sm font-bold text-gray-800">{trip.accommodation}</p></div>
                    </div>
                  )}
                  {trip.meals && (
                    <div className="flex items-center gap-3">
                      <Utensils className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Meals</p><p className="text-sm font-bold text-gray-800">{Array.isArray(trip.meals) ? trip.meals.join(', ') : trip.meals}</p></div>
                    </div>
                  )}
                  {trip.bestTime && (
                    <div className="flex items-center gap-3">
                      <CloudSun className="text-gray-600" size={24} strokeWidth={1.5} />
                      <div><p className="text-xs text-gray-500 font-medium leading-tight">Best Time</p><p className="text-sm font-bold text-gray-800">{trip.bestTime}</p></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Overview */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                <div 
                  className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: trip.description }}
                />
              </div>

              {/* Highlights */}
              {trip.highlights && trip.highlights.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Compass className="text-[#e53a24]"/> Trip Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.highlights.map((hlt, i) => {
                      const title = typeof hlt === 'object' ? hlt.title : hlt;
                      const description = typeof hlt === 'object' ? hlt.description : null;
                      return (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group">
                          <div className="bg-white text-green-500 rounded-full p-2 shadow-sm group-hover:text-[#e53a24]"><Check size={20} /></div>
                          <div>
                            <h4 className="font-bold text-gray-900">{title}</h4>
                            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Inclusions & Exclusions removed from overview and placed in standalone Cost section below */}
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 scroll-mt-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"><ImageIcon className="text-[#e53a24]" size={32} /> Photo Gallery</h2>
              {trip.gallery && trip.gallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {trip.gallery.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-sm group relative aspect-square bg-gray-100 cursor-pointer">
                      {img.url && <img src={img.url} alt={img.alt || 'Gallery image'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 italic">No gallery images available.</p>}
            </section>

            {/* Outline Itinerary Section */}
            <section id="outline-itinerary" className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><List className="text-[#10b981]" size={28} /> Outline Itinerary</h2>
              <div className="overflow-hidden rounded-2xl border border-blue-100">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#5cc0e6] text-white font-bold">
                      <th className="px-6 py-4">Itinerary</th>
                      <th className="px-6 py-4">Max Altitude</th>
                      <th className="px-6 py-4">Walking/Hiking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                    {trip.itinerary && trip.itinerary.length > 0 ? (
                      trip.itinerary.map((day, idx) => {
                        const dayNum = String(day.dayNumber || idx + 1).padStart(2, '0');
                        const isEven = idx % 2 === 1;
                        return (
                          <tr key={idx} className={isEven ? 'bg-[#eef8fc]' : 'bg-white'}>
                            <td className="px-6 py-4 font-medium text-gray-900">DAY {dayNum}: {day.title}</td>
                            <td className="px-6 py-4 text-gray-600">{formatAltitude(day.maxAltitude, day.altitudeUnit)}</td>
                            <td className="px-6 py-4 text-gray-600">{getWalkingOrHiking(day)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500 italic">Itinerary outline not available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Itinerary Section */}
            <section id="itinerary" className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 scroll-mt-24">
              <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><List className="text-[#10b981]" size={28} /> Day-by-Day Itinerary</h2>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{trip.itinerary?.length || 0} Days</span>
              </div>
              
              {trip.itinerary && trip.itinerary.length > 0 ? (
                <div className="space-y-2">
                  {trip.itinerary.map((day, idx) => {
                    const dayNum = String(day.dayNumber || idx + 1).padStart(2, '0');
                    return (
                      <div key={idx} className="relative pl-10 pb-8 last:pb-0">
                        {/* Timeline Line */}
                        {idx < trip.itinerary.length - 1 && (
                          <div className="absolute left-[15px] top-6 bottom-0 w-[2px] bg-green-500"></div>
                        )}
                        
                        {/* Timeline Badge */}
                        <div className="absolute left-0 top-0 flex items-center gap-2 bg-[#10b981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                          DAY {dayNum}
                        </div>
                        
                        {/* Day Content */}
                        <div className="pt-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 mt-1">{day.title}</h3>
                          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-4 font-normal text-base">{day.details || day.description}</div>
                          
                          {day.image && (
                            <img src={day.image} alt={day.title} className="w-full max-w-xl h-48 md:h-64 object-cover rounded-xl mb-4 shadow-sm" />
                          )}

                          {day.note && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-xl max-w-xl">
                              <p className="text-yellow-800 text-sm"><strong className="font-bold">Note:</strong> {day.note}</p>
                            </div>
                          )}

                          {/* Day Facts */}
                          {(day.maxAltitude || day.distance || day.walkingDuration || day.accommodation || day.modeOfTravel) && (
                            <div className="mt-4 pt-4 border-t border-gray-100 max-w-2xl">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Day Highlights</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                                {day.maxAltitude && (
                                  <div className="flex items-center gap-2">
                                    <Mountain size={16} className="text-gray-400 shrink-0" />
                                    <span>Max Altitude: {day.maxAltitude} {day.altitudeUnit || 'm'}</span>
                                  </div>
                                )}
                                {day.distance && (
                                  <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400 shrink-0" />
                                    <span>Distance: {day.distance} {day.distanceUnit || 'km'}</span>
                                  </div>
                                )}
                                {day.walkingDuration && (
                                  <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400 shrink-0" />
                                    <span>Duration: {day.walkingDuration}</span>
                                  </div>
                                )}
                                {day.accommodation && (
                                  <div className="flex items-center gap-2">
                                    <Bed size={16} className="text-gray-400 shrink-0" />
                                    <span>Accommodation: {day.accommodation}</span>
                                  </div>
                                )}
                                {day.modeOfTravel && (
                                  <div className="flex items-center gap-2">
                                    <Car size={16} className="text-gray-400 shrink-0" />
                                    <span>Mode of Travel: {day.modeOfTravel}</span>
                                  </div>
                                )}
                              </div>
                              {day.meals && (
                                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                                  <Coffee size={14} className="text-orange-400" />
                                  <span>Meals: {Array.isArray(day.meals) ? day.meals.join(', ') : day.meals}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : <p className="text-gray-500 italic">Itinerary not available.</p>}
            </section>

            {/* Route Map Section */}
            {trip.routeMap && (
              <section id="route-map" className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><MapIcon className="text-green-600" size={28} /> Route Map</h2>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 p-2">
                  <img src={trip.routeMap} alt={`${trip.title} Route Map`} className="w-full h-auto object-contain rounded-xl max-h-[600px] mx-auto" />
                </div>
              </section>
            )}

            {/* Cost Details Section */}
            {(trip.inclusions?.length > 0 || trip.exclusions?.length > 0) && (
              <section id="cost" className="space-y-6 md:space-y-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6 uppercase tracking-tight">Cost Details (Inclusions & Exclusions)</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* INCLUDES */}
                  {trip.inclusions && trip.inclusions.length > 0 && (
                    <div className="bg-[#eefbf4] border border-green-100 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wider">INCLUDES</h3>
                      <ul className="space-y-4">
                        {trip.inclusions.map((inc, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                            <div className="text-gray-700 text-sm leading-relaxed">
                              <span className="font-bold text-gray-900">{inc.title}</span>
                              {inc.description && <span className="text-gray-500 font-normal block mt-0.5">{inc.description}</span>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* EXCLUDES */}
                  {trip.exclusions && trip.exclusions.length > 0 && (
                    <div className="bg-[#f0f9ff] border border-blue-100 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wider">EXCLUDES</h3>
                      <ul className="space-y-4">
                        {trip.exclusions.map((exc, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <XCircle size={20} className="text-sky-400 shrink-0 mt-0.5" />
                            <div className="text-gray-700 text-sm leading-relaxed">
                              <span className="font-bold text-gray-900">{exc.title}</span>
                              {exc.description && <span className="text-gray-500 font-normal block mt-0.5">{exc.description}</span>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Essential Info & FAQs Section */}
            <section id="info" className="space-y-12 scroll-mt-24">
              {/* Essential Info */}
              {trip.essentialInfo && trip.essentialInfo.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"><BookOpen className="text-orange-500" size={32}/> Essential Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {trip.essentialInfo.map((info, idx) => (
                      <div key={idx} className="bg-orange-50/30 p-6 rounded-2xl border border-orange-100">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{info.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {trip.faqs && trip.faqs.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"><HelpCircle className="text-purple-600" size={32}/> Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {trip.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50 hover:text-purple-700 transition-colors" onClick={() => toggleFaq(idx)}>
                          <h4 className="font-bold text-lg">{faq.question}</h4>
                          {expandedFaq === idx ? <ChevronDown size={24} className="text-purple-500 shrink-0"/> : <ChevronRight size={24} className="text-gray-400 shrink-0"/>}
                        </div>
                        {expandedFaq === idx && (
                          <div className="p-6 bg-white border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Equipment Section */}
            <section id="equipment" className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 scroll-mt-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"><Briefcase className="text-indigo-600" size={32}/> Packing & Equipment List</h2>
              {trip.equipment && trip.equipment.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {trip.equipment.map((cat, catIdx) => (
                    <div key={catIdx} className="bg-indigo-50/30 rounded-2xl border border-indigo-100 overflow-hidden">
                      <div className="bg-indigo-100/50 p-4 border-b border-indigo-100">
                        <h4 className="font-bold text-indigo-900 text-lg">{cat.category}</h4>
                      </div>
                      <ul className="p-4 space-y-3">
                        {cat.items?.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-3">
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.required ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                              {item.required ? <Check size={12}/> : <span className="text-[10px] font-bold">OPT</span>}
                            </div>
                            <div>
                              <p className={`font-bold ${item.required ? 'text-gray-900' : 'text-gray-600'}`}>
                                {item.name} {item.quantity > 1 && <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full ml-1">x{item.quantity}</span>}
                              </p>
                              {item.description && <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 italic">No equipment list provided for this trip.</p>}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Quick Info & Book Box */}
            {(() => {
              const currencySign = trip.pricingInfo?.currency === 'USD' ? 'US$' : (trip.pricingInfo?.currency || 'US$');
              const validGroupPricing = (trip.groupPricing || []).filter(tier => tier.pricePerPerson && (tier.minTravelers || tier.maxTravelers));
              return (
                <div className="bg-white border border-gray-100 p-7 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                  {/* Header Area */}
                  <div className="flex justify-between items-start border-b border-gray-100 pb-5">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest mb-1 block">Price Per Person</span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl font-black text-[#1e3a8a] tracking-tight">
                          {currencySign}{trip.pricingInfo?.sellingPrice || trip.price}
                        </span>
                        {trip.pricingInfo?.originalPrice && (
                          <span className="text-sm text-gray-400 line-through font-semibold">
                            {currencySign}{trip.pricingInfo.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Favorite Icon */}
                    <button 
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-all duration-300 ${
                        isFavorite 
                          ? 'bg-[#E59A2F] border-[#E59A2F] text-white' 
                          : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:text-[#E59A2F] group-hover:border-[#E59A2F]'
                      }`}>
                        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
                      </div>
                      <span className="text-[9px] text-gray-500 font-bold mt-1.5 uppercase tracking-wider">Save</span>
                    </button>
                  </div>

                  {/* Group Discount Price Card */}
                  {validGroupPricing.length > 0 && (
                    <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
                      <div 
                        onClick={() => setIsDiscountOpen(!isDiscountOpen)}
                        className="flex justify-between items-center cursor-pointer select-none group"
                      >
                        <span className="font-bold text-[#1e3a8a] text-sm flex items-center gap-2">
                          <Activity size={16} className="text-[#0F766E]" />
                          Group Discounts
                        </span>
                        <ChevronDown size={18} className={`text-gray-400 group-hover:text-[#1e3a8a] transition-transform duration-300 ${isDiscountOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isDiscountOpen && (
                        <div className="mt-4 pt-4 border-t border-gray-200/60 overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="text-[#64748B] font-medium border-b border-gray-200 pb-2">
                                <th className="pb-2 font-semibold text-xs uppercase tracking-wider">Group Size</th>
                                <th className="pb-2 text-right font-semibold text-xs uppercase tracking-wider">Price / Pax</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {validGroupPricing.map((tier, idx) => {
                                const travelers = tier.maxTravelers 
                                  ? `${tier.minTravelers} - ${tier.maxTravelers} pax`
                                  : `${tier.minTravelers}+ pax`;
                                const tierCurrency = tier.currency === 'USD' ? 'US$' : (tier.currency || 'US$');
                                return (
                                  <tr key={idx} className="hover:bg-white transition-colors">
                                    <td className="py-3 text-[#172033] font-medium text-xs">{travelers}</td>
                                    <td className="py-3 text-right font-bold text-[#1e3a8a]">{tierCurrency}{tier.pricePerPerson}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E] transition-all">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Date</span>
                      <div className="flex items-center justify-between">
                        <input 
                          type="date" 
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full text-sm font-semibold text-[#1e3a8a] bg-transparent outline-none cursor-pointer" 
                        />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E] transition-all">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Travelers</span>
                      <select 
                        value={travelers} 
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full text-sm font-semibold text-[#1e3a8a] bg-transparent outline-none cursor-pointer appearance-none"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5">5+ Persons</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3 pt-2">
                    <Link to={`/checkout?pkg=${trip.id}&travelers=${travelers}&date=${date}`} className="w-full flex justify-center bg-[#1e3a8a] text-white font-bold py-3.5 rounded-xl hover:bg-[#10224b] transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm">
                      BOOK THIS TRIP
                    </Link>
                    <button 
                      onClick={() => {
                        const message = `Hi! I have some questions about the ${trip.title} package. Can you please help me?`;
                        window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full flex justify-center bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] font-bold py-3.5 rounded-xl hover:bg-[#F8FAFC] transition-colors uppercase tracking-wider text-sm"
                    >
                      MAKE AN INQUIRY
                    </button>
                    <button 
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-3.5 rounded-xl font-bold hover:shadow-sm transition-all text-sm uppercase tracking-wider text-center flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      <FileText size={16} className="text-[#e53a24]" /> 
                      {isGeneratingPDF ? 'GENERATING PDF...' : 'DOWNLOAD ITINERARY (PDF)'}
                    </button>
                  </div>
                </div>
              );
            })()}



            {/* Optional Add-Ons */}
            {trip.addOns && trip.addOns.length > 0 && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Puzzle className="text-blue-600"/> Optional Upgrades</h3>
                <div className="space-y-4">
                  {trip.addOns.filter(a => a.active).map((addon, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-900 pr-2">{addon.name}</span>
                        <span className="font-extrabold text-blue-700 whitespace-nowrap">+ {addon.currency} {addon.price}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-2">{addon.pricingType}</span>
                      {addon.description && <p className="text-sm text-gray-600">{addon.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRICING TIERS are now integrated inside the main pricing block above */}

            {/* DEPARTURES */}
            {trip.departures && trip.departures.length > 0 && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Calendar className="text-purple-600"/> Upcoming Departures</h3>
                <div className="space-y-4">
                  {trip.departures.map((dep, idx) => {
                    const isAvailable = dep.status === 'Available' || dep.status === 'Limited Seats';
                    return (
                      <div key={idx} className={`p-4 rounded-xl border ${isAvailable ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200 bg-gray-50 opacity-75'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{new Date(dep.startDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                            <p className="text-sm text-gray-500">to {new Date(dep.endDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</p>
                          </div>
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                            dep.status === 'Available' ? 'bg-green-100 text-green-700' :
                            dep.status === 'Full' ? 'bg-red-100 text-red-700' :
                            dep.status === 'Limited Seats' ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-700'
                          }`}>{dep.status}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 border-dashed">
                          <span className="text-sm font-bold text-gray-700">{dep.maxSeats} Seats left</span>
                          {dep.guaranteed && <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-md uppercase tracking-wider">Guaranteed</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default TourTripDetail;
