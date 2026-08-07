import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Shield, Compass, Mountain, Map as MapIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROUTES = [
  {
    id: 'ktm-pkr',
    from: 'Kathmandu',
    to: 'Pokhara',
    d: 'M 450 250 Q 375 200 300 200',
    distance: '200 km',
    time: '6-7 hours',
    terrain: 'Highway / Paved',
    vehicle: 'Sedan / SUV',
    desc: 'The most popular tourist route connecting the capital with the city of lakes.',
    points: { x1: 450, y1: 250, x2: 300, y2: 200 }
  },
  {
    id: 'ktm-cht',
    from: 'Kathmandu',
    to: 'Chitwan',
    d: 'M 450 250 Q 380 280 350 320',
    distance: '160 km',
    time: '5-6 hours',
    terrain: 'Highway / Paved',
    vehicle: 'Sedan / SUV',
    desc: 'A scenic drive descending from the hills into the lush jungles of Terai.',
    points: { x1: 450, y1: 250, x2: 350, y2: 320 }
  },
  {
    id: 'pkr-cht',
    from: 'Pokhara',
    to: 'Chitwan',
    d: 'M 300 200 Q 300 280 350 320',
    distance: '145 km',
    time: '4-5 hours',
    terrain: 'Highway / Valley',
    vehicle: 'Sedan / SUV',
    desc: 'Connects the mountains directly with the wildlife reserve.',
    points: { x1: 300, y1: 200, x2: 350, y2: 320 }
  },
  {
    id: 'pkr-mst',
    from: 'Pokhara',
    to: 'Mustang',
    d: 'M 300 200 Q 280 150 250 100',
    distance: '170 km',
    time: '8-10 hours',
    terrain: 'Off-road / Unpaved',
    vehicle: '4x4 Off-roader',
    desc: 'A rugged and thrilling adventure into the trans-Himalayan desert.',
    points: { x1: 300, y1: 200, x2: 250, y2: 100 }
  },
  {
    id: 'cht-lmb',
    from: 'Chitwan',
    to: 'Lumbini',
    d: 'M 350 320 Q 280 340 220 340',
    distance: '135 km',
    time: '3-4 hours',
    terrain: 'Flat Highway',
    vehicle: 'Any Vehicle',
    desc: 'Smooth highway drive connecting the jungle to the birthplace of Buddha.',
    points: { x1: 350, y1: 320, x2: 220, y2: 340 }
  },
  {
    id: 'ktm-lkl',
    from: 'Kathmandu',
    to: 'Everest Region',
    d: 'M 450 250 Q 520 220 600 220',
    distance: '275 km',
    time: '12-14 hours',
    terrain: 'Mountain Roads',
    vehicle: '4x4 SUV',
    desc: 'Challenging drive to the gateways of the Everest region.',
    points: { x1: 450, y1: 250, x2: 600, y2: 220 }
  }
];

const DESTINATIONS = [
  { id: 'ktm', name: 'Kathmandu', x: 450, y: 250, icon: MapIcon },
  { id: 'pkr', name: 'Pokhara', x: 300, y: 200, icon: Mountain },
  { id: 'cht', name: 'Chitwan', x: 350, y: 320, icon: Compass },
  { id: 'lmb', name: 'Lumbini', x: 220, y: 340, icon: Shield },
  { id: 'mst', name: 'Mustang', x: 250, y: 100, icon: Navigation },
  { id: 'evr', name: 'Everest Region', x: 600, y: 220, icon: Mountain }
];

