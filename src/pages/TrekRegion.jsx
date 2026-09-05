import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Calendar, Activity, ArrowLeft, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { regionData } from '../data/regionData';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';
import { formatDuration } from '../utils/duration';

const TrekRegion = () => {
  const { region: regionId = '' } = useParams();
  const { treks, tourTrips, regions, packages } = useAppData();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Find dynamic database region first, fall back to regionData
  const matchedRegion = (regions || []).find(r => r.slug === regionId);
  const fallbackKey = (regionId || '').toLowerCase();
  const fallbackData = regionData[fallbackKey] || 
                       regionData[fallbackKey.replace(/-region.*/, '')] ||
                       regionData[fallbackKey.split('-')[0]] || null;

  const rawTitle = fallbackData?.title || matchedRegion?.name || `${regionId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Region Treks`;
  const cleanTitle = rawTitle.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  
  const fallbackDesc = fallbackData?.description;
  const dbDesc = matchedRegion?.description;
  const rawDesc = (fallbackDesc && fallbackDesc.length >= (dbDesc?.length || 0)) 
    ? fallbackDesc 
    : (dbDesc || `Discover pristine mountain landscapes, authentic Himalayan heritage, and unforgettable trail experiences in the ${cleanTitle}.`);

  const cleanImage = fallbackData?.image || matchedRegion?.image || '/images/everest base.jpg';

  const formattedDescription = rawDesc.includes('<p>') 
    ? rawDesc 
    : rawDesc.split(/\n\s*\n/).map(p => `<p class="mb-4 last:mb-0 leading-relaxed text-slate-700 font-normal">${p.trim()}</p>`).join('');

  const region = {
    id: regionId,
    title: cleanTitle,
    image: cleanImage,
    description: formattedDescription
  };

  const combinedMap = new Map();

  (Array.isArray(treks) ? treks : []).forEach(t => {
    if (!t) return;
    const key = (t.id || t.slug || t.title || '').toLowerCase();
    if (!combinedMap.has(key)) {
      combinedMap.set(key, {
        id: t.id,
        title: t.title,
        image: t.image,
        badge: t.badge || 'Popular Trek',
        price: t.price ? `US$${t.price.toString().replace(/[^0-9]/g, '')}` : '',
        originalPrice: t.originalPrice ? `US$${t.originalPrice.toString().replace(/[^0-9]/g, '')}` : '',
        rating: t.rating || 5,
        reviewsCount: t.reviewsCount || 0,
        difficulty: t.difficulty || t.quickFacts?.difficulty || 'Moderate',
        duration: t.duration || t.quickFacts?.duration || '',
        durationUnit: t.durationUnit || 'Days',
        activity: t.activity || 'Trekking',
        region: t.region || t.quickFacts?.region || '',
        location: t.location || t.destination || '',
        link: `/treks/${t.id}`
      });
    }
  });

  (Array.isArray(tourTrips) ? tourTrips : []).filter(t => t.status === 'Published').forEach(t => {
    if (!t) return;
    const key = (t.id || t.slug || t.title || '').toLowerCase();
    if (!combinedMap.has(key)) {
      const sellP = t.pricingInfo?.sellingPrice || t.price || '';
      const origP = t.pricingInfo?.originalPrice || t.originalPrice || '';
      combinedMap.set(key, {
        id: t.id,
        title: t.title,
        image: t.image,
        badge: t.badge || '',
        price: sellP ? `US$${sellP.toString().replace(/[^0-9]/g, '')}` : '',
        originalPrice: origP ? `US$${origP.toString().replace(/[^0-9]/g, '')}` : '',
        rating: t.rating || 5,
        reviewsCount: t.reviewsCount || 1,
        difficulty: t.grade || 'Moderate',
        duration: t.duration || '',
        durationUnit: t.durationUnit || 'Days',
        activity: t.activities?.join(', ') || 'Tour',
        region: t.region || '',
        location: t.destination || '',
        link: `/tour/${t.slug || t.id}`
      });
    }
  });

  (Array.isArray(packages) ? packages : []).forEach(p => {
    if (!p) return;
    const key = (p.id || p.slug || p.title || '').toLowerCase();
    if (!combinedMap.has(key)) {
      combinedMap.set(key, {
        id: p.id,
        title: p.title,
        image: p.img,
        badge: p.badge || '',
        price: p.price ? `US$${p.price.toString().replace(/[^0-9]/g, '')}` : '',
        originalPrice: p.originalPrice ? `US$${p.originalPrice.toString().replace(/[^0-9]/g, '')}` : '',
        rating: 5,
        reviewsCount: 1,
        difficulty: p.difficulty || 'Moderate',
        duration: p.duration || '',
        durationUnit: 'Days',
        activity: p.category || 'Package',
        region: p.region || p.location || '',
        location: p.location || '',
        link: `/packages/${p.id}`
      });
    }
  });

  const combinedList = Array.from(combinedMap.values());

  const regionAliases = {
    'everest': ['everest', 'ebc', 'khumbu', 'regtrkeve'],
    'everest-base-camp': ['everest', 'ebc', 'khumbu', 'regtrkeve'],
    'annapurna': ['annapurna', 'abc', 'poonhill', 'thorong', 'regtrkann'],
    'langtang': ['langtang', 'helambu', 'tamang', 'ruby', 'regtrklan'],
    'manaslu': ['manaslu', 'tsum', 'regtrkman'],
    'upper-mustang': ['mustang', 'lomanthang', 'regtrkmus'],
    'mustang': ['mustang', 'lomanthang', 'regtrkmus'],
    'kanchenjunga': ['kanchenjunga', 'regtrkkan'],
    'dolpo': ['dolpo', 'dolpa', 'phoksundo', 'regtrkdol'],
    'dhaulagiri': ['dhaulagiri', 'dhampus', 'regtrkdha'],
    'rolwaling': ['rolwaling', 'lapchi', 'regtrkrol'],
    'makalu': ['makalu', 'regtrkmak'],
    'far-western-nepal': ['farwest', 'farwestern', 'khaptad', 'api', 'rara', 'jumla', 'regtrkfws'],
    'far-west': ['farwest', 'farwestern', 'khaptad', 'api', 'rara', 'jumla', 'regtrkfws'],
    'kathmandu-valley': ['kathmandu'],
    'kathmandu-pokhara': ['pokhara'],
    'everest-base-camp-tibet': ['tibet', 'lhasa'],
    'bhutan-trekking': ['bhutan'],
    'ladakh-adventure': ['ladakh']
  };

  // Filter treks for this region
  const filteredTreks = combinedList.filter(trek => {
    const sanitize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    const normRegionId = sanitize(regionId);
    if (!normRegionId) return true;

    const targetKey = (regionId || '').toLowerCase();
    const aliases = (regionAliases[targetKey] || [normRegionId]).map(a => sanitize(a));

    const normReg = sanitize(trek.region);
    const normLoc = sanitize(trek.location);
    const normTitle = sanitize(trek.title);

    if (normReg) {
      return normReg === normRegionId || aliases.some(a => normReg === a || normReg.includes(a));
    }

    return aliases.some(a => normLoc.includes(a) || normTitle.includes(a));
  });

  const totalPages = Math.ceil(filteredTreks.length / itemsPerPage);
  const currentTreks = filteredTreks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [regionId]);

  return (
    <div className="min-h-screen bg-white pb-16 overflow-x-hidden">
      <SEO 
        title={`${region.title} | Zenex Rental`}
        description={`Trekking packages for ${region.title}.`}
      />
      
      {/* Premium Hero Banner Section with Related Image */}
      <div className="relative h-[60vh] min-h-[480px] flex flex-col justify-center overflow-hidden bg-gradient-to-tr from-slate-950 via-[#1e3a8a] to-[#0F766E]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={region.image}
            alt={region.title}
            className="w-full h-full object-cover scale-105 opacity-85 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#1e3a8a]/80 to-orange-700/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-100 h-20 bottom-0 top-auto"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">Himalayan Destination Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight max-w-4xl drop-shadow-lg uppercase">
            {region.title}
          </h1>

          {/* Breadcrumbs inside Hero */}
          <nav className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-wider flex-wrap">
            <Link to="/" className="hover:text-orange-400 text-white transition-colors">Home</Link>
            <span className="text-orange-400">&bull;</span>
            <Link to="/treks" className="hover:text-orange-400 text-white transition-colors">Treks</Link>
            <span className="text-orange-400">&bull;</span>
            <span className="text-orange-400">{region.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-white pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Destination Introduction Box */}
          <div className="mb-12 bg-slate-50/90 rounded-[2rem] p-8 md:p-12 border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold">
                🏔️
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-wide">
                Destination Overview
              </h2>
            </div>
            <div 
              className="text-slate-700 leading-relaxed text-base md:text-lg font-normal"
              dangerouslySetInnerHTML={{ __html: region.description }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Desktop Sidebar with Countries */}
            <div className="w-full lg:w-[280px] shrink-0">
              <div className="bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-200/60 p-6 sticky top-36">
                <h3 className="text-[11px] font-extrabold text-[#64748B] uppercase tracking-[0.15em] mb-4 pl-3">
                  Trekking Countries
                </h3>
                <ul className="flex flex-col gap-2 mb-6">
                  {['Nepal', 'Tibet', 'Bhutan', 'India'].map((c) => (
                    <li key={c}>
                      <Link
                        to={`/country/${c.toLowerCase()}`}
                        className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-bold rounded-xl transition-all duration-300 text-slate-700 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-slate-100 hover:border-orange-200"
                      >
                        <span>{c}</span>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/treks" 
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 text-[13px] font-bold text-white bg-[#1e3a8a] hover:bg-[#10224b] rounded-xl transition-all duration-300 shadow-sm"
                >
                  View All Regions
                </Link>
              </div>
            </div>

            {/* Main Packages Area */}
            <div className="flex-1">
              <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 
                  className="text-2xl md:text-3xl text-gray-900 uppercase drop-shadow-sm font-semibold tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Treks in this Region ({filteredTreks.length})
                </h2>
              </div>

              {filteredTreks.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="treks-grid">
                    {currentTreks.map((trek) => {
                      const detailUrl = trek.link;
                      return (
                        <Link to={detailUrl} key={trek.id} className="block group h-full">
                          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                            
                            {/* Image Container with Badges */}
                            <div className="relative h-60 overflow-hidden bg-slate-100">
                              <img 
                                src={trek.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800'} 
                                alt={trek.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                              {/* Wishlist Heart Icon */}
                              <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-white shadow-sm transition-colors"
                              >
                                <Heart size={16} />
                              </button>

                              {/* Duration Badge on Image */}
                              {trek.duration && (
                                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/10">
                                  <Calendar size={13} className="text-orange-400" />
                                  Duration: {trek.duration} {trek.durationUnit || 'Days'}
                                </div>
                              )}
                            </div>

                            {/* Content Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                              <div>
                                {/* Title */}
                                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2 mb-2">
                                  {trek.title}
                                </h3>

                                {/* Rating & Reviews */}
                                <div className="flex items-center gap-1.5 mb-4 text-xs">
                                  <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={13} fill={i < Math.floor(trek.rating || 5) ? "currentColor" : "none"} strokeWidth={1.5} />
                                    ))}
                                  </div>
                                  <span className="text-slate-500 font-medium">
                                    {trek.rating || 5} ({trek.reviewsCount || 1} {trek.reviewsCount === 1 ? 'Review' : 'Reviews'})
                                  </span>
                                </div>
                              </div>

                              {/* Price & Action Section */}
                              <div className="pt-4 border-t border-slate-100 flex items-end justify-between mt-auto">
                                <div>
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Price From</span>
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-black text-[#1e3a8a]">{trek.price || 'Contact Us'}</span>
                                    {trek.originalPrice && (
                                      <span className="text-xs text-slate-400 line-through font-medium">{trek.originalPrice}</span>
                                    )}
                                  </div>
                                </div>

                                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:text-[#1e3a8a] transition-colors pb-1">
                                  Explore
                                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      const gridElement = document.getElementById('treks-grid');
                      if (gridElement) {
                        const y = gridElement.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                  />
                </>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-medium text-slate-700">No trekking packages found for this region yet.</h3>
                  <p className="text-slate-500 mt-2 mb-6">We are currently updating our catalog. You can add new trekking packages via the Admin Dashboard or explore our other available treks.</p>
                  <div className="flex justify-center gap-4">
                    <Link to="/treks" className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
                      Browse All Treks
                    </Link>
                    <Link to="/dashboard/treks" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition">
                      Add New Trek in Admin
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekRegion;
