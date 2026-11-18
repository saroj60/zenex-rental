import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    driverId: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    // 1. Personal Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    dob: {
      type: Date,
      default: new Date('1990-01-01'),
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
      default: 'Male',
    },
    permanentAddress: {
      type: String,
      default: 'Kathmandu, Nepal',
    },
    currentAddress: {
      type: String,
      default: 'Kathmandu, Nepal',
    },
    province: {
      type: String,
      default: 'Bagmati Province',
    },
    district: {
      type: String,
      default: 'Kathmandu',
    },
    municipality: {
      type: String,
      default: 'Kathmandu Metropolitan City',
    },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      relation: { type: String, default: 'Family' },
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },

    // 2. Driving Licence Information
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    licenseCategory: [
      {
        type: String,
        default: ['Category B (Car / Jeep / Delivery Van)'],
      },
    ],
    issuingAuthority: {
      type: String,
      default: 'Transport Management Office (Ekantakuna, Lalitpur)',
    },
    licenseIssueDate: {
      type: Date,
      default: new Date('2020-01-15'),
    },
    licenseExpiry: {
      type: Date,
      required: true,
    },
    licenseFrontImage: {
      type: String,
      default: '',
    },
    licenseBackImage: {
      type: String,
      default: '',
    },
    licenseVerificationStatus: {
      type: String,
      enum: ['verified', 'pending', 'rejected', 'expired'],
      default: 'verified',
    },

    // 3. Employment Information
    employeeId: {
      type: String,
      sparse: true,
      trim: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    employmentType: {
      type: String,
      enum: ['Full Time', 'Contract', 'Partner Driver', 'On-Demand'],
      default: 'Full Time',
    },
    salaryOrCommission: {
      payType: {
        type: String,
        enum: ['Monthly Salary', 'Daily Allowance', 'Per Trip Commission'],
        default: 'Monthly Salary',
      },
      amount: {
        type: Number,
        default: 35000,
      },
    },
    notes: {
      type: String,
      default: '',
    },

    // 4. Availability & Current Assignments
    status: {
      type: String,
      enum: ['available', 'assigned', 'on_trip', 'unavailable', 'inactive'],
      default: 'available',
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null,
    },
    currentBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
    },

    // 5. Experience & Ratings
    experienceYears: {
      type: Number,
      default: 5,
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    tripsCompleted: {
      type: Number,
      default: 0,
    },
    languages: [
      {
        type: String,
        default: ['Nepali', 'English', 'Hindi'],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-generate driverId if not present
driverSchema.pre('save', async function (next) {
  if (!this.driverId) {
    const count = await mongoose.model('Driver').countDocuments();
    this.driverId = `DRV-${101 + count}`;
  }
  if (!this.employeeId) {
    this.employeeId = this.driverId;
  }
  next();
});

export default mongoose.model('Driver', driverSchema);
