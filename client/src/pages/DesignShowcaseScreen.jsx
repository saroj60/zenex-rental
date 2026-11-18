import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import AvailableCarsScreen from './AvailableCarsScreen';
import VehicleDetailsScreen from './VehicleDetailsScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import {
  CalendarCheck,
  Car,
  MapPin,
  CreditCard,
  ShieldCheck,
  UserCheck,
  Wrench,
  BarChart3,
  ExternalLink,
  Smartphone,
  Sparkles,
} from 'lucide-react';

const PhoneMockup = ({ title, children, screenNumber }) => (
  <div className="flex flex-col items-center">
    <div className="mb-2 text-center">
      <span className="text-[11px] font-extrabold text-[#0755C9] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
        Screen {screenNumber}: {title}
      </span>
    </div>
    {/* Smartphone Frame */}
    <div className="relative w-[320px] sm:w-[340px] h-[680px] bg-slate-900 rounded-[44px] p-2.5 shadow-2xl ring-8 ring-slate-800/90 flex flex-col transition-all hover:scale-[1.01]">
      {/* Notch / Speaker */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-40 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div>
        <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
      </div>

      {/* Screen container */}
      <div className="relative flex-1 bg-[#F5F8FC] rounded-[36px] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="h-8 pt-1.5 px-6 flex items-center justify-between text-[11px] font-bold text-slate-800 select-none z-30">
          <span>9:41</span>
          <div className="flex items-center gap-1 text-[9px]">
            <span>5G</span>
            <div className="w-4 h-2 border border-slate-700 rounded-xs p-0.5 flex items-center">
              <div className="h-full w-full bg-slate-800 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Live Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const DesignShowcaseScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Showcase Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0755C9] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive UI/UX Reference Showcase</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Nepal Car Rental – Complete System
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Built exactly according to your high-fidelity UI reference image. Every screen is live, scrollable, and fully functional.
        </p>
      </div>

      {/* 5 Mobile App Screens (Exact match to top row of reference picture!) */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-lg font-black text-slate-900">1. Customer Application Flows</h2>
          <p className="text-xs text-slate-400">Interact with any screen directly inside its smartphone frame</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {/* Phone 1: Welcome / Splash */}
          <PhoneMockup title="Welcome & Splash" screenNumber="1">
            <WelcomeScreen />
          </PhoneMockup>

          {/* Phone 2: Customer Homepage */}
          <PhoneMockup title="Customer Homepage" screenNumber="2">
            <HomeScreen />
          </PhoneMockup>

          {/* Phone 3: Available Cars */}
          <PhoneMockup title="Available Cars" screenNumber="3">
            <AvailableCarsScreen />
          </PhoneMockup>

          {/* Phone 4: Vehicle Details */}
          <PhoneMockup title="Vehicle Details" screenNumber="4">
            <VehicleDetailsScreen />
          </PhoneMockup>

          {/* Phone 5: Booking Confirmation */}
          <PhoneMockup title="Booking Confirmed" screenNumber="5">
            <BookingConfirmationScreen />
          </PhoneMockup>
        </div>
      </div>

      {/* Bottom Row (Exact match to bottom row of reference picture!) */}
      <div className="pt-6 border-t border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Bottom Left: Admin Dashboard Preview Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#0755C9] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  Admin System
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Nepal Car Rental – Admin Panel
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-[#0755C9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-all"
              >
                <span>Open Full Admin Panel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Admin Snapshot preview matching screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block">TOTAL VEHICLES</span>
                <span className="text-xl font-black text-slate-900">42</span>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
                <span className="text-[10px] text-[#0755C9] font-bold block">TOTAL BOOKINGS</span>
                <span className="text-xl font-black text-[#0755C9]">186</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-[10px] text-emerald-600 font-bold block">TOTAL REVENUE</span>
                <span className="text-base sm:text-lg font-black text-emerald-700">NPR 14.75L</span>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[10px] text-indigo-600 font-bold block">ACTIVE USERS</span>
                <span className="text-xl font-black text-indigo-700">1,248</span>
              </div>
            </div>

            {/* Recent Bookings mini table */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-700">Recent Bookings Feed</div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#0755C9]">#NCR-10458</span>
                  <span className="font-bold text-slate-800">Hyundai Creta</span>
                  <span className="font-semibold text-slate-900">NPR 17,000</span>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#0755C9]">#NCR-10457</span>
                  <span className="font-bold text-slate-800">Toyota Hiace</span>
                  <span className="font-semibold text-slate-900">NPR 12,000</span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                    Ongoing
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#0755C9]">#NCR-10456</span>
                  <span className="font-bold text-slate-800">Suzuki Swift</span>
                  <span className="font-semibold text-slate-900">NPR 4,500</span>
                  <span className="text-[10px] font-bold bg-blue-50 text-[#0755C9] px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Key Features Grid with Kathmandu Silhouette (5 cols - exact match!) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-soft relative overflow-hidden space-y-4">
            <div className="border-l-4 border-[#0755C9] pl-3">
              <h3 className="text-lg font-black text-slate-900">Key Features</h3>
              <p className="text-xs text-slate-400">Tailored for commercial operations in Nepal</p>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Online Booking</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">With / Without Driver</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Multiple Locations</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">eSewa / Khalti Payment</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Fleet Management</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Driver Management</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Vehicle Maintenance</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Reports & Analytics</span>
              </div>
            </div>

            {/* Kathmandu Temple Pagoda Silhouette at the base (matches bottom right of reference screenshot!) */}
            <div className="pt-4 opacity-20 pointer-events-none">
              <svg viewBox="0 0 600 80" className="w-full h-12 text-[#0755C9]" fill="currentColor">
                <path d="M 0 80 L 100 80 L 120 50 L 110 50 L 125 30 L 120 30 L 130 15 L 140 30 L 135 30 L 150 50 L 140 50 L 160 80 L 260 80 L 280 40 L 270 40 L 290 10 L 310 40 L 300 40 L 320 80 L 420 80 L 440 45 L 430 45 L 450 20 L 470 45 L 460 45 L 480 80 L 600 80 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignShowcaseScreen;
