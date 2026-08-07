import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const Tours = () => {
  const { packages } = useAppData();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [pkgDropdownOpen, setPkgDropdownOpen] = useState(false);

  // Initial load: show all Tours sorted by days
  useEffect(() => {
    window.scrollTo(0, 0);
    const initialTours = packages.filter(p => p.category === 'Tours');
    initialTours.sort((a, b) => {
      const daysA = parseInt(a.title.match(/\d+/) || [0], 10);
      const daysB = parseInt(b.title.match(/\d+/) || [0], 10);
      return daysA - daysB;
    });
    setFilteredPackages(initialTours);
  }, [packages]);

  // Helper to check if a package belongs to a destination
  const isPackageInDestination = (pkg, destName) => {
    const loc = pkg.location.toLowerCase();
    const dest = destName.toLowerCase();
    const title = pkg.title.toLowerCase();
    
    if (dest === 'nepal') {
      // Exclude if it mentions other countries
      const otherCountries = ['tibet', 'bhutan', 'india', 'kailash', 'lhasa'];
      const hasOtherCountry = otherCountries.some(country => loc.includes(country) || title.includes(country));
      if (hasOtherCountry) return false;
      
      const nepalKeywords = ['nepal', 'kathmandu', 'pokhara', 'chitwan', 'lumbini', 'muktinath', 'ghorepani', 'annapurna', 'bandipur', 'chandragiri'];
      return nepalKeywords.some(city => loc.includes(city) || title.includes(city));
    }

    if (dest === 'tibet') {
      const tibetKeywords = ['tibet', 'lhasa', 'kailash', 'mansarovar'];
      return tibetKeywords.some(keyword => loc.includes(keyword) || title.includes(keyword));
    }

    if (dest === 'bhutan') {
      return loc.includes('bhutan') || title.includes('bhutan');
    }

    if (dest === 'india') {
      return loc.includes('india') || title.includes('india');
    }

    if (dest === 'multi country' || dest === 'multi-country') {
      const countries = ['nepal', 'tibet', 'bhutan', 'india'];
      let count = 0;
      countries.forEach(c => {
        if (loc.includes(c) || title.includes(c)) count++;
      });
      // Also check if location explicitly contains '&'
      return count > 1 || loc.includes('&');
    }
    
    return loc.includes(dest) || title.includes(dest);
  };

  // Update filtered packages whenever selectedDestination or selectedPackage changes
  useEffect(() => {
    let results = packages.filter(p => p.category === 'Tours');
    if (selectedDestination) {
      results = results.filter(p => isPackageInDestination(p, selectedDestination));
    }
    if (selectedPackage) {
      results = results.filter(p => p.title === selectedPackage);
    }
    
    // Sort packages by number of days
    results.sort((a, b) => {
      const daysA = parseInt(a.title.match(/\d+/) || [0], 10);
      const daysB = parseInt(b.title.match(/\d+/) || [0], 10);
      return daysA - daysB;
    });

    setFilteredPackages(results);
  }, [selectedDestination, selectedPackage, packages]);

  const destinations = ['Nepal', 'Bhutan', 'Tibet', 'India', 'Multi Country'];
  
  // Extract unique packages names for the dropdown, filtered by selectedDestination if any
  const packageNames = [...new Set(
    packages
      .filter(p => p.category === 'Tours')
      .filter(p => !selectedDestination || isPackageInDestination(p, selectedDestination))
      .map(p => p.title)
  )];

  const handleSearch = () => {
    // Search is now handled automatically by the useEffect, but we can keep the button for UX
    // Could add scrolling to results here if desired
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO 
        title="Adventure Tours Nepal | Luxury & Budget Tours in Nepal"
        description="Experience the thrill of adventure tours in Nepal. We offer a wide range of luxury tours, budget tours, and custom holiday packages across Nepal."
        canonicalUrl="https://zenextravel.com.np/tours"
      />
      {/* Hero / Header Section */}
      <div className="bg-[#ebf3fa] pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          <h1 className="text-4xl md:text-5xl text-[#222] mb-0 tracking-tight">
            Tours
          </h1>
          <div className="text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-green-700 text-[#888]">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-green-600">Tours</span>
          </div>
        </div>
        {/* Wave svg at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0c4.14,1.83,8.37,3.58,12.75,5.18C83.84,25.43,158.74,48.51,234.34,58.82,263.63,62.8,292.82,61.76,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* Search Bar section */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative -mt-8 z-20 mb-16">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-center">
          
          {/* Destination Dropdown */}
          <div className="relative w-full md:w-5/12 border border-gray-300 rounded-md">
            <button 
              className="w-full text-left px-4 py-3 flex items-center justify-between text-sm text-gray-700 bg-white rounded-md"
              onClick={() => setDestDropdownOpen(!destDropdownOpen)}
            >
              {selectedDestination || 'Choose Destinations'}
              <ChevronDown size={16} className={`text-blue-600 transition-transform ${destDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {destDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1">
                <div 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  onClick={() => { setSelectedDestination(''); setDestDropdownOpen(false); }}
                >
                  Choose Destinations
                </div>
                {destinations.map(dest => (
                  <div 
                    key={dest} 
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                    onClick={() => { setSelectedDestination(dest); setDestDropdownOpen(false); }}
                  >
                    {dest}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Package Dropdown */}
          <div className="relative w-full md:w-5/12 border border-gray-300 rounded-md">
            <button 
              className="w-full text-left px-4 py-3 flex items-center justify-between text-sm text-gray-700 bg-white rounded-md"
              onClick={() => setPkgDropdownOpen(!pkgDropdownOpen)}
            >
              {selectedPackage || 'Choose Packages'}
              <ChevronDown size={16} className={`text-blue-600 transition-transform ${pkgDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {pkgDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                <div 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  onClick={() => { setSelectedPackage(''); setPkgDropdownOpen(false); }}
                >
                  Choose Packages
                </div>
                {packageNames.map(pkg => (
                  <div 
                    key={pkg} 
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                    onClick={() => { setSelectedPackage(pkg); setPkgDropdownOpen(false); }}
                  >
                    {pkg}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="w-full md:w-2/12 bg-[#1b8c00] hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {destinations.map(destName => {
          const destPackages = filteredPackages.filter(p => isPackageInDestination(p, destName));
          if (destPackages.length === 0) return null;

          const groupedByDays = destPackages.reduce((acc, pkg) => {
            const daysMatch = pkg.title.match(/\d+/);
            const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;
            if (!acc[days]) acc[days] = [];
            acc[days].push(pkg);
            return acc;
          }, {});

          const sortedDays = Object.keys(groupedByDays).sort((a, b) => parseInt(a) - parseInt(b));

          return (
            <div key={destName} className="mb-16">
              {sortedDays.map(days => (
                <div key={days} className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium text-[#0f3493]">{days} Days Tours in {destName}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupedByDays[days].map((pkg) => (
                      <div key={pkg.id}>
                        <Link to={`/packages/${pkg.id}`} className="bg-white block flex flex-col group transition-shadow border border-gray-100 pb-2">
                          <div className="h-56 overflow-hidden relative">
                            <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <div className="pt-4 px-4 flex flex-col flex-1">
                            <h3 className="text-[17px] text-[#222] group-hover:text-green-600 transition-colors font-semibold mb-2 leading-tight">
                              {pkg.title}
                            </h3>
                            
                            <div className="border-t border-gray-100 pt-4 mt-2 flex items-center justify-between">
                              <div>
                                <span className="text-[#111] font-bold text-[17px]">{pkg.price}</span>
                                <span className="text-gray-400 text-xs ml-1">{pkg.persons}</span>
                              </div>
                              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-gray-400 transition-colors">
                                <ArrowRight size={14} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tours;

