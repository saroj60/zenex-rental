import React from 'react';
import { ShieldCheck, Wrench, Headphones, Award } from 'lucide-react';

const TrustSafety = () => {
  return (
    <section className="reveal reveal-up bg-[#F4F6F8] py-20 px-4 md:px-8 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[32px] font-extrabold text-[#1e3a8a] mb-4">Travel with Absolute Confidence</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium mb-10">We exceed industry standards to ensure every mile of your journey through Nepal is safe, secure, and stress-free.</p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-8 py-6 bg-white rounded-2xl shadow-sm border border-gray-100 px-4">
            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
              <span className="font-extrabold text-xl text-gray-800">TripAdvisor</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Travelers' Choice 2026</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
              <span className="font-extrabold text-xl text-gray-800">Google Rating</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">5/5 Verified</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
              <span className="font-extrabold text-xl text-gray-800">Est. 2025</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">2+ years of experience</span>
            </div>
            <div className="hidden lg:block w-px h-10 bg-gray-200"></div>
            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
              <span className="font-extrabold text-xl text-[#e53a24]">Winner</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Best Car Rental Nepal</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white px-6 py-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 mb-6">
              <ShieldCheck size={26} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-[17px] text-gray-900 mb-3">Comprehensive Insurance</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Every rental includes premium collision damage waiver and third-party liability protection as standard.</p>
          </div>

          <div className="bg-white px-6 py-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 mb-6">
              <Wrench size={26} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-[17px] text-gray-900 mb-3">50-Point Inspections</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Our certified mechanics perform rigorous safety checks on tires, brakes, and fluids before every single dispatch.</p>
          </div>

          <div className="bg-white px-6 py-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
              <Award size={26} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-[17px] text-gray-900 mb-3">Verified Expert Drivers</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Our chauffeurs possess extensive mountain driving experience, background checks, and valid tourist-grade licenses.</p>
          </div>

          <div className="bg-white px-6 py-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
              <Headphones size={26} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-[17px] text-gray-900 mb-3">24/7 Roadside Assist</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Flat tire in Mustang? Engine trouble in Chitwan? Our rapid response network covers you anywhere in Nepal.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSafety;

