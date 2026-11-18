import React from 'react';
import {
  CreditCard,
  DollarSign,
  Clock,
  RotateCcw,
  Calendar,
  AlertCircle,
  TrendingUp,
  Receipt,
} from 'lucide-react';

const PaymentStatsCards = ({ stats, activeFilter, onSelectStatus }) => {
  const cards = [
    {
      id: 'total_revenue',
      title: 'Total Revenue (Net)',
      prefix: 'NPR',
      value: stats?.totalRevenue || 0,
      subtext: 'Gross collected minus refunds',
      icon: TrendingUp,
      color: 'blue',
      badgeBg: 'bg-blue-50 text-[#0755C9] border-blue-200',
      activeRing: 'ring-2 ring-[#0755C9] bg-blue-50/40',
      iconBg: 'bg-blue-600 text-white',
    },
    {
      id: 'paid',
      title: 'Total Collected',
      prefix: 'NPR',
      value: stats?.totalCollected || 0,
      subtext: 'All settled transactions',
      icon: CreditCard,
      color: 'emerald',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeRing: 'ring-2 ring-emerald-500 bg-emerald-50/40',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'pending',
      title: 'Pending Payments',
      prefix: 'NPR',
      value: stats?.pendingPayments || 0,
      subtext: 'Vouchers & clearance pending',
      icon: Clock,
      color: 'amber',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      activeRing: 'ring-2 ring-amber-500 bg-amber-50/40',
      iconBg: 'bg-amber-500 text-white',
    },
    {
      id: 'refunds',
      title: 'Total Refunds',
      prefix: 'NPR',
      value: stats?.refunds || 0,
      subtext: 'Settled customer refunds',
      icon: RotateCcw,
      color: 'purple',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      activeRing: 'ring-2 ring-purple-500 bg-purple-50/40',
      iconBg: 'bg-purple-600 text-white',
    },
    {
      id: 'today',
      title: "Today's Collection",
      prefix: 'NPR',
      value: stats?.todayCollection || 0,
      subtext: 'Received since midnight',
      icon: Calendar,
      color: 'cyan',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      activeRing: 'ring-2 ring-cyan-500 bg-cyan-50/40',
      iconBg: 'bg-cyan-600 text-white',
    },
    {
      id: 'outstanding',
      title: 'Outstanding Balance',
      prefix: 'NPR',
      value: stats?.outstandingAmount || 0,
      subtext: 'Remaining booking dues',
      icon: AlertCircle,
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase text-slate-400 font-mono">
                {card.prefix}
              </span>
              <div className="text-xl font-black text-slate-900 tracking-tight font-mono">
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

export default PaymentStatsCards;
