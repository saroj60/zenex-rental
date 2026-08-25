import React, { useState } from 'react';
import { Search, Filter, MoreVertical, CalendarCheck, Trash2, Plus, Edit2, X } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useAppData } from '../../context/AppDataContext';

const BookingsAdmin = () => {
  const { formatPrice } = useCurrency();
  const { bookings, deleteBooking, addBooking, updateBooking, vehicles, packages } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({
    id: '', customer: '', type: 'Vehicle', vehicle: '', dates: '', amount: '', status: 'Pending', date: ''
  });

  const formatBookingDates = (dates) => {
    if (!dates) return '';
    if (typeof dates === 'object') {
      if (dates.start && dates.end) {
        if (dates.start === dates.end) return dates.start;
        return `${dates.start} - ${dates.end}`;
      }
      return '';
    }
    return dates;
  };

  const filteredBookings = bookings.filter(b => b.customer.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentBooking({ id: '', customer: '', type: 'Vehicle', vehicle: '', dates: '', amount: '', status: 'Pending', date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (booking) => {
    setIsEditMode(true);
    // Normalize dates to string for input edit compatibility
    setCurrentBooking({
      ...booking,
      dates: formatBookingDates(booking.dates)
    });
    setIsModalOpen(true);
  };

  const handleSaveBooking = (e) => {
    e.preventDefault();
    
    // Convert dates back to object structure { start, end } for DB schema consistency
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
      dates: finalDates
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Bookings Management</h1>
        <button onClick={handleOpenAddModal} className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary transition flex items-center gap-2">
          <Plus size={16} /> Add Booking
        </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-tint overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-himalayan-blue" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Booked Item</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-himalayan-blue">{b.id}</td>
                  <td className="px-6 py-4 font-bold">{b.customer}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${b.type === 'Tour' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {b.type === 'Tour' ? 'Tour Package' : 'Car Rental'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{b.vehicle}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{formatBookingDates(b.dates)}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{b.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                      b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      b.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOpenEditModal(b)} className="text-himalayan-blue hover:text-blue-700 transition-colors p-2 mr-2">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteBooking(b.id)} className="text-sunset-orange hover:text-red-700 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/30 text-xs text-on-surface-variant text-center bg-surface-container-low">
          Showing {filteredBookings.length} bookings
        </div>
      </div>

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
                    <input type="text" required value={currentBooking.customer} onChange={e => setCurrentBooking({...currentBooking, customer: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. John Doe" />
                  </div>
                  
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Booking Type</label>
                    <select value={currentBooking.type || 'Vehicle'} onChange={e => setCurrentBooking({...currentBooking, type: e.target.value, vehicle: ''})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                      <option value="Vehicle">Car Rental</option>
                      <option value="Tour">Tour Package</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Booked Item Name</label>
                    <input type="text" list="item-options" required value={currentBooking.vehicle} onChange={e => setCurrentBooking({...currentBooking, vehicle: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder={currentBooking.type === 'Tour' ? "e.g. Annapurna Circuit Jeep Rental" : "e.g. Toyota Fortuner"} />
                    <datalist id="item-options">
                      {currentBooking.type === 'Tour' 
                        ? packages?.map(p => <option key={p.id} value={p.title} />)
                        : vehicles?.map(v => <option key={v.id} value={v.name} />)
                      }
                    </datalist>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Start Date</label>
                    <input type="date" required 
                      onChange={e => {
                        const date = new Date(e.target.value);
                        const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const existingDates = currentBooking.dates.split(' - ');
                        const endDate = existingDates[1] || formatted;
                        setCurrentBooking({...currentBooking, dates: `${formatted} - ${endDate}`});
                      }} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">End Date</label>
                    <input type="date" required 
                      onChange={e => {
                        const date = new Date(e.target.value);
                        const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const existingDates = currentBooking.dates.split(' - ');
                        const startDate = existingDates[0] || formatted;
                        setCurrentBooking({...currentBooking, dates: `${startDate} - ${formatted}`});
                      }} 
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Dates Preview</label>
                    <input type="text" readOnly value={currentBooking.dates} className="w-full border rounded-lg p-2.5 text-sm outline-none bg-gray-50 text-gray-500" placeholder="e.g. Oct 15 - Oct 20" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Amount (NPR)</label>
                    <input type="number" required min="0" value={currentBooking.amount.replace(/[^0-9.]/g, '')} onChange={e => setCurrentBooking({...currentBooking, amount: `NPR ${e.target.value}`})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. 15000" />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Status</label>
                    <select value={currentBooking.status} onChange={e => setCurrentBooking({...currentBooking, status: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
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
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button type="submit" form="bookingForm" className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition">Save Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsAdmin;
