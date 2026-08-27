import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowRight, MessageCircle, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppData } from '../context/AppDataContext';

const faqs = [
  {
    question: "What is the best time to visit Nepal?",
    answer: "The best times to visit are during the spring (March to May) and autumn (September to November) seasons. These months offer clear skies, comfortable temperatures, and excellent visibility for mountain views."
  },
  {
    question: "Do I need a visa to travel to Nepal?",
    answer: "Yes, most foreign nationals require a visa to enter Nepal. You can easily obtain a visa on arrival at Tribhuvan International Airport in Kathmandu or apply for one at a Nepalese embassy before your trip."
  },
  {
    question: "Is Nepal safe for solo travelers?",
    answer: "Nepal is widely considered one of the safest destinations for solo travelers. The locals are hospitable and friendly, and violent crime against tourists is extremely rare. However, we always recommend trekking with a certified guide for safety in the mountains."
  },
  {
    question: "What currency is used in Nepal?",
    answer: "The local currency is the Nepalese Rupee (NPR). While major hotels, restaurants, and shops in cities accept credit cards, you should carry cash for teahouses, small vendors, and rural areas."
  },
  {
    question: "What should I pack for a Nepal trek?",
    answer: "Key essentials include moisture-wicking base layers, a warm fleece or down jacket, waterproof outerwear, comfortable trekking boots, a good sleeping bag, a headlamp, and personal first-aid supplies. We provide a detailed packing list for every booked trek."
  },
  {
    question: "Do you provide airport pickup and transportation?",
    answer: "Yes, we provide complimentary airport pickup and drop-off services for all our tour and trek package guests. We also have a fleet of premium vehicles for independent travel across Nepal."
  },
  {
    question: "Can I customize my tour package?",
    answer: "Absolutely. We specialize in tailor-made experiences. Whether you want to add an extra rest day on a trek, include a jungle safari, or upgrade your hotels, our experts can craft the perfect itinerary for you."
  },
  {
    question: "What happens if my travel plans change?",
    answer: "We understand that plans can change. We offer flexible rescheduling options up to 30 days before departure. For cancellations, our clear refund policy applies, which is detailed in your booking confirmation."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { testimonials = [] } = useAppData() || {};
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setTestiIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative py-20 lg:py-28 bg-[#fafcff] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f3493 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#0f3493]/30"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0f3493] uppercase">Need to know?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f3493] mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Everything you need to know before exploring Nepal with Zenex Travels.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left: Image Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[40%] xl:w-[35%] shrink-0"
          >
            <div className="relative w-full h-[260px] md:h-[320px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1000" 
                alt="Nepal Himalayan Travel" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Navy Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f3493]/90 via-[#0f3493]/60 to-[#0f3493]/30"></div>
              
              {/* Floating Label */}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <Star size={12} className="text-yellow-400 fill-yellow-400" /> Traveler Stories
              </div>

              {/* Slider Content */}
              <div className="absolute inset-0 pt-20 pb-8 px-6 md:px-8 flex flex-col justify-end">
                {testimonials.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={testiIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-white flex-1 flex flex-col justify-end"
                      >
                        <Quote size={28} className="text-white/30 mb-4 shrink-0" />
                        <p className="text-white md:text-lg font-medium italic mb-6 line-clamp-4 leading-relaxed drop-shadow-sm">
                          "{testimonials[testiIndex]?.text}"
                        </p>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 bg-white/10">
                            <img src={testimonials[testiIndex]?.img} alt={testimonials[testiIndex]?.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-sm drop-shadow-md">{testimonials[testiIndex]?.name}</p>
                            <p className="text-[11px] text-white/80 drop-shadow-md line-clamp-1">{testimonials[testiIndex]?.trip}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Dots */}
                    <div className="flex gap-1.5 mt-8 shrink-0">
                      {testimonials.map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setTestiIndex(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === testiIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                          aria-label={`Go to testimonial ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-white pb-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-5 drop-shadow-md leading-tight">
                      Planning your Nepal adventure?
                    </h3>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0f3493] font-bold px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm">
                      Talk to Our Experts <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[60%] xl:w-[65%]"
          >
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
                      <span className={`text-sm md:text-base font-bold mt-0.5 transition-colors duration-300 ${isOpen ? 'text-teal-600' : 'text-gray-400 group-hover:text-[#0f3493]'}`}>
                        {num}
                      </span>
                      
                      <div className="flex-1">
                        <h4 className={`text-lg md:text-xl font-semibold transition-colors duration-300 pr-4 ${isOpen ? 'text-[#0f3493]' : 'text-gray-900 group-hover:text-[#0f3493]'}`}>
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

                      <div className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90 text-teal-600' : 'group-hover:text-[#0f3493]'}`}>
                        {isOpen ? <X size={22} /> : <Plus size={22} />}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* CTA Area */}
        <div className="mt-16 lg:mt-24 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#0f3493] mb-2">Still have questions?</h3>
            <p className="text-gray-600 font-medium">Talk to our travel experts and get personalized advice for your Nepal trip.</p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link to="/packages" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f3493] hover:bg-[#0a2366] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg">
              Contact Us <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/9779800000000" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#25D366] hover:text-[#25D366] text-gray-700 font-bold px-6 py-3.5 rounded-xl transition-colors">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
