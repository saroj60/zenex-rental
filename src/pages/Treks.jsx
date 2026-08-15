import React from 'react';
import SEO from '../components/SEO';
import CountryWiseTrekCategories from '../components/CountryWiseTrekCategories';

const Treks = () => {
  return (
    <div className="min-h-screen bg-white pb-16 overflow-x-hidden pt-32">
      <SEO 
        title="Trekking in Nepal | Zenex Rental"
        description="Explore the majestic Himalayas with our guided trekking packages in Nepal."
      />
      
      {/* Interactive Country-Wise Categories Section */}
      <CountryWiseTrekCategories />
    </div>
  );
};

export default Treks;
