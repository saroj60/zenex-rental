import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Car, CalendarDays, Heart, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const BottomNavigation = () => {
  const { favorites } = useBooking();
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/cars', label: 'Cars', icon: Car },
    { to: '/bookings', label: 'Bookings', icon: CalendarDays },
    { to: '/favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 pb-safe px-3 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.to === '/' && (location.pathname === '/home' || location.pathname === ''));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#0755C9] font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 ${isActive ? 'font-bold text-[#0755C9]' : 'font-medium'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
