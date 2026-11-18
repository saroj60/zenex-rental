import React from 'react';
import { X, ShieldCheck, FileText, RotateCcw, Lock } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose, policyType = 'terms' }) {
  if (!isOpen) return null;

  const contentMap = {
    terms: {
      title: 'Rental Terms & Conditions',
      icon: <FileText className="w-5 h-5 text-[#0755C9]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Welcome to Nepal Car Rental Pvt. Ltd. By confirming your vehicle reservation, you agree to comply with the following contractual terms:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Eligibility:</strong> Renters must be at least 21 years old and possess a valid, non-expired driving licence (minimum 1 year experience for self-drive). Foreign tourists must provide a valid passport with valid Nepal entry visa and an International Driving Permit (IDP).
            </li>
            <li>
              <strong>Vehicle Use:</strong> Vehicles must only be driven on recognized public roads in Nepal. Extreme off-road tracks (e.g. Upper Mustang beyond Kagbeni) require 4WD vehicles and prior written authorization.
            </li>
            <li>
              <strong>Fuel Policy:</strong> Vehicles are handed over with a full or marked fuel gauge level and must be returned with the same fuel level. Missing fuel will be charged at current Nepal Oil Corporation market rates plus a 10% refueling service fee.
            </li>
            <li>
              <strong>Traffic Violations:</strong> The customer is solely liable for any traffic police fines, speeding tickets, parking penalties, or municipal fees incurred during the rental period.
            </li>
            <li>
              <strong>Security Deposit:</strong> For self-drive bookings, the refundable security deposit (NPR 20,000–35,000) will be released back to the original payment source within 24–48 hours after vehicle return and post-trip technical inspection.
            </li>
          </ul>
        </div>
      ),
    },
    cancellation: {
      title: 'Cancellation & Rescheduling Policy',
      icon: <RotateCcw className="w-5 h-5 text-[#0755C9]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">
            We understand plans can change due to flight delays, weather conditions, or highway updates in Nepal.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Free Cancellation:</strong> You can cancel your reservation completely free of charge up to <strong>24 hours</strong> before the scheduled pickup time. 100% of any advance payments or deposits will be refunded immediately.
            </li>
            <li>
              <strong>Late Cancellation (within 24 hours):</strong> Cancellations made within 24 hours of scheduled pickup incur a nominal 1-day rental fee or NPR 2,500 cancellation fee to compensate vehicle blocking and driver allocation.
            </li>
            <li>
              <strong>No-Show:</strong> If you fail to arrive at the designated pickup location without prior notice within 3 hours of the pickup time, the booking is marked as a No-Show and the advance payment is non-refundable.
            </li>
            <li>
              <strong>Free Rescheduling:</strong> You may change your travel dates or vehicle category free of charge up to 12 hours before pickup, subject to fleet availability.
            </li>
          </ul>
        </div>
      ),
    },
    refund: {
      title: 'Refund & Deposit Policy',
      icon: <ShieldCheck className="w-5 h-5 text-[#0755C9]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Nepal Car Rental guarantees safe, automated, and dispute-free refunds:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Digital Wallets (eSewa & Khalti):</strong> Eligible refunds are credited directly back to your eSewa or Khalti account within 2 to 4 business hours.
            </li>
            <li>
              <strong>Bank Transfers:</strong> Bank transfers are processed via Nepal Clearing House (NCHL-IPS / connectIPS) within 1 to 2 banking business days.
            </li>
            <li>
              <strong>Security Deposit Release:</strong> For self-drive bookings, once our technical inspector signs off on the vehicle's bodywork, tires, and fuel level, your deposit is refunded in full with zero deduction.
            </li>
            <li>
              <strong>Early Returns:</strong> Unused rental days returned ahead of schedule with at least 24 hours notice are refunded at 70% of the prorated daily rate.
            </li>
          </ul>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy & Identity Protection Policy',
      icon: <Lock className="w-5 h-5 text-[#0755C9]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Your personal identity documents and trip records are protected under stringent privacy protocols:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Document Security:</strong> Uploaded driving licences and citizenship/passport documents are stored in encrypted, non-public storage accessible only by verified fleet compliance officers.
            </li>
            <li>
              <strong>No Third-Party Sharing:</strong> We never sell, rent, or distribute your phone number, email, or travel itinerary to marketing third parties.
            </li>
            <li>
              <strong>Legal Compliance:</strong> Information is collected solely to comply with Nepal Department of Transport Management (DoTM) tourist transport regulations and vehicle fleet insurance coverage.
            </li>
          </ul>
        </div>
      ),
    },
  };

  const active = contentMap[policyType] || contentMap.terms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
              {active.icon}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#10243A]">{active.title}</h3>
              <p className="text-[11px] text-slate-400">Nepal Car Rental Official Regulatory Policy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {active.body}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Valid across all Nepal routes</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0755C9] text-white text-xs font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-xs"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
}
