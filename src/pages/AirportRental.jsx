import React from 'react';
import SEO from '../components/SEO';
import { Plane, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import InlineEnquiryForm from '../components/InlineEnquiryForm';

const airportData = {
  ktm: {
    name: 'Tribhuvan International Airport (KTM)',
    city: 'Kathmandu',
    img: 'https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/dd/75/70.jpg',
    desc: 'Begin your Himalayan journey the moment you land. Skip the taxi lines and step directly into your premium rental vehicle at Nepal\'s primary international gateway.'
  },
  pkr: {
    name: 'Pokhara International Airport (PKR)',
    city: 'Pokhara',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Pokhara_International_Airport_03.jpg/800px-Pokhara_International_Airport_03.jpg',
    desc: 'Arriving in the city of lakes? Our team will be waiting at the arrivals terminal with your vehicle, ready for your Annapurna adventure.'
  }
};

const AirportRental = () => {
  const { code } = useParams();
  const airport = airportData[code] || airportData['ktm'];

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Kathmandu Airport Pickup | Airport Transfer Nepal"
        description="Reliable Kathmandu airport pickup and airport transfer services in Nepal. Hire cars, SUVs, or tourist buses for seamless transportation from Tribhuvan International Airport."
        canonicalUrl="https://zenextravel.com.np/airport-transfer"
      />
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center">
        <img src={airport.img} alt={airport.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        <div className="relative z-10 text-white px-margin-mobile md:px-margin-desktop w-full text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-himalayan-blue/20 backdrop-blur-md border border-himalayan-blue/50 text-sky-tint px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            <Plane size={16} /> Premium Airport Pickup
          </div>
          <h1 className="font-headline-lg text-4xl md:text-6xl font-extrabold mb-4">{airport.name} Car Rental</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed mx-auto md:mx-0">
            {airport.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to={`/vehicles?pickup=${code}`} className="bg-sunset-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e53a24] transition-colors shadow-lg active:scale-95 duration-200 text-center">
              View Available Cars
            </Link>
          </div>
          <div className="mt-12 flex justify-center md:justify-start">
            <InlineEnquiryForm 
              routeName={`${airport.name} Pickup`} 
              recommendedVehicles={['Sedan', 'SUV', 'Hiace (Group)', 'Coaster (Large Group)']} 
            />
          </div>
        </div>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto">
        <h2 className="font-headline-md text-3xl text-center mb-12 text-himalayan-blue">How Airport Pickup Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-tint text-center">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-himalayan-blue">
              <Clock size={32} />
            </div>
            <h3 className="font-headline-md text-xl mb-3">1. Flight Tracking</h3>
            <p className="text-on-surface-variant text-sm">Provide your flight number during booking. We monitor your flight in real-time, so we're there even if you're delayed.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-tint text-center relative md:-translate-y-4 shadow-md border-sunset-orange/30">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-sunset-orange">
              <MapPin size={32} />
            </div>
            <h3 className="font-headline-md text-xl mb-3">2. Meet & Greet</h3>
            <p className="text-on-surface-variant text-sm">Your driver (or agent) will be waiting at the arrivals hall holding a customized name board. No need to navigate busy terminals.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-tint text-center">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-himalayan-blue">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-headline-md text-xl mb-3">3. Direct Handover</h3>
            <p className="text-on-surface-variant text-sm">Your vehicle is parked in the VIP zone. After a quick ID check and handover, you're immediately on the road.</p>
          </div>
        </div>

        <div className="mt-16 bg-primary text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="font-headline-md text-3xl mb-4">Ready to bypass the taxi line?</h2>
            <p className="text-sky-tint text-lg mb-0">Secure your vehicle today and start your journey seamlessly.</p>
          </div>
          <a href={`https://wa.me/9779860156046?text=${encodeURIComponent('Hi, I am looking to book an airport pickup from ' + airport.name + '.')}`} target="_blank" rel="noreferrer" className="bg-white text-himalayan-blue px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-lg whitespace-nowrap">
            Book Now <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AirportRental;
