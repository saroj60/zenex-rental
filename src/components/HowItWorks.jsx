import React from 'react';
import { Search, CalendarCheck, Map as MapIcon, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Find Your Adventure',
      description: 'Browse our curated tour packages or premium car fleet. Filter by destination, duration, or travel style.',
      icon: <Search size={28} className="text-[#e53a24]" />,
      color: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      id: 2,
      title: 'Customize & Book',
      description: 'Tailor the itinerary to your needs. Secure your booking instantly with our encrypted payment gateway.',
      icon: <CalendarCheck size={28} className="text-[#1e3a8a]" />,
      color: 'bg-blue-50 text-blue-800 border-blue-100',
    },
    {
      id: 3,
      title: 'Meet Your Local Expert',
      description: 'Your verified driver or guide will meet you at the airport or hotel, fully briefed on your trip.',
      icon: <ShieldCheck size={28} className="text-green-600" />,
      color: 'bg-green-50 text-green-700 border-green-100',
    },
    {
      id: 4,
      title: 'Explore the Himalayas',
      description: 'Enjoy a seamless, fully supported journey through Nepal with our 24/7 on-ground assistance.',
      icon: <MapIcon size={28} className="text-purple-600" />,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    }
  ];

  return (
    <section className="reveal reveal-up py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">Your Himalayan adventure is just four simple steps away.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gray-100 z-0"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${step.color} mb-6 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <div className="bg-[#1e3a8a] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm absolute top-0 right-1/2 translate-x-12 -translate-y-2 shadow-md">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

