import React, { useState, useEffect, useCallback } from 'react';
import {
  CalendarCheck,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import api from '../../../services/api';

import BookingStatsCards from './BookingStatsCards';
import BookingFilterToolbar from './BookingFilterToolbar';
import BookingTableView from './BookingTableView';
import BookingCalendarView from './BookingCalendarView';
import BookingDetailsModal from './BookingDetailsModal';
import AssignDriverModal from './AssignDriverModal';
import AssignVehicleModal from './AssignVehicleModal';
import RecordPaymentModal from './RecordPaymentModal';
import ActionReasonModal from './ActionReasonModal';

const BookingManagement = ({ vehicles = [], drivers = [] }) => {
  // Statistics State
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
    rejected: 0,
  });

  // Bookings Data & Pagination
  const [bookings, setBookings] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [rentalTypeFilter, setRentalTypeFilter] = useState('all');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'calendar'

  // Modals State
  const [detailModalBooking, setDetailModalBooking] = useState(null);
  const [driverModalBooking, setDriverModalBooking] = useState(null);
  const [vehicleModalBooking, setVehicleModalBooking] = useState(null);
  const [paymentModalBooking, setPaymentModalBooking] = useState(null);
  const [reasonModalState, setReasonModalState] = useState(null); // { type: 'reject' | 'cancel', booking }

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Statistics
  const fetchStatistics = async () => {
    try {
      const res = await api.get('/bookings/statistics');
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch statistics:', err.message);
    }
  };

  // Fetch Bookings with Filters
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (statusFilter !== 'all') params.status = statusFilter;
      if (paymentFilter !== 'all') params.paymentStatus = paymentFilter;
      if (vehicleFilter !== 'all') params.vehicle = vehicleFilter;
      if (rentalTypeFilter !== 'all') params.rentalType = rentalTypeFilter;
      if (startDateFilter) params.startDate = startDateFilter;
      if (endDateFilter) params.endDate = endDateFilter;

      // Sorting
      if (sortBy === 'newest') {
        params.sortBy = 'createdAt';
        params.sortOrder = 'desc';
      } else if (sortBy === 'oldest') {
        params.sortBy = 'createdAt';
        params.sortOrder = 'asc';
      } else if (sortBy === 'amount_high') {
        params.sortBy = 'totalAmount';
        params.sortOrder = 'desc';
      } else if (sortBy === 'amount_low') {
        params.sortBy = 'totalAmount';
        params.sortOrder = 'asc';
      } else if (sortBy === 'pickup_soon') {
        params.sortBy = 'startDate';
        params.sortOrder = 'asc';
      }

      const res = await api.get('/bookings', { params });
      if (res.data?.success) {
        setBookings(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalItems(res.data.total || 0);
      }
    } catch (err) {
      console.warn('Failed to fetch bookings:', err.message);
      showToast('Could not load bookings list', 'error');
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    searchQuery,
    statusFilter,
    paymentFilter,
    vehicleFilter,
    rentalTypeFilter,
    startDateFilter,
    endDateFilter,
    sortBy,
  ]);

  // Fetch Calendar Schedule
  const fetchCalendar = async () => {
    try {
      const res = await api.get('/bookings/calendar');
      if (res.data?.success) {
        setCalendarEvents(res.data.data || []);
      }
    } catch (err) {
      console.warn('Failed to fetch calendar:', err.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchCalendar();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Handle KPI Card Click to Filter
  const handleSelectStatusFromKPI = (selectedStatus) => {
    setStatusFilter(selectedStatus);
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setVehicleFilter('all');
    setRentalTypeFilter('all');
    setStartDateFilter('');
    setEndDateFilter('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Export Bookings to CSV
  const handleExportCSV = async () => {
    try {
      // Fetch all matching bookings without pagination limit
      const params = { limit: 0 };
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (statusFilter !== 'all') params.status = statusFilter;
      if (paymentFilter !== 'all') params.paymentStatus = paymentFilter;
      if (vehicleFilter !== 'all') params.vehicle = vehicleFilter;
      if (rentalTypeFilter !== 'all') params.rentalType = rentalTypeFilter;

      const res = await api.get('/bookings', { params });
      const exportData = res.data?.data || bookings;

      if (!exportData || exportData.length === 0) {
        showToast('No booking records to export', 'error');
        return;
      }

      const headers = [
        'Booking ID',
        'Customer Name',
        'Phone',
        'Email',
        'Vehicle Name',
        'Registration Number',
        'Rental Type',
        'Pickup Location',
        'Drop-off Location',
        'Pickup Date',
        'Return Date',
        'Total Amount (NPR)',
        'Paid Amount (NPR)',
        'Payment Status',
        'Payment Method',
        'Booking Status',
        'Created At',
      ];

      const csvRows = exportData.map((b) => [
        `"${b.bookingId || ''}"`,
        `"${b.customerDetails?.fullName || b.customer?.name || ''}"`,
        `"${b.customerDetails?.phone || ''}"`,
        `"${b.customerDetails?.email || ''}"`,
        `"${b.vehicle?.name || ''}"`,
        `"${b.vehicle?.registrationNumber || ''}"`,
        `"${b.rentalType || ''}"`,
        `"${b.pickupLocation?.name || ''}"`,
        `"${b.dropoffLocation?.name || ''}"`,
        `"${new Date(b.startDate).toLocaleDateString()}"`,
        `"${new Date(b.endDate).toLocaleDateString()}"`,
        b.totalAmount || b.pricingBreakdown?.grandTotal || 0,
        b.paidAmount || 0,
        `"${b.paymentStatus || ''}"`,
        `"${b.paymentMethod || ''}"`,
        `"${b.status || ''}"`,
        `"${new Date(b.createdAt).toLocaleDateString()}"`,
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...csvRows.map((r) => r.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `nepal_car_rental_bookings_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${exportData.length} booking records successfully!`);
    } catch (err) {
      console.error('Export error:', err);
      showToast('Export failed. Please try again.', 'error');
    }
  };

  // Actions Workflow Handlers
  const handleConfirm = async (booking) => {
    try {
      const res = await api.patch(`/bookings/${booking._id}/confirm`);
      if (res.data?.success) {
        showToast(res.data.message || `Booking ${booking.bookingId} confirmed!`);
        fetchBookings();
        fetchStatistics();
        fetchCalendar();
        if (detailModalBooking?._id === booking._id) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not confirm booking', 'error');
    }
  };

  const handleRejectReasonSubmit = async (bookingId, reason) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/reject`, { reason });
      if (res.data?.success) {
        showToast(res.data.message || 'Booking rejected.');
        fetchBookings();
        fetchStatistics();
        fetchCalendar();
        if (detailModalBooking?._id === bookingId) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not reject booking', 'error');
    }
  };

  const handleCancelReasonSubmit = async (bookingId, reason) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/cancel`, { reason });
      if (res.data?.success) {
        showToast(res.data.message || 'Booking cancelled.');
        fetchBookings();
        fetchStatistics();
        fetchCalendar();
        if (detailModalBooking?._id === bookingId) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not cancel booking', 'error');
    }
  };

  const handleAssignDriverSubmit = async (bookingId, driverId) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/assign-driver`, { driverId });
      if (res.data?.success) {
        showToast(res.data.message || 'Driver assigned successfully!');
        fetchBookings();
        fetchCalendar();
        if (detailModalBooking?._id === bookingId) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to assign driver', 'error');
    }
  };

  const handleRemoveDriverSubmit = async (bookingId) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/remove-driver`);
      if (res.data?.success) {
        showToast(res.data.message || 'Driver unassigned.');
        fetchBookings();
        fetchCalendar();
        if (detailModalBooking?._id === bookingId) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to remove driver', 'error');
    }
  };

  const handleAssignVehicleSubmit = async (bookingId, vehicleId) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/assign-vehicle`, { vehicleId });
      if (res.data?.success) {
        showToast(res.data.message || 'Vehicle reassigned successfully!');
        fetchBookings();
        fetchCalendar();
        if (detailModalBooking?._id === bookingId) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to reassign vehicle', 'error');
    }
  };

  const handleRecordPaymentSubmit = async (bookingId, payload) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/payment`, payload);
      if (res.data?.success) {
        showToast(res.data.message || 'Payment recorded successfully!');
        fetchBookings();
        fetchStatistics();
        fetchCalendar();
        if (detailModalBooking?._id === bookingId) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to record payment', 'error');
    }
  };

  const handleUpdateStatusDirect = async (booking, newStatus) => {
    try {
      const res = await api.patch(`/bookings/${booking._id}/status`, { status: newStatus });
      if (res.data?.success) {
        showToast(res.data.message || `Booking status updated to ${newStatus}!`);
        fetchBookings();
        fetchStatistics();
        fetchCalendar();
        if (detailModalBooking?._id === booking._id) {
          setDetailModalBooking(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast Alert Banner */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold animate-slideUp ${
            toast.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Booking Management</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0755C9] border border-blue-200">
              Live Fleet
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage all customer reservations, schedule drivers, track payments & fleet calendar
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            fetchBookings();
            fetchStatistics();
            fetchCalendar();
            showToast('Refreshed booking reservations data');
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-[#0755C9] rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* 1. Statistics Cards (6 Dynamic Cards) */}
      <BookingStatsCards
        stats={stats}
        activeFilter={statusFilter}
        onSelectStatus={handleSelectStatusFromKPI}
      />

      {/* 2. Comprehensive Filter Toolbar */}
      <BookingFilterToolbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(s) => {
          setStatusFilter(s);
          setCurrentPage(1);
        }}
        paymentFilter={paymentFilter}
        onPaymentChange={(p) => {
          setPaymentFilter(p);
          setCurrentPage(1);
        }}
        vehicleFilter={vehicleFilter}
        onVehicleChange={(v) => {
          setVehicleFilter(v);
          setCurrentPage(1);
        }}
        rentalTypeFilter={rentalTypeFilter}
        onRentalTypeChange={(r) => {
          setRentalTypeFilter(r);
          setCurrentPage(1);
        }}
        startDateFilter={startDateFilter}
        onStartDateChange={(d) => {
          setStartDateFilter(d);
          setCurrentPage(1);
        }}
        endDateFilter={endDateFilter}
        onEndDateChange={(d) => {
          setEndDateFilter(d);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExportCSV={handleExportCSV}
        onResetFilters={handleResetFilters}
        vehicles={vehicles}
        totalResults={totalItems}
      />

      {/* 3. Main Content: Table View vs. Calendar View */}
      {viewMode === 'table' ? (
        <BookingTableView
          bookings={bookings}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onViewDetails={(b) => setDetailModalBooking(b)}
          onConfirmBooking={handleConfirm}
          onRejectBooking={(b) => setReasonModalState({ type: 'reject', booking: b })}
          onAssignDriver={(b) => setDriverModalBooking(b)}
          onAssignVehicle={(b) => setVehicleModalBooking(b)}
          onCancelBooking={(b) => setReasonModalState({ type: 'cancel', booking: b })}
          onMarkOngoing={(b) => handleUpdateStatusDirect(b, 'ongoing')}
          onMarkCompleted={(b) => handleUpdateStatusDirect(b, 'completed')}
          onRecordPayment={(b) => setPaymentModalBooking(b)}
        />
      ) : (
        <BookingCalendarView
          events={calendarEvents}
          vehicles={vehicles}
          drivers={drivers}
          onSelectBooking={(ev) => {
            // Find full booking from list or fetch
            const fullBooking = bookings.find((b) => b._id === ev.id || b.bookingId === ev.bookingId);
            setDetailModalBooking(fullBooking || ev);
          }}
        />
      )}

      {/* 4. Booking Details Modal */}
      {detailModalBooking && (
        <BookingDetailsModal
          booking={detailModalBooking}
          onClose={() => setDetailModalBooking(null)}
          onConfirm={() => handleConfirm(detailModalBooking)}
          onReject={() => {
            setReasonModalState({ type: 'reject', booking: detailModalBooking });
          }}
          onAssignDriver={() => setDriverModalBooking(detailModalBooking)}
          onAssignVehicle={() => setVehicleModalBooking(detailModalBooking)}
          onRecordPayment={() => setPaymentModalBooking(detailModalBooking)}
          onMarkOngoing={() => handleUpdateStatusDirect(detailModalBooking, 'ongoing')}
          onMarkCompleted={() => handleUpdateStatusDirect(detailModalBooking, 'completed')}
          onCancel={() => {
            setReasonModalState({ type: 'cancel', booking: detailModalBooking });
          }}
        />
      )}

      {/* 5. Driver Assignment Modal */}
      {driverModalBooking && (
        <AssignDriverModal
          booking={driverModalBooking}
          drivers={drivers}
          onClose={() => setDriverModalBooking(null)}
          onAssign={handleAssignDriverSubmit}
          onRemove={handleRemoveDriverSubmit}
        />
      )}

      {/* 6. Vehicle Assignment Modal */}
      {vehicleModalBooking && (
        <AssignVehicleModal
          booking={vehicleModalBooking}
          vehicles={vehicles}
          onClose={() => setVehicleModalBooking(null)}
          onAssign={handleAssignVehicleSubmit}
        />
      )}

      {/* 7. Record Payment Modal */}
      {paymentModalBooking && (
        <RecordPaymentModal
          booking={paymentModalBooking}
          onClose={() => setPaymentModalBooking(null)}
          onRecordPayment={handleRecordPaymentSubmit}
        />
      )}

      {/* 8. Action Reason Modal (Rejection / Cancellation) */}
      {reasonModalState && (
        <ActionReasonModal
          type={reasonModalState.type}
          booking={reasonModalState.booking}
          onClose={() => setReasonModalState(null)}
          onSubmit={
            reasonModalState.type === 'reject'
              ? handleRejectReasonSubmit
              : handleCancelReasonSubmit
          }
        />
      )}
    </div>
  );
};

export default BookingManagement;
