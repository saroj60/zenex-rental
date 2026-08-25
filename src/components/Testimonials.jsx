import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const Testimonials = () => {
  const { testimonials } = useAppData();

  const reviewSchema = {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    "name": "Zenex Travel",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewBody": t.text
    }))
  };

  return (
    <section className="reveal reveal-up px-4 md:px-8 max-w-7xl mx-auto py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Traveler Stories</h2>
          <p className="text-gray-500 font-medium text-lg">Hear from our community of explorers.</p>
        </div>
        
        {/* Google Reviews Badge */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-50">
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-[#FBBC05] fill-[#FBBC05]" size={16} />
              ))}
            </div>
            <p className="font-bold text-gray-900 text-sm">5/5 Rating</p>
            <p className="text-xs text-gray-500 font-medium">Based on 150+ reviews</p>
          </div>
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
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[15px] flex items-center gap-1">
                  {t.name} <CheckCircle2 size={14} className="text-blue-500 fill-blue-50" />
                </p>
                <p className="text-xs text-gray-500 font-medium">{t.date} • {t.vehicle}</p>
                <p className="text-[13px] font-bold text-[#e53a24] mt-0.5">{t.trip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      

    </section>
  );
};

export default Testimonials;

