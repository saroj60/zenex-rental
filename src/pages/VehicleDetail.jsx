import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users, Gauge, Fuel, CheckCircle2, Navigation, Shield, Wind, Calendar, Star, Languages, MessageCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';
import { useBooking } from '../context/BookingContext';

const VehicleDetail = () => {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const { vehicles, drivers } = useAppData();
  
  const vehicle = vehicles.find(v => v.id.toString() === id) || vehicles[0];
  
  const [activeImg, setActiveImg] = useState(vehicle.img);
  const [driverMode, setDriverMode] = useState('self'); // 'self', 'driver', 'luxury'
  
  const { isVehicleAvailable } = useBooking();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(3);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diffTime = Math.abs(e - s);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setDays(diffDays);
      setIsAvailable(isVehicleAvailable(vehicle.id, startDate, endDate));
    } else {
      setDays(3);
      setIsAvailable(true);
    }
  }, [startDate, endDate, vehicle.id, isVehicleAvailable]);

  useEffect(() => {
    setActiveImg(vehicle.img);
  }, [vehicle]);

  const driverOptions = {
    self: { label: 'Self Drive', price: 0 }
  };

  if (drivers && drivers.length > 0) {
    drivers.forEach(d => {
      if (!d.assignedVehicleId || d.assignedVehicleId.toString() === vehicle.id.toString()) {
        driverOptions[d.id] = { ...d };
      }
    });
  } else {
    driverOptions['driver'] = { 
      label: 'With Driver', 
      price: (vehicle.priceWithDriver && Number(vehicle.priceWithDriver) > Number(vehicle.price)) 
        ? (Number(vehicle.priceWithDriver) - Number(vehicle.price)) 
        : 1500 
    };
  }

  const selectedDriver = driverOptions[driverMode] || driverOptions['self'];

  const taxes = vehicle.tax !== undefined && vehicle.tax !== null ? Number(vehicle.tax) : 25;
  const currentVehiclePrice = driverMode === 'self' ? Number(vehicle.price) : (Number(vehicle.priceWithDriver) || Number(vehicle.price));
  const currentDriverFee = (driverMode === 'driver' && Number(vehicle.priceWithDriver) > 0) ? 0 : Number(driverOptions[driverMode]?.price || 0);

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.img];

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
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImg(img)} className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${activeImg === img ? 'border-sunset-orange' : 'border-transparent'}`}>
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
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
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Users size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Capacity</span><span className="font-bold">{vehicle.pax} Passengers</span></div>
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Gauge size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Transmission</span><span className="font-bold">{vehicle.trans}</span></div>
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Fuel size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Fuel Type</span><span className="font-bold">{vehicle.fuel}</span></div>
                  <div className="flex flex-col gap-1"><span className="text-himalayan-blue"><Wind size={20}/></span><span className="text-xs text-on-surface-variant uppercase tracking-wider">Climate</span><span className="font-bold">AC Installed</span></div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-outline-variant/30 flex gap-4 items-center bg-surface-container-low p-4 rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-himalayan-blue shadow-sm">
                    <span className="material-symbols-outlined">luggage</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Luggage Capacity Visualizer</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Fits up to {vehicle.luggage || 2} bags comfortably in the trunk.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-headline-md text-xl mb-4">Included Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              {vehicle.features && vehicle.features.length > 0 ? (
                vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-on-surface"><CheckCircle2 size={18} className="text-forest-green"/> {feature}</div>
                ))
              ) : (
                <div className="text-on-surface-variant text-sm">No specific features listed.</div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h3 className="font-headline-md text-xl mb-3">Vehicle Overview</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {vehicle.description || 'A premium vehicle ready for your next adventure.'}
            </p>
          </div>

          {/* Driver Profile (If selected) */}
          <div>
            {driverMode !== 'self' && selectedDriver && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint flex flex-col md:flex-row gap-6 items-center md:items-start animate-fade-in mt-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-outline-variant shadow-sm shrink-0">
                  {selectedDriver.img ? <img src={selectedDriver.img} alt="Driver" className="w-full h-full object-cover" /> : <Users className="w-full h-full p-2 text-gray-400" />}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4 className="font-headline-md text-lg">{selectedDriver.name}</h4>
                      <p className="text-sm text-himalayan-blue font-bold">{selectedDriver.type}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sunset-orange bg-surface-container px-2 py-1 rounded-full mt-2 md:mt-0 justify-center md:justify-start">
                      <Star size={14} className="fill-current" /> <span className="text-xs font-bold font-mono">{selectedDriver.rating}/5</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-2"><Languages size={16} className="text-outline"/> {selectedDriver.languages}</div>
                    <div className="flex items-center gap-2"><Shield size={16} className="text-outline"/> {selectedDriver.experience}</div>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-4 italic">"{selectedDriver.quote}"</p>
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
              <span className="text-4xl font-bold text-sunset-orange">{formatPrice(currentVehiclePrice + currentDriverFee)}</span>
              <span className="text-on-surface-variant mb-1">/ day</span>
            </div>

            {/* Driver Options Toggle */}
            <div className="space-y-1 mb-6">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Experience</label>
              <div className="flex bg-surface-container-low p-1 rounded-xl">
                {Object.keys(driverOptions).map(key => (
                  <button 
                    key={key} 
                    onClick={() => setDriverMode(key)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${driverMode === key ? 'bg-white shadow-sm text-himalayan-blue' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    {driverOptions[key].label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pickup Date</label>
                <div className="flex items-center bg-surface-container-low border-none rounded-lg p-3">
                  <Calendar size={18} className="text-himalayan-blue mr-2"/>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-transparent outline-none w-full text-on-surface" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Dropoff Date</label>
                <div className="flex items-center bg-surface-container-low border-none rounded-lg p-3">
                  <Calendar size={18} className="text-himalayan-blue mr-2"/>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-transparent outline-none w-full text-on-surface" />
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
              <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>Vehicle ({days} Days)</span> <span>{formatPrice(currentVehiclePrice * days)}</span></div>
              {driverMode !== 'self' && currentDriverFee > 0 && (
                <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>{driverOptions[driverMode].label}</span> <span>{formatPrice(currentDriverFee * days)}</span></div>
              )}
              {driverMode !== 'self' && currentDriverFee === 0 && (
                <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>{driverOptions[driverMode].label}</span> <span className="text-green-600 font-bold">Included</span></div>
              )}
              <div className="flex justify-between text-sm mb-2 text-on-surface-variant"><span>Taxes & Fees</span> <span>{formatPrice(taxes)}</span></div>
              <div className="border-t border-outline-variant/30 mt-2 pt-2 flex justify-between font-bold text-lg"><span>Total</span> <span>{formatPrice((currentVehiclePrice * days) + taxes + (currentDriverFee * days))}</span></div>
            </div>

            {!isAvailable && (
              <div className="bg-red-100 text-red-800 text-sm p-3 rounded-lg mb-4 text-center font-semibold">
                Vehicle is not available for these dates.
              </div>
            )}

            <Link 
              to={isAvailable ? `/checkout?car=${vehicle.id}&driver=${driverMode}&start=${startDate}&end=${endDate}` : '#'} 
              className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-colors shadow-lg ${
                isAvailable 
                  ? 'bg-himalayan-blue text-white hover:bg-primary active:scale-95 duration-200' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => !isAvailable && e.preventDefault()}
            >
              Continue to Book
            </Link>
            
            <a href="https://wa.me/9779767476521?text=Hi!%20I%20want%20to%20book%20the%20Toyota%20Fortuner." target="_blank" rel="noreferrer" className="mt-3 block w-full bg-[#25D366] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-[#1DA851] transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-95 duration-200">
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
