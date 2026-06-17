import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const PopularEscapes = () => {
  const { destinations } = useAppData();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth / 2;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b134d] tracking-tight">Destinations</h2>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 flex-1 lg:ml-12">
            <div className="max-w-2xl">
              <p className="text-gray-600 font-medium text-lg leading-relaxed">
                Personalized tours and unforgettable adventures with a trusted local tour operator.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                #TravelNepal #HimalayanAdventures #ExploreTheWild #CulturalTours
              </p>
            </div>
            
            <div className="flex gap-3 self-start lg:self-end">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#3b134d] hover:border-[#3b134d] hover:bg-gray-50 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#3b134d] hover:border-[#3b134d] hover:bg-gray-50 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="w-full relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
        >
          {destinations.map((dest) => (
            <Link 
              to={`/destinations/${dest.id}#recommended-packages`} 
              key={dest.id} 
              className="flex-none w-[85vw] sm:w-[50vw] md:w-[33.333vw] lg:w-[25vw] h-[500px] relative group cursor-pointer border-r border-white/20 snap-start"
            >
              <img 
                alt={dest.name} 
                className="w-full h-full object-cover" 
                src={dest.img} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/95 via-black/40 to-transparent flex flex-col justify-end p-8 transition-colors duration-500 group-hover:from-[#ea580c]/90">
                <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-white text-2xl md:text-3xl font-extrabold leading-tight block mb-3 drop-shadow-lg">
                    {dest.name}
                  </span>
                  <span className="text-white/90 text-sm leading-relaxed line-clamp-3 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {dest.fullDesc || dest.desc}
                  </span>
                  
                  <div className="inline-flex items-center gap-2 bg-white text-[#ea580c] px-6 py-2.5 rounded-full font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    Explore {dest.name} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default PopularEscapes;
