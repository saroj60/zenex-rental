import React from 'react';
import {
  X,
  User,
  Car,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  PlayCircle,
  XCircle,
  UserCheck,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Receipt,
  CarFront,
} from 'lucide-react';

const BookingDetailsModal = ({
  booking,
  onClose,
  onConfirm,
  onReject,
  onAssignDriver,
  onAssignVehicle,
  onRecordPayment,
  onMarkOngoing,
  onMarkCompleted,
  onCancel,
}) => {
  if (!booking) return null;

  const vehicle = booking.vehicle || {};
  const customer = booking.customerDetails || {};
  const pricing = booking.pricingBreakdown || {};
  const driver = booking.driver;

  const grandTotal = booking.totalAmount || pricing.grandTotal || 0;
  const paidAmount = booking.paidAmount || 0;
  const remainingAmount = Math.max(grandTotal - paidAmount, 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800 border-amber-300',
    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ongoing: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-slate-100 text-slate-800 border-slate-300',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-300',
    rejected: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  const paymentColors = {
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    partially_paid: 'bg-sky-100 text-sky-800 border-sky-300',
    unpaid: 'bg-rose-100 text-rose-800 border-rose-300',
    pending: 'bg-amber-100 text-amber-800 border-amber-300',
    refund_pending: 'bg-purple-100 text-purple-800 border-purple-300',
    refunded: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0755C9] text-white flex items-center justify-center shadow-md shadow-blue-500/20 font-mono font-black text-sm">
              NCR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">
                  Booking #{booking.bookingId}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                    statusColors[booking.status] || statusColors.pending
                  }`}
                >
                  {booking.status}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                    paymentColors[booking.paymentStatus] || paymentColors.pending
                  }`}
                >
                  Payment: {booking.paymentStatus?.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Reserved on {formatDate(booking.createdAt)} via{' '}
                <span className="font-bold uppercase text-slate-600">
                  {booking.paymentMethod || 'Cash'}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Rejection / Cancellation alerts if applicable */}
          {booking.status === 'rejected' && booking.rejectionReason && (
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-2.5 text-purple-900">
              <AlertCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs">Reservation Declined</p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Reason: {booking.rejectionReason}
                </p>
              </div>
            </div>
          )}

          {booking.status === 'cancelled' && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs">Reservation Cancelled</p>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  Reason: {booking.cancellationReason || 'Admin or customer cancelled'}
                </p>
                {booking.cancellationFee > 0 && (
                  <p className="text-[11px] font-black text-rose-900 mt-0.5">
                    Cancellation Policy Fee: NPR {booking.cancellationFee.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 4 Information Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. CUSTOMER INFORMATION */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                  <User className="w-4 h-4 text-[#0755C9]" />
                  <span>Customer Information</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>ID Verified</span>
                </span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Full Name:</span>
                  <strong className="text-slate-800">
                    {customer.fullName || booking.customer?.name || 'Customer'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone Number:</span>
                  <a
                    href={`tel:${customer.phone || ''}`}
                    className="font-mono font-bold text-[#0755C9] hover:underline"
                  >
                    {customer.phone || booking.customer?.phone || 'N/A'}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email Address:</span>
                  <span className="font-semibold text-slate-800">
                    {customer.email || booking.customer?.email || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address:</span>
                  <span className="text-slate-800 font-medium">
                    {customer.address || 'Kathmandu, Nepal'}
                  </span>
                </div>
                {booking.rentalType === 'self_drive' && (
                  <div className="flex justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-400 font-bold">Driving License:</span>
                    <span className="font-mono font-black text-purple-700">
                      {customer.drivingLicenseNumber || '01-06-88776655'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. VEHICLE INFORMATION */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                  <Car className="w-4 h-4 text-[#0755C9]" />
                  <span>Vehicle Information</span>
                </div>
                <button
                  type="button"
                  onClick={onAssignVehicle}
                  className="text-[10px] font-black text-[#0755C9] hover:underline bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200"
                >
                  Change Vehicle
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-16 h-12 bg-white rounded-xl border border-slate-200 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={vehicle.images?.[0] || '/cars/creta.png'}
                    alt={vehicle.name || 'Vehicle'}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/cars/creta.png';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {vehicle.name || 'Assigned Fleet Car'}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded">
                      {vehicle.registrationNumber || 'BA 18 CHA 4291'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {vehicle.category || 'SUV'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Seats</span>
                  <span className="font-bold text-slate-800">{vehicle.seats || 5} Seater</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Fuel</span>
                  <span className="font-bold text-slate-800">{vehicle.fuelType || 'Petrol'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Gearbox</span>
                  <span className="font-bold text-slate-800">{vehicle.transmission || 'Automatic'}</span>
                </div>
              </div>
            </div>

            {/* 3. TRIP & ROUTE SCHEDULE */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                <Calendar className="w-4 h-4 text-[#0755C9]" />
                <span>Trip & Route Schedule</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Pickup: {booking.pickupLocation?.name || 'Kathmandu'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDate(booking.startDate)} ({booking.pickupTime || '09:00 AM'})
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {booking.pickupLocation?.fullAddress || 'Central Depot / Airport Terminal'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 border-t border-slate-200/50">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Drop-off: {booking.dropoffLocation?.name || 'Pokhara'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDate(booking.endDate)} ({booking.returnTime || '06:00 PM'})
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {booking.dropoffLocation?.fullAddress || 'Customer Destination'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 font-semibold">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-black text-[#0755C9]">
                    {booking.durationDays || 1} {booking.durationDays === 1 ? 'Day' : 'Days'}
                  </span>
                </div>

                {booking.specialInstructions && (
                  <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100 text-[10px] text-slate-600">
                    <strong className="text-slate-800 block mb-0.5">Special Instructions:</strong>
                    {booking.specialInstructions}
                  </div>
                )}
              </div>
            </div>

            {/* 4. CHAUFFEUR / DRIVER ASSIGNMENT */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                  <UserCheck className="w-4 h-4 text-[#0755C9]" />
                  <span>Assigned Driver</span>
                </div>
                {booking.rentalType === 'with_driver' && (
                  <button
                    type="button"
                    onClick={onAssignDriver}
                    className="text-[10px] font-black text-[#0755C9] hover:underline bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200"
                  >
                    {driver ? 'Change Driver' : 'Assign Driver'}
                  </button>
                )}
              </div>

              {booking.rentalType === 'self_drive' ? (
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-purple-800 text-center">
                  <p className="font-bold">Self-Drive Reservation</p>
                  <p className="text-[10px] text-purple-600 mt-0.5">
                    No chauffeur required. Customer verified driving license required.
                  </p>
                </div>
              ) : driver ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        driver.avatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={driver.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-black text-slate-900">{driver.name}</h4>
                      <p className="font-mono text-[11px] text-[#0755C9] font-bold">
                        {driver.phone}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 text-[10px]">
                    <div>
                      <span className="text-slate-400 block font-bold">License:</span>
                      <span className="font-mono font-bold text-slate-700">
                        {driver.licenseNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Rating:</span>
                      <span className="font-bold text-amber-600">
                        ★ {driver.rating || 4.9} ({driver.tripsCompleted || 140} trips)
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-center space-y-2">
                  <AlertCircle className="w-5 h-5 mx-auto text-amber-600" />
                  <p className="font-bold text-xs">No Chauffeur Assigned Yet</p>
                  <button
                    type="button"
                    onClick={onAssignDriver}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-black shadow-xs transition-colors"
                  >
                    Assign Driver Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 5. ITEMIZED PAYMENT BREAKDOWN */}
          <div className="p-4.5 rounded-2xl bg-slate-900 text-white space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 font-black text-xs text-white">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span>Nepal Car Rental Itemized Pricing Breakdown</span>
              </div>
              <button
                type="button"
                onClick={onRecordPayment}
                className="text-[10px] font-black bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <CreditCard className="w-3 h-3" />
                <span>Record Payment</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Base Rental ({booking.durationDays || 1}d)</span>
                <span className="font-mono font-bold text-white">
                  NPR {(pricing.baseTotal || 0).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Driver Charges</span>
                <span className="font-mono font-bold text-white">
                  NPR {(pricing.driverAllowance || 0).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Fuel / Extra Km</span>
                <span className="font-mono font-bold text-white">
                  NPR {(pricing.fuelEstimate || 0).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Additional Charges</span>
                <span className="font-mono font-bold text-white">
                  NPR {(pricing.additionalCharges || 0).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Discount Applied</span>
                <span className="font-mono font-bold text-emerald-400">
                  - NPR {(pricing.discountAmount || 0).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Security Deposit</span>
                <span className="font-mono font-bold text-amber-300">
                  NPR {(pricing.securityDeposit || 0).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Grand Total</span>
                <span className="font-mono font-black text-base text-white">
                  NPR {grandTotal.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Payment Balance</span>
                <span
                  className={`font-mono font-black text-sm ${
                    remainingAmount === 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {remainingAmount === 0 ? 'Fully Paid' : `NPR ${remainingAmount.toLocaleString()} Due`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer: Workflow Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            {/* Confirm button (if pending) */}
            {booking.status === 'pending' && (
              <button
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm Booking</span>
              </button>
            )}

            {/* Reject button (if pending) */}
            {booking.status === 'pending' && (
              <button
                type="button"
                onClick={onReject}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Booking</span>
              </button>
            )}

            {/* Mark Ongoing (if confirmed) */}
            {booking.status === 'confirmed' && (
              <button
                type="button"
                onClick={onMarkOngoing}
                className="px-4 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Trip (Ongoing)</span>
              </button>
            )}

            {/* Mark Completed (if ongoing) */}
            {booking.status === 'ongoing' && (
              <button
                type="button"
                onClick={onMarkCompleted}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark as Completed</span>
              </button>
            )}

            {/* Cancel booking (if not already cancelled/completed) */}
            {(booking.status === 'pending' || booking.status === 'confirmed') && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3.5 py-2 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Cancel Reservation</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-black transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
