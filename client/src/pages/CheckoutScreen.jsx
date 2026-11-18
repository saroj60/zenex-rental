import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import api from '../services/api';
import NepalLogo from '../components/common/NepalLogo';
import PolicyModal from '../components/checkout/PolicyModal';
import BookingReceiptModal from '../components/checkout/BookingReceiptModal';
import PaymentModal from '../components/modals/PaymentModal';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Sparkles,
  Tag,
  ArrowRight,
  FileCheck,
  Check,
  HelpCircle,
  Info,
  ExternalLink,
  Printer,
  Copy
} from 'lucide-react';

const NEPAL_LOCATIONS = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Lumbini',
  'Janakpur',
  'Nagarkot',
  'Tribhuvan Airport (KTM)',
  'Lalitpur',
  'Bhaktapur',
  'Biratnagar',
  'Mustang (Jomsom)',
];

const TIME_OPTIONS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
];

export default function CheckoutScreen() {
  const { id: routeVehicleId } = useParams();
  const [searchParams] = useSearchParams();
  const queryVehicleId = searchParams.get('vehicleId');
  const targetVehicleId = routeVehicleId || queryVehicleId;

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    rentalType: ctxRentalType,
    setRentalType: setCtxRentalType,
    pickupLocation: ctxPickup,
    dropoffLocation: ctxDropoff,
    startDate: ctxStart,
    endDate: ctxEnd,
    pickupTime: ctxPickupTime,
    returnTime: ctxReturnTime,
  } = useBooking();

  // Active Checkout Step (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Vehicle data
  const [vehicle, setVehicle] = useState(null);
  const [loadingVehicle, setLoadingVehicle] = useState(true);

  // Step 1: Rental details state
  const [rentalType, setRentalType] = useState(ctxRentalType || 'with_driver');
  const [pickupLoc, setPickupLoc] = useState(ctxPickup || 'Kathmandu');
  const [dropoffLoc, setDropoffLoc] = useState(ctxDropoff || 'Pokhara');
  const [pickupDate, setPickupDate] = useState(ctxStart || '2026-11-06');
  const [returnDate, setReturnDate] = useState(ctxEnd || '2026-11-08');
  const [pickupTime, setPickupTime] = useState(ctxPickupTime || '09:00 AM');
  const [returnTime, setReturnTime] = useState(ctxReturnTime || '06:00 PM');
  const [availabilityStatus, setAvailabilityStatus] = useState({ isAvailable: true, message: '' });
  const [validatingAvailability, setValidatingAvailability] = useState(false);

  // Step 2: Customer information state
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || 'Saroj Bhagat',
    email: user?.email || 'customer@nepalcarrental.com',
    phone: user?.phone || '+977 9841892011',
    emergencyPhone: '+977 9801234567',
    address: user?.address?.fullAddress || user?.address?.city || 'Thamel, Kathmandu',
    specialNotes: '',
  });

  // Step 3: Document uploads
  const [documents, setDocuments] = useState({
    drivingLicenseNumber: user?.drivingLicense?.number || '01-06-00892144',
    drivingLicenseDoc: null,
    citizenshipType: 'Citizenship',
    citizenshipNumber: '27-01-78-01928',
    citizenshipDoc: null,
    additionalDoc: null,
  });
  const [uploadingDoc, setUploadingDoc] = useState({});

  // Step 4: Pricing & Payment
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
  const [pricingSnapshot, setPricingSnapshot] = useState(null);
  const [calculatingPrice, setCalculatingPrice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' | 'esewa' | 'khalti' | 'fonepay' | 'bank_transfer'
  const [paymentOption, setPaymentOption] = useState('full'); // 'full' or 'pickup'

  // Step 4: Policies Agreement
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [agreedCancellation, setAgreedCancellation] = useState(true);
  const [agreedPrivacy, setAgreedPrivacy] = useState(true);

  // Final Step 5: Submitted Booking
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Modals
  const [policyModal, setPolicyModal] = useState({ open: false, type: 'terms' });
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Fetch Vehicle
  useEffect(() => {
    let isMounted = true;
    const fetchVehicle = async () => {
      setLoadingVehicle(true);
      try {
        if (targetVehicleId) {
          const res = await api.get(`/vehicles/${targetVehicleId}`);
          if (isMounted) setVehicle(res.data.data);
        } else {
          // Fallback to first available vehicle in fleet
          const res = await api.get('/vehicles');
          if (isMounted && res.data.data?.length > 0) {
            setVehicle(res.data.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load vehicle for checkout:', err);
      } finally {
        if (isMounted) setLoadingVehicle(false);
      }
    };
    fetchVehicle();
    return () => {
      isMounted = false;
    };
  }, [targetVehicleId]);

  // Scroll to top when changing checkout step
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Synchronize customer profile if user changes
  useEffect(() => {
    if (user) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address?.fullAddress || user.address?.city || prev.address,
      }));
    }
  }, [user]);

  // Backend Live Price & Availability Recheck
  useEffect(() => {
    if (!vehicle?._id || !pickupDate || !returnDate) return;

    let isMounted = true;
    const recomputeBackendDetails = async () => {
      setCalculatingPrice(true);
      setValidatingAvailability(true);

      try {
        // 1. Availability validation
        const availRes = await api.post('/bookings/validate', {
          vehicleId: vehicle._id,
          startDate: pickupDate,
          endDate: returnDate,
          pickupLocation: pickupLoc,
          dropoffLocation: dropoffLoc,
        });

        if (isMounted) {
          setAvailabilityStatus({
            isAvailable: availRes.data.isAvailable,
            message: availRes.data.message || '',
          });
        }

        // 2. Pricing snapshot estimation
        const priceRes = await api.post('/pricing/estimate', {
          vehicleId: vehicle._id,
          pickupDate,
          returnDate,
          pickupTime,
          returnTime,
          rentalType,
          couponCode: appliedCoupon?.code || '',
        });

        if (isMounted && priceRes.data.success) {
          setPricingSnapshot(priceRes.data.data);
        }
      } catch (err) {
        console.warn('Backend price calculation error:', err);
      } finally {
        if (isMounted) {
          setCalculatingPrice(false);
          setValidatingAvailability(false);
        }
      }
    };

    recomputeBackendDetails();
    return () => {
      isMounted = false;
    };
  }, [vehicle, pickupDate, returnDate, pickupTime, returnTime, rentalType, pickupLoc, dropoffLoc, appliedCoupon]);

  // Apply Coupon Handler
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponMessage({ type: '', text: '' });
    try {
      const baseAmt = pricingSnapshot?.baseRentalAmount || 15000;
      const res = await api.post('/coupons/validate', {
        code: couponCode.trim(),
        rentalAmount: baseAmt,
      });

      if (res.data.success) {
        setAppliedCoupon(res.data.data);
        setCouponMessage({ type: 'success', text: res.data.message });
      }
    } catch (err) {
      setAppliedCoupon(null);
      setCouponMessage({
        type: 'error',
        text: err.response?.data?.message || 'Invalid or expired coupon code.',
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage({ type: '', text: '' });
  };

  // Document Upload Handler
  const handleFileUpload = async (file, docKey) => {
    if (!file) return;

    // Check size (<= 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    setUploadingDoc((prev) => ({ ...prev, [docKey]: true }));
    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setDocuments((prev) => ({
          ...prev,
          [docKey]: {
            fileUrl: res.data.fileUrl,
            fileName: res.data.fileName,
            size: res.data.size,
          },
        }));
      }
    } catch (err) {
      console.error('File upload error:', err);
      alert('Failed to upload document. Please try again.');
    } finally {
      setUploadingDoc((prev) => ({ ...prev, [docKey]: false }));
    }
  };

  // Submit Final Booking
  const handleSubmitBooking = async () => {
    setSubmitError('');
    if (!agreedTerms || !agreedCancellation || !agreedPrivacy) {
      setSubmitError('Please accept all rental policies and terms before proceeding.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        vehicleId: vehicle._id,
        rentalType,
        pickupLocation: { name: pickupLoc, district: pickupLoc },
        dropoffLocation: { name: dropoffLoc, district: dropoffLoc },
        startDate: pickupDate,
        endDate: returnDate,
        pickupTime,
        returnTime,
        customerDetails: {
          fullName: customerInfo.fullName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          emergencyPhone: customerInfo.emergencyPhone,
          address: customerInfo.address,
          drivingLicenseNumber: rentalType === 'self_drive' ? documents.drivingLicenseNumber : '',
          specialNotes: customerInfo.specialNotes,
          userId: user?._id || user?.id,
        },
        documents: {
          drivingLicense: {
            number: documents.drivingLicenseNumber,
            fileUrl: documents.drivingLicenseDoc?.fileUrl || '',
            fileName: documents.drivingLicenseDoc?.fileName || '',
          },
          citizenshipOrPassport: {
            docType: documents.citizenshipType,
            number: documents.citizenshipNumber,
            fileUrl: documents.citizenshipDoc?.fileUrl || '',
            fileName: documents.citizenshipDoc?.fileName || '',
          },
          additionalDoc: {
            fileUrl: documents.additionalDoc?.fileUrl || '',
            fileName: documents.additionalDoc?.fileName || '',
          },
        },
        paymentMethod,
        couponCode: appliedCoupon?.code || '',
        specialInstructions: customerInfo.specialNotes,
        advanceAmount: paymentOption === 'full' ? pricingSnapshot?.estimatedTotal : 0,
      };

      const res = await api.post('/bookings', payload);
      if (res.data.success) {
        const bookingData = res.data.data;
        setSubmittedBooking(bookingData);

        // If online gateway chosen, open server-side verified payment modal
        if (paymentMethod === 'esewa' || paymentMethod === 'khalti' || paymentMethod === 'fonepay') {
          setShowPaymentModal(true);
        } else {
          setCurrentStep(5);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitError(
        err.response?.data?.message ||
        'Unable to process your booking. Please verify your selected dates and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnlinePaymentVerified = async (paymentRecord, method) => {
    setShowPaymentModal(false);
    if (submittedBooking) {
      try {
        const refreshed = await api.get(`/bookings/${submittedBooking.bookingId || submittedBooking._id}`);
        if (refreshed.data?.data) {
          setSubmittedBooking(refreshed.data.data);
        }
      } catch (e) {
        console.error('Error refreshing booking:', e);
      }
    }
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper values
  const durationDays = pricingSnapshot?.durationDays || 2;
  const isSelfDrive = rentalType === 'self_drive';
  const dailyRate = pricingSnapshot?.dailyRate || (isSelfDrive ? vehicle?.pricing?.dailySelfDrive || 6000 : vehicle?.pricing?.dailyWithDriver || 8000);
  const baseRental = pricingSnapshot?.baseRentalAmount || dailyRate * durationDays;
  const driverCharges = pricingSnapshot?.driverCharges || 0;
  const discountAmount = pricingSnapshot?.discountAmount || 0;
  const securityDeposit = pricingSnapshot?.securityDeposit ?? (isSelfDrive ? vehicle?.pricing?.securityDeposit || 25000 : 0);
  const outstationCharge = pickupLoc !== dropoffLoc ? 2500 : 0;
  const estimatedGrandTotal = pricingSnapshot?.estimatedTotal || (baseRental + driverCharges + outstationCharge - discountAmount + securityDeposit);

  // Stepper items definition
  const STEPS = [
    { num: 1, label: 'Rental Details' },
    { num: 2, label: 'Customer Info' },
    { num: 3, label: 'Documents' },
    { num: 4, label: 'Payment' },
    { num: 5, label: 'Confirmation' },
  ];

  if (loadingVehicle) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#0755C9] animate-spin" />
          <p className="text-xs font-bold text-slate-500">Preparing secure checkout...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-lg space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-black text-slate-900">Vehicle Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested vehicle could not be loaded. Please return to the catalog and choose another vehicle.
          </p>
          <Link
            to="/cars"
            className="inline-block px-5 py-2.5 bg-[#0755C9] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            Explore Available Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Breadcrumb & Step Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-[#0755C9] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/cars" className="hover:text-[#0755C9] transition-colors">Cars</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to={`/cars/${vehicle._id}`} className="hover:text-[#0755C9] transition-colors">{vehicle.name}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900 font-bold">Booking Checkout</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#10243A] tracking-tight mt-1">
              {currentStep === 5 ? 'Booking Reserved' : 'Secure Vehicle Checkout'}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">256-Bit SSL Encrypted & Verified</span>
          </div>
        </div>

        {/* Step Indicator Header */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
            {STEPS.map((s, idx) => {
              const isPassed = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    type="button"
                    disabled={currentStep === 5 || s.num > currentStep}
                    onClick={() => setCurrentStep(s.num)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      isCurrent
                        ? 'bg-[#0755C9] text-white shadow-sm shadow-blue-600/30 ring-2 ring-blue-200'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-black/10">
                      {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                    </span>
                    <span>{s.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`hidden sm:block w-6 lg:w-10 h-0.5 ${isPassed ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold">{submitError}</div>
          </div>
        )}

        {/* Main 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Form Steps (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* ==================================================== */}
            {/* STEP 1: RENTAL DETAILS & VEHICLE INFO */}
            {/* ==================================================== */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black text-[#10243A]">1. Rental Details & Route</h2>
                    <p className="text-xs text-slate-500">Configure pickup, return dates, and driving mode.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black">
                    Step 1 of 4
                  </span>
                </div>

                {/* Selected Vehicle Card */}
                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-full sm:w-40 h-28 bg-white rounded-xl flex items-center justify-center p-2 overflow-hidden shadow-2xs border border-slate-100">
                    <img
                      src={vehicle.images?.[0] || '/cars/creta.png'}
                      alt={vehicle.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0755C9] text-[10px] font-black uppercase">
                        {vehicle.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">
                        Model {vehicle.modelYear || 2024}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{vehicle.name}</h3>
                    <p className="text-xs text-slate-500">
                      {vehicle.specifications?.seats || 5} Seats • {vehicle.specifications?.transmission || 'Automatic'} • {vehicle.specifications?.fuelType || 'Petrol'} • {vehicle.specifications?.mileage || '14 km/l'}
                    </p>
                  </div>
                </div>

                {/* Rental Type Switch */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Select Rental Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRentalType('with_driver')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        rentalType === 'with_driver'
                          ? 'bg-blue-50/80 border-[#0755C9] ring-2 ring-blue-100'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900">With Driver (Chauffeur)</span>
                        {rentalType === 'with_driver' && <CheckCircle2 className="w-4 h-4 text-[#0755C9]" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Licensed professional Nepal chauffeur. No security deposit needed.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRentalType('self_drive')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        rentalType === 'self_drive'
                          ? 'bg-blue-50/80 border-[#0755C9] ring-2 ring-blue-100'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900">Self Drive Freedom</span>
                        {rentalType === 'self_drive' && <CheckCircle2 className="w-4 h-4 text-[#0755C9]" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Drive yourself across Nepal. Driving licence & refundable deposit required.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      Pickup Location <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={pickupLoc}
                      onChange={(e) => setPickupLoc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-[#0755C9] focus:bg-white"
                    >
                      {NEPAL_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Drop-off Location <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={dropoffLoc}
                      onChange={(e) => setDropoffLoc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-[#0755C9] focus:bg-white"
                    >
                      {NEPAL_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates & Times Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                      Pickup Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
                      />
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-2 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl outline-none"
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                      Return Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0755C9]"
                      />
                      <select
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full px-2 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl outline-none"
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Real-time Availability Alert */}
                {validatingAvailability ? (
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-700 text-xs flex items-center gap-2 font-semibold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying vehicle availability with central fleet manager...</span>
                  </div>
                ) : availabilityStatus.isAvailable ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vehicle is ready and available for your selected dates ({durationDays} Days).</span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{availabilityStatus.message || 'Vehicle unavailable for selected dates.'}</span>
                  </div>
                )}

                {/* Next Step CTA */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={!availabilityStatus.isAvailable}
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>Proceed to Customer Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 2: CUSTOMER INFORMATION */}
            {/* ==================================================== */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black text-[#10243A]">2. Primary Customer Information</h2>
                    <p className="text-xs text-slate-500">Contact details for booking voucher and driver coordination.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black">
                    Step 2 of 4
                  </span>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={customerInfo.fullName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                        placeholder="As shown on Citizenship / Passport"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0755C9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        placeholder="For digital confirmation invoice"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0755C9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Mobile Number (Nepal +977) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        placeholder="e.g. 9841892011"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:bg-white focus:border-[#0755C9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Emergency Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="tel"
                        value={customerInfo.emergencyPhone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, emergencyPhone: e.target.value })}
                        placeholder="Family / Co-traveler number"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:bg-white focus:border-[#0755C9] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Residential Address (City & District) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="e.g. Ward No. 4, Baluwatar, Kathmandu"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0755C9] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Special Travel Notes or Route Itinerary (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={customerInfo.specialNotes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, specialNotes: e.target.value })}
                    placeholder="e.g. Traveling with 2 kids, need rooftop luggage carrier, hotel pickup in Lakeside Pokhara..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#0755C9] outline-none"
                  />
                </div>

                {/* Back / Next CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Documents</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 3: DOCUMENT UPLOAD & VERIFICATION */}
            {/* ==================================================== */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black text-[#10243A]">3. Regulatory Document Upload</h2>
                    <p className="text-xs text-slate-500">
                      {isSelfDrive
                        ? 'Self-drive rental requires valid Driving Licence and Citizenship/Passport.'
                        : 'Official customer identification document for vehicle dispatch.'}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black">
                    Step 3 of 4
                  </span>
                </div>

                {/* Instructions Alert */}
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Important Document Guidelines:</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Upload clear photo or PDF copies of your documents. File size must be under <strong>5MB</strong>. Formats supported: <strong>JPG, PNG, PDF</strong>. All documents are stored in secure, private encrypted storage.
                    </p>
                  </div>
                </div>

                {/* Self-Drive Driving Licence Section */}
                {isSelfDrive && (
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-[#0755C9]" />
                        <span className="text-xs font-black text-slate-900">Driving Licence (Nepal / IDP)</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                        Required for Self-Drive
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Licence Number
                        </label>
                        <input
                          type="text"
                          required
                          value={documents.drivingLicenseNumber}
                          onChange={(e) => setDocuments({ ...documents, drivingLicenseNumber: e.target.value })}
                          placeholder="e.g. 01-06-00892144"
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Upload Licence Photo / PDF
                        </label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 px-3 py-2 bg-white hover:bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5 cursor-pointer truncate">
                            <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">
                              {documents.drivingLicenseDoc ? documents.drivingLicenseDoc.fileName : 'Choose file (JPG/PDF)'}
                            </span>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e.target.files[0], 'drivingLicenseDoc')}
                            />
                          </label>
                          {uploadingDoc['drivingLicenseDoc'] && (
                            <Loader2 className="w-4 h-4 animate-spin text-[#0755C9]" />
                          )}
                          {documents.drivingLicenseDoc && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Citizenship / Passport Section */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0755C9]" />
                      <span className="text-xs font-black text-slate-900">National ID / Passport Verification</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                      Primary Identification
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Document Type</label>
                      <select
                        value={documents.citizenshipType}
                        onChange={(e) => setDocuments({ ...documents, citizenshipType: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      >
                        <option value="Citizenship">Nepali Citizenship</option>
                        <option value="Passport">Passport (Foreign / Tourist)</option>
                        <option value="VoterID">Voter ID Card</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">ID Number</label>
                      <input
                        type="text"
                        value={documents.citizenshipNumber}
                        onChange={(e) => setDocuments({ ...documents, citizenshipNumber: e.target.value })}
                        placeholder="e.g. 27-01-78-01928"
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Upload Document</label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-2 bg-white hover:bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5 cursor-pointer truncate">
                          <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            {documents.citizenshipDoc ? documents.citizenshipDoc.fileName : 'Choose file (JPG/PDF)'}
                          </span>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files[0], 'citizenshipDoc')}
                          />
                        </label>
                        {uploadingDoc['citizenshipDoc'] && (
                          <Loader2 className="w-4 h-4 animate-spin text-[#0755C9]" />
                        )}
                        {documents.citizenshipDoc && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back / Next CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Payment & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 4: PAYMENT METHOD & POLICIES */}
            {/* ==================================================== */}
            {currentStep === 4 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black text-[#10243A]">4. Payment Method & Policies</h2>
                    <p className="text-xs text-slate-500">Choose your preferred settlement method for this trip.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black">
                    Step 4 of 4
                  </span>
                </div>

                {/* Payment Option: Full vs Pay at Pickup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      paymentOption === 'full'
                        ? 'bg-blue-50/70 border-[#0755C9] ring-2 ring-blue-100'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 block">Full Advance Settlement</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">Instant VIP fast-track vehicle handover</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('pickup')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      paymentOption === 'pickup'
                        ? 'bg-blue-50/70 border-[#0755C9] ring-2 ring-blue-100'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 block">Pay at Pickup / Arrival</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">Inspect car first, pay balance at counter</span>
                  </button>
                </div>

                {/* Payment Method Selector Grid */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 block">Select Payment Gateway</label>
                  
                  {/* Option 1: Cash / Pay on Counter */}
                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash' ? 'bg-blue-50/80 border-[#0755C9] ring-2 ring-blue-100' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#0755C9] cursor-pointer"
                      />
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Cash on Pickup / Pay at Arrival</p>
                        <p className="text-[11px] text-slate-500">Pay cash in NPR upon vehicle handover and physical inspection</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">NPR {estimatedGrandTotal.toLocaleString()}</span>
                  </label>

                  {/* Option 2: eSewa */}
                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'esewa' ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-100' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="esewa"
                        checked={paymentMethod === 'esewa'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-emerald-600 cursor-pointer"
                      />
                      <div className="w-8 h-8 rounded-xl bg-[#60BB46]/10 flex items-center justify-center font-black text-[#60BB46] text-xs">
                        eS
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">eSewa Mobile Wallet</p>
                        <p className="text-[11px] text-slate-500">Instant digital wallet checkout via eSewa EPAY</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#60BB46]/15 text-[#60BB46] text-[10px] font-black uppercase">
                      Instant
                    </span>
                  </label>

                  {/* Option 3: Khalti */}
                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'khalti' ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-100' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="khalti"
                        checked={paymentMethod === 'khalti'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-purple-600 cursor-pointer"
                      />
                      <div className="w-8 h-8 rounded-xl bg-[#5C2D91]/10 flex items-center justify-center font-black text-[#5C2D91] text-xs">
                        Kh
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Khalti Digital Wallet</p>
                        <p className="text-[11px] text-slate-500">Fast payment via Khalti app or connectIPS netbanking</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#5C2D91]/15 text-[#5C2D91] text-[10px] font-black uppercase">
                      Instant
                    </span>
                  </label>

                  {/* Option 4: Fonepay QR */}
                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'fonepay' ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-100' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="fonepay"
                        checked={paymentMethod === 'fonepay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-rose-600 cursor-pointer"
                      />
                      <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center font-black text-rose-600 text-xs">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Fonepay Direct QR Scan</p>
                        <p className="text-[11px] text-slate-500">Scan using any Nepali banking app (NIC Asia, Nabil, Global IME, etc.)</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-black uppercase">
                      All Banks
                    </span>
                  </label>

                  {/* Option 5: Bank Wire Transfer */}
                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer' ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-100' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-amber-600 cursor-pointer"
                      />
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center font-black text-amber-700 text-xs">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Direct Bank Wire / Corporate Cheque</p>
                        <p className="text-[11px] text-slate-500">Official company account details displayed upon reservation</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                      Wire Transfer
                    </span>
                  </label>
                </div>

                {/* Bank Account Info Box (if Bank Transfer chosen) */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5 animate-in fade-in">
                    <p className="font-extrabold flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-700" />
                      Nepal Car Rental Corporate Account Details:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 text-slate-800">
                      <div>Bank: <strong>Nabil Bank Ltd.</strong></div>
                      <div>Branch: <strong>Thamel Branch, Kathmandu</strong></div>
                      <div>Account: <strong>00101017500293</strong></div>
                      <div>Swift Code: <strong>NARBNPKA</strong></div>
                    </div>
                    <p className="text-[11px] text-amber-800 pt-1">
                      * Please quote your booking reference ID in the transfer remarks.
                    </p>
                  </div>
                )}

                {/* Mandatory Regulatory Policy Checkboxes */}
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#0755C9] rounded-md border-slate-300"
                    />
                    <span className="text-slate-600">
                      I have read and accept the{' '}
                      <button
                        type="button"
                        onClick={() => setPolicyModal({ open: true, type: 'terms' })}
                        className="text-[#0755C9] font-bold hover:underline"
                      >
                        Rental Terms & Conditions
                      </button>
                      {' '}governing vehicle operations in Nepal.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                    <input
                      type="checkbox"
                      checked={agreedCancellation}
                      onChange={(e) => setAgreedCancellation(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#0755C9] rounded-md border-slate-300"
                    />
                    <span className="text-slate-600">
                      I acknowledge the{' '}
                      <button
                        type="button"
                        onClick={() => setPolicyModal({ open: true, type: 'cancellation' })}
                        className="text-[#0755C9] font-bold hover:underline"
                      >
                        Cancellation & Refund Policy
                      </button>
                      {' '}(Free cancellation up to 24 hours before pickup).
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                    <input
                      type="checkbox"
                      checked={agreedPrivacy}
                      onChange={(e) => setAgreedPrivacy(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#0755C9] rounded-md border-slate-300"
                    />
                    <span className="text-slate-600">
                      I consent to the{' '}
                      <button
                        type="button"
                        onClick={() => setPolicyModal({ open: true, type: 'privacy' })}
                        className="text-[#0755C9] font-bold hover:underline"
                      >
                        Privacy Policy
                      </button>
                      {' '}for identity verification and insurance coverage.
                    </span>
                  </label>
                </div>

                {/* Submit Final Booking Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={submitting || !agreedTerms || !agreedCancellation || !agreedPrivacy}
                    onClick={handleSubmitBooking}
                    className="px-8 py-3.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-black shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Reserving Vehicle...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Submit Booking</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 5: BOOKING CONFIRMATION & DIGITAL VOUCHER */}
            {/* ==================================================== */}
            {currentStep === 5 && submittedBooking && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 animate-in zoom-in-95 duration-200">
                
                {/* Celebratory Confirmation Badge */}
                <div className="text-center space-y-3 py-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/15">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-black text-[#10243A]">
                    Booking Request Received!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Your vehicle reservation has been registered under reference{' '}
                    <strong className="text-[#0755C9] font-mono text-sm">{submittedBooking.bookingId}</strong>.
                  </p>
                </div>

                {/* Booking Reference Pill */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">
                      Booking Reference Number
                    </span>
                    <span className="text-xl font-black text-[#10243A] font-mono">
                      {submittedBooking.bookingId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(submittedBooking.bookingId);
                        setCopiedId(true);
                        setTimeout(() => setCopiedId(false), 2000);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId ? 'Copied' : 'Copy Ref'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setReceiptModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#0755C9] text-white text-xs font-black shadow-md shadow-blue-600/20 hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Voucher</span>
                    </button>
                  </div>
                </div>

                {/* Trip Itinerary Card */}
                <div className="p-5 rounded-2xl border border-slate-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#0755C9]" />
                      <span className="font-extrabold text-slate-900">{vehicle.name}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-[#0755C9] uppercase">
                      {submittedBooking.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Pickup Location & Date</span>
                      <p className="font-extrabold text-slate-800 mt-0.5">{pickupLoc}</p>
                      <p className="text-slate-500 text-[11px]">{new Date(pickupDate).toLocaleDateString()} @ {pickupTime}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Drop-off Location & Date</span>
                      <p className="font-extrabold text-slate-800 mt-0.5">{dropoffLoc}</p>
                      <p className="text-slate-500 text-[11px]">{new Date(returnDate).toLocaleDateString()} @ {returnTime}</p>
                    </div>
                  </div>
                </div>

                {/* Admin Approval Notice */}
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Fleet Dispatch & Verification Process:
                  </p>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Your booking is now in the central admin queue. Our fleet manager will verify your uploaded licence documents and assign a certified chauffeur if requested. A notification SMS has been dispatched to <strong>{customerInfo.phone}</strong>.
                  </p>
                </div>

                {/* Final Nav Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link
                    to="/bookings"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center"
                  >
                    View All My Bookings
                  </Link>

                  <Link
                    to="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-600/20 text-center"
                  >
                    Return to Homepage
                  </Link>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Booking Summary & Pricing Breakdown (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-5">
              
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Booking Summary
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              {/* Vehicle Mini Snapshot */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-16 h-12 bg-slate-50 rounded-xl p-1 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
                  <img
                    src={vehicle.images?.[0] || '/cars/creta.png'}
                    alt={vehicle.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-slate-900 truncate">{vehicle.name}</h4>
                  <p className="text-[10px] text-slate-500 capitalize">
                    {rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'} • {vehicle.category}
                  </p>
                </div>
              </div>

              {/* Itinerary Preview */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Route:</span>
                  <span className="font-bold text-slate-900">{pickupLoc} → {dropoffLoc}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Pickup:</span>
                  <span className="font-bold text-slate-900">{pickupDate} ({pickupTime})</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Return:</span>
                  <span className="font-bold text-slate-900">{returnDate} ({returnTime})</span>
                </div>
              </div>

              {/* Coupon Field */}
              <div className="pt-2 border-t border-slate-100">
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Promo code (e.g. FLAT2000)"
                        disabled={!!appliedCoupon}
                        className="w-full pl-9 pr-2 py-2 text-xs font-mono font-bold uppercase rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0755C9] outline-none"
                      />
                    </div>
                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {couponMessage.text && (
                    <p className={`text-[11px] font-semibold ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </form>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Rental ({durationDays} Days):</span>
                  <span className="font-bold font-mono text-slate-900">
                    NPR {baseRental.toLocaleString()}
                  </span>
                </div>

                {driverCharges > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Driver Allowance:</span>
                    <span className="font-bold font-mono text-slate-900">
                      NPR {driverCharges.toLocaleString()}
                    </span>
                  </div>
                )}

                {outstationCharge > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Inter-city Drop-off Fee:</span>
                    <span className="font-bold font-mono text-slate-900">
                      NPR {outstationCharge.toLocaleString()}
                    </span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount:</span>
                    <span className="font-mono">- NPR {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {securityDeposit > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      Security Deposit:
                      <span className="text-[10px] text-slate-400">(Refundable)</span>
                    </span>
                    <span className="font-bold font-mono text-slate-900">
                      NPR {securityDeposit.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Insurance & VAT:</span>
                  <span className="font-bold text-emerald-700">Included (Free)</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-black">
                  <span className="text-slate-900 text-sm">Estimated Total:</span>
                  <span className="text-xl text-[#0755C9] font-mono">
                    NPR {estimatedGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free cancellation up to 24 hrs before trip</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#0755C9] shrink-0" />
                  <span>24/7 Roadside Assistance across Nepal highways</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={policyModal.open}
        policyType={policyModal.type}
        onClose={() => setPolicyModal({ open: false, type: 'terms' })}
      />

      {/* Booking Receipt Voucher Modal */}
      <BookingReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        booking={submittedBooking}
      />

      {/* Online Gateway Verification Modal (eSewa / Khalti / Fonepay) */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setCurrentStep(5);
        }}
        booking={submittedBooking}
        onPaymentSuccess={handleOnlinePaymentVerified}
      />
    </div>
  );
}
