import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Calendar, MessageCircle, ArrowLeft, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const routes = [
  { dest: 'Kathmandu Sightseeing', duration: '1 Day', price: 8000 },
  { dest: 'KTM to Dupcheshwor Mahadev Darshan', duration: '1 Day', price: 12000 },
  { dest: 'KTM to Halesi Mahadev Darshan', duration: '2 Days', price: 25000 },
  { dest: 'KTM to Pokhara', duration: '2N/3D', price: 32000 },
  { dest: 'KTM to Pokhara', duration: '4 Days', price: 40000 },
  { dest: 'KTM to Pokhara & Chitwan', duration: '4 Days', price: 48000 },
  { dest: 'KTM to Kalinchowk', duration: '1N/2D', price: 25000 },
  { dest: 'KTM to Dhulikhel', duration: '1 Day', price: 8000 },
  { dest: 'KTM to Namobuddha', duration: '1 Day', price: 10000 },
  { dest: 'KTM to Besisahar Drop', duration: 'Drop Off', price: 18000 },
  { dest: 'Airport Pick up', duration: 'Pick Up', price: 3000 },
  { dest: 'KTM to Manakamana Darshan', duration: '1 Day', price: 13000 },
  { dest: 'KTM to Muktinath Darshan', duration: '4 Days', price: 55000 },
  { dest: 'KTM to Pokhara Drop', duration: 'Drop Off', price: 20000 },
  { dest: 'KTM to Pathibhara', duration: '5 Days', price: 70000 },
  { dest: 'KTM to Upper Mustang', duration: 'Multi-day', price: 75000 },
  { dest: 'KTM to Kalinchowk & Jiri', duration: '2N/3D', price: 35000 },
  { dest: 'KTM to Rara Lake Tour', duration: 'Multi-day', price: 105000 },
  { dest: 'KTM to Manang', duration: '5 Days', price: 70000 },
  { dest: 'KTM to Chame Drop', duration: 'Drop Off', price: 40000 },
  { dest: 'KTM to Pokhara, Ghandruk', duration: '4 Days', price: 48000 }
];

const galleryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmgftVaf1QfhTnOyffarA3_Ce0T-eEiypS2f1X_dSLKduufaTE1bfCak&s=10",
  "https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg",
  "https://images.hindustantimes.com/auto/img/2022/09/06/1600x900/Mahindra_Scorpio_Classic_review_1662168947639_1662442851152_1662443416695_1662443416695.jpg",
  "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10765/1754638266191/front-right-view-120.jpg"
];

const ScorpioRoutes = () => {
  const { formatPrice } = useCurrency();

  const handleBook = (route) => {
    const message = `Hi Zenex Travel, I'm interested in booking a Mahindra Scorpio for the route: ${route.dest} (${route.duration}) priced at ${formatPrice(route.price)}. Is it available?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20">
      <SEO 
        title="Mahindra Scorpio Route Pricing | Zenex Travels"
        description="View pricing details for all Mahindra Scorpio routes across Nepal including Pokhara, Mustang, Rara Lake and more."
      />
      
      {/* Hero Section */}
      <section className="relative h-[400px] w-full flex items-end pb-12 justify-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="Mahindra Scorpio"
            className="w-full h-full object-cover object-center"
            src="https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/30"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
          <Link to="/vehicles" className="inline-flex items-center gap-2 text-white/80 font-bold mb-6 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Vehicles
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-block bg-[#e53a24] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-lg">
                Premium SUV / 4x4
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                Mahindra Scorpio Routes
              </h1>
              <p className="text-lg text-white/90 max-w-2xl font-medium drop-shadow-md">
                Tackle Nepal's rugged terrain with ease. The perfect 4x4 SUV for Upper Mustang, Rara Lake, and all major destinations with transparent, flat-rate pricing.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              <div className="text-white">
                <p className="text-sm text-white/70 font-semibold uppercase">Starting From</p>
                <p className="text-2xl font-black">{formatPrice(8000)} <span className="text-sm font-medium">/ Day</span></p>
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
                <img src={img} alt={`Scorpio Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
              <p className="font-bold text-gray-900">4x4 Off-Road</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-orange-50 text-[#e53a24] p-2 rounded-lg"><span className="material-symbols-outlined text-[20px]">ac_unit</span></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Comfort</p>
              <p className="font-bold text-gray-900">Powerful A/C</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><CheckCircle2 size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Driver</p>
              <p className="font-bold text-gray-900">Expert Guide</p>
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
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-1">
                        <Calendar size={14} /> {route.duration}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Total Price</span>
                    <span className="font-black text-[#1e3a8a] text-xl">{formatPrice(route.price)}</span>
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
                <h4 className="font-bold text-[#1e3a8a] text-lg">Don't see your route?</h4>
                <p className="text-sm text-blue-900/80 font-medium">We offer custom routes and multi-day packages. Contact us for a personalized quote.</p>
              </div>
            </div>
            <button 
              onClick={() => window.open(`https://wa.me/9779767476521?text=${encodeURIComponent("Hi Zenex Travel, I would like to request a custom quote for a Mahindra Scorpio.")}`, '_blank')}
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

export default ScorpioRoutes;
