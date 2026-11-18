import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import VehicleCategory from '../models/VehicleCategory.js';
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';
import Settings from '../models/Settings.js';
import VehicleAvailability from '../models/VehicleAvailability.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nepal_car_rental';

const categoriesData = [
  {
    name: 'All',
    slug: 'all',
    icon: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80',
    description: 'Explore our complete Nepal rental fleet',
    displayOrder: 0,
  },
  {
    name: 'Hatchback',
    slug: 'hatchback',
    icon: 'Car',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=300&q=80',
    description: 'Compact, fuel-efficient city runabouts',
    displayOrder: 1,
  },
  {
    name: 'SUV',
    slug: 'suv',
    icon: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    description: 'Robust, spacious & high clearance for Nepal roads',
    displayOrder: 2,
  },
  {
    name: 'Premium',
    slug: 'premium',
    icon: 'Award',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80',
    description: 'Luxury executive sedans and prestige SUVs',
    displayOrder: 3,
  },
  {
    name: 'Van/Hiace',
    slug: 'van-hiace',
    icon: 'Bus',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=300&q=80',
    description: '14-seater tourist vans for group expeditions',
    displayOrder: 4,
  },
  {
    name: 'Micro/Bus',
    slug: 'micro-bus',
    icon: 'Truck',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80',
    description: 'Coaster and deluxe buses for larger groups',
    displayOrder: 5,
  },
  {
    name: 'Electric Vehicles',
    slug: 'electric-vehicles',
    icon: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80',
    description: 'Zero-emission modern EVs with fast charging',
    displayOrder: 6,
  },
];

