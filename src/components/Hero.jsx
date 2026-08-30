import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, MapPin, Calendar, Users, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchWidget from './SearchWidget';

const heroImages = [
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=100&w=2000&auto=format&fit=crop', // High res mountain peak
  'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=100&w=2000&auto=format&fit=crop', // High res mountain road with vehicle
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=100&w=2000&auto=format&fit=crop'  // High res Everest base camp / Nepal landscape
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[600px] lg:min-h-[680px] w-full flex flex-col pt-24 md:pt-32 pb-4 md:pb-6 px-4 md:px-8 border-b border-gray-150">
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {heroImages.map((img, idx) => (
          <motion.img
            key={idx}
            initial={{ scale: 1.1 }}
            animate={{ scale: idx === currentImageIndex ? 1 : 1.1, opacity: idx === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            alt="Zenex Fleet in the Himalayas"
            className={`absolute inset-0 w-full h-full object-cover object-center`}
            src={img}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/40 via-black/30 md:via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 md:via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end flex-1 pb-4 md:pb-6">
        <motion.div 
          className="w-full flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-4 drop-shadow-lg max-w-2xl">
            Premium Travels, Tours &<br className="hidden sm:block"/> Car Rental in Nepal
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-start gap-2.5 mb-5 md:mb-6 w-full">
            <Link to="/packages" className="w-full sm:w-auto text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-[#1e3a8a] hover:bg-[#152c6e] text-[11px] md:text-xs">
              Explore Packages
              <div className="bg-white rounded-full p-0.5 text-[#1e3a8a]">
                <ArrowRight size={10} strokeWidth={3} />
              </div>
            </Link>
            <Link to="/vehicles" className="w-full sm:w-auto text-white border border-white/60 px-4 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors text-[11px] md:text-xs backdrop-blur-sm">
              Rent a Car
            </Link>
            <a href="tel:+9779860156046" className="w-full sm:w-auto text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md bg-[#e53a24] hover:bg-[#d04b08] text-[11px] md:text-xs">
              <Phone size={12} fill="currentColor" /> Call Now
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full md:w-[70%] max-w-[480px]">
            <SearchWidget activeTab="tours" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
