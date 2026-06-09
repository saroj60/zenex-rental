import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users, Gauge, Fuel, CheckCircle2, Navigation, Shield, Wind, Calendar, Star, Languages, MessageCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';

const VehicleDetail = () => {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const { vehicles } = useAppData();
  
  const vehicle = vehicles.find(v => v.id.toString() === id) || vehicles[0];
  
  const [activeImg, setActiveImg] = useState(vehicle.img);
  const [driverMode, setDriverMode] = useState('self'); // 'self', 'driver', 'luxury'

  useEffect(() => {
    setActiveImg(vehicle.img);
  }, [vehicle]);

  const driverOptions = {
    self: { label: 'Self Drive', price: 0 },
    driver: { label: 'Car with Driver', price: 25 },
    luxury: { label: 'Luxury Chauffeur', price: 50 }
  };

  const images = [
    vehicle.img,
    '/images/luxury_car.png',
    '/images/economy_car.png'
  ];

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-8 bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-on-surface-variant mb-6 flex gap-2">
        <Link to="/" className="hover:text-himalayan-blue">Home</Link> / 
        <Link to="/vehicles" className="hover:text-himalayan-blue">Fleet</Link> / 
        <span className="text-himalayan-blue font-medium">{vehicle.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content (Images + Details) */}
        <div className="lg:w-2/3">
          {/* Gallery */}
          <div className="space-y-4 mb-8">
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm">
              <img src={activeImg} alt={vehicle.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {images.map((img, idx) => (
                <button key={idx} onClick={() => setActiveImg(img)} className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${activeImg === img ? 'border-sunset-orange' : 'border-transparent'}`}>
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Basics */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold">{vehicle.name} <span className="text-lg text-on-surface-variant font-normal">or similar</span></h1>
                <p className="text-on-surface-variant mt-1 flex items-center gap-2"><span className="bg-surface-container px-2 py-1 rounded text-xs font-bold uppercase">{vehicle.type}</span> Highly recommended for mountain roads</p>
              </div>
            </div>
            
            <div className="mt-8 border border-sky-tint rounded-2xl overflow-hidden">
              <div className="flex bg-surface-container-low border-b border-outline-variant/30">
                <button className="flex-1 py-3 text-sm font-bold bg-white text-himalayan-blue border-b-2 border-himalayan-blue">Specifications</button>
                <button className="flex-1 py-3 text-sm font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/50 transition-colors">Interior & Capacity</button>
              </div>
              
              <div className="p-6 bg-white animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Users size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Capacity</span><span className="font-bold">7 Passengers</span></div>
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Gauge size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Transmission</span><span className="font-bold">Automatic</span></div>
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Fuel size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Fuel Type</span><span className="font-bold">Diesel</span></div>
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Wind size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Climate</span><span className="font-bold">Dual AC</span></div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-outline-variant/30 flex gap-4 items-center bg-surface-container-low p-4 rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-himalayan-blue shadow-sm">
                    <span className="material-symbols-outlined">luggage</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Luggage Capacity Visualizer</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Fits 3 Large Suitcases + 2 Carry-on Bags comfortably in the trunk.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-headline-md text-xl mb-4">Included Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              <div className="flex items-center gap-2 text-on-surface"><CheckCircle2 size={18} className="text-forest-green"/> Comprehensive Insurance</div>
              <div className="flex items-center gap-2 text-on-surface"><CheckCircle2 size={18} className="text-forest-green"/> Unlimited Mileage</div>
              <div className="flex items-center gap-2 text-on-surface"><CheckCircle2 size={18} className="text-forest-green"/> 24/7 Roadside Assistance</div>
              <div className="flex items-center gap-2 text-on-surface"><Navigation size={18} className="text-forest-green"/> GPS Navigation Included</div>
              <div className="flex items-center gap-2 text-on-surface"><Shield size={18} className="text-forest-green"/> First Aid Kit & Spare Tire</div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h3 className="font-headline-md text-xl mb-3">Vehicle Overview</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              The Toyota Fortuner is a rugged yet refined SUV perfect for the challenging terrains of Nepal. Whether you're heading to the bumpy trails of Mustang or cruising through the Kathmandu Valley, its powerful diesel engine and high ground clearance guarantee a smooth and safe journey. The spacious interior ensures comfort for up to 7 passengers with ample luggage space.
            </p>
          </div>

          {/* Driver Options */}
          <div>
            <h3 className="font-headline-md text-xl mb-4">Choose Your Experience</h3>
            <div className="flex bg-surface-container-low p-1 rounded-xl mb-6">
              {Object.keys(driverOptions).map(key => (
                <button 
                  key={key} 
                  onClick={() => setDriverMode(key)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${driverMode === key ? 'bg-white shadow-sm text-himalayan-blue' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {driverOptions[key].label}
                </button>
              ))}
            </div>

            {driverMode !== 'self' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint flex flex-col md:flex-row gap-6 items-center md:items-start animate-fade-in">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-outline-variant shadow-sm shrink-0">
                  <img src={driverMode === 'driver' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dinesh_Subba_%28Limbu%29.jpg/800px-Dinesh_Subba_%28Limbu%29.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bipin_Karki.jpg/800px-Bipin_Karki.jpg'} alt="Driver" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4 className="font-headline-md text-lg">{driverMode === 'driver' ? 'Ramesh Thapa' : 'Captain Rajesh'}</h4>
                      <p className="text-sm text-himalayan-blue font-bold">{driverMode === 'driver' ? 'Verified Local Driver' : 'Elite Luxury Chauffeur'}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sunset-orange bg-surface-container px-2 py-1 rounded-full mt-2 md:mt-0 justify-center md:justify-start">
                      <Star size={14} className="fill-current" /> <span className="text-xs font-bold font-mono">4.9/5</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-2"><Languages size={16} className="text-outline"/> English, Nepali, Hindi</div>
                    <div className="flex items-center gap-2"><Shield size={16} className="text-outline"/> {driverMode === 'driver' ? '8 Years Exp.' : '15 Years Exp.'}</div>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-4 italic">"I know every curve of the mountain roads. Your safety is my priority."</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Booking Widget */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-24 bg-white rounded-2xl shadow-[0_20px_40px_rgba(15,76,129,0.08)] border border-sky-tint p-6">
            
            {vehicle.urgency === 'High Demand' && (
              <div className="bg-sunset-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg mb-4 inline-flex items-center gap-2 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span> High Demand: Only 2 left for these dates
              </div>
            )}

            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold text-sunset-orange">{formatPrice(vehicle.price + driverOptions[driverMode].price)}</span>
              <span className="text-on-surface-variant mb-1">/ day</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pickup Date</label>
                <div className="flex items-center bg-surface-container-low border-none rounded-lg p-3">
                  <Calendar size={18} className="text-himalayan-blue mr-2"/>
                  <input type="date" className="bg-transparent outline-none w-full text-on-surface" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Dropoff Date</label>
                <div className="flex items-center bg-surface-container-low border-none rounded-lg p-3">
                  <Calendar size={18} className="text-himalayan-blue mr-2"/>
                  <input type="date" className="bg-transparent outline-none w-full text-on-surface" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pickup Location</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface appearance-none outline-none">
                  <option>Kathmandu Airport (TIA)</option>
                  <option>Thamel City Center</option>
                  <option>Pokhara Airport</option>
                </select>
              </div>
            </div>

            <div className="bg-surface p-4 rounded-lg mb-6">
              <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>Vehicle (3 Days)</span> <span>{formatPrice(vehicle.price * 3)}</span></div>
              {driverMode !== 'self' && (
                <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>{driverOptions[driverMode].label}</span> <span>{formatPrice(driverOptions[driverMode].price * 3)}</span></div>
              )}
              <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>Taxes & Fees</span> <span>{formatPrice(25)}</span></div>
              <div className="border-t border-outline-variant/30 mt-2 pt-2 flex justify-between font-bold text-lg"><span>Total</span> <span>{formatPrice((vehicle.price * 3) + 25 + (driverOptions[driverMode].price * 3))}</span></div>
            </div>

            <Link to={`/checkout?car=${vehicle.id}&driver=${driverMode}`} className="block w-full bg-himalayan-blue text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-primary transition-colors shadow-lg active:scale-95 duration-200">
              Continue to Book
            </Link>
            
            <a href="https://wa.me/9779800000000?text=Hi!%20I%20want%20to%20book%20the%20Toyota%20Fortuner." target="_blank" rel="noreferrer" className="mt-3 block w-full bg-[#25D366] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-[#1DA851] transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-95 duration-200">
              <MessageCircle size={20} /> Book via WhatsApp
            </a>
            
            <p className="text-center text-xs text-on-surface-variant mt-4">You won't be charged yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
