import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Check,
  AlertTriangle,
  Clock,
  Fuel,
  CreditCard,
  UserCheck
} from 'lucide-react';

export default function VehicleTabsInfo({ vehicle }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'requirements' | 'policies'

  if (!vehicle) return null;

  const features = vehicle.features || [
    'Air Conditioning',
    'Touchscreen Infotainment',
    'Bluetooth & Apple CarPlay',
    'Reverse Parking Camera',
    'ABS & Airbags',
    'Power Steering',
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-100 overflow-x-auto no-scrollbar pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#0755C9] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Vehicle Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('features')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'features'
              ? 'bg-[#0755C9] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Features & Amenities ({features.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('requirements')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'requirements'
              ? 'bg-[#0755C9] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Rental Requirements
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'policies'
              ? 'bg-[#0755C9] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Rental Policies & Terms
        </button>
      </div>

      {/* 1. Overview & Description */}
      {activeTab === 'overview' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div>
            <h4 className="text-sm font-black text-[#10243A] mb-1">
              About This Fleet Model
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {vehicle.description ||
                'This vehicle is professionally managed and maintained under Nepal Car Rental standards. Equipped with modern comfort features, robust suspension, and high clearance designed for city commutes as well as highway travels.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Ownership Model</span>
              <p className="font-black text-slate-800">{vehicle.ownership || 'Company Owned'}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Service Depot</span>
              <p className="font-black text-slate-800">Kathmandu Central & Pokhara Lakeside</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Commercial Permit</span>
              <p className="font-black text-emerald-700">Valid Nationwide Nepal Route Permit</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Kit</span>
              <p className="font-black text-slate-800">First Aid, Spare Tire, Jack & Tools included</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Features & Amenities */}
      {activeTab === 'features' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <h4 className="text-sm font-black text-[#10243A]">
            Installed Comfort & Safety Equipment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Rental Requirements */}
      {activeTab === 'requirements' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h4 className="text-sm font-black text-[#10243A]">
            Mandatory Documents for Vehicle Handover
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
              <span className="text-xs font-black text-[#0755C9] block">
                1. Driving License
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Valid Nepali Driving License (Category B for Cars/SUVs) or an International Driving Permit (IDP) held for at least 1 year.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
              <span className="text-xs font-black text-indigo-700 block">
                2. Identity Verification
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Nepali Citizenship Card / National ID or valid Foreign Passport with active Nepal entry visa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
              <span className="text-xs font-black text-emerald-800 block">
                3. Age & Experience
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Primary self-drive hirer must be 21 years of age or older. (No age restriction when renting with an accredited chauffeur).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5">
              <span className="text-xs font-black text-amber-900 block">
                4. Security Deposit
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Held via Credit Card pre-authorization, eSewa/Khalti digital hold, or counter cash receipt. Released after return check.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Rental Policies */}
      {activeTab === 'policies' && (
        <div className="space-y-3.5 animate-in fade-in duration-150 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-black text-slate-900 block">
              Free Cancellation & Refund Policy
            </span>
            <p className="text-slate-600 leading-relaxed">
              100% full refund on bookings cancelled up to 24 hours prior to scheduled departure. 50% refund for cancellations within 24 hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-black text-slate-900 block">
              Fuel & Mileage Policy
            </span>
            <p className="text-slate-600 leading-relaxed">
              Same-to-same fuel gauge level policy. If returned with less fuel, local Nepal Oil Corporation (NOC) pump rate applies without penalty fees.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-black text-slate-900 block">
              Late Return Grace Window
            </span>
            <p className="text-slate-600 leading-relaxed">
              Complimentary 1-hour grace period for unexpected highway traffic. Subsequent delays are billed at the standard hourly rate.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
