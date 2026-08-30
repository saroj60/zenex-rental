import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Shield, Star, Car, Compass, ChevronRight } from 'lucide-react';
import { seoRoutes } from '../data/seoRoutes';
import { useAppData } from '../context/AppDataContext';
import { useCurrency } from '../context/CurrencyContext';
import InlineEnquiryForm from '../components/InlineEnquiryForm';

const RouteLanding = () => {
  const { slug } = useParams();
  const routeData = seoRoutes.find(r => r.slug === slug);
  const { vehicles } = useAppData();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, routeData]);

  if (!routeData) {
    return <Navigate to="/destinations" replace />;
  }

  // Filter vehicles that match the recommended types for this route
  const recommendedVehicles = vehicles
    .filter(v => routeData.recommendedVehicleTypes.includes(v.type))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": routeData.title,
    "description": routeData.metaDescription,
    "image": routeData.heroImage,
    "brand": {
      "@type": "Brand",
      "name": "Zenex Travel"
    }
  };

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title={routeData.title}
        description={routeData.metaDescription}
        canonicalUrl={`https://zenextravel.com/route/${slug}`}
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={routeData.heroImage} 
            alt={routeData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a] via-[#1e3a8a]/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            {routeData.title}
          </h1>
          <p className="text-xl text-blue-100 font-medium mb-12 max-w-2xl mx-auto">
            {routeData.metaDescription}
          </p>
          
          <div className="flex flex-wrap justify-center w-full">
            <InlineEnquiryForm 
              routeName={routeData.title} 
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
              <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-6">Route Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {routeData.overview}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-2xl flex flex-col items-center text-center">
                  <MapPin size={32} className="text-[#1e3a8a] mb-3" />
                  <span className="text-sm text-gray-500 font-bold uppercase mb-1">Distance</span>
                  <span className="text-xl font-bold text-gray-900">{routeData.distance}</span>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl flex flex-col items-center text-center">
                  <Clock size={32} className="text-[#e53a24] mb-3" />
                  <span className="text-sm text-gray-500 font-bold uppercase mb-1">Est. Time</span>
                  <span className="text-xl font-bold text-gray-900">{routeData.time}</span>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl flex flex-col items-center text-center">
                  <Compass size={32} className="text-green-600 mb-3" />
                  <span className="text-sm text-gray-500 font-bold uppercase mb-1">Terrain</span>
                  <span className="text-xl font-bold text-gray-900">{routeData.terrain}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6">Why book with us for this route?</h3>
              <ul className="space-y-4 mb-10">
                {routeData.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={24} />
                    <span className="text-gray-700 font-medium text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            {routeData.faqs && routeData.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {routeData.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h4>
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
                <h3 className="text-xl font-extrabold text-[#1e3a8a] mb-6 border-b border-gray-100 pb-4">
                  Recommended Vehicles
                </h3>
                
                <div className="space-y-6">
                  {recommendedVehicles.map(v => (
                    <div key={v.id} className="flex gap-4 items-center group">
                      <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{v.name}</h4>
                        <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded-full font-medium mb-2">{v.type}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#e53a24] font-bold">{formatPrice(v.price)}<span className="text-xs text-gray-500 font-medium">/day</span></span>
                          <Link to={`/vehicles/${v.id}`} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/vehicles" className="w-full mt-8 bg-[#1e3a8a] text-white py-3 rounded-xl font-bold flex justify-center items-center hover:bg-[#152c6e] transition-colors">
                  View All Options
                </Link>
              </div>

              {/* Trust Box */}
              <div className="bg-gradient-to-b from-[#1e3a8a] to-[#0a2f4c] rounded-3xl p-6 shadow-xl text-center text-white">
                <Shield className="mx-auto mb-4 text-[#e53a24]" size={40} />
                <h4 className="text-xl font-bold mb-3">Safe & Reliable</h4>
                <p className="text-blue-200 text-sm mb-6">Every rental includes 24/7 roadside assistance, comprehensive insurance, and a professional driver option.</p>
                <div className="flex justify-center gap-1 text-[#e53a24]">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RouteLanding;
