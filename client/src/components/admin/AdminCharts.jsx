import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Car,
  PieChart as PieIcon,
  BarChart2,
  Calendar,
} from 'lucide-react';

// Custom Tooltip for NPR Currency
const CurrencyTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-800">
        <p className="font-bold text-slate-300 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="font-extrabold flex items-center gap-1.5" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span>NPR {Number(entry.value).toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for General Counts
const CountTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-800">
        <p className="font-bold text-slate-300 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="font-extrabold flex items-center gap-1.5" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span>{entry.value} bookings</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminCharts = ({
  monthlyRevenue = [],
  bookingTrends = [],
  vehicleCategories = [],
  bookingStatusDistribution = [],
}) => {
  // Format Y-axis in Lakhs/Thousands for clean display
  const formatYAxisNPR = (value) => {
    if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* 1. Monthly Revenue Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0755C9]"></span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Monthly Revenue (NPR)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Gross rental income collected over the last 7 months
            </p>
          </div>
          <span className="text-[10px] font-extrabold text-[#0755C9] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            NPR 15.04L YTD
          </span>
        </div>

        <div className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0755C9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0755C9" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickFormatter={formatYAxisNPR} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip content={<CurrencyTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#0755C9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorTarget)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Weekly Booking Trends (With Driver vs Self Drive) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Booking Trends (Driver vs Self Drive)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Weekly reservation distribution by driver requirement
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <span className="flex items-center gap-1 text-[#0755C9]">
              <span className="w-2 h-2 rounded-full bg-[#0755C9]"></span> With Driver
            </span>
            <span className="flex items-center gap-1 text-sky-500">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span> Self Drive
            </span>
          </div>
        </div>

        <div className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip content={<CountTooltip />} />
              <Bar dataKey="withDriver" name="With Driver" fill="#0755C9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="selfDrive" name="Self Drive" fill="#38BDF8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Vehicle Categories Donut Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Vehicle Categories Fleet Share
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Total 42 vehicles deployed across Nepal regions
            </p>
          </div>
          <span className="text-[10px] font-extrabold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100">
            5 Categories
          </span>
        </div>

        <div className="h-64 pt-2 flex flex-col sm:flex-row items-center justify-center relative">
          <div className="w-full sm:w-1/2 h-48 sm:h-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleCategories}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={76}
                  paddingAngle={4}
                >
                  {vehicleCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name, item) => [
                    `${val} vehicles (${item.payload.percentage || '20'}%)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Donut Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">42</span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">Vehicles</span>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="w-full sm:w-1/2 space-y-1.5 px-2">
            {vehicleCategories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></span>
                  <span className="font-semibold text-slate-700">{cat.name}</span>
                </div>
                <div className="font-black text-slate-900">
                  {cat.count} <span className="text-[10px] text-slate-400 font-normal">({cat.percentage || '20'}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Booking Status Distribution */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Booking Status Distribution
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Current lifecycle breakdown of all 189 active & past bookings
            </p>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            96% Completion
          </span>
        </div>

        <div className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bookingStatusDistribution}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#0F172A', fontWeight: 600 }}
                width={75}
              />
              <Tooltip
                formatter={(val, name) => [`${val} bookings`, name]}
                contentStyle={{ borderRadius: 12, backgroundColor: '#0F172A', color: '#fff', fontSize: 12 }}
              />
              <Bar dataKey="count" name="Bookings" radius={[0, 6, 6, 0]}>
                {bookingStatusDistribution.map((entry, index) => (
                  <Cell key={`status-cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
