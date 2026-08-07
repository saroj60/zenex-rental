import React from 'react';

const Intro = () => {
  return (
    <section className="reveal reveal-up py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3a8a] mb-6 tracking-tight">
          Explore Nepal with Confidence
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
          Whether you're seeking cultural treasures in Kathmandu, mountain treks in the Himalayas, 
          or wildlife safaris in Chitwan, Zenex Travel offers premium car rentals, expert local 
          drivers, and curated tour packages. <br className="hidden md:block" />
          <span className="text-[#e53a24] font-bold mt-4 inline-block">5+ years of experience. 150+ 5-star reviews.</span>
        </p>
      </div>
    </section>
  );
};

export default Intro;

