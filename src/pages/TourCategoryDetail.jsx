import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import SEO from '../components/SEO';

const categoryTitles = {
  'kathmandu-valley': 'Kathmandu Valley Tours',
  'kathmandu-pokhara': 'Kathmandu Pokhara Tours',
  'kathmandu-pokhara-chitwan': 'Kathmandu Pokhara Chitwan Tours',
  'muktinath': 'Jomsom Muktinath Yatras',
  'wildlife-safari': 'Wildlife & Safari Tours',
  'helicopter-adventure': 'Helicopter & Adventure Tours',
  'tibet-lhasa': 'Lhasa City Tours',
  'tibet-kailash': 'Mount Kailash Yatras',
  'tibet-ebc': 'Everest Base Camp Tibet',
  'bhutan-cultural': 'Bhutan Cultural Tours',
  'bhutan-glimpse': 'Glimpse of Bhutan',
  'india-golden': 'Golden Triangle Tours',
  'india-sikkim': 'Sikkim & Darjeeling Tours',
  'india-ladakh': 'Ladakh Adventure Tours'
};

const categoryDescriptions = {
  'kathmandu-valley': 'Discover the rich history, ancient temples, and stunning hill stations around the Kathmandu Valley.',
  'kathmandu-pokhara': 'Perfect blend of cultural heritage in Kathmandu and scenic lakes and mountains in Pokhara.',
  'kathmandu-pokhara-chitwan': 'The classic Nepal golden triangle tour covering culture, scenery, and wildlife safari.',
  'muktinath': 'A sacred pilgrimage journey to the holy temple of Muktinath in the trans-Himalayan Mustang region.',
  'wildlife-safari': 'Embark on jungle adventures to spot one-horned rhinos, royal Bengal tigers, and exotic bird species.',
  'helicopter-adventure': 'Experience the thrill of flying past towering Himalayan peaks and biking through rugged mountain trails.',
  'tibet-lhasa': 'Explore the rooftop of the world, visiting the ancient Potala Palace and Jokhang Temple in Lhasa.',
  'tibet-kailash': 'Join the ultimate spiritual journey circumambulating the sacred Mount Kailash and Mansarovar Lake.',
  'tibet-ebc': 'Stand face to face with the mighty Mount Everest from the Tibetan base camp.',
  'bhutan-cultural': 'Step into the Last Shangri-La, discovering pristine fortresses, monasteries, and happy local cultures.',
  'bhutan-glimpse': 'A quick yet comprehensive tour covering Paro, Thimphu, and the highlights of Bhutan.',
  'india-golden': 'Explore the iconic Golden Triangle covering Delhi, Agra (Taj Mahal), and the pink city of Jaipur.',
  'india-sikkim': 'Soak in the mist-laden tea gardens, Buddhist monasteries, and scenic mountains of Sikkim and Darjeeling.',
  'india-ladakh': 'Traverse the high-altitude deserts, blue lakes, and monasteries in the land of high passes, Ladakh.'
};

