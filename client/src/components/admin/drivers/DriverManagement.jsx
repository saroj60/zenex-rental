import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import api from '../../../services/api';

import DriverStatsCards from './DriverStatsCards';
import DriverFilterToolbar from './DriverFilterToolbar';
import DriverTableView from './DriverTableView';
import DriverProfileModal from './DriverProfileModal';
import AddEditDriverModal from './AddEditDriverModal';
import AssignTripModal from './AssignTripModal';

const DriverManagement = () => {
  // Statistics State
  const [stats, setStats] = useState({
    totalDrivers: 0,
    availableDrivers: 0,
    assignedDrivers: 0,
    unavailableDrivers: 0,
    pendingLicenceVerification: 0,
  });

  // Drivers Data & Pagination
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [employmentFilter, setEmploymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modals State
  const [profileModalDriver, setProfileModalDriver] = useState(null);
  const [addEditModalDriver, setAddEditModalDriver] = useState(null); // null = add, object = edit
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [assignTripModalDriver, setAssignTripModalDriver] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Driver KPI Statistics
  const fetchStatistics = async () => {
    try {
      const res = await api.get('/admin/drivers/statistics');
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to load driver statistics:', err.message);
    }
  };

  // Fetch Drivers with Filters & Search
  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (statusFilter !== 'all') params.status = statusFilter;
      if (verificationFilter !== 'all') params.verificationStatus = verificationFilter;
      if (districtFilter !== 'all') params.district = districtFilter;
      if (employmentFilter !== 'all') params.employmentType = employmentFilter;

      // Sorting
      if (sortBy === 'newest') {
        params.sortBy = 'createdAt';
        params.sortOrder = 'desc';
      } else if (sortBy === 'name_asc') {
        params.sortBy = 'name';
        params.sortOrder = 'asc';
      } else if (sortBy === 'rating_high') {
        params.sortBy = 'rating';
        params.sortOrder = 'desc';
      } else if (sortBy === 'trips_high') {
        params.sortBy = 'tripsCompleted';
        params.sortOrder = 'desc';
      } else if (sortBy === 'expiry_soon') {
        params.sortBy = 'licenseExpiry';
        params.sortOrder = 'asc';
      }

      const res = await api.get('/admin/drivers', { params });
      if (res.data?.success) {
        setDrivers(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalItems(res.data.total || 0);
      }
    } catch (err) {
      console.warn('Failed to fetch drivers list:', err.message);
      showToast('Could not load drivers roster', 'error');
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    searchQuery,
    statusFilter,
    verificationFilter,
    districtFilter,
    employmentFilter,
    sortBy,
  ]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  // KPI Card Selection Handler
  const handleSelectStatusFromKPI = (selectedStatus) => {
    if (selectedStatus === 'verification_pending') {
      setVerificationFilter('pending');
      setStatusFilter('all');
    } else {
      setStatusFilter(selectedStatus);
      setVerificationFilter('all');
    }
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setVerificationFilter('all');
    setDistrictFilter('all');
    setEmploymentFilter('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Export Drivers to CSV
  const handleExportCSV = async () => {
    try {
      const res = await api.get('/admin/drivers', { params: { limit: 0 } });
      const exportData = res.data?.data || drivers;

      if (!exportData || exportData.length === 0) {
        showToast('No driver records to export', 'error');
        return;
      }

      const headers = [
        'Driver ID',
        'Employee ID',
        'Full Name',
        'Phone',
        'Email',
        'District',
        'Province',
        'Licence Number',
        'Licence Categories',
        'Licence Expiry',
        'Verification Status',
        'Availability Status',
        'Trips Completed',
        'Rating',
        'Employment Type',
        'Monthly Salary (NPR)',
        'Joining Date',
      ];

      const csvRows = exportData.map((d) => [
        `"${d.driverId || ''}"`,
        `"${d.employeeId || ''}"`,
        `"${d.name || ''}"`,
        `"${d.phone || ''}"`,
        `"${d.email || ''}"`,
        `"${d.district || ''}"`,
        `"${d.province || ''}"`,
        `"${d.licenseNumber || ''}"`,
        `"${d.licenseCategory?.join('; ') || ''}"`,
        `"${new Date(d.licenseExpiry).toLocaleDateString()}"`,
        `"${d.licenseVerificationStatus || ''}"`,
        `"${d.status || ''}"`,
        d.tripsCompleted || 0,
        d.rating || 4.9,
        `"${d.employmentType || ''}"`,
        d.salaryOrCommission?.amount || 0,
        `"${new Date(d.joiningDate).toLocaleDateString()}"`,
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...csvRows.map((r) => r.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `nepal_car_rental_drivers_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${exportData.length} chauffeur records successfully!`);
    } catch (err) {
      console.error('Export error:', err);
      showToast('Export failed. Please try again.', 'error');
    }
  };

  // Activate / Deactivate Toggle
  const handleToggleStatus = async (driver) => {
    const newStatus = driver.status === 'inactive' ? 'available' : 'inactive';
    try {
      const res = await api.patch(`/admin/drivers/${driver._id}/status`, {
        status: newStatus,
      });
      if (res.data?.success) {
        showToast(`Driver ${driver.name} marked as ${newStatus.toUpperCase()}`);
        fetchDrivers();
        fetchStatistics();
        if (profileModalDriver?._id === driver._id) {
          setProfileModalDriver(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not update driver status', 'error');
    }
  };

  // Verify Licence
  const handleVerifyLicense = async (driverId, status) => {
    try {
      const res = await api.patch(`/admin/drivers/${driverId}/verify-license`, { status });
      if (res.data?.success) {
        showToast(res.data.message || `Licence status updated to ${status}`);
        fetchDrivers();
        fetchStatistics();
        if (profileModalDriver?._id === driverId) {
          setProfileModalDriver(res.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not verify licence', 'error');
    }
  };

  // Delete Driver
  const handleDeleteDriver = async (driver) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${driver.name} (${driver.driverId}) from the system?`
    );
    if (!confirmed) return;

    try {
      const res = await api.delete(`/admin/drivers/${driver._id}`);
      if (res.data?.success) {
        showToast(res.data.message || `Driver ${driver.name} removed successfully.`);
        fetchDrivers();
        fetchStatistics();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not delete driver', 'error');
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
            <span>Driver Management</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0755C9] border border-blue-200">
              Verified Chauffeurs
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage drivers, licences, availability and assigned trips
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            fetchDrivers();
            fetchStatistics();
            showToast('Refreshed driver roster data');
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-[#0755C9] rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* 1. Statistics Cards (5 Cards) */}
      <DriverStatsCards
        stats={stats}
        activeFilter={statusFilter === 'all' && verificationFilter === 'pending' ? 'verification_pending' : statusFilter}
        onSelectStatus={handleSelectStatusFromKPI}
      />

      {/* 2. Filter & Search Toolbar */}
      <DriverFilterToolbar
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
        verificationFilter={verificationFilter}
        onVerificationChange={(v) => {
          setVerificationFilter(v);
          setCurrentPage(1);
        }}
        districtFilter={districtFilter}
        onDistrictChange={(d) => {
          setDistrictFilter(d);
          setCurrentPage(1);
        }}
        employmentFilter={employmentFilter}
        onEmploymentChange={(e) => {
          setEmploymentFilter(e);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onAddDriver={() => {
          setAddEditModalDriver(null);
          setIsAddEditOpen(true);
        }}
        onExportCSV={handleExportCSV}
        onResetFilters={handleResetFilters}
        totalResults={totalItems}
      />

      {/* 3. Driver Table View */}
      <DriverTableView
        drivers={drivers}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onViewProfile={(d) => setProfileModalDriver(d)}
        onEditDriver={(d) => {
          setAddEditModalDriver(d);
          setIsAddEditOpen(true);
        }}
        onAssignTrip={(d) => setAssignTripModalDriver(d)}
        onViewTripHistory={(d) => setProfileModalDriver(d)}
        onToggleStatus={handleToggleStatus}
        onDeleteDriver={handleDeleteDriver}
      />

      {/* 4. Driver Profile Modal */}
      {profileModalDriver && (
        <DriverProfileModal
          driver={profileModalDriver}
          onClose={() => setProfileModalDriver(null)}
          onEdit={(d) => {
            setProfileModalDriver(null);
            setAddEditModalDriver(d);
            setIsAddEditOpen(true);
          }}
          onAssignTrip={(d) => {
            setProfileModalDriver(null);
            setAssignTripModalDriver(d);
          }}
          onStatusChange={handleToggleStatus}
          onVerifyLicense={handleVerifyLicense}
        />
      )}

      {/* 5. Add / Edit Driver Modal */}
      {isAddEditOpen && (
        <AddEditDriverModal
          driver={addEditModalDriver}
          onClose={() => {
            setIsAddEditOpen(false);
            setAddEditModalDriver(null);
          }}
          onSuccess={(savedDriver, message) => {
            showToast(message);
            fetchDrivers();
            fetchStatistics();
          }}
        />
      )}

      {/* 6. Assign Trip Modal */}
      {assignTripModalDriver && (
        <AssignTripModal
          driver={assignTripModalDriver}
          onClose={() => setAssignTripModalDriver(null)}
          onAssigned={(msg) => {
            showToast(msg);
            fetchDrivers();
            fetchStatistics();
          }}
        />
      )}
    </div>
  );
};

export default DriverManagement;
