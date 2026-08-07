import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const Destinations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { destinations } = useAppData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = ['All', 'Himalayas', 'Valley', 'Terai'];

  const filteredDestinations = destinations.filter(d => {
    const matchesFilter = activeFilter === 'All' || d.region === activeFilter;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-20">
      <SEO 
        title="Top Destinations in Nepal | Explore Kathmandu, Pokhara, Chitwan"
        description="Discover the best tourist destinations in Nepal. Plan your next adventure to Kathmandu, Pokhara, Lumbini, and the Himalayas with our expert travel guides."
        canonicalUrl="https://zenextravel.com.np/destinations"
      />
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/destinations/pokhara.png" 
            alt="Nepal Landscapes" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2f4c]/80 via-[#0a2f4c]/60 to-[#F4F6F8]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-blue-50 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            <MapPin size={16} className="mr-2" /> Explore Nepal
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            Discover Your Next <span className="text-[#e53a24]">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium mb-10 max-w-2xl mx-auto drop-shadow-md">
            From the towering peaks of the Himalayas to the lush jungles of the Terai, find the perfect vehicle for your destination.
          </p>
          
          <div className="bg-white p-2 rounded-2xl shadow-xl flex items-center max-w-2xl mx-auto border border-white/50 mb-12">
            <div className="flex-1 flex items-center px-4">
              <Search className="text-gray-400 mr-3" size={24} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a destination (e.g. Pokhara)..." 
                className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400"
              />
            </div>
            <button className="bg-[#e53a24] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#d04b08] transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 relative z-20">
        
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2 flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeFilter === filter 
                ? 'bg-[#1e3a8a] text-white shadow-md' 
                : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredDestinations.map((dest) => (
            <Link 
              to={`/destinations/${dest.id}`} 
              key={dest.id} 
              className={`${dest.span} relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-200/50 block`}
            >
              <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={dest.img} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-white/20">
                    {dest.region}
                  </div>
                  <span className="text-white text-3xl font-extrabold leading-tight block mb-2 drop-shadow-md">{dest.name}</span>
                  <span className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 block">{dest.desc}</span>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="text-white" size={24} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Destinations;
