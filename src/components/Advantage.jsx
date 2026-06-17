import React from 'react';
import { Headset, PlaneTakeoff, ShieldCheck, CalendarCheck, CreditCard, Navigation } from 'lucide-react';

const Advantage = () => {
  const advantages = [
    { title: '24/7 Customer Support', desc: 'Local assistance anywhere in Nepal, anytime.', icon: <Headset className="text-[#EA580C]" size={20} /> },
    { title: 'Airport Pickup Service', desc: 'Direct transfers from TIA to your hotel.', icon: <PlaneTakeoff className="text-[#EA580C]" size={20} /> },
    { title: 'Verified Drivers', desc: 'Experienced local experts for tough terrains.', icon: <ShieldCheck className="text-[#EA580C]" size={20} /> },
    { title: 'Flexible Booking', desc: 'Easy cancellations and date modifications.', icon: <CalendarCheck className="text-[#EA580C]" size={20} /> },
    { title: 'Secure Payments', desc: 'Encrypted international gateway.', icon: <CreditCard className="text-[#EA580C]" size={20} /> },
    { title: 'GPS-enabled Vehicles', desc: 'Real-time tracking for ultimate safety.', icon: <Navigation className="text-[#EA580C]" size={20} /> },
  ];

  return (
    <section className="bg-[#0a2f4c] py-20 mt-16 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="text-center text-lg md:text-xl text-white mb-16 font-medium">The Zenex Advantage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 max-w-5xl mx-auto">
          {advantages.map((adv, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {adv.icon}
              </div>
              <h4 className="text-[15px] font-bold mb-1.5">{adv.title}</h4>
              <p className="text-[13px] text-gray-300 font-medium max-w-[280px]">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
