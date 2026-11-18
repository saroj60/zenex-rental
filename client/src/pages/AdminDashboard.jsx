import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  CalendarCheck,
  Calendar,
  Users,
  UserCheck,
  CreditCard,
  CheckCircle,
  Clock,
  Wrench,
  Percent,
  Plus,
  RefreshCw,
  Search,
  Filter,
  ShieldCheck,
  Trash2,
  Edit,
  Eye,
  Check,
  X,
  Building2,
  Star,
  Tag,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

// Admin Subcomponents
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import StatCard from '../components/admin/StatCard';
import AdminCharts from '../components/admin/AdminCharts';
import RecentBookingsTable from '../components/admin/RecentBookingsTable';
import RecentActivityFeed from '../components/admin/RecentActivityFeed';
import QuickActionsBar from '../components/admin/QuickActionsBar';
import BookingManagement from '../components/admin/bookings/BookingManagement';
import DriverManagement from '../components/admin/drivers/DriverManagement';
import PaymentManagement from '../components/admin/payments/PaymentManagement';
import {
  AddVehicleModal,
  AddDriverModal,
  BookingDetailModal,
} from '../components/admin/AdminModals';

// Fallback Mock Data Layer in case backend is offline or loading
const MOCK_FALLBACK_DATA = {
  stats: {
    totalVehicles: 42,
    availableVehicles: 34,
    rentedVehicles: 8,
    totalBookings: 189,
    todayBookings: 12,
    totalCustomers: 1249,
    totalDrivers: 18,
    totalRevenue: 1504000,
  },
  monthlyRevenue: [
    { month: 'May', revenue: 160000, target: 140000 },
    { month: 'Jun', revenue: 210000, target: 190000 },
    { month: 'Jul', revenue: 320000, target: 280000 },
    { month: 'Aug', revenue: 440000, target: 380000 },
    { month: 'Sep', revenue: 390000, target: 400000 },
    { month: 'Oct', revenue: 580000, target: 500000 },
    { month: 'Nov', revenue: 710000, target: 650000 },
  ],
  bookingTrends: [
    { day: 'Mon', withDriver: 14, selfDrive: 9 },
    { day: 'Tue', withDriver: 18, selfDrive: 12 },
    { day: 'Wed', withDriver: 22, selfDrive: 15 },
    { day: 'Thu', withDriver: 28, selfDrive: 20 },
    { day: 'Fri', withDriver: 35, selfDrive: 26 },
    { day: 'Sat', withDriver: 42, selfDrive: 31 },
    { day: 'Sun', withDriver: 38, selfDrive: 24 },
  ],
  vehicleCategories: [
    { name: 'SUV', count: 18, percentage: 42.8, color: '#0755C9' },
    { name: 'Hatchback', count: 12, percentage: 28.5, color: '#38BDF8' },
    { name: 'Van / Hiace', count: 6, percentage: 14.3, color: '#F59E0B' },
    { name: 'Premium', count: 4, percentage: 9.5, color: '#8B5CF6' },
    { name: 'EV', count: 2, percentage: 4.9, color: '#10B981' },
  ],
  bookingStatusDistribution: [
    { name: 'Confirmed', count: 85, color: '#10B981' },
    { name: 'Ongoing', count: 32, color: '#0755C9' },
    { name: 'Completed', count: 58, color: '#64748B' },
    { name: 'Pending', count: 12, color: '#F59E0B' },
    { name: 'Cancelled', count: 3, color: '#EF4444' },
  ],
  recentActivities: [
    {
      id: 'act-1',
      title: 'Booking Confirmed & Driver Assigned',
      description: 'Booking #NCR-10458 assigned to Driver Ram Shrestha (Kathmandu → Pokhara)',
      type: 'booking',
      timestamp: '10m ago',
    },
    {
      id: 'act-2',
      title: 'eSewa Payment Verified',
      description: 'Received NPR 17,000 for Hyundai Creta (Transaction #ESW-99214)',
      type: 'payment',
      timestamp: '32m ago',
    },
    {
      id: 'act-3',
      title: 'New Vehicle Registered',
      description: '2024 Hyundai Creta (BA 18 CHA 4291) inspected and marked Available',
      type: 'vehicle',
      timestamp: '2h ago',
    },
    {
      id: 'act-4',
      title: 'Customer Document Verified',
      description: 'Driving license and Nepali citizenship verified for Saroj',
      type: 'customer',
      timestamp: '4h ago',
    },
    {
      id: 'act-5',
      title: 'Scheduled Maintenance Due',
      description: 'Toyota Hiace (BA 04 KHA 1099) scheduled for 40,000 km brake inspection',
      type: 'maintenance',
      timestamp: 'Yesterday',
    },
  ],
};

