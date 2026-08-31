import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const TrekRegionGrid = () => {
  const { treks, tourTrips, packages } = useAppData();

  const regionsList = [
    { name: 'Everest Region Treks', slug: 'everest', image: '/images/everest base.jpg' },
    { name: 'Annapurna Region Treks', slug: 'annapurna', image: '/images/annapurna.jpg' },
    { name: 'Manaslu Region Treks', slug: 'manaslu', image: '/images/manaslu.jpg' },
    { name: 'Langtang Region Treks', slug: 'langtang', image: '/images/langtang1.jpg' },
    { name: 'Mustang Region Treks', slug: 'mustang', image: '/images/upper mustang.jpg' },
    { name: 'Kanchenjunga Region Treks', slug: 'kanchenjunga', image: '/images/kanchenjunga.jpg' },
    { name: 'Dolpo Region Treks', slug: 'dolpo', image: '/images/dorpatan dolpo.jpg' },
    { name: 'Dhaulagiri Region Treks', slug: 'dhaulagiri', image: '/trek images/Dhaulagiri-Circuit-Trek.jpeg' },
  ];

  // Flatten all packages to count matches
  const combinedList = useMemo(() => {
    return [
      ...treks.map(t => ({
        title: t.title,
        region: t.region || t.quickFacts?.region || '',
        location: t.location || t.destination || ''
      })),
      ...tourTrips.filter(t => t.status === 'Published').map(t => ({
        title: t.title,
        region: t.region || '',
        location: t.destination || ''
      })),
      ...packages.map(p => ({
        title: p.title,
        region: p.region || p.location || '',
        location: p.location || ''
      }))
    ];
  }, [treks, tourTrips, packages]);

  // Calculate dynamic counts
  const regionsWithCounts = useMemo(() => {
    return regionsList.map(region => {
      const normalizedSlug = region.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
      const count = combinedList.filter(item => {
        const titleLower = (item.title || '').toLowerCase();
        const regProp = (item.region || '').toLowerCase();
        const locProp = (item.location || '').toLowerCase();

        return regProp.replace(/[^a-z0-9]/g, '').includes(normalizedSlug) || 
               locProp.replace(/[^a-z0-9]/g, '').includes(normalizedSlug) || 
               titleLower.replace(/[^a-z0-9]/g, '').includes(normalizedSlug);
      }).length;

      return {
        ...region,
        count
      };
    });
  }, [combinedList]);

  return (
    <div className="w-full bg-[#f4f9fc] py-16 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] uppercase tracking-wide">
            Explore Trekking Regions
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl mx-auto font-medium">
            Find the perfect Himalayan trek categorized by the world's most famous trekking regions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {regionsWithCounts.map(region => (
            <Link 
              key={region.slug} 
              to={`/treks/region/${region.slug}`} 
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-slate-100 relative shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src={region.image} 
                  alt={region.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Title & Count */}
              <div className="mt-3">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                  {region.name}
                </h3>
                <p className="text-slate-500 text-xs font-semibold mt-1">
                  {region.count > 0 ? `${region.count} Packages` : '0 Packages'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrekRegionGrid;
