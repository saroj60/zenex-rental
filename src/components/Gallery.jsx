import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { Image } from 'lucide-react';

const Gallery = () => {
  const { galleryImages } = useAppData();

  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#331a47] mb-4">
            A Glimpse of the Journey
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Discover the beauty of our destinations and the premium vehicles that get you there. Let these moments inspire your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.slice(0, 8).map((img, idx) => {
            // Determine span based on index for a masonry-like grid
            const isLarge = idx === 0 || idx === 3;
            const spanClass = isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';

            return (
              <div 
                key={img.id} 
                className={`${spanClass} relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                <img 
                  src={img.url} 
                  alt={img.title || 'Gallery Image'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white font-bold text-lg md:text-xl drop-shadow-md flex items-center gap-2">
                      <Image size={18} className="text-white/80" />
                      {img.title || 'Beautiful Destination'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
