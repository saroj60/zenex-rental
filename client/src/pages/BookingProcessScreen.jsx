import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import PaymentModal from '../components/modals/PaymentModal';
import api from '../services/api';

const NEPAL_DISTRICTS = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Lumbini',
  'Janakpur',
  'Biratnagar',
  'Nagarkot',
  'Tribhuvan Airport (KTM)',
  'Lalitpur',
  'Bhaktapur',
];

const BookingProcessScreen = ({ vehicle, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    rentalType,
    setRentalType,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useBooking();

  const [pickupTime, setPickupTime] = useState('09:00 AM');
  const [returnTime, setReturnTime] = useState('06:00 PM');
  const [fullName, setFullName] = useState(user?.name || 'Saroj');
  const [phone, setPhone] = useState(user?.phone || '+977 9841892011');
  const [email, setEmail] = useState(user?.email || 'customer@nepalcarrental.com');
  const [drivingLicense, setDrivingLicense] = useState(user?.drivingLicense?.number || '01-06-00892144');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [couponCode, setCouponCode] = useState('');

  const [pricing, setPricing] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [showPaymentGatewayModal, setShowPaymentGatewayModal] = useState(false);

  // Fetch verified price breakdown from backend
  useEffect(() => {
    const fetchPrice = async () => {
      setCalculating(true);
      setError('');
      try {
        const res = await api.post('/bookings/calculate-price', {
          vehicleId: vehicle._id,
          rentalType,
          startDate,
          endDate,
          couponCode,
        });
        setPricing(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to calculate price.');
      } finally {
        setCalculating(false);
      }
    };
    if (vehicle?._id && startDate && endDate) {
      fetchPrice();
    }
  }, [vehicle, rentalType, startDate, endDate, couponCode]);

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        vehicleId: vehicle._id,
        rentalType,
        pickupLocation: { name: pickupLocation, district: pickupLocation },
        dropoffLocation: { name: dropoffLocation, district: dropoffLocation },
        startDate,
        endDate,
        pickupTime,
        returnTime,
        customerDetails: {
          fullName,
          email,
          phone,
          drivingLicenseNumber: rentalType === 'self_drive' ? drivingLicense : '',
          userId: user?._id || user?.id,
        },
        paymentMethod,
        couponCode,
      };

      const res = await api.post('/bookings', payload);
      const bookingData = res.data.data;
      setCreatedBooking(bookingData);

      if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
        setShowPaymentGatewayModal(true);
      } else {
        // Direct cash booking confirmation
        onClose();
        navigate(`/booking-confirmation/${bookingData.bookingId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking submission failed. Please check date availability.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = (payment, method) => {
    setShowPaymentGatewayModal(false);
    onClose();
    navigate(`/booking-confirmation/${createdBooking.bookingId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-100 my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Complete Your Booking</h2>
            <p className="text-xs text-slate-500">{vehicle.name} • {rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmitBooking} className="space-y-4">
          {/* Rental Type Choice */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Rental Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRentalType('with_driver')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                  rentalType === 'with_driver'
                    ? 'bg-[#0755C9] text-white border-[#0755C9]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                With Driver (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setRentalType('self_drive')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                  rentalType === 'self_drive'
                    ? 'bg-[#0755C9] text-white border-[#0755C9]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Self Drive
              </button>
            </div>
          </div>

          {/* Locations & Dates Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0755C9] bg-slate-50/50"
              >
                {NEPAL_DISTRICTS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Drop-off Location
              </label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0755C9] bg-slate-50/50"
              >
                {NEPAL_DISTRICTS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0755C9] bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0755C9] bg-slate-50/50"
                required
              />
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800">Customer Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0755C9]"
                required
              />
              <input
                type="text"
                placeholder="Phone (+977 98XXXXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0755C9]"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0755C9]"
              required
            />
            {rentalType === 'self_drive' && (
              <input
                type="text"
                placeholder="Nepal Driving Licence Number (e.g. 01-06-00892144)"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0755C9]"
                required
              />
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('esewa')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'esewa'
                    ? 'border-[#60BB46] bg-[#60BB46]/10 text-[#60BB46] font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#60BB46] text-white text-[10px] flex items-center justify-center font-bold">
                  eS
                </span>
                <span className="text-[11px]">eSewa</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('khalti')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'khalti'
                    ? 'border-[#5C2D91] bg-[#5C2D91]/10 text-[#5C2D91] font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#5C2D91] text-white text-[10px] flex items-center justify-center font-bold">
                  K
                </span>
                <span className="text-[11px]">Khalti</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'cash'
                    ? 'border-[#0755C9] bg-blue-50 text-[#0755C9] font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-slate-600" />
                <span className="text-[11px]">Cash on Handover</span>
              </button>
            </div>
          </div>

          {/* Price Summary Breakdown (Backend verified) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Rental Duration</span>
              <span className="font-bold text-slate-800">{pricing?.durationDays || 2} Days</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Daily Rate</span>
              <span>NPR {pricing?.dailyRate?.toLocaleString() || vehicle.pricing.dailyWithDriver.toLocaleString()}</span>
            </div>
            {pricing?.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>- NPR {pricing.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount</span>
              <span className="text-[#0755C9]">
                NPR {pricing?.grandTotal?.toLocaleString() || (vehicle.pricing.dailyWithDriver * 2).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={submitting || calculating}
            className="w-full py-3.5 rounded-2xl bg-[#0755C9] text-white font-bold text-sm shadow-md shadow-blue-600/25 hover:bg-[#053E94] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? 'Confirming Reservation...' : 'Confirm & Proceed to Payment'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentGatewayModal && createdBooking && (
        <PaymentModal
          isOpen={showPaymentGatewayModal}
          onClose={() => {
            setShowPaymentGatewayModal(false);
            onClose();
            navigate(`/booking-confirmation/${createdBooking.bookingId}`);
          }}
          booking={createdBooking}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default BookingProcessScreen;
