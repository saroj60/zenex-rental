import React, { useState } from 'react';
import { Map, MapPin, Fuel, Zap, Navigation, Clock, Search } from 'lucide-react';

const StationMap = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'fuel', 'ev'

  const stations = [
    { id: 1, name: 'Sajha Petrol Pump', type: 'fuel', distance: '1.2 km', status: 'Open Now', lat: 27.7172, lng: 85.3240 },
    { id: 2, name: 'NEA Fast Charging Station', type: 'ev', distance: '2.5 km', status: '2/4 Available', lat: 27.7111, lng: 85.3122 },
    { id: 3, name: 'Kalanki Fuel Center', type: 'fuel', distance: '4.8 km', status: 'Open Now', lat: 27.6980, lng: 85.2861 },
    { id: 4, name: 'Bhatbhateni EV Charge', type: 'ev', distance: '3.1 km', status: 'In Use', lat: 27.7225, lng: 85.3305 }
  ];

  const filteredStations = filter === 'all' ? stations : stations.filter(s => s.type === filter);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-tint overflow-hidden">
      <div className="p-6 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl font-bold flex items-center gap-2">
            <Map className="text-himalayan-blue" /> Interactive Station Map
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">Find fuel and EV charging stations along your route.</p>
        </div>
        
        <div className="flex bg-surface-container-low p-1 rounded-lg">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('fuel')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1 ${filter === 'fuel' ? 'bg-white shadow-sm text-sunset-orange' : 'text-on-surface-variant'}`}
          >
            <Fuel size={16} /> Fuel
          </button>
          <button 
            onClick={() => setFilter('ev')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1 ${filter === 'ev' ? 'bg-white shadow-sm text-forest-green' : 'text-on-surface-variant'}`}
          >
            <Zap size={16} /> EV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 h-[400px]">
        {/* Map Placeholder */}
        <div className="col-span-2 bg-surface-container-low relative flex items-center justify-center border-r border-outline-variant/30">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kathmandu_map.png/800px-Kathmandu_map.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
          
          {/* Mock Markers */}
          <div className="absolute top-1/4 left-1/3 bg-sunset-orange text-white p-2 rounded-full shadow-lg animate-bounce cursor-pointer">
            <Fuel size={20} />
          </div>
          <div className="absolute top-1/2 right-1/4 bg-forest-green text-white p-2 rounded-full shadow-lg cursor-pointer">
            <Zap size={20} />
          </div>
          <div className="absolute bottom-1/3 left-1/2 bg-himalayan-blue text-white px-3 py-1 rounded-full shadow-lg font-bold text-xs flex items-center gap-1 cursor-pointer">
            <MapPin size={12} /> You are here
          </div>
        </div>

        {/* List */}
        <div className="col-span-1 overflow-y-auto p-4 space-y-3 bg-surface">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input type="text" placeholder="Search location..." className="w-full bg-white border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-himalayan-blue" />
          </div>

          {filteredStations.map(station => (
            <div key={station.id} className="bg-white p-3 rounded-xl border border-outline-variant/50 hover:border-himalayan-blue transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${station.type === 'ev' ? 'bg-forest-green/10 text-forest-green' : 'bg-sunset-orange/10 text-sunset-orange'}`}>
                    {station.type === 'ev' ? <Zap size={16} /> : <Fuel size={16} />}
                  </div>
                  <h4 className="font-bold text-sm text-on-surface group-hover:text-himalayan-blue transition-colors">{station.name}</h4>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span className="flex items-center gap-1"><Navigation size={12}/> {station.distance}</span>
                <span className={`font-bold flex items-center gap-1 ${station.status.includes('Use') ? 'text-sunset-orange' : 'text-forest-green'}`}>
                  <Clock size={12} /> {station.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationMap;
