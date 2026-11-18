import React from 'react';
import {
  Eye,
  Check,
  X,
  UserCheck,
  Car,
  PlayCircle,
  CheckCircle,
  Copy,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  CreditCard,
  Phone,
  Calendar,
  MapPin,
} from 'lucide-react';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    dot: 'bg-amber-500',
  },
  confirmed: {
    label: 'Confirmed',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  ongoing: {
    label: 'Ongoing',
    badge: 'bg-blue-50 text-[#0755C9] border-blue-200 ring-blue-500/20',
    dot: 'bg-[#0755C9]',
  },
  completed: {
    label: 'Completed',
    badge: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20',
    dot: 'bg-slate-500',
  },
  cancelled: {
    label: 'Cancelled',
    badge: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
    dot: 'bg-rose-500',
  },
  rejected: {
    label: 'Rejected',
    badge: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20',
    dot: 'bg-purple-500',
  },
};

const PAYMENT_STATUS_CONFIG = {
  paid: {
    label: 'PAID',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  partially_paid: {
    label: 'PARTIAL',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  unpaid: {
    label: 'UNPAID',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  pending: {
    label: 'PENDING',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  refund_pending: {
    label: 'REFUND PENDING',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  refunded: {
    label: 'REFUNDED',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  failed: {
    label: 'FAILED',
    badge: 'bg-red-50 text-red-700 border-red-200',
  },
};

const BookingTableView = ({
  bookings = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onViewDetails,
  onConfirmBooking,
  onRejectBooking,
  onAssignDriver,
  onAssignVehicle,
  onCancelBooking,
  onMarkOngoing,
  onMarkCompleted,
  onRecordPayment,
}) => {
  const [copiedId, setCopiedId] = React.useState(null);

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-soft text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#0755C9] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500">Loading Nepal Car Rental reservations...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 border border-slate-100 shadow-soft text-center space-y-3">
        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
          <Car className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-extrabold text-slate-900">No Reservations Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No bookings match your current filter or search criteria. Try clearing search keywords or selecting different status tabs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
      {/* Mobile Card List View (< md) */}
      <div className="md:hidden divide-y divide-slate-100">
        {bookings.map((b) => {
          const statusCfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
          const payCfg = PAYMENT_STATUS_CONFIG[b.paymentStatus] || PAYMENT_STATUS_CONFIG.pending;
          const grandTotal = b.totalAmount || b.pricingBreakdown?.grandTotal || 0;
          const vehicleImg = b.vehicle?.images?.[0] || '/cars/creta.png';

          return (
            <div key={b._id} className="p-4 space-y-3 text-xs hover:bg-slate-50 transition-colors">
              {/* Header: ID, Type & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0755C9] font-mono">
                    {b.bookingId}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-100 text-slate-700">
                    {b.rentalType === 'self_drive' ? 'Self Drive' : 'Chauffeur'}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusCfg.badge}`}>
                  {statusCfg.label}
                </span>
              </div>

              {/* Vehicle & Customer Info */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-11 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={vehicleImg}
                    alt={b.vehicle?.name || 'Vehicle'}
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = '/cars/creta.png'; }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-slate-900 truncate">{b.vehicle?.name || 'Mahindra Scorpio'}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{b.vehicle?.registrationNumber || 'BA 21 CHA 9081'}</p>
                  <p className="text-[11px] text-slate-700 font-bold truncate">
                    {b.customerDetails?.fullName || b.customer?.name || 'Customer'} • <span className="font-mono text-slate-400">{b.customerDetails?.phone || b.customer?.phone}</span>
                  </p>
                </div>
              </div>

              {/* Trip Details & Amount */}
              <div className="bg-slate-50 p-2.5 rounded-xl space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Pickup: {b.pickupLocation?.name || 'Kathmandu'}</span>
                  <span className="font-bold text-slate-800">{formatDate(b.startDate)} → {formatDate(b.endDate)}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Payment:</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase border ${payCfg.badge}`}>
                      {payCfg.label}
                    </span>
                  </div>
                  <span className="font-mono font-black text-slate-900 text-xs">
                    NPR {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onViewDetails(b)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-blue-50 text-[#0755C9] font-bold text-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                {b.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => onConfirmBooking(b)}
                      className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRejectBooking(b)}
                      className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-rose-50 text-rose-700 font-bold text-xs flex items-center gap-1 border border-rose-200"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </>
                )}

                {b.rentalType === 'with_driver' && b.status !== 'completed' && b.status !== 'cancelled' && b.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => onAssignDriver(b)}
                    className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center gap-1 border border-indigo-200"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{b.driver ? 'Change Driver' : 'Assign Driver'}</span>
                  </button>
                )}

                {b.status === 'confirmed' && (
                  <button
                    type="button"
                    onClick={() => onMarkOngoing(b)}
                    className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-blue-50 text-[#0755C9] font-bold text-xs flex items-center gap-1 border border-blue-200"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Start Trip</span>
                  </button>
                )}

                {b.status === 'ongoing' && (
                  <button
                    type="button"
                    onClick={() => onMarkCompleted(b)}
                    className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop 14-Column Table View (hidden on mobile, block on md:) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1250px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              <th className="py-3 px-3.5">1. Booking ID</th>
              <th className="py-3 px-3">2. Customer</th>
              <th className="py-3 px-3">3. Phone</th>
              <th className="py-3 px-3">4. Vehicle</th>
              <th className="py-3 px-3">5. Model</th>
              <th className="py-3 px-3">6. Plate No.</th>
              <th className="py-3 px-3">7. Type</th>
              <th className="py-3 px-3">8. Pickup Location</th>
              <th className="py-3 px-3">9. Pickup Date</th>
              <th className="py-3 px-3">10. Return Date</th>
              <th className="py-3 px-3 text-right">11. Amount (NPR)</th>
              <th className="py-3 px-3 text-center">12. Payment</th>
              <th className="py-3 px-3 text-center">13. Status</th>
              <th className="py-3 px-3.5 text-center">14. Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {bookings.map((b) => {
              const statusCfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
              const payCfg =
                PAYMENT_STATUS_CONFIG[b.paymentStatus] || PAYMENT_STATUS_CONFIG.pending;
              const grandTotal =
                b.totalAmount || b.pricingBreakdown?.grandTotal || 0;
              const vehicleImg =
                b.vehicle?.images?.[0] || '/cars/creta.png';

              return (
                <tr
                  key={b._id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* 1. Booking ID */}
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[#0755C9] font-mono tracking-tight">
                        {b.bookingId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(b.bookingId)}
                        title="Copy Booking ID"
                        className="text-slate-300 hover:text-slate-600 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    {copiedId === b.bookingId && (
                      <span className="text-[9px] text-emerald-600 font-bold block">
                        Copied!
                      </span>
                    )}
                  </td>

                  {/* 2. Customer Name */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-slate-900 truncate max-w-[140px]">
                      {b.customerDetails?.fullName || b.customer?.name || 'Customer'}
                    </div>
                    <span className="text-[10px] text-slate-400 truncate block max-w-[140px]">
                      {b.customerDetails?.email || b.customer?.email || ''}
                    </span>
                  </td>

                  {/* 3. Phone */}
                  <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-600">
                    {b.customerDetails?.phone || b.customer?.phone || 'N/A'}
                  </td>

                  {/* 4. Vehicle Thumbnail */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="w-12 h-8 bg-slate-50 border border-slate-100 rounded-lg p-0.5 overflow-hidden flex items-center justify-center">
                      <img
                        src={vehicleImg}
                        alt={b.vehicle?.name || 'Car'}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/cars/creta.png';
                        }}
                      />
                    </div>
                  </td>

                  {/* 5. Vehicle Name */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-extrabold text-slate-800">
                      {b.vehicle?.name || 'Unassigned'}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      {b.vehicle?.category || 'Fleet'}
                    </span>
                  </td>

                  {/* 6. Registration Number */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-[11px] font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                      {b.vehicle?.registrationNumber || 'Pending'}
                    </span>
                  </td>

                  {/* 7. Rental Type */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        b.rentalType === 'self_drive'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-[#0755C9] border border-blue-200'
                      }`}
                    >
                      {b.rentalType === 'self_drive' ? 'Self Drive' : 'With Chauffeur'}
                    </span>
                  </td>

                  {/* 8. Pickup Location */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold truncate max-w-[130px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{b.pickupLocation?.name || 'Kathmandu'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[130px]">
                      → {b.dropoffLocation?.name || 'Pokhara'}
                    </span>
                  </td>

                  {/* 9. Pickup Date */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                    <div>{formatDate(b.startDate)}</div>
                    <span className="text-[10px] text-slate-400">{b.pickupTime || '09:00 AM'}</span>
                  </td>

                  {/* 10. Return Date */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                    <div>{formatDate(b.endDate)}</div>
                    <span className="text-[10px] text-slate-400">{b.returnTime || '06:00 PM'}</span>
                  </td>

                  {/* 11. Amount (NPR) */}
                  <td className="py-3 px-3 whitespace-nowrap text-right">
                    <div className="font-black text-slate-900 font-mono">
                      NPR {grandTotal.toLocaleString()}
                    </div>
                    {b.paidAmount > 0 && b.paidAmount < grandTotal && (
                      <span className="text-[10px] text-amber-600 font-bold block">
                        Paid: NPR {b.paidAmount.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* 12. Payment Status */}
                  <td className="py-3 px-3 whitespace-nowrap text-center">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase rounded-full border ${payCfg.badge}`}
                    >
                      {payCfg.label}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block mt-0.5">
                      {b.paymentMethod || 'cash'}
                    </span>
                  </td>

                  {/* 13. Booking Status */}
                  <td className="py-3 px-3 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black rounded-full border ${statusCfg.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      <span>{statusCfg.label}</span>
                    </span>
                  </td>

                  {/* 14. Contextual Actions */}
                  <td className="py-3 px-3.5 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* View Details (Always available) */}
                      <button
                        type="button"
                        onClick={() => onViewDetails(b)}
                        title="View Full Booking Details"
                        className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0755C9] rounded-lg transition-colors border border-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Confirm (If pending) */}
                      {b.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => onConfirmBooking(b)}
                          title="Confirm Reservation"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Reject (If pending) */}
                      {b.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => onRejectBooking(b)}
                          title="Reject Reservation"
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors border border-rose-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Assign Driver (If with_driver & active) */}
                      {b.rentalType === 'with_driver' &&
                        b.status !== 'completed' &&
                        b.status !== 'cancelled' &&
                        b.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => onAssignDriver(b)}
                            title={b.driver ? `Assigned: ${b.driver.name} (Click to change)` : 'Assign Chauffeur'}
                            className={`p-1.5 rounded-lg transition-colors border ${
                              b.driver
                                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                                : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
                            }`}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}

                      {/* Mark Ongoing (If confirmed) */}
                      {b.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => onMarkOngoing(b)}
                          title="Trip Started / Handover Vehicle"
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-[#0755C9] rounded-lg transition-colors border border-blue-200"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Mark Completed (If ongoing) */}
                      {b.status === 'ongoing' && (
                        <button
                          type="button"
                          onClick={() => onMarkCompleted(b)}
                          title="Complete Trip & Settle"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Record Payment (If not fully paid) */}
                      {b.paymentStatus !== 'paid' &&
                        b.status !== 'cancelled' &&
                        b.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => onRecordPayment(b)}
                            title="Record Cash/eSewa Payment"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                          </button>
                        )}

                      {/* Cancel Booking (If pending or confirmed) */}
                      {(b.status === 'pending' || b.status === 'confirmed') && (
                        <button
                          type="button"
                          onClick={() => onCancelBooking(b)}
                          title="Cancel Reservation"
                          className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors border border-slate-200"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
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
          {totalItems} total bookings)
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

export default BookingTableView;
