import React, { useState } from 'react';
import { Plus, X, ArrowRight, MessageCircle } from 'lucide-react';
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

        {/* CTA Area */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-2">Still have questions?</h3>
            <p className="text-gray-600 font-medium">Talk to our travel experts and get personalized advice for your Nepal trip.</p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link to="/packages" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#0a2366] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg">
              Contact Us <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/9779860156046" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#25D366] hover:text-[#25D366] text-gray-700 font-bold px-6 py-3.5 rounded-xl transition-colors">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
