import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  Car,
  CheckCircle,
  FileCheck,
  Building2,
  Calendar,
  CreditCard,
  User
} from 'lucide-react';

export default function ReceiptInvoiceModal({ isOpen, onClose, payment }) {
  const printAreaRef = useRef(null);

  if (!isOpen || !payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const booking = payment.booking || {};
  const customer = payment.customer || booking.customer || {};
  const vehicle = payment.vehicle || booking.vehicle || {};

  const bookingTotal = booking.totalAmount || booking.pricing?.totalPrice || payment.amount || 0;
  const paidSoFar = (booking.paidAmount || payment.amount || 0);
  const remaining = Math.max(0, bookingTotal - paidSoFar);

  const formattedDate = new Date(payment.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Printable CSS embedded */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt-area, #printable-receipt-area * {
            visibility: visible;
          }
          #printable-receipt-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header toolbar (Hidden on Print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-[#0755C9]">
              <ReceiptIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-black text-slate-900">Official Payment Receipt & Tax Invoice</h3>
              <p className="text-[11px] text-slate-500 font-semibold">Nepal Car Rental Services Pvt. Ltd.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
            >
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Content Area */}
        <div id="printable-receipt-area" ref={printAreaRef} className="p-8 text-slate-800 space-y-6">
          
          {/* Company & Invoice Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0755C9] text-white flex items-center justify-center font-black text-xl shadow-md">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#10243A] tracking-tight">Nepal Car Rental</h1>
                <p className="text-xs font-semibold text-slate-500">Government Approved Fleet Operations</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  PAN / VAT: <span className="font-mono font-bold text-slate-600">609821445</span> • Ward No. 3, Lazimpat, Kathmandu
                </p>
                <p className="text-[11px] text-slate-400">
                  Tel: +977-1-4428900 • support@nepalcarrental.com.np
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                Payment {payment.status?.toUpperCase()}
              </span>
              <p className="text-xs text-slate-500">Receipt No:</p>
              <p className="font-mono font-black text-slate-900 text-sm">
                {payment.receiptNumber || `NCR-REC-${payment._id?.slice(-8).toUpperCase()}`}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Date: {formattedDate}</p>
            </div>
          </div>

          {/* Customer & Booking Meta Grid */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Billed To (Customer):
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {customer.name || payment.customerName || 'Registered Customer'}
              </p>
              <p className="text-slate-600 mt-0.5">Phone: {customer.phone || payment.customerPhone || '+977 98XXXXXXXX'}</p>
              <p className="text-slate-600">Email: {customer.email || 'customer@example.com'}</p>
              <p className="text-slate-500 text-[11px]">Kathmandu Valley, Nepal</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Reservation Details:
              </span>
              <p className="font-mono font-bold text-[#0755C9]">
                Booking ID: {booking.bookingId || `#${booking._id?.slice(-6) || 'NCR-10456'}`}
              </p>
              <p className="text-slate-700 font-semibold mt-0.5">
                Vehicle: {vehicle.name || payment.vehicleName || 'Hyundai Creta (BA 02 CHA 8891)'}
              </p>
              <p className="text-slate-600">
                Rental Type: <span className="capitalize font-semibold">{booking.rentalType?.replace('_', ' ') || 'With Driver'}</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Pickup: {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : 'N/A'} • Return: {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-500 uppercase text-[10px] font-black">
                <th className="py-2.5">Description</th>
                <th className="py-2.5">Type / Gateway</th>
                <th className="py-2.5">Reference ID</th>
                <th className="py-2.5 text-right">Amount (NPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-900">
                  Rental Settlement ({payment.paymentType?.replace('_', ' ')?.toUpperCase() || 'COLLECTION'})
                  <span className="block text-[11px] text-slate-400 font-normal">
                    {payment.notes || 'Nepal Car Rental reservation advance/payment'}
                  </span>
                </td>
                <td className="py-3 uppercase font-bold text-slate-600">
                  {payment.paymentMethod}
                </td>
                <td className="py-3 font-mono text-[11px] text-slate-500">
                  {payment.paymentReference || payment.transactionId}
                </td>
                <td className="py-3 text-right font-black text-slate-900 text-sm">
                  NPR {payment.amount?.toLocaleString()}
                </td>
              </tr>

              {payment.refund?.status === 'completed' && (
                <tr className="text-rose-700 bg-rose-50/50">
                  <td className="py-2.5 font-bold">
                    Less: Approved Refund Return
                    <span className="block text-[10px] text-rose-500">{payment.refund?.reason}</span>
                  </td>
                  <td className="py-2.5 uppercase font-bold">Reversal</td>
                  <td className="py-2.5 font-mono text-[11px]">{payment.refund?.refundReference}</td>
                  <td className="py-2.5 text-right font-black">- NPR {payment.refund?.amount?.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals Summary */}
          <div className="flex justify-between items-start pt-4 border-t-2 border-slate-200">
            <div className="w-1/2 space-y-1.5 text-xs text-slate-500">
              <p className="font-bold text-slate-800">Payment Terms & Policies:</p>
              <p className="text-[11px] leading-relaxed">
                1. Full balance must be cleared prior to vehicle dispatch or depot key handover.<br />
                2. Security deposit is refundable within 24 hours of post-trip inspection.<br />
                3. All fuel and toll charges are subject to rental agreement terms.
              </p>
              <p className="text-[11px] text-slate-400 pt-2 font-mono">
                Received By: {payment.receivedBy || 'Finance Dept / Gateway'}
              </p>
            </div>

            <div className="w-5/12 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Booking Value:</span>
                <span className="font-semibold text-slate-900">NPR {bookingTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>This Payment Received:</span>
                <span className="font-black text-emerald-700 text-sm">NPR {payment.amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Cumulative Paid:</span>
                <span className="font-bold text-slate-800">NPR {paidSoFar.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                <span>Remaining Balance Due:</span>
                <span className={remaining > 0 ? 'text-amber-600' : 'text-emerald-600'}>
                  {remaining > 0 ? `NPR ${remaining.toLocaleString()}` : 'CLEARED (NPR 0)'}
                </span>
              </div>
            </div>
          </div>

          {/* Signature Footer */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-700">Customer Acknowledgement</p>
              <div className="h-10 border-b border-dashed border-slate-300 w-44 mt-4"></div>
              <p className="text-[10px] text-slate-400 mt-1">Signature & Date</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-[#0755C9]">For Nepal Car Rental Services Pvt. Ltd.</p>
              <div className="h-10 border-b border-dashed border-slate-300 w-44 ml-auto mt-4 flex items-end justify-end">
                <span className="font-serif italic font-bold text-slate-400 text-xs">Authorized Signatory</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Official Depot Cashier Stamp</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function ReceiptIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <path d="M12 17.5v-11"/>
    </svg>
  );
}
