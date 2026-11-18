import React, { useState } from 'react';
import {
  X,
  Car,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  CreditCard,
  Printer,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  Check
} from 'lucide-react';
import api from '../../services/api';

export default function CustomerBookingDetailsModal({
  isOpen,
  onClose,
  booking,
  onBookingCancelled,
  onOpenReceipt,
}) {
  const [cancelling, setCancelling] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change of travel schedule');
  const [cancelError, setCancelError] = useState('');
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  if (!isOpen || !booking) return null;

  const vehicle = booking.vehicle || {};
  const pricing = booking.pricingBreakdown || {};
  const customer = booking.customerDetails || {};

  const canCancel = ['pending', 'confirmed', 'awaiting_payment'].includes(booking.status);

  // Check 24 hour threshold for cancellation policy warning
  const now = new Date();
  const tripStart = new Date(booking.startDate);
  const diffHours = (tripStart - now) / (1000 * 60 * 60);
  const isWithin24Hours = diffHours < 24 && diffHours > 0;

  const handleConfirmCancel = async () => {
    setCancelling(true);
    setCancelError('');
    try {
      const res = await api.post(`/customer/bookings/${booking.bookingId || booking._id}/cancel`, {
        reason: cancelReason,
      });

      if (res.data.success) {
        setCancelSuccessMsg(res.data.message || 'Booking cancelled successfully.');
        setTimeout(() => {
          setCancelModalOpen(false);
          if (onBookingCancelled) onBookingCancelled();
          onClose();
        }, 1500);
      }
    } catch (err) {
      setCancelError(err.response?.data?.message || 'Failed to cancel reservation.');
    } finally {
      setCancelling(false);
    }
  };

  // Lifecycle visual timeline stages
  const timelineStages = [
    {
      title: 'Booking Submitted',
      desc: 'Reservation received in central dispatch system.',
      done: true,
      current: booking.status === 'pending',
    },
    {
      title: 'Documents Review',
      desc: 'Driving licence & identity verification.',
      done: booking.status !== 'pending' || !!booking.documents?.drivingLicense?.fileUrl,
      current: booking.status === 'pending',
    },
    {
      title: 'Booking Confirmed',
      desc: 'Vehicle allocated & scheduled for dispatch.',
      done: ['confirmed', 'ongoing', 'completed'].includes(booking.status),
      current: booking.status === 'confirmed',
    },
    {
      title: 'Chauffeur / Staging',
      desc: booking.driver ? `Driver ${booking.driver.name} assigned.` : 'Vehicle staged for handover.',
      done: ['confirmed', 'ongoing', 'completed'].includes(booking.status) && !!booking.driver,
      current: booking.status === 'confirmed' && !!booking.driver,
    },
    {
      title: 'Rental On Road',
      desc: 'Trip active across Nepal highways.',
      done: ['ongoing', 'completed'].includes(booking.status),
      current: booking.status === 'ongoing',
    },
    {
      title: 'Trip Completed',
      desc: 'Vehicle returned & deposit settled.',
      done: booking.status === 'completed',
      current: booking.status === 'completed',
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0755C9] flex items-center justify-center font-black">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-[#10243A]">
                    {booking.bookingId}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : booking.status === 'ongoing'
                        ? 'bg-blue-50 text-[#0755C9] border border-blue-200'
                        : booking.status === 'completed'
                        ? 'bg-slate-100 text-slate-700'
                        : booking.status === 'cancelled'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{vehicle.name} • {booking.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenReceipt && onOpenReceipt(booking)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-[#0755C9]" />
                <span>Invoice Voucher</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

            {/* 1. Visual Lifecycle Progress Timeline */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                Booking Progress Lifecycle
              </span>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {timelineStages.map((stage, idx) => (
                  <div key={idx} className="relative flex items-start gap-3 text-xs">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ring-4 ring-white ${
                        stage.done
                          ? 'bg-emerald-500 text-white'
                          : stage.current
                          ? 'bg-[#0755C9] text-white animate-pulse'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {stage.done ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </div>
                    <div>
                      <p className={`font-bold ${stage.done ? 'text-slate-900' : 'text-slate-500'}`}>
                        {stage.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Vehicle & Assigned Chauffeur Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Vehicle Specifications</span>
                <p className="font-extrabold text-slate-900 text-sm">{vehicle.name}</p>
                <p className="text-slate-600">
                  {vehicle.category} • {vehicle.specifications?.transmission || 'Automatic'} • {vehicle.specifications?.fuelType || 'Petrol'}
                </p>
                <p className="text-slate-500">Plate: {vehicle.registrationNumber || 'BA 2 PA 4892'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Assigned Chauffeur</span>
                {booking.driver ? (
                  <>
                    <p className="font-extrabold text-slate-900 text-sm">{booking.driver.name}</p>
                    <p className="text-slate-600 font-mono">Mobile: {booking.driver.phone || '+977 9801234567'}</p>
                    <p className="text-emerald-600 font-bold">Verified Professional Chauffeur</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-slate-700">
                      {booking.rentalType === 'self_drive' ? 'Self-Drive (No Driver)' : 'Pending Chauffeur Allocation'}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {booking.rentalType === 'self_drive'
                        ? 'Customer self-drive rental.'
                        : 'Driver will be assigned 12 hrs before pickup.'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* 3. Itinerary Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pickup Location & Date</span>
                <p className="font-extrabold text-slate-900">{booking.pickupLocation?.name || 'Kathmandu'}</p>
                <p className="text-slate-500">
                  {new Date(booking.startDate).toLocaleDateString()} at {booking.pickupTime || '09:00 AM'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Return Location & Date</span>
                <p className="font-extrabold text-slate-900">{booking.dropoffLocation?.name || 'Pokhara'}</p>
                <p className="text-slate-500">
                  {new Date(booking.endDate).toLocaleDateString()} at {booking.returnTime || '06:00 PM'}
                </p>
              </div>
            </div>

            {/* 4. Financial Payment Breakdown */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-black text-slate-900 uppercase tracking-wider text-[11px]">
                  Financial Breakdown
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                    booking.paymentStatus === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : booking.paymentStatus === 'partially_paid'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Payment: {booking.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Base Total ({booking.durationDays || 2} Days):</span>
                <span className="font-mono font-bold text-slate-900">
                  NPR {(pricing.baseTotal || 0).toLocaleString()}
                </span>
              </div>

              {pricing.driverAllowance > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Chauffeur Allowance:</span>
                  <span className="font-mono font-bold text-slate-900">
                    NPR {pricing.driverAllowance.toLocaleString()}
                  </span>
                </div>
              )}

              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Promo Discount:</span>
                  <span className="font-mono">- NPR {pricing.discountAmount.toLocaleString()}</span>
                </div>
              )}

              {pricing.securityDeposit > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Security Deposit (Refundable):</span>
                  <span className="font-mono font-bold text-slate-900">
                    NPR {pricing.securityDeposit.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-sm">
                <span className="text-slate-900">Total Booking Value:</span>
                <span className="text-[#0755C9] font-mono">
                  NPR {(booking.totalAmount || pricing.grandTotal || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span>Amount Paid:</span>
                <span className="font-mono">NPR {(booking.paidAmount || 0).toLocaleString()}</span>
              </div>

              {((booking.totalAmount || pricing.grandTotal || 0) - (booking.paidAmount || 0)) > 0 && (
                <div className="flex justify-between text-xs text-amber-700 font-bold">
                  <span>Remaining Due (Pay on Pickup):</span>
                  <span className="font-mono">
                    NPR {((booking.totalAmount || pricing.grandTotal || 0) - (booking.paidAmount || 0)).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            {canCancel ? (
              <button
                type="button"
                onClick={() => setCancelModalOpen(true)}
                className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel Booking
              </button>
            ) : (
              <span className="text-[11px] text-slate-400">
                {booking.status === 'cancelled' ? 'This booking was cancelled.' : 'Modification locked.'}
              </span>
            )}

            <button
              type="button"
              onClick={() => onOpenReceipt && onOpenReceipt(booking)}
              className="px-5 py-2.5 rounded-xl bg-[#0755C9] text-white text-xs font-black hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Receipt</span>
            </button>
          </div>

        </div>
      </div>

      {/* Cancellation Confirmation Dialog */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h4 className="text-base font-extrabold text-slate-900">Cancel Reservation?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel booking <strong className="font-mono text-slate-800">{booking.bookingId}</strong>?
              </p>
            </div>

            {/* Policy notice */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Cancellation Policy:</p>
              {isWithin24Hours ? (
                <p className="text-amber-700 text-[11px]">
                  Cancellation within 24 hours of pickup incurs a nominal NPR 2,500 fleet retention fee. Any excess paid will be refunded.
                </p>
              ) : (
                <p className="text-emerald-700 text-[11px]">
                  100% Free cancellation. Full refund of any advance payments will be credited back to your account.
                </p>
              )}
            </div>

            {cancelError && (
              <p className="text-xs text-rose-600 font-bold text-center">{cancelError}</p>
            )}

            {cancelSuccessMsg && (
              <p className="text-xs text-emerald-600 font-bold text-center">{cancelSuccessMsg}</p>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Cancellation Reason</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-white border border-slate-200 outline-none"
              >
                <option value="Change of travel schedule">Change of travel schedule</option>
                <option value="Flight delay / cancellation">Flight delay / cancellation</option>
                <option value="Weather / road blockage in Nepal">Weather / road blockage in Nepal</option>
                <option value="Booked another vehicle">Booked another vehicle</option>
                <option value="Personal emergency">Personal emergency</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Keep Booking
              </button>

              <button
                type="button"
                disabled={cancelling}
                onClick={handleConfirmCancel}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Yes, Cancel</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
