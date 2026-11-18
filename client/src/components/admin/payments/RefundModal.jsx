import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  AlertTriangle,
  FileText,
  DollarSign,
  Loader2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import api from '../../../services/api';

export default function RefundModal({ isOpen, onClose, payment, onSuccess }) {
  if (!isOpen || !payment) return null;

  const currentRefund = payment.refund?.amount || 0;
  const maxRefundable = Math.max(0, payment.amount - currentRefund);

  const [refundAmount, setRefundAmount] = useState(maxRefundable);
  const [reason, setReason] = useState('Customer cancellation within free refund policy');
  const [refundReference, setRefundReference] = useState(`REF-${Date.now().toString().slice(-6)}`);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNum = Number(refundAmount);
    if (!amountNum || amountNum <= 0) {
      setError('Please specify a positive refund amount.');
      return;
    }
    if (amountNum > maxRefundable) {
      setError(`Refund amount cannot exceed NPR ${maxRefundable.toLocaleString()}.`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        amount: amountNum,
        reason,
        refundReference,
        notes
      };

      const res = await api.post(`/payments/${payment._id}/refund`, payload);
      if (onSuccess) {
        onSuccess(res.data?.data);
      }
      onClose();
    } catch (err) {
      console.error('Refund processing error:', err);
      setError(err.response?.data?.message || 'Failed to process refund. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-rose-50 via-amber-50/30 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Initiate Customer Refund</h3>
              <p className="text-xs text-slate-500 font-semibold">
                Reverse transaction or process partial settlement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-500">
              <span>Transaction ID:</span>
              <span className="font-mono font-bold text-slate-800">{payment.transactionId}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Original Amount Paid:</span>
              <span className="font-black text-slate-900">NPR {payment.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Payment Gateway / Method:</span>
              <span className="font-bold uppercase text-[#0755C9]">{payment.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
              <span className="text-slate-700">Maximum Eligible Refund:</span>
              <span className="text-rose-600 font-black text-sm">NPR {maxRefundable.toLocaleString()}</span>
            </div>
          </div>

          {/* Refund Amount */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Refund Amount (NPR) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                NPR
              </span>
              <input
                type="number"
                min="1"
                max={maxRefundable}
                required
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="w-full pl-12 pr-3 py-2 text-sm font-black text-rose-600 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
              />
            </div>
            <div className="flex gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => setRefundAmount(maxRefundable)}
                className="text-[11px] font-bold text-[#0755C9] hover:underline"
              >
                Full Refund (100%)
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => setRefundAmount(Math.round(maxRefundable * 0.5))}
                className="text-[11px] font-bold text-[#0755C9] hover:underline"
              >
                50% Cancellation Fee Applied
              </button>
            </div>
          </div>

          {/* Refund Reason */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Reason for Refund <span className="text-rose-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
            >
              <option value="Customer cancellation within free refund policy">Customer cancellation within free refund policy</option>
              <option value="Vehicle technical issue / unavailable fleet">Vehicle technical issue / unavailable fleet</option>
              <option value="Duplicate transaction charged">Duplicate transaction charged</option>
              <option value="Security deposit refund after safe return">Security deposit refund after safe return</option>
              <option value="Trip shortened / early return adjustment">Trip shortened / early return adjustment</option>
              <option value="Other administrative adjustment">Other administrative adjustment</option>
            </select>
          </div>

          {/* Gateway Reference */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Refund Reference / Bank Transaction ID
            </label>
            <input
              type="text"
              value={refundReference}
              onChange={(e) => setRefundReference(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Audit Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide reason for approval or bank account details..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || maxRefundable <= 0}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing Refund...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> Approve & Reverse Payment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