const InteractiveRouteMap = () => {
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeDest, setActiveDest] = useState(null);

  return (
    <section className="bg-[#ebf3fa] py-16 px-4 md:px-8 relative overflow-hidden">
      {/* SEO Hidden Text */}
      <div className="sr-only">
        <h2>Our Popular Travel Routes in Nepal</h2>
        <p>Explore our covered destinations including Kathmandu, Pokhara, Chitwan, Lumbini, and Mustang. We offer premium vehicles for all terrains, from paved highways to rugged off-road mountain trails.</p>
        <ul>
          {ROUTES.map(route => (
            <li key={route.id}>
              {route.from} to {route.to}: {route.distance}, takes around {route.time}. Terrain: {route.terrain}. Recommended vehicle: {route.vehicle}. {route.desc}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Info Panel */}
          <div className="w-full lg:w-1/3 z-10">
            <h2 className="text-4xl font-extrabold text-[#0f3493] mb-4">Interactive<br/>Route Map</h2>
            <p className="text-gray-600 mb-8 font-medium">Hover over the routes or cities to see distance, time, and vehicle recommendations for your Himalayan journey.</p>
            
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 min-h-[300px] flex flex-col transition-all">
              {activeRoute ? (
                <div className="animate-fade-in flex flex-col h-full">
                  <div className="flex items-center gap-2 text-[#e53a24] font-bold mb-2">
                    <span>{activeRoute.from}</span>
                    <ArrowRightIcon />
                    <span>{activeRoute.to}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4">{activeRoute.distance} Journey</h3>
                  <p className="text-gray-600 text-sm mb-6">{activeRoute.desc}</p>
                  
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Estimated Time</p>
                        <p className="text-sm font-bold text-gray-900">{activeRoute.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <Mountain size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Terrain</p>
                        <p className="text-sm font-bold text-gray-900">{activeRoute.terrain}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#e53a24]">
                        <Navigation size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Recommended Vehicle</p>
                        <p className="text-sm font-bold text-gray-900">{activeRoute.vehicle}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/vehicles" className="w-full bg-[#1e3a8a] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#152c6e] transition-colors mt-auto">
                    Find Vehicles <ChevronRight size={18} />
                  </Link>
                </div>
              ) : activeDest ? (
                <div className="animate-fade-in flex flex-col h-full justify-center text-center p-6">
                  <div className="w-16 h-16 bg-[#1e3a8a]/10 text-[#1e3a8a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{activeDest.name}</h3>
                  <p className="text-gray-600 mb-6 font-medium">Select a connected route to view travel details and vehicle recommendations.</p>
                  <Link to={`/destinations`} className="text-[#e53a24] font-bold hover:underline flex items-center justify-center gap-1">
                    Explore {activeDest.name} <ChevronRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="animate-fade-in flex flex-col h-full justify-center items-center text-center text-gray-400 p-6">
                  <MapIcon size={48} className="mb-4 opacity-50" />
                  <h3 className="text-lg font-bold text-gray-500 mb-2">Explore the Map</h3>
                  <p className="text-sm font-medium">Hover over the glowing routes or city markers on the map to see journey details.</p>
                </div>
              )}
            </div>
          </div>

          {/* SVG Map */}
          <div className="w-full lg:w-2/3 h-[500px] bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden flex items-center justify-center">
            {/* Background Map Graphic (Abstract grid or contour) */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <svg viewBox="0 0 800 500" className="w-full h-full max-w-full drop-shadow-xl z-10 relative">
              <defs>
                <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#e53a24" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Draw Routes */}
              {ROUTES.map(route => {
                const isActive = activeRoute?.id === route.id;
                return (
                  <g key={route.id} 
                     onMouseEnter={() => setActiveRoute(route)} 
                     onMouseLeave={() => setActiveRoute(null)}
                     className="cursor-pointer transition-all duration-300"
                  >
                    {/* Invisible thicker path for easier hovering */}
                    <path d={route.d} fill="none" stroke="transparent" strokeWidth="40" />
                    
                    {/* Base Path */}
                    <path 
                      d={route.d} 
                      fill="none" 
                      stroke={isActive ? "url(#route-gradient)" : "#e2e8f0"} 
                      strokeWidth={isActive ? "6" : "4"} 
                      strokeLinecap="round"
                      className="transition-all duration-300"
                      filter={isActive ? "url(#glow)" : ""}
                    />
                    
                    {/* Animated Dashed Path (Simulates cars moving) */}
                    <path 
                      d={route.d} 
                      fill="none" 
                      stroke={isActive ? "#ffffff" : "#cbd5e1"} 
                      strokeWidth={isActive ? "3" : "2"} 
                      strokeLinecap="round"
                      strokeDasharray={isActive ? "10 15" : "5 10"}
                      className={isActive ? "animate-route-dash text-white" : ""}
                    />
                  </g>
                );
              })}

              {/* Draw Destinations */}
              {DESTINATIONS.map(dest => {
                const isRouteActive = activeRoute?.from === dest.name || activeRoute?.to === dest.name;
                const isHovered = activeDest?.id === dest.id;
                const active = isRouteActive || isHovered;
                
                return (
                  <g key={dest.id} 
                     transform={`translate(${dest.x}, ${dest.y})`}
                     onMouseEnter={() => setActiveDest(dest)}
                     onMouseLeave={() => setActiveDest(null)}
                     className="cursor-pointer"
                  >
                    {/* Invisible stable hit area to prevent hover flicker */}
                    <circle r="40" fill="transparent" />
                    
                    {/* Pulse ring if active */}
                    {active && (
                      <circle r="20" fill="#e53a24" opacity="0.2" className="animate-ping origin-center" />
                    )}
                    
                    {/* Node Background */}
                    <circle 
                      r={active ? "12" : "8"} 
                      fill={active ? "#e53a24" : "#1e3a8a"} 
                      stroke="white" 
                      strokeWidth="3" 
                      className="transition-all duration-300 shadow-xl"
                      filter="url(#glow)"
                    />
                    
                    {/* Label Box */}
                    <g transform="translate(15, -15)" className={`transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-70'}`}>
                      <rect x="0" y="0" width={dest.name.length * 8 + 20} height="28" rx="14" fill="white" stroke={active ? "#e53a24" : "#f1f5f9"} strokeWidth="2" filter="url(#glow)" />
                      <text x="10" y="19" fontSize="12" fontWeight="bold" fill={active ? "#e53a24" : "#334155"}>
                        {dest.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
            
            {/* Overlay Map Labels */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100 text-xs font-bold text-gray-500 flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#1e3a8a]"></div> Hub</div>
              <div className="flex items-center gap-2"><div className="w-8 h-1 bg-[#cbd5e1] border-dashed border-t-2 border-white"></div> Route</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#e53a24] animate-pulse"></div> Active</div>
            </div>
          </div>
      </div>

        {/* Route Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROUTES.map((route) => (
            <div 
              key={route.id} 
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 relative overflow-hidden"
              onMouseEnter={() => setActiveRoute(route)} 
              onMouseLeave={() => setActiveRoute(null)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] -z-10 group-hover:from-blue-100 transition-colors duration-500"></div>
              
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3 text-[#1e3a8a] font-extrabold text-[19px]">
                  <span>{route.from}</span>
                  <div className="w-8 border-t-2 border-dashed border-[#e53a24] relative">
                    <div className="absolute -right-1 -top-1.5 text-[#e53a24]"><ChevronRight size={14} /></div>
                  </div>
                  <span>{route.to}</span>
                </div>
              </div>
              
              <p className="text-gray-500 font-medium text-[15px] mb-6 leading-relaxed relative z-10 line-clamp-2">{route.desc}</p>
              
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12} className="text-[#1e3a8a]"/> Distance</p>
                  <p className="font-bold text-gray-900 text-sm">{route.distance}</p>
                </div>
                <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={12} className="text-[#e53a24]"/> Duration</p>
                  <p className="font-bold text-gray-900 text-sm">{route.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default InteractiveRouteMap;
