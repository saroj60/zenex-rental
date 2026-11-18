import React, { useState } from 'react';
import {
  Eye,
  CheckCircle2,
  Receipt,
  RotateCcw,
  ExternalLink,
  Copy,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';

const METHOD_CONFIG = {
  esewa: {
    label: 'eSewa',
    badge: 'bg-[#60BB46]/10 text-[#3d8329] border-[#60BB46]/30',
    dot: 'bg-[#60BB46]',
  },
  khalti: {
    label: 'Khalti',
    badge: 'bg-[#5C2D91]/10 text-[#5C2D91] border-[#5C2D91]/30',
    dot: 'bg-[#5C2D91]',
  },
  fonepay: {
    label: 'Fonepay',
    badge: 'bg-[#C8102E]/10 text-[#C8102E] border-[#C8102E]/30',
    dot: 'bg-[#C8102E]',
  },
  cash: {
    label: 'Cash',
    badge: 'bg-blue-50 text-[#0755C9] border-blue-200',
    dot: 'bg-[#0755C9]',
  },
  bank_transfer: {
    label: 'Bank Transfer',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
  },
};

const STATUS_CONFIG = {
  paid: {
    label: 'PAID',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  completed: {
    label: 'COMPLETED',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  partially_paid: {
    label: 'PARTIAL',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  pending: {
    label: 'PENDING',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  processing: {
    label: 'PROCESSING',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  refund_pending: {
    label: 'REFUND PENDING',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  partially_refunded: {
    label: 'PARTIAL REFUND',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  refunded: {
    label: 'REFUNDED',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  failed: {
    label: 'FAILED',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

const PaymentTableView = ({
  payments = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onViewDetails,
  onVerifyPayment,
  onDownloadReceipt,
  onInitiateRefund,
  onViewBooking,
}) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-soft text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#0755C9] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500">Loading Nepal Car Rental transactions...</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 border border-slate-100 shadow-soft text-center space-y-3">
        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
          <CreditCard className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-extrabold text-slate-900">No Transactions Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No financial entries match your current search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
      {/* Mobile Transaction Cards List (< md) */}
      <div className="md:hidden divide-y divide-slate-100">
        {payments.map((p) => {
          const methodKey = (p.paymentMethod || 'cash').toLowerCase().replace(' ', '_');
          const methodCfg = METHOD_CONFIG[methodKey] || METHOD_CONFIG.cash;
          const statusCfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.paid;
          const booking = p.booking || {};
          const vehicle = booking.vehicle || {};
          const customer = p.customer || booking.customerDetails || {};

          return (
            <div key={p._id} className="p-4 space-y-3 text-xs hover:bg-slate-50 transition-colors">
              {/* Header: Transaction ID & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold font-mono text-[#0755C9] text-xs">
                    {p.transactionId}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(p.transactionId)}
                    className="text-slate-300 hover:text-slate-600"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusCfg.badge}`}>
                  {statusCfg.label}
                </span>
              </div>

              {/* Booking & Customer Info */}
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Booking Ref: <b className="font-mono text-slate-800 font-bold">{booking.bookingId || 'NCR-10458'}</b></span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${methodCfg.badge}`}>
                    {methodCfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="truncate max-w-[180px]">Customer: <b>{customer.name || customer.fullName || 'Saroj Bhagat'}</b></span>
                  <span className="truncate max-w-[140px] text-slate-400 font-medium">{vehicle.name || 'Hyundai Creta'}</span>
                </div>
              </div>

              {/* Amount & Date Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400">{formatDateTime(p.createdAt)}</span>
                <span className="font-mono font-black text-slate-900 text-xs">
                  NPR {(p.amount || 0).toLocaleString()}
                </span>
              </div>

              {/* Mobile Actions Bar */}
              <div className="flex flex-wrap items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onViewDetails(p)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-blue-50 text-[#0755C9] font-bold text-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDownloadReceipt(p)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Receipt</span>
                </button>

                {p.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => onVerifyPayment(p)}
                    className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center gap-1 border border-amber-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify</span>
                  </button>
                )}

                {(p.status === 'paid' || p.status === 'completed' || p.status === 'partially_refunded') && (
                  <button
                    type="button"
                    onClick={() => onInitiateRefund(p)}
                    className="px-2.5 py-1.5 min-h-[34px] rounded-lg border border-purple-200 text-purple-700 font-bold text-xs flex items-center gap-1 hover:bg-purple-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refund</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (hidden on mobile, block on md:) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1150px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              <th className="py-3 px-3.5">Transaction ID</th>
              <th className="py-3 px-3">Booking ID</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Vehicle</th>
              <th className="py-3 px-3">Method</th>
              <th className="py-3 px-3 text-right">Amount (NPR)</th>
              <th className="py-3 px-3">Date & Time</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3">Reference / Code</th>
              <th className="py-3 px-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {payments.map((p) => {
              const methodKey = (p.paymentMethod || 'cash').toLowerCase().replace(' ', '_');
              const methodCfg = METHOD_CONFIG[methodKey] || METHOD_CONFIG.cash;
              const statusCfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.paid;
              const booking = p.booking || {};
              const vehicle = booking.vehicle || {};
              const customer = p.customer || booking.customerDetails || {};

              return (
                <tr key={p._id} className="hover:bg-blue-50/30 transition-colors group">
                  {/* 1. Transaction ID */}
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold font-mono text-[#0755C9]">
                        {p.transactionId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(p.transactionId)}
                        title="Copy Txn ID"
                        className="text-slate-300 hover:text-slate-600 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    {copiedId === p.transactionId && (
                      <span className="text-[9px] text-emerald-600 font-bold block">
                        Copied!
                      </span>
                    )}
                    {p.receiptNumber && (
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {p.receiptNumber}
                      </span>
                    )}
                  </td>

                  {/* 2. Booking ID */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onViewBooking(booking)}
                      className="font-mono font-bold text-slate-800 hover:text-[#0755C9] hover:underline"
                    >
                      {booking.bookingId || 'NCR-Trip'}
                    </button>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {booking.rentalType === 'self_drive' ? 'Self Drive' : 'Chauffeur'}
                    </span>
                  </td>

                  {/* 3. Customer Name */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <strong className="text-slate-900 block truncate max-w-[130px]">
                      {customer.name || customer.fullName || 'Valued Customer'}
                    </strong>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[130px]">
                      {customer.phone || customer.email || ''}
                    </span>
                  </td>

                  {/* 4. Vehicle */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-bold text-slate-800 block truncate max-w-[130px]">
                      {vehicle.name || 'Fleet Car'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {vehicle.registrationNumber || 'BA Plate'}
                    </span>
                  </td>

                  {/* 5. Payment Method */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${methodCfg.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${methodCfg.dot}`} />
                      <span>{methodCfg.label}</span>
                    </span>
                    <span className="text-[9px] text-slate-400 block uppercase font-semibold mt-0.5">
                      {p.paymentType || 'Full'}
                    </span>
                  </td>

                  {/* 6. Amount (NPR) */}
                  <td className="py-3 px-3 whitespace-nowrap text-right">
                    <strong className="font-mono font-black text-slate-900 block text-xs">
                      NPR {(p.amount || 0).toLocaleString()}
                    </strong>
                    {p.refund?.amount > 0 && (
                      <span className="text-[10px] text-purple-600 font-bold block">
                        Refunded: NPR {p.refund.amount.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* 7. Date & Time */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-slate-700 block font-semibold">
                      {formatDate(p.paidAt || p.createdAt)}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {formatTime(p.paidAt || p.createdAt)}
                    </span>
                  </td>

                  {/* 8. Payment Status */}
                  <td className="py-3 px-3 whitespace-nowrap text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[9px] font-black uppercase rounded-full border ${statusCfg.badge}`}
                    >
                      {statusCfg.label}
                    </span>
                  </td>

                  {/* 9. Payment Reference */}
                  <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-600">
                    <span className="truncate max-w-[120px] block" title={p.gatewayDetails?.refId || p.remarks}>
                      {p.gatewayDetails?.refId || p.gatewayDetails?.pidx || p.gatewayDetails?.transaction_code || 'Voucher Cleared'}
                    </span>
                  </td>

                  {/* 10. Actions */}
                  <td className="py-3 px-3.5 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* View Transaction Details */}
                      <button
                        type="button"
                        onClick={() => onViewDetails(p)}
                        title="View Complete Transaction Breakdown"
                        className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0755C9] rounded-lg transition-colors border border-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Download / Print Receipt */}
                      <button
                        type="button"
                        onClick={() => onDownloadReceipt(p)}
                        title="Download / Print Official Receipt"
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </button>

                      {/* Verify Payment (if pending) */}
                      {p.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => onVerifyPayment(p)}
                          title="Verify Bank Statement / Gateway Clearance"
                          className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors border border-amber-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Initiate Refund (if paid and not already fully refunded) */}
                      {(p.status === 'paid' || p.status === 'completed' || p.status === 'partially_refunded') && (
                        <button
                          type="button"
                          onClick={() => onInitiateRefund(p)}
                          title="Initiate Customer Refund"
                          className="p-1.5 bg-slate-50 hover:bg-purple-50 text-slate-400 hover:text-purple-700 rounded-lg transition-colors border border-slate-200"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-100 gap-3 text-xs">
        <span className="text-slate-500 font-semibold">
          Page <strong className="text-slate-900">{currentPage}</strong> of{' '}
          <strong className="text-slate-900">{totalPages || 1}</strong> (
          {totalItems} total transactions)
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTableView;
