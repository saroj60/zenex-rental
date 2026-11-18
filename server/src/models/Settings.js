import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'Nepal Car Rental Pvt. Ltd.',
    },
    tagline: {
      type: String,
      default: 'Rent a Car Anywhere in Nepal',
    },
    contactPhone: {
      type: String,
      default: '+977-1-4412345, +977-9801234567',
    },
    contactEmail: {
      type: String,
      default: 'info@nepalcarrental.com.np',
    },
    headOfficeAddress: {
      type: String,
      default: 'Tridevi Marg, Thamel, Kathmandu, Nepal',
    },
    vatPercentage: {
      type: Number,
      default: 13, // Nepal standard VAT
    },
    driverDailyAllowanceRate: {
      type: Number,
      default: 1500, // NPR per day
    },
    currency: {
      type: String,
      default: 'NPR',
    },
    esewaMerchantCode: {
      type: String,
      default: 'EPAYTEST',
    },
    khaltiPublicKey: {
      type: String,
      default: 'test_public_key_dc74e0fd92cb411eb8e29f0401cf373b',
    },
    smsOtpEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Settings', settingsSchema);
