import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Mountain,
  Car
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import api from '../../services/api';

const DEFAULT_DESTINATIONS = [
  {
    id: 'kathmandu',
    name: 'Kathmandu Valley',
    location: 'Kathmandu Central Depot',
    tagline: 'Historic Temples & Bustling Capital',
    description: 'Explore UNESCO heritage squares, vibrant alleys, Swayambhunath, and scenic hill outskirts like Nagarkot.',
    image: '/landscapes/swayambhu.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    badge: 'Capital Hub',
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    location: 'Pokhara Lakeside Hub',
    tagline: 'Lake City & Annapurna Gateway',
    description: 'Cruise along Fewa Lake, witness sunrise at Sarangkot, and soak in breathtaking views of Machapuchare peak.',
    image: '/landscapes/phewa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular',
  },
  {
    id: 'mustang',
    name: 'Mustang (Jomsom)',
    location: 'Mustang (Jomsom Depot)',
    tagline: 'Forbidden Kingdom & Tibetan Plateau',
    description: 'Epic off-road overland journey across deep Kali Gandaki gorges, Muktinath temple, and windswept landscapes.',
    image: '/landscapes/annapurna.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80',
    badge: 'High Altitude 4x4',
  },
  {
    id: 'chitwan',
    name: 'Chitwan National Park',
    location: 'Chitwan (Sauraha)',
    tagline: 'Subtropical Jungle Safari',
    description: 'Home of the endangered One-horned Rhino, Royal Bengal Tiger, canoe rides, and relaxing Tharu cultural experiences.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    badge: 'Wildlife Safari',
  },
  {
    id: 'lumbini',
    name: 'Lumbini Sacred Garden',
    location: 'Lumbini Peace Park',
    tagline: 'Birthplace of Lord Buddha',
    description: 'Spiritual pilgrimage visiting the sacred Mayadevi Temple, Ashoka Pillar, and world peace international monasteries.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'UNESCO Heritage',
  },
  {
    id: 'janakpur',
    name: 'Janakpur Dham',
    location: 'Janakpur City Center',
    tagline: 'City of Mithila Art & Culture',
    description: 'Marvel at the stunning architecture of Janaki Mandir, sacred royal ponds, vibrant evening aarti, and Mithila arts.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    badge: 'Cultural Heart',
  },
];

export default function ExploreNepalSection() {
  const navigate = useNavigate();
  const { setPickupLocation, setDropoffLocation } = useBooking();

  const [destinations, setDestinations] = useState(DEFAULT_DESTINATIONS);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get('/destinations');
        if (res.data?.data && res.data.data.length > 0) {
          setDestinations(res.data.data);
        }
      } catch {
        // Fallback to static rich list
      }
    };
    fetchDestinations();
  }, []);

  const handleSelectDestination = (dest) => {
    // Prefill pickup location with destination hub
    setPickupLocation(dest.location || dest.name);
    setDropoffLocation(dest.location || dest.name);
    navigate('/cars');
  };

  return (
    <section id="destinations" className="py-20 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#0755C9] text-xs font-black uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Epic Road Trips Across Nepal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#10243A] tracking-tight">
              Explore Nepal's Iconic Destinations
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium mt-1 max-w-xl">
              From peaceful lakeside drives to rugged Himalayan passes, choose your next stop and we will provide the perfect car.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/cars')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-2xs hover:shadow-sm transition-all"
          >
            <span>Custom Highway Routes</span>
            <ArrowRight className="w-4 h-4 text-[#0755C9]" />
          </button>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {destinations.map((d) => (
            <div
              key={d.id}
              className="group bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Photo Box */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = d.fallbackImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#0755C9] shadow-md">
                    {d.badge || 'Nepal Destination'}
                  </span>
                </div>

                {/* Overlay Name & Tagline */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{d.name}</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-white leading-tight">
                    {d.tagline}
                  </h3>
                </div>
              </div>

              {/* Body & CTA */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {d.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">
                    Depot: <b className="text-slate-700">{d.location || d.name}</b>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSelectDestination(d)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-[#0755C9] text-[#0755C9] hover:text-white font-extrabold text-xs transition-all shadow-2xs group-hover:bg-[#0755C9] group-hover:text-white cursor-pointer"
                  >
                    <span>Explore Cars</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
