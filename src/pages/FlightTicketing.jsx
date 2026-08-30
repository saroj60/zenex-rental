import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { Plane, Globe, Mountain, Clock } from 'lucide-react';
import InlineEnquiryForm from '../components/InlineEnquiryForm';

const FlightTicketing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Zenex Travel Flight Ticketing",
    "description": "Domestic and international flight ticketing services in Nepal. Book mountain flights, Pokhara flights, and international connections.",
    "areaServed": "Nepal"
  };

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20">
      <SEO 
        title="Domestic & International Flight Ticketing Nepal | Zenex Travel"
        description="Book domestic flights in Nepal including Pokhara, Everest Base Camp (Lukla), and breathtaking Mountain Flights. We also handle international air ticketing."
        canonicalUrl="https://zenextravel.com.np/flight-ticketing-nepal"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1174&auto=format&fit=crop" 
            alt="Airplane flying over the Himalayas in Nepal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1e3a8a]/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Domestic & International Flights
          </h1>
          <p className="text-xl text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
            Hassle-free flight bookings across Nepal and worldwide. From Everest Mountain flights to international connections.
          </p>
          <div className="flex justify-center">
            <InlineEnquiryForm routeName="Flight Ticketing Enquiry" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Our Ticketing Services</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Beyond ground transportation, Zenex Travel is your one-stop solution for all air travel needs in Nepal. Whether you need a quick domestic hop to Pokhara, a thrilling flight to Lukla for your Everest trek, or international tickets, our agency provides competitive rates and instant confirmations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Domestic Flights</h3>
                    <p className="text-sm text-gray-500">Kathmandu to Pokhara, Chitwan (Bharatpur), Bhairahawa, and more.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <Mountain size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Mountain Flights</h3>
                    <p className="text-sm text-gray-500">1-hour scenic flights over Mount Everest. Guaranteed window seats.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-[#e53a24] flex items-center justify-center shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">International Flights</h3>
                    <p className="text-sm text-gray-500">Global connections with major airlines flying in and out of Kathmandu.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">24/7 Support</h3>
                    <p className="text-sm text-gray-500">Immediate assistance for flight delays, cancellations, or rescheduling.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Everest Mountain Flight</h2>
              <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-4 rounded-2xl">
                <img src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop" alt="Everest Mountain Flight" className="w-full md:w-64 h-40 object-cover rounded-xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">The Ultimate Himalayan Experience</h3>
                  <p className="text-gray-600 mb-4">Don't have time to trek? Take a 1-hour scenic flight early in the morning from Kathmandu airport. Witness the majestic Mount Everest and the sprawling Himalayan range from the comfort of a window seat.</p>
                  <a href="https://wa.me/9779860156046?text=Hi,%20I%20want%20to%20book%20an%20Everest%20Mountain%20Flight." target="_blank" rel="noreferrer" className="inline-block bg-[#e53a24] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">
                    Book Mountain Flight
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e3a8a] rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Instant Booking</h3>
                <p className="text-blue-100 mb-8">
                  Send us your travel dates and destinations on WhatsApp for immediate flight options and pricing.
                </p>
                
                <div className="space-y-4">
                  <a href="https://wa.me/9779860156046?text=Hi,%20I%20need%20help%20with%20flight%20ticketing." target="_blank" rel="noreferrer" className="w-full block text-center bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors">
                    Message on WhatsApp
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

export default FlightTicketing;
