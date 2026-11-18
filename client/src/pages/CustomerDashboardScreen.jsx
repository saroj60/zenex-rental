import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import CustomerBookingDetailsModal from '../components/customer/CustomerBookingDetailsModal';
import BookingReceiptModal from '../components/checkout/BookingReceiptModal';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  FileText,
  Star,
  User,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Car,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Upload,
  Search,
  Filter,
  Printer,
  RotateCcw,
  MessageSquare,
  Phone,
  Mail,
  Send,
  Lock,
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

export default function CustomerDashboardScreen() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout, switchUser } = useAuth();

  // Active section tab from URL or default to 'overview'
  const tabParam = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(tabParam);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync tab with URL
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
    setMobileDrawerOpen(false);
  };

  // ==========================================
  // STATE: SECTION DATA
  // ==========================================
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingFilterStatus, setBookingFilterStatus] = useState('all');
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingPage, setBookingPage] = useState(1);
  const [totalBookingPages, setTotalBookingPages] = useState(1);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState(null);
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState(null);

  // Payments state
  const [payments, setPayments] = useState([]);

  // Documents state
  const [documents, setDocuments] = useState(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docUploadSuccess, setDocUploadSuccess] = useState('');

  // Reviews state
  const [reviewsData, setReviewsData] = useState({ myReviews: [], eligibleBookings: [] });
  const [reviewFormData, setReviewFormData] = useState({ vehicleId: '', bookingId: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  // Profile state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address?.fullAddress || '',
    avatar: user?.avatar || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  // Support state
  const [supportForm, setSupportForm] = useState({ subject: '', bookingId: '', message: '' });
  const [submittingSupport, setSubmittingSupport] = useState(false);
  const [supportSuccessMsg, setSupportSuccessMsg] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Initial Data Fetch
  const fetchDashboardData = async () => {
    try {
      const [dashRes, notifRes] = await Promise.all([
        api.get('/customer/dashboard'),
        api.get('/customer/notifications'),
      ]);
      setDashboardData(dashRes.data.data);
      setNotifications(notifRes.data.data || []);
      setUnreadNotifCount(notifRes.data.unreadCount || 0);

      // Preload profile
      if (dashRes.data.data?.customer) {
        const c = dashRes.data.data.customer;
        setProfileForm((prev) => ({
          ...prev,
          name: c.name || prev.name,
          phone: c.phone || prev.phone,
          address: c.address?.fullAddress || prev.address,
          avatar: c.avatar || prev.avatar,
        }));
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch Bookings when tab is active or search/status changes
  const fetchCustomerBookings = async () => {
    try {
      const params = {
        status: bookingFilterStatus,
        search: bookingSearch,
        page: bookingPage,
        limit: 8,
      };
      const res = await api.get('/customer/bookings', { params });
      setBookings(res.data.data || []);
      setTotalBookingPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to load customer bookings:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'bookings' || activeTab === 'overview') {
      fetchCustomerBookings();
    }
  }, [activeTab, bookingFilterStatus, bookingSearch, bookingPage]);

  // Fetch Payments when active
  useEffect(() => {
    if (activeTab === 'payments') {
      api.get('/customer/payments')
        .then((res) => setPayments(res.data.data || []))
        .catch((err) => console.error(err));
    }
  }, [activeTab]);

  // Fetch Documents when active
  useEffect(() => {
    if (activeTab === 'documents') {
      api.get('/customer/documents')
        .then((res) => setDocuments(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [activeTab]);

  // Fetch Reviews when active
  useEffect(() => {
    if (activeTab === 'reviews') {
      api.get('/customer/reviews')
        .then((res) => setReviewsData(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [activeTab]);

  // Handle Document Upload
  const handleDocUpload = async (file, docType) => {
    if (!file) return;
    setUploadingDoc(true);
    setDocUploadSuccess('');

    try {
      const formData = new FormData();
      formData.append('document', file);
      const uploadRes = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadRes.data.success) {
        const payload = {};
        if (docType === 'drivingLicense') {
          payload.drivingLicense = {
            fileUrl: uploadRes.data.fileUrl,
          };
        } else {
          payload.citizenshipOrPassport = {
            fileUrl: uploadRes.data.fileUrl,
          };
        }

        await api.post('/customer/documents', payload);
        setDocUploadSuccess(`${docType === 'drivingLicense' ? 'Driving licence' : 'National ID'} submitted for review.`);
        const refreshed = await api.get('/customer/documents');
        setDocuments(refreshed.data.data);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload document. Please verify file is under 5MB.');
    } finally {
      setUploadingDoc(false);
    }
  };

  // Submit Review Handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewFormData.vehicleId || !reviewFormData.comment.trim()) {
      alert('Please select a completed rental vehicle and provide feedback.');
      return;
    }

    setSubmittingReview(true);
    setReviewSuccessMsg('');
    try {
      const res = await api.post('/customer/reviews', reviewFormData);
      if (res.data.success) {
        setReviewSuccessMsg('Your review has been published. Thank you!');
        setReviewFormData({ vehicleId: '', bookingId: '', rating: 5, comment: '' });
        const refreshed = await api.get('/customer/reviews');
        setReviewsData(refreshed.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Save Profile Handler
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg({ type: '', text: '' });

    if (profileForm.newPassword) {
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        setProfileMsg({ type: 'error', text: 'New passwords do not match.' });
        setSavingProfile(false);
        return;
      }
      if (!profileForm.currentPassword) {
        setProfileMsg({ type: 'error', text: 'Current password is required to change password.' });
        setSavingProfile(false);
        return;
      }
    }

    try {
      const res = await api.put('/customer/profile', {
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        avatar: profileForm.avatar,
        currentPassword: profileForm.currentPassword || undefined,
        newPassword: profileForm.newPassword || undefined,
      });

      if (res.data.success) {
        setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
        setProfileForm((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      }
    } catch (err) {
      setProfileMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Mark all notifications read
  const handleMarkAllNotifsRead = async () => {
    try {
      await api.patch('/customer/notifications/mark-all-read');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadNotifCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Support Ticket Handler
  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    if (!supportForm.subject.trim() || !supportForm.message.trim()) return;

    setSubmittingSupport(true);
    setSupportSuccessMsg('');
    try {
      const res = await api.post('/customer/support', supportForm);
      if (res.data.success) {
        setSupportSuccessMsg(`Support ticket ${res.data.ticketId} created! Our fleet team will follow up.`);
        setSupportForm({ subject: '', bookingId: '', message: '' });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit support request.');
    } finally {
      setSubmittingSupport(false);
    }
  };

  // Sidebar Menu Items
  const MENU_ITEMS = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'My Bookings', icon: Calendar, badge: dashboardData?.stats?.totalBookings },
    { id: 'payments', label: 'Payment History', icon: CreditCard },
    { id: 'documents', label: 'My Documents', icon: FileText },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifCount },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  const FAQS = [
    {
      q: 'Can I extend my rental while on the road in Nepal?',
      a: 'Yes! Simply call our 24/7 fleet control desk at +977 01-4422334 at least 12 hours before your scheduled return time. We will verify vehicle schedule and adjust your booking at the standard daily rate.',
    },
    {
      q: 'How does the self-drive security deposit refund work?',
      a: 'For self-drive bookings, the refundable deposit (NPR 25,000) is released back to your eSewa, Khalti, or bank account within 24 to 48 hours after our depot technicians complete post-trip inspection.',
    },
    {
      q: 'What should I do if the vehicle suffers a puncture or breakdown?',
      a: 'All Nepal Car Rental vehicles include 24/7 highway breakdown assistance. Contact our emergency dispatch desk immediately. We have certified service mechanics in Kathmandu, Pokhara, Chitwan, and major highway points.',
    },
    {
      q: 'Can I take the rental vehicle to high-altitude routes like Mustang or Manang?',
      a: 'Yes, but high-altitude overland routes require a dedicated 4WD SUV (e.g. Toyota Fortuner or Scorpio 4x4) and prior notification for route documentation and altitude equipment check.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      
      {/* Top Banner / Mobile Nav Trigger */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-[#10243A]">
                Customer Dashboard
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-blue-100 text-[#0755C9]">
                Nepal Fleet
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cars"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0755C9] text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-xs"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Explore Cars</span>
            </Link>

            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name || 'Customer'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name || 'Saroj'}</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================================================== */}
          {/* LEFT SIDEBAR (Desktop) / DRAWER (Mobile) */}
          {/* ==================================================== */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-1 sticky top-28">
            <div className="p-3 mb-2 pb-4 border-b border-slate-100 flex items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt="Avatar"
                className="w-10 h-10 rounded-2xl object-cover ring-2 ring-blue-100"
              />
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-900 truncate">{user?.name || 'Saroj Bhagat'}</p>
                <p className="text-[11px] text-slate-400 font-mono truncate">{user?.phone || '+977 9841892011'}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0755C9] text-white shadow-md shadow-blue-600/25 font-black'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isActive ? 'bg-white text-[#0755C9]' : 'bg-blue-50 text-[#0755C9]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Mobile Drawer */}
          {mobileDrawerOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setMobileDrawerOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] bg-white h-full p-5 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <span className="text-sm font-black text-slate-900">Account Menu</span>
                    <button
                      type="button"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-1">
                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTabChange(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                            isActive
                              ? 'bg-[#0755C9] text-white shadow-sm'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-800">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* RIGHT CONTENT AREA (9 Cols) */}
          {/* ==================================================== */}
          <main className="lg:col-span-9 space-y-6">

            {/* SECTION 1: DASHBOARD OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-[#10243A] via-[#0D3B75] to-[#0755C9] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200/50">
                  <div className="relative z-10 max-w-xl space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Namaste, Welcome Back
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {user?.name || 'Saroj Bhagat'}
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Manage your car reservations, chauffeur dispatches, payment vouchers, and document verifications across Nepal routes.
                    </p>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* 4 Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      Total Bookings
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-[#10243A]">
                      {dashboardData?.stats?.totalBookings ?? 8}
                    </p>
                    <span className="text-[10px] text-blue-600 font-bold">All-time rentals</span>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      Upcoming
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-600">
                      {dashboardData?.stats?.upcomingBookings ?? 4}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold">Ready for dispatch</span>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      Active On Road
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-blue-600">
                      {dashboardData?.stats?.activeRentals ?? 1}
                    </p>
                    <span className="text-[10px] text-blue-600 font-bold">Currently ongoing</span>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      Completed
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-slate-700">
                      {dashboardData?.stats?.completedRentals ?? 1}
                    </p>
                    <span className="text-[10px] text-slate-400 font-bold">Returned safely</span>
                  </div>
                </div>

                {/* Latest Booking Highlight */}
                {dashboardData?.latestBooking && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#0755C9]" />
                        <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                          Latest Vehicle Reservation
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {dashboardData.latestBooking.status}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-36 h-24 bg-slate-50 rounded-2xl flex items-center justify-center p-2 overflow-hidden border border-slate-100">
                        <img
                          src={dashboardData.latestBooking.vehicle?.images?.[0] || '/cars/creta.png'}
                          alt={dashboardData.latestBooking.vehicle?.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="font-mono text-xs font-black text-[#0755C9]">
                            {dashboardData.latestBooking.bookingId}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs font-semibold text-slate-600 capitalize">
                            {dashboardData.latestBooking.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}
                          </span>
                        </div>
                        <h3 className="text-base font-black text-slate-900">
                          {dashboardData.latestBooking.vehicle?.name || 'Rental Car'}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Route: {dashboardData.latestBooking.pickupLocation?.name} → {dashboardData.latestBooking.dropoffLocation?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Dates: {new Date(dashboardData.latestBooking.startDate).toLocaleDateString()} to {new Date(dashboardData.latestBooking.endDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setSelectedBookingForDetails(dashboardData.latestBooking)}
                          className="px-4 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-bold text-center transition-all cursor-pointer shadow-xs"
                        >
                          View Details & Timeline
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedBookingForReceipt(dashboardData.latestBooking)}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center transition-colors cursor-pointer"
                        >
                          Invoice Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent In-App Notifications Feed */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#0755C9]" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Recent Activity Notifications
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTabChange('notifications')}
                      className="text-xs font-bold text-[#0755C9] hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((n) => (
                      <div
                        key={n._id}
                        className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 ${
                          n.isRead ? 'bg-slate-50/60 border-slate-100' : 'bg-blue-50/50 border-blue-200'
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#0755C9] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{n.title}</p>
                          <p className="text-slate-500 text-[11px] mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SECTION 2: MY BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black text-[#10243A]">My Booking Reservations</h2>
                    <p className="text-xs text-slate-500">Manage all your self-drive and chauffeur trips.</p>
                  </div>
                  <Link
                    to="/cars"
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>New Reservation</span>
                  </Link>
                </div>

                {/* Filter Tabs & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                    {['all', 'pending', 'confirmed', 'ongoing', 'completed', 'cancelled', 'rejected'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          setBookingFilterStatus(st);
                          setBookingPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                          bookingFilterStatus === st
                            ? 'bg-[#0755C9] text-white shadow-2xs font-black'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={bookingSearch}
                      onChange={(e) => {
                        setBookingSearch(e.target.value);
                        setBookingPage(1);
                      }}
                      placeholder="Search booking ID / city..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white focus:border-[#0755C9] outline-none"
                    />
                  </div>
                </div>

                {/* Bookings Cards List */}
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">No bookings found</p>
                      <p className="text-xs text-slate-400">
                        {bookingFilterStatus !== 'all'
                          ? `No bookings with status "${bookingFilterStatus}".`
                          : 'You do not have any vehicle bookings matching this search.'}
                      </p>
                    </div>
                  ) : (
                    bookings.map((b) => (
                      <div
                        key={b._id}
                        className="p-5 rounded-2xl border border-slate-200/90 hover:border-blue-200 transition-all bg-white shadow-2xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-[#0755C9]">
                              {b.bookingId}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs font-semibold text-slate-600 capitalize">
                              {b.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : b.status === 'ongoing'
                                  ? 'bg-blue-50 text-[#0755C9] border border-blue-200'
                                  : b.status === 'completed'
                                  ? 'bg-slate-100 text-slate-700'
                                  : b.status === 'cancelled'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {b.status}
                            </span>

                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                b.paymentStatus === 'paid'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {b.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          <div className="sm:col-span-3 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 overflow-hidden border border-slate-100">
                            <img
                              src={b.vehicle?.images?.[0] || '/cars/creta.png'}
                              alt={b.vehicle?.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="sm:col-span-5 space-y-1 text-xs">
                            <h4 className="font-extrabold text-slate-900 text-sm">
                              {b.vehicle?.name || 'Rental Car'}
                            </h4>
                            <p className="text-slate-500">
                              {b.pickupLocation?.name} → {b.dropoffLocation?.name}
                            </p>
                            <p className="text-slate-400 text-[11px]">
                              {new Date(b.startDate).toLocaleDateString()} to {new Date(b.endDate).toLocaleDateString()} ({b.durationDays || 2} Days)
                            </p>
                          </div>

                          <div className="sm:col-span-4 flex flex-col sm:items-end justify-center space-y-2">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Payable</span>
                              <span className="text-base font-black text-[#0755C9] font-mono">
                                NPR {(b.totalAmount || b.pricingBreakdown?.grandTotal || 0).toLocaleString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedBookingForDetails(b)}
                                className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#0755C9] hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedBookingForReceipt(b)}
                                className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                title="Download Receipt"
                              >
                                <Printer className="w-4 h-4 text-[#0755C9]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {totalBookingPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                      type="button"
                      disabled={bookingPage <= 1}
                      onClick={() => setBookingPage((p) => p - 1)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40"
                    >
                      Prev
                    </button>
                    <span className="text-xs font-bold text-slate-600">
                      Page {bookingPage} of {totalBookingPages}
                    </span>
                    <button
                      type="button"
                      disabled={bookingPage >= totalBookingPages}
                      onClick={() => setBookingPage((p) => p + 1)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* SECTION 3: PAYMENT HISTORY */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-black text-[#10243A]">Payment Transaction Logs</h2>
                  <p className="text-xs text-slate-500">Track all digital wallet and cash transactions.</p>
                </div>

                {payments.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No payment transactions recorded yet.
                  </div>
                ) : (
                  <>
                    {/* Mobile Payment Cards (< md) */}
                    <div className="md:hidden space-y-3">
                      {payments.map((p) => (
                        <div
                          key={p._id}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-800 text-[11px] truncate max-w-[180px]">
                              {p.transactionId}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                p.status === 'paid' || p.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : p.status === 'refunded'
                                  ? 'bg-purple-50 text-purple-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {p.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-slate-500 text-[11px]">
                            <span>
                              Booking: <b className="text-[#0755C9] font-mono">{p.booking?.bookingId || 'NCR-10458'}</b>
                            </span>
                            <span className="uppercase font-bold text-slate-700">{p.paymentMethod || 'Cash'}</span>
                          </div>

                          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
                            <span className="text-slate-400 text-[10px]">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                            <span className="font-mono font-black text-slate-900 text-xs">
                              NPR {(p.amount || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Tabular View (md:) */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-black tracking-wider text-[10px]">
                          <tr>
                            <th className="py-3 px-4 rounded-l-xl">Transaction ID</th>
                            <th className="py-3 px-4">Booking Ref</th>
                            <th className="py-3 px-4">Method</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 rounded-r-xl text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {payments.map((p) => (
                            <tr key={p._id} className="hover:bg-slate-50/60">
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                                {p.transactionId}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-[#0755C9]">
                                {p.booking?.bookingId || 'NCR-10458'}
                              </td>
                              <td className="py-3.5 px-4 uppercase text-[11px] font-bold text-slate-600">
                                {p.paymentMethod || 'Cash'}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                                NPR {(p.amount || 0).toLocaleString()}
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                    p.status === 'paid' || p.status === 'completed'
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : p.status === 'refunded'
                                      ? 'bg-purple-50 text-purple-700'
                                      : 'bg-amber-50 text-amber-700'
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right text-slate-400">
                                {new Date(p.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* SECTION 4: MY DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-black text-[#10243A]">Regulatory Driving & Identity Documents</h2>
                  <p className="text-xs text-slate-500">Government documents required for self-drive and tourist fleet rentals.</p>
                </div>

                {docUploadSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{docUploadSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Driving Licence Card */}
                  <div className="p-5 rounded-3xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">Driving Licence</h4>
                          <span className="text-[10px] text-slate-400">Nepal DoTM / IDP</span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          documents?.drivingLicense?.status === 'Verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : documents?.drivingLicense?.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {documents?.drivingLicense?.status || 'Verified'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-1 font-mono">
                      <span className="text-[10px] text-slate-400 block uppercase">Licence Number</span>
                      <p className="font-bold text-slate-800">{documents?.drivingLicense?.number || '01-06-00892144'}</p>
                    </div>

                    <div>
                      <label className="w-full py-2.5 px-3 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-slate-400" />
                        <span>{uploadingDoc ? 'Uploading...' : 'Replace / Upload Licence (JPG/PDF)'}</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          onChange={(e) => handleDocUpload(e.target.files[0], 'drivingLicense')}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Citizenship / Passport Card */}
                  <div className="p-5 rounded-3xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">National Identification</h4>
                          <span className="text-[10px] text-slate-400">{documents?.citizenshipOrPassport?.docType || 'Citizenship'}</span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          documents?.citizenshipOrPassport?.status === 'Verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : documents?.citizenshipOrPassport?.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {documents?.citizenshipOrPassport?.status || 'Verified'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-1 font-mono">
                      <span className="text-[10px] text-slate-400 block uppercase">Document Number</span>
                      <p className="font-bold text-slate-800">{documents?.citizenshipOrPassport?.number || '27-01-78-01928'}</p>
                    </div>

                    <div>
                      <label className="w-full py-2.5 px-3 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-slate-400" />
                        <span>{uploadingDoc ? 'Uploading...' : 'Replace / Upload Document (JPG/PDF)'}</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          onChange={(e) => handleDocUpload(e.target.files[0], 'citizenship')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: MY REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-black text-[#10243A]">Trip Reviews & Ratings</h2>
                  <p className="text-xs text-slate-500">Rate completed vehicles and help fellow travelers in Nepal.</p>
                </div>

                {reviewSuccessMsg && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{reviewSuccessMsg}</span>
                  </div>
                )}

                {/* Submit New Review Form (if eligible completed trips exist) */}
                {reviewsData.eligibleBookings?.length > 0 ? (
                  <form onSubmit={handleReviewSubmit} className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Write Review for Completed Trip
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Select Vehicle <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={reviewFormData.vehicleId}
                          onChange={(e) => setReviewFormData({ ...reviewFormData, vehicleId: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                        >
                          <option value="">Choose completed vehicle...</option>
                          {reviewsData.eligibleBookings.map((b) => (
                            <option key={b._id} value={b.vehicle?._id}>
                              {b.vehicle?.name} ({b.bookingId})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Star Rating (1 to 5)
                        </label>
                        <div className="flex items-center gap-1.5 pt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                              className="p-1 cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= reviewFormData.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Your Feedback & Experience <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewFormData.comment}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
                        placeholder="Share your driving experience, vehicle condition, or chauffeur professionalism..."
                        className="w-full p-3 bg-white rounded-xl border border-slate-200 text-xs outline-none focus:border-[#0755C9]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-5 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {submittingReview ? 'Submitting...' : 'Publish Verified Review'}
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs text-blue-800">
                    You do not have any unreviewed completed rentals at this time. Reviews unlock after a trip is completed!
                  </div>
                )}

                {/* Published Reviews History */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    My Previously Published Reviews
                  </h4>
                  {reviewsData.myReviews?.length === 0 ? (
                    <p className="text-xs text-slate-400">No reviews published yet.</p>
                  ) : (
                    reviewsData.myReviews?.map((r) => (
                      <div key={r._id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-slate-900">{r.vehicle?.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(r.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic">"{r.comment}"</p>
                        <span className="text-[10px] text-slate-400 block">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SECTION 6: MY PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-black text-[#10243A]">Profile & Security Settings</h2>
                  <p className="text-xs text-slate-500">Update personal contact details and change password.</p>
                </div>

                {profileMsg.text && (
                  <div
                    className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
                      profileMsg.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}
                  >
                    {profileMsg.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{profileMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#0755C9]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone (Nepal)</label>
                      <input
                        type="tel"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 outline-none focus:bg-white focus:border-[#0755C9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Residential Address</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="e.g. Thamel, Kathmandu, Nepal"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#0755C9]"
                    />
                  </div>

                  {/* Password Change Sub-section */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                      Change Account Password
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Current Password</label>
                        <input
                          type="password"
                          value={profileForm.currentPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                          placeholder="Current password"
                          className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:border-[#0755C9]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">New Password</label>
                        <input
                          type="password"
                          value={profileForm.newPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                          placeholder="Min 6 characters"
                          className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:border-[#0755C9]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={profileForm.confirmPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                          placeholder="Repeat new password"
                          className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:border-[#0755C9]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {savingProfile ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* SECTION 7: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black text-[#10243A]">Notification Center</h2>
                    <p className="text-xs text-slate-500">Trip updates, payment receipts, and compliance alerts.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleMarkAllNotifsRead}
                    className="text-xs font-bold text-[#0755C9] hover:underline"
                  >
                    Mark All as Read
                  </button>
                </div>

                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <p className="py-8 text-center text-xs text-slate-400">No notifications in your inbox.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        className={`p-4 rounded-2xl border text-xs flex items-start gap-3.5 transition-colors ${
                          n.isRead ? 'bg-white border-slate-100' : 'bg-blue-50/50 border-blue-200'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            n.isRead ? 'bg-slate-300' : 'bg-[#0755C9]'
                          }`}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="font-extrabold text-slate-900">{n.title}</p>
                          <p className="text-slate-600 text-xs leading-relaxed">{n.message}</p>
                          <span className="text-[10px] text-slate-400 block">
                            {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SECTION 8: HELP & SUPPORT */}
            {activeTab === 'support' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-black text-[#10243A]">Customer Help & 24/7 Roadside Support</h2>
                  <p className="text-xs text-slate-500">Get in touch with our operations team or browse quick answers.</p>
                </div>

                {/* 24/7 Helpline Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs space-y-1">
                    <Phone className="w-4 h-4 text-[#0755C9]" />
                    <p className="font-bold text-slate-900">Direct Operations Desk</p>
                    <a href="tel:+977014422334" className="font-mono text-[#0755C9] font-bold block">
                      +977 01-4422334
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <p className="font-bold text-slate-900">WhatsApp Road Assistance</p>
                    <a href="https://wa.me/9779801234567" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold block">
                      Chat on WhatsApp
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <Mail className="w-4 h-4 text-slate-600" />
                    <p className="font-bold text-slate-900">Official Email</p>
                    <a href="mailto:support@nepalcarrental.com" className="text-slate-600 font-mono block truncate">
                      support@nepalcarrental.com
                    </a>
                  </div>
                </div>

                {/* Submit Support Ticket Form */}
                <form onSubmit={handleSupportSubmit} className="p-5 rounded-3xl border border-slate-200 bg-slate-50/60 space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    Submit Inquiry or Request Assistance
                  </h4>

                  {supportSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold">
                      {supportSuccessMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Inquiry Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                        placeholder="e.g. Schedule extension, Airport pickup gate change..."
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-[#0755C9]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Related Booking Reference (Optional)
                      </label>
                      <select
                        value={supportForm.bookingId}
                        onChange={(e) => setSupportForm({ ...supportForm, bookingId: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono font-bold"
                      >
                        <option value="">None / General Inquiry</option>
                        {bookings.map((b) => (
                          <option key={b._id} value={b.bookingId}>
                            {b.bookingId} ({b.vehicle?.name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Detailed Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      placeholder="Please explain how our fleet operations team can help..."
                      className="w-full p-3 bg-white rounded-xl border border-slate-200 text-xs outline-none focus:border-[#0755C9]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingSupport}
                    className="px-5 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingSupport ? 'Submitting...' : 'Submit Support Request'}</span>
                  </button>
                </form>

                {/* FAQ Accordion */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Frequently Asked Questions (FAQ)
                  </h4>
                  <div className="space-y-2">
                    {FAQS.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <span>{faq.q}</span>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>
      </div>

      {/* Booking Details Modal */}
      <CustomerBookingDetailsModal
        isOpen={!!selectedBookingForDetails}
        onClose={() => setSelectedBookingForDetails(null)}
        booking={selectedBookingForDetails}
        onBookingCancelled={() => {
          fetchCustomerBookings();
          fetchDashboardData();
        }}
        onOpenReceipt={(b) => setSelectedBookingForReceipt(b)}
      />

      {/* Tax Invoice / Receipt Modal */}
      <BookingReceiptModal
        isOpen={!!selectedBookingForReceipt}
        onClose={() => setSelectedBookingForReceipt(null)}
        booking={selectedBookingForReceipt}
      />
    </div>
  );
}
