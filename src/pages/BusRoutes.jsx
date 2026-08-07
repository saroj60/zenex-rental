import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Calendar, MessageCircle, ArrowLeft, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const routes = [
  { dest: 'Kathmandu Sightseeing', duration: '1 Day', price: 15000, seats: '35 Seater' },
  { dest: 'KTM to Pokhara', duration: '2N/3D', price: 75000, seats: '35 Seater' },
  { dest: 'KTM to Pokhara & Chitwan', duration: '4 Days', price: 95000, seats: '35 Seater' },
  { dest: 'KTM to Dhulikhel', duration: '1 Day', price: 25000, seats: '35 Seater' },
  { dest: 'KTM to Namobuddha', duration: '1 Day', price: 30000, seats: '35 Seater' },
  { dest: 'KTM to Besisahar Drop', duration: 'Drop Off', price: 45000, seats: '35 Seater' },
  { dest: 'KTM to Muktinath Darshan', duration: '4 Days', price: 85000, seats: '30 Seater' },
  { dest: 'KTM to Pokhara Drop', duration: 'Drop Off', price: 45000, seats: '35 Seater' },
  { dest: 'KTM to Pathibhara', duration: '5 Days', price: 125000, seats: '30 Seater' },
  { dest: 'KTM to Upper Mustang', duration: '6 Days', price: 125000, seats: '30 Seater' },
  { dest: 'KTM to Pokhara, Ghandruk', duration: '4 Days', price: 65000, seats: '30 Seater' },
  { dest: 'KTM to Chitwan Drop', duration: 'Drop Off', price: 45000, seats: '35 Seater' },
  { dest: 'KTM to Nagarkot', duration: '1 Day', price: 25000, seats: '35 Seater' },
  { dest: 'KTM to Pokhara, Chitwan, Lumbini, Palpa', duration: '6 Days', price: 130000, seats: '30 Seater' },
  { dest: 'KTM to Kalinchowk', duration: '2 Days', price: 38000, seats: '30 Seater' },
  { dest: 'KTM to Sikkim, Darjeeling', duration: '5 Days', price: '85,000 - 125,000', seats: '30 Seater' },
  { dest: 'KTM to Dupcheshwor Mahadev', duration: '1 Day', price: 22000, seats: '30 Seater' },
  { dest: 'KTM to Halesi Mahadev Temple', duration: '2 Days', price: 45000, seats: '30 Seater' }
];

const galleryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdg3_UvWEPHQouJ-9lyCfgrzZJxSSwjZVOodJC50OSs62dSSTlEjOni5E&s=10",
  "https://img.12go.asia/0/plain/s3://12go-web-static/static/images/operator/28480/class/4807-outside.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDEI2rGPgnfDSiphdpUj3vrIbQtp1OwedNKJL7cC7aCQrO-QnrMRbgWZt&s=10",
  "https://tourpokhara.com/wp-content/uploads/2023/09/Tourist-bus.jpg"
];

const BusRoutes = () => {
  const { formatPrice } = useCurrency();

  const displayPrice = (price) => {
    if (typeof price === 'number') {
      return formatPrice(price);
    }
    return `Rs. ${price}`; // Handle string ranges
  };

  const handleBook = (route) => {
    const message = `Hi Zenex Travel, I'm interested in booking a Tourist Bus (${route.seats}) for the route: ${route.dest} (${route.duration}) priced at ${displayPrice(route.price)}. Is it available?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20">
      <SEO 
        title="Tourist Bus Route Pricing | Zenex Travels"
        description="View pricing details for all Tourist Bus (30-35 Seater) routes across Nepal."
      />
      
      {/* Hero Section */}
      <section className="relative h-[400px] w-full flex items-end pb-12 justify-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="Tourist Bus"
            className="w-full h-full object-cover object-center"
            src="https://tourpokhara.com/wp-content/uploads/2023/09/Tourist-bus.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
          <Link to="/vehicles" className="inline-flex items-center gap-2 text-white/80 font-bold mb-6 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Vehicles
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-block bg-[#e53a24] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-lg">
                Large Group Travel
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                Tourist Bus Routes
              </h1>
              <p className="text-lg text-white/90 max-w-2xl font-medium drop-shadow-md">
                The ultimate solution for large groups, schools, and corporate retreats. Enjoy spacious sofa seating and premium A/C on long journeys.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              <div className="text-white">
                <p className="text-sm text-white/70 font-semibold uppercase">Starting From</p>
                <p className="text-2xl font-black">{formatPrice(15000)} <span className="text-sm font-medium">/ Day</span></p>
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
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden shadow-md group cursor-pointer border-2 border-transparent hover:border-[#1e3a8a] transition-all">
                <img src={img} alt={`Bus Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
              <p className="font-bold text-gray-900">30-35 Seats</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-green-50 text-green-600 p-2 rounded-lg"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Seating</p>
              <p className="font-bold text-gray-900">Sofa Seats</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-orange-50 text-[#e53a24] p-2 rounded-lg"><span className="material-symbols-outlined text-[20px]">ac_unit</span></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Comfort</p>
              <p className="font-bold text-gray-900">Premium A/C</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><CheckCircle2 size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Driver</p>
              <p className="font-bold text-gray-900">Professional</p>
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-6 flex items-center gap-3">
            Pricing & Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-red-50 text-[#e53a24] p-2 rounded-lg shrink-0 mt-1">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-[#1e3a8a] transition-colors">
                        {route.dest}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {route.duration}</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] uppercase font-bold tracking-wider border border-gray-200">{route.seats}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Total Price</span>
                    <span className="font-black text-[#1e3a8a] text-xl">{displayPrice(route.price)}</span>
                  </div>
                  <button 
                    onClick={() => handleBook(route)}
                    className="bg-[#25D366] text-white px-4 py-2.5 rounded-xl hover:bg-[#1ebd5a] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-bold text-sm active:scale-95"
                  >
                    <MessageCircle size={16} /> Book
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 bg-blue-50 rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#1e3a8a] text-white p-3 rounded-full hidden sm:block">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#1e3a8a] text-lg">Need multiple buses?</h4>
                <p className="text-sm text-blue-900/80 font-medium">We can accommodate large corporate groups and school trips. Contact us for fleet booking.</p>
              </div>
            </div>
            <button 
              onClick={() => window.open(`https://wa.me/9779767476521?text=${encodeURIComponent("Hi Zenex Travel, I would like to request a custom quote for Tourist Buses for a large group.")}`, '_blank')}
              className="w-full sm:w-auto bg-[#1e3a8a] text-white px-6 py-3 rounded-xl hover:bg-[#152c6e] transition-colors font-bold whitespace-nowrap"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BusRoutes;
