import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtext,
  change,
  trend = 'up',
  icon: Icon,
  colorScheme = 'blue',
  prefix,
}) => {
  const colorMap = {
    blue: {
      iconBg: 'bg-blue-50 text-[#0755C9] border-blue-100',
      badge: 'bg-blue-50 text-[#0755C9]',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'bg-emerald-50 text-emerald-700',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: 'bg-amber-50 text-amber-700',
    },
    violet: {
      iconBg: 'bg-violet-50 text-violet-600 border-violet-100',
      badge: 'bg-violet-50 text-violet-700',
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      badge: 'bg-rose-50 text-rose-700',
    },
    cyan: {
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      badge: 'bg-cyan-50 text-cyan-700',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.blue;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-soft hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group">
      {/* Top Row: Title & Themed Icon */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {title}
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            {prefix && (
              <span className="text-xs sm:text-sm font-extrabold text-slate-500">
                {prefix}
              </span>
            )}
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {value}
            </span>
          </div>
        </div>

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0 ${scheme.iconBg}`}
        >
          {Icon && <Icon className="w-5 h-5 stroke-[2.2]" />}
        </div>
      </div>

      {/* Bottom Row: Trend and Subtext */}
      <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-500">
        <div className="flex items-center gap-1">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                trend === 'up'
                  ? 'bg-emerald-50 text-emerald-700'
                  : trend === 'down'
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3 h-3 stroke-[2.5]" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 stroke-[2.5]" />}
              {trend === 'neutral' && <Minus className="w-3 h-3" />}
              <span>{change}</span>
            </span>
          )}
          <span className="truncate">{subtext || 'vs last month'}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
