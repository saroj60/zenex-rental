import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'staff', 'driver'],
      default: 'customer',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    },
    address: {
      city: { type: String, default: 'Kathmandu' },
      district: { type: String, default: 'Kathmandu' },
      fullAddress: { type: String, default: 'Thamel, Kathmandu' },
    },
    drivingLicense: {
      number: { type: String, default: '' },
      expiryDate: { type: Date },
      image: { type: String, default: '' },
      verified: { type: Boolean, default: false },
    },
    citizenshipOrPassport: {
      number: { type: String, default: '' },
      docType: { type: String, enum: ['Citizenship', 'Passport', 'VoterID', 'None'], default: 'None' },
      image: { type: String, default: '' },
      verified: { type: Boolean, default: false },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password helper
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
