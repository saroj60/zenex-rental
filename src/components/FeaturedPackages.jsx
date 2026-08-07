import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, MapPin, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const FeaturedPackages = () => {
  const { packages } = useAppData();
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getItemWidth = () => {
    if (scrollRef.current && scrollRef.current.firstChild) {
      const childWidth = scrollRef.current.firstChild.offsetWidth;
      const gap = 24; // gap-6 is 1.5rem = 24px
      return childWidth + gap;
    }
    return 344; // fallback
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -getItemWidth(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: getItemWidth(), behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const itemWidth = getItemWidth();
      const newIndex = Math.round(scrollPosition / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Check if we are close to the end
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: getItemWidth(), behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <section className="reveal reveal-up bg-[#ebf3fa] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f3493] leading-tight mb-2 tracking-tight">
              Top-Rated Nepal Tour Packages
            </h2>
            <p className="text-gray-500 font-medium">
              Our 5-star bestsellers: from cultural city tours to challenging mountain treks.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#0f3493] hover:border-[#0f3493] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#0f3493] hover:border-[#0f3493] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {packages.slice(0, 8).map((pkg) => (
            <Link to={`/packages/${pkg.id}`} key={pkg.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col snap-start shrink-0 group hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative">
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
                    <span className="text-gray-500 text-xs ml-1 font-medium">{pkg.persons}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#e53a24] group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(packages.length / 1) }).map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-green-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;

