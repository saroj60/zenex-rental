import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const PopularEscapes = () => {
  const { destinations } = useAppData();
  
  // Custom height spans for the grid layout
  const displayDestinations = destinations.slice(0, 5).map((d, index) => {
    let span = 'md:col-span-1';
    let height = 'h-64';
    if (index === 0) { span = 'md:col-span-2 md:row-span-2'; height = 'h-64 md:h-full'; }
    if (index === 4) { span = 'md:col-span-2'; height = 'h-64'; }
    return { ...d, span, height };
  });

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Popular Escapes</h2>
          <p className="text-gray-500 font-medium">Discover Nepal's most breathtaking destinations.</p>
        </div>
        <Link to="/destinations" className="hidden md:flex items-center gap-2 text-[#EA580C] font-bold hover:text-[#d04b08] transition-colors">
          View All Destinations <ArrowRight size={18} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[256px]">
        {displayDestinations.map((dest) => (
          <Link to={`/destinations/${dest.id}`} key={dest.id} className={`${dest.span} relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 block`}>
            <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={dest.img} />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-2xl font-bold leading-tight block mb-1 drop-shadow-md">{dest.name}</span>
                <span className="text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 block">{dest.desc}</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="text-white" size={20} />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center md:hidden">
        <Link to="/destinations" className="flex items-center gap-2 text-[#EA580C] font-bold hover:text-[#d04b08] transition-colors bg-[#EA580C]/10 px-6 py-3 rounded-xl w-full justify-center">
          View All Destinations <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default PopularEscapes;
