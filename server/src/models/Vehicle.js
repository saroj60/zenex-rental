import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Hatchback', 'Sedan', 'SUV', 'Luxury', 'Premium', 'Pickup', 'Van/Hiace', 'Van', 'Micro/Bus', 'Electric Vehicles', 'Electric',
        'hatchback', 'sedan', 'suv', 'luxury', 'premium', 'pickup', 'van', 'electric'
      ],
    },
    modelYear: {
      type: Number,
      default: 2024,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    seats: {
      type: Number,
      required: true,
      default: 5,
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual'],
      default: 'Automatic',
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'petrol', 'diesel', 'electric', 'hybrid'],
      default: 'Petrol',
    },
    hasAC: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    pricing: {
      hourlyRateWithDriver: {
        type: Number,
        default: 1200,
      },
      dailyWithDriver: {
        type: Number,
        required: true,
      },
      weeklyWithDriver: {
        type: Number,
        default: 55000,
      },
      monthlyWithDriver: {
        type: Number,
        default: 180000,
      },
      hourlyRateSelfDrive: {
        type: Number,
        default: 900,
      },
      dailySelfDrive: {
        type: Number,
        required: true,
      },
      weeklySelfDrive: {
        type: Number,
        default: 45000,
      },
      monthlySelfDrive: {
        type: Number,
        default: 150000,
      },
      securityDeposit: {
        type: Number,
        default: 25000,
      },
      driverAllowancePerDay: {
        type: Number,
        default: 1500,
      },
      fuelPerKmEstimate: {
        type: Number,
        default: 18,
      },
    },
    options: {
      allowsWithDriver: {
        type: Boolean,
        default: true,
      },
      allowsSelfDrive: {
        type: Boolean,
        default: true,
      },
    },
    ownership: {
      type: String,
      enum: ['Company Owned', 'Partner Owned', 'company', 'partner'],
      default: 'Company Owned',
    },
    partnerName: {
      type: String,
      default: '',
    },
    documents: {
      registrationCertificate: {
        url: { type: String, default: '' },
        expiryDate: { type: Date },
      },
      insurance: {
        url: { type: String, default: '' },
        expiryDate: { type: Date },
      },
      taxDocument: {
        url: { type: String, default: '' },
        expiryDate: { type: Date },
      },
    },
    specifications: {
      mileage: { type: String, default: '16.8 km/l' },
      luggageCapacity: { type: String, default: '3 Bags' },
      engineCapacity: { type: String, default: '1.5 L' },
      doors: { type: Number, default: 5 },
      color: { type: String, default: 'Polar White' },
    },
    features: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: 'Comfortable and spacious SUV, perfect for city travel, family trips and outstation rides.',
    },
    status: {
      type: String,
      enum: ['Available', 'Inactive', 'Maintenance', 'Rented', 'available', 'inactive', 'maintenance', 'rented'],
      default: 'Available',
    },
    location: {
      city: { type: String, default: 'Kathmandu' },
      address: { type: String, default: 'Kathmandu Central Depot, Nepal' },
      coordinates: {
        lat: { type: Number, default: 27.7172 },
        lng: { type: Number, default: 85.324 },
      },
    },
    cancellationPolicy: {
      type: String,
      default: 'Free cancellation up to 24 hours before pickup time. 50% refund within 24 hours.',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    suitableFor: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Text search & occasion indexing
vehicleSchema.index({ name: 'text', brand: 'text', category: 'text' });
vehicleSchema.index({ suitableFor: 1 });

export default mongoose.model('Vehicle', vehicleSchema);
