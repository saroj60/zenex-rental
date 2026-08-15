import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HiacePricingCard from './HiacePricingCard';
import ScorpioPricingCard from './ScorpioPricingCard';
import CarPricingCard from './CarPricingCard';
import BusPricingCard from './BusPricingCard';
import CoasterPricingCard from './CoasterPricingCard';
import CarModelsCard from './CarModelsCard';

const Fleet = () => {
  return (
    <section className="reveal reveal-up px-4 md:px-8 max-w-7xl mx-auto py-16">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Verified Vehicles</h2>
          <p className="text-gray-500 font-medium">Choose from our premium fleet of well-maintained vehicles for a comfortable ride.</p>
        </div>
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-[#e53a24] font-bold hover:text-[#d04b08] transition-colors bg-[#e53a24]/10 px-5 py-2.5 rounded-xl hover:bg-[#e53a24]/20 w-fit">
          View All Fleet <ArrowRight size={18} />
        </Link>
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 pb-8">
        <HiacePricingCard isSmall={true} />
        <ScorpioPricingCard isSmall={true} />
        <CarPricingCard isSmall={true} />
        <BusPricingCard isSmall={true} />
        <CoasterPricingCard isSmall={true} />
        <CarModelsCard isSmall={true} />
      </div>
    </section>
  );
};

export default Fleet;
