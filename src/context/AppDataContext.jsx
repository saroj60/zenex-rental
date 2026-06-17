import React, { createContext, useContext, useState, useEffect } from 'react';

const AppDataContext = createContext();

const initialVehicles = [];

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

const initialDrivers = [
  { id: 'D-101', name: 'Rajesh Kumar', phone: '+977-9800000001', experience: '5 Years', licenseNo: 'DL-12345', status: 'Available' },
  { id: 'D-102', name: 'Suman Shrestha', phone: '+977-9800000002', experience: '8 Years', licenseNo: 'DL-67890', status: 'On Trip' },
  { id: 'D-103', name: 'Bikash Thapa', phone: '+977-9800000003', experience: '3 Years', licenseNo: 'DL-11223', status: 'Available' }
];

const initialGallery = [
  { id: 'G-1', url: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop', title: 'Himalayan Ranges' },
  { id: 'G-2', url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1171&auto=format&fit=crop', title: 'Mountain Drive' },
  { id: 'G-3', url: 'https://images.unsplash.com/photo-1520695287271-15ebad2e77b4?q=80&w=1170&auto=format&fit=crop', title: 'Kathmandu Valley' },
  { id: 'G-4', url: 'https://images.unsplash.com/photo-1504448252408-b32799ff32f3?q=80&w=1074&auto=format&fit=crop', title: 'Serene Lakes' },
  { id: 'G-5', url: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop', title: 'Cultural Heritage' },
  { id: 'G-6', url: 'https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop', title: 'Wildlife Encounters' }
];


export const AppDataProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('app_vehicles_v2');
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

  const [drivers, setDrivers] = useState(() => {
    const saved = localStorage.getItem('app_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('app_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('app_vehicles_v2', JSON.stringify(vehicles));
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

  useEffect(() => {
    localStorage.setItem('app_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('app_gallery', JSON.stringify(galleryImages));
  }, [galleryImages]);

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

  // CRUD for Drivers
  const addDriver = (driver) => setDrivers([...drivers, { ...driver, id: 'D-' + Date.now() }]);
  const updateDriver = (id, updated) => setDrivers(drivers.map(d => d.id === id ? { ...d, ...updated } : d));
  const deleteDriver = (id) => setDrivers(drivers.filter(d => d.id !== id));

  // CRUD for Gallery
  const addGalleryImage = (image) => setGalleryImages([{ ...image, id: 'G-' + Date.now() }, ...galleryImages]);
  const deleteGalleryImage = (id) => setGalleryImages(galleryImages.filter(g => g.id !== id));

  return (
    <AppDataContext.Provider value={{
      vehicles, addVehicle, updateVehicle, deleteVehicle,
      destinations, addDestination, updateDestination, deleteDestination,
      packages, addPackage, updatePackage, deletePackage,
      bookings, addBooking, updateBooking, deleteBooking,
      drivers, addDriver, updateDriver, deleteDriver,
      galleryImages, addGalleryImage, deleteGalleryImage
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
