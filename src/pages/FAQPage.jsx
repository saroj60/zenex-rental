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
        title="Frequently Asked Questions (FAQ) | Zenex Travel"
        description="Find answers to common questions about booking tour packages, trekking in Nepal, and renting vehicles with Zenex Travel."
        canonicalUrl="https://zenextravel.com/faq"
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
