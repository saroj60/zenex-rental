import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { CheckCircle, Shield, Car, Calendar, FileText } from 'lucide-react';
import InlineEnquiryForm from '../components/InlineEnquiryForm';
import { useAppData } from '../context/AppDataContext';
import { Link } from 'react-router-dom';

const SelfDrive = () => {
  const { vehicles } = useAppData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter out heavy duty vehicles that aren't good for self drive
  const selfDriveVehicles = vehicles.filter(v => ['Sedan', 'SUV / 4x4', 'EV'].includes(v.type)).slice(0, 4);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Self Drive Car Rental Nepal",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Zenex Travel"
    },
    "description": "Rent cars without a driver in Kathmandu and Nepal. Freedom to explore at your own pace with our premium self-drive fleet.",
    "areaServed": "Nepal"
  };

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title="Self Drive Car Rental Nepal | Rent Without Driver in Kathmandu"
        description="Experience ultimate freedom with our self-drive car rentals in Nepal. Choose from a wide range of well-maintained sedans and SUVs. Book your self-drive car today!"
        canonicalUrl="https://zenextravel.com.np/self-drive-car-rental-nepal"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1170&auto=format&fit=crop" 
            alt="Self drive car rental on a scenic road in Nepal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0f3493]/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Self-Drive Car Rental Nepal
          </h1>
          <p className="text-xl text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
            Experience the ultimate freedom. Rent a car without a driver and explore Kathmandu and beyond at your own pace.
          </p>
          <div className="flex justify-center">
            <InlineEnquiryForm routeName="Self-Drive Enquiry" recommendedVehicles={['Sedan', 'SUV / 4x4', 'EV']} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0f3493] mb-6">Why Choose Self-Drive in Nepal?</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                For travelers and locals who value privacy and flexibility, our self-drive car rental service is the perfect choice. Whether you're planning a weekend getaway from Kathmandu, a business trip, or a family vacation, driving yourself gives you complete control over your itinerary. Stop where you want, stay as long as you like, and discover the hidden gems of Nepal on your own schedule.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Fully Insured</h3>
                    <p className="text-sm text-gray-500">Comprehensive insurance coverage for peace of mind.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-[#e53a24] flex items-center justify-center shrink-0">
                    <Car size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Well-Maintained</h3>
                    <p className="text-sm text-gray-500">Regularly serviced fleet ensuring reliability on mountain roads.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0f3493] mb-6">Requirements & Policies</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FileText className="text-[#e53a24] shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-900 block">Valid Driving License</strong>
                    <span className="text-gray-600">A valid Nepali driving license or International Driving Permit (IDP) is strictly required.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#e53a24] shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-900 block">Security Deposit</strong>
                    <span className="text-gray-600">A refundable security deposit or an original citizenship/passport must be kept as collateral during the rental period.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="text-[#e53a24] shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-900 block">Minimum Rental Period</strong>
                    <span className="text-gray-600">Minimum rental duration for self-drive is 24 hours.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-6 border-b border-gray-100 pb-4">
                  Available Self-Drive Vehicles
                </h3>
                <div className="space-y-6">
                  {selfDriveVehicles.map(v => (
                    <div key={v.id} className="flex gap-4 items-center group">
                      <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 leading-tight">{v.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{v.type}</p>
                        <Link to={`/vehicles/${v.id}?driver=self`} className="text-xs font-bold text-[#e53a24] hover:underline flex items-center gap-1">
                          Book Now <span className="text-[10px]">→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfDrive;
