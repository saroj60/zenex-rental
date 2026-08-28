import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import SEO from '../components/SEO';
import { formatDuration } from '../utils/duration';

const countryData = {
  'nepal': {
    name: 'Nepal',
    image: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070',
    description: 'Explore the majestic Himalayas, vibrant culture, and ancient temples of Nepal.'
  },
  'tibet': {
    name: 'Tibet',
    image: '/images/Incredible Himalaya Tour to Tibet, Nepal & Bhutan 15 Days.jpg',
    description: 'Discover the roof of the world, sacred lakes, and ancient Buddhist monasteries.'
  },
  'bhutan': {
    name: 'Bhutan',
    image: 'https://www.nepalpackagetour.com/public/uploads/bhutan_tour/Tiger%20nest.jpg',
    description: 'Experience the land of the Thunder Dragon and gross national happiness.'
  },
  'india': {
    name: 'India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2070',
    description: 'A vibrant tapestry of diverse cultures, magnificent palaces, and rich history.'
  }
};

const CountryPackages = () => {
  const { countryId } = useParams();
  const { packages, tourTrips, treks } = useAppData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countryId]);

  const country = countryData[countryId?.toLowerCase()] || {
    name: countryId,
    image: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070',
    description: 'Explore our amazing packages.'
  };

  const isPackageInCountry = (pkg, destName) => {
    const loc = (pkg.location || '').toLowerCase();
    const dest = destName.toLowerCase();
    const title = (pkg.title || '').toLowerCase();
    
    if (dest === 'nepal') {
      const otherCountries = ['tibet', 'bhutan', 'india', 'kailash', 'lhasa'];
      const hasOtherCountry = otherCountries.some(c => loc.includes(c) || title.includes(c));
      if (hasOtherCountry) return false;
      return true;
    }

    if (dest === 'tibet') {
      const tibetKeywords = ['tibet', 'lhasa', 'kailash', 'mansarovar'];
      return tibetKeywords.some(keyword => loc.includes(keyword) || title.includes(keyword));
    }

    return loc.includes(dest) || title.includes(dest);
  };

  const mappedTourTrips = (tourTrips || [])
    .filter(t => t.status === 'Published')
    .map(t => ({
      id: t.slug || t.id,
      title: t.title,
      img: t.image,
      category: t.category,
      location: t.destination,
      price: t.pricingInfo?.sellingPrice || t.price,
      duration: t.duration || t.durationValue,
      durationUnit: t.durationUnit || 'Days',
      rating: t.rating || 5,
      link: `/tour/${t.slug || t.id}`
    }));

  const mappedTreks = (treks || []).map(t => ({
    id: t.id,
    title: t.title,
    img: t.image,
    category: 'Treks',
    location: t.quickFacts?.destination || t.destination || t.region || 'Nepal',
    price: t.price ? t.price.replace('$', '').trim() : '',
    duration: t.quickFacts?.duration || t.duration,
    durationUnit: '',
    rating: 5,
    link: `/treks/${t.id}`
  }));

  const combinedPackages = [...mappedTourTrips, ...mappedTreks];

  let countryPackages = combinedPackages.filter(pkg => isPackageInCountry(pkg, country.name));
  
  if (country.name.toLowerCase() === 'nepal') {
      countryPackages = combinedPackages.filter(pkg => {
          const loc = (pkg.location || '').toLowerCase();
          const title = (pkg.title || '').toLowerCase();
          const otherCountries = ['tibet', 'bhutan', 'india', 'kailash', 'lhasa', 'multi country'];
          const hasOtherCountry = otherCountries.some(c => loc.includes(c) || title.includes(c));
          return !hasOtherCountry;
      });
  }

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title={`${country.name} Packages | Zenex Travel`}
        description={country.description}
      />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={country.image} 
            alt={country.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0f3493]/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg uppercase tracking-wider">
            {country.name} Packages
          </h1>
          <p className="text-xl text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
            {country.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#e53a24] transition-colors font-medium">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-900">{countryPackages.length}</span> packages
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countryPackages.map((pkg, idx) => (
            <Link to={pkg.link} key={pkg.id + '-' + idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative bg-slate-100">
                <img 
                  src={pkg.img || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wider">
                  {pkg.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e53a24] uppercase tracking-wider mb-2">
                  <MapPin size={14} /> {pkg.location || country.name}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{pkg.title}</h3>
                
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100 mt-auto">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={16} className="text-blue-500"/> {formatDuration(pkg.duration, pkg.durationUnit)}
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Star size={16} className="text-yellow-500 fill-current"/> {pkg.rating}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Starting From</div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">${pkg.price || 'Request'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {countryPackages.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No packages found</h3>
            <p className="text-gray-500">We are currently updating our packages for {country.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryPackages;
