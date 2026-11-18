import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'NPR',
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
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['full', 'advance', 'remaining', 'security_deposit', 'additional'],
      default: 'full',
    },
    status: {
      type: String,
      enum: [
        'pending',
        'processing',
        'paid',
        'partially_paid',
        'completed',
        'failed',
        'refund_pending',
        'partially_refunded',
        'refunded',
      ],
      default: 'paid',
    },
    gatewayDetails: {
      pidx: String, // Khalti
      transaction_code: String, // eSewa
      refId: String, // Gateway reference / Bank voucher
      signature: String,
      rawResponse: mongoose.Schema.Types.Mixed,
      merchantCode: String,
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receivedByName: {
      type: String,
      default: 'Admin Desk',
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    remarks: {
      type: String,
      default: '',
    },

    // Refund Tracking
    refund: {
      amount: { type: Number, default: 0 },
      reason: { type: String, default: '' },
      refundedAt: Date,
      status: {
        type: String,
        enum: [
          'none',
          'requested',
          'pending_approval',
          'approved',
          'processing',
          'completed',
          'rejected',
          'failed',
        ],
        default: 'none',
      },
      refundReference: { type: String, default: '' },
      refundedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      adminNotes: { type: String, default: '' },
    },

    // Security Deposit Tracking
    securityDeposit: {
      isDeposit: { type: Boolean, default: false },
      depositStatus: {
        type: String,
        enum: ['held', 'returned', 'partially_deducted', 'forfeited'],
        default: 'held',
      },
      damageCharges: { type: Number, default: 0 },
      trafficFines: { type: Number, default: 0 },
      deductionAmount: { type: Number, default: 0 },
      deductionReason: { type: String, default: '' },
      refundAmount: { type: Number, default: 0 },
      settledAt: Date,
      settledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate receiptNumber before save
paymentSchema.pre('save', async function (next) {
  if (!this.receiptNumber) {
    const count = await mongoose.model('Payment').countDocuments();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.receiptNumber = `REC-${dateStr}-${1001 + count}`;
  }
  next();
});

paymentSchema.index({ booking: 1, createdAt: -1 });
paymentSchema.index({ 'refund.status': 1 });
paymentSchema.index({ 'securityDeposit.isDeposit': 1 });

export default mongoose.model('Payment', paymentSchema);