const TAB_TITLES = {
  dashboard: 'Dashboard Overview',
  bookings: 'Fleet Bookings Management',
  vehicles: 'Vehicle Fleet Management',
  categories: 'Vehicle Categories',
  partners: 'Rental Partners Directory',
  drivers: 'Chauffeur & Driver Roster',
  customers: 'Customer Accounts & Verification',
  payments: 'Payment Transactions & Invoices',
  pricing: 'Rental Tariff & Surcharge Rates',
  maintenance: 'Vehicle Maintenance & Inspection',
  reviews: 'Customer Reviews & Feedback',
  coupons: 'Discount Codes & Promotions',
  notifications: 'System Alerts & Logs',
  reports: 'Analytics & Financial Reports',
  settings: 'Business & Platform Settings',
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, switchUser, logout } = useAuth();

  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data State
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(MOCK_FALLBACK_DATA);
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);

  // Modals
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState(null);

  // Fetch Dashboard and Related Records
  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Ensure admin token is used
      if (user && user.role !== 'admin' && user.role !== 'staff') {
        await switchUser('admin');
      }

      const [dashRes, bookRes, vehRes, drivRes, custRes, maintRes] = await Promise.all([
        api.get('/admin/dashboard').catch(() => ({ data: { data: MOCK_FALLBACK_DATA } })),
        api.get('/bookings').catch(() => ({ data: { data: [] } })),
        api.get('/vehicles').catch(() => ({ data: { data: [] } })),
        api.get('/admin/drivers').catch(() => ({ data: { data: [] } })),
        api.get('/admin/customers').catch(() => ({ data: { data: [] } })),
        api.get('/admin/maintenance').catch(() => ({ data: { data: [] } })),
      ]);

      if (dashRes?.data?.data) {
        setDashboardData(dashRes.data.data);
      }
      setBookings(bookRes.data.data || []);
      setVehicles(vehRes.data.data || []);
      setDrivers(drivRes.data.data || []);
      setCustomers(custRes.data.data || []);
      setMaintenanceLogs(maintRes.data.data || []);
    } catch (err) {
      console.warn('Using mock fallback admin data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Vehicle Created Callback
  const handleVehicleCreated = (createdVehicle) => {
    setVehicles((prev) => [createdVehicle, ...prev]);
    setDashboardData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalVehicles: (prev.stats?.totalVehicles || vehicles.length) + 1,
        availableVehicles: (prev.stats?.availableVehicles || 0) + 1,
      },
    }));
  };

  const handleAddDriver = async (driverData) => {
    try {
      const res = await api.post('/admin/drivers', driverData);
      if (res.data?.data) {
        setDrivers((prev) => [res.data.data, ...prev]);
        setDashboardData((prev) => ({
          ...prev,
          stats: {
            ...prev.stats,
            totalDrivers: prev.stats.totalDrivers + 1,
          },
        }));
      }
    } catch (err) {
      console.error('Failed to add driver:', err);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
      if (selectedBookingForDetail?._id === bookingId) {
        setSelectedBookingForDetail((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const handleVerifyCustomer = async (customerId, currentStatus) => {
    try {
      await api.put(`/admin/customers/${customerId}/verify`, {
        isVerified: !currentStatus,
        licenseVerified: !currentStatus,
        citizenshipVerified: !currentStatus,
      });
      setCustomers((prev) =>
        prev.map((c) =>
          c._id === customerId
            ? {
                ...c,
                isVerified: !currentStatus,
                drivingLicense: { ...c.drivingLicense, verified: !currentStatus },
              }
            : c
        )
      );
    } catch (err) {
      console.error('Failed to verify customer:', err);
    }
  };

  const stats = dashboardData?.stats || MOCK_FALLBACK_DATA.stats;

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex text-[#0E1726]">
      {/* 1. LEFT SIDEBAR */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onLogout={() => {
          logout();
          navigate('/');
        }}
        onSwitchToCustomer={() => {
          switchUser('customer');
          navigate('/');
        }}
        vehiclesCount={vehicles.length || stats.totalVehicles}
        bookingsCount={bookings.length || 12}
        driversCount={drivers.length || 18}
      />

      {/* Main Admin Content Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* 2. TOP HEADER */}
        <AdminHeader
          activeTabTitle={TAB_TITLES[activeTab] || 'Dashboard'}
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          user={user}
          onLogout={() => {
            logout();
            navigate('/');
          }}
          onSwitchToCustomer={() => {
            switchUser('customer');
            navigate('/');
          }}
        />

        {/* 3. DYNAMIC CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* ======================= TAB: DASHBOARD ======================= */}
          {activeTab === 'dashboard' && (
            <>
              {/* 3.1. DASHBOARD STATISTICS: Eight Dynamic Cards */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Key Performance Indicators
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold">
                      Live Nepal rental metrics for Kathmandu, Pokhara & highway routes
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchAdminData}
                    className="p-2 text-slate-600 hover:text-[#0755C9] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
                    title="Refresh KPI statistics"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0755C9]' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-1">
                  {/* Card 1: Total Vehicles */}
                  <StatCard
                    title="Total Vehicles"
                    value={vehicles.length || stats.totalVehicles}
                    change={`+${vehicles.length} active`}
                    trend="up"
                    subtext="registered fleet"
                    icon={Car}
                    colorScheme="blue"
                  />

                  {/* Card 2: Available Vehicles */}
                  <StatCard
                    title="Available Vehicles"
                    value={stats.availableVehicles}
                    change="81%"
                    trend="neutral"
                    subtext="ready for booking"
                    icon={CheckCircle}
                    colorScheme="emerald"
                  />

                  {/* Card 3: Rented Vehicles */}
                  <StatCard
                    title="Rented Vehicles"
                    value={stats.rentedVehicles}
                    change="+18%"
                    trend="up"
                    subtext="currently on road"
                    icon={Clock}
                    colorScheme="amber"
                  />

                  {/* Card 4: Total Bookings */}
                  <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    change="+12.4%"
                    trend="up"
                    subtext="all-time orders"
                    icon={CalendarCheck}
                    colorScheme="violet"
                  />

                  {/* Card 5: Today's Bookings */}
                  <StatCard
                    title="Today's Bookings"
                    value={stats.todayBookings}
                    change="+4"
                    trend="up"
                    subtext="since midnight"
                    icon={Calendar}
                    colorScheme="cyan"
                  />

                  {/* Card 6: Total Customers */}
                  <StatCard
                    title="Total Customers"
                    value={stats.totalCustomers.toLocaleString()}
                    change="+28"
                    trend="up"
                    subtext="registered accounts"
                    icon={Users}
                    colorScheme="blue"
                  />

                  {/* Card 7: Total Drivers */}
                  <StatCard
                    title="Total Drivers"
                    value={stats.totalDrivers}
                    change="100%"
                    trend="up"
                    subtext="verified chauffeurs"
                    icon={UserCheck}
                    colorScheme="emerald"
                  />

                  {/* Card 8: Total Revenue (NPR) */}
                  <StatCard
                    title="Total Revenue"
                    prefix="NPR"
                    value={stats.totalRevenue.toLocaleString()}
                    change="+14.2%"
                    trend="up"
                    subtext="eSewa & Khalti net"
                    icon={CreditCard}
                    colorScheme="rose"
                  />
                </div>
              </section>

              {/* 3.2. QUICK ACTIONS BAR */}
              <QuickActionsBar
                onAddVehicle={() => setShowAddVehicleModal(true)}
                onViewBookings={() => setActiveTab('bookings')}
                onAddDriver={() => setActiveTab('drivers')}
                onViewCustomers={() => setActiveTab('customers')}
              />

              {/* 3.3. ANALYTICS CHARTS: 4 Interactive Recharts */}
              <section className="space-y-2">
                <AdminCharts
                  monthlyRevenue={dashboardData?.monthlyRevenue || MOCK_FALLBACK_DATA.monthlyRevenue}
                  bookingTrends={dashboardData?.bookingTrends || MOCK_FALLBACK_DATA.bookingTrends}
                  vehicleCategories={dashboardData?.vehicleCategories || MOCK_FALLBACK_DATA.vehicleCategories}
                  bookingStatusDistribution={dashboardData?.bookingStatusDistribution || MOCK_FALLBACK_DATA.bookingStatusDistribution}
                />
              </section>

              {/* 3.4. RECENT BOOKINGS TABLE & RECENT ACTIVITY GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* 2 Cols: Recent Bookings Table */}
                <div className="lg:col-span-2">
                  <RecentBookingsTable
                    bookings={bookings.length > 0 ? bookings : dashboardData?.recentBookings || []}
                    onViewBooking={(booking) => setSelectedBookingForDetail(booking)}
                    onUpdateStatus={handleUpdateBookingStatus}
                    onViewAll={() => setActiveTab('bookings')}
                  />
                </div>

                {/* 1 Col: Recent Activity Timeline */}
                <div className="lg:col-span-1">
                  <RecentActivityFeed
                    activities={dashboardData?.recentActivities || MOCK_FALLBACK_DATA.recentActivities}
                  />
                </div>
              </div>
            </>
          )}

          {/* ======================= TAB: BOOKINGS ======================= */}
          {activeTab === 'bookings' && (
            <BookingManagement
              vehicles={vehicles}
              drivers={drivers}
            />
          )}

          {/* ======================= TAB: VEHICLES ======================= */}
          {activeTab === 'vehicles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Vehicle Fleet ({vehicles.length})</h2>
                  <p className="text-xs text-slate-500">Manage rates, availability status, and specifications</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(true)}
                  className="px-4 py-2 bg-[#0755C9] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 hover:bg-[#053e94] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((v) => (
                  <div key={v._id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft space-y-3">
                    <div className="h-36 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-100">
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
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-sm text-slate-900">{v.name}</h3>
                        <span className="text-[10px] font-black uppercase text-[#0755C9] bg-blue-50 px-2 py-0.5 rounded-full">
                          {v.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold">{v.registrationNumber}</p>
                      {v.suitableFor && v.suitableFor.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {v.suitableFor.slice(0, 3).map((occ) => (
                            <span
                              key={occ}
                              className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded capitalize"
                            >
                              {occ.replace('-', ' ')}
                            </span>
                          ))}
                          {v.suitableFor.length > 3 && (
                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              +{v.suitableFor.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">With Driver: </span>
                        <span className="font-black text-slate-900">NPR {v.pricing?.dailyWithDriver?.toLocaleString()}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {v.status || 'Available'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================= TAB: DRIVERS ======================= */}
          {activeTab === 'drivers' && (
            <DriverManagement />
          )}

          {/* ======================= TAB: CUSTOMERS ======================= */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">Registered Customers ({customers.length})</h2>
                <p className="text-xs text-slate-500">Identity & Nepali driving license verification directory</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
                {/* Mobile Customer Cards (< md) */}
                <div className="md:hidden divide-y divide-slate-100">
                  {customers.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No customer accounts registered yet.
                    </div>
                  ) : (
                    customers.map((c) => (
                      <div key={c._id} className="p-4 space-y-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0755C9] font-black flex items-center justify-center text-xs">
                              {c.name ? c.name.charAt(0).toUpperCase() : 'C'}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-900">{c.name}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">{c.phone || '+977 98XXXXXXXX'}</span>
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              c.isVerified ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {c.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-slate-500 text-[11px] bg-slate-50 p-2 rounded-xl">
                          <span>Licence: <b className="font-mono text-slate-800">{c.drivingLicense?.number || '01-06-00892144'}</b></span>
                          <span className="truncate max-w-[140px]">{c.email}</span>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => handleVerifyCustomer(c._id, c.isVerified)}
                            className="px-3 py-1.5 min-h-[36px] rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 text-slate-700"
                          >
                            {c.isVerified ? 'Revoke Verification' : 'Verify Licence'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Desktop Tabular View (md:) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-black text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Email / Phone</th>
                        <th className="py-3 px-4">Driving License</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customers.map((c) => (
                        <tr key={c._id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                          <td className="py-3 px-4 text-slate-600">{c.email}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                            {c.drivingLicense?.number || '01-06-00892144'}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                c.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {c.isVerified ? 'Verified' : 'Pending Review'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleVerifyCustomer(c._id, c.isVerified)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-100"
                            >
                              {c.isVerified ? 'Revoke' : 'Verify'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB: PAYMENTS ======================= */}
          {activeTab === 'payments' && (
            <PaymentManagement />
          )}

          {/* ======================= TAB: MAINTENANCE ======================= */}
          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Maintenance & Inspection Logs</h2>
                  <p className="text-xs text-slate-500">Service schedules, bluebook renewal, and insurance tracking</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs">
                  <Wrench className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="font-black">Routine 40,000 km Service Due:</span> Toyota Hiace (BA 04 KHA 1099) scheduled for brake inspection tomorrow.
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-xs">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="font-black">All 42 Fleet Vehicles Insured:</span> Comprehensive commercial insurance valid until Dec 2027.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB: SETTINGS & OTHER TABS ======================= */}
          {(activeTab === 'settings' ||
            activeTab === 'pricing' ||
            activeTab === 'coupons' ||
            activeTab === 'reports' ||
            activeTab === 'reviews' ||
            activeTab === 'categories' ||
            activeTab === 'partners' ||
            activeTab === 'notifications') && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-[#0755C9]" />
                <h2 className="text-base font-black text-slate-900">{TAB_TITLES[activeTab]}</h2>
              </div>
              <p className="text-xs text-slate-600">
                Configure rental parameters, tax/VAT rates, eSewa merchant keys, notification webhooks, and driver allowances.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <label className="font-bold text-slate-700 block mb-1">Currency Code</label>
                  <input
                    type="text"
                    readOnly
                    value="NPR (Nepalese Rupee - रु)"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <label className="font-bold text-slate-700 block mb-1">eSewa Merchant Code</label>
                  <input
                    type="text"
                    readOnly
                    value="EPAYTEST"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono text-slate-900"
                  />
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <label className="font-bold text-slate-700 block mb-1">Standard Driver Allowance</label>
                  <input
                    type="text"
                    readOnly
                    value="NPR 1,500 / day"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <label className="font-bold text-slate-700 block mb-1">Kathmandu 24/7 Helpline</label>
                  <input
                    type="text"
                    readOnly
                    value="+977 1 4428901 / 9841892011"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      <AddVehicleModal
        isOpen={showAddVehicleModal}
        onClose={() => setShowAddVehicleModal(false)}
        onVehicleAdded={handleVehicleCreated}
      />
      <AddDriverModal
        isOpen={showAddDriverModal}
        onClose={() => setShowAddDriverModal(false)}
        onSubmit={handleAddDriver}
      />
      <BookingDetailModal
        isOpen={!!selectedBookingForDetail}
        booking={selectedBookingForDetail}
        onClose={() => setSelectedBookingForDetail(null)}
        onUpdateStatus={handleUpdateBookingStatus}
      />
    </div>
  );
};

export default AdminDashboard;
