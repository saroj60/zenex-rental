import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Car, Shield, ChevronRight } from 'lucide-react';
import { seoLandingData } from '../data/seoLandingData';
import { useAppData } from '../context/AppDataContext';
import { useCurrency } from '../context/CurrencyContext';
import InlineEnquiryForm from '../components/InlineEnquiryForm';

const SEOLanding = ({ staticSlug }) => {
  const params = useParams();
  const slug = staticSlug || params.slug;
  const routeData = seoLandingData.find(r => r.slug === slug);
  const { vehicles } = useAppData();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, routeData]);

  if (!routeData) {
    return <Navigate to="/vehicles" replace />;
  }

  // Filter vehicles that match the recommended types for this route
  const recommendedVehicles = vehicles
    .filter(v => routeData.recommendedVehicleTypes.includes(v.type))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": routeData.title,
    "description": routeData.metaDescription,
    "image": routeData.heroImage,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Zenex Travel",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kathmandu",
        "addressCountry": "NP"
      }
    }
  };

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title={routeData.title}
        description={routeData.metaDescription}
        canonicalUrl={`https://zenextravel.com/${slug}`}
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={routeData.heroImage} 
            alt={routeData.h1} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a] via-[#1e3a8a]/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            {routeData.h1}
          </h1>
          <p className="text-xl text-blue-100 font-medium mb-12 max-w-2xl mx-auto">
            {routeData.metaDescription}
          </p>
          
          <div className="flex flex-wrap justify-center w-full">
            <InlineEnquiryForm 
              routeName={routeData.h1} 
              recommendedVehicles={routeData.recommendedVehicleTypes} 
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-3xl font-extrabold text-[#0f3493] mb-6">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {routeData.overview}
              </p>
              
              <h3 className="text-2xl font-bold text-[#0f3493] mb-6 mt-10">Why Choose Us?</h3>
              <ul className="space-y-4">
                {routeData.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="text-[#e53a24] mt-1 mr-3 shrink-0" size={20} />
                    <span className="text-gray-700 text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            {routeData.faqs && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8" itemScope itemType="https://schema.org/FAQPage">
                <h2 className="text-3xl font-extrabold text-[#0f3493] mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {routeData.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start" itemProp="name">
                        <span className="text-[#e53a24] mr-3 font-black">Q.</span>
                        {faq.q}
                      </h3>
                      <div className="text-gray-600 pl-8" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <p itemProp="text">{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-6 flex items-center">
                  <Car className="mr-2 text-[#e53a24]" />
                  Recommended Vehicles
                </h3>
                
                <div className="space-y-4">
                  {recommendedVehicles.map(vehicle => (
                    <Link 
                      key={vehicle.id} 
                      to={`/vehicles/${vehicle.id}`}
                      className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="h-32 overflow-hidden bg-white">
                        <img 
                          src={vehicle.img} 
                          alt={vehicle.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-[#e53a24] transition-colors">{vehicle.name}</h4>
                          <p className="text-sm text-gray-500">{vehicle.type}</p>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-[#e53a24]" size={20} />
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Link to="/vehicles" className="mt-6 w-full inline-flex justify-center items-center px-4 py-3 bg-blue-50 text-[#1e3a8a] font-bold rounded-xl hover:bg-blue-100 transition-colors">
                  View All Vehicles
                </Link>
              </div>

              <div className="bg-[#1e3a8a] rounded-3xl p-6 text-white text-center shadow-md">
                <Shield size={40} className="mx-auto mb-4 text-[#e53a24]" />
                <h3 className="text-xl font-bold mb-3">100% Secure & Reliable</h3>
                <p className="text-blue-100 text-sm mb-6">
                  All our vehicles are fully insured and undergo rigorous maintenance checks before every trip.
                </p>
                <Link to="/contact" className="inline-block bg-[#e53a24] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm">
                  Contact Us Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOLanding;
