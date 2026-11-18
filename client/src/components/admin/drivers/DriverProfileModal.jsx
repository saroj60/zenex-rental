import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Star,
  Car,
  Briefcase,
  FileText,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Route,
  UserX,
  PlayCircle,
  CalendarCheck,
} from 'lucide-react';
import api from '../../../services/api';

const DriverProfileModal = ({
  driver,
  onClose,
  onEdit,
  onAssignTrip,
  onStatusChange,
  onVerifyLicense,
}) => {
  const [tripData, setTripData] = useState(null);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'trips' | 'documents'
  const [tripFilter, setTripFilter] = useState('all'); // 'all' | 'ongoing' | 'upcoming' | 'completed'

  useEffect(() => {
    if (driver?._id) {
      fetchTrips();
    }
  }, [driver]);

  const fetchTrips = async () => {
    setLoadingTrips(true);
    try {
      const res = await api.get(`/admin/drivers/${driver._id}/trips`);
      if (res.data?.success) {
        setTripData(res.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch driver trips:', err.message);
    } finally {
      setLoadingTrips(false);
    }
  };

  const handleUnassignCurrentTrip = async (bookingId) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/remove-driver`);
      if (res.data?.success) {
        fetchTrips();
        onStatusChange({ ...driver, status: 'available' });
      }
    } catch (err) {
      console.warn('Failed to unassign driver:', err.message);
    }
  };

  if (!driver) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusColors = {
    available: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    assigned: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    on_trip: 'bg-blue-100 text-blue-800 border-blue-300',
    unavailable: 'bg-amber-100 text-amber-800 border-amber-300',
    inactive: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  const verificationColors = {
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    expired: 'bg-rose-50 text-rose-700 border-rose-200',
    rejected: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  // Filtered trips list
  const filteredTrips = (tripData?.trips || []).filter((t) => {
    if (tripFilter === 'ongoing') return t.status === 'ongoing';
    if (tripFilter === 'upcoming') return t.status === 'confirmed';
    if (tripFilter === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={
                driver.avatar ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              }
              alt={driver.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">{driver.name}</h2>
                <span className="font-mono text-xs font-bold text-[#0755C9] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {driver.driverId}
                </span>

                {/* Status Selector Dropdown */}
                <select
                  value={driver.status}
                  onChange={(e) => onStatusChange({ ...driver, status: e.target.value })}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border cursor-pointer ${
                    statusColors[driver.status] || statusColors.available
                  }`}
                >
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="on_trip">On Trip</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {driver.district} • {driver.employmentType || 'Full Time'} • Joined {formatDate(driver.joiningDate)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-slate-50/50 border-b border-slate-100 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#0755C9] text-[#0755C9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Overview & Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trips')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'trips'
                ? 'border-[#0755C9] text-[#0755C9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Trip History</span>
            {tripData?.summary?.totalTrips > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 text-[#0755C9] font-black">
                {tripData.summary.totalTrips}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'documents'
                ? 'border-[#0755C9] text-[#0755C9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Licence & Documents</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase border ${
                verificationColors[driver.licenseVerificationStatus] || verificationColors.verified
              }`}
            >
              {driver.licenseVerificationStatus}
            </span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Active Trip Banner if driver is assigned or on trip */}
          {driver.currentBooking && (
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-indigo-950">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <strong className="text-xs">Current Active Assignment:</strong>
                  <span className="font-mono font-black text-[#0755C9]">
                    #{driver.currentBooking.bookingId || 'NCR Trip'}
                  </span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.2 rounded-full bg-indigo-200 text-indigo-800">
                    {driver.currentBooking.status || driver.status}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-800">
                  Route: <strong>{driver.currentBooking.pickupLocation?.name || 'Kathmandu'}</strong> →{' '}
                  <strong>{driver.currentBooking.dropoffLocation?.name || 'Pokhara'}</strong> (
                  {formatDate(driver.currentBooking.startDate)} to {formatDate(driver.currentBooking.endDate)})
                </p>
                {driver.currentBooking.customerDetails?.fullName && (
                  <p className="text-[11px] text-indigo-700">
                    Customer: {driver.currentBooking.customerDetails.fullName} ({driver.currentBooking.customerDetails.phone})
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onAssignTrip(driver)}
                  className="px-3 py-1.5 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Reassign Trip
                </button>
                <button
                  type="button"
                  onClick={() => handleUnassignCurrentTrip(driver.currentBooking._id || driver.currentBooking)}
                  className="px-3 py-1.5 bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Unassign</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick KPI stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Rating</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-lg font-black text-slate-900">{driver.rating || 4.9}</span>
                    <span className="text-[10px] text-slate-400">/ 5.0</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Trips</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {driver.tripsCompleted || 0}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {driver.experienceYears || 5} Years
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Compensation</span>
                  <div className="text-sm font-black text-emerald-700 mt-0.5">
                    NPR {driver.salaryOrCommission?.amount?.toLocaleString() || '35,000'}
                  </div>
                  <span className="text-[9px] text-slate-400">
                    {driver.salaryOrCommission?.payType || 'Monthly Salary'}
                  </span>
                </div>
              </div>

              {/* 2-Column Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2.5">
                  <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                    <User className="w-4 h-4 text-[#0755C9]" />
                    <span>Personal Details</span>
                  </div>

                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <strong className="text-slate-900 font-mono">{driver.phone}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-slate-800">{driver.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date of Birth:</span>
                      <span className="text-slate-800">{formatDate(driver.dob)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gender:</span>
                      <span className="text-slate-800">{driver.gender || 'Male'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Permanent Address:</span>
                      <span className="text-slate-800 text-right">{driver.permanentAddress || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Address:</span>
                      <span className="text-slate-800 text-right">{driver.currentAddress || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Municipality:</span>
                      <span className="text-slate-800 text-right">{driver.municipality || 'N/A'}</span>
                    </div>
                    {driver.emergencyContact?.name && (
                      <div className="flex justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-slate-400 font-bold">Emergency Contact:</span>
                        <span className="text-slate-800 font-bold">
                          {driver.emergencyContact.name} ({driver.emergencyContact.relation}) - {driver.emergencyContact.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Driving Licence & Vehicle */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                      <ShieldCheck className="w-4 h-4 text-[#0755C9]" />
                      <span>Licence & Vehicle Summary</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                        verificationColors[driver.licenseVerificationStatus] || verificationColors.verified
                      }`}
                    >
                      {driver.licenseVerificationStatus}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Licence Number:</span>
                      <strong className="text-slate-900 font-mono">{driver.licenseNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Issuing Office:</span>
                      <span className="text-slate-800 text-right max-w-[200px] truncate">{driver.issuingAuthority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expiry Date:</span>
                      <strong className="text-slate-900">{formatDate(driver.licenseExpiry)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Categories:</span>
                      <span className="text-slate-800 text-right font-medium">
                        {driver.licenseCategory?.join(', ') || 'Category B'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Languages:</span>
                      <span className="text-slate-800 font-medium">
                        {driver.languages?.join(', ') || 'Nepali, English'}
                      </span>
                    </div>
                  </div>

                  {/* Assigned Vehicle */}
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Dedicated Fleet Vehicle
                    </span>
                    {driver.assignedVehicle ? (
                      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                        <Car className="w-4 h-4 text-[#0755C9]" />
                        <span className="font-bold text-slate-800">{driver.assignedVehicle.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">
                          ({driver.assignedVehicle.registrationNumber})
                        </span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">
                        Fleet pool vehicle assigned dynamically per trip.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {driver.notes && (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-amber-900">
                  <strong className="text-xs font-black block mb-0.5">Admin & Route Notes:</strong>
                  <p className="text-[11px] text-amber-800">{driver.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TRIP HISTORY */}
          {activeTab === 'trips' && (
            <div className="space-y-3">
              {/* Trip Subtabs */}
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setTripFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    tripFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({tripData?.summary?.totalTrips || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setTripFilter('ongoing')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    tripFilter === 'ongoing'
                      ? 'bg-[#0755C9] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Ongoing ({tripData?.summary?.ongoingTrips || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setTripFilter('upcoming')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    tripFilter === 'upcoming'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Upcoming ({tripData?.summary?.upcomingTrips || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setTripFilter('completed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    tripFilter === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Completed ({tripData?.summary?.completedTrips || 0})
                </button>
              </div>

              {loadingTrips ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-[#0755C9] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 mt-2">Loading trip history...</p>
                </div>
              ) : filteredTrips.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  <Route className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">No Trips Found</p>
                  <p className="text-xs text-slate-400">No trips recorded in this category.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTrips.map((trip) => (
                    <div
                      key={trip._id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-[#0755C9]">
                            {trip.bookingId}
                          </span>
                          <span className="font-bold text-slate-900">
                            {trip.pickupLocation?.name} → {trip.dropoffLocation?.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-bold uppercase bg-slate-200 text-slate-700">
                            {trip.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {formatDate(trip.startDate)} - {formatDate(trip.endDate)} ({trip.durationDays || 1} Days) • Vehicle: {trip.vehicle?.name || 'Fleet'}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Customer: <strong>{trip.customerDetails?.fullName}</strong> ({trip.customerDetails?.phone})
                        </p>
                      </div>

                      <div className="text-right sm:self-center shrink-0">
                        <span className="font-mono font-bold text-slate-900 block text-xs">
                          NPR {(trip.totalAmount || 0).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          Chauffeur Allowance: NPR {(trip.pricingBreakdown?.driverAllowance || 1500 * (trip.durationDays || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LICENCE & DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-xs">Driving Licence Document Status</h4>
                  <p className="text-[11px] text-slate-400">
                    Nepal Yatayat Bebastha Karyalaya verified smart driving card
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {driver.licenseVerificationStatus !== 'verified' ? (
                    <button
                      type="button"
                      onClick={() => onVerifyLicense(driver._id, 'verified')}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onVerifyLicense(driver._id, 'pending')}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-amber-600 rounded-xl text-xs font-bold transition-colors"
                    >
                      Flag for Re-verification
                    </button>
                  )}
                </div>
              </div>

              {/* Licence Images Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    Licence Card (Front)
                  </span>
                  <div className="h-44 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                    {driver.licenseFrontImage ? (
                      <img
                        src={driver.licenseFrontImage}
                        alt="Licence Front"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-slate-400">
                        <FileText className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[11px]">No front image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    Licence Card (Back)
                  </span>
                  <div className="h-44 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                    {driver.licenseBackImage ? (
                      <img
                        src={driver.licenseBackImage}
                        alt="Licence Back"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-slate-400">
                        <FileText className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[11px]">No back image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(driver)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Edit Profile
            </button>
            {driver.status !== 'inactive' && (
              <button
                type="button"
                onClick={() => onAssignTrip(driver)}
                className="px-4 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/20 transition-colors"
              >
                Assign Trip
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverProfileModal;
