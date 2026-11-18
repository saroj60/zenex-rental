import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  CreditCard,
  Copy,
  Check,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import CarIllustrations from '../components/common/CarIllustrations';
import api from '../services/api';

const BookingConfirmationScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti effect!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    const fetchBooking = async () => {
      try {
        const res = await api.get(`/bookings/${id}`);
        setBooking(res.data.data);
      } catch (err) {
        console.error('Error loading booking:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const copyBookingId = () => {
    const textToCopy = booking?.bookingId || id || 'NCR-10458';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bookingIdDisplay = booking?.bookingId || id || 'NCR-10458';
  const vehicleName = booking?.vehicle?.name || 'Hyundai Creta';
  const vehicleImg =
    booking?.vehicle?.images?.[0] ||
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80';
  const rentalTypeLabel = booking?.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver';
  const pickupCity = booking?.pickupLocation?.name || 'Kathmandu';
  const dropoffCity = booking?.dropoffLocation?.name || 'Pokhara';
  const grandTotal = booking?.pricingBreakdown?.grandTotal || 17000;
  const durationDays = booking?.durationDays || 2;

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto min-h-[640px] flex flex-col justify-between space-y-6 pb-20">
      <div className="text-center pt-4 space-y-3">
        {/* Animated Green Check Circle */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/15 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mt-1">
            Your car has been successfully booked. We'll contact you shortly.
          </p>
        </div>
      </div>

      {/* Summary Card (Exact match to Screen F) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-4">
        {/* Car snippet */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-16 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-1 overflow-hidden">
            <img
              src={vehicle?.images?.[0] || '/cars/creta.png'}
              alt={vehicleName}
              className="max-h-full max-w-full object-contain drop-shadow-xs"
              onError={(e) => {
                e.target.src = '/cars/creta.png';
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{vehicleName}</h3>
            <span className="text-xs text-slate-500 font-medium">{rentalTypeLabel}</span>
          </div>
        </div>

        {/* Date Row */}
        <div className="flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">
              Nov 5, 2026 – Nov 7, 2026 ({durationDays} Days)
            </div>
            <div className="text-[11px] text-slate-400">Pickup: 09:00 AM • Return: 06:00 PM</div>
          </div>
        </div>

        {/* Location Route */}
        <div className="flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="font-semibold text-slate-800">
            {pickupCity} → {dropoffCity}
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span>Total Amount</span>
          </div>
          <div className="text-base font-black text-slate-900">
            NPR {grandTotal.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Copyable Booking ID Pill (Screen F) */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={copyBookingId}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-[#0755C9] font-bold text-xs sm:text-sm hover:bg-blue-100/70 transition-all shadow-2xs"
        >
          <span>Booking ID: {bookingIdDisplay}</span>
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate('/bookings')}
          className="w-full py-4 rounded-2xl bg-[#0755C9] text-white font-bold text-sm shadow-md shadow-blue-600/25 hover:bg-[#053E94] active:scale-[0.99] transition-all"
        >
          View Booking
        </button>

        <button
          type="button"
          onClick={() => navigate('/cars')}
          className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          Book Another Car
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationScreen;
