import React from 'react';
import {
  Car,
  CalendarCheck,
  UserPlus,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const QuickActionsBar = ({
  onAddVehicle,
  onViewBookings,
  onAddDriver,
  onViewCustomers,
}) => {
  const actions = [
    {
      id: 'add-vehicle',
      title: 'Add Vehicle',
      description: 'Register a new car, SUV, or Hiace',
      icon: Car,
      color: 'bg-blue-50 text-[#0755C9] group-hover:bg-[#0755C9] group-hover:text-white',
      badge: 'Fleet',
      onClick: onAddVehicle,
    },
    {
      id: 'view-bookings',
      title: 'View Bookings',
      description: 'Manage 189 active reservations',
      icon: CalendarCheck,
      color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      badge: '12 Active',
      onClick: onViewBookings,
    },
    {
      id: 'add-driver',
      title: 'Add Driver',
      description: 'Onboard a licensed Nepal chauffeur',
      icon: UserPlus,
      color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
      badge: 'Chauffeur',
      onClick: onAddDriver,
    },
    {
      id: 'view-customers',
      title: 'View Customers',
      description: 'Check verifications & bookings',
      icon: Users,
      color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      badge: '1,249 Users',
      onClick: onViewCustomers,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0755C9]"></span>
            <h3 className="font-black text-slate-900 text-sm sm:text-base">
              Quick Actions
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
            Frequent fleet operations and management workflows
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="p-4 rounded-2xl border border-slate-200/70 bg-[#F8FAFC] hover:bg-white hover:border-[#0755C9]/30 hover:shadow-md transition-all text-left flex items-start justify-between group cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {act.badge}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-[#0755C9] transition-colors">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {act.description}
                </p>
              </div>

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${act.color}`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionsBar;
