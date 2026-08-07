const db = require('./db');
// We need to import the data from the frontend files, but since they are ES modules or standard JS,
// and this is commonjs, let's just copy the data here for seeding.

const seedVehicles = [
  { name: 'Toyota Corolla', type: 'Sedan', price: 3500, priceWithDriver: 5000, img: '/images/economy_car.png', seats: 4, trans: 'Automatic', fuel: 'Petrol', luggage: 2, rating: 4.8 },
  { name: 'Hyundai Creta', type: 'SUV / 4x4', price: 5500, priceWithDriver: 7500, img: '/images/suv_car.png', seats: 5, trans: 'Manual', fuel: 'Diesel', luggage: 3, rating: 4.9 },
];

const checkAndSeed = () => {
  const vCount = db.prepare('SELECT count(*) as count FROM vehicles').get();
  if (vCount.count === 0) {
    const stmt = db.prepare('INSERT INTO vehicles (name, type, price, priceWithDriver, img, seats, trans, fuel, luggage, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    seedVehicles.forEach(v => {
      stmt.run(v.name, v.type, v.price, v.priceWithDriver, v.img, v.seats, v.trans, v.fuel, v.luggage, v.rating);
    });
    console.log('Seeded vehicles');
  }
};

checkAndSeed();
