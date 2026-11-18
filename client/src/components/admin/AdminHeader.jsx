import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CheckCheck,
  CalendarCheck,
  CreditCard,
  Wrench,
  Sparkles,
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New Booking #NCR-10458',
    description: 'Saroj booked Hyundai Creta for Kathmandu → Pokhara',
    time: '5m ago',
    unread: true,
    icon: CalendarCheck,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: 'n2',
    title: 'Payment Received (NPR 17,000)',
    description: 'eSewa transaction verified successfully',
    time: '28m ago',
    unread: true,
    icon: CreditCard,
    color: 'text-emerald-500 bg-emerald-50',
  },
  {
    id: 'n3',
    title: 'Maintenance Alert',
    description: 'Toyota Hiace BA 04 KHA 1099 scheduled for service',
    time: '2h ago',
    unread: true,
    icon: Wrench,
    color: 'text-amber-500 bg-amber-50',
  },
];

const AdminHeader = ({
  activeTabTitle = 'Dashboard Overview',
  activeTab = 'dashboard',
  searchQuery,
  setSearchQuery,
  onOpenMobileSidebar,
  user,
  onLogout,
  onSwitchToCustomer,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationsList, setNotificationsList] = useState(NOTIFICATIONS);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notificationsList.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-700 hover:text-[#0755C9] rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
              {activeTabTitle}
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-bold text-[#0755C9] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Nepal Fleet
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-slate-400 font-semibold -mt-0.5">
            Overview & management for Kathmandu, Pokhara & outstation rentals
          </p>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden md:flex items-center max-w-xs xl:max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search bookings, vehicles, customers..."
            className="w-full bg-[#F5F8FC] border border-slate-200 rounded-xl pl-9 pr-14 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0755C9] focus:bg-white transition-all"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shadow-2xs">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Tools: Customer App Switcher, Notifications, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Switch to Customer App Pill */}
        <button
          type="button"
          onClick={onSwitchToCustomer}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-[#0755C9] text-xs font-extrabold transition-all border border-blue-200/60 shadow-2xs"
        >
          <span>Customer App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Notifications Icon with Interactive Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-700 hover:text-[#0755C9] hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Notifications</h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {unreadCount} new alerts
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-[#0755C9] hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto no-scrollbar">
                {notificationsList.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      className={`p-3.5 hover:bg-slate-50 transition-colors flex gap-3 items-start cursor-pointer ${
                        notif.unread ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-xl flex-shrink-0 ${notif.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-xs text-slate-900 truncate">
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium flex-shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {notif.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <span className="text-[11px] font-bold text-[#0755C9] hover:underline cursor-pointer">
                  View all system logs →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            {/* Avatar with online green status */}
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0755C9] to-blue-400 flex items-center justify-center text-white font-black text-sm shadow-2xs overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                  alt="Saroj Bhagat"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span>SB</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>

            <div className="hidden sm:block leading-tight">
              <div className="font-black text-xs text-slate-900 flex items-center gap-1">
                <span>Saroj Bhagat</span>
              </div>
              <span className="text-[10px] font-bold text-[#0755C9] bg-blue-50 px-1.5 py-0.2 rounded">
                Super Admin
              </span>
            </div>

            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <div className="font-black text-sm text-slate-900">Saroj Bhagat</div>
                <div className="text-xs text-slate-500 font-medium truncate">
                  admin@nepalcarrental.com
                </div>
                <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Full Administrative Access</span>
                </div>
              </div>

              <div className="py-1 text-xs font-semibold text-slate-700">
                <button
                  type="button"
                  onClick={onSwitchToCustomer}
                  className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-left text-[#0755C9]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Switch to Customer App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-left"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Rental Business Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full px-4 py-2 hover:bg-rose-50 flex items-center gap-2.5 text-left text-xs font-bold text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
