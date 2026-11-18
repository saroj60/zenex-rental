import React, { useState } from 'react';
import {
  Banknote,
  Clock,
  Calendar,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
  Car,
  UserCheck
} from 'lucide-react';

export default function PricingTiersCard({ vehicle, activeRentalType, onSelectRentalType }) {
  if (!vehicle || !vehicle.pricing) return null;

  const pricing = vehicle.pricing;
  const isSelfDrive = activeRentalType === 'self_drive';

  const hourlyRate = isSelfDrive
    ? pricing.hourlyRateSelfDrive || Math.round((pricing.dailySelfDrive || 7000) / 8)
    : pricing.hourlyRateWithDriver || Math.round((pricing.dailyWithDriver || 8500) / 8);

  const dailyRate = isSelfDrive
    ? pricing.dailySelfDrive || 7000
    : pricing.dailyWithDriver || 8500;

  const weeklyRate = isSelfDrive
    ? pricing.weeklySelfDrive || dailyRate * 6.5
    : pricing.weeklyWithDriver || dailyRate * 6.5;

  const monthlyRate = isSelfDrive
    ? pricing.monthlySelfDrive || dailyRate * 25
    : pricing.monthlyWithDriver || dailyRate * 25;

  const securityDeposit = pricing.securityDeposit || (isSelfDrive ? 25000 : 0);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-soft space-y-5 sm:space-y-6">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-[#10243A]">
            Transparent Rental Pricing Tiers
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            Government VAT compliant rates with tiered discounts for longer road trips
          </p>
        </div>

        {/* Self Drive vs With Driver Selector */}
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onSelectRentalType('self_drive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isSelfDrive
                ? 'bg-[#0755C9] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Self Drive</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectRentalType('with_driver')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isSelfDrive
                ? 'bg-[#0755C9] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>With Chauffeur</span>
          </button>
        </div>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Hourly Rate */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase mb-1">
            <Clock className="w-3.5 h-3.5 text-[#0755C9]" />
            <span>Hourly Rental</span>
          </div>
          <div className="text-lg font-black text-slate-900">
            NPR {hourlyRate.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Min 4 hours booking</p>
        </div>

        {/* Daily Rate (Primary Highlight) */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-2xs relative">
          <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#0755C9] text-white text-[9px] font-black uppercase tracking-wider">
            Popular
          </span>
          <div className="flex items-center gap-1.5 text-[#0755C9] text-[10px] font-bold uppercase mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Daily Rate</span>
          </div>
          <div className="text-xl font-black text-[#0755C9]">
            NPR {dailyRate.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Standard 24-hr calendar</p>
        </div>

        {/* Weekly Tier */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-bold uppercase mb-1">
            <Check className="w-3.5 h-3.5" />
            <span>Weekly Tier</span>
          </div>
          <div className="text-lg font-black text-slate-900">
            NPR {Math.round(weeklyRate).toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Includes ~10% discount</p>
        </div>

        {/* Monthly Tier */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-1.5 text-indigo-700 text-[10px] font-bold uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Monthly Tier</span>
          </div>
          <div className="text-lg font-black text-slate-900">
            NPR {Math.round(monthlyRate).toLocaleString()}
          </div>
          <p className="text-[10px] text-indigo-600 font-bold mt-0.5">Corporate & expat rate</p>
        </div>

      </div>

      {/* Inclusions & Security Deposit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        
        {/* Included Services */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-xs">
          <span className="font-black text-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Complimentary With Every Rental
          </span>
          <ul className="space-y-1.5 text-slate-600 text-[11px] font-medium">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              Comprehensive Commercial Vehicle Insurance across Nepal
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              24/7 Prithvi, Tribhuvan & Highway Roadside Rescue
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              Clean handover with pre-rental sanitization and inspection
            </li>
          </ul>
        </div>

        {/* Security Deposit & Conditions */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-black text-amber-900 flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-amber-600" />
              Security Deposit Policy
            </span>
            <span className="font-mono font-black text-amber-900 text-sm">
              NPR {securityDeposit.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Refundable deposit held via Cash, Card authorization, or Bank Guarantee. Fully returned within 24 hours of safe vehicle return upon depot inspection.
          </p>
        </div>

      </div>

    </div>
  );
}
