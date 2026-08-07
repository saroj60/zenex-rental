import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';

const FAQPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of tour packages do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a wide range of packages including Himalayan trekking (like Everest Base Camp, Annapurna), jungle safaris in Chitwan, cultural tours in Kathmandu Valley, and custom luxury tours tailored to your preferences."
        }
      },
      {
        "@type": "Question",
        "name": "Are your tour guides certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our trekking and tour guides are fully certified by the Government of Nepal, hold valid licenses, and have years of experience navigating the Himalayas safely."
        }
      }
    ]
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
      <FAQ />
    </div>
  );
};

export default FAQPage;
