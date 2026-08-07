import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Fleet from '../components/Fleet';
import PopularEscapes from '../components/PopularEscapes';
import Advantage from '../components/Advantage';
import InteractiveRouteMap from '../components/InteractiveRouteMap';
import TrustSafety from '../components/TrustSafety';
import AdventurePackages from '../components/AdventurePackages';
import FeaturedPackages from '../components/FeaturedPackages';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Zenex Travel",
    "image": "https://zenextravel.com/logo.jpg",
    "@id": "https://zenextravel.com",
    "url": "https://zenextravel.com",
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
        title="Best Tour Operator & Travel Company in Nepal | Car Rental" 
        description="Zenex Travel is the best tour and travel company in Nepal. We offer premium trekking packages, holiday tours, and car rental services in Kathmandu and beyond."
        keywords="car rental nepal, himalayan tours, kathmandu car hire, pokhara tours"
        canonicalUrl="https://zenextravel.com/"
        structuredData={structuredData}
      />
      <Hero />
      <FeaturedPackages />
      <AdventurePackages />
      <Intro />
      <Fleet />
      <PopularEscapes />
      <Advantage />
      <TrustSafety />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Gallery />
    </>
  );
};

export default Home;
