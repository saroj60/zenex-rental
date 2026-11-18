import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      default: null,
    },
    rentalType: {
      type: String,
      enum: ['with_driver', 'self_drive'],
      default: 'with_driver',
      required: true,
    },
    pickupLocation: {
      name: { type: String, required: true },
      district: { type: String, default: 'Kathmandu' },
      fullAddress: { type: String, default: '' },
    },
    dropoffLocation: {
      name: { type: String, required: true },
      district: { type: String, default: 'Pokhara' },
      fullAddress: { type: String, default: '' },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    pickupTime: {
      type: String,
      default: '09:00 AM',
    },
    returnTime: {
      type: String,
      default: '07:00 PM',
    },
    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },
    pricingBreakdown: {
      dailyRate: { type: Number, required: true },
      baseTotal: { type: Number, required: true },
      driverAllowance: { type: Number, default: 0 },
      fuelEstimate: { type: Number, default: 0 },
      additionalCharges: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      securityDeposit: { type: Number, default: 0 },
      taxAmount: { type: Number, default: 0 },
      grandTotal: { type: Number, required: true },
    },
    totalAmount: {
      type: Number,
      default: function () {
        return this.pricingBreakdown?.grandTotal || 0;
      },
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      emergencyPhone: { type: String, default: '' },
      address: { type: String, default: 'Kathmandu, Nepal' },
      drivingLicenseNumber: { type: String, default: '' },
      specialNotes: { type: String, default: '' },
    },
    documents: {
      drivingLicense: {
        number: { type: String, default: '' },
        fileUrl: { type: String, default: '' },
        fileName: { type: String, default: '' },
        verified: { type: Boolean, default: false },
      },
      citizenshipOrPassport: {
        docType: { type: String, enum: ['Citizenship', 'Passport', 'VoterID', 'Other'], default: 'Citizenship' },
        number: { type: String, default: '' },
        fileUrl: { type: String, default: '' },
        fileName: { type: String, default: '' },
        verified: { type: Boolean, default: false },
      },
      additionalDoc: {
        fileUrl: { type: String, default: '' },
        fileName: { type: String, default: '' },
      },
    },
    specialInstructions: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'awaiting_payment', 'payment_pending', 'confirmed', 'ongoing', 'completed', 'cancelled', 'rejected'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: [
        'pending',
        'unpaid',
        'partially_paid',
        'paid',
        'refund_pending',
        'refunded',
        'failed',
      ],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: [
        'cash',
        'esewa',
        'khalti',
        'fonepay',
        'bank_transfer',
        'Cash',
        'eSewa',
        'Khalti',
        'Fonepay',
        'Bank Transfer',
      ],
      default: 'cash',
    },
    cancellationReason: {
      type: String,
      default: '',
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    cancellationFee: {
      type: Number,
      default: 0,
    },
    cancellationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for double-booking checks
bookingSchema.index({ vehicle: 1, startDate: 1, endDate: 1, status: 1 });
bookingSchema.index({ customer: 1, createdAt: -1 });

export default mongoose.model('Booking', bookingSchema);
