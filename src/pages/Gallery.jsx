import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Compass, 
  Camera, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

// Static curated showcase items to enrich the public gallery
const CURATED_GALLERY_ITEMS = [
  {
    id: 'c-1',
    url: '/images/everest base.jpg',
    title: 'Everest Base Camp Trail',
    category: 'Mountains & Treks',
    location: 'Solukhumbu, Everest Region',
    description: 'Iconic view of Mount Everest and surrounding high mountain summits.'
  },
  {
    id: 'c-2',
    url: '/images/annapurna.jpg',
    title: 'Annapurna Massif Sunrise',
    category: 'Mountains & Treks',
    location: 'Annapurna Conservation Area',
    description: 'Golden morning light illuminating the majestic Annapurna peaks.'
  },
  {
    id: 'c-3',
    url: '/images/destinations/pokhara.png',
    title: 'Phewa Lake & Fishtail Reflection',
    category: 'Scenic Destinations',
    location: 'Pokhara Valley',
    description: 'Serene waters of Phewa Lake with Machhapuchhre towering in the background.'
  },
  {
    id: 'c-4',
    url: '/images/ktm-home.jpg',
    title: 'Kathmandu Durbar Square',
    category: 'Culture & Tours',
    location: 'Kathmandu Valley',
    description: 'UNESCO World Heritage ancient pagoda architecture and bustling heritage plaza.'
  },
  {
    id: 'c-5',
    url: '/images/destinations/mustang.png',
    title: 'Upper Mustang Off-Road Canyon',
    category: 'Scenic Destinations',
    location: 'Lo Manthang, Upper Mustang',
    description: 'Dramatic high-altitude desert canyons and sacred cave civilizations.'
  },
  {
    id: 'c-6',
    url: '/images/destinations/chitwan.png',
    title: 'Chitwan Wildlife Safari',
    category: 'Scenic Destinations',
    location: 'Chitwan National Park',
    description: 'One-horned rhino and lush jungle greenery in southern Terai.'
  },
  {
    id: 'c-7',
    url: '/images/Mardi Himal Trek 9 Days.jpg',
    title: 'Mardi Himal High Camp View',
    category: 'Mountains & Treks',
    location: 'Annapurna Region',
    description: 'Panoramic ridge trek overlooking Fishtail Mountain up close.'
  },
  {
    id: 'c-8',
    url: '/images/Ghorepani Poon Hill.jpg',
    title: 'Poon Hill Sunrise Panorama',
    category: 'Mountains & Treks',
    location: 'Ghorepani, Myagdi',
    description: 'World famous sunrise viewpoint facing Dhaulagiri and Annapurna ranges.'
  },
  {
    id: 'c-9',
    url: '/images/kalinchowk1.jpg',
    title: 'Kalinchowk Snow & Cable Car',
    category: 'Scenic Destinations',
    location: 'Kuri Village, Dolakha',
    description: 'Winter wonderland surrounded by snow capped slopes and temple shrine.'
  },
  {
    id: 'c-10',
    url: '/images/langtang1.jpg',
    title: 'Langtang Valley & Kyanjin Gompa',
    category: 'Mountains & Treks',
    location: 'Rasuwa, Langtang Region',
    description: 'Glacial valley surrounded by soaring peaks and traditional Tamang villages.'
  },
  {
    id: 'c-11',
    url: '/images/destinations/lumbini.png',
    title: 'Maya Devi Temple & Sacred Garden',
    category: 'Culture & Tours',
    location: 'Lumbini Sacred Garden',
    description: 'Peaceful birthplace of Lord Buddha surrounded by international monasteries.'
  },
  {
    id: 'c-12',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBJN1DqlFxqoaHMMIsrOf0IcCYycsT3hb0-ziYzHm3Q&s=10',
    title: 'Everest Heli Tour Return',
    category: 'Helicopter & Scenic',
    location: 'Kala Patthar / Everest View',
    description: 'Thrilling aerial helicopter tour with close-up summit views.'
  },
  {
    id: 'c-13',
    url: '/images/suv_car.png',
    title: 'Toyota Fortuner 4x4 Offroad',
    category: 'Vehicles & Fleet',
    location: 'Mustang Off-Road Trail',
    description: 'Premium SUV ready for mountain expeditions across Nepal.'
  },
  {
    id: 'c-14',
    url: 'https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg',
    title: 'Mahindra Scorpio 4WD',
    category: 'Vehicles & Fleet',
    location: 'Muktinath Highway',
    description: 'Rugged 4x4 Jeep built for rugged Himalayan terrain.'
  },
  {
    id: 'c-15',
    url: 'https://www.toyota.com.sg/showroom/new-models/-/media/27acd1d10dfc4ad29f13efd4415627c0.jpg',
    title: 'Toyota Hiace Tourist Minibus',
    category: 'Vehicles & Fleet',
    location: 'Kathmandu to Pokhara Highway',
    description: 'Comfortable air-conditioned minibus for family and group travels.'
  },
  {
    id: 'c-16',
    url: '/vehicles/wedding car.avif',
    title: 'Luxury Wedding Car Fleet',
    category: 'Vehicles & Fleet',
    location: 'Kathmandu Valley',
    description: 'Elegantly decorated luxury cars for wedding celebrations.'
  }
];

