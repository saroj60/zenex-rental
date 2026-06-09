import React from 'react';
import { Users, Car, MapPin, Package, DollarSign, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useCurrency } from '../../context/CurrencyContext';

const AdminOverview = () => {
  const navigate = useNavigate();
  const { vehicles, bookings } = useAppData();
  const { formatPrice } = useCurrency();

  const totalRevenue = bookings.reduce((acc, curr) => {
    // Basic extraction of numeric value from formatted amount string (e.g. '$325')
    const val = parseFloat(curr.amount.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const activeBookings = bookings.length;
  const availableVehicles = vehicles.filter(v => v.urgency !== 'Maintenance').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{formatPrice(totalRevenue || 24500)}</h3>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +12% this month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0">
            <CalendarIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Bookings</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{activeBookings}</h3>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> View recent below</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Car size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Available Fleet</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{availableVehicles}/{vehicles.length}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Total operational vehicles</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-2xl font-extrabold text-gray-900">1,204</h3>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +48 this week</p>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-extrabold text-[#1e3a8a] mb-6">Recent Bookings</h2>
          <div className="space-y-4">
            {bookings.slice(-4).reverse().map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    {b.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{b.id}</h4>
                    <p className="text-sm text-gray-500">{b.customer} • {b.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{b.status}</span>
                  <p className="text-sm font-bold text-gray-900">{b.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-extrabold text-[#1e3a8a] mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button onClick={() => navigate('/admin/fleet')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#EA580C] hover:bg-orange-50 transition-colors group">
              <span className="font-bold text-gray-700 group-hover:text-[#EA580C]">Add New Vehicle</span>
              <Car size={18} className="text-gray-400 group-hover:text-[#EA580C]" />
            </button>
            <button onClick={() => navigate('/admin/destinations')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group">
              <span className="font-bold text-gray-700 group-hover:text-blue-600">Manage Destinations</span>
              <MapPin size={18} className="text-gray-400 group-hover:text-blue-600" />
            </button>
            <button onClick={() => navigate('/admin/packages')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group">
              <span className="font-bold text-gray-700 group-hover:text-blue-600">Create Package</span>
              <Package size={18} className="text-gray-400 group-hover:text-blue-600" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOverview;
