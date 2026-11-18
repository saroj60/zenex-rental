import React from 'react';
import {
  X,
  CreditCard,
  Receipt,
  User,
  Car,
  Calendar,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Copy,
} from 'lucide-react';

const PaymentDetailsModal = ({
  payment,
  onClose,
  onDownloadReceipt,
  onVerifyPayment,
  onInitiateRefund,
}) => {
  if (!payment) return null;

  const booking = payment.booking || {};
  const vehicle = booking.vehicle || {};
  const customer = payment.customer || booking.customerDetails || {};

  const grandTotal = booking.totalAmount || booking.pricingBreakdown?.grandTotal || 0;
  const paidAmount = booking.paidAmount || 0;
  const remainingDue = Math.max(grandTotal - paidAmount, 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Transaction #{payment.transactionId}
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {payment.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium font-mono">
                Receipt Number: {payment.receiptNumber || 'N/A'} • {formatDate(payment.paidAt || payment.createdAt)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Financial Breakdown Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Payment Amount Breakdown
              </span>
              <span className="font-mono text-xs font-black uppercase text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                Method: {payment.paymentMethod}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">Total Booking Cost</span>
                <strong className="font-mono text-sm text-white">
                  NPR {grandTotal.toLocaleString()}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">This Transaction</span>
                <strong className="font-mono text-base text-emerald-400">
                  NPR {(payment.amount || 0).toLocaleString()}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">Total Paid to Date</span>
                <strong className="font-mono text-sm text-white">
                  NPR {paidAmount.toLocaleString()}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">Remaining Balance</span>
                <strong className={`font-mono text-sm ${remainingDue === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {remainingDue === 0 ? 'Fully Paid' : `NPR ${remainingDue.toLocaleString()}`}
                </strong>
              </div>
            </div>
          </div>

          {/* Customer & Booking 2-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <User className="w-4 h-4 text-[#0755C9]" />
                <span>Customer Information</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p><strong>Name:</strong> {customer.name || customer.fullName || 'Valued Customer'}</p>
                <p><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
                <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
                <p><strong>Address:</strong> {customer.address || 'Kathmandu, Nepal'}</p>
              </div>
            </div>

            {/* Booking & Vehicle Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Car className="w-4 h-4 text-[#0755C9]" />
                <span>Trip & Vehicle Info</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p><strong>Booking ID:</strong> #{booking.bookingId || 'NCR Trip'}</p>
                <p><strong>Vehicle:</strong> {vehicle.name} ({vehicle.registrationNumber || 'BA Plate'})</p>
                <p><strong>Route:</strong> {booking.pickupLocation?.name} → {booking.dropoffLocation?.name}</p>
                <p><strong>Rental Type:</strong> {booking.rentalType === 'self_drive' ? 'Self Drive' : 'With Chauffeur'}</p>
              </div>
            </div>
          </div>

          {/* Gateway & Settlement Reference Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">
              Gateway Settlement & Bank Reference
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px] text-slate-700">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Transaction Reference</span>
                <span className="font-bold text-slate-900">
                  {payment.gatewayDetails?.refId || payment.remarks || 'Direct Deposit'}
                </span>
              </div>

              {payment.gatewayDetails?.pidx && (
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Khalti PIDX</span>
                  <span className="font-bold text-purple-700 truncate block">{payment.gatewayDetails.pidx}</span>
                </div>
              )}

              {payment.gatewayDetails?.transaction_code && (
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">eSewa Code / PRN</span>
                  <span className="font-bold text-emerald-700">{payment.gatewayDetails.transaction_code}</span>
                </div>
              )}

              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Received By</span>
                <span className="font-sans font-bold text-slate-800">{payment.receivedByName || 'Central Admin'}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Currency</span>
                <span className="font-bold text-slate-900">NPR (Nepalese Rupee)</span>
              </div>
            </div>
          </div>

          {/* Refund Details if processed */}
          {payment.refund?.amount > 0 && (
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-xs text-purple-900">
                  <RotateCcw className="w-4 h-4 text-purple-700" />
                  <span>Refund Disbursed: NPR {payment.refund.amount.toLocaleString()}</span>
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">
                  {payment.refund.status}
                </span>
              </div>
              <p className="text-[11px] text-purple-800"><strong>Reason:</strong> {payment.refund.reason}</p>
              {payment.refund.refundReference && (
                <p className="text-[10px] font-mono text-purple-700">Ref: {payment.refund.refundReference}</p>
              )}
            </div>
          )}

          {/* Security Deposit Details if applicable */}
          {payment.securityDeposit?.isDeposit && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-xs text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Vehicle Security Deposit (NPR {payment.amount.toLocaleString()})</span>
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
                  {payment.securityDeposit.depositStatus}
                </span>
              </div>
              {payment.securityDeposit.deductionAmount > 0 && (
                <p className="text-[11px] text-amber-800">
                  Deductions Applied: NPR {payment.securityDeposit.deductionAmount.toLocaleString()} ({payment.securityDeposit.deductionReason})
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDownloadReceipt(payment)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download Receipt</span>
            </button>

            {payment.status === 'pending' && (
              <button
                type="button"
                onClick={() => onVerifyPayment(payment)}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-sm transition-colors"
              >
                Verify Payment
              </button>
            )}

            {(payment.status === 'paid' || payment.status === 'completed' || payment.status === 'partially_refunded') && (
              <button
                type="button"
                onClick={() => onInitiateRefund(payment)}
                className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-colors"
              >
                Initiate Refund
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