const CATEGORIES = [
  'All',
  'Mountains & Treks',
  'Culture & Tours',
  'Scenic Destinations',
  'Vehicles & Fleet',
  'Helicopter & Scenic'
];

const Gallery = () => {
  const { galleryImages, treks, tourTrips, packages, vehicles, destinations } = useAppData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Aggregate all available images dynamically from AppDataContext + Curated static items
  const allCombinedImages = useMemo(() => {
    const items = [];
    const urlSet = new Set();

    const addUnique = (url, title, category, location, description) => {
      if (!url || typeof url !== 'string' || urlSet.has(url)) return;
      // Ignore placeholder broken image links if any
      if (url.includes('example.com') || url.trim() === '') return;

      urlSet.add(url);
      items.push({
        id: `img-${items.length + 1}`,
        url,
        title: title || 'Nepal Travel Highlight',
        category: category || 'Scenic Destinations',
        location: location || 'Nepal',
        description: description || 'Beautiful highlight from Zenex Travels & Tours.'
      });
    };

    // 1. Add admin galleryImages
    if (galleryImages && Array.isArray(galleryImages)) {
      galleryImages.forEach(g => {
        addUnique(g.url, g.title, g.category || 'Scenic Destinations', 'Nepal', 'Captured by Zenex Travels');
      });
    }

    // 2. Add curated showcase items
    CURATED_GALLERY_ITEMS.forEach(c => {
      addUnique(c.url, c.title, c.category, c.location, c.description);
    });

    // 3. Add Treks images
    if (treks && Array.isArray(treks)) {
      treks.forEach(t => {
        addUnique(t.image || t.img, t.title || t.name, 'Mountains & Treks', t.region ? `${t.region} Region` : 'Himalayas', t.overview || t.description);
        if (t.gallery && Array.isArray(t.gallery)) {
          t.gallery.forEach((gUrl, idx) => {
            addUnique(gUrl, `${t.title || t.name} - View ${idx + 1}`, 'Mountains & Treks', t.region || 'Himalayas', `Photos from ${t.title || t.name}`);
          });
        }
      });
    }

    // 4. Add Tour Trips images
    if (tourTrips && Array.isArray(tourTrips)) {
      tourTrips.forEach(t => {
        addUnique(t.image, t.title, 'Culture & Tours', t.destination || 'Nepal', t.summary);
        if (t.gallery && Array.isArray(t.gallery)) {
          t.gallery.forEach((gUrl, idx) => {
            addUnique(gUrl, `${t.title} - View ${idx + 1}`, 'Culture & Tours', t.destination || 'Nepal', `Sightseeing highlights of ${t.title}`);
          });
        }
      });
    }

    // 5. Add Packages images
    if (packages && Array.isArray(packages)) {
      packages.forEach(p => {
        const cat = p.category === 'helicopter' ? 'Helicopter & Scenic' : 'Culture & Tours';
        addUnique(p.img || p.image, p.title || p.name, cat, p.location || 'Nepal', p.description);
        if (p.gallery && Array.isArray(p.gallery)) {
          p.gallery.forEach((gUrl, idx) => {
            addUnique(gUrl, `${p.title || p.name} - Highlight ${idx + 1}`, cat, p.location || 'Nepal', `Tour photo from ${p.title}`);
          });
        }
      });
    }

    // 6. Add Destinations images
    if (destinations && Array.isArray(destinations)) {
      destinations.forEach(d => {
        addUnique(d.img || d.image, d.name || d.title, 'Scenic Destinations', d.region || 'Nepal', d.desc);
        if (d.gallery && Array.isArray(d.gallery)) {
          d.gallery.forEach((gUrl, idx) => {
            addUnique(gUrl, `${d.name || d.title} - View ${idx + 1}`, 'Scenic Destinations', d.name || 'Nepal', `Scenery in ${d.name}`);
          });
        }
      });
    }

    // 7. Add Vehicles images
    if (vehicles && Array.isArray(vehicles)) {
      vehicles.forEach(v => {
        addUnique(v.img, `${v.name} (${v.type || 'Vehicle'})`, 'Vehicles & Fleet', 'Nepal Fleet', `Zenex Travel high-quality ${v.name}`);
      });
    }

    return items;
  }, [galleryImages, treks, tourTrips, packages, vehicles, destinations]);

  // Filter based on selected category & search query
  const filteredImages = useMemo(() => {
    return allCombinedImages.filter(item => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.location.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [allCombinedImages, selectedCategory, searchQuery]);

  // Modal navigation handlers
  const openModal = (index) => setActiveModalIndex(index);
  const closeModal = () => setActiveModalIndex(null);

  const prevModal = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
    }
  };

  const nextModal = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevModal();
      if (e.key === 'ArrowRight') nextModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, filteredImages]);

  const currentModalItem = activeModalIndex !== null ? filteredImages[activeModalIndex] : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-20">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#0f172a] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e53a24_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#e53a24]/20 border border-[#e53a24]/40 text-red-300 font-semibold px-4 py-1.5 rounded-full text-xs md:text-sm uppercase tracking-wider mb-4">
              <Camera size={15} /> Visual Journey of Nepal
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              Our Journey & <span className="text-amber-400">Photo Gallery</span>
            </h1>
            <p className="text-gray-200 text-base sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Explore the breathtaking Himalayas, ancient cultural heritage, crystal blue lakes, off-road vehicle expeditions, and scenic helicopter flights captured by Zenex Travels & Tours.
            </p>
          </motion.div>

          {/* Quick Stats Pill */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <Camera size={16} className="text-amber-400" />
              <span><strong className="text-white font-bold">{allCombinedImages.length}+</strong> High-Res Photos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <Compass size={16} className="text-emerald-400" />
              <span><strong className="text-white font-bold">6</strong> Core Experience Categories</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <MapPin size={16} className="text-red-400" />
              <span><strong className="text-white font-bold">50+</strong> Destinations Across Nepal, Tibet & Bhutan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Controls: Search Bar & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-900/20 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] md:w-72 shrink-0">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent bg-slate-50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Gallery Results Count */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-sm font-semibold text-gray-600">
            Showing <span className="text-[#1e3a8a] font-bold">{filteredImages.length}</span> {filteredImages.length === 1 ? 'photo' : 'photos'} {selectedCategory !== 'All' ? `in "${selectedCategory}"` : ''}
          </p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-[#e53a24] hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Gallery Image Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <Camera size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-bold text-gray-700">No photos found</h3>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search terms or selecting a different category.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2 bg-[#1e3a8a] text-white font-semibold text-xs rounded-xl hover:bg-blue-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => openModal(index)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-64 md:h-72"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop';
                    }}
                  />

                  {/* Category Badge Pill */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20 shadow-sm z-10">
                    {item.category}
                  </span>

                  {/* Full Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                      <h3 className="font-bold text-base leading-tight mb-1 text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-300 line-clamp-2 mb-3 font-light">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/20 pt-2 text-xs font-semibold text-white/90">
                        <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                          <ZoomIn size={14} /> Click to expand
                        </span>
                        <span className="bg-[#e53a24] p-1.5 rounded-full text-white">
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && currentModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 z-50 border border-white/20"
              title="Close (Esc)"
            >
              <X size={24} />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={prevModal}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 border border-white/20"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={nextModal}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 border border-white/20"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={28} />
            </button>

            {/* Main Lightbox Content Card */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[88vh]"
            >
              {/* Image Frame */}
              <div className="md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-[500px]">
                <img
                  src={currentModalItem.url}
                  alt={currentModalItem.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
                
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-xl border border-white/10">
                  {activeModalIndex + 1} of {filteredImages.length}
                </span>
              </div>

              {/* Sidebar Info Panel */}
              <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-between bg-slate-900 text-white overflow-y-auto">
                <div>
                  <span className="inline-block bg-[#e53a24]/20 text-[#e53a24] text-xs font-bold px-3 py-1 rounded-lg border border-[#e53a24]/30 uppercase tracking-wider mb-3">
                    {currentModalItem.category}
                  </span>

                  <h2 className="text-2xl font-bold text-white mb-2 leading-snug">
                    {currentModalItem.title}
                  </h2>

                  <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
                    <MapPin size={16} />
                    <span>{currentModalItem.location}</span>
                  </div>

                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                    {currentModalItem.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <Link
                    to="/planner"
                    onClick={closeModal}
                    className="w-full flex items-center justify-center gap-2 bg-[#e53a24] hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-red-900/30"
                  >
                    <span>Customize This Trip</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to="/contact"
                    onClick={closeModal}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-gray-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors border border-white/10"
                  >
                    Inquire About Experience
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl border border-blue-900/30">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
              Inspired by these views? Let's turn photos into reality!
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 font-light">
              Whether you want a high-altitude trek, off-road Scorpio expedition, or luxury vehicle tour, Zenex Travels & Tours organizes complete tailormade itineraries across Nepal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/planner"
                className="bg-[#e53a24] hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Plan Your Custom Trip</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/vehicles"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-2xl backdrop-blur-md border border-white/20 transition-all text-sm sm:text-base"
              >
                Browse Fleet & Rentals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
