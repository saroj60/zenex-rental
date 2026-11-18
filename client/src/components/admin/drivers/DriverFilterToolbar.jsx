import React from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  RotateCcw,
  UserPlus,
} from 'lucide-react';

const DriverFilterToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  verificationFilter,
  onVerificationChange,
  districtFilter,
  onDistrictChange,
  employmentFilter,
  onEmploymentChange,
  sortBy,
  onSortByChange,
  onAddDriver,
  onExportCSV,
  onResetFilters,
  totalResults = 0,
}) => {
  const hasActiveFilters =
    searchQuery ||
    statusFilter !== 'all' ||
    verificationFilter !== 'all' ||
    districtFilter !== 'all' ||
    employmentFilter !== 'all';

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft space-y-3.5">
      {/* Top Bar: Search, Register Driver, Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by driver name, phone, licence #, driver ID, district..."
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0755C9] hover:bg-blue-50/50 rounded-xl text-xs font-black transition-all shadow-xs"
            title="Download CSV roster of drivers"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Roster</span>
          </button>

          <button
            type="button"
            onClick={onAddDriver}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Driver</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 text-xs">
        {/* Availability Status */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Availability
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="assigned">Assigned</option>
            <option value="on_trip">On Trip</option>
            <option value="unavailable">Unavailable</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Licence Verification */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Licence Verification
          </label>
          <select
            value={verificationFilter}
            onChange={(e) => onVerificationChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Verifications</option>
            <option value="verified">Verified (Approved)</option>
            <option value="pending">Pending Verification</option>
            <option value="expired">Expired Document</option>
            <option value="rejected">Rejected / Invalid</option>
          </select>
        </div>

        {/* District / Region */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            District / Base
          </label>
          <select
            value={districtFilter}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Districts</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Kaski (Pokhara)">Kaski (Pokhara)</option>
            <option value="Chitwan">Chitwan</option>
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Employment Type
          </label>
          <select
            value={employmentFilter}
            onChange={(e) => onEmploymentChange(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">All Employment Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Contract">Contract</option>
            <option value="Partner Driver">Partner Driver</option>
            <option value="On-Demand">On-Demand</option>
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
            <option value="name_asc">Name: A to Z</option>
            <option value="rating_high">Rating: High to Low</option>
            <option value="trips_high">Most Trips Completed</option>
            <option value="expiry_soon">Licence Expiry: Soonest</option>
          </select>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            Showing <strong className="text-slate-900">{totalResults}</strong> chauffeurs
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

export default DriverFilterToolbar;
