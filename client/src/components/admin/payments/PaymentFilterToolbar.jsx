import React from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  RotateCcw,
  CreditCard,
  Receipt,
  ShieldCheck,
  RotateCw,
} from 'lucide-react';

const PaymentFilterToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  methodFilter,
  onMethodChange,
  typeFilter,
  onTypeChange,
  startDateFilter,
  onStartDateChange,
  endDateFilter,
  onEndDateChange,
  sortBy,
  onSortByChange,
  activeSubTab,
  onSubTabChange,
  onRecordCash,
  onExportCSV,
  onResetFilters,
  totalResults = 0,
}) => {
  const hasActiveFilters =
    searchQuery ||
    statusFilter !== 'all' ||
    methodFilter !== 'all' ||
    typeFilter !== 'all' ||
    startDateFilter ||
    endDateFilter;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft space-y-3.5">
      {/* Top Bar: Subtabs Switcher, Record Cash, Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Module Subtabs: Transactions | Refunds | Security Deposits */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onSubTabChange('transactions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'transactions'
                ? 'bg-white text-[#0755C9] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>All Transactions</span>
          </button>

          <button
            type="button"
            onClick={() => onSubTabChange('refunds')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'refunds'
                ? 'bg-white text-[#0755C9] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refunds</span>
          </button>

          <button
            type="button"
            onClick={() => onSubTabChange('security_deposits')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'security_deposits'
                ? 'bg-white text-[#0755C9] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security Deposits</span>
          </button>
        </div>

        {/* Action Buttons: Record Cash & Export */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0755C9] hover:bg-blue-50/50 rounded-xl text-xs font-black transition-all shadow-xs"
            title="Download CSV financial report"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Financials</span>
          </button>

          <button
            type="button"
            onClick={onRecordCash}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Cash Payment</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100 text-xs">
        {/* Search Input */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Search Payments
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by Txn ID, Receipt #, Booking ID, Ref..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Method
          </label>
          <select
            value={methodFilter}
            onChange={(e) => onMethodChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Methods</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="fonepay">Fonepay</option>
            <option value="cash">Cash</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Payment Status */}
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
            <option value="paid">Paid / Settled</option>
            <option value="pending">Pending Clearance</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="refunded">Refunded</option>
            <option value="partially_refunded">Partially Refunded</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Payment Type */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Payment Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Types</option>
            <option value="full">Full Settlement</option>
            <option value="advance">Advance Payment</option>
            <option value="remaining">Remaining Balance</option>
            <option value="security_deposit">Security Deposit</option>
          </select>
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
          </select>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            Showing <strong className="text-slate-900">{totalResults}</strong> financial entries
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

export default PaymentFilterToolbar;
