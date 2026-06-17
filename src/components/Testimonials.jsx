import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      trip: 'Mustang Road Trip',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      text: "The 4x4 we rented for the Mustang trip was immaculate. It handled the rough terrain effortlessly, and the support from Zenex Travel gave us total peace of mind.",
    },
    {
      name: 'David Chen',
      trip: 'Economy Rental',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      text: "Booking was seamless. The driver was waiting for us at the airport, and the Kathmandu valley tour was an absolute breeze. Highly recommend!",
    },
    {
      name: 'Elena Rodriguez',
      trip: 'Annapurna Circuit',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      text: "The vehicle was perfectly maintained. Having a reliable SUV made our family trip to Pokhara and beyond incredibly comfortable. Will definitely use Zenex Travel again.",
    }
  ];

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Traveler Stories</h2>
          <p className="text-gray-500 font-medium">Hear from our community of explorers.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-lg transition-shadow duration-300">
            <Quote className="absolute top-6 right-6 text-gray-100 group-hover:text-blue-50 transition-colors duration-300" size={48} />
            
            <div className="flex gap-1 mb-6 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-orange-400 fill-orange-400" size={18} />
              ))}
            </div>
            
            <p className="text-gray-600 font-medium leading-relaxed mb-8 relative z-10">"{t.text}"</p>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm shrink-0">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[15px]">{t.name}</p>
                <p className="text-[13px] text-gray-500 font-medium">{t.trip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
