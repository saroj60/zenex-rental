import React from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Table as TableIcon,
  RotateCcw,
  SlidersHorizontal,
  Car,
  CreditCard,
  User,
} from 'lucide-react';

const BookingFilterToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  paymentFilter,
  onPaymentChange,
  vehicleFilter,
  onVehicleChange,
  rentalTypeFilter,
  onRentalTypeChange,
  startDateFilter,
  onStartDateChange,
  endDateFilter,
  onEndDateChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onExportCSV,
  onResetFilters,
  vehicles = [],
  totalResults = 0,
}) => {
  const hasActiveFilters =
    searchQuery ||
    statusFilter !== 'all' ||
    paymentFilter !== 'all' ||
    vehicleFilter !== 'all' ||
    rentalTypeFilter !== 'all' ||
    startDateFilter ||
    endDateFilter;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft space-y-3.5">
      {/* Top Bar: Search, View Mode Toggle, Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Booking ID, customer name, phone number..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0755C9] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Right actions: View mode switch & Export */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Table / Calendar Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-[#0755C9] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-[#0755C9] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          {/* Export Bookings Button */}
          <button
            type="button"
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0755C9] hover:border-blue-200 hover:bg-blue-50/50 rounded-xl text-xs font-black transition-all shadow-sm"
            title="Download CSV report of bookings"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Bookings</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Detailed Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100 text-xs">
        {/* Status Dropdown */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Payment Status Dropdown */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Payment Status
          </label>
          <select
            value={paymentFilter}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="pending">Pending</option>
            <option value="refund_pending">Refund Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Vehicle Filter */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Vehicle
          </label>
          <select
            value={vehicleFilter}
            onChange={(e) => onVehicleChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9] truncate"
          >
            <option value="all">All Vehicles</option>
            {vehicles.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name} ({v.registrationNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Rental Type */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Rental Type
          </label>
          <select
            value={rentalTypeFilter}
            onChange={(e) => onRentalTypeChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Types</option>
            <option value="with_driver">With Driver</option>
            <option value="self_drive">Self Drive</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={startDateFilter || ''}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount_high">Amount: High to Low</option>
            <option value="amount_low">Amount: Low to High</option>
            <option value="pickup_soon">Pickup Date: Soonest</option>
          </select>
        </div>
      </div>

      {/* Active Filter Summary & Clear */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            Showing <strong className="text-slate-900">{totalResults}</strong> reservations
          </span>
          {hasActiveFilters && (
            <span className="text-[11px] bg-blue-50 text-[#0755C9] font-bold px-2 py-0.5 rounded-full">
              Filtered
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingFilterToolbar;
