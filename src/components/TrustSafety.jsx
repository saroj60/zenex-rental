import React from 'react';
import { ShieldCheck, Wrench, Headphones, Award, Compass, Sparkles, BadgeDollarSign, HeartHandshake, Search, CalendarCheck, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSafety = () => {
  const featureCards = [
    { title: 'Safe & Reliable', desc: '100% safety track record with robust backup support systems.', icon: ShieldCheck, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Customized Packages', desc: 'Tailor-made private itineraries fitting your speed and preference.', icon: Sparkles, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { title: 'Best Value', desc: 'Competitive direct pricing without hidden agency markups.', icon: BadgeDollarSign, color: 'bg-rose-50 text-rose-600 border-rose-100' }
  ];

  const steps = [
    {
      id: 1,
      title: 'Find Your Adventure',
      desc: 'Browse our curated tour packages or premium car fleet. Filter by destination, duration, or travel style.',
      icon: Search,
      color: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      id: 2,
      title: 'Customize & Book',
      desc: 'Tailor the itinerary to your needs. Secure your booking instantly with our encrypted payment gateway.',
      icon: CalendarCheck,
      color: 'bg-blue-50 text-blue-800 border-blue-100',
    },
    {
      id: 3,
      title: 'Meet Your Local Expert',
      desc: 'Your verified driver or guide will meet you at the airport or hotel, fully briefed on your trip.',
      icon: ShieldCheck,
      color: 'bg-green-50 text-green-700 border-green-100',
    },
    {
      id: 4,
      title: 'Explore the Himalayas',
      desc: 'Enjoy a seamless, fully supported journey through Nepal with our 24/7 on-ground assistance.',
      icon: Map,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    }
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
      className="bg-[#1e3a8a]/8 py-12 px-4 md:px-8 border-y border-[#1e3a8a]/15"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#1e3a8a] mb-3">Why Choosing Zenex Travels</h2>
          <p className="text-gray-600 max-w-xl mx-auto font-medium text-sm">We exceed industry standards to ensure every mile of your journey through Nepal is safe, secure, and stress-free.</p>
        </div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <motion.div 
                variants={itemVariants}
                key={step.title} 
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${step.color}`}>
                  <StepIcon size={22} strokeWidth={2} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-base">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {step.desc}
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
