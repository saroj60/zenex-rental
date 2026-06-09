import React from 'react';
import { MapPin, Calendar, Clock, ChevronRight, Settings, CreditCard, Shield, CarFront, FileText, Heart, Navigation, Download, X, Map as MapIcon, PhoneCall } from 'lucide-react';
import StationMap from '../../components/StationMap';

const UserDashboard = () => {
  const [showDriverTracking, setShowDriverTracking] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Welcome back, Sarah!</h1>
          <p className="text-on-surface-variant mt-1">Manage your trips and account settings here.</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/800px-Outdoors-man-portrait_%28cropped%29.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Trip Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-tint overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-forest-green text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Confirmed</span>
            </div>
            <div className="p-6">
              <h2 className="font-headline-md text-xl mb-6">Your Upcoming Trip</h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2021_Toyota_Fortuner_2.4_VRZ_2WD_GN155R_%2820211110%29.jpg/800px-2021_Toyota_Fortuner_2.4_VRZ_2WD_GN155R_%2820211110%29.jpg" alt="Car" className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm bg-surface-container" />
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg">Toyota Fortuner</h3>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant"><Calendar size={16} className="text-himalayan-blue"/> Oct 15 - Oct 18, 2026</div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant"><MapPin size={16} className="text-himalayan-blue"/> Pickup: TIA, Kathmandu</div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant"><Clock size={16} className="text-himalayan-blue"/> Time: 10:00 AM NPT</div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-outline-variant/30 gap-4">
              <span className="text-sm font-bold text-himalayan-blue">Booking Ref: #ND-8492</span>
              <div className="flex gap-2">
                <button className="text-himalayan-blue bg-white border border-himalayan-blue/20 px-4 py-2 rounded-lg text-sm font-bold hover:bg-surface-container-low transition-colors flex items-center gap-2"><FileText size={16} /> Invoice</button>
                <button className="text-white bg-himalayan-blue px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary transition-colors flex items-center gap-2">Extend Trip</button>
              </div>
            </div>
          </div>

          {/* Live Utilities for Current Trip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setShowDriverTracking(true)}
              className="bg-himalayan-blue text-white p-4 rounded-xl flex items-center gap-4 hover:bg-primary transition-transform hover:scale-[1.02] active:scale-95 shadow-md group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Navigation className="animate-pulse" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold">Live Driver Tracking</h3>
                <p className="text-xs text-white/80 mt-1">Track your driver to pickup point</p>
              </div>
              <ChevronRight />
            </button>

            <button className="bg-forest-green text-white p-4 rounded-xl flex items-center gap-4 hover:bg-green-700 transition-transform hover:scale-[1.02] active:scale-95 shadow-md group">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Download />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold">Offline Nepal Guide</h3>
                <p className="text-xs text-white/80 mt-1">Download maps & itinerary (42MB)</p>
              </div>
            </button>
          </div>

          {/* Station Map */}
          <StationMap />

          {/* Past Trips List */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-tint p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-xl">Past Trips</h2>
              <button className="text-sm font-bold text-sunset-orange hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Suzuki Swift', date: 'Aug 10 - Aug 12, 2026', loc: 'Pokhara', status: 'Completed' },
                { name: 'Mahindra Scorpio', date: 'May 05 - May 15, 2026', loc: 'Mustang', status: 'Completed' }
              ].map((trip, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                      <CarFront className="text-himalayan-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{trip.name}</h4>
                      <p className="text-xs text-on-surface-variant">{trip.date} • {trip.loc}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-outline" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Settings Area */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-sky-tint p-6">
            <h3 className="font-headline-md text-lg mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl text-center">
                <span className="block text-2xl font-bold text-himalayan-blue">3</span>
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">Total Trips</span>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl text-center">
                <span className="block text-2xl font-bold text-himalayan-blue">840</span>
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">KM Driven</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-sky-tint p-6">
            <h3 className="font-headline-md text-lg mb-4">Saved Favorites</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tata_Nexon_EV_Front.jpg/800px-Tata_Nexon_EV_Front.jpg" alt="EV" className="w-16 h-12 object-cover rounded shadow-sm bg-surface-container" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-on-surface">Tata Nexon EV</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Electric SUV</p>
                </div>
                <button className="text-sunset-orange hover:scale-110 transition-transform"><Heart size={18} className="fill-current" /></button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-sky-tint p-6">
            <h3 className="font-headline-md text-lg mb-4">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors text-sm font-medium">
                <span className="flex items-center gap-3"><Settings size={18} className="text-himalayan-blue"/> Personal Info</span>
                <ChevronRight size={18} className="text-outline" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors text-sm font-medium">
                <span className="flex items-center gap-3"><CreditCard size={18} className="text-himalayan-blue"/> Payment Methods</span>
                <ChevronRight size={18} className="text-outline" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors text-sm font-medium">
                <span className="flex items-center gap-3"><Shield size={18} className="text-himalayan-blue"/> Security</span>
                <ChevronRight size={18} className="text-outline" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Driver Tracking Modal */}
      {showDriverTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border-2 border-himalayan-blue">
            <div className="bg-himalayan-blue p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2"><Navigation size={18}/> Driver ETA: 12 Mins</h3>
              <button onClick={() => setShowDriverTracking(false)} className="text-white/80 hover:text-white bg-black/20 rounded-full p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="relative h-64 bg-surface-container-low">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kathmandu_map.png/800px-Kathmandu_map.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              
              {/* Route line simulation */}
              <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                <path d="M 100 150 Q 200 50 300 200 T 450 100" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="8 4" className="animate-pulse" />
              </svg>
              
              {/* Driver Marker */}
              <div className="absolute top-[80px] left-[180px] text-himalayan-blue drop-shadow-md animate-bounce">
                <CarFront size={32} className="bg-white rounded-full p-1" />
              </div>
              
              {/* User Marker */}
              <div className="absolute top-[85px] left-[430px] text-sunset-orange drop-shadow-md">
                <MapPin size={32} className="bg-white rounded-full p-1" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dinesh_Subba_%28Limbu%29.jpg/800px-Dinesh_Subba_%28Limbu%29.jpg" alt="Driver" className="w-16 h-16 rounded-full border-2 border-himalayan-blue object-cover shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg">Ramesh Thapa</h4>
                  <p className="text-sm text-on-surface-variant flex items-center gap-1">
                    4.9 ★ • Toyota Fortuner (Ba 12 Cha 3456)
                  </p>
                </div>
                <a href="tel:+9779800000000" className="w-12 h-12 bg-forest-green text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                  <PhoneCall size={20} />
                </a>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 text-sm text-on-surface-variant flex gap-2 items-start">
                <div className="w-2 h-2 rounded-full bg-forest-green mt-1.5 flex-shrink-0 animate-pulse"></div>
                <p>Driver is currently passing Ring Road. Please be ready at the hotel lobby.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
