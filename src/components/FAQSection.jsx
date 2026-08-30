import React, { useState } from 'react';
import { ArrowRight, Plane, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const homepageFaqs = [
  {
    number: "01",
    question: "How to get a Nepal visit visa?",
    answer: "You can obtain a Nepal visa on arrival at Tribhuvan International Airport in Kathmandu, or apply online/at a Nepalese embassy beforehand. The fees are USD 30 for 15 days, USD 50 for 30 days, and USD 125 for 90 days. Make sure your passport has at least 6 months validity."
  },
  {
    number: "02",
    question: "Is Nepal safe for travelers?",
    answer: "Yes, Nepal is generally very safe for travelers, including solo adventurers. Tourism is a primary industry and locals are famously hospitable. Standard precautions should be taken, and solo trekking in remote areas is best done with a guide."
  },
  {
    number: "03",
    question: "What currency is used in Nepal? Can I use cards?",
    answer: "The currency is the Nepalese Rupee (NPR). Credit cards (Visa/Mastercard) are accepted in hotels, upscale restaurants, and major shops in Kathmandu and Pokhara. However, you will need cash (NPR) for trekking, local transport, small shops, and rural areas."
  },
  {
    number: "04",
    question: "What cultural etiquette should I know during my visit to Nepal?",
    answer: "Always dress modestly, especially when visiting temples or religious sites (shoulders and knees covered). Remove shoes before entering temples or homes. Use your right hand for eating or passing items, and avoid pointing your feet at people or sacred objects."
  },
  {
    number: "05",
    question: "What kind of food is available in Nepal?",
    answer: "Dal Bhat (rice, lentil soup, and vegetable curry) is the staple food. You will also find Momo (dumplings), chow mein, and thukpa widely available. In Kathmandu and Pokhara, there is a rich selection of international cuisines including Italian, Indian, Chinese, and Continental options."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#1e3a8a]/5 overflow-hidden">
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 text-[13px] md:text-sm font-black tracking-widest text-[#1e3a8a]/80 uppercase mb-3">
              Explore FAQs
              <span className="w-10 h-[1.5px] bg-[#1e3a8a]/30"></span>
              <Plane size={14} className="rotate-90 text-[#1e3a8a] translate-y-[-1px]" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1e3a8a] leading-tight tracking-tight uppercase mb-6 font-display">
              TOP TRAVEL QUERIES
            </h2>

            <p className="text-[#42474f] font-medium leading-relaxed text-sm md:text-base mb-8 max-w-md">
              These FAQs are designed to help you feel fully prepared and confident before your trip. If you have a question that's not listed, feel free to reach out—we're always here to help and ensure your adventure with us is smooth, safe, and memorable.
            </p>

            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#1b4331] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(45,106,79,0.2)] hover:scale-[1.02] mb-12"
            >
              More FAQs <ArrowRight size={16} />
            </Link>

            {/* WhatsApp Integration */}
            <div className="w-full pt-8 border-t border-slate-100 flex flex-col items-start gap-4">
              <h4 className="font-extrabold text-[#1e3a8a] text-base md:text-lg italic">
                Can't seem to find your queries?
              </h4>
              <a 
                href="https://wa.me/9779860156046" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 bg-[#009EDB] hover:bg-[#0081B4] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(0,158,219,0.25)] hover:scale-[1.02] group"
              >
                {/* Custom WhatsApp SVG Icon */}
                <svg 
                  className="w-5 h-5 fill-white transition-transform group-hover:scale-110" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.945 11.93.945c-5.439 0-9.865 4.372-9.87 9.802a9.74 9.74 0 001.468 4.77l-.968 3.535 3.655-.948zm11.233-7.66c-.297-.148-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.011c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                +977 9860156046
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 w-full flex flex-col gap-4">
            {homepageFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={faq.number} 
                  className={`border border-[#D1FAE5]/60 rounded-[15px] overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#E6F4EA]/80 shadow-[0_4px_16px_rgba(45,106,79,0.06)] border-[#a2ebd2]/40' 
                      : 'bg-[#E6F4EA]/40 hover:bg-[#E6F4EA]/60 border-transparent'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full text-left flex items-center justify-between px-6 py-5 focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-base md:text-lg font-extrabold text-[#2D6A4F] select-none">
                        {faq.number}
                      </span>
                      <h4 className="text-sm md:text-base font-bold text-[#1e3a8a] leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                    
                    <span 
                      className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/60 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-[#2D6A4F]' : 'text-[#1e3a8a]'
                      }`}
                    >
                      <Plus size={18} strokeWidth={2.5} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-700 text-xs md:text-sm leading-relaxed border-t border-[#D1FAE5]/40 mt-1 pl-[3.5rem]">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