const vehiclesData = [
  {
    name: 'Hyundai Creta',
    slug: 'hyundai-creta',
    brand: 'Hyundai',
    category: 'SUV',
    modelYear: 2024,
    registrationNumber: 'BA 18 CHA 4291',
    images: [
      '/cars/creta.png',
      '/cars/creta.png'
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    hasAC: true,
    rating: 4.8,
    reviewCount: 126,
    pricing: {
      dailyWithDriver: 8500,
      dailySelfDrive: 7000,
      hourlyRate: 1100,
      monthlyRate: 180000,
      driverAllowancePerDay: 1500,
      fuelPerKmEstimate: 16,
    },
    options: {
      allowsWithDriver: true,
      allowsSelfDrive: true,
    },
    specifications: {
      mileage: '16.8 km/l',
      luggageCapacity: '3 Bags',
      engineCapacity: '1.5 L Smartstream',
      doors: 5,
      color: 'Polar White',
    },
    features: ['Air Conditioning', 'Touchscreen Infotainment', 'Bluetooth & Apple CarPlay', 'Reverse Parking Camera', 'ABS & Airbags', 'Roof Rails'],
    description: 'Comfortable and spacious SUV, perfect for city travel, family trips and outstation rides across Nepal.',
    status: 'available',
    isFeatured: true,
  },
  {
    name: 'Toyota Fortuner',
    slug: 'toyota-fortuner',
    brand: 'Toyota',
    category: 'Premium',
    modelYear: 2024,
    registrationNumber: 'BA 02 CHA 8812',
    images: [
      '/cars/fortuner.jpg'
    ],
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    hasAC: true,
    rating: 4.9,
    reviewCount: 89,
    pricing: {
      dailyWithDriver: 16000,
      dailySelfDrive: 14000,
      hourlyRate: 2200,
      monthlyRate: 340000,
      driverAllowancePerDay: 2000,
      fuelPerKmEstimate: 22,
    },
    options: {
      allowsWithDriver: true,
      allowsSelfDrive: true,
    },
    specifications: {
      mileage: '12.4 km/l',
      luggageCapacity: '5 Bags',
      engineCapacity: '2.8 L Turbo Diesel 4x4',
      doors: 5,
      color: 'Attitude Black',
    },
    features: ['4x4 Offroad Terrain System', 'Dual Climate AC', 'Leather Seating', 'Cruise Control', 'JBL Sound System', 'Diff Lock'],
    description: 'Dominant 4x4 off-road SUV ready for mountain passes, Muktinath, Manang and luxury intercity trips.',
    status: 'available',
    isFeatured: true,
  },
  {
    name: 'Suzuki Swift',
    slug: 'suzuki-swift',
    brand: 'Maruti Suzuki',
    category: 'Hatchback',
    modelYear: 2023,
    registrationNumber: 'BA 15 CHA 3302',
    images: [
      '/cars/swift.jpg'
    ],
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    hasAC: true,
    rating: 4.7,
    reviewCount: 210,
    pricing: {
      dailyWithDriver: 4500,
      dailySelfDrive: 3800,
      hourlyRate: 700,
      monthlyRate: 95000,
      driverAllowancePerDay: 1200,
      fuelPerKmEstimate: 12,
    },
    options: {
      allowsWithDriver: true,
      allowsSelfDrive: true,
    },
    specifications: {
      mileage: '22.3 km/l',
      luggageCapacity: '2 Bags',
      engineCapacity: '1.2 L K-Series',
      doors: 5,
      color: 'Pearl Arctic White',
    },
    features: ['Chilled Air Conditioning', 'Bluetooth Audio', 'High Fuel Efficiency', 'Easy Valley Parking', 'Power Steering'],
    description: 'Nepal’s most popular economy hatchback, agile and ultra-economical for navigating Kathmandu valley traffic.',
    status: 'available',
    isFeatured: true,
  },
  {
    name: 'Toyota Hiace',
    slug: 'toyota-hiace',
    brand: 'Toyota',
    category: 'Van/Hiace',
    modelYear: 2023,
    registrationNumber: 'BA 04 KHA 1099',
    images: [
      '/cars/hiace.jpg'
    ],
    seats: 14,
    transmission: 'Manual',
    fuelType: 'Diesel',
    hasAC: true,
    rating: 4.8,
    reviewCount: 64,
    pricing: {
      dailyWithDriver: 12000,
      dailySelfDrive: 10000,
      hourlyRate: 1800,
      monthlyRate: 260000,
      driverAllowancePerDay: 1800,
      fuelPerKmEstimate: 20,
    },
    options: {
      allowsWithDriver: true,
      allowsSelfDrive: false,
    },
    specifications: {
      mileage: '11.5 km/l',
      luggageCapacity: '12 Bags (Roof Carrier)',
      engineCapacity: '3.0 L D-4D Diesel',
      doors: 4,
      color: 'Silver Metallic',
    },
    features: ['Individual High-Back Reclining Seats', 'Roof Luggage Carrier', 'Dual High-Power AC', 'PA Microphone', 'First Aid Box'],
    description: 'Premier 14-seater van designed for tourist packages, corporate travel, weddings, and group excursions in Nepal.',
    status: 'available',
    isFeatured: true,
  },
  {
    name: 'Mahindra Scorpio 4x4',
    slug: 'mahindra-scorpio-4x4',
    brand: 'Mahindra',
    category: 'SUV',
    modelYear: 2024,
    registrationNumber: 'BA 21 CHA 9081',
    images: [
      '/cars/scorpio.jpg'
    ],
    seats: 7,
    transmission: 'Manual',
    fuelType: 'Diesel',
    hasAC: true,
    rating: 4.9,
    reviewCount: 94,
    pricing: {
      dailyWithDriver: 9500,
      dailySelfDrive: 8000,
      hourlyRate: 1300,
      monthlyRate: 195000,
      driverAllowancePerDay: 1500,
      fuelPerKmEstimate: 18,
    },
    options: {
      allowsWithDriver: true,
      allowsSelfDrive: true,
    },
    specifications: {
      mileage: '14.0 km/l',
      luggageCapacity: '4 Bags',
      engineCapacity: '2.2 L mHawk Diesel',
      doors: 5,
      color: 'Diamond White',
    },
    features: ['High Ground Clearance (209mm)', '4x4 Shift-on-Fly', 'Rear AC Vents', 'Touchscreen Display', 'Roof Carrier'],
    description: 'The definitive king of Nepal’s highways and mountain hills. Conquers Mustang, Jomsom and Rara routes effortlessly.',
    status: 'available',
    isFeatured: true,
  },
  {
    name: 'BYD Atto 3',
    slug: 'byd-atto-3',
    brand: 'BYD',
    category: 'Electric Vehicles',
    modelYear: 2024,
    registrationNumber: 'BA 20 CHA 5510',
    images: [
      '/cars/ev.jpg'
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    hasAC: true,
    rating: 4.9,
    reviewCount: 77,
    pricing: {
      dailyWithDriver: 9000,
      dailySelfDrive: 7500,
      hourlyRate: 1250,
      monthlyRate: 185000,
      driverAllowancePerDay: 1500,
      fuelPerKmEstimate: 5,
    },
    options: {
      allowsWithDriver: true,
      allowsSelfDrive: true,
    },
    specifications: {
      mileage: '420 km range (WLTP)',
      luggageCapacity: '3 Bags',
      engineCapacity: '60.48 kWh Blade Battery',
      doors: 5,
      color: 'Ski White',
    },
    features: ['Ultra-Quiet Electric Drive', '15.6" Rotating Touchscreen', 'Panoramic Sunroof', 'Fast Charging Support', 'Level 2 ADAS'],
    description: 'Nepal’s leading luxury electric SUV. Enjoy smooth silent driving along Kathmandu-Pokhara highway with green energy.',
    status: 'available',
    isFeatured: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    // Clean existing collections
    await User.deleteMany({});
    await VehicleCategory.deleteMany({});
    await Vehicle.deleteMany({});
    await Driver.deleteMany({});
    await Booking.deleteMany({});
    await Payment.deleteMany({});
    await Review.deleteMany({});
    await Settings.deleteMany({});
    await VehicleAvailability.deleteMany({});

    console.log('Cleared existing database records.');

    // Seed Settings
    const settings = await Settings.create({
      businessName: 'Nepal Car Rental Pvt. Ltd.',
      tagline: 'Rent a Car Anywhere in Nepal',
      contactPhone: '+977-1-4412345, +977-9801234567',
      contactEmail: 'info@nepalcarrental.com.np',
      headOfficeAddress: 'Tridevi Marg, Thamel, Kathmandu, Nepal',
      vatPercentage: 13,
      driverDailyAllowanceRate: 1500,
      currency: 'NPR',
      esewaMerchantCode: 'EPAYTEST',
      khaltiPublicKey: 'test_public_key_dc74e0fd92cb411eb8e29f0401cf373b',
      smsOtpEnabled: true,
    });
    console.log('Created Settings.');

    // Seed Categories
    const categories = await VehicleCategory.insertMany(categoriesData);
    console.log(`Seeded ${categories.length} vehicle categories.`);

    // Seed Users
    const adminUser = await User.create({
      name: 'Saroj Bhagat',
      email: 'admin@nepalcarrental.com',
      phone: '+977 9801234567',
      password: 'adminpassword123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      address: {
        city: 'Kathmandu',
        district: 'Kathmandu',
        fullAddress: 'Thamel, Kathmandu',
      },
      isVerified: true,
    });

    const customerUser = await User.create({
      name: 'Saroj',
      email: 'customer@nepalcarrental.com',
      phone: '+977 9841892011',
      password: 'customerpassword123',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      address: {
        city: 'Kathmandu',
        district: 'Kathmandu',
        fullAddress: 'Baneshwor, Kathmandu',
      },
      drivingLicense: {
        number: '01-06-00892144',
        verified: true,
      },
      citizenshipOrPassport: {
        number: '27-01-78-01928',
        docType: 'Citizenship',
        verified: true,
      },
      isVerified: true,
    });

    const staffUser = await User.create({
      name: 'Pooja Shrestha',
      email: 'staff@nepalcarrental.com',
      phone: '+977 9813009988',
      password: 'staffpassword123',
      role: 'staff',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    });

    console.log('Seeded Users (Admin: Saroj Bhagat, Customer: Saroj, Staff: Pooja).');

    // Seed Drivers
    const drivers = await Driver.insertMany([
      {
        name: 'Ram Bahadur Thapa',
        phone: '+977 9841234567',
        email: 'ram.thapa@nepalcarrental.com',
        licenseNumber: '01-05-99887711',
        experienceYears: 8,
        rating: 4.9,
        tripsCompleted: 245,
        status: 'available',
        district: 'Kathmandu',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Bikash Gurung',
        phone: '+977 9856012345',
        email: 'bikash.gurung@nepalcarrental.com',
        licenseNumber: '04-02-33445566',
        experienceYears: 6,
        rating: 4.8,
        tripsCompleted: 180,
        status: 'available',
        district: 'Pokhara',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Deepak Shrestha',
        phone: '+977 9813245678',
        email: 'deepak.shrestha@nepalcarrental.com',
        licenseNumber: '01-04-11223344',
        experienceYears: 10,
        rating: 5.0,
        tripsCompleted: 310,
        status: 'on_trip',
        district: 'Kathmandu',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      },
    ]);
    console.log(`Seeded ${drivers.length} experienced Nepali drivers.`);

    // Seed Vehicles
    const vehicles = await Vehicle.insertMany(vehiclesData);
    console.log(`Seeded ${vehicles.length} vehicles.`);

    const creta = vehicles.find((v) => v.name === 'Hyundai Creta');
    const hiace = vehicles.find((v) => v.name === 'Toyota Hiace');
    const swift = vehicles.find((v) => v.name === 'Suzuki Swift');
    const fortuner = vehicles.find((v) => v.name === 'Toyota Fortuner');

    // Seed Bookings matching the reference screenshot exactly!
    // 1. NCR-10458: Hyundai Creta, Nov 5, 2026 – Nov 7, 2026 (2 Days), Kathmandu to Pokhara, NPR 17,000, Confirmed
    const booking1 = await Booking.create({
      bookingId: 'NCR-10458',
      customer: customerUser._id,
      vehicle: creta._id,
      driver: drivers[0]._id,
      rentalType: 'with_driver',
      pickupLocation: {
        name: 'Kathmandu',
        district: 'Kathmandu',
        fullAddress: 'Tribhuvan International Airport, Kathmandu',
      },
      dropoffLocation: {
        name: 'Pokhara',
        district: 'Kaski',
        fullAddress: 'Lakeside, Pokhara',
      },
      startDate: new Date('2026-11-05T09:00:00Z'),
      endDate: new Date('2026-11-07T18:00:00Z'),
      pickupTime: '09:00 AM',
      returnTime: '06:00 PM',
      durationDays: 2,
      pricingBreakdown: {
        dailyRate: 8500,
        baseTotal: 17000,
        driverAllowance: 0,
        fuelEstimate: 0,
        taxAmount: 0,
        discountAmount: 0,
        grandTotal: 17000,
      },
      customerDetails: {
        fullName: 'Saroj',
        email: 'customer@nepalcarrental.com',
        phone: '+977 9841892011',
        drivingLicenseNumber: '01-06-00892144',
      },
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'esewa',
    });

    // 2. NCR-10457: Toyota Hiace, NPR 12,000, Ongoing
    const booking2 = await Booking.create({
      bookingId: 'NCR-10457',
      customer: customerUser._id,
      vehicle: hiace._id,
      driver: drivers[2]._id,
      rentalType: 'with_driver',
      pickupLocation: {
        name: 'Kathmandu',
        district: 'Kathmandu',
        fullAddress: 'Thamel Tourist Bus Park, Kathmandu',
      },
      dropoffLocation: {
        name: 'Chitwan',
        district: 'Chitwan',
        fullAddress: 'Sauraha Tourist Hub, Chitwan',
      },
      startDate: new Date('2026-11-01T07:00:00Z'),
      endDate: new Date('2026-11-02T19:00:00Z'),
      pickupTime: '07:00 AM',
      returnTime: '07:00 PM',
      durationDays: 1,
      pricingBreakdown: {
        dailyRate: 12000,
        baseTotal: 12000,
        driverAllowance: 0,
        fuelEstimate: 0,
        taxAmount: 0,
        discountAmount: 0,
        grandTotal: 12000,
      },
      customerDetails: {
        fullName: 'Ramesh Adhikari',
        email: 'ramesh.a@gmail.com',
        phone: '+977 9841223344',
      },
      status: 'ongoing',
      paymentStatus: 'paid',
      paymentMethod: 'khalti',
    });

    // 3. NCR-10456: Suzuki Swift, NPR 4,500, Completed
    const booking3 = await Booking.create({
      bookingId: 'NCR-10456',
      customer: customerUser._id,
      vehicle: swift._id,
      driver: drivers[1]._id,
      rentalType: 'with_driver',
      pickupLocation: {
        name: 'Kathmandu',
        district: 'Kathmandu',
        fullAddress: 'Lalitpur Patan Durbar Square',
      },
      dropoffLocation: {
        name: 'Bhaktapur',
        district: 'Bhaktapur',
        fullAddress: 'Bhaktapur Durbar Square',
      },
      startDate: new Date('2026-10-28T09:00:00Z'),
      endDate: new Date('2026-10-29T18:00:00Z'),
      pickupTime: '09:00 AM',
      returnTime: '06:00 PM',
      durationDays: 1,
      pricingBreakdown: {
        dailyRate: 4500,
        baseTotal: 4500,
        driverAllowance: 0,
        fuelEstimate: 0,
        taxAmount: 0,
        discountAmount: 0,
        grandTotal: 4500,
      },
      customerDetails: {
        fullName: 'Sunita Sharma',
        email: 'sunita@gmail.com',
        phone: '+977 9851122334',
      },
      status: 'completed',
      paymentStatus: 'paid',
      paymentMethod: 'cash',
    });

    console.log('Seeded Bookings (NCR-10458, NCR-10457, NCR-10456).');

    // Seed Payments
    await Payment.create({
      transactionId: 'ESEWA-NCR10458-9921',
      booking: booking1._id,
      customer: customerUser._id,
      amount: 17000,
      currency: 'NPR',
      paymentMethod: 'esewa',
      status: 'completed',
      gatewayDetails: {
        transaction_code: 'ESW-909281',
        refId: '00010458',
      },
      paidAt: new Date('2026-11-01T10:15:00Z'),
    });

    await Payment.create({
      transactionId: 'KHALTI-NCR10457-4412',
      booking: booking2._id,
      customer: customerUser._id,
      amount: 12000,
      currency: 'NPR',
      paymentMethod: 'khalti',
      status: 'completed',
      gatewayDetails: {
        pidx: 'khalti_tx_88192348',
      },
      paidAt: new Date('2026-10-31T15:20:00Z'),
    });

    // Seed Availability
    await VehicleAvailability.create({
      vehicle: creta._id,
      startDate: new Date('2026-11-05T00:00:00Z'),
      endDate: new Date('2026-11-07T23:59:59Z'),
      status: 'booked',
      booking: booking1._id,
      notes: 'Reserved for Booking NCR-10458',
    });

    // Seed Reviews
    await Review.create({
      vehicle: creta._id,
      user: customerUser._id,
      booking: booking1._id,
      rating: 5,
      comment: 'Super smooth drive to Pokhara! The AC was ice cold, and the car was immaculate. Will rent again!',
    });

    await Review.create({
      vehicle: fortuner._id,
      user: customerUser._id,
      rating: 5,
      comment: 'Incredible beast for our Mustang overland tour. Handled rocks and steep hill climbs effortlessly.',
    });

    console.log('✅ Nepal Car Rental database successfully initialized and seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
