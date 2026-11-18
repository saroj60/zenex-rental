import React from 'react';
import {
  CalendarCheck,
  CreditCard,
  Car,
  UserCheck,
  Wrench,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const TYPE_ICONS = {
  booking: {
    icon: CalendarCheck,
    bg: 'bg-blue-50 text-[#0755C9] border-blue-100',
  },
  payment: {
    icon: CreditCard,
    bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  vehicle: {
    icon: Car,
    bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  customer: {
    icon: UserCheck,
    bg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  },
  maintenance: {
    icon: Wrench,
    bg: 'bg-amber-50 text-amber-600 border-amber-100',
  },
};

const RecentActivityFeed = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Recent Activity
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Live administrative log of fleet updates and transactions
            </p>
          </div>
          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            Real-time
          </span>
        </div>

        {/* Activity Timeline List */}
        <div className="relative mt-4 space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 -z-0" />

          {activities.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              No recent activity recorded.
            </div>
          ) : (
            activities.map((item) => {
              const meta = TYPE_ICONS[item.type] || TYPE_ICONS.booking;
              const Icon = meta.icon;

              return (
                <div key={item.id} className="relative z-10 flex items-start gap-3 group">
                  {/* Icon Node */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-2xs flex-shrink-0 transition-transform group-hover:scale-110 ${meta.bg}`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium flex-shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-50 text-center">
        <button
          type="button"
          className="text-[11px] font-bold text-[#0755C9] hover:underline inline-flex items-center gap-1"
        >
          <span>View Audit History Log</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;
