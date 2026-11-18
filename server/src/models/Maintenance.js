import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['periodic_service', 'repair', 'inspection', 'insurance_renewal', 'tax_token', 'tire_change'],
      default: 'periodic_service',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    cost: {
      type: Number,
      default: 0,
    },
    serviceCenter: {
      type: String,
      default: 'Kathmandu Hyundai Service Centre, Balkumari',
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed'],
      default: 'scheduled',
    },
    odometerReading: {
      type: Number,
      default: 0,
    },
    insuranceExpiryDate: {
      type: Date,
    },
    bluebookTaxExpiryDate: {
      type: Date,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Maintenance', maintenanceSchema);
