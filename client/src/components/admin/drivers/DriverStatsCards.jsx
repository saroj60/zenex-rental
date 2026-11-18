import React from 'react';
import {
  Users,
  UserCheck,
  Car,
  UserX,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';

const DriverStatsCards = ({ stats, activeFilter, onSelectStatus }) => {
  const cards = [
    {
      id: 'all',
      title: 'Total Drivers',
      value: stats?.totalDrivers || 0,
      subtext: 'Registered chauffeurs',
      icon: Users,
      badgeBg: 'bg-blue-50 text-[#0755C9] border-blue-200',
      activeRing: 'ring-2 ring-[#0755C9] bg-blue-50/40',
      iconBg: 'bg-blue-600 text-white',
    },
    {
      id: 'available',
      title: 'Available Drivers',
      value: stats?.availableDrivers || 0,
      subtext: 'Ready for trip dispatch',
      icon: UserCheck,
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeRing: 'ring-2 ring-emerald-500 bg-emerald-50/40',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'assigned_all',
      title: 'Assigned Drivers',
      value: stats?.assignedDrivers || 0,
      subtext: 'Assigned or on trip',
      icon: Car,
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      activeRing: 'ring-2 ring-indigo-500 bg-indigo-50/40',
      iconBg: 'bg-indigo-600 text-white',
    },
    {
      id: 'unavailable',
      title: 'Unavailable Drivers',
      value: stats?.unavailableDrivers || 0,
      subtext: 'Off duty or leave',
      icon: UserX,
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      activeRing: 'ring-2 ring-rose-500 bg-rose-50/40',
      iconBg: 'bg-rose-600 text-white',
    },
    {
      id: 'verification_pending',
      title: 'Pending Licence Verification',
      value: stats?.pendingLicenceVerification || 0,
      subtext: 'Requires document check',
      icon: FileCheck,
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      activeRing: 'ring-2 ring-amber-500 bg-amber-50/40',
      iconBg: 'bg-amber-500 text-white',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
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

export default DriverStatsCards;
