import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Fleet from '../components/Fleet';
import PopularEscapes from '../components/PopularEscapes';

import InteractiveRouteMap from '../components/InteractiveRouteMap';
import TrustSafety from '../components/TrustSafety';
import AdventurePackages from '../components/AdventurePackages';
import FeaturedPackages from '../components/FeaturedPackages';
import Gallery from '../components/Gallery';
import WhatOurGuestsSay from '../components/WhatOurGuestsSay';
import FAQSection from '../components/FAQSection';
import LatestBlogs from '../components/LatestBlogs';


const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Zenex Travels & Tours",
    "alternateName": ["Zenex Travel", "Zenex Travels", "Zenex Car Rental Nepal"],
    "image": "https://www.zenextravels.com/logo.jpg",
    "@id": "https://www.zenextravels.com",
    "url": "https://www.zenextravels.com",
    "telephone": "+9779800000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Thamel",
      "addressLocality": "Kathmandu",
      "postalCode": "44600",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.7172,
      "longitude": 85.3240
    }
  };

  return (
    <>
      <SEO 
        title="Zenex Travels & Tours | #1 Car Rental & Tour Operator in Nepal" 
        description="Zenex Travels & Tours (Zenex Travel) is Nepal's top travel agency & car rental provider. Book Himalayan trekking packages, vehicle rentals, and private tours in Nepal."
        keywords="Zenex Travels, Zenex Travel, Zenex Tours, Zenex Car Rental, Zenex Travel Nepal, car rental nepal, himalayan tours, kathmandu car hire, pokhara tours"
        canonicalUrl="https://www.zenextravels.com/"
        structuredData={structuredData}
      />
      <Hero />
      <FeaturedPackages />
      <AdventurePackages />
      <Fleet />
      <PopularEscapes />
      <WhatOurGuestsSay />
      <FAQSection />
      <LatestBlogs />
      <TrustSafety />
      <Gallery />
    </>
  );
};

export default Home;
