import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Compass, ShieldCheck, ArrowRight, Car, Globe, Building2, Users, Languages, Info, Clock, Zap, Phone, ChevronDown } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

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
  return <IconComponent className="text-[#EA580C] mb-3 group-hover:scale-110 transition-transform duration-300" size={28} />;
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

  return (
    <div className="bg-[#F4F6F8] min-h-screen">
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
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-4">Trip Overview</h2>
              <div className="text-gray-600 mb-8 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: dest.extendedOverview || dest.fullDesc || dest.desc }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Calendar className="text-[#EA580C] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Best Time</span>
                  <span className="text-gray-900 font-bold">{dest.bestTime}</span>
                </div>
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Compass className="text-[#EA580C] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Terrain</span>
                  <span className="text-gray-900 font-bold">{dest.terrain}</span>
                </div>
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <ShieldCheck className="text-[#EA580C] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Safety Rating</span>
                  <span className="text-gray-900 font-bold">Excellent</span>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            {dest.countryFacts && dest.countryFacts.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Quick Facts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dest.countryFacts.map((fact, index) => (
                    <div key={index} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                      {getIcon(fact.icon)}
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">{fact.label}</span>
                      <span className="text-gray-900 font-bold text-sm leading-tight">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Essential Links Accordion */}
            {dest.essentialLinks && dest.essentialLinks.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Nepal Information</h2>
                <div className="flex flex-col border-t border-gray-100">
                  {dest.essentialLinks.map((link, index) => {
                    const isActive = activeAccordion === index;
                    return (
                      <div key={index} className="border-b border-gray-100 last:border-0">
                        <button 
                          onClick={() => setActiveAccordion(isActive ? null : index)}
                          className={`w-full flex justify-between items-center py-4 px-2 text-left transition-colors ${isActive ? 'text-[#16a34a] font-bold' : 'text-gray-800 font-semibold hover:text-[#16a34a]'}`}
                        >
                          {typeof link === 'string' ? link : link.title}
                          <ChevronDown className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-[2000px] opacity-100 pb-4 px-2' : 'max-h-0 opacity-0'}`}>
                          {typeof link !== 'string' && link.detailedContent ? (
                            <div className="flex flex-col md:flex-row gap-6 mt-4">
                              {(link.detailedContent.image || (link.detailedContent.images && link.detailedContent.images.length > 0)) && (
                                <div className={`w-full md:w-1/3 flex-shrink-0 grid gap-4 ${link.detailedContent.images && link.detailedContent.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                  {link.detailedContent.images ? (
                                    link.detailedContent.images.map((imgUrl, imgIndex) => (
                                      <img key={imgIndex} src={imgUrl} alt={`${link.title} ${imgIndex + 1}`} className="w-full h-32 md:h-48 object-cover rounded-xl shadow-sm" />
                                    ))
                                  ) : (
                                    <img src={link.detailedContent.image} alt={link.title} className="w-full h-auto object-cover rounded-xl shadow-sm" />
                                  )}
                                </div>
                              )}
                              <div className="flex-1 space-y-4">
                                {link.detailedContent.paragraphs.map((p, i) => (
                                  <p key={i} className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                              {typeof link === 'string' ? 'Details about this topic will be available soon.' : link.content}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommended Vehicles */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Recommended Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dest.vehicles.map((v, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-orange-50 text-[#EA580C] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Car size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{v}</h3>
                    <Link to="/vehicles" className="text-sm font-bold text-blue-600 hover:text-blue-800">
                      View options &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          
          {/* Destination Packages */}
          {sortedPackages.length > 0 && (
            <div id="recommended-packages" className="mt-16 scroll-mt-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a]">Recommended Tours in {dest.name}</h2>
                <Link to="/tours" className="text-sm font-bold text-[#EA580C] hover:text-[#c2410a]">View All Tours</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedPackages.map(pkg => (
                  <Link to={`/packages/${pkg.id}`} key={pkg.id} className="bg-white rounded-2xl border border-gray-100 flex flex-col group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1e3a8a] shadow-sm">
                        {pkg.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#EA580C] transition-colors mb-3 line-clamp-2">
                        {pkg.title}
                      </h3>
                      <div className="border-t border-gray-100 pt-4 flex items-end justify-between mt-auto">
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-1">Starting from</p>
                          <span className="text-[#1e3a8a] font-black text-xl">{pkg.price}</span>
                          <span className="text-gray-500 text-xs ml-1">{pkg.persons}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-[#1e3a8a] to-[#0a2f4c] rounded-3xl p-8 shadow-xl text-center sticky top-24">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-[#EA580C]" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ready for {dest.name}?</h3>
              <p className="text-blue-200 font-medium mb-8">
                Book a premium vehicle tailored for this route. Includes full insurance and 24/7 support.
              </p>
              <Link to="/vehicles" className="block w-full bg-[#EA580C] text-white py-4 rounded-xl font-bold hover:bg-[#d04b08] transition-colors shadow-lg">
                Find Your Vehicle
              </Link>
              <p className="text-blue-300 text-sm mt-4">No hidden fees. Instant confirmation.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
