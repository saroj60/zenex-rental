import React, { useState, useEffect } from 'react';
import {
  X,
  Car,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  CalendarPlus,
} from 'lucide-react';
import api from '../../../services/api';

const AssignTripModal = ({ driver, onClose, onAssigned }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchEligibleBookings();
  }, []);

  const fetchEligibleBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings?rentalType=with_driver&status=confirmed');
      if (res.data?.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      console.warn('Could not load eligible bookings:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedBookingId) return;

    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await api.post(`/admin/drivers/${driver._id}/assign-trip`, {
        bookingId: selectedBookingId,
      });
      if (res.data?.success) {
        onAssigned(res.data.message || `Assigned driver ${driver.name} to booking successfully!`);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Could not assign driver to trip');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Dispatch Trip to Chauffeur {driver.name}
              </h3>
              <p className="text-[11px] text-slate-400">
                Driver ID: {driver.driverId} • Licence: {driver.licenseNumber}
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
        <form onSubmit={handleAssign} className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <p className="text-slate-500 font-semibold mb-1">
            Select a confirmed reservation requiring a licensed driver:
          </p>

          {loading ? (
            <div className="py-8 text-center text-slate-400">
              <div className="w-6 h-6 border-2 border-[#0755C9] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span>Loading confirmed bookings...</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-500">
              <Car className="w-7 h-7 mx-auto mb-1 text-slate-300" />
              <p className="font-bold">No Pending Chauffeur Bookings</p>
              <p className="text-[11px] text-slate-400">
                All current confirmed reservations already have drivers assigned.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookings.map((b) => {
                const isSelected = selectedBookingId === b._id;
                const isCurrentDriver = b.driver === driver._id;

                return (
                  <label
                    key={b._id}
                    className={`flex items-start justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0755C9] bg-blue-50/50 ring-2 ring-blue-500/20'
                        : isCurrentDriver
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="selectedBooking"
                        value={b._id}
                        checked={isSelected}
                        onChange={() => setSelectedBookingId(b._id)}
                        className="mt-1 text-[#0755C9] focus:ring-[#0755C9]"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-[#0755C9]">
                            {b.bookingId}
                          </span>
                          <span className="font-bold text-slate-900">
                            {b.pickupLocation?.name} → {b.dropoffLocation?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {formatDate(b.startDate)} - {formatDate(b.endDate)}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400">
                          Customer: <strong>{b.customerDetails?.fullName}</strong> • Car:{' '}
                          {b.vehicle?.name || 'Fleet'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 block text-xs">
                        NPR {(b.totalAmount || 0).toLocaleString()}
                      </span>
                      {isCurrentDriver ? (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                          Already Assigned
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                          Needs Driver
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedBookingId || submitting}
              className="px-5 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Dispatching...' : 'Confirm Trip Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTripModal;
