import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Star, Calendar, Activity, Search } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';
import CountryWiseTrekCategories from '../components/CountryWiseTrekCategories';

const Treks = () => {
  const { treks } = useAppData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Parse URL search params
  const searchParams = new URLSearchParams(location.search);
  const regionParam = searchParams.get('region');
  const typeParam = searchParams.get('type');

  // We keep a shuffled version in state to avoid re-shuffling on every render
  const [shuffledTreks, setShuffledTreks] = useState([]);

  React.useEffect(() => {
    const arr = [...treks];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledTreks(arr);
  }, [treks]);

  const filteredTreks = shuffledTreks.filter(trek => {
    const titleLower = (trek.title || '').toLowerCase();
    const catLower = (trek.category || '').toLowerCase();
    const actLower = (trek.activity || '').toLowerCase();

    // Exclude tour or biking packages
    if (catLower === 'tours' || actLower.includes('biking')) return false;
    if (titleLower.includes('tour') && !titleLower.includes('trek')) return false;

    const matchesSearch = titleLower.includes(searchQuery.toLowerCase());
    
    let matchesRegion = true;
    if (regionParam) {
      matchesRegion = titleLower.includes(regionParam.toLowerCase()) || 
                      (trek.region && trek.region.toLowerCase().includes(regionParam.toLowerCase())) ||
                      (trek.quickFacts?.region && trek.quickFacts.region.toLowerCase().includes(regionParam.toLowerCase()));
    }
    
    let matchesType = true;
    if (typeParam) {
      matchesType = titleLower.includes(typeParam.toLowerCase()) || 
                    actLower.includes(typeParam.toLowerCase());
    }

    return matchesSearch && matchesRegion && matchesType;
  });

  const totalPages = Math.ceil(filteredTreks.length / itemsPerPage);
  const currentTreks = filteredTreks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white pb-16 overflow-x-hidden pt-32">
      <SEO 
        title="Trekking in Nepal | Zenex Rental"
        description="Explore the majestic Himalayas with our guided trekking packages in Nepal."
      />
      
      {/* Interactive Country-Wise Categories Section */}
      <CountryWiseTrekCategories />
      
      <div className="w-full bg-white pt-8 pb-24" id="treks-content-area">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 
              className="text-2xl md:text-3xl text-gray-900 uppercase drop-shadow-sm font-semibold tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Popular Trekking Packages in Nepal ({filteredTreks.length})
            </h2>
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search treks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border-0 text-gray-800 py-3 px-5 pr-12 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="treks-grid">
            {currentTreks.map((trek) => (
              <Link to={`/treks/${trek.id}`} key={trek.id} className="block group">
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
                      
                      {/* Grade */}
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
                      
                      {/* Duration */}
                      {trek.duration && (
                        <div className="flex items-center gap-2 flex-1">
                          <Calendar size={20} strokeWidth={1.5} className="text-gray-800 shrink-0" />
                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] text-gray-700 font-medium leading-none mb-1">Duration</span>
                            <span className="text-[11px] font-bold text-gray-900 leading-tight pr-1">
                              {trek.duration}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Activity */}
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
            ))}
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
        </div>
      </div>
    </div>
  );
};

export default Treks;

