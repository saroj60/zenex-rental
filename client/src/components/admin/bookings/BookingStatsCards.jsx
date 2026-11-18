import React from 'react';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Car,
  CheckCheck,
  XCircle,
  TrendingUp,
} from 'lucide-react';

const BookingStatsCards = ({ stats, activeFilter, onSelectStatus }) => {
  const cards = [
    {
      id: 'all',
      title: 'Total Bookings',
      value: stats?.total || 0,
      subtext: 'All-time reservations',
      icon: CalendarCheck,
      color: 'blue',
      badgeBg: 'bg-blue-50 text-[#0755C9] border-blue-200',
      activeRing: 'ring-2 ring-[#0755C9] bg-blue-50/40',
      iconBg: 'bg-blue-600 text-white',
    },
    {
      id: 'pending',
      title: 'Pending Bookings',
      value: stats?.pending || 0,
      subtext: 'Awaiting admin review',
      icon: Clock,
      color: 'amber',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      activeRing: 'ring-2 ring-amber-500 bg-amber-50/40',
      iconBg: 'bg-amber-500 text-white',
    },
    {
      id: 'confirmed',
      title: 'Confirmed Bookings',
      value: stats?.confirmed || 0,
      subtext: 'Vehicles locked & ready',
      icon: CheckCircle2,
      color: 'emerald',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeRing: 'ring-2 ring-emerald-500 bg-emerald-50/40',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'ongoing',
      title: 'Ongoing Rentals',
      value: stats?.ongoing || 0,
      subtext: 'Currently on the road',
      icon: Car,
      color: 'indigo',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      activeRing: 'ring-2 ring-indigo-500 bg-indigo-50/40',
      iconBg: 'bg-indigo-600 text-white',
    },
    {
      id: 'completed',
      title: 'Completed Bookings',
      value: stats?.completed || 0,
      subtext: 'Returned & finalized',
      icon: CheckCheck,
      color: 'slate',
      badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
      activeRing: 'ring-2 ring-slate-600 bg-slate-50/60',
      iconBg: 'bg-slate-700 text-white',
    },
    {
      id: 'cancelled',
      title: 'Cancelled Bookings',
      value: stats?.cancelled || 0,
      subtext: 'Customer or admin void',
      icon: XCircle,
      color: 'rose',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      activeRing: 'ring-2 ring-rose-500 bg-rose-50/40',
      iconBg: 'bg-rose-600 text-white',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectStatus(card.id)}
            className={`text-left p-4 rounded-2xl bg-white border border-slate-100 shadow-soft transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
              isActive ? card.activeRing : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {card.value.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                {card.subtext}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BookingStatsCards;
