import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle,
  Receipt,
  FileCheck,
} from 'lucide-react';

const RecordPaymentModal = ({ booking, onClose, onRecordPayment }) => {
  if (!booking) return null;

  const grandTotal = booking.totalAmount || booking.pricingBreakdown?.grandTotal || 0;
  const paidAmount = booking.paidAmount || 0;
  const remainingDue = Math.max(grandTotal - paidAmount, 0);

  const [amount, setAmount] = useState(remainingDue || 5000);
  const [paymentMethod, setPaymentMethod] = useState(booking.paymentMethod || 'cash');
  const [paymentStatus, setPaymentStatus] = useState('paid');
  const [transactionRef, setTransactionRef] = useState('');
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    setSubmitting(true);
    try {
      await onRecordPayment(booking._id, {
        amount: Number(amount),
        paymentMethod,
        paymentStatus,
        transactionRef,
        remarks,
      });
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
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Record Payment for #{booking.bookingId}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Summary Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex justify-between items-center font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-sans font-bold">
                Total Reservation Cost
              </span>
              <strong className="text-sm font-black">
                NPR {grandTotal.toLocaleString()}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block font-sans font-bold">
                Remaining Balance Due
              </span>
              <strong className="text-sm font-black text-amber-400">
                NPR {remainingDue.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAmount(remainingDue)}
              className="flex-1 py-1.5 px-2 bg-blue-50 text-[#0755C9] border border-blue-200 rounded-lg text-[10px] font-bold hover:bg-blue-100 transition-colors"
            >
              Full Due (NPR {remainingDue.toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => setAmount(Math.round(grandTotal * 0.5))}
              className="flex-1 py-1.5 px-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-slate-100 transition-colors"
            >
              50% Advance
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Payment Amount (NPR) *
            </label>
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Payment Method *
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            >
              <option value="cash">Cash on Hand</option>
              <option value="esewa">eSewa Mobile Wallet</option>
              <option value="khalti">Khalti Digital Wallet</option>
              <option value="fonepay">Fonepay Direct QR</option>
              <option value="bank_transfer">Direct Bank Transfer</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Mark Booking Payment Status As:
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            >
              <option value="paid">Paid in Full</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="refund_pending">Refund Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Reference / Transaction Code */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Gateway Transaction Code / Cheque No. (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. ESW-889104, KHL-30192, Bank Voucher #401"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Administrative Remarks / Receipt Note
            </label>
            <input
              type="text"
              placeholder="e.g. Verified by accountant, 50% paid in Kathmandu depot"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{submitting ? 'Recording...' : 'Record Payment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
