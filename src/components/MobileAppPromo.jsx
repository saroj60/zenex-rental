import React from 'react';
import { MapPin, Smartphone, CreditCard, Clock, Apple, Play } from 'lucide-react';

const MobileAppPromo = () => {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 mb-20">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0a2f4c] rounded-[2rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EA580C]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 flex-1">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            Mobile Experience
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Book Faster with the <span className="text-[#EA580C]">NepalDrive</span> App
          </h3>
          
          <ul className="mb-10 space-y-4">
            <li className="flex items-center gap-4 text-lg text-blue-50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-[#EA580C]"/>
              </div>
              <span className="font-medium">Instant real-time booking</span>
            </li>
            <li className="flex items-center gap-4 text-lg text-blue-50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-[#EA580C]"/>
              </div>
              <span className="font-medium">Live driver GPS tracking</span>
            </li>
            <li className="flex items-center gap-4 text-lg text-blue-50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Smartphone size={20} className="text-[#EA580C]"/>
              </div>
              <span className="font-medium">Comprehensive trip management</span>
            </li>
            <li className="flex items-center gap-4 text-lg text-blue-50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CreditCard size={20} className="text-[#EA580C]"/>
              </div>
              <span className="font-medium">Secure digital payments</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg">
              <Apple size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase text-gray-500 font-bold leading-none mb-1">Download on the</div>
                <div className="text-base leading-none">App Store</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-colors shadow-lg">
              <Play size={24} className="fill-current" />
              <div className="text-left">
                <div className="text-[10px] uppercase text-gray-300 font-bold leading-none mb-1">Get it on</div>
                <div className="text-base leading-none">Google Play</div>
              </div>
            </button>
          </div>

        </div>
        
        <div className="relative z-10 w-64 md:w-72 flex-shrink-0 hidden sm:block perspective-1000">
          <div className="relative rounded-[2.5rem] border-[8px] border-gray-900 shadow-[0_0_50px_rgba(30,58,138,0.5)] overflow-hidden bg-white aspect-[9/19] transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
            {/* Screen Content */}
            <img 
              src="https://images.unsplash.com/photo-1618587370335-7c0b021d7b6d?auto=format&fit=crop&q=80&w=400" 
              alt="NepalDrive App" 
              className="w-full h-full object-cover relative z-10" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 flex flex-col justify-end p-6">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold">
                    ND
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Your Driver</p>
                    <p className="text-sm font-bold text-gray-900">Arriving in 3 min</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="w-3/4 bg-[#EA580C] h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MobileAppPromo;
