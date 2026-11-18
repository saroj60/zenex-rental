import React, { useState } from 'react';
import {
  Calendar,
  CreditCard,
  Eye,
  CheckCircle,
  Clock,
  Check,
  X,
  AlertCircle,
  ChevronRight,
  Filter,
  User,
  ExternalLink,
} from 'lucide-react';

const STATUS_BADGES = {
  confirmed: {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Confirmed',
  },
  ongoing: {
    bg: 'bg-blue-50 text-[#0755C9] border-blue-200',
    dot: 'bg-[#0755C9]',
    label: 'Ongoing',
  },
  completed: {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-500',
    label: 'Completed',
  },
  pending: {
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    label: 'Pending',
  },
  cancelled: {
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    label: 'Cancelled',
  },
};

const RecentBookingsTable = ({
  bookings = [],
  onViewBooking,
  onUpdateStatus,
  onViewAll,
  isFullWidth = false,
}) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Nov 5';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getVehicleImage = (vehicle) => {
    if (vehicle?.images && vehicle.images[0]) return vehicle.images[0];
    const name = vehicle?.name?.toLowerCase() || '';
    if (name.includes('creta')) return '/cars/creta.png';
    if (name.includes('fortuner')) return '/cars/fortuner.jpg';
    if (name.includes('swift')) return '/cars/swift.jpg';
    if (name.includes('hiace')) return '/cars/hiace.jpg';
    if (name.includes('scorpio')) return '/cars/scorpio.jpg';
    return '/cars/creta.png';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden flex flex-col">
      {/* Table Header & Filters */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0755C9]"></span>
            <h3 className="font-black text-slate-900 text-sm sm:text-base">
              Recent Bookings
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
            Real-time reservations and customer rental orders
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {['all', 'confirmed', 'ongoing', 'pending', 'completed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors flex-shrink-0 ${
                filterStatus === status
                  ? 'bg-[#0755C9] text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {status}
            </button>
          ))}
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="text-xs font-extrabold text-[#0755C9] hover:underline px-2 py-1 flex items-center gap-0.5 flex-shrink-0"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Booking Cards List (< md) */}
      <div className="md:hidden divide-y divide-slate-100">
        {filteredBookings.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <AlertCircle className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
            <p className="font-bold text-slate-700">No bookings match this filter.</p>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const statusMeta = STATUS_BADGES[b.status?.toLowerCase()] || STATUS_BADGES.confirmed;
            const grandTotal = b.pricingBreakdown?.grandTotal || b.pricing?.grandTotal || b.totalAmount || 17000;
            const payMethod = b.paymentMethod || 'eSewa';
            const startDate = formatDate(b.rentalPeriod?.startDate);
            const endDate = formatDate(b.rentalPeriod?.endDate);

            return (
              <div
                key={b._id || b.bookingId}
                onClick={() => onViewBooking && onViewBooking(b)}
                className="p-4 space-y-3 text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black font-mono text-[#0755C9] text-xs">
                    {b.bookingId || '#NCR-10458'}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusMeta.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`} />
                    <span>{statusMeta.label}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={getVehicleImage(b.vehicle)}
                      alt="Car"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = '/cars/creta.png'; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-slate-900 truncate">{b.vehicle?.name || 'Hyundai Creta'}</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {b.customer?.name || 'Saroj'} • <span className="font-mono text-[10px] text-slate-400">{b.customer?.phone || '+977 9841892011'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>{startDate} → {endDate}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-slate-900 text-xs">NPR {grandTotal.toLocaleString()}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {payMethod}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => onViewBooking && onViewBooking(b)}
                    className="px-3 py-1.5 min-h-[36px] rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  {b.status === 'pending' && onUpdateStatus && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(b._id, 'confirmed')}
                      className="px-3 py-1.5 min-h-[36px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table Container (md:) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-slate-200/80 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500">
              <th className="py-3 px-3 sm:px-4">Booking ID</th>
              <th className="py-3 px-3 sm:px-4">Customer</th>
              <th className="py-3 px-3 sm:px-4">Vehicle</th>
              <th className="py-3 px-3 sm:px-4">Dates</th>
              <th className="py-3 px-3 sm:px-4">Amount & Pay</th>
              <th className="py-3 px-3 sm:px-4">Status</th>
              <th className="py-3 px-3 sm:px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">No bookings match this filter.</p>
                  <p className="text-[11px] mt-0.5">Try selecting another status tab.</p>
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => {
                const statusMeta = STATUS_BADGES[b.status?.toLowerCase()] || STATUS_BADGES.confirmed;
                const payStatus = (b.paymentStatus || b.payment?.status || 'paid').toLowerCase();
                const grandTotal = b.pricingBreakdown?.grandTotal || b.pricing?.grandTotal || b.totalAmount || 17000;
                const payMethod = b.paymentMethod || 'eSewa';

                const startDate = formatDate(b.rentalPeriod?.startDate);
                const endDate = formatDate(b.rentalPeriod?.endDate);

                return (
                  <tr
                    key={b._id || b.bookingId}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => onViewBooking && onViewBooking(b)}
                  >
                    {/* 1. Booking ID */}
                    <td className="py-3 px-3 sm:px-4 font-black text-[#0755C9] whitespace-nowrap">
                      {b.bookingId || '#NCR-10458'}
                    </td>

                    {/* 2. Customer Name */}
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0755C9] flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                          {b.customer?.name ? b.customer.name.charAt(0) : 'S'}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-slate-900 truncate max-w-[100px]">
                            {b.customer?.name || 'Saroj'}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[100px]">
                            {b.customer?.phone || '+977 9841892011'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Vehicle */}
                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-7 rounded-lg bg-slate-50 border border-slate-100 p-0.5 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={getVehicleImage(b.vehicle)}
                            alt="Car"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = '/cars/creta.png';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs leading-tight">
                            {b.vehicle?.name || 'Hyundai Creta'}
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {b.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 4. Combined Rental Dates */}
                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-800 text-[11px]">
                        {startDate} – {endDate}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        2 Days Rental
                      </span>
                    </td>

                    {/* 5. Amount & Payment Combined */}
                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="font-black text-slate-900 text-xs">
                        NPR {Number(grandTotal).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {payStatus}
                        </span>
                        <span className="text-[9px] font-bold text-slate-500">
                          {payMethod}
                        </span>
                      </div>
                    </td>

                    {/* 6. Booking Status Badge */}
                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold border ${statusMeta.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`} />
                        <span>{statusMeta.label}</span>
                      </span>
                    </td>

                    {/* 7. Action */}
                    <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onViewBooking && onViewBooking(b)}
                          className="p-1.5 text-slate-600 hover:text-[#0755C9] hover:bg-blue-50 rounded-lg transition-colors"
                          title="View booking details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {b.status === 'pending' && onUpdateStatus && (
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(b._id, 'confirmed')}
                            className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve booking"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookingsTable;
