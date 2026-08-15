import React from 'react';

const Partners = () => {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold text-[#1e3a8a] tracking-tight mb-8">
          Associations and Partners
        </h2>
        <div className="max-w-5xl mx-auto flex justify-center items-center bg-gray-50/50 rounded-2xl p-6 md:p-10 border border-gray-100/80 shadow-sm hover:shadow-md transition-shadow duration-300">
          <img 
            src="https://www.nepalparatrek.com/wp-content/themes/inspiry-tourpress/img/associated-logo.png" 
            alt="Associations and Partners - Department of Tourism, NTB, TAAN, NMA, KEEP, PATA, NATTA, VITOF" 
            className="max-h-16 md:max-h-20 w-full object-contain filter hover:brightness-105 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Partners;