const TourCategoryDetail = () => {
  const { categoryName } = useParams();
  const { packages, tourTrips, treks, regions } = useAppData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const matchedRegion = regions ? regions.find(r => r.slug === categoryName) : null;
  const title = matchedRegion ? matchedRegion.name : (categoryTitles[categoryName] || 'Tour Packages');
  const description = matchedRegion ? matchedRegion.description : (categoryDescriptions[categoryName] || 'Explore our custom crafted holiday tour packages.');

  const mappedTourTrips = (tourTrips || [])
    .filter(t => t.status === 'Published' && (t.category === 'Tours' || t.category === 'Tours Packages'))
    .map(t => ({
      id: t.slug || t.id,
      isTourTrip: true,
      title: t.title,
      img: t.image,
      category: t.category,
      location: t.destination,
      region: t.region,
      price: t.pricingInfo?.sellingPrice ? `US$${t.pricingInfo.sellingPrice}` : (t.price ? `US$${t.price}` : 'From Price'),
      persons: `per ${t.pricingInfo?.pricePer || 'person'}`
    }));

  const mappedTreks = (treks || [])
    .filter(t => (t.activity && t.activity.toLowerCase().includes('biking')) || (t.title || '').toLowerCase().includes('biking') || (t.title || '').toLowerCase().includes('cycling'))
    .map(t => ({
      id: t.id,
      isTourTrip: false,
      isTrek: true,
      title: t.title,
      img: t.image,
      category: 'Adventure Tour',
      location: t.quickFacts?.destination || t.destination || 'Nepal',
      region: t.region,
      price: t.price ? `US$${String(t.price).replace('$', '').trim()}` : 'From Price',
      persons: 'per person'
    }));

  const combinedPackages = [...mappedTourTrips, ...mappedTreks, ...packages.filter(p => !mappedTourTrips.some(m => m.title === p.title))];

  const filteredPackages = combinedPackages.filter(pkg => {
    const isTrek = pkg.category === 'Treks' || (pkg.title || '').toLowerCase().includes('trek');
    if (isTrek && !pkg.isTrek) return false;

    // Check dynamic region association
    if (matchedRegion) {
      const pkgRegionName = (pkg.region || '').toLowerCase();
      const matchRegionName = matchedRegion.name.toLowerCase();
      if (pkgRegionName === matchRegionName) {
        return true;
      }
    }

    const titleLower = (pkg.title || '').toLowerCase();
    const typeLower = categoryName.toLowerCase();

    if (typeLower === 'kathmandu-valley') {
      return (titleLower.includes('kathmandu') || titleLower.includes('chandragiri')) && 
             !(titleLower.includes('pokhara') || titleLower.includes('chitwan') || titleLower.includes('muktinath') || titleLower.includes('jomsom') || titleLower.includes('yatra'));
    } else if (typeLower === 'kathmandu-pokhara') {
      return titleLower.includes('kathmandu') && titleLower.includes('pokhara') && 
             !(titleLower.includes('chitwan') || titleLower.includes('muktinath') || titleLower.includes('jomsom') || titleLower.includes('yatra') || titleLower.includes('lumbini'));
    } else if (typeLower === 'kathmandu-pokhara-chitwan') {
      return titleLower.includes('kathmandu') && titleLower.includes('pokhara') && 
             (titleLower.includes('chitwan') || titleLower.includes('lumbini') || titleLower.includes('safari'));
    } else if (typeLower === 'muktinath') {
      return titleLower.includes('muktinath') || titleLower.includes('jomsom') || titleLower.includes('yatra');
    } else if (typeLower === 'wildlife-safari') {
      return titleLower.includes('chitwan') || titleLower.includes('bardia') || titleLower.includes('safari') || titleLower.includes('wildlife') || titleLower.includes('national park') || titleLower.includes('tiger');
    } else if (typeLower === 'helicopter-adventure') {
      return titleLower.includes('helicopter') || titleLower.includes('heli') || titleLower.includes('biking') || titleLower.includes('cycling') || titleLower.includes('bike') || titleLower.includes('rafting');
    } else if (typeLower === 'tibet-lhasa') {
      return titleLower.includes('lhasa');
    } else if (typeLower === 'tibet-kailash') {
      return titleLower.includes('kailash') || titleLower.includes('mansarovar');
    } else if (typeLower === 'tibet-ebc') {
      return titleLower.includes('everest') || titleLower.includes('ebc');
    } else if (typeLower === 'bhutan-cultural') {
      return titleLower.includes('cultural') || titleLower.includes('bhutan');
    } else if (typeLower === 'bhutan-glimpse') {
      return titleLower.includes('glimpse');
    } else if (typeLower === 'india-golden') {
      return titleLower.includes('golden') || titleLower.includes('triangle');
    } else if (typeLower === 'india-sikkim') {
      return titleLower.includes('sikkim') || titleLower.includes('darjeeling');
    } else if (typeLower === 'india-ladakh') {
      return titleLower.includes('ladakh');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#ebf3fa] pb-20 pt-32">
      <SEO 
        title={`${title} | Best Holiday & Sightseeing Tours`}
        description={description}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/tours" className="hover:text-orange-500 transition-colors">Tours</Link>
          <span>&gt;</span>
          <span className="font-semibold text-slate-900">{title}</span>
        </nav>

        {/* Hero Banner Area */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h1>
            <p className="text-lg text-slate-300 font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Listing Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Available Packages ({filteredPackages.length})</h2>
          <Link to="/tours" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e53a24] hover:underline">
            <ArrowLeft size={16} /> Back to Regions
          </Link>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <Link 
                to={pkg.isTourTrip ? `/tour/${pkg.id}` : (pkg.isTrek ? `/treks/${pkg.id}` : `/packages/${pkg.id}`)} 
                key={pkg.id} 
                className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative"
              >
                <div className="relative h-48 overflow-hidden">
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
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base text-gray-900 font-bold mb-3 leading-snug line-clamp-2">
                    {pkg.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                    <div>
                      <span className="text-[#e53a24] font-bold text-lg">{pkg.price}</span>
                      <span className="text-gray-600 text-xs ml-1 font-medium">{pkg.persons}</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#e53a24] group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium text-lg">No tour packages found under this category.</p>
            <Link to="/tours" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e53a24] text-white font-bold hover:bg-orange-600 transition-colors">
              Browse All Regions
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourCategoryDetail;
