import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { faqs } from '../data/faqData';

const FAQPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-[#ebf3fa] min-h-screen py-24">
      <SEO 
        keywords="Zenex Travels FAQ, Nepal Car Rental Rules, Self Drive Requirements Nepal, Zenex Support" 
        title="Frequently Asked Questions (FAQ) | Zenex Travels & Tours Nepal"
        description="Find quick answers to common questions about car rental terms, driver allowances, self-drive requirements, trekking permits, and flight bookings in Nepal."
        canonicalUrl="https://www.zenextravels.com/faq"
        structuredData={structuredData}
      />
      <div className="max-w-4xl mx-auto px-4 md:px-8 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2f4c] mb-6 tracking-tight">Support & FAQ</h1>
        <p className="text-lg text-gray-600 font-medium">Have questions? We're here to help you plan the perfect trip to Nepal.</p>
      </div>
      <FAQAccordion />
    </div>
  );
};

export default FAQPage;
