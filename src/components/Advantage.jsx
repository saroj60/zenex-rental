import React from 'react';
import { Headset, PlaneTakeoff, ShieldCheck, CalendarCheck, CreditCard, Navigation } from 'lucide-react';

const Advantage = () => {
  const advantages = [
    { title: '50-Point Safety Inspections', desc: 'The only company in Nepal with rigorous pre-trip vehicle checks.', icon: <ShieldCheck className="text-[#e53a24]" size={20} /> },
    { title: '5+ Years Experience', desc: 'Over 10,000+ satisfied customers since 2019.', icon: <CalendarCheck className="text-[#e53a24]" size={20} /> },
    { title: 'Expert Mountain Drivers', desc: 'Local professionals with 5+ years of high-altitude experience.', icon: <Navigation className="text-[#e53a24]" size={20} /> },
    { title: 'Luxury Hotel Partnerships', desc: 'Exclusive rates and perks at Nepal\'s finest accommodations.', icon: <CreditCard className="text-[#e53a24]" size={20} /> },
    { title: 'Customizable Itineraries', desc: '100% tailor-made trips—no rigid, fixed group packages.', icon: <PlaneTakeoff className="text-[#e53a24]" size={20} /> },
    { title: '24/7 Local Support', desc: 'Our Kathmandu-based team monitors your trip around the clock.', icon: <Headset className="text-[#e53a24]" size={20} /> },
  ];

  return (
    <section className="reveal reveal-up bg-[#0a2f4c] py-20 mt-16 text-white w-full">
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

