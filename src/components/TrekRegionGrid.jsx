import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { Mountain, Compass, MapPin, ArrowRight } from 'lucide-react';

const DEFAULT_TREK_DESTINATIONS = [
  {
    id: 'REG-trk-eve',
    slug: 'everest-base-camp',
    name: 'Everest Region Treks',
    displayName: 'EVEREST REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'EBC, Gokyo Lakes & Kala Patthar',
    difficulty: 'Challenging',
    maxAltitude: '5,545 m',
    duration: '12 - 16 Days',
    image: '/images/everest base.jpg',
    description: 'The Everest region is the ultimate Himalayan pilgrimage, offering a breathtaking journey into the heart of the Khumbu valley. Trekkers walk past ancient Sherpa settlements, historic Buddhist monasteries like Tengboche, turquoise glacial Gokyo Lakes, and breathtaking panoramic views from Kala Patthar. Reaching Everest Base Camp provides an unforgettable close-up view of Mount Everest, Lhotse, and Nuptse.'
  },
  {
    id: 'REG-trk-ann',
    slug: 'annapurna',
    name: 'Annapurna Region Treks',
    displayName: 'ANNAPURNA REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'Circuit, Base Camp & Poon Hill Sunrise',
    difficulty: 'Moderate to Strenuous',
    maxAltitude: '5,416 m',
    duration: '7 - 14 Days',
    image: '/images/annapurna.jpg',
    description: 'Renowned as one of the world’s most diverse trekking routes, the Annapurna region spans sub-tropical forests, dramatic river gorges, and high-altitude alpine deserts. Travelers can challenge themselves on the famous Annapurna Circuit over Thorong La Pass, hike into the natural amphitheater of Annapurna Base Camp, or enjoy early morning sunrises over Machhapuchhre from Poon Hill.'
  },
  {
    id: 'REG-trk-lan',
    slug: 'langtang',
    name: 'Langtang Valley Hikes',
    displayName: 'LANGTANG REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'Valley of Glaciers & Holy Gosaikunda',
    difficulty: 'Moderate',
    maxAltitude: '4,380 m',
    duration: '7 - 10 Days',
    image: '/images/langtang1.jpg',
    description: 'Located just north of Kathmandu, the Langtang Valley offers a pristine mountain escape rich in Tamang heritage and Tibetan-influenced culture. The trail wanders through lush bamboo and rhododendron forests, past traditional yak cheese factories, and up to the sacred alpine waters of Gosaikunda Lake under the shadows of Langtang Lirung.'
  },
  {
    id: 'REG-trk-man',
    slug: 'manaslu',
    name: 'Manaslu Circuit Adventures',
    displayName: 'MANASLU REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'Untouched Wilderness & Larke Pass',
    difficulty: 'Strenuous',
    maxAltitude: '5,106 m',
    duration: '14 - 18 Days',
    image: '/images/manaslu.jpg',
    description: 'The Manaslu Circuit is a premier off-the-beaten-path trekking route that circles Mount Manaslu, the eighth highest mountain in the world. As a restricted area, it preserves untouched mountain wilderness, traditional cliffside Tibetan villages, and dramatic river crossings before culminating in the thrilling climb over Larke La Pass.'
  },
  {
    id: 'REG-trk-mus',
    slug: 'mustang',
    name: 'Mustang Region Treks',
    displayName: 'MUSTANG REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'The Last Forbidden Kingdom of Lo Manthang',
    difficulty: 'Moderate',
    maxAltitude: '3,840 m',
    duration: '10 - 14 Days',
    image: '/images/upper mustang.jpg',
    description: 'Hidden in the rain-shadow desert behind the Dhaulagiri range, Mustang is a high-altitude sanctuary often called "The Last Forbidden Kingdom of Lo Manthang". This unique region is famous for wind-sculpted red rock canyons, ancient cliffside cave dwellings, centuries-old Buddhist monasteries, and authentic Mustang royal traditions.'
  },
  {
    id: 'REG-trk-kan',
    slug: 'kanchenjunga',
    name: 'Kanchenjunga Region Treks',
    displayName: 'KANCHENJUNGA REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'Wild East & World 3rd Highest Peak',
    difficulty: 'Strenuous',
    maxAltitude: '5,143 m',
    duration: '18 - 22 Days',
    image: '/images/kanchenjunga.jpg',
    description: 'Exploring the far eastern corner of Nepal, Kanchenjunga trekking takes adventurers into an untouched wilderness surrounding the world’s third highest peak. The journey features dense rhododendron forests, vast glacial moraines, rare Himalayan wildlife, and remote ethnic villages untouched by modern tourism.'
  },
  {
    id: 'REG-trk-dol',
    slug: 'dolpo',
    name: 'Hidden Dolpo Journeys',
    displayName: 'DOLPO REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'Phoksundo Turquoise Lake & Bon Culture',
    difficulty: 'Strenuous',
    maxAltitude: '5,350 m',
    duration: '14 - 21 Days',
    image: '/images/dorpatan dolpo.jpg',
    description: 'Dolpo is a mystical land in northwestern Nepal known for its dramatic trans-Himalayan landscapes and deep turquoise Shey Phoksundo Lake. Immortalized in classic Himalayan literature, Dolpo offers high-altitude desert passes, pre-Buddhist Bon culture, and an unforgettable sense of remoteness.'
  },
  {
    id: 'REG-trk-fws',
    slug: 'far-western-nepal',
    name: 'Far-Western Nepal Escapes',
    displayName: 'FAR-WEST REGION TREKS',
    country: 'Nepal',
    type: 'Treks',
    tagline: 'Khaptad Plateau & Uncrowded Trails',
    difficulty: 'Moderate',
    maxAltitude: '3,300 m',
    duration: '8 - 12 Days',
    image: '/images/Khaptad Trek 11 Days.jpg',
    description: 'Far-Western Nepal is a serene, uncharted paradise featuring rolling green plateaus, untouched forests, and peaceful sacred hermitage sites like Khaptad. Free from mainstream trekking crowds, this region offers authentic rural hospitality, peaceful meadow walks, and pristine Himalayan solitude.'
  },
  {
    id: 'REG-tib-ebc',
    slug: 'everest-base-camp-tibet',
    name: 'Everest Base Camp Tibet',
    displayName: 'TIBET EVEREST NORTH FACE',
    country: 'Tibet',
    type: 'Treks',
    tagline: 'North Face of Everest & Rongbuk Monastery',
    difficulty: 'Moderate',
    maxAltitude: '5,200 m',
    duration: '8 - 12 Days',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070',
    description: 'Tibet trekking and overland journeys showcase the majestic North Face of Mount Everest alongside the spiritual heartland of Lhasa. Travelers explore historic monasteries including Potala Palace and Rongbuk—the world’s highest monastery—while traversing the dramatic vastness of the Tibetan plateau.'
  },
  {
    id: 'REG-bhu-cul',
    slug: 'bhutan-trekking',
    name: 'Bhutan Himalayan Trails',
    displayName: 'BHUTAN HIMALAYAN TRAILS',
    country: 'Bhutan',
    type: 'Treks',
    tagline: 'Tiger Nest, Paro Valley & Druk Path',
    difficulty: 'Moderate',
    maxAltitude: '4,200 m',
    duration: '6 - 10 Days',
    image: 'https://images.unsplash.com/photo-1578593139811-2928a2a829b3?q=80&w=2070',
    description: 'The Kingdom of Bhutan offers peaceful trekking routes through pristine pine forests, mist-shrouded mountain passes, and historic dzong fortresses. From the legendary Tiger’s Nest Monastery perched on a sheer cliffside in Paro to rewarding ridge walks, Bhutan delivers a harmonious blend of nature and spiritual culture.'
  },
  {
    id: 'REG-ind-lad',
    slug: 'ladakh-adventure',
    name: 'Ladakh High Pass Trails',
    displayName: 'LADAKH HIGH PASS TRAILS',
    country: 'India',
    type: 'Treks',
    tagline: 'Markha Valley & Pangong Tso Hikes',
    difficulty: 'Moderate to Strenuous',
    maxAltitude: '5,150 m',
    duration: '7 - 12 Days',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070',
    description: 'Nestled in northern India, Ladakh is a high-altitude mountain desert characterized by dramatic barren peaks, blue alpine lakes like Pangong Tso, and centuries-old Buddhist gompas. Trekkers traverse high mountain passes such as Markha Valley while experiencing rich Indo-Tibetan mountain traditions.'
  }
];

