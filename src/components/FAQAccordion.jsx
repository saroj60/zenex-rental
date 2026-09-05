import React, { useState } from 'react';
import { Plus, X, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { faqs } from '../data/faqData';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-16 bg-[#fafcff] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col border-t border-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const num = String(idx + 1).padStart(2, '0');
            
            return (
              <div 
                key={idx} 
                className={`border-b border-gray-200 transition-colors duration-300 ${isOpen ? 'bg-[#f0f5fa]' : 'bg-transparent'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left flex items-start gap-4 md:gap-6 px-4 md:px-6 py-6 focus:outline-none group"
                >
                  <span className={`text-sm md:text-base font-bold mt-0.5 transition-colors duration-300 ${isOpen ? 'text-teal-600' : 'text-gray-400 group-hover:text-[#1e3a8a]'}`}>
                    {num}
                  </span>
                  
                  <div className="flex-1">
                    <h4 className={`text-lg md:text-xl font-semibold transition-colors duration-300 pr-4 ${isOpen ? 'text-[#1e3a8a]' : 'text-gray-900 group-hover:text-[#1e3a8a]'}`}>
                      {faq.question}
                    </h4>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 leading-relaxed font-normal text-sm md:text-base pr-4 mt-3 pb-2">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90 text-teal-600' : 'group-hover:text-[#1e3a8a]'}`}>
                    {isOpen ? <X size={22} /> : <Plus size={22} />}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Banner Area */}
        <div className="mt-16 relative bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#0f172a] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-900/30 overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#e53a24]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            
            {/* Left Info with Expert Avatar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-xl">
              <div className="relative shrink-0">
                <img 
                  src="/images/zenexexpert.png" 
                  alt="JD Gautam - Travel Expert" 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#1e3a8a] rounded-full" title="Online now" />
              </div>
              
              <div>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-amber-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-white/10">
                  <Sparkles size={12} /> 24/7 Personal Travel Assistance
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Still have questions?
                </h3>
                <p className="text-blue-100/90 text-sm sm:text-base font-light mt-1 leading-relaxed">
                  Talk to <strong className="font-semibold text-white">JD Gautam</strong> and our travel experts for tailored advice on your Nepal trip.
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e53a24] hover:bg-red-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-red-900/30 whitespace-nowrap hover:scale-105"
              >
                <span>Contact Us</span>
                <ArrowRight size={18} />
              </Link>
              
              <a 
                href="https://wa.me/9779767476521?text=Hi%20JD,%20I'd%20like%20to%20inquire%20about%20a%20trip/vehicle!" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-950/20 whitespace-nowrap hover:scale-105"
              >
                <MessageCircle size={19} className="fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
