import React from 'react';
import SEO from '../components/SEO';
import { MessageCircle, ArrowLeft, Car, ShieldCheck, CheckCircle2, Route } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const models = [
  { name: 'Tata Nexon', day: 6000, days15: 80000, month: 150000 },
  { name: 'BYD Dolphin', day: 6000, days15: 80000, month: 160000 },
  { name: 'Skoda Kushaq', day: 6000, days15: 80000, month: 160000 },
  { name: 'Nami VIGO', day: 7000, days15: 90000, month: 170000 },
  { name: 'Seres 3', day: 6000, days15: 90000, month: 170000 },
  { name: 'Hyundai Venue', day: 7000, days15: 90000, month: 170000 },
  { name: 'MG (EV)', day: 7000, days15: 95000, month: 165000 },
  { name: 'Brezza', day: 7000, days15: 95000, month: 170000 },
  { name: 'BYD Atto 3', day: 8000, days15: 100000, month: 180000 },
  { name: 'Kia Seltos', day: 8000, days15: 90000, month: 170000 },
  { name: 'Volkswagen Polo', day: 5000, days15: 60000, month: 120000 },
  { name: 'Hyundai Creta', day: 8000, days15: 90000, month: 170000 },
  { name: 'Jecco J5', day: 7000, days15: 90000, month: 170000 }
];

const galleryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAOaHguRl2Bw0sfnTWEXtHm64fVnXOf5A9onFp3SSn7Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBG3xp5_0UQL07EbIuAj8J2FA73wUFWc8KEtCSUabJg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CQUP4HYJ07TbSMzFTuezs6NTRIpr1tMGY6lOMNaxRA&s=10",
  "https://autoncell.com/storage/x75I8HLAiD7oGljmNeNIBluVZz0fx3e8ip9g2mn4.webp"
];

const SelfDriveRates = () => {
  const { formatPrice } = useCurrency();

  const handleBook = (model, duration, price) => {
    const message = `Hi Zenex Travel, I'm interested in renting the ${model.name} for self-drive (${duration}) priced at ${formatPrice(price)}. Is it available?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20">
      <SEO 
        title="Self Drive Car Rates | Zenex Travels"
        description="View our self-drive car rental rates for daily, 15-day, and monthly rentals in Nepal."
      />
      
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[520px] w-full flex items-end pb-16 justify-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="Self Drive Cars"
            className="w-full h-full object-cover object-center"
            src="/vehicles/self drive.jpg"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://autoncell.com/storage/x75I8HLAiD7oGljmNeNIBluVZz0fx3e8ip9g2mn4.webp'; }}
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
                Drive Yourself
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                Self Drive Car Rates
              </h1>
              <p className="text-lg text-white/90 max-w-2xl font-medium drop-shadow-md">
                Experience total freedom on your journey. We offer flexible pricing for daily, bi-weekly, and monthly self-drive rentals across Nepal.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              <div className="text-white">
                <p className="text-sm text-white/70 font-semibold uppercase">Starting From</p>
                <p className="text-2xl font-black">{formatPrice(5000)} <span className="text-sm font-medium">/ Day</span></p>
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
                <img src={img} alt={`Self Drive Gallery ${idx + 1}`} className="max-w-full max-h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-blue-50 text-[#1e3a8a] p-2 rounded-lg"><Route size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
              <p className="font-bold text-gray-900">Total Freedom</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-green-50 text-green-600 p-2 rounded-lg"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Condition</p>
              <p className="font-bold text-gray-900">Well Maintained</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-orange-50 text-[#e53a24] p-2 rounded-lg"><span className="material-symbols-outlined text-[20px]">calendar_month</span></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Options</p>
              <p className="font-bold text-gray-900">Daily & Monthly</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-tint flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><CheckCircle2 size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Booking</p>
              <p className="font-bold text-gray-900">Flexible Terms</p>
            </div>
          </div>
        </div>

        {/* Rates Table */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-6 flex items-center gap-3">
            Rental Rates
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-0 overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-5 px-6 text-gray-500 font-bold uppercase tracking-wider text-sm">Vehicle Type</th>
                    <th className="text-center py-5 px-6 text-gray-500 font-bold uppercase tracking-wider text-sm">Per Day</th>
                    <th className="text-center py-5 px-6 text-gray-500 font-bold uppercase tracking-wider text-sm">15 Days</th>
                    <th className="text-center py-5 px-6 text-gray-500 font-bold uppercase tracking-wider text-sm">1 Month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {models.map((model, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="py-5 px-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-3 text-base group-hover:text-[#1e3a8a] transition-colors">
                          <div className="bg-red-50 text-[#e53a24] p-1.5 rounded-lg shrink-0">
                            <Car size={18} />
                          </div>
                          {model.name}
                        </h3>
                      </td>
                      <td className="py-5 px-6 text-center border-l border-gray-50">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="font-black text-[#1e3a8a] text-lg">{formatPrice(model.day)}</span>
                          <button onClick={() => handleBook(model, 'Daily', model.day)} className="text-xs font-bold bg-[#25D366]/10 text-[#1ebd5a] px-3 py-1.5 rounded-lg hover:bg-[#25D366] hover:text-white transition-colors flex items-center gap-1.5">
                            <MessageCircle size={14} /> Book
                          </button>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center border-l border-gray-50">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="font-black text-[#1e3a8a] text-lg">{formatPrice(model.days15)}</span>
                          <button onClick={() => handleBook(model, '15 Days', model.days15)} className="text-xs font-bold bg-[#25D366]/10 text-[#1ebd5a] px-3 py-1.5 rounded-lg hover:bg-[#25D366] hover:text-white transition-colors flex items-center gap-1.5">
                            <MessageCircle size={14} /> Book
                          </button>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center border-l border-gray-50">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="font-black text-[#1e3a8a] text-lg">{formatPrice(model.month)}</span>
                          <button onClick={() => handleBook(model, '1 Month', model.month)} className="text-xs font-bold bg-[#25D366]/10 text-[#1ebd5a] px-3 py-1.5 rounded-lg hover:bg-[#25D366] hover:text-white transition-colors flex items-center gap-1.5">
                            <MessageCircle size={14} /> Book
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
                  <ShieldCheck size={16} className="text-[#1e3a8a]" /> Terms and conditions apply for self-drive rentals. Security deposit may be required.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SelfDriveRates;
