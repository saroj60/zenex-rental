import React, { useState } from 'react';
import {
  Eye,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Car,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Power,
  CalendarPlus,
  Route,
  EyeOff,
} from 'lucide-react';

const STATUS_CONFIG = {
  available: {
    label: 'Available',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  assigned: {
    label: 'Assigned',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dot: 'bg-indigo-500',
  },
  on_trip: {
    label: 'On Trip',
    badge: 'bg-blue-50 text-[#0755C9] border-blue-200',
    dot: 'bg-[#0755C9]',
  },
  unavailable: {
    label: 'Unavailable',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  inactive: {
    label: 'Inactive',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
};

const DriverTableView = ({
  drivers = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onViewProfile,
  onEditDriver,
  onAssignTrip,
  onViewTripHistory,
  onToggleStatus,
  onDeleteDriver,
}) => {
  const [unmaskedLicences, setUnmaskedLicences] = useState({});

  const toggleMask = (id) => {
    setUnmaskedLicences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskLicense = (license) => {
    if (!license) return 'N/A';
    if (license.length <= 6) return license;
    const first = license.slice(0, 5);
    const last = license.slice(-2);
    return `${first}••••••${last}`;
  };

  const formatExpiry = (dateStr) => {
    if (!dateStr) return { text: 'N/A', status: 'unknown' };
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    if (diffDays < 0) {
      return { text: formatted, status: 'expired', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
    if (diffDays <= 30) {
      return { text: formatted, status: 'expiring_soon', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
    return { text: formatted, status: 'valid', badge: 'text-slate-700' };
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-soft text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#0755C9] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500">Loading chauffeur roster...</p>
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 border border-slate-100 shadow-soft text-center space-y-3">
        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
          <Car className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-extrabold text-slate-900">No Drivers Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No chauffeur records match your current filter or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
      {/* Mobile Driver Cards List (< md) */}
      <div className="md:hidden divide-y divide-slate-100">
        {drivers.map((d) => {
          const statusCfg = STATUS_CONFIG[d.status] || STATUS_CONFIG.available;
          const expiryInfo = formatExpiry(d.licenseExpiry);
          const isUnmasked = !!unmaskedLicences[d._id];

          return (
            <div key={d._id} className="p-4 space-y-3 text-xs hover:bg-slate-50 transition-colors">
              {/* Header: Driver Info & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 shrink-0">
                    <img
                      src={
                        d.avatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={d.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${statusCfg.dot}`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-black text-slate-900 text-xs">
                      <span>{d.name}</span>
                      {d.licenseVerificationStatus === 'verified' && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-[#0755C9] font-extrabold">{d.driverId || 'DRV-100'}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusCfg.badge}`}>
                  {statusCfg.label}
                </span>
              </div>

              {/* Driver Stats & Licence Info */}
              <div className="bg-slate-50 p-2.5 rounded-xl space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Phone: <b className="font-mono text-slate-800">{d.phone || '+977 98XXXXXXXX'}</b></span>
                  <div className="flex items-center gap-1 text-slate-800 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{d.rating ? d.rating.toFixed(1) : '5.0'}</span>
                    <span className="text-[10px] text-slate-400">({d.totalTrips || 0} trips)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Licence:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {isUnmasked ? d.licenseNumber : maskLicence(d.licenseNumber)}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleMask(d._id)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      {isUnmasked ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                  </div>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase border ${expiryInfo.badge}`}>
                    {expiryInfo.label}
                  </span>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-wrap items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onViewProfile(d)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-blue-50 text-[#0755C9] font-bold text-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => onEditDriver(d)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 hover:bg-slate-50"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => onAssignTrip(d)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Assign</span>
                </button>

                <button
                  type="button"
                  onClick={() => onViewTripHistory(d)}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg border border-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1"
                >
                  <Route className="w-3.5 h-3.5" />
                  <span>Trips</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleStatus(d)}
                  className="p-1.5 min-h-[34px] min-w-[34px] rounded-lg border border-slate-200 text-slate-500 hover:text-amber-600 flex items-center justify-center"
                  title="Toggle status"
                >
                  <Power className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteDriver(d)}
                  className="p-1.5 min-h-[34px] min-w-[34px] rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center"
                  title="Delete driver"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (hidden on mobile, block on md:) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              <th className="py-3 px-3.5">Image</th>
              <th className="py-3 px-3">Driver ID</th>
              <th className="py-3 px-3">Full Name</th>
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Licence No. (Masked)</th>
              <th className="py-3 px-3">Licence Expiry</th>
              <th className="py-3 px-3 text-center">Total Trips</th>
              <th className="py-3 px-3 text-center">Rating</th>
              <th className="py-3 px-3 text-center">Availability</th>
              <th className="py-3 px-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {drivers.map((d) => {
              const statusCfg = STATUS_CONFIG[d.status] || STATUS_CONFIG.available;
              const expiryInfo = formatExpiry(d.licenseExpiry);
              const isUnmasked = !!unmaskedLicences[d._id];

              return (
                <tr
                  key={d._id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* 1. Profile Image */}
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div className="relative w-10 h-10">
                      <img
                        src={
                          d.avatar ||
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                        }
                        alt={d.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusCfg.dot}`}
                        title={statusCfg.label}
                      />
                    </div>
                  </td>

                  {/* 2. Driver ID */}
                  <td className="py-3 px-3 whitespace-nowrap font-mono font-extrabold text-[#0755C9]">
                    {d.driverId || 'DRV-100'}
                  </td>

                  {/* 3. Full Name */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span>{d.name}</span>
                      {d.licenseVerificationStatus === 'verified' && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" title="Licence Verified" />
                      )}
                      {d.licenseVerificationStatus === 'pending' && (
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500" title="Verification Pending" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      {d.district || 'Kathmandu'} • {d.employmentType || 'Full Time'}
                    </span>
                  </td>

                  {/* 4. Phone Number */}
                  <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-700">
                    <a href={`tel:${d.phone}`} className="hover:text-[#0755C9] hover:underline">
                      {d.phone}
                    </a>
                  </td>

                  {/* 5. Licence Number (Masked) */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {isUnmasked ? d.licenseNumber : maskLicense(d.licenseNumber)}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleMask(d._id)}
                        title={isUnmasked ? 'Mask Licence Number' : 'Reveal Licence Number'}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                      >
                        {isUnmasked ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* 6. Licence Expiry */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-semibold">{expiryInfo.text}</div>
                    {expiryInfo.status === 'expired' && (
                      <span className="inline-block px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-rose-50 text-rose-700 border border-rose-200">
                        Expired
                      </span>
                    )}
                    {expiryInfo.status === 'expiring_soon' && (
                      <span className="inline-block px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-amber-50 text-amber-700 border border-amber-200">
                        Expires Soon
                      </span>
                    )}
                  </td>

                  {/* 7. Total Trips */}
                  <td className="py-3 px-3 whitespace-nowrap text-center">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full text-[11px]">
                      {d.tripsCompleted || 0}
                    </span>
                  </td>

                  {/* 8. Rating */}
                  <td className="py-3 px-3 whitespace-nowrap text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-[11px]">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{d.rating || 4.9}</span>
                    </div>
                  </td>

                  {/* 9. Availability Badge */}
                  <td className="py-3 px-3 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusCfg.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      <span>{statusCfg.label}</span>
                    </span>
                  </td>

                  {/* 10. Actions */}
                  <td className="py-3 px-3.5 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* View Profile */}
                      <button
                        type="button"
                        onClick={() => onViewProfile(d)}
                        title="View Complete Profile & Documents"
                        className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0755C9] rounded-lg transition-colors border border-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Driver */}
                      <button
                        type="button"
                        onClick={() => onEditDriver(d)}
                        title="Edit Driver Profile"
                        className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-slate-200"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Assign Trip */}
                      {d.status !== 'inactive' && (
                        <button
                          type="button"
                          onClick={() => onAssignTrip(d)}
                          title="Assign to Booking Trip"
                          className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors border border-indigo-200"
                        >
                          <CalendarPlus className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Trip History */}
                      <button
                        type="button"
                        onClick={() => onViewTripHistory(d)}
                        title="View Trip History"
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                      >
                        <Route className="w-3.5 h-3.5" />
                      </button>

                      {/* Activate / Deactivate Toggle */}
                      <button
                        type="button"
                        onClick={() => onToggleStatus(d)}
                        title={d.status === 'inactive' ? 'Activate Driver' : 'Deactivate Driver'}
                        className={`p-1.5 rounded-lg transition-colors border ${
                          d.status === 'inactive'
                            ? 'bg-slate-100 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 border-slate-200'
                            : 'bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-600 border-slate-200'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDeleteDriver(d)}
                        title="Delete Driver"
                        className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors border border-slate-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
          {totalItems} total drivers)
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

export default DriverTableView;
