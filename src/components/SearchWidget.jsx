import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Car, Search, HeadphonesIcon, ShieldCheck, Zap, Shield, Users, Map, Navigation } from 'lucide-react';

const SearchWidget = ({ activeTab = 'cars' }) => {
  // Car State
  const [pickupLocation, setPickupLocation] = useState('Kathmandu, Nepal');
  const [dropoffLocation, setDropoffLocation] = useState('Kathmandu, Nepal');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [vehicleType, setVehicleType] = useState('SUV / 4x4');
  const [isSearching, setIsSearching] = useState(false);
  
  // Tour State
  const [tourDestination, setTourDestination] = useState('Everest Region');
  const [tourType, setTourType] = useState('Trekking');
  const [travelMonth, setTravelMonth] = useState('October');
  const [guests, setGuests] = useState('2');

  const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (activeTab === 'cars') {
        const params = new URLSearchParams({
          pickup: pickupLocation,
          dropoff: dropoffLocation,
          start: pickupDate,
          end: returnDate,
          type: vehicleType
        });
        navigate(`/vehicles?${params.toString()}`);
      } else {
        const params = new URLSearchParams({
          destination: tourDestination,
          type: tourType,
          month: travelMonth,
          guests: guests
        });
        navigate(`/packages?${params.toString()}`);
      }
    }, 400);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/10">
      
      {/* Top Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-300/50 bg-[#F4F6F8]/80 backdrop-blur-md rounded-2xl p-2 mb-6">
        {activeTab === 'cars' ? (
          <>
            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <MapPin size={14} className="text-gray-400" /> Pickup Location
              </label>
              <input 
                type="text"
                list="location-options"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="City or Airport"
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none placeholder:text-gray-400 text-sm p-0"
              />
            </div>
            
            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <MapPin size={14} className="text-gray-400" /> Drop-off Location
              </label>
              <input 
                type="text"
                list="location-options"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="City or Airport"
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none placeholder:text-gray-400 text-sm p-0"
              />
            </div>
            
            <datalist id="location-options">
              <option value="Kathmandu, Nepal" />
              <option value="Pokhara, Nepal" />
              <option value="Chitwan, Nepal" />
              <option value="Lumbini, Nepal" />
              <option value="Mustang, Nepal" />
              <option value="Tribhuvan International Airport (KTM)" />
            </datalist>
            
            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Calendar size={14} className="text-gray-400" /> Pickup Date
              </label>
              <input 
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none cursor-pointer text-sm"
              />
            </div>
            
            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Calendar size={14} className="text-gray-400" /> Return Date
              </label>
              <input 
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none cursor-pointer text-sm"
              />
            </div>
            
            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Car size={14} className="text-gray-400" /> Vehicle Type
              </label>
              <select 
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 appearance-none outline-none cursor-pointer text-sm"
              >
                <option value="SUV / 4x4">SUV / 4x4</option>
                <option value="Economy">Economy</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="EV">EV</option>
                <option value="Van / Micro">Van / Micro</option>
                <option value="Minibus">Minibus</option>
                <option value="Pickup Truck">Pickup Truck</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <MapPin size={14} className="text-gray-400" /> Destination
              </label>
              <select 
                value={tourDestination}
                onChange={(e) => setTourDestination(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 appearance-none outline-none cursor-pointer text-sm p-0"
              >
                <option value="Everest Region">Everest Region</option>
                <option value="Annapurna Region">Annapurna Region</option>
                <option value="Kathmandu Valley">Kathmandu Valley</option>
                <option value="Chitwan National Park">Chitwan National Park</option>
                <option value="Lumbini">Lumbini (Birthplace of Buddha)</option>
                <option value="Mustang">Mustang</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Tibet">Tibet</option>
              </select>
            </div>

            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Navigation size={14} className="text-gray-400" /> Tour Type
              </label>
              <select 
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 appearance-none outline-none cursor-pointer text-sm p-0"
              >
                <option value="Trekking">Trekking</option>
                <option value="Cultural Tour">Cultural Tour</option>
                <option value="Wildlife Safari">Wildlife Safari</option>
                <option value="Wellness & Yoga">Wellness & Yoga</option>
                <option value="Heli Tour">Heli Tour</option>
              </select>
            </div>

            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Calendar size={14} className="text-gray-400" /> Travel Month
              </label>
              <select 
                value={travelMonth}
                onChange={(e) => setTravelMonth(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 appearance-none outline-none cursor-pointer text-sm p-0"
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div className="p-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Users size={14} className="text-gray-400" /> Guests
              </label>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 appearance-none outline-none cursor-pointer text-sm p-0"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People</option>
              </select>
            </div>
          </>
        )}
        
        <div className="p-2 flex">
          <button
            onClick={handleSearch}
            className={`w-full bg-[#1e3a8a] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              isSearching ? 'scale-95 opacity-90' : 'hover:bg-[#152c6e] shadow-md hover:shadow-lg'
            }`}
          >
            <Search size={18} /> {activeTab === 'cars' ? 'Search Vehicles' : 'Explore Packages'}
          </button>
        </div>
      </div>

      {/* Middle Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 mb-6 border-b border-gray-400/20">
        <div className="flex items-start gap-3">
          <HeadphonesIcon className="text-[#1e3a8a] mt-1" size={24} />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">24/7 Support</h4>
            <p className="text-xs text-gray-600 mt-0.5">We're here anytime</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="text-[#1e3a8a] mt-1" size={24} />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Expert Guides & Drivers</h4>
            <p className="text-xs text-gray-600 mt-0.5">Experienced & trusted</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Navigation className="text-[#1e3a8a] mt-1" size={24} />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Custom Tour Packages</h4>
            <p className="text-xs text-gray-600 mt-0.5">Tailored to your needs</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="text-[#1e3a8a] mt-1" size={24} />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Safe & Insured Travel</h4>
            <p className="text-xs text-gray-600 mt-0.5">Your safety, our priority</p>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/60 backdrop-blur-md rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#1e3a8a] rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Car size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">1500+</h3>
            <h4 className="font-bold text-sm text-gray-700">Vehicles</h4>
            <p className="text-xs text-gray-500">Wide range of cars</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Users size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">10,000+</h3>
            <h4 className="font-bold text-sm text-gray-700">Happy Travelers</h4>
            <p className="text-xs text-gray-500">Trusted by thousands</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#e53a24] rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Map size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">100+</h3>
            <h4 className="font-bold text-sm text-gray-700">Destinations</h4>
            <p className="text-xs text-gray-500">Across beautiful Nepal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
