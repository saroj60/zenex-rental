import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { MapPin, Clock, Star, ArrowLeft, ChevronRight } from 'lucide-react';
import { formatDuration } from '../utils/duration';

import { regionData } from '../data/regionData';

const RegionDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { regions, tourTrips, treks, packages } = useAppData();

  const matchedRegion = (regions || []).find(r => r.slug === slug);
  const fallbackKey = (slug || '').toLowerCase();
  const fallbackData = regionData[fallbackKey] || 
                       regionData[fallbackKey.replace(/-region.*/, '')] ||
                       regionData[fallbackKey.split('-')[0]] || null;

  const rawTitle = matchedRegion?.name || fallbackData?.title || `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Region Treks`;
  const cleanTitle = rawTitle.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  const cleanDescription = matchedRegion?.description || fallbackData?.description || `Discover pristine mountain landscapes, authentic Himalayan heritage, and unforgettable trail experiences in the ${cleanTitle}.`;

  const region = matchedRegion ? {
    ...matchedRegion,
    name: cleanTitle,
    description: cleanDescription
  } : (fallbackData ? {
    id: slug,
    slug: slug,
    name: cleanTitle,
    description: cleanDescription,
    image: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070'
  } : {
    id: slug,
    slug: slug,
    name: cleanTitle,
    description: cleanDescription
  });

  // Combine and map treks, tourTrips, and packages (deduplicated)
  const combinedMap = new Map();

  (Array.isArray(treks) ? treks : []).forEach(t => {
    if (!t) return;
    const key = (t.id || t.slug || t.title || '').toLowerCase();
    if (!combinedMap.has(key)) {
      combinedMap.set(key, {
        id: t.id,
        title: t.title,
        image: t.image || t.img || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        price: t.price ? parseInt(String(t.price).replace(/[^0-9]/g, '')) : 0,
        originalPrice: t.originalPrice ? parseInt(String(t.originalPrice).replace(/[^0-9]/g, '')) : 0,
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
      combinedMap.set(key, {
        id: t.id,
        title: t.title,
        image: t.image || t.mainImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        price: t.pricingInfo?.sellingPrice || (t.price ? parseInt(String(t.price).replace(/[^0-9]/g, '')) : 0),
        originalPrice: t.pricingInfo?.originalPrice || (t.originalPrice ? parseInt(String(t.originalPrice).replace(/[^0-9]/g, '')) : 0),
        rating: t.rating || 5,
        reviewsCount: t.reviewsCount || 0,
        difficulty: t.grade || 'Moderate',
        duration: t.duration || t.durationValue || '',
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
        image: p.img || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        price: p.price ? parseInt(String(p.price).replace(/[^0-9]/g, '')) : 0,
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

  // Filter packages for this region
  const regionTrips = combinedList.filter(item => {
    if (!region) return false;
    const sanitize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const normSlug = sanitize(slug);
    const targetKey = (slug || '').toLowerCase();

    const regionAliases = {
      'everest': ['everest', 'ebc', 'khumbu'],
      'everest-base-camp': ['everest', 'ebc', 'khumbu'],
      'annapurna': ['annapurna', 'abc', 'poonhill', 'thorong'],
      'langtang': ['langtang', 'helambu', 'tamang', 'ruby'],
      'manaslu': ['manaslu', 'tsum'],
      'upper-mustang': ['mustang', 'lomanthang'],
      'mustang': ['mustang', 'lomanthang'],
      'kanchenjunga': ['kanchenjunga'],
      'dolpo': ['dolpo', 'dolpa', 'phoksundo'],
      'dhaulagiri': ['dhaulagiri', 'dhampus'],
      'rolwaling': ['rolwaling', 'lapchi'],
      'makalu': ['makalu'],
      'far-western-nepal': ['farwest', 'farwestern', 'khaptad'],
      'far-west': ['farwest', 'farwestern', 'khaptad'],
      'kathmandu-valley': ['kathmandu'],
      'kathmandu-pokhara': ['pokhara'],
      'everest-base-camp-tibet': ['tibet', 'lhasa'],
      'bhutan-trekking': ['bhutan'],
      'ladakh-adventure': ['ladakh']
    };

    const aliases = (regionAliases[targetKey] || [normSlug]).map(a => sanitize(a));

    const regProp = sanitize(item.region);
    const locProp = sanitize(item.location);
    const titleLower = sanitize(item.title);

    if (regProp) {
      return regProp === normSlug || aliases.some(a => regProp.includes(a));
    }

    return aliases.some(a => locProp.includes(a) || titleLower.includes(a));
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!region) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Region not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="relative h-[400px] sm:h-[500px]">
        {region.image ? (
          <img src={region.image} alt={region.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-blue-900"></div>
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider mb-4 drop-shadow-lg">{region.name}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">{region.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#e53a24] transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar with Countries */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-200/60 p-6 sticky top-36">
              <h3 className="text-[11px] font-extrabold text-[#64748B] uppercase tracking-[0.15em] mb-4 pl-3">
                Destinations
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
                to="/destinations" 
                className="w-full flex items-center justify-center gap-2 px-5 py-4 text-[13px] font-bold text-white bg-[#1e3a8a] hover:bg-[#10224b] rounded-xl transition-all duration-300 shadow-sm"
              >
                All Destinations
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Packages in {region.name}</h2>
                <p className="text-gray-500 mt-2">Showing {regionTrips.length} available packages</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regionTrips.map(trip => (
                <Link to={trip.link} key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                  <div className="h-56 overflow-hidden relative bg-slate-50">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wider">
                      {trip.activity}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#e53a24] uppercase tracking-wider mb-2">
                      <MapPin size={14} /> {trip.region || trip.location}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{trip.title}</h3>
                    
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100 mt-auto">
                      <div className="flex items-center gap-1.5 font-medium"><Clock size={16} className="text-blue-500"/> {formatDuration(trip.duration, trip.durationUnit)}</div>
                      {trip.rating && (
                        <div className="flex items-center gap-1.5 font-medium"><Star size={16} className="text-yellow-500 fill-current"/> {trip.rating}</div>
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Starting From</div>
                      <div className="text-right">
                        {trip.originalPrice > 0 && (
                          <span className="text-sm text-gray-400 line-through mr-2">${trip.originalPrice}</span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">${trip.price || 'Request'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {regionTrips.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No packages found</h3>
                <p className="text-gray-500">We are currently updating our packages for this region. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionDetail;
