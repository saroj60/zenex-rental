import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { MapPin, Calendar, MessageCircle, ArrowLeft, ShieldCheck, CheckCircle2, Users, Snowflake, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const fortunerImages = [
  "/images/Fortuner/001-2021-land-cruiser.webp",
  "/images/Fortuner/2021-Toyota-Fortuner-India-Launch-Image1.jpg",
  "/images/Fortuner/Armored-Toyota-Landcruiser.jpg",
  "/images/Fortuner/Toyota_Land_Cruiser_5.7L_EXR_1.jpg",
  "/images/Fortuner/front-left-side-47.avif",
  "/images/Fortuner/land-cruiser-exterior-right-front-three-quarter-3.avif",
  "/images/Fortuner/side-view-(left)-90.avif",
  "/images/Fortuner/toyota-fortuner-overview.jpg"
];

const FortunerRoutes = () => {
  const { formatPrice } = useCurrency();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % fortunerImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentImageIndex((prev) => (prev + 1) % fortunerImages.length);
  const prevSlide = () => setCurrentImageIndex((prev) => (prev - 1 + fortunerImages.length) % fortunerImages.length);

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20">
      <SEO 
        title="Toyota Land Cruiser & Fortuner Rentals | Zenex Travels"
        description="View custom pricing details for Toyota Land Cruiser & Fortuner 4x4 SUV rentals across Nepal including Pokhara, Chitwan, Muktinath, Janakpur and more."
      />
      
      {/* Dynamic Hero Slider */}
      <section className="relative h-[480px] md:h-[550px] w-full flex items-end pb-16 justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          {fortunerImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Blurred background backdrop */}
              <div 
                className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-40 scale-110"
                style={{ backgroundImage: `url("${img}")` }}
              />
              <img
                alt={`Toyota Land Cruiser & Fortuner Slide ${idx + 1}`}
                className="relative w-full h-full object-contain md:object-cover object-center transition-transform duration-700"
                src={img}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-[#e53a24] text-white backdrop-blur-md transition-all border border-white/20 shadow-lg hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-[#e53a24] text-white backdrop-blur-md transition-all border border-white/20 shadow-lg hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 shadow-md">
          {fortunerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentImageIndex ? 'w-7 bg-[#e53a24]' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8">
          <Link to="/vehicles" className="inline-flex items-center gap-2 text-white/80 font-bold mb-6 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Vehicles
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-block bg-[#e53a24] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-lg">
                Luxury 4x4 SUV
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                Toyota Land Cruiser & Fortuner
              </h1>
              <p className="text-lg text-white/90 max-w-2xl font-medium drop-shadow-md">
                Experience premium 4x4 power, luxury comfort, and unmatched reliability for your group and off-road travels across Nepal. Transparent flat rates for all routes.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              <div className="text-white">
                <p className="text-sm text-white/70 font-semibold uppercase">Pricing Option</p>
                <p className="text-2xl font-black">Custom Rates <span className="text-sm font-medium">/ On Request</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-6 relative z-20 pb-16">
        
        {/* Gallery Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Vehicle Gallery
          </h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {fortunerImages.map((img, idx) => (
              <div key={idx} className="relative w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden shadow-md group cursor-pointer border-2 border-transparent hover:border-[#1e3a8a] transition-all">
                <img src={img} alt={`Fortuner Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-blue-50 text-[#1e3a8a] p-2 rounded-lg"><Users size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Capacity</p>
              <p className="font-bold text-gray-900">7 Seats</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-green-50 text-green-600 p-2 rounded-lg"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Capability</p>
              <p className="font-bold text-gray-900">4x4 Heavy Duty</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-orange-50 text-[#e53a24] p-2 rounded-lg"><Snowflake size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Comfort</p>
              <p className="font-bold text-gray-900">Dual A/C Luxury</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><CheckCircle2 size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Driver</p>
              <p className="font-bold text-gray-900">Expert Mountain Driver</p>
            </div>
          </div>
        </div>

        {/* Custom Routes & Pricing Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60 -z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#e53a24] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-red-100 shadow-sm">
              Custom Booking Available
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-4">
              Custom Routes & Tailored Pricing
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed font-medium">
              We offer bespoke routing and flexible pricing tailored specifically to your travel plans. Whether you need a multi-day off-road expedition, luxury VIP transfers, or customized travel across Nepal in our Toyota Land Cruiser & Fortuner, contact us for an instant personalized quote.
            </p>

            {/* Custom Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-red-100 text-[#e53a24] rounded-xl flex items-center justify-center font-bold mb-3">
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-base">Any Destination in Nepal</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">From Kathmandu Valley sightseeing to remote off-road mountain passes.</p>
              </div>

              <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center font-bold mb-3">
                  <Calendar size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-base">Flexible Duration</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Single day rentals, airport transfers, or multi-week guided road trips.</p>
              </div>

              <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-base">Best Rate Guarantee</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Transparent pricing with no hidden charges, fuel, or driver extras.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.open(`https://wa.me/9779767476521?text=${encodeURIComponent("Hi Zenex Travel, I would like to request a custom route & price quote for Toyota Land Cruiser & Fortuner.")}`, '_blank')}
                className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-2xl hover:bg-[#1ebd5a] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-extrabold text-base active:scale-95"
              >
                <MessageCircle size={20} /> Request Custom Quote on WhatsApp
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FortunerRoutes;
