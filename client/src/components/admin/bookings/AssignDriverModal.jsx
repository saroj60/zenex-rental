import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Star,
  Phone,
  ShieldCheck,
  AlertCircle,
  UserX,
} from 'lucide-react';

const AssignDriverModal = ({
  booking,
  drivers = [],
  onClose,
  onAssign,
  onRemove,
}) => {
  const [selectedDriverId, setSelectedDriverId] = useState(
    booking?.driver?._id || booking?.driver || ''
  );
  const [submitting, setSubmitting] = useState(false);

  if (!booking) return null;

  const currentDriver = booking.driver;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDriverId) return;
    setSubmitting(true);
    try {
      await onAssign(booking._id, selectedDriverId);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async () => {
    setSubmitting(true);
    try {
      await onRemove(booking._id);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0755C9] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Assign Chauffeur to #{booking.bookingId}
              </h3>
              <p className="text-[11px] text-slate-400">
                Route: {booking.pickupLocation?.name} → {booking.dropoffLocation?.name}
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

        {/* Driver List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
          <p className="text-slate-500 font-semibold mb-2">
            Select a verified Nepal licensed driver for this trip:
          </p>

          <div className="space-y-2">
            {drivers.map((driver) => {
              const isSelected = selectedDriverId === driver._id;
              const isBusy = driver.status === 'on_trip' && currentDriver?._id !== driver._id;

              return (
                <label
                  key={driver._id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0755C9] bg-blue-50/50 ring-2 ring-blue-500/20'
                      : isBusy
                      ? 'border-slate-100 bg-slate-50/60 opacity-60'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="selectedDriver"
                      value={driver._id}
                      checked={isSelected}
                      onChange={() => setSelectedDriverId(driver._id)}
                      className="text-[#0755C9] focus:ring-[#0755C9]"
                    />
                    <img
                      src={
                        driver.avatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={driver.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">
                          {driver.name}
                        </span>
                        <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {driver.rating || 4.9}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-mono">{driver.phone}</span>
                        <span>•</span>
                        <span>{driver.district || 'Kathmandu'}</span>
                        <span>•</span>
                        <span className="font-mono">{driver.licenseNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        driver.status === 'available'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {driver.status}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-semibold">
                      {driver.tripsCompleted || 100}+ trips
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          {currentDriver ? (
            <button
              type="button"
              disabled={submitting}
              onClick={handleRemove}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
            >
              <UserX className="w-3.5 h-3.5" />
              <span>Unassign Chauffeur</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedDriverId || submitting}
              onClick={handleSubmit}
              className="px-5 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Assigning...' : 'Confirm Assignment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignDriverModal;
