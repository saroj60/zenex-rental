import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What types of tour packages do you offer?",
      answer: "We offer a wide range of packages including Himalayan trekking (like Everest Base Camp, Annapurna Circuit, Langtang), jungle safaris in Chitwan, cultural tours in Kathmandu Valley, and custom luxury tours tailored to your preferences."
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
    },
    {
      question: "What is your cancellation and refund policy?",
      answer: "Cancellations made 30 days or more before the departure date will receive a full refund minus a 10% administration fee. Cancellations made between 15 and 30 days will receive a 50% refund. No refunds are available for cancellations made within 14 days of departure."
    },
    {
      question: "Do you provide emergency evacuation support during treks?",
      answer: "Yes, we have 24/7 rescue coordination. In the event of severe altitude sickness or injury, we coordinate immediate helicopter evacuation. We require all trekkers to have travel insurance that specifically covers helicopter rescue up to 6,000 meters."
    },
    {
      question: "Can I customize an existing itinerary?",
      answer: "Absolutely! We specialize in tailor-made private tours. You can adjust the trip duration, activities, accommodation types, and travel dates to fit your specific needs."
    },
    {
      question: "What documents do I need to rent a vehicle or travel?",
      answer: "To rent a self-drive vehicle, you need a valid passport, a national driving license, and an International Driving Permit (IDP). For treks, you'll need passport copies and 4 passport-size photographs for permit registration."
    },
    {
      question: "What is the difference between a Trek and a Tour?",
      answer: "A trek involves active hiking/walking through trails in the mountains and staying in local teahouses. A tour is vehicle-based sightseeing, heritage visits, and stays in standard hotels or resorts."
    },
    {
      question: "Is tap water safe to drink in Nepal, and how is the food on treks?",
      answer: "Tap water is not safe. We recommend drinking bottled water, boiled water, or using water purification tablets/filters. The food at teahouses is fresh and nutritious, mostly consisting of Dal Bhat (lentil soup and rice), noodles, potatoes, and pasta."
    }
  ];

  return (
    <section className="reveal reveal-up bg-[#ebf3fa]/20 py-20 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#e53a24]/10 text-[#e53a24] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f3493] leading-none tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-medium mt-3">Everything you need to know about traveling and renting with Zenex.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === idx ? 'border-blue-200 bg-blue-50/20' : 'border-gray-150 bg-white hover:border-gray-300'}`}
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
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
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