const TrekRegionGrid = () => {
  const { treks, tourTrips, packages, regions } = useAppData();
  const [activeCountry, setActiveCountry] = useState('Nepal');

  const availableCountries = ['Nepal', 'Tibet', 'Bhutan', 'India'];

  // Flatten all packages to count matches
  const combinedList = useMemo(() => {
    return [
      ...(Array.isArray(treks) ? treks : []).map(t => ({
        title: t.title,
        region: t.region || t.quickFacts?.region || '',
        location: t.location || t.destination || ''
      })),
      ...(Array.isArray(tourTrips) ? tourTrips : []).filter(t => t.status === 'Published').map(t => ({
        title: t.title,
        region: t.region || '',
        location: t.destination || ''
      })),
      ...(Array.isArray(packages) ? packages : []).map(p => ({
        title: p.title,
        region: p.region || p.location || '',
        location: p.location || ''
      }))
    ];
  }, [treks, tourTrips, packages]);

  // Combine context regions with default fallback destinations
  const sourceRegions = useMemo(() => {
    if (regions && regions.length > 0) {
      return regions;
    }
    return DEFAULT_TREK_DESTINATIONS;
  }, [regions]);

  // Filter regions by selected country
  const filteredRegions = useMemo(() => {
    const list = sourceRegions.filter(r => {
      const countryMatch = (r.country || 'Nepal').toLowerCase() === activeCountry.toLowerCase();
      if (!countryMatch) return false;
      if (activeCountry === 'Nepal') {
        return r.type === 'Treks' || r.type === 'Both' || !r.type;
      }
      return true;
    });

    if (list.length > 0) return list;

    // Fall back to default destination subset if database list had 0 matches for country
    return DEFAULT_TREK_DESTINATIONS.filter(r => r.country.toLowerCase() === activeCountry.toLowerCase());
  }, [sourceRegions, activeCountry]);

  // Calculate dynamic counts and metadata
  const regionsWithCounts = useMemo(() => {
    return filteredRegions.map(region => {
      const normalizedSlug = (region.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const count = combinedList.filter(item => {
        const titleLower = (item.title || '').toLowerCase();
        const regProp = (item.region || '').toLowerCase();
        const locProp = (item.location || '').toLowerCase();

        return regProp.replace(/[^a-z0-9]/g, '').includes(normalizedSlug) || 
               locProp.replace(/[^a-z0-9]/g, '').includes(normalizedSlug) || 
               titleLower.replace(/[^a-z0-9]/g, '').includes(normalizedSlug);
      }).length;

      let displayName = (region.displayName || region.name || '').toUpperCase();
      if (!displayName.includes('TREKS') && !displayName.includes('TRAILS') && !displayName.includes('EXPEDITIONS')) {
        displayName = `${displayName} REGION TREKS`;
      }

      const defaultMatch = DEFAULT_TREK_DESTINATIONS.find(d => d.slug === region.slug || d.id === region.id);

      return {
        ...region,
        displayName,
        count,
        tagline: region.tagline || defaultMatch?.tagline || 'Himalayan Trekking Route',
        difficulty: region.difficulty || defaultMatch?.difficulty || 'Moderate',
        maxAltitude: region.maxAltitude || defaultMatch?.maxAltitude || '4,500 m',
        duration: region.duration || defaultMatch?.duration || '7 - 14 Days',
        description: region.description && region.description.length > 30 ? region.description : (defaultMatch?.description || 'Experience stunning mountain views and local Himalayan culture.')
      };
    });
  }, [filteredRegions, combinedList]);

  return (
    <div className="w-full bg-[#f4f9fc] py-16 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
            <Compass size={14} className="text-orange-500" />
            Trekking Destination Guide
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a8a] uppercase tracking-tight">
            Explore <span className="text-orange-600">Trek Destinations</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover iconic Himalayan base camps, high mountain passes, and alpine valley routes with a detailed overview of each destination.
          </p>
        </div>

        {/* Country Switcher Tabs */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {availableCountries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeCountry === country
                  ? 'bg-gradient-to-r from-orange-500 to-[#E59A2F] text-white shadow-md border-transparent transform scale-105'
                  : 'text-[#64748B] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Grid of Trek Destination Cards */}
        {regionsWithCounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionsWithCounts.map(region => {
              const targetUrl = region.type === 'Treks' ? `/treks/region/${region.slug}` : `/region/${region.slug}`;

              return (
                <Link 
                  key={region.slug || region.id} 
                  to={targetUrl} 
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/70 hover:border-orange-500/40 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5"
                >
                  {/* Image Container */}
                  <div className="w-full h-64 overflow-hidden relative bg-slate-100">
                    <img 
                      src={region.image || '/images/everest base.jpg'} 
                      alt={region.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent"></div>
                    
                    {/* Floating Country Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-slate-800 shadow-md uppercase tracking-wider">
                      {region.country || activeCountry}
                    </div>

                    {/* Max Altitude Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md border border-white/10">
                      <Mountain size={13} className="text-orange-400" />
                      {region.maxAltitude}
                    </div>

                    {/* Card Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[11px] font-extrabold uppercase text-orange-400 tracking-wider mb-1">
                        {region.tagline}
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-wide group-hover:text-orange-300 transition-colors drop-shadow-md">
                        {region.displayName}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    {/* Meta info pills & Action Button */}
                    <div className="pt-2 flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shadow-xs">
                        {region.count > 0 ? `${region.count} Active Packages` : 'Explore Routes'}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] group-hover:text-orange-600 transition-colors">
                        View Details
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-lg mx-auto">
            <MapPin size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-600 font-semibold">No trekking destination cards available for {activeCountry}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrekRegionGrid;
