import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  FileText,
  DollarSign,
  Loader2,
  CheckCircle,
  HelpCircle,
  Car
} from 'lucide-react';
import api from '../../../services/api';

export default function SettleDepositModal({ isOpen, onClose, deposit, onSuccess }) {
  if (!isOpen || !deposit) return null;

  const depositReceived = deposit.securityDeposit?.amountReceived || deposit.amount || 0;
  const [damageCharges, setDamageCharges] = useState(deposit.securityDeposit?.deductions?.damageCharges || 0);
  const [trafficFines, setTrafficFines] = useState(deposit.securityDeposit?.deductions?.trafficFines || 0);
  const [reason, setReason] = useState(deposit.securityDeposit?.deductions?.reason || '');
  const [settlementMethod, setSettlementMethod] = useState('bank_transfer');
  const [settlementRef, setSettlementRef] = useState(`DEP-RET-${Date.now().toString().slice(-6)}`);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Live calculation: Deposit Refund = Deposit Received - (Damage Charges + Traffic Fines)
  const totalDeductions = (Number(damageCharges) || 0) + (Number(trafficFines) || 0);
  const netRefund = Math.max(0, depositReceived - totalDeductions);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalDeductions > depositReceived) {
      setError(`Total deductions (NPR ${totalDeductions.toLocaleString()}) cannot exceed the deposit received (NPR ${depositReceived.toLocaleString()}).`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        damageCharges: Number(damageCharges) || 0,
        trafficFines: Number(trafficFines) || 0,
        deductionReason: reason || (totalDeductions > 0 ? 'Vehicle inspection deductions' : 'Full return, zero damages'),
        settlementMethod,
        settlementRef,
        notes
      };

      const res = await api.post(`/payments/security-deposits/${deposit._id}/settle`, payload);
      if (onSuccess) {
        onSuccess(res.data?.data);
      }
      onClose();
    } catch (err) {
      console.error('Deposit settlement error:', err);
      setError(err.response?.data?.message || 'Failed to settle security deposit.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50/30 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0755C9] text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Settle Security Deposit</h3>
              <p className="text-xs text-slate-500 font-semibold">
                Inspect damages, traffic citations & return net guarantee funds
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
          
          {/* Reservation Details */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Booking Reference</span>
              <span className="font-mono font-bold text-slate-800">
                {deposit.booking?.bookingId || `#${deposit.booking?._id?.slice(-6) || 'N/A'}`}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Customer</span>
              <span className="font-bold text-slate-800">
                {deposit.customer?.name || deposit.booking?.customerName || 'Customer'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle Fleet</span>
              <span className="font-bold text-slate-800">
                {deposit.vehicle?.name || deposit.booking?.vehicleName || 'Vehicle'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Deposit In Hand</span>
              <span className="font-black text-emerald-700 text-sm">
                NPR {depositReceived.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Deductions inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Vehicle Damage Charges (NPR)
              </label>
              <input
                type="number"
                min="0"
                value={damageCharges}
                onChange={(e) => setDamageCharges(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Dent, scratch, interior stain</span>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Traffic Fines & Tolls (NPR)
              </label>
              <input
                type="number"
                min="0"
                value={trafficFines}
                onChange={(e) => setTrafficFines(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Metropolitan traffic violation ticket</span>
            </div>
          </div>

          {/* Reason for deduction */}
          {totalDeductions > 0 && (
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Explanation for Deductions <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Rear bumper scrape during Pokhara highway stretch"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
              />
            </div>
          )}

          {/* Net Refund Calculation Card */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 block">
                Calculated Net Refund to Customer
              </span>
              <span className="text-[10px] text-slate-500">
                Formula: Deposit Received ({depositReceived.toLocaleString()}) - Deductions ({totalDeductions.toLocaleString()})
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-emerald-700">
                NPR {netRefund.toLocaleString()}
              </span>
              <span className="block text-[10px] font-bold uppercase text-emerald-600">
                {netRefund === 0 ? 'Full Retention' : 'Refund Payable'}
              </span>
            </div>
          </div>

          {/* Refund Transfer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Refund Method
              </label>
              <select
                value={settlementMethod}
                onChange={(e) => setSettlementMethod(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
              >
                <option value="bank_transfer">Bank Transfer (Nepal)</option>
                <option value="esewa">eSewa Wallet</option>
                <option value="khalti">Khalti Wallet</option>
                <option value="cash">Counter Cash Handover</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Settlement Reference Code
              </label>
              <input
                type="text"
                value={settlementRef}
                onChange={(e) => setSettlementRef(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Settlement Notes & Inspector Sign-off
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Vehicle inspected upon return by Depot Manager. All checks cleared."
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
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Settling Deposit...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> Confirm & Complete Settlement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
