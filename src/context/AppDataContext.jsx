import React, { createContext, useContext, useState, useEffect } from 'react';

const AppDataContext = createContext();

const initialVehicles = [
  { id: 1, type: 'Economy', name: 'Suzuki Swift', price: '4500', img: '/images/economy_car.png', pax: 4, trans: 'Manual', fuel: 'Petrol', luggage: 2, rating: 4.8, urgency: 'Available Now' },
  { id: 2, type: 'SUV / 4x4', name: 'Toyota Fortuner', price: '19500', img: '/images/suv_car.png', pax: 7, trans: 'Auto', fuel: 'Diesel', luggage: 4, rating: 4.9, urgency: 'High Demand' },
  { id: 3, type: 'Luxury', name: 'Range Rover Vogue', price: '32500', img: '/images/luxury_car.png', pax: 5, trans: 'Auto', fuel: 'Petrol', luggage: 4, rating: 5.0, urgency: 'Limited Availability' },
  { id: 4, type: 'EV', name: 'Tata Nexon EV', price: '7150', img: '/images/economy_car.png', pax: 5, trans: 'Auto', fuel: 'Electric', luggage: 3, rating: 4.7, urgency: 'Available Now' },
  { id: 5, type: 'SUV / 4x4', name: 'Mahindra Scorpio', price: '10400', img: '/images/suv_car.png', pax: 7, trans: 'Manual', fuel: 'Diesel', luggage: 4, rating: 4.6, urgency: 'High Demand' },
  { id: 6, type: 'Van / Micro', name: 'Toyota Hiace', price: '11000', img: '/images/suv_car.png', pax: 14, trans: 'Manual', fuel: 'Diesel', luggage: 6, rating: 4.5, urgency: 'Available Now' },
  { id: 7, type: 'SUV / 4x4', name: 'Hyundai Creta', price: '8400', img: '/images/suv_car.png', pax: 5, trans: 'Auto', fuel: 'Petrol', luggage: 3, rating: 4.8, urgency: 'Available Now' },
  { id: 8, type: 'SUV / 4x4', name: 'Ford Everest', price: '14500', img: '/images/suv_car.png', pax: 7, trans: 'Auto', fuel: 'Diesel', luggage: 5, rating: 4.9, urgency: 'Limited Availability' }
];

const initialDestinations = [
  { id: 'kathmandu', name: 'Kathmandu Valley', region: 'Valley', desc: 'History, Culture & Temples', img: '/images/destinations/kathmandu.png', span: 'md:col-span-2 md:row-span-2', bestTime: 'Sep - Nov, Feb - Apr', terrain: 'Paved / City Roads', vehicles: ['Economy', 'Compact SUV', 'Luxury Sedan'] },
  { id: 'pokhara', name: 'Pokhara', region: 'Valley', desc: 'Lakes & Mountains', img: '/images/destinations/pokhara.png', span: 'md:col-span-1 md:row-span-1', bestTime: 'Sep - Nov, Feb - May', terrain: 'Paved / Highways', vehicles: ['SUV', 'Economy', 'Van'] },
  { id: 'mustang', name: 'Mustang', region: 'Himalayas', desc: 'Desert Landscapes', img: '/images/destinations/mustang.png', span: 'md:col-span-1 md:row-span-1', bestTime: 'May - October', terrain: 'Off-road / Unpaved', vehicles: ['4x4 Off-roader', 'Heavy-Duty SUV'] },
  { id: 'chitwan', name: 'Chitwan', region: 'Terai', desc: 'Jungle Safaris', img: '/images/destinations/chitwan.png', span: 'md:col-span-1 md:row-span-1', bestTime: 'Oct - Mar', terrain: 'Highway / Light Dirt', vehicles: ['SUV', 'Minibus', 'Pickup'] },
  { id: 'lumbini', name: 'Lumbini', region: 'Terai', desc: 'Birthplace of Buddha', img: '/images/destinations/lumbini.png', span: 'md:col-span-1 md:row-span-1', bestTime: 'Oct - Mar', terrain: 'Paved / Highway', vehicles: ['Economy', 'Sedan', 'Van'] },
  { id: 'everest', name: 'Everest Region', region: 'Himalayas', desc: 'The Top of the World', img: '/images/destinations/everest.png', span: 'md:col-span-2 md:row-span-1', bestTime: 'Mar - May, Sep - Nov', terrain: 'Mountain Roads / Off-road', vehicles: ['4x4 Off-roader', 'Heavy-Duty SUV'] },
];

