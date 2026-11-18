import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Users,
  Plane,
  Compass,
  Sun,
  Briefcase,
  Sparkles,
  Gift,
  Music,
  Activity,
  Camera,
  Bus,
  ArrowRight,
  Car,
  ChevronRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import api from '../../services/api';

const OCCASIONS_FALLBACK = [
  {
    id: 'wedding',
    title: 'Wedding & Marriage',
    tagline: 'Ceremonial bride & groom luxury',
    description: 'Luxury executive sedans, decorated bridal cruisers, and convoy SUVs for sacred Nepali marriages and grand receptions.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    highlights: ['Wedding ceremonies', 'Bride & groom transit', 'Reception convoy'],
    badge: 'Luxury Convoy',
    vehicleCount: 4,
  },
  {
    id: 'family-trip',
    title: 'Family Trips & Vacations',
    tagline: 'Holidays, picnics & road trips',
    description: 'Spacious 5-7 seater SUVs and comfortable crossovers with ample luggage room for peaceful family getaways.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    highlights: ['Family holidays', 'Weekend highway trips', 'Picnics & road tours'],
    badge: 'Spacious Comfort',
    vehicleCount: 5,
  },
  {
    id: 'airport-transfer',
    title: 'Airport Pickup & Drop',
    tagline: 'Punctual Tribhuvan & Pokhara hubs',
    description: 'Flight-tracked airport transfers with luggage assistance and meet-and-greet service to Kathmandu TIA or Pokhara Airport.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    highlights: ['Airport transfers', 'Tourist reception', 'Guest transportation'],
    badge: '24/7 Punctual',
    vehicleCount: 5,
  },
  {
    id: 'tourism',
    title: 'Tourism & Sightseeing',
    tagline: 'Kathmandu, Pokhara, Chitwan & Mustang',
    description: 'Rugged 4WDs and panoramic tour vehicles equipped for highway hills, jungle safari tracks, and high Himalayan vistas.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    highlights: ['Kathmandu & Pokhara', 'Chitwan & Lumbini', 'Mustang Overland'],
    badge: '4x4 Offroad',
    vehicleCount: 6,
  },
  {
    id: 'pilgrimage',
    title: 'Religious Trips & Pilgrimage',
    tagline: 'Muktinath, Pashupati, Manakamana & Janakpur',
    description: 'Reliable high-altitude and holy shrine transportation for elders and spiritual groups with experienced mountain chauffeurs.',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80',
    highlights: ['Pashupatinath & Janakpur', 'Muktinath 4WD', 'Manakamana & Lumbini'],
    badge: 'Holy Circuits',
    vehicleCount: 4,
  },
  {
    id: 'corporate',
    title: 'Business & Corporate Travel',
    tagline: 'Delegations, summits & meetings',
    description: 'Discreet executive sedans and premium EVs featuring clean climate control, Wi-Fi, and corporate VAT invoicing.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    highlights: ['Business meetings', 'Corporate guests', 'Conferences & visits'],
    badge: 'Executive Class',
    vehicleCount: 4,
  },
  {
    id: 'special-celebration',
    title: 'Birthday & Special Celebrations',
    tagline: 'Anniversaries, proposals & surprises',
    description: 'Make milestone moments unforgettable with polished luxury rides and scenic evening drive chauffeuring.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    highlights: ['Birthdays & milestones', 'Anniversaries', 'Romantic proposals'],
    badge: 'Special Moments',
    vehicleCount: 4,
  },
  {
    id: 'festivals',
    title: 'Festivals & Family Gatherings',
    tagline: 'Dashain, Tihar, Chhath & reunions',
    description: 'Dependable outstation holiday rentals to travel home safely across Nepal during high-demand festival seasons.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    highlights: ['Dashain & Tihar', 'Chhath & Holi', 'Family reunions'],
    badge: 'Festive Season',
    vehicleCount: 4,
  },
  {
    id: 'events',
    title: 'Events & Parties',
    tagline: 'Concerts, conventions & cultural galas',
    description: 'Coordinated event transit for VIP guests, artists, organizers, and evening gala attendees across Kathmandu and Pokhara.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    highlights: ['Concerts & festivals', 'Cultural programs', 'Exhibitions & expos'],
    badge: 'VIP Logistics',
    vehicleCount: 3,
  },
  {
    id: 'medical-travel',
    title: 'Medical & Emergency Travel',
    tagline: 'Hospital visits, checkups & clinics',
    description: 'Prompt, sanitized and smooth-riding vehicles for safe hospital transit, clinical follow-ups, and urgent family travel.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hospital visits', 'Medical checkups', 'Urgent family transit'],
    badge: 'Priority Support',
    vehicleCount: 3,
  },
  {
    id: 'photoshoot',
    title: 'Photoshoots & Film Production',
    tagline: 'Pre-wedding, music videos & cinema',
    description: 'Photogenic off-roaders, rugged 4x4s, and classic prestige cars ideal for cinematic visuals and fashion shoots.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    highlights: ['Pre-wedding shoots', 'Music videos & ads', 'Film productions'],
    badge: 'Cinematic Ready',
    vehicleCount: 4,
  },
  {
    id: 'group-travel',
    title: 'Group Travel',
    tagline: 'Friends outings, college & corporate teams',
    description: 'High-capacity 14-seater Toyota Hiaces and tourist mini-coaches with high roofs and oversized luggage bays.',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80',
    highlights: ["Friends' trips", 'School & college tours', 'Team outings'],
    badge: '14-16 Seaters',
    vehicleCount: 3,
  },
];

