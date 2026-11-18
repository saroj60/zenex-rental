import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Car, Calendar, MapPin, User, FileText } from 'lucide-react';
import NepalLogo from '../common/NepalLogo';

export default function BookingReceiptModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const bookingId = booking.bookingId || 'NCR-10460';
  const vehicle = booking.vehicle || {};
  const pricing = booking.pricingBreakdown || {};
  const customer = booking.customerDetails || {};

  const grandTotal = booking.totalAmount || pricing.grandTotal || 0;
  const paidAmount = booking.paidAmount || 0;
  const balanceAmount = Math.max(0, grandTotal - paidAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Action Header (Hidden in Print) */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Digital Tax Invoice & Booking Voucher</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-[#0755C9] uppercase">
              {booking.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0755C9] hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#0755C9]" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0 print:m-0 text-slate-800">
          
          {/* 1. Official Letterhead */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-100 gap-4">
            <div>
              <NepalLogo size="md" />
              <p className="text-[11px] text-slate-500 mt-2">
                Nepal Car Rental Pvt. Ltd. • DoTM Regd. # 48291/078<br />
                Thamel Marg, Kathmandu 44600, Nepal • PAN: 609823412
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                Booking Reference
              </span>
              <span className="text-2xl font-black text-[#0755C9] font-mono tracking-tight block">
                {bookingId}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Issued on {new Date(booking.createdAt || Date.now()).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </p>
            </div>
          </div>

          {/* 2. Customer & Rental Itinerary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Customer Information
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{customer.fullName || 'Guest Customer'}</p>
              <p className="text-slate-600 mt-0.5">{customer.email || 'customer@example.com'}</p>
              <p className="text-slate-600 font-mono">{customer.phone || '+977 98XXXXXXXX'}</p>
              <p className="text-slate-500 mt-1">{customer.address || 'Kathmandu, Nepal'}</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Rental Itinerary
              </span>
              <p className="font-extrabold text-slate-900">
                {booking.rentalType === 'self_drive' ? 'Self-Drive Rental' : 'Chauffeur Driven (With Driver)'}
              </p>
              <p className="text-slate-600 mt-0.5">
                <strong>Pickup:</strong> {booking.pickupLocation?.name || 'Kathmandu'} ({new Date(booking.startDate).toLocaleDateString()} @ {booking.pickupTime || '09:00 AM'})
              </p>
              <p className="text-slate-600 mt-0.5">
                <strong>Return:</strong> {booking.dropoffLocation?.name || 'Pokhara'} ({new Date(booking.endDate).toLocaleDateString()} @ {booking.returnTime || '06:00 PM'})
              </p>
              <p className="text-[#0755C9] font-bold mt-1">
                Duration: {booking.durationDays || 2} {(booking.durationDays || 2) === 1 ? 'Day' : 'Days'}
              </p>
            </div>
          </div>

          {/* 3. Vehicle Snapshot */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100">
            <div className="w-16 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={vehicle.images?.[0] || '/cars/creta.png'}
                alt={vehicle.name}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80';
                }}
              />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">{vehicle.name || 'Rental Vehicle'}</h4>
                <span className="font-mono text-slate-500 font-bold">{vehicle.registrationNumber || 'BA 2 PA 4892'}</span>
              </div>
              <p className="text-slate-500 mt-0.5">
                {vehicle.brand} • {vehicle.category} • {vehicle.specifications?.transmission || 'Automatic'} • {vehicle.specifications?.fuelType || 'Petrol'} • {vehicle.specifications?.seats || 5} Seats
              </p>
            </div>
          </div>

          {/* 4. Itemized Financial Table */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Payment & Charge Breakdown (NPR)
            </span>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4 text-left">Description</th>
                    <th className="py-2.5 px-4 text-right">Rate</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-4 text-slate-800">
                      Vehicle Base Rental ({booking.durationDays || 2} Days)
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-500">
                      NPR {(pricing.dailyRate || 0).toLocaleString()} / day
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-800 font-mono">
                      NPR {(pricing.baseTotal || 0).toLocaleString()}
                    </td>
                  </tr>

                  {pricing.driverAllowance > 0 && (
                    <tr>
                      <td className="py-2.5 px-4 text-slate-800">Professional Chauffeur Allowance</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-500">Included</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-800 font-mono">
                        NPR {pricing.driverAllowance.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {pricing.additionalCharges > 0 && (
                    <tr>
                      <td className="py-2.5 px-4 text-slate-800">Inter-city / Outstation Dispatch Fee</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-500">Fixed</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-800 font-mono">
                        NPR {pricing.additionalCharges.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {pricing.discountAmount > 0 && (
                    <tr className="text-emerald-700 bg-emerald-50/50">
                      <td className="py-2.5 px-4 font-bold">Coupon Promo Code Discount</td>
                      <td className="py-2.5 px-4 text-right">Special Offer</td>
                      <td className="py-2.5 px-4 text-right font-bold font-mono">
                        - NPR {pricing.discountAmount.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {pricing.securityDeposit > 0 && (
                    <tr>
                      <td className="py-2.5 px-4 text-slate-800">
                        Refundable Security Deposit (Self-Drive)
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-400 italic">Refundable</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-800 font-mono">
                        NPR {pricing.securityDeposit.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  <tr className="bg-slate-50/80 font-bold text-slate-900 border-t-2 border-slate-200">
                    <td className="py-3 px-4 text-sm font-black text-slate-900">Total Booking Value</td>
                    <td className="py-3 px-4 text-right text-slate-500 text-[11px]">VAT Included</td>
                    <td className="py-3 px-4 text-right text-sm font-black text-[#0755C9] font-mono">
                      NPR {grandTotal.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Payment Summary Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase text-slate-400 block">Total Payable</span>
              <span className="text-sm font-extrabold text-slate-900 font-mono">NPR {grandTotal.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-black uppercase text-emerald-600 block">Amount Paid</span>
              <span className="text-sm font-extrabold text-emerald-700 font-mono">NPR {paidAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
              <span className="text-[10px] font-black uppercase text-blue-600 block">Remaining Due</span>
              <span className="text-sm font-extrabold text-[#0755C9] font-mono">NPR {balanceAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* 6. Legal / Verification Notes */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Administrative Verification Notice
            </p>
            <p className="leading-relaxed">
              All bookings are queued for admin review and chauffeur dispatch. Please present your original Nepali citizenship / passport and driving licence upon vehicle pickup. For inquiries or immediate dispatch confirmation, call our 24/7 fleet hotline at <strong>+977 01-4422334</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between print:hidden">
          <span className="text-xs font-semibold text-slate-500">Nepal Car Rental • Official Receipt</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
