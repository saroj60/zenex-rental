import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { motion } from 'framer-motion';

const Gallery = () => {
  const { galleryImages } = useAppData();

  if (!galleryImages || galleryImages.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-20 px-4 md:px-8 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-4">
            A Glimpse of the Journey
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Discover the beauty of our destinations and the premium vehicles that get you there. Let these moments inspire your next adventure.
          </p>
        </div>

        <motion.div variants={containerVariants} className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[150px]">
          {galleryImages.slice(0, 12).map((img, idx) => {
            // Determine span based on index for a masonry-like grid
            const isLarge = idx === 0 || idx === 3;
            const spanClass = isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';

            return (
              <motion.div 
                variants={itemVariants}
                key={img.id} 
                className={`${spanClass} relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                <img 
                  src={img.url} 
                  alt={img.title || 'Gallery Image'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Gallery;

