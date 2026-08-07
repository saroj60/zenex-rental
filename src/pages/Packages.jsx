import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { ArrowRight, MapPin, CheckCircle2, Map, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const Packages = () => {
  const { packages } = useAppData();
  const [sortOption, setSortOption] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getNumericPrice = (priceStr) => {
    if (!priceStr || priceStr.toLowerCase().includes('request')) return 999999;
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    if (priceStr.includes('NPR')) {
       return num / 133;
    }
    return num;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramDestination = queryParams.get('destination');
  const paramType = queryParams.get('type');

  const filteredPackages = packages.filter(pkg => {
    // Strictly display Tours (exclude Treks)
    const isTrek = pkg.category === 'Treks' || pkg.title.toLowerCase().includes('trek');
    if (isTrek) return false;

    const searchMatch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (pkg.location && pkg.location.toLowerCase().includes(searchQuery.toLowerCase()));
                        
    if (searchQuery.trim() !== '') {
      return searchMatch;
    }
    
    let destMatch = true;
    if (paramDestination) {
      const destTarget = paramDestination.replace(' Region', '').replace(' Valley', '').replace(' National Park', '').toLowerCase();
      destMatch = (pkg.location && pkg.location.toLowerCase().includes(destTarget)) || 
                  pkg.title.toLowerCase().includes(destTarget);
    }
    
    let typeMatch = true;
    if (paramType) {
      if (paramType === 'Cultural Tour') {
        typeMatch = pkg.category === 'Tours' || pkg.title.toLowerCase().includes('tour');
      } else {
        const typeTarget = paramType.split(' ')[0].toLowerCase();
        typeMatch = pkg.title.toLowerCase().includes(typeTarget) || (pkg.category && pkg.category.toLowerCase().includes(typeTarget));
      }
    }
    
    return destMatch && typeMatch;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return getNumericPrice(a.price) - getNumericPrice(b.price);
    }
    if (sortOption === 'price-desc') {
      return getNumericPrice(b.price) - getNumericPrice(a.price);
    }
    if (sortOption === 'newest') {
      return b.id.localeCompare(a.id);
    }
    if (sortOption === 'rated') {
      return b.title.length - a.title.length;
    }
    return 0; 
  });

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title="Nepal Tour Packages | Best Holiday & Adventure Tours in Nepal"
        description="Book the best Nepal tour packages, holiday packages, and adventure tours. From family tours to luxury honeymoon packages, we offer unbeatable prices."
        canonicalUrl="https://zenextravel.com.np/packages"
      />
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Nepal Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-md">
            Tour Packages
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-sm">
            Explore Nepal's culture, heritage, and scenic wonders with our top-rated Tour Packages.
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        
        {/* Filter and Sort Options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">All Packages ({sortedPackages.length})</h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-auto sm:min-w-[200px]">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#ebf3fa] border-0 text-gray-800 py-2.5 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#ebf3fa] border-0 text-gray-800 py-2.5 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium min-w-[180px] cursor-pointer appearance-none relative"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '.65rem auto' }}
            >
              <option value="popular">Most Popular</option>
              <option value="rated">Best Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedPackages.map((pkg) => (
            <Link to={`/packages/${pkg.id}`} key={pkg.id} className="reveal reveal-up bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative">
              <div className="relative h-56 overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {pkg.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-sm font-medium">
                  <MapPin size={16} className="text-[#e53a24]" />
                  <span className="line-clamp-1 drop-shadow-sm">{pkg.location}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl text-gray-900 font-bold mb-4 leading-snug line-clamp-2">
                  {pkg.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <span className="text-[#e53a24] font-bold text-xl">{pkg.price}</span>
                    <span className="text-gray-600 text-xs ml-1 font-medium">{pkg.persons}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#e53a24] group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;

