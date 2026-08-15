import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import CountryWiseTourCategories from '../components/CountryWiseTourCategories';

const Tours = () => {
  const { packages, tourTrips } = useAppData();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [pkgDropdownOpen, setPkgDropdownOpen] = useState(false);

  // Initial load: show all Tours sorted by days
  useEffect(() => {
    window.scrollTo(0, 0);
    const mappedTourTrips = (tourTrips || [])
      .filter(t => t.status === 'Published' && (t.category === 'Tours' || t.category === 'Tours Packages'))
      .map(t => ({
        id: t.slug || t.id,
        isTourTrip: true,
        title: t.title,
        img: t.image,
        category: t.category,
        location: t.destination,
        price: t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : (t.price ? `US$${t.price}` : 'From Price'),
        persons: `/ ${t.pricingInfo?.pricePer || 'Person'}`
      }));
    const initialTours = [...mappedTourTrips, ...packages.filter(p => p.category === 'Tours' && !mappedTourTrips.some(m => m.title === p.title))];
    initialTours.sort((a, b) => {
      const daysA = parseInt(a.title.match(/\d+/) || [0], 10);
      const daysB = parseInt(b.title.match(/\d+/) || [0], 10);
      return daysA - daysB;
    });
    setFilteredPackages(initialTours);
  }, [packages, tourTrips]);

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
    const mappedTourTrips = (tourTrips || [])
      .filter(t => t.status === 'Published' && (t.category === 'Tours' || t.category === 'Tours Packages'))
      .map(t => ({
        id: t.slug || t.id,
        isTourTrip: true,
        title: t.title,
        img: t.image,
        category: t.category,
        location: t.destination,
        price: t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : (t.price ? `US$${t.price}` : 'From Price'),
        persons: `/ ${t.pricingInfo?.pricePer || 'Person'}`
      }));
    let results = [...mappedTourTrips, ...packages.filter(p => p.category === 'Tours' && !mappedTourTrips.some(m => m.title === p.title))];
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
  }, [selectedDestination, selectedPackage, packages, tourTrips]);

  const destinations = ['Nepal', 'Bhutan', 'Tibet', 'India', 'Multi Country'];
  
  // Extract unique packages names for the dropdown, filtered by selectedDestination if any
  const mappedTourTripsForNames = (tourTrips || [])
    .filter(t => t.status === 'Published' && (t.category === 'Tours' || t.category === 'Tours Packages'))
    .map(t => ({
      title: t.title,
      location: t.destination
    }));
  const combinedForNames = [...mappedTourTripsForNames, ...packages.filter(p => p.category === 'Tours' && !mappedTourTripsForNames.some(m => m.title === p.title))];
  const packageNames = [...new Set(
    combinedForNames
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
      <div className="relative pt-32 pb-24 px-4 md:px-8 overflow-hidden min-h-[350px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070&auto=format&fit=crop"
            alt="Nepal Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Tour Packages
          </h1>
          <div className="text-sm font-semibold text-white/80 flex items-center justify-center gap-1.5">
            <Link to="/" className="hover:text-[#e53a24] text-white/95 transition-colors">Home</Link>
            <span className="text-white/40">&gt;</span>
            <span className="text-[#e53a24]">Tours</span>
          </div>
        </div>

        {/* Wave svg at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] md:h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0c4.14,1.83,8.37,3.58,12.75,5.18C83.84,25.43,158.74,48.51,234.34,58.82,263.63,62.8,292.82,61.76,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      <CountryWiseTourCategories />
    </div>
  );
};

export default Tours;

