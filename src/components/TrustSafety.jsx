import React from 'react';
import { ShieldCheck, Wrench, Headphones, Award, Compass, Sparkles, BadgeDollarSign, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSafety = () => {
  const featureCards = [
    { title: 'Expert Guides', desc: 'Certificated mountain guides with decades of terrain experience.', icon: Compass, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { title: 'Safe & Reliable', desc: '100% safety track record with robust backup support systems.', icon: ShieldCheck, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Customized Packages', desc: 'Tailor-made private itineraries fitting your speed and preference.', icon: Sparkles, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { title: 'Best Value', desc: 'Competitive direct pricing without hidden agency markups.', icon: BadgeDollarSign, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { title: '24/7 Support', desc: 'Round-the-clock emergency support line during your entire trip.', icon: Headphones, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { title: 'Local Experience', desc: 'Genuine Sherpa culture immersion and authentic homestays.', icon: HeartHandshake, color: 'bg-teal-50 text-teal-600 border-teal-100' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="bg-[#F4F6F8] py-20 px-4 md:px-8 border-y border-gray-200/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f3493] mb-4">Why Choosing Zenex Travels</h2>
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

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                variants={itemVariants}
                key={feat.title} 
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${feat.color}`}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-base">
                    {feat.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </motion.section>
  );
};

export default TrustSafety;
