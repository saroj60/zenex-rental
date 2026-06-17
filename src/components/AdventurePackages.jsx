import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredPackages } from '../pages/Packages';

const AdventurePackages = () => {
  const displayPackages = featuredPackages.slice(0, 5);

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Adventure Packages</h2>
          <p className="text-gray-500 font-medium">Curated trips for the ultimate Himalayan experience.</p>
        </div>
        <Link to="/packages" className="hidden md:flex items-center gap-2 text-[#EA580C] font-bold hover:text-[#d04b08] transition-colors">
          View All Packages <ArrowRight size={18} />
        </Link>
      </div>
      
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x">
        {displayPackages.map((pkg, idx) => (
          <Link to={`/packages/${pkg.id}`} key={idx} className="min-w-[280px] md:min-w-[340px] relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl h-64 group snap-start cursor-pointer border border-gray-100 block">
            <img alt={pkg.title} src={pkg.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <span className="text-white text-xl md:text-2xl font-bold leading-tight drop-shadow-md mb-2">{pkg.title}</span>
              <div className="flex items-center gap-1.5 text-orange-400 font-medium text-sm drop-shadow-md">
                <MapPin size={16} /> {pkg.location}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdventurePackages;
