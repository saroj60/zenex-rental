import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { Heart, Sparkles, Clock, Camera } from 'lucide-react';
import InlineEnquiryForm from '../components/InlineEnquiryForm';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const WeddingCar = () => {
  const { vehicles } = useAppData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter premium vehicles suitable for weddings and get the most recent ones
  const weddingVehicles = [...vehicles]
    .reverse()
    .filter(v => ['Sedan', 'SUV / 4x4', 'Luxury'].includes(v.type))
    .slice(0, 4);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Wedding Car Rental Kathmandu",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Zenex Travel"
    },
    "description": "Luxury wedding car rentals in Kathmandu, Nepal. Beautifully decorated sedans and premium SUVs for your special day.",
    "areaServed": "Kathmandu Valley"
  };

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title="Wedding Car Rental Kathmandu | Luxury Marriage Cars"
        description="Make your grand entrance unforgettable with our luxury wedding car rentals in Kathmandu. Professionally decorated vehicles and uniformed chauffeurs."
        canonicalUrl="https://zenextravel.com.np/wedding-car-rental-kathmandu"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1170&auto=format&fit=crop" 
            alt="Luxury wedding car decorated with flowers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0f3493]/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Luxury Wedding Car Rental
          </h1>
          <p className="text-xl text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
            Arrive in style on your special day. Premium decorated vehicles with professional chauffeurs in Kathmandu.
          </p>
          <div className="flex justify-center">
            <InlineEnquiryForm 
              routeName="Wedding Car Enquiry" 
              recommendedVehicles={['Luxury Sedan', 'Premium SUV', 'Limousine', 'Vintage Car']} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0f3493] mb-6">Your Perfect Ride for the Perfect Day</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Your wedding day is one of the most important days of your life, and your transportation should reflect the elegance and significance of the occasion. At Zenex Travel, we offer a specialized fleet of luxury wedding cars in Kathmandu, complete with beautiful floral decorations and professional, uniformed chauffeurs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Premium Decoration</h3>
                    <p className="text-sm text-gray-500">Fresh floral arrangements customized to match your wedding theme.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Uniformed Chauffeurs</h3>
                    <p className="text-sm text-gray-500">Professional, punctual, and courteous drivers dedicated to your comfort.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-[#e53a24] flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Flexible Timings</h3>
                    <p className="text-sm text-gray-500">Full day (12 hours) and half day (6 hours) packages available.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <Camera size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Photo-Ready Vehicles</h3>
                    <p className="text-sm text-gray-500">Immaculately detailed cars perfect for your wedding photography.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0f3493] mb-6">Popular Wedding Vehicles</h2>
              <div className="space-y-6">
                {weddingVehicles.map(v => (
                  <div key={v.id} className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-4 rounded-2xl group">
                    <img src={v.img} alt={v.name} className="w-full md:w-48 h-32 object-cover rounded-xl" />
                    <div className="flex-1 w-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{v.name} ({v.type})</h3>
                      <p className="text-gray-600 mb-2">{v.seats} Seater • AC • Excellent Condition</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-[#e53a24] font-bold">NPR {v.price} / day (base price)</p>
                        <Link to={`/vehicles/${v.id}?driver=included`} className="text-sm font-bold text-[#e53a24] hover:underline flex items-center gap-1">
                          Book Now <span className="text-[10px]">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-[#0f3493] to-[#1e3a8a] rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book Your Wedding Car</h3>
                <p className="text-blue-100 mb-8">
                  Wedding season in Nepal gets extremely busy. We highly recommend booking your vehicle at least 1 month in advance.
                </p>
                
                <div className="space-y-4">
                  <a href="https://wa.me/9779767476521?text=Hi,%20I%20am%20looking%20to%20book%20a%20wedding%20car." target="_blank" rel="noreferrer" className="w-full block text-center bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors">
                    Chat on WhatsApp
                  </a>
                  <a href="tel:+9779767476521" className="w-full block text-center bg-white text-[#0f3493] py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingCar;
