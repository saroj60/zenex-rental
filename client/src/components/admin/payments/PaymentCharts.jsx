import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const formatNPR = (val) => {
  if (val >= 1000000) return `NPR ${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `NPR ${(val / 1000).toFixed(0)}k`;
  return `NPR ${val}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700 font-sans">
        <p className="font-bold text-slate-300">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-400 capitalize">{entry.name}:</span>
            <strong className="font-mono text-white">NPR {entry.value?.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PaymentCharts = ({
  monthlyRevenue = [],
  dailyCollections = [],
  paymentMethodDistribution = [],
  statusDistribution = [],
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Monthly Revenue Analytics */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Monthly Revenue & Net Inflows
            </h3>
            <p className="text-xs text-slate-400">
              Gross collection vs net after refunds across Nepal regions
            </p>
          </div>
          <span className="text-[10px] font-black uppercase text-[#0755C9] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Monthly P&L
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0755C9" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0755C9" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickFormatter={formatNPR} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={65} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="gross" name="Gross Inflow" stroke="#0755C9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGross)" />
              <Area type="monotone" dataKey="net" name="Net Revenue" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNet)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Daily Collections Breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Daily Collections (Last 7 Days)
            </h3>
            <p className="text-xs text-slate-400">
              Receipt volume & real-time counter collections
            </p>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Live Gateway Inflow
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyCollections} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickFormatter={formatNPR} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={65} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" name="Collected Amount" fill="#0755C9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Payment Method Distribution */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Payment Method Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Share of eSewa, Khalti, Fonepay, Cash & Bank Wire
            </p>
          </div>
          <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Channel Share
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 pt-2">
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodDistribution}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {paymentMethodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {paymentMethodDistribution.map((m) => (
              <div key={m.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="font-bold text-slate-700">{m.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 block">
                    NPR {m.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {m.count} txns
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Successful vs Pending / Refunded / Failed Status Breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Transaction Clearance & Lifecycle
            </h3>
            <p className="text-xs text-slate-400">
              Cleared payments vs pending verification & refunded orders
            </p>
          </div>
          <span className="text-[10px] font-black uppercase text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
            Success Rate: 92%
          </span>
        </div>

        <div className="h-56 w-full flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statusDistribution}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 35, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} width={120} />
              <Tooltip />
              <Bar dataKey="count" name="Transactions Count" radius={[0, 6, 6, 0]}>
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PaymentCharts;
