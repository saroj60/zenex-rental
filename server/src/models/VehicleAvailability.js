import mongoose from 'mongoose';

const vehicleAvailabilitySchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'maintenance', 'blocked'],
      default: 'booked',
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
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

vehicleAvailabilitySchema.index({ vehicle: 1, startDate: 1, endDate: 1 });

export default mongoose.model('VehicleAvailability', vehicleAvailabilitySchema);
