import React, { useEffect } from 'react';
import { ArrowRight, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { packages } = useAppData();

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#0a2f4c] pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl rounded-full translate-x-1/2 -translate-y-1/4"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center bg-blue-900/50 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            <Map size={16} className="mr-2" /> All-Inclusive Itineraries
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Curated <span className="text-[#EA580C]">Adventures</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto">
            Take the stress out of planning. Our packages bundle the perfect vehicle, an expert driver, and route planning into one seamless experience.
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold text-[#1e3a8a] flex items-center shadow-sm">
                  <Clock size={16} className="mr-1.5 text-[#EA580C]" /> {pkg.duration}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-3 leading-tight">{pkg.title}</h2>
                <p className="text-gray-500 mb-6 flex-1">{pkg.desc}</p>
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-gray-100">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Starting at</span>
                    <span className="text-xl font-extrabold text-[#EA580C]">{pkg.price}</span>
                  </div>
                  <Link to={`/packages/${pkg.id}`} className="flex items-center justify-center bg-[#1e3a8a] text-white w-12 h-12 rounded-full hover:bg-blue-900 transition-colors shadow-md">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Prop */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <h3 className="text-3xl font-extrabold text-[#1e3a8a] mb-12 relative z-10">Why Choose a Package?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">Zero Planning Required</h4>
              <p className="text-gray-500 text-sm">We handle the vehicle selection, route optimization, and driver assignments.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">Expert Mountain Drivers</h4>
              <p className="text-gray-500 text-sm">Our package drivers are veterans of the Himalayan roads, ensuring your safety.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">Transparent Pricing</h4>
              <p className="text-gray-500 text-sm">No hidden fees. Fuel, taxes, driver accommodations, and tolls are all bundled.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
