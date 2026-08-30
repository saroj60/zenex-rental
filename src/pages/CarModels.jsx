import React from 'react';
import SEO from '../components/SEO';
import { Car, MessageCircle, ArrowLeft, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const models = [
  { name: 'BYD Dolphin', price: 9000 },
  { name: 'BYD Atto 3', price: 13000 },
  { name: 'Kia Seltos', price: 12000 },
  { name: 'Hyundai Venue', price: 11000 },
  { name: 'Maruti Suzuki Brezza', price: 12000 },
  { name: 'Hyundai Creta', price: 13000 },
  { name: 'Omoda', price: 12000 },
  { name: 'Seres 3', price: 12000 },
  { name: 'MG SUV', price: 12000 },
  { name: 'Skoda', price: 11000 },
  { name: 'Tata Nexon', price: 8000 },
  { name: 'Swift Dzire', price: 9000 },
  { name: 'Nami Vigo', price: 12000 },
  { name: 'Deepal SO5', price: 16000 },
  { name: 'Deepal SO7', price: 18000 },
  { name: 'Deepal Avatar', price: 30000 },
  { name: 'Mercedes', price: 28000 },
  { name: 'Volkswagen Beetle', price: 28000 },
  { name: 'Toyota Landcruiser', price: 40000 },
  { name: 'Toyota Hiace (Wedding)', price: 8000 },
  { name: 'Normal 30 Seater Bus', price: 10000 },
  { name: '35 Seater Tourist Bus', price: 17000 }
];

const galleryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8CZG6TpisCO4Y-ZnRPy3U6eQtyNxJ0kfqS56wnxJea-sLrxaEXaN0S2p&s=10",
  "https://www.vivaanadventure.com/wp-content/uploads/2021/03/received_1697574793740466.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQvfiRo6ZKudQCPdfbbLwSWnmgjxHxr0I0Hcly_tAuSA&s=10"
];

const CarModels = () => {
  const { formatPrice } = useCurrency();

  const handleBook = (model) => {
    const message = `Hi Zenex Travel, I'm interested in renting the ${model.name} for a wedding priced at ${formatPrice(model.price)} / Day. Is it available?`;
    window.open(`https://wa.me/9779860156046?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20">
      <SEO 
        title="Wedding Car Models | Zenex Travels"
        description="View pricing details for our specific wedding car models including BYD, Mercedes, Landcruiser, and more."
      />
      
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[520px] w-full flex items-end pb-16 justify-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="Wedding Cars"
            className="w-full h-full object-cover object-center"
            src="/vehicles/wedding car.avif"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://www.vivaanadventure.com/wp-content/uploads/2021/03/received_1697574793740466.jpeg'; }}
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
                Special Event
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                Wedding Car Fleet
              </h1>
              <p className="text-lg text-white/90 max-w-2xl font-medium drop-shadow-md">
                Make your special day truly unforgettable with our exclusive fleet of luxury and premium vehicles, perfectly maintained and chauffeur-driven.
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
              <div key={idx} className="relative w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden shadow-md group cursor-pointer border-2 border-transparent hover:border-[#1e3a8a] transition-all bg-gray-50 flex items-center justify-center">
                <img src={img} alt={`Wedding Car Gallery ${idx + 1}`} className="max-w-full max-h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-blue-50 text-[#1e3a8a] p-2 rounded-lg"><Star size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
              <p className="font-bold text-gray-900">Luxury Models</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-green-50 text-green-600 p-2 rounded-lg"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Condition</p>
              <p className="font-bold text-gray-900">Pristine</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-orange-50 text-[#e53a24] p-2 rounded-lg"><span className="material-symbols-outlined text-[20px]">local_florist</span></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Extras</p>
              <p className="font-bold text-gray-900">Decor Available</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><CheckCircle2 size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Service</p>
              <p className="font-bold text-gray-900">Chauffeur Driven</p>
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-6 flex items-center gap-3">
            Vehicle Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="bg-red-50 text-[#e53a24] p-2 rounded-lg shrink-0 mt-1">
                      <Car size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-[#1e3a8a] transition-colors pr-2">
                        {model.name}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Per Day</span>
                    <span className="font-black text-[#1e3a8a] text-xl">{formatPrice(model.price)}</span>
                  </div>
                  <button 
                    onClick={() => handleBook(model)}
                    className="bg-[#25D366] text-white p-3 rounded-xl hover:bg-[#1ebd5a] transition-all shadow-sm hover:shadow-md flex items-center justify-center font-bold active:scale-95 shrink-0"
                  >
                    <MessageCircle size={18} />
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
                <h4 className="font-bold text-[#1e3a8a] text-lg">Special requirements?</h4>
                <p className="text-sm text-blue-900/80 font-medium">We can arrange specific vehicles, floral decorations, and multi-car convoys for your wedding.</p>
              </div>
            </div>
            <button 
              onClick={() => window.open(`https://wa.me/9779860156046?text=${encodeURIComponent("Hi Zenex Travel, I would like to request a custom quote for wedding vehicles.")}`, '_blank')}
              className="w-full sm:w-auto bg-[#1e3a8a] text-white px-6 py-3 rounded-xl hover:bg-[#152c6e] transition-colors font-bold whitespace-nowrap"
            >
              Contact Event Team
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CarModels;
