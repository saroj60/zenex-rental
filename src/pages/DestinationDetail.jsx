import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Compass, ShieldCheck, ArrowRight, Car } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const DestinationDetail = () => {
  const { id } = useParams();
  const { destinations } = useAppData();
  const dest = destinations.find(d => d.id === id) || destinations[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-[#F4F6F8] min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2f4c] via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/destinations" className="text-blue-200 hover:text-white mb-6 inline-block font-medium transition-colors">
              &larr; Back to Destinations
            </Link>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
              {dest.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl font-medium drop-shadow-md">
              {dest.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Trip Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Calendar className="text-[#EA580C] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Best Time</span>
                  <span className="text-gray-900 font-bold">{dest.bestTime}</span>
                </div>
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Compass className="text-[#EA580C] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Terrain</span>
                  <span className="text-gray-900 font-bold">{dest.terrain}</span>
                </div>
                <div className="flex flex-col p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <ShieldCheck className="text-[#EA580C] mb-3" size={28} />
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Safety Rating</span>
                  <span className="text-gray-900 font-bold">Excellent</span>
                </div>
              </div>
            </div>

            {/* Recommended Vehicles */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Recommended Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dest.vehicles.map((v, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-orange-50 text-[#EA580C] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Car size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{v}</h3>
                    <Link to="/vehicles" className="text-sm font-bold text-blue-600 hover:text-blue-800">
                      View options &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-[#1e3a8a] to-[#0a2f4c] rounded-3xl p-8 shadow-xl text-center sticky top-24">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-[#EA580C]" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ready for {dest.name}?</h3>
              <p className="text-blue-200 font-medium mb-8">
                Book a premium vehicle tailored for this route. Includes full insurance and 24/7 support.
              </p>
              <Link to="/vehicles" className="block w-full bg-[#EA580C] text-white py-4 rounded-xl font-bold hover:bg-[#d04b08] transition-colors shadow-lg">
                Find Your Vehicle
              </Link>
              <p className="text-blue-300 text-sm mt-4">No hidden fees. Instant confirmation.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
