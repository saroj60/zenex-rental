import React, { useState } from 'react';
import { Search, Filter, CalendarCheck, Trash2, Plus, Edit2, X, RefreshCw, Eye, User, Mail, Phone, Globe, Shield, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useAppData } from '../../context/AppDataContext';

const BookingsAdmin = () => {
  const { formatPrice } = useCurrency();
  const { bookings = [], deleteBooking, addBooking, updateBooking, refreshBookings, vehicles = [], packages = [], treks = [] } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewDetailsBooking, setViewDetailsBooking] = useState(null);

  const [currentBooking, setCurrentBooking] = useState({
    id: '', 
    customer: '', 
    type: 'Tour', 
    vehicle: '', 
    dates: '', 
    amount: '', 
    status: 'Pending', 
    date: ''
  });

  const getCustomerName = (b) => {
    if (b?.customer && typeof b.customer === 'string') return b.customer;
    if (b?.customerDetails) {
      const name = `${b.customerDetails.firstName || ''} ${b.customerDetails.lastName || ''}`.trim();
      if (name) return name;
    }
    return 'Guest';
  };

  const getItemName = (b) => b?.itemName || b?.vehicle || b?.title || 'Tour / Trek Package';
  const getItemType = (b) => {
    const raw = b?.itemCategory || b?.type || '';
    if (!raw) return 'Tour Package';
    if (raw.toLowerCase().includes('trek')) return 'Trek';
    if (raw.toLowerCase().includes('tour')) return 'Tour Package';
    if (raw.toLowerCase().includes('vehicle')) return 'Car Rental';
    return raw;
  };
  const getCustomerEmail = (b) => b?.customerDetails?.email || b?.email || '';
  const getCustomerPhone = (b) => b?.customerDetails?.phone || b?.customerDetails?.whatsapp || b?.phone || '';

  const formatBookingDates = (dates) => {
    if (!dates) return 'N/A';
    if (typeof dates === 'object') {
      if (dates.start && dates.end && dates.start !== dates.end) {
        return `${dates.start} - ${dates.end}`;
      }
      return dates.start || dates.end || dates.duration || 'Flexible';
    }
    return String(dates);
  };

  const handleRefresh = async () => {
    if (refreshBookings) {
      setIsRefreshing(true);
      await refreshBookings();
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const filteredBookings = (bookings || []).filter(b => {
    if (!b) return false;
    const term = searchTerm.toLowerCase();
    const customer = getCustomerName(b).toLowerCase();
    const id = String(b.id || '').toLowerCase();
    const item = getItemName(b).toLowerCase();
    const email = getCustomerEmail(b).toLowerCase();
    const type = getItemType(b).toLowerCase();
    const status = String(b.status || 'Pending').toLowerCase();

    const matchesSearch = customer.includes(term) || id.includes(term) || item.includes(term) || email.includes(term);
    const matchesType = filterType === 'All' || type.includes(filterType.toLowerCase());
    const matchesStatus = filterStatus === 'All' || status === filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentBooking({ 
      id: '', 
      customer: '', 
      type: 'Tour', 
      vehicle: '', 
      dates: '', 
      amount: '', 
      status: 'Pending', 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (booking) => {
    setIsEditMode(true);
    setCurrentBooking({
      ...booking,
      customer: getCustomerName(booking),
      vehicle: getItemName(booking),
      type: getItemType(booking),
      dates: formatBookingDates(booking.dates),
      status: booking.status || 'Pending'
    });
    setIsModalOpen(true);
  };

  const handleSaveBooking = (e) => {
    e.preventDefault();
    
    let finalDates = { start: '', end: '' };
    if (typeof currentBooking.dates === 'string') {
      const parts = currentBooking.dates.split(' - ');
      finalDates.start = parts[0] ? parts[0].trim() : '';
      finalDates.end = parts[1] ? parts[1].trim() : finalDates.start;
    } else if (currentBooking.dates) {
      finalDates = currentBooking.dates;
    }

    const bookingToSave = {
      ...currentBooking,
      customer: currentBooking.customer,
      itemName: currentBooking.vehicle,
      vehicle: currentBooking.vehicle,
      type: currentBooking.type,
      dates: finalDates,
      status: currentBooking.status
    };

    if (isEditMode) {
      updateBooking(currentBooking.id, bookingToSave);
    } else {
      addBooking(bookingToSave);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Bookings Management</h1>
          <p className="text-xs text-slate-500 mt-1">Review, manage, and update package and rental bookings submitted on Zenex Travels.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRefresh}
            title="Refresh bookings" 
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition shadow-xs flex items-center gap-1.5 text-xs font-semibold"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-blue-600' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button 
            onClick={handleOpenAddModal} 
            className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold shadow hover:bg-primary transition flex items-center gap-1.5"
          >
            <Plus size={16} /> Add Booking
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-tint overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-surface-container-low">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={17} />
            <input 
              type="text" 
              placeholder="Search by customer, email, booking ID, or package..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-xs md:text-sm focus:outline-none focus:border-himalayan-blue" 
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="All">All Types</option>
              <option value="Trek">Trek Packages</option>
              <option value="Tour">Tour Packages</option>
              <option value="Car">Car Rentals</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant/30">
              <tr>
                <th className="px-5 py-3.5">Booking ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Booked Package / Item</th>
                <th className="px-5 py-3.5">Dates / Travelers</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    No bookings found matching your search.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const statusNormalized = String(b.status || 'Pending').toLowerCase();
                  const typeNormalized = getItemType(b);

                  return (
                    <tr key={b.id} className="hover:bg-surface/50 transition-colors">
                      {/* ID */}
                      <td className="px-5 py-4 font-mono font-bold text-himalayan-blue text-xs whitespace-nowrap">
                        {b.id}
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 leading-snug">{getCustomerName(b)}</div>
                        {getCustomerEmail(b) && (
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail size={11} className="text-slate-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{getCustomerEmail(b)}</span>
                          </div>
                        )}
                        {getCustomerPhone(b) && (
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone size={11} className="text-slate-400 shrink-0" />
                            <span>{getCustomerPhone(b)}</span>
                          </div>
                        )}
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          typeNormalized.toLowerCase().includes('trek') ? 'bg-amber-100 text-amber-800' :
                          typeNormalized.toLowerCase().includes('tour') ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {typeNormalized}
                        </span>
                      </td>

                      {/* Booked Item */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800 text-sm max-w-xs">{getItemName(b)}</div>
                        {b.paymentOption && (
                          <div className="text-[11px] text-slate-400 mt-0.5 capitalize">
                            Payment: {b.paymentOption.replace('-', ' ')}
                          </div>
                        )}
                      </td>

                      {/* Dates */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-slate-700 text-xs font-medium">{formatBookingDates(b.dates)}</div>
                        {b.travelersCount && (
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {b.travelersCount} traveler(s)
                          </div>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">
                        {b.amount || 'N/A'}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            statusNormalized === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            statusNormalized === 'pending' ? 'bg-amber-100 text-amber-800' :
                            statusNormalized === 'completed' ? 'bg-blue-100 text-blue-700' :
                            statusNormalized === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {b.status || 'Pending'}
                          </span>

                          {statusNormalized === 'pending' && (
                            <button
                              onClick={() => updateBooking(b.id, { ...b, status: 'Confirmed' })}
                              className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                              title="Click to confirm booking"
                            >
                              <CheckCircle2 size={11} /> Confirm
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => setViewDetailsBooking(b)} 
                          title="View complete booking details"
                          className="text-slate-500 hover:text-blue-700 transition-colors p-1.5 mr-1"
                        >
                          <Eye size={17} />
                        </button>
                        <button 
                          onClick={() => handleOpenEditModal(b)} 
                          title="Edit booking"
                          className="text-himalayan-blue hover:text-blue-700 transition-colors p-1.5 mr-1"
                        >
                          <Edit2 size={17} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete booking ${b.id}?`)) {
                              deleteBooking(b.id);
                            }
                          }} 
                          title="Delete booking"
                          className="text-sunset-orange hover:text-red-700 transition-colors p-1.5"
                        >
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/30 text-xs text-on-surface-variant text-center bg-surface-container-low">
          Showing {filteredBookings.length} of {bookings.length} total bookings
        </div>
      </div>

      {/* View Full Booking Details Modal */}
      {viewDetailsBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low shrink-0">
              <div>
                <span className="text-xs font-bold text-himalayan-blue uppercase tracking-wider">Booking Details</span>
                <h2 className="text-xl font-bold text-slate-800">{viewDetailsBooking.id}</h2>
              </div>
              <button onClick={() => setViewDetailsBooking(null)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-5">
              {/* Trip Item Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                      {getItemType(viewDetailsBooking)}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1.5">{getItemName(viewDetailsBooking)}</h3>
                  </div>
                  <span className="text-base font-extrabold text-emerald-700">{viewDetailsBooking.amount}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  <div><span className="font-semibold text-slate-500">Trip Dates:</span> {formatBookingDates(viewDetailsBooking.dates)}</div>
                  <div><span className="font-semibold text-slate-500">Travelers:</span> {viewDetailsBooking.travelersCount || 1} person(s)</div>
                  <div><span className="font-semibold text-slate-500">Payment:</span> {viewDetailsBooking.paymentOption || 'Pay on Arrival'}</div>
                  <div><span className="font-semibold text-slate-500">Status:</span> <span className="font-bold capitalize">{viewDetailsBooking.status || 'Pending'}</span></div>
                </div>
              </div>

              {/* Lead Customer Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Lead Traveler Contact</h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-slate-200">
                  <div><span className="font-semibold text-slate-500 block">Name:</span> <span className="font-bold text-slate-900">{getCustomerName(viewDetailsBooking)}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Email:</span> <a href={`mailto:${getCustomerEmail(viewDetailsBooking)}`} className="text-blue-600 underline font-medium">{getCustomerEmail(viewDetailsBooking) || 'N/A'}</a></div>
                  <div><span className="font-semibold text-slate-500 block">Phone:</span> <span className="font-medium">{getCustomerPhone(viewDetailsBooking) || 'N/A'}</span></div>
                  <div><span className="font-semibold text-slate-500 block">WhatsApp:</span> <span className="font-medium">{viewDetailsBooking.customerDetails?.whatsapp || getCustomerPhone(viewDetailsBooking) || 'N/A'}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Country:</span> <span className="font-medium">{viewDetailsBooking.customerDetails?.country || 'N/A'}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Passport Number:</span> <span className="font-mono font-medium">{viewDetailsBooking.customerDetails?.passportNumber || 'N/A'}</span></div>
                </div>
              </div>

              {/* Special Requests */}
              {viewDetailsBooking.customerDetails?.extraRequirements && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Special Requests & Notes</h4>
                  <div className="text-xs bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {viewDetailsBooking.customerDetails.extraRequirements}
                  </div>
                </div>
              )}

              {/* Selected Add-ons */}
              {Array.isArray(viewDetailsBooking.selectedAddons) && viewDetailsBooking.selectedAddons.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Selected Add-ons & Extras</h4>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {viewDetailsBooking.selectedAddons.map((addon, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 text-xs bg-white">
                        <div>
                          <span className="font-bold text-slate-800">{addon.name}</span>
                          <span className="text-slate-400 block text-[11px]">US${addon.price} per unit</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[11px]">
                          Qty: {addon.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Travelers */}
              {Array.isArray(viewDetailsBooking.additionalTravelers) && viewDetailsBooking.additionalTravelers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Additional Travelers</h4>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {viewDetailsBooking.additionalTravelers.map((t, idx) => (
                      <div key={idx} className="p-3 text-xs bg-white flex justify-between items-center">
                        <div>
                          <span className="font-bold text-slate-800">{t.firstName} {t.lastName}</span>
                          {t.email && <span className="text-slate-400 block text-[11px]">{t.email}</span>}
                        </div>
                        <span className="font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100 text-[11px]">
                          {t.passportNumber || 'No passport'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 shrink-0 flex justify-between items-center gap-2 bg-slate-50">
              {String(viewDetailsBooking.status || 'pending').toLowerCase() === 'pending' ? (
                <button 
                  type="button" 
                  onClick={() => {
                    updateBooking(viewDetailsBooking.id, { ...viewDetailsBooking, status: 'Confirmed' });
                    setViewDetailsBooking({ ...viewDetailsBooking, status: 'Confirmed' });
                  }} 
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 size={15} /> Confirm This Booking
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> Booking Confirmed
                </span>
              )}

              <button 
                type="button" 
                onClick={() => setViewDetailsBooking(null)} 
                className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-300 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low shrink-0">
              <h2 className="text-xl font-bold text-himalayan-blue">{isEditMode ? 'Edit Booking' : 'Add New Booking'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="bookingForm" onSubmit={handleSaveBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Customer Name</label>
                    <input 
                      type="text" 
                      required 
                      value={currentBooking.customer} 
                      onChange={e => setCurrentBooking({...currentBooking, customer: e.target.value})} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                      placeholder="e.g. John Doe" 
                    />
                  </div>
                  
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Booking Type</label>
                    <select 
                      value={currentBooking.type || 'Tour'} 
                      onChange={e => setCurrentBooking({...currentBooking, type: e.target.value})} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue"
                    >
                      <option value="Tour">Tour Package</option>
                      <option value="Trek">Trek Package</option>
                      <option value="Vehicle">Car Rental</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Booked Package / Item Name</label>
                    <input 
                      type="text" 
                      list="item-options" 
                      required 
                      value={currentBooking.vehicle} 
                      onChange={e => setCurrentBooking({...currentBooking, vehicle: e.target.value})} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                      placeholder={currentBooking.type === 'Vehicle' ? "e.g. Toyota Fortuner" : "e.g. Annapurna Circuit Trek"} 
                    />
                    <datalist id="item-options">
                      {packages?.map(p => <option key={p.id} value={p.title} />)}
                      {treks?.map(t => <option key={t.id} value={t.title} />)}
                      {vehicles?.map(v => <option key={v.id} value={v.name} />)}
                    </datalist>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Start Date</label>
                    <input 
                      type="date" 
                      required 
                      onChange={e => {
                        const date = new Date(e.target.value);
                        const formatted = date.toISOString().split('T')[0];
                        const existingDates = (currentBooking.dates || '').split(' - ');
                        const endDate = existingDates[1] || formatted;
                        setCurrentBooking({...currentBooking, dates: `${formatted} - ${endDate}`});
                      }} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">End Date</label>
                    <input 
                      type="date" 
                      required 
                      onChange={e => {
                        const date = new Date(e.target.value);
                        const formatted = date.toISOString().split('T')[0];
                        const existingDates = (currentBooking.dates || '').split(' - ');
                        const startDate = existingDates[0] || formatted;
                        setCurrentBooking({...currentBooking, dates: `${startDate} - ${formatted}`});
                      }} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Dates Preview</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={currentBooking.dates} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none bg-gray-50 text-gray-500" 
                      placeholder="e.g. 2026-11-15 - 2026-11-20" 
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Amount (USD or NPR)</label>
                    <input 
                      type="text" 
                      required 
                      value={currentBooking.amount} 
                      onChange={e => setCurrentBooking({...currentBooking, amount: e.target.value})} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                      placeholder="e.g. US$1,950 or NPR 15,000" 
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Status</label>
                    <select 
                      value={currentBooking.status} 
                      onChange={e => setCurrentBooking({...currentBooking, status: e.target.value})} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 shrink-0 flex gap-3">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="bookingForm" 
                className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition"
              >
                Save Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsAdmin;
