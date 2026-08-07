import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What types of tour packages do you offer?",
      answer: "We offer a wide range of packages including Himalayan trekking (like Everest Base Camp, Annapurna), jungle safaris in Chitwan, cultural tours in Kathmandu Valley, and custom luxury tours tailored to your preferences."
    },
    {
      question: "Are your tour guides certified?",
      answer: "Yes, all our trekking and tour guides are fully certified by the Government of Nepal, hold valid licenses, and have years of experience navigating the Himalayas safely."
    },
    {
      question: "Can I rent a car without a driver (Self-Drive)?",
      answer: "Yes, we offer self-drive car rentals for valid license holders. However, for difficult mountain terrains or off-road trips (like Mustang), we highly recommend booking our experienced drivers."
    },
    {
      question: "Do your prices include permits and park fees?",
      answer: "For our complete tour and trek packages, all necessary national park fees, TIMS cards, and special area permits are included in the price. For vehicle-only rentals, permits are generally arranged by the traveler unless requested otherwise."
    },
    {
      question: "What happens if my flight is delayed for an airport pickup?",
      answer: "We track your flight in real-time. If your flight is delayed, our driver will wait for you at the airport at no extra cost. Your seamless arrival is our priority."
    },
    {
      question: "How far in advance should I book my trip?",
      answer: "For peak seasons (Spring: March-May, Autumn: Sept-Nov), we recommend booking at least 2 to 3 months in advance to secure the best guides, teahouses, and vehicles."
    }
  ];

  return (
    <section className="reveal reveal-up bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 font-medium text-lg">Everything you need to know about traveling with Zenex.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === idx ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span className={`font-bold pr-4 ${openIndex === idx ? 'text-[#e53a24]' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === idx ? 'bg-[#e53a24] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

