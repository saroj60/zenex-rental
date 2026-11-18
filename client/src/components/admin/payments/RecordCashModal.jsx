import React, { useState, useEffect } from 'react';
import {
  X,
  Banknote,
  Calendar,
  User,
  Car,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  DollarSign,
  Receipt,
  Search
} from 'lucide-react';
import api from '../../../services/api';

export default function RecordCashModal({ isOpen, onClose, onSuccess, initialBookingId = null }) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    bookingId: '',
    amount: '',
    paymentType: 'remaining',
    receivedBy: 'Admin (Kathmandu Counter)',
    paymentReference: '',
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchEligibleBookings();
      // Auto-generate reference code
      const rand = Math.floor(1000 + Math.random() * 9000);
      setFormData(prev => ({
        ...prev,
        paymentReference: `CSH-KTM-${rand}`,
        receivedBy: 'Saroj Bhagat (Counter Cashier)'
      }));
    } else {
      setSelectedBooking(null);
      setError(null);
    }
  }, [isOpen]);

  const fetchEligibleBookings = async () => {
    setLoadingBookings(true);
    try {
      // Fetch bookings from api
      const res = await api.get('/bookings');
      const allBookings = res.data?.data || res.data || [];
      setBookings(allBookings);

      if (initialBookingId) {
        const found = allBookings.find(b => b.bookingId === initialBookingId || b._id === initialBookingId);
        if (found) {
          handleSelectBooking(found);
        }
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    const total = booking.totalAmount || booking.pricing?.totalPrice || 0;
    const paid = booking.paidAmount || (booking.paymentStatus === 'paid' ? total : (booking.advanceAmount || 0));
    const remaining = Math.max(0, total - paid);

    setFormData(prev => ({
      ...prev,
      bookingId: booking._id,
      amount: remaining > 0 ? remaining : total,
      paymentType: remaining > 0 ? 'remaining' : 'full',
      notes: `Cash collected at Kathmandu depot counter for booking #${booking.bookingId || booking._id?.slice(-6)}`
    }));
  };

  const filteredBookings = bookings.filter(b => {
    const q = searchQuery.toLowerCase();
    const id = (b.bookingId || '').toLowerCase();
    const cName = (b.customer?.name || b.customerName || '').toLowerCase();
    const cPhone = (b.customer?.phone || b.customerPhone || '').toLowerCase();
    const vName = (b.vehicle?.name || b.vehicleName || '').toLowerCase();
    return id.includes(q) || cName.includes(q) || cPhone.includes(q) || vName.includes(q);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bookingId) {
      setError('Please select an active booking to record payment for.');
      return;
    }
    const amountNum = Number(formData.amount);
    if (!amountNum || amountNum <= 0) {
      setError('Please enter a valid positive payment amount.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        bookingId: formData.bookingId,
        amount: amountNum,
        paymentType: formData.paymentType,
        receivedBy: formData.receivedBy,
        paymentReference: formData.paymentReference,
        notes: formData.notes
      };

      const res = await api.post('/payments/cash', payload);
      const createdPayment = res.data?.data;
      if (onSuccess) {
        onSuccess(createdPayment);
      }
      onClose();
    } catch (err) {
      console.error('Cash recording failed:', err);
      setError(err.response?.data?.message || 'Failed to record cash payment. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Record Cash Counter Payment</h3>
              <p className="text-xs text-slate-500 font-semibold">
                Accept cash settlement at depot & instantly update customer booking balance
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
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Booking Picker */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              1. Select Booking / Customer <span className="text-rose-500">*</span>
            </label>

            {!selectedBooking ? (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Booking ID, customer name, vehicle or phone..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
                  />
                </div>

                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 bg-slate-50/50">
                  {loadingBookings ? (
                    <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#0755C9]" /> Loading active bookings...
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No matching reservations found.
                    </div>
                  ) : (
                    filteredBookings.map((b) => (
                      <div
                        key={b._id}
                        onClick={() => handleSelectBooking(b)}
                        className="p-3 hover:bg-white cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-[#0755C9]">
                              {b.bookingId || `#${b._id?.slice(-6)}`}
                            </span>
                            <span className="text-xs font-bold text-slate-800">
                              {b.customer?.name || b.customerName || 'Customer'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ({b.customer?.phone || b.customerPhone || 'N/A'})
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Vehicle: <span className="font-semibold">{b.vehicle?.name || b.vehicleName || 'Assigned Car'}</span>
                            {' • '}Status: <span className="capitalize font-semibold text-emerald-600">{b.status}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900 block">
                            NPR {(b.totalAmount || b.pricing?.totalPrice || 0).toLocaleString()}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                            Select
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-emerald-800">
                        {selectedBooking.bookingId || `#${selectedBooking._id?.slice(-6)}`}
                      </span>
                      <span className="text-xs font-black text-slate-900">
                        {selectedBooking.customer?.name || selectedBooking.customerName || 'Customer'}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({selectedBooking.customer?.phone || selectedBooking.customerPhone || 'N/A'})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Car: <b>{selectedBooking.vehicle?.name || selectedBooking.vehicleName}</b> • Total Bill: <b>NPR {(selectedBooking.totalAmount || selectedBooking.pricing?.totalPrice || 0).toLocaleString()}</b>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-white"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Amount & Payment Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Amount Received (NPR) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  NPR
                </span>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 5000"
                  className="w-full pl-12 pr-3 py-2 text-sm font-black text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Payment Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
              >
                <option value="remaining">Remaining Balance</option>
                <option value="advance">Advance Payment</option>
                <option value="full">Full Payment Settlement</option>
                <option value="security_deposit">Security Deposit (Refundable)</option>
              </select>
            </div>
          </div>

          {/* Counter Voucher & Collector info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Receipt / Voucher Number
              </label>
              <input
                type="text"
                value={formData.paymentReference}
                onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                placeholder="e.g. CSH-KTM-2026-09"
                className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
                Received By (Admin / Cashier)
              </label>
              <input
                type="text"
                value={formData.receivedBy}
                onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
                placeholder="Cashier full name"
                className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Payment Remarks & Counter Notes
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Collected NPR 5,000 in cash during key handover at Tribhuvan Airport depot."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
              disabled={submitting || !selectedBooking}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Recording Cash...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> Confirm & Issue Receipt
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
