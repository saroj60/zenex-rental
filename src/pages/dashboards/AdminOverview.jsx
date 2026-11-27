import React, { useState } from 'react';
import { Users, Car, MapPin, Package, DollarSign, TrendingUp, Calendar as CalendarIcon, CalendarCheck, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useCurrency } from '../../context/CurrencyContext';
import {
  buildConfirmationMailto,
  buildConfirmationWhatsAppUrl,
  getBookingCustomerEmail
} from '../../utils/bookingConfirmation';

const AdminOverview = () => {
  const navigate = useNavigate();
  const { vehicles, bookings, updateBooking, sendBookingConfirmation } = useAppData();
  const { formatPrice } = useCurrency();
  const [sendingId, setSendingId] = useState(null);
  const [notice, setNotice] = useState(null);

  const totalRevenue = bookings.reduce((acc, curr) => {
    // Basic extraction of numeric value from formatted amount string (e.g. '$325')
    const val = parseFloat(curr.amount.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const activeBookings = bookings.length;
  const availableVehicles = vehicles.filter(v => v.status !== 'Maintenance').length;
  const totalUsers = new Set(bookings.map(b => b.customer)).size;

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
            <h3 className="text-2xl font-extrabold text-gray-900">{formatPrice(totalRevenue)}</h3>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +12% this month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#e53a24] flex items-center justify-center shrink-0">
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
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#e53a24] flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{totalUsers}</h3>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +48 this week</p>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#1e3a8a]">Recent Bookings</h2>
              <p className="text-xs text-slate-500 mt-0.5">Confirm or review recently placed customer bookings.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard/bookings')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              Manage All Bookings <ArrowRight size={14} />
            </button>
          </div>

          {notice && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold flex items-center justify-between">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice(null)} className="ml-3 text-blue-600 hover:text-blue-900 cursor-pointer">×</button>
            </div>
          )}

          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                No bookings placed yet.
              </div>
            ) : (
              bookings.slice(-5).reverse().map((b) => {
                const customerName = b.customer || (b.customerDetails ? `${b.customerDetails.firstName || ''} ${b.customerDetails.lastName || ''}`.trim() : '') || 'Guest';
                const itemName = b.itemName || b.vehicle || 'Tour / Trek Package';
                const isPending = String(b.status || 'pending').toLowerCase() === 'pending';
                const isConfirmed = String(b.status || '').toLowerCase() === 'confirmed';

                return (
                  <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">{b.id}</h4>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isConfirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.status || 'Pending'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{customerName} • {itemName}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <p className="text-sm font-extrabold text-gray-900">{b.amount}</p>
                      
                      {isPending ? (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (updateBooking) {
                              await updateBooking(b.id, { ...b, status: 'Confirmed' });
                            }
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer select-none"
                          title="Click to Confirm this Booking"
                        >
                          <CheckCircle2 size={13} /> Confirm
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 flex items-center gap-1">
                          <CheckCircle2 size={13} /> Confirmed
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSendingId(b.id);
                          setNotice(null);
                          try {
                            const confirmed = isConfirmed ? b : { ...b, status: 'Confirmed' };
                            if (!isConfirmed && updateBooking) {
                              await updateBooking(b.id, confirmed);
                            }
                            const res = sendBookingConfirmation ? await sendBookingConfirmation(confirmed) : { emailSent: false };
                            const mailtoUrl = buildConfirmationMailto(confirmed);
                            const whatsappUrl = buildConfirmationWhatsAppUrl(confirmed);
                            if (res?.emailSent) {
                              setNotice(`Confirmation email sent to ${getBookingCustomerEmail(confirmed) || 'customer'}.`);
                            } else if (mailtoUrl) {
                              window.location.href = mailtoUrl;
                              setNotice(`Opened email draft for ${getBookingCustomerEmail(confirmed)}.`);
                            } else if (whatsappUrl) {
                              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                              setNotice('Opened WhatsApp to send confirmation.');
                            } else {
                              setNotice('No customer email or phone number found on this booking.');
                            }
                          } finally {
                            setSendingId(null);
                          }
                        }}
                        disabled={sendingId === b.id}
                        className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        title="Send booking confirmation to customer"
                      >
                        <Send size={12} /> {sendingId === b.id ? 'Sending...' : 'Send'}
                      </button>

                      <button
                        onClick={() => navigate('/dashboard/bookings')}
                        className="text-xs text-slate-400 hover:text-blue-600 p-1"
                        title="View in Bookings Management"
                      >
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-extrabold text-[#1e3a8a] mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button onClick={() => navigate('/dashboard/bookings')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50 transition-colors group cursor-pointer">
              <span className="font-bold text-gray-700 group-hover:text-emerald-700">Manage Bookings</span>
              <CalendarCheck size={18} className="text-gray-400 group-hover:text-emerald-600" />
            </button>
            <button onClick={() => navigate('/dashboard/fleet')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#e53a24] hover:bg-orange-50 transition-colors group cursor-pointer">
              <span className="font-bold text-gray-700 group-hover:text-[#e53a24]">Add New Vehicle</span>
              <Car size={18} className="text-gray-400 group-hover:text-[#e53a24]" />
            </button>
            <button onClick={() => navigate('/dashboard/destinations')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group cursor-pointer">
              <span className="font-bold text-gray-700 group-hover:text-blue-600">Manage Destinations</span>
              <MapPin size={18} className="text-gray-400 group-hover:text-blue-600" />
            </button>
            <button onClick={() => navigate('/dashboard/packages')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group cursor-pointer">
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
