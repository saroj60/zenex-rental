import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  XCircle,
  AlertCircle,
  Receipt,
} from 'lucide-react';

const REJECTION_PRESETS = [
  'Vehicle unavailable on requested dates due to urgent maintenance.',
  'Customer driving license document could not be verified.',
  'Customer requested booking withdrawal prior to payment.',
  'Self-drive security deposit requirement declined by customer.',
  'Intercity highway route currently restricted due to landslide/weather.',
];

const CANCELLATION_PRESETS = [
  'Customer requested cancellation due to travel schedule change.',
  'Customer flight to Kathmandu delayed/cancelled.',
  'Severe highway advisory for mountain routes.',
  'Customer failed to provide security deposit at pickup.',
];

const ActionReasonModal = ({
  type = 'reject', // 'reject' or 'cancel'
  booking,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!booking) return null;

  const presets = type === 'reject' ? REJECTION_PRESETS : CANCELLATION_PRESETS;
  const title = type === 'reject' ? 'Reject Reservation' : 'Cancel Reservation';
  const grandTotal = booking.totalAmount || booking.pricingBreakdown?.grandTotal || 0;

  // Approximate policy calculation
  const now = new Date();
  const pickupDate = new Date(booking.startDate);
  const hoursUntilPickup = (pickupDate - now) / (1000 * 60 * 60);

  let estFee = 0;
  let policyText = 'Free cancellation (>48 hours before pickup)';
  if (hoursUntilPickup <= 0) {
    estFee = Math.round(grandTotal * 0.5);
    policyText = '50% charge (trip day reached)';
  } else if (hoursUntilPickup <= 24) {
    estFee = Math.round(grandTotal * 0.25);
    policyText = '25% charge (<24 hours before pickup)';
  } else if (hoursUntilPickup <= 48) {
    estFee = Math.round(grandTotal * 0.1);
    policyText = '10% charge (24-48 hours before pickup)';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(booking._id, reason.trim());
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                type === 'reject'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {type === 'reject' ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                {title} – #{booking.bookingId}
              </h3>
              <p className="text-[11px] text-slate-400">
                Customer: {booking.customerDetails?.fullName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {type === 'cancel' && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span>Nepal Car Rental Cancellation Policy</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-amber-200/60 font-black">
                  {policyText}
                </span>
              </div>
              <p className="text-[11px] text-amber-700">
                Applicable cancellation charge: <strong>NPR {estFee.toLocaleString()}</strong>.
                {booking.paidAmount > 0 && (
                  <span className="block mt-0.5">
                    Refund amount due to customer: NPR{' '}
                    {Math.max(booking.paidAmount - estFee, 0).toLocaleString()}
                  </span>
                )}
              </p>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              {type === 'reject' ? 'Rejection Reason *' : 'Cancellation Reason *'}
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={`Enter detailed reason for ${type === 'reject' ? 'declining' : 'cancelling'} this booking...`}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400">
              Quick Presets:
            </span>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setReason(preset)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60 transition-colors truncate block"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!reason.trim() || submitting}
              className={`px-5 py-2 text-white rounded-xl text-xs font-black shadow-md disabled:opacity-50 transition-colors ${
                type === 'reject'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {submitting
                ? 'Processing...'
                : type === 'reject'
                ? 'Confirm Rejection'
                : 'Confirm Cancellation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionReasonModal;