const OCCASION_ICONS = {
  wedding: Heart,
  'family-trip': Users,
  'airport-transfer': Plane,
  tourism: Compass,
  pilgrimage: Sun,
  corporate: Briefcase,
  'special-celebration': Sparkles,
  festivals: Gift,
  events: Music,
  'medical-travel': Activity,
  photoshoot: Camera,
  'group-travel': Bus,
};

export default function OccasionsSection() {
  const navigate = useNavigate();
  const { pickupLocation, dropoffLocation, startDate, endDate, rentalType } = useBooking();

  const [occasions, setOccasions] = useState(OCCASIONS_FALLBACK);
  const [loading, setLoading] = useState(true);

  // Fetch occasions with real vehicle counts from MongoDB
  useEffect(() => {
    let isCancelled = false;
    const fetchOccasions = async () => {
      try {
        const res = await api.get('/vehicles/occasions', {
          params: { startDate, endDate },
        });
        if (!isCancelled && res.data?.data && res.data.data.length > 0) {
          setOccasions(res.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic occasion counts, using fallback data:', err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchOccasions();
    return () => {
      isCancelled = true;
    };
  }, [startDate, endDate]);

  // Navigate to Explore Cars with the selected occasion, preserving active booking filters
  const handleSelectOccasion = (occasionId) => {
    const params = new URLSearchParams();
    params.set('occasion', occasionId);
    if (pickupLocation) params.set('pickupLocation', pickupLocation);
    if (dropoffLocation) params.set('dropoffLocation', dropoffLocation);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (rentalType) params.set('rentalType', rentalType);

    navigate(`/cars?${params.toString()}`);
  };

  return (
    <section
      id="occasions"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F5F8FC] via-white to-[#F5F8FC] border-t border-slate-200/60 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#0755C9] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Rental Solutions</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#10243A] tracking-tight">
            A Car for Every Occasion
          </h2>

          <p className="text-slate-600 text-xs sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Whatever the occasion, find the perfect ride for your journey across Nepal.
          </p>
        </div>

        {/* 12 Occasion Cards Grid: 4 cols on desktop, 3 on md, 2 on mobile/tablet */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {occasions.map((occ) => {
            const IconComponent = OCCASION_ICONS[occ.id] || Car;
            return (
              <div
                key={occ.id}
                onClick={() => handleSelectOccasion(occ.id)}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-[#0755C9]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Container with Consistent Aspect Ratio & Smooth Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={occ.image}
                    alt={occ.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none"></div>

                  {/* Occasion Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm">
                    <IconComponent className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{occ.badge || 'Verified'}</span>
                  </div>

                  {/* Real-Time Vehicle Count Badge */}
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2 py-0.5 rounded-lg bg-emerald-500/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-black shadow-xs flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    <span>{occ.vehicleCount || 3} Vehicles</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-sm sm:text-base font-black text-[#10243A] group-hover:text-[#0755C9] transition-colors leading-tight line-clamp-1">
                      {occ.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {occ.description}
                    </p>

                    {/* Bullet Highlights (2 tags) */}
                    <div className="pt-1 flex flex-wrap gap-1 sm:gap-1.5">
                      {(occ.highlights || []).slice(0, 2).map((hl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 text-[10px] font-semibold truncate max-w-full"
                        >
                          • {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link / Button at Bottom */}
                  <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0755C9] group-hover:text-blue-700">
                    <span className="flex items-center gap-1">
                      <span>Explore Vehicles</span>
                    </span>
                    <div className="w-6 h-6 rounded-full bg-blue-50 group-hover:bg-[#0755C9] group-hover:text-white flex items-center justify-center transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick CTA */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#10243A] via-[#0E2A4F] to-[#0755C9] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-blue-950/10">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-black text-white">
              Planning a Custom Route or Event?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              We provide custom fleet coordination, bridal decorations, and multiple driver dispatches.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/cars')}
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-xl bg-white text-[#0755C9] hover:bg-blue-50 active:scale-[0.98] font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>Browse Complete Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
