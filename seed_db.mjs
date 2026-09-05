import fs from 'fs';
import { featuredPackages } from './src/data/packagesData.js';
import { treksData } from './src/data/treksData.js';

// Extracted from AppDataContext
const initialVehicles = [
  { id: 1, name: 'Suzuki Swift', type: 'Hatchback / Sedan', price: 3500, priceWithDriver: 5000, img: '/images/economy_car.png', seats: 4, trans: 'Automatic', fuel: 'Petrol', luggage: 2, rating: 4.8, seoTitle: 'Rent Suzuki Swift in Kathmandu - Zenex Travel', seoDescription: 'Premium Suzuki Swift hatchback rental in Kathmandu. Perfect for city tours, airport transfers, and family trips. Fully insured with professional drivers available.' },
  { id: 2, name: 'Toyota Fortuner', type: 'SUV / 4x4', price: 5500, priceWithDriver: 7500, img: '/images/suv_car.png', seats: 7, trans: 'Automatic', fuel: 'Diesel', luggage: 4, rating: 4.9, seoTitle: 'Hire Toyota Fortuner 4x4 SUV in Nepal - Zenex Travels', seoDescription: 'Premium Toyota Fortuner 4x4 SUV rental in Kathmandu. Perfect for mountain drives, offroad tours, and luxury travel. Fully insured, experienced drivers.' },
  { id: 3, name: 'Kia EV6', type: 'EV', price: 8000, priceWithDriver: 10000, img: '/images/luxury_car.png', seats: 5, trans: 'Automatic', fuel: 'Electric', luggage: 3, rating: 5.0, seoTitle: 'Rent Kia EV6 Electric Vehicle in Kathmandu - Zenex Travel', seoDescription: 'Eco-friendly Kia EV6 luxury electric vehicle rental. Smooth, silent rides for city and highway travel in Nepal. Book your electric car today.' },
  { id: 4, name: 'Toyota Hiace', type: 'Van / Micro', price: 9000, priceWithDriver: 12000, img: '/images/suv_car.png', seats: 14, trans: 'Manual', fuel: 'Diesel', luggage: 6, rating: 4.7, seoTitle: 'Rent Toyota Hiace Minibus in Kathmandu - 13 Seater Zenex Travel', seoDescription: 'Spacious Toyota Hiace Minibus rental for group tours and family trips in Nepal. Comfortable seating for up to 14 passengers. Experienced drivers included.' }
];

const db = {
    vehicles: initialVehicles,
    packages: featuredPackages,
    treks: treksData,
    destinations: [],
    bookings: [],
    drivers: [],
    gallery: []
};

fs.writeFileSync('./backend/database/db.json', JSON.stringify(db, null, 2));
console.log('Database seeded successfully!');
