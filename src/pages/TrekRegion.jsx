import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Calendar, Activity, ArrowLeft } from 'lucide-react';
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
  const region = matchedRegion 
    ? {
        id: matchedRegion.slug,
        title: matchedRegion.name,
        description: matchedRegion.description ? `<p>${matchedRegion.description}</p>` : `<p>Explore the breathtaking trails of ${matchedRegion.name}.</p>`
      }
    : (regionData[regionId] || {
        id: regionId,
        title: `${regionId.charAt(0).toUpperCase() + regionId.slice(1)} Region Treks`,
        description: `<p>Explore the breathtaking trails of the ${regionId} region.</p>`
      });

  const combinedList = [
    ...treks.map(t => ({
      id: t.id,
      title: t.title,
      image: t.image,
      price: t.price,
      originalPrice: t.originalPrice,
      rating: t.rating || 5,
      reviewsCount: t.reviewsCount || 0,
      difficulty: t.difficulty || t.quickFacts?.difficulty || 'Moderate',
      duration: t.duration || t.quickFacts?.duration || '',
      durationUnit: t.durationUnit || 'Days',
      activity: t.activity || 'Trekking',
      region: t.region || t.quickFacts?.region || '',
      location: t.location || t.destination || '',
      link: `/treks/${t.id}`
    })),
    ...tourTrips.filter(t => t.status === 'Published').map(t => ({
      id: t.id,
      title: t.title,
      image: t.image,
      price: t.price || (t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : ''),
      originalPrice: t.pricingInfo?.originalPrice ? `US$${t.pricingInfo.originalPrice}` : '',
      rating: t.rating || 5,
      reviewsCount: t.reviewsCount || 0,
      difficulty: t.grade || 'Moderate',
      duration: t.duration || t.durationValue || '',
      durationUnit: t.durationUnit || 'Days',
      activity: t.activities?.join(', ') || 'Tour',
      region: t.region || '',
      location: t.destination || '',
      link: `/tour/${t.slug || t.id}`
    })),
    ...packages.map(p => ({
      id: p.id,
      title: p.title,
      image: p.img,
      price: p.price ? `US$${p.price.replace('US$', '').replace('$', '').trim()}` : '',
      rating: 5,
      reviewsCount: 1,
      difficulty: p.difficulty || 'Moderate',
      duration: p.duration || '',
      durationUnit: 'Days',
      activity: p.category || 'Package',
      region: p.region || p.location || '',
      location: p.location || '',
      link: `/packages/${p.id}`
    }))
  ];

  // Filter treks for this region
  const filteredTreks = combinedList.filter(trek => {
    const titleLower = (trek.title || '').toLowerCase();
    const regProp = (trek.region || '').toLowerCase();
    const locProp = (trek.location || '').toLowerCase();

    // Match database region strictly
    if (matchedRegion) {
      const matchRegionName = matchedRegion.name.toLowerCase();
      if (regProp === matchRegionName || locProp === matchRegionName) {
        return true;
      }
    }

    const normalizedRegionId = regionId.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Match region strictly
    return regProp.replace(/[^a-z0-9]/g, '').includes(normalizedRegionId) || 
           locProp.replace(/[^a-z0-9]/g, '').includes(normalizedRegionId) || 
           titleLower.replace(/[^a-z0-9]/g, '').includes(normalizedRegionId);
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
    <div className="min-h-screen bg-white pb-16 overflow-x-hidden pt-32">
      <SEO 
        title={`${region.title} | Zenex Rental`}
        description={`Trekking packages for ${region.title}.`}
      />
      
      <div className="w-full bg-white pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/destinations" className="hover:text-orange-500 transition-colors">Destinations</Link>
            <span>&gt;</span>
            <span>Nepal</span>
            <span>&gt;</span>
            <Link to="/treks" className="hover:text-orange-500 transition-colors">Treks in Nepal</Link>
            <span>&gt;</span>
            <span className="font-semibold text-slate-900">{region.title}</span>
          </nav>

          {/* Region Description */}
          <div className="mb-12 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              {region.title}
            </h1>
            <div 
              className="text-slate-600 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: region.description }}
            />
          </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="treks-grid">
                {currentTreks.map((trek) => {
                  const detailUrl = trek.link;
                  return (
                    <Link to={detailUrl} key={trek.id} className="block group">
                      <div className="bg-[#E4E2DC] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                        
                        {/* Image Header */}
                        <div className="relative h-72 overflow-hidden">
                          <img 
                            src={trek.image} 
                            alt={trek.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Content Body */}
                        <div className="px-5 pt-5 pb-5 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                            {trek.title}
                          </h3>
                          
                          {/* Reviews & Price */}
                          <div className="flex justify-between items-center mb-3 min-h-[20px]">
                            {trek.price ? (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-bold text-gray-900">{trek.price}</span>
                                  {trek.originalPrice && (
                                    <span className="text-xs text-gray-600 line-through">{trek.originalPrice}</span>
                                  )}
                                  <span className="text-xs text-gray-700 font-medium">/person</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="flex text-[#F59E0B]">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={12} fill={i < Math.floor(trek.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
                                    ))}
                                  </div>
                                  <span className="text-[10px] font-semibold text-gray-700">from {trek.reviewsCount} reviews</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <div className="flex text-[#F59E0B]">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill={i < Math.floor(trek.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
                                  ))}
                                </div>
                                <span className="text-xs font-semibold text-gray-700">from {trek.reviewsCount} reviews</span>
                              </div>
                            )}
                          </div>

                          <div className="w-full h-px bg-gray-300/80 my-3"></div>
                          
                          {/* Footer Features */}
                          <div className="flex justify-between items-start mt-auto pt-1 gap-2">
                            {trek.difficulty && (
                              <div className="flex items-center gap-2 flex-1">
                                <Clock size={20} strokeWidth={1.5} className="text-gray-800 shrink-0" />
                                <div className="flex flex-col justify-center">
                                  <span className="text-[10px] text-gray-700 font-medium leading-none mb-1">Grade</span>
                                  <span className="text-[11px] font-bold text-gray-900 leading-tight pr-1">
                                    {trek.difficulty}
                                  </span>
                                </div>
                              </div>
                            )}
                            {trek.duration && (
                              <div className="flex items-center gap-2 flex-1">
                                <Calendar size={20} strokeWidth={1.5} className="text-gray-800 shrink-0" />
                                <div className="flex flex-col justify-center">
                                  <span className="text-[10px] text-gray-700 font-medium leading-none mb-1">Duration</span>
                                  <span className="text-[11px] font-bold text-gray-900 leading-tight pr-1">
                                    {formatDuration(trek.duration, trek.durationUnit || 'Days')}
                                  </span>
                                </div>
                              </div>
                            )}
                            {trek.activity && (
                              <div className="flex items-center gap-2 flex-1">
                                <Activity size={20} strokeWidth={1.5} className="text-gray-800 shrink-0" />
                                <div className="flex flex-col justify-center">
                                  <span className="text-[10px] text-gray-700 font-medium leading-none mb-1">Activity</span>
                                  <span className="text-[11px] font-bold text-gray-900 leading-tight pr-1 break-words">
                                    {trek.activity}
                                  </span>
                                </div>
                              </div>
                            )}
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
  );
};

export default TrekRegion;