const initialPackages = [
  { 
    id: 'annapurna-circuit', 
    title: 'Annapurna Circuit Jeep Rental', 
    duration: '7-14 Days', 
    desc: 'Conquer the legendary Annapurna circuit in a robust 4x4. Includes a highly experienced mountain driver and all route permits.',
    price: 'NPR 15,600/day',
    img: '/images/destinations/annapurna.png',
    highlights: ['High-clearance 4x4 Vehicle', 'Mountain-certified Driver', 'Fuel & Tolls Included', 'Route Planning Assistance'],
    itinerary: [
      { day: 'Day 1', desc: 'Kathmandu to Besisahar (Paved Highway)' },
      { day: 'Day 2-5', desc: 'Besisahar to Manang (Extreme Off-road)' },
      { day: 'Day 6-10', desc: 'Muktinath to Pokhara (Mountain Dirt Roads)' }
    ]
  },
  { 
    id: 'mustang-road-trip', 
    title: 'Mustang Road Trip Package', 
    duration: '5-10 Days', 
    desc: 'Journey into the forbidden kingdom of Upper Mustang. Complete package with restricted area permits and a specialized desert off-roader.',
    price: 'NPR 19,500/day',
    img: '/images/destinations/mustang.png',
    highlights: ['Heavy-Duty Off-roader', 'Desert-trained Driver', 'Restricted Area Paperwork', 'Emergency Kit Included'],
    itinerary: [
      { day: 'Day 1', desc: 'Pokhara to Jomsom' },
      { day: 'Day 2', desc: 'Jomsom to Kagbeni' },
      { day: 'Day 3-5', desc: 'Lo Manthang Exploration' }
    ]
  },
  { 
    id: 'kathmandu-pokhara', 
    title: 'Kathmandu to Pokhara Self Drive', 
    duration: '2-4 Days', 
    desc: 'Experience the classic highway route connecting Nepal\'s two biggest valleys. Perfect for self-drive enthusiasts looking for a scenic cruise.',
    price: 'NPR 7,800/day',
    img: '/images/destinations/kathmandu.png',
    highlights: ['Choice of Premium Sedans', 'GPS Navigation Included', '24/7 Roadside Assistance', 'Flexible Drop-off Options'],
    itinerary: [
      { day: 'Day 1', desc: 'Pick up in Kathmandu, drive to Kurintar' },
      { day: 'Day 2', desc: 'Kurintar to Pokhara Lakeside' }
    ]
  },
  { 
    id: 'chitwan-safari', 
    title: 'Chitwan Safari Transportation', 
    duration: '3-5 Days', 
    desc: 'Comfortable air-conditioned transport from Kathmandu to the heart of the jungle. Includes daily local transfers for safari activities.',
    price: 'NPR 10,400/day',
    img: '/images/destinations/chitwan.png',
    highlights: ['Air-Conditioned SUV', 'Local Safari Transfers', 'Professional English-speaking Driver', 'Flexible Timing'],
    itinerary: [
      { day: 'Day 1', desc: 'Kathmandu to Sauraha (Chitwan)' },
      { day: 'Day 2-3', desc: 'Local hotel to Safari entry points' },
      { day: 'Day 4', desc: 'Return to Kathmandu' }
    ]
  },
  { 
    id: 'everest-transfer', 
    title: 'Everest Base Camp Transfer', 
    duration: '1-2 Days', 
    desc: 'Reliable, early morning drop-offs to Ramechhap or Phaplu airports for your Everest flights. Never miss your mountain flight.',
    price: 'NPR 13,000 total',
    img: '/images/destinations/everest.png',
    highlights: ['Guaranteed On-Time Arrival', 'Early Morning Pickups (2 AM)', 'Spacious Vans for Trekking Gear', 'Flight Delay Wait-time included'],
    itinerary: [
      { day: 'Day 1', desc: '2:00 AM Pickup from Kathmandu Hotel' },
      { day: 'Day 1', desc: '6:00 AM Drop-off at Ramechhap Airport' }
    ]
  }
];

const initialBookings = [
  { id: 'B-1001', customer: 'Sarah Johnson', vehicle: 'Toyota Fortuner', dates: 'Oct 15 - Oct 20', amount: 'NPR 42,250', status: 'Confirmed', date: '2023-10-10' },
  { id: 'B-1002', customer: 'Mike Tyson', vehicle: 'Range Rover Vogue', dates: 'Oct 18 - Oct 22', amount: 'NPR 62,400', status: 'Pending', date: '2023-10-12' },
  { id: 'B-1003', customer: 'Emma Watson', vehicle: 'Suzuki Swift', dates: 'Oct 20 - Oct 25', amount: 'NPR 22,750', status: 'Completed', date: '2023-09-28' },
];

export const AppDataProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('app_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('app_destinations');
    return saved ? JSON.parse(saved) : initialDestinations;
  });

  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('app_packages');
    return saved ? JSON.parse(saved) : initialPackages;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('app_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('app_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('app_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('app_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('app_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // CRUD for Vehicles
  const addVehicle = (vehicle) => setVehicles([...vehicles, { ...vehicle, id: Date.now() }]);
  const updateVehicle = (id, updated) => setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updated } : v));
  const deleteVehicle = (id) => setVehicles(vehicles.filter(v => v.id !== id));

  // CRUD for Destinations
  const addDestination = (destination) => setDestinations([...destinations, destination]);
  const updateDestination = (id, updated) => setDestinations(destinations.map(d => d.id === id ? { ...d, ...updated } : d));
  const deleteDestination = (id) => setDestinations(destinations.filter(d => d.id !== id));

  // CRUD for Packages
  const addPackage = (pkg) => setPackages([...packages, pkg]);
  const updatePackage = (id, updated) => setPackages(packages.map(p => p.id === id ? { ...p, ...updated } : p));
  const deletePackage = (id) => setPackages(packages.filter(p => p.id !== id));

  // CRUD for Bookings
  const addBooking = (booking) => setBookings([...bookings, { ...booking, id: 'B-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0] }]);
  const updateBooking = (id, updated) => setBookings(bookings.map(b => b.id === id ? { ...b, ...updated } : b));
  const deleteBooking = (id) => setBookings(bookings.filter(b => b.id !== id));

  return (
    <AppDataContext.Provider value={{
      vehicles, addVehicle, updateVehicle, deleteVehicle,
      destinations, addDestination, updateDestination, deleteDestination,
      packages, addPackage, updatePackage, deletePackage,
      bookings, addBooking, updateBooking, deleteBooking
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
