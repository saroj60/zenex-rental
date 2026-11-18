import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Layers,
  Building2,
  UserCheck,
  Users,
  CreditCard,
  Percent,
  Wrench,
  Star,
  Tag,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react';

const MENU_GROUPS = [
  {
    label: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'FLEET & BOOKINGS',
    items: [
      { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: '12' },
      { id: 'vehicles', label: 'Vehicles', icon: Car, badge: '42' },
      { id: 'categories', label: 'Categories', icon: Layers },
      { id: 'partners', label: 'Rental Partners', icon: Building2 },
      { id: 'drivers', label: 'Drivers', icon: UserCheck, badge: '18' },
    ],
  },
  {
    label: 'CUSTOMERS & FINANCE',
    items: [
      { id: 'customers', label: 'Customers', icon: Users },
      { id: 'payments', label: 'Payments', icon: CreditCard },
      { id: 'pricing', label: 'Pricing', icon: Percent },
      { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: '1', badgeColor: 'bg-amber-500' },
    ],
  },
  {
    label: 'MARKETING & SYSTEM',
    items: [
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'coupons', label: 'Coupons', icon: Tag },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3', badgeColor: 'bg-rose-500' },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  onLogout,
  onSwitchToCustomer,
  vehiclesCount = 6,
  bookingsCount = 12,
  driversCount = 18,
}) => {
  const getBadgeValue = (item) => {
    if (item.id === 'vehicles') return String(vehiclesCount);
    if (item.id === 'bookings') return String(bookingsCount);
    if (item.id === 'drivers') return String(driversCount);
    return item.badge;
  };
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col bg-[#10243A] text-slate-300 transition-all duration-300 shadow-2xl border-r border-[#1B3550] ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1B3550] flex-shrink-0">
          {!collapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#0755C9] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                  Nepal Car Rental
                </span>
                <span className="text-[10px] font-extrabold text-blue-400 tracking-wider uppercase">
                  Admin Panel
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="w-9 h-9 rounded-xl bg-[#0755C9] flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
          )}

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups with Smooth Scrolling */}
        <nav className="flex-1 overflow-y-auto py-2.5 px-2.5 space-y-3 scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent">
          {MENU_GROUPS.map((group) => (
            <div key={group.label} className="space-y-0.5">
              {!collapsed && (
                <div className="px-3 pt-1.5 pb-1 text-[9px] font-black uppercase tracking-widest text-slate-400 select-none">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileOpen(false);
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all relative group ${
                      isActive
                        ? 'bg-[#0755C9] text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-[#16304D]'
                    }`}
                  >
                    {/* Active Left Accent Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full" />
                    )}

                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        isActive ? 'scale-110 text-white' : 'text-slate-400 group-hover:text-blue-300'
                      }`}
                    />

                    {!collapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}

                    {!collapsed && getBadgeValue(item) && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                          item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-[#1E3B5E] text-blue-300')
                        }`}
                      >
                        {getBadgeValue(item)}
                      </span>
                    )}

                    {/* Tooltip when collapsed */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Pinned Footer: Customer App & Logout */}
        <div className="p-2 border-t border-[#1B3550] space-y-1 flex-shrink-0 bg-[#0E1E30]">
          <button
            type="button"
            onClick={onSwitchToCustomer}
            title={collapsed ? 'Customer App' : undefined}
            className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-300 hover:text-white hover:bg-[#16304D] transition-colors"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0 text-blue-400" />
            {!collapsed && <span className="truncate">Customer App</span>}
          </button>

          <button
            type="button"
            onClick={onLogout}
            title={collapsed ? 'Logout' : undefined}
            className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-900/30 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0 text-rose-400" />
            {!collapsed && <span>Logout</span>}
          </button>

          {/* Desktop Collapse Toggle */}
          <div className="hidden lg:flex items-center justify-end pt-1">
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#16304D] transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
