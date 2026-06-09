import React from 'react';
import Hero from '../components/Hero';
import Fleet from '../components/Fleet';
import PopularEscapes from '../components/PopularEscapes';
import Advantage from '../components/Advantage';
import TrustSafety from '../components/TrustSafety';
import AdventurePackages from '../components/AdventurePackages';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <Fleet />
      <PopularEscapes />
      <Advantage />
      <TrustSafety />
      <AdventurePackages />
      <Testimonials />
    </>
  );
};

export default Home;
