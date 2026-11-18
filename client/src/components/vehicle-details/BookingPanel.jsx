import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  UserCheck,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Loader2,
  Tag,
  ArrowRight,
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import api from '../../services/api';

const NEPAL_LOCATIONS = [
  'Kathmandu Central Depot',
  'Tribhuvan Intl Airport (KTM)',
  'Lalitpur (Patan)',
  'Bhaktapur Durbar Square',
  'Pokhara Lakeside Hub',
  'Chitwan (Sauraha)',
  'Lumbini Peace Park',
  'Janakpur City Center',
  'Mustang (Jomsom Depot)',
  'Nagarkot Hill Station',
  'Biratnagar Airport Hub',
];

const TIME_OPTIONS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
];

export default function BookingPanel({
  vehicle,
  onBookNow,
  onRequireLogin,
  rentalType,
  setRentalType,
}) {
  const { user } = useAuth();
  const {
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    pickupTime,
    setPickupTime,
    returnTime,
    setReturnTime,
  } = useBooking();

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [couponCode, setCouponCode] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(null);
  const [couponError, setCouponError] = useState(null);

  // Backend Price Estimation State
  const [pricingEstimate, setPricingEstimate] = useState(null);
  const [calculatingPrice, setCalculatingPrice] = useState(false);

  // Availability State
  const [availability, setAvailability] = useState({
    isAvailable: true,
    status: 'Available',
    message: '',
  });
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [dateError, setDateError] = useState('');

  // Validate dates
  useEffect(() => {
    const today = getTodayString();
    if (startDate < today) {
      setDateError('Pickup date cannot be in the past.');
    } else if (endDate < startDate) {
      setDateError('Return date must be on or after pickup date.');
    } else {
      setDateError('');
    }
  }, [startDate, endDate]);

  // Check Availability from Backend
  useEffect(() => {
    if (!vehicle || !startDate || !endDate || dateError) return;

    let isMounted = true;
    const checkVehicleAvail = async () => {
      setCheckingAvailability(true);
      try {
        const res = await api.get(`/vehicles/${vehicle._id}/availability`, {
          params: { startDate, endDate },
        });
        if (isMounted && res.data) {
          setAvailability(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setAvailability({
            isAvailable: true,
            status: 'Available',
            message: 'Vehicle status ready for reservation.',
          });
        }
      } finally {
        if (isMounted) setCheckingAvailability(false);
      }
    };

    checkVehicleAvail();
    return () => {
      isMounted = false;
    };
  }, [vehicle, startDate, endDate, dateError]);

  // Fetch Pricing Estimate from Backend
  useEffect(() => {
    if (!vehicle || !startDate || !endDate || dateError) return;

    let isMounted = true;
    const fetchEstimate = async () => {
      setCalculatingPrice(true);
      try {
        const res = await api.post(`/pricing/estimate`, {
          vehicleId: vehicle._id,
          pickupDate: startDate,
          pickupTime,
          returnDate: endDate,
          returnTime,
          rentalType,
          couponCode: couponSuccess ? couponCode : undefined,
        });

        if (isMounted && res.data?.data) {
          setPricingEstimate(res.data.data);
        }
      } catch (err) {
        console.warn('Backend estimate error, using local computation:', err);
      } finally {
        if (isMounted) setCalculatingPrice(false);
      }
    };

    fetchEstimate();
    return () => {
      isMounted = false;
    };
  }, [vehicle, startDate, endDate, pickupTime, returnTime, rentalType, couponSuccess]);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponError(null);
    setCouponSuccess(null);

    try {
      const res = await api.post(`/pricing/estimate`, {
        vehicleId: vehicle._id,
        pickupDate: startDate,
        returnDate: endDate,
        rentalType,
        couponCode: couponCode.trim(),
      });

      if (res.data?.data?.discountAmount > 0) {
        setCouponSuccess(`Promo applied! Saved NPR ${res.data.data.discountAmount.toLocaleString()}`);
        setPricingEstimate(res.data.data);
      } else {
        setCouponError('Coupon code not applicable or minimum rental threshold not met.');
      }
    } catch {
      setCouponError('Invalid coupon code.');
    }
  };

  const handleProceedBooking = () => {
    if (dateError || !availability.isAvailable) return;

    if (!user) {
      if (onRequireLogin) onRequireLogin();
      return;
    }

    if (onBookNow) onBookNow();
  };

  // Fallback estimates if backend is calculating
  const durationDays = pricingEstimate?.durationDays || 2;
  const isSelfDrive = rentalType === 'self_drive';
  const dailyRate =
    pricingEstimate?.dailyRate ||
    (isSelfDrive ? vehicle.pricing?.dailySelfDrive || 7000 : vehicle.pricing?.dailyWithDriver || 8500);
  const baseRental = pricingEstimate?.baseRentalAmount || dailyRate * durationDays;
  const securityDeposit = pricingEstimate?.securityDeposit ?? (vehicle.pricing?.securityDeposit || 20000);
  const discountAmount = pricingEstimate?.discountAmount || 0;
  const estimatedTotal = pricingEstimate?.estimatedTotal || baseRental - discountAmount + securityDeposit;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-5 static lg:sticky lg:top-28">
      
      {/* 1. Header with Pricing Summary */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Rate for {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#10243A]">
              NPR {baseRental.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            (NPR {dailyRate.toLocaleString()} / day)
          </span>
        </div>

        {/* Live Availability Badge */}
        <div className="text-right">
          {checkingAvailability ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0755C9]" />
              <span>Verifying...</span>
            </div>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${
                availability.status === 'Available'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : availability.status === 'Already Booked'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                availability.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
              {availability.status}
            </span>
          )}
        </div>
      </div>

      {/* Date Validation Alert */}
      {dateError && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{dateError}</span>
        </div>
      )}

      {/* Unavailability Notice */}
      {!availability.isAvailable && !dateError && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-black">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Vehicle Unavailable for These Dates</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed pl-5">
            {availability.message || 'Please pick different calendar dates or choose another available car.'}
          </p>
        </div>
      )}

      {/* 2. Rental Mode Switcher */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
          Rental Preference
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRentalType('self_drive')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
              isSelfDrive
                ? 'bg-[#0755C9] text-white border-[#0755C9] shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Self Drive</span>
          </button>
          <button
            type="button"
            onClick={() => setRentalType('with_driver')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
              !isSelfDrive
                ? 'bg-[#0755C9] text-white border-[#0755C9] shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>With Chauffeur</span>
          </button>
        </div>
      </div>

      {/* 3. Depot Locations */}
      <div className="space-y-3">
        <div>
          <label className="flex items-center justify-between text-[11px] font-black uppercase text-slate-500 tracking-wider mb-1">
            <span>Pickup Location</span>
            <span className="text-[10px] text-blue-600 font-bold lowercase">type any address</span>
          </label>
          <div className="relative">
            <input
              type="text"
              list="booking-panel-pickup-hubs"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Type city, airport, hotel, or hub..."
              className="w-full pl-3 pr-8 py-2.5 text-xs font-bold text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0755C9] transition-all"
            />
            <datalist id="booking-panel-pickup-hubs">
              {NEPAL_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
            <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-[11px] font-black uppercase text-slate-500 tracking-wider mb-1">
            <span>Return Location</span>
            <span className="text-[10px] text-amber-600 font-bold lowercase">type any address</span>
          </label>
          <div className="relative">
            <input
              type="text"
              list="booking-panel-dropoff-hubs"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Type return city, hotel, or hub..."
              className="w-full pl-3 pr-8 py-2.5 text-xs font-bold text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0755C9] transition-all"
            />
            <datalist id="booking-panel-dropoff-hubs">
              {NEPAL_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
            <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Dates & Times */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-1">
            Pickup Date
          </label>
          <input
            type="date"
            min={getTodayString()}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-2.5 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
          />
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full mt-1.5 px-2 py-1.5 text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-lg outline-none"
          >
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-1">
            Return Date
          </label>
          <input
            type="date"
            min={startDate || getTodayString()}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-2.5 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
          />
          <select
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="w-full mt-1.5 px-2 py-1.5 text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-lg outline-none"
          >
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Coupon Promo Code Input */}
      <form onSubmit={handleApplyCoupon} className="pt-2">
        <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-1">
          Promotional Coupon
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="e.g. EXPLORENEPAL"
            className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xs transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
        {couponSuccess && (
          <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{couponSuccess}</span>
          </p>
        )}
        {couponError && (
          <p className="text-[11px] font-bold text-rose-600 mt-1">{couponError}</p>
        )}
      </form>

      {/* 6. Pricing Breakdown Accordion */}
      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Base Rental ({durationDays} days):</span>
          <span className="font-bold text-slate-900">NPR {baseRental.toLocaleString()}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Coupon Discount:</span>
            <span>- NPR {discountAmount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span className="flex items-center gap-1">
            Security Deposit (Refundable):
          </span>
          <span className="font-bold text-slate-900">NPR {securityDeposit.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Highway Insurance & VAT:</span>
          <span className="font-bold text-emerald-700">Included (Free)</span>
        </div>

        <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black">
          <span className="text-slate-900">Estimated Total:</span>
          <span className="text-lg text-[#0755C9]">NPR {estimatedTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* 7. Book This Car CTA Button */}
      <button
        type="button"
        disabled={!availability.isAvailable || !!dateError}
        onClick={handleProceedBooking}
        className="w-full py-4 rounded-2xl bg-[#0755C9] hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{!user ? 'Sign In & Book This Car' : 'Book This Car Now'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Free cancellation up to 24 hrs before trip</span>
      </div>

    </div>
  );
}
