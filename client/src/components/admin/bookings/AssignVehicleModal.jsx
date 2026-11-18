import React, { useState } from 'react';
import {
  X,
  Car,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const AssignVehicleModal = ({
  booking,
  vehicles = [],
  onClose,
  onAssign,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    booking?.vehicle?._id || booking?.vehicle || ''
  );
  const [submitting, setSubmitting] = useState(false);

  if (!booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicleId) return;
    setSubmitting(true);
    try {
      await onAssign(booking._id, selectedVehicleId);
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
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Change Vehicle for #{booking.bookingId}
              </h3>
              <p className="text-[11px] text-slate-400">
                Rental Type: {booking.rentalType === 'self_drive' ? 'Self Drive' : 'With Chauffeur'}
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

        {/* Vehicle Selection List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
          <p className="text-slate-500 font-semibold mb-2">
            Select a vehicle from the fleet to assign to this reservation:
          </p>

          <div className="space-y-2.5">
            {vehicles.map((v) => {
              const isSelected = selectedVehicleId === v._id;
              const rate =
                booking.rentalType === 'self_drive'
                  ? v.pricing?.dailySelfDrive || 6000
                  : v.pricing?.dailyWithDriver || 8000;

              return (
                <label
                  key={v._id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0755C9] bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="selectedVehicle"
                      value={v._id}
                      checked={isSelected}
                      onChange={() => setSelectedVehicleId(v._id)}
                      className="text-[#0755C9] focus:ring-[#0755C9]"
                    />
                    <div className="w-14 h-10 bg-slate-50 rounded-lg p-0.5 border border-slate-200 flex items-center justify-center shrink-0">
                      <img
                        src={v.images?.[0] || '/cars/creta.png'}
                        alt={v.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/cars/creta.png';
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">
                          {v.name}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          {v.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-mono font-bold text-slate-700">
                          {v.registrationNumber}
                        </span>
                        <span>•</span>
                        <span>{v.seats || 5} Seats</span>
                        <span>•</span>
                        <span>{v.transmission || 'Auto'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-black text-slate-900">
                      NPR {rate.toLocaleString()}/day
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 block mt-0.5">
                      {v.status || 'Available'}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedVehicleId || submitting}
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Updating...' : 'Assign Vehicle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignVehicleModal;
