import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map, Clock, CalendarCheck, ShieldCheck, CheckCircle2, Car, MapPin } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const PackageDetail = () => {
  const { id } = useParams();
  const { packages } = useAppData();
  const pkg = packages.find(p => p.id === id) || packages[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-[#F4F6F8] min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2f4c] via-[#0a2f4c]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/packages" className="text-blue-200 hover:text-white mb-6 inline-block font-medium transition-colors">
              &larr; Back to Packages
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-[#EA580C] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                <Clock size={16} className="mr-1.5" /> {pkg.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                All-Inclusive Package
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
              {pkg.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl font-medium drop-shadow-md">
              {pkg.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Highlights */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Package Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="text-[#EA580C] mr-3 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-8">Route Itinerary</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {pkg.itinerary.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#EA580C] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <MapPin size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <h3 className="font-bold text-[#1e3a8a] text-lg mb-1">{step.day}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
              <div className="text-center mb-8 pb-8 border-b border-gray-100">
                <p className="text-gray-500 font-medium mb-2">Starting Price</p>
                <h3 className="text-4xl font-extrabold text-[#1e3a8a]">{pkg.price}</h3>
                <p className="text-sm text-gray-400 mt-2">Price varies by vehicle selection</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center"><CalendarCheck size={16} className="mr-2 text-gray-400" /> Start Date</span>
                  <span className="font-bold text-gray-900">Select Date &rarr;</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center"><Car size={16} className="mr-2 text-gray-400" /> Vehicle</span>
                  <span className="font-bold text-gray-900">Choose Option &rarr;</span>
                </div>
              </div>

              <Link to="/checkout" className="block w-full bg-[#EA580C] text-white py-4 rounded-xl font-bold hover:bg-[#d04b08] transition-colors shadow-md text-center">
                Configure & Book
              </Link>
              
              <div className="mt-6 flex items-start bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <ShieldCheck className="text-blue-600 mr-3 shrink-0" size={24} />
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>Book with Confidence.</strong> Free cancellation up to 48 hours before your trip begins. 24/7 support included.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
