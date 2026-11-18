import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import VehicleAvailability from '../models/VehicleAvailability.js';
import Driver from '../models/Driver.js';
import Coupon from '../models/Coupon.js';
import Notification from '../models/Notification.js';
import Payment from '../models/Payment.js';
import jwt from 'jsonwebtoken';

// Helper: Calculate difference in days (minimum 1 day)
const calculateDays = (start, end) => {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 1);
};

// Helper: Generate unique Nepal Car Rental booking ID (e.g. NCR-10460)
const generateBookingId = async () => {
  const count = await Booking.countDocuments();
  const baseNum = 10458 + count + 1;
  return `NCR-${baseNum}`;
};

// @desc    Price calculation API (Backend verified)
// @route   POST /api/bookings/calculate-price
export const calculatePrice = async (req, res, next) => {
  try {
    const { vehicleId, rentalType, startDate, endDate, couponCode, driverRequired = true } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const durationDays = calculateDays(startDate, endDate);
    const dailyRate =
      rentalType === 'self_drive'
        ? (vehicle.pricing?.dailySelfDrive || 6000)
        : (vehicle.pricing?.dailyWithDriver || 8000);
    const baseTotal = dailyRate * durationDays;

    const driverAllowance = rentalType === 'with_driver' ? (vehicle.pricing?.driverAllowancePerDay || 1500) * durationDays : 0;
    const fuelEstimate = (vehicle.pricing?.fuelPerKmEstimate || 15) * 50; // default 50km/day preview estimate

    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        validUntil: { $gte: new Date() },
      });

      if (coupon && baseTotal >= coupon.minRentalAmount) {
        if (coupon.discountType === 'percentage') {
          discountAmount = Math.min((baseTotal * coupon.discountValue) / 100, coupon.maxDiscountAmount);
        } else {
          discountAmount = Math.min(coupon.discountValue, coupon.maxDiscountAmount);
        }
      }
    }

    const grandTotal = Math.max(baseTotal + driverAllowance - discountAmount, 0);

    res.status(200).json({
      success: true,
      data: {
        vehicleId: vehicle._id,
        vehicleName: vehicle.name,
        rentalType,
        durationDays,
        dailyRate,
        baseTotal,
        driverAllowance,
        fuelEstimate,
        discountAmount,
        grandTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate vehicle booking availability and dates
// @route   POST /api/bookings/validate
export const validateBooking = async (req, res, next) => {
  try {
    const { vehicleId, startDate, endDate, pickupLocation, dropoffLocation } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ success: false, message: 'Vehicle ID is required.' });
    }
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Pickup and return dates are required.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({
        success: false,
        isValid: false,
        message: 'Return date must be on or after pickup date.',
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, isValid: false, message: 'Vehicle not found.' });
    }

    // Check overlapping bookings to prevent double-booking
    const overlappingBooking = await Booking.findOne({
      vehicle: vehicle._id,
      status: { $in: ['confirmed', 'ongoing', 'pending', 'payment_pending'] },
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (overlappingBooking) {
      return res.status(200).json({
        success: true,
        isValid: false,
        isAvailable: false,
        message: 'This vehicle is reserved for the selected dates. Please adjust your travel dates.',
      });
    }

    // Check maintenance / blocked dates
    const blockedDates = await VehicleAvailability.findOne({
      vehicle: vehicle._id,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (blockedDates) {
      return res.status(200).json({
        success: true,
        isValid: false,
        isAvailable: false,
        message: 'Vehicle is currently scheduled for fleet maintenance on these dates.',
      });
    }

    const durationDays = calculateDays(start, end);

    return res.status(200).json({
      success: true,
      isValid: true,
      isAvailable: true,
      durationDays,
      message: 'Vehicle is available for the selected dates.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking with concurrency and overlap check
// @route   POST /api/bookings
export const createBooking = async (req, res, next) => {
  try {
    const {
      vehicleId,
      rentalType = 'with_driver',
      pickupLocation,
      dropoffLocation,
      startDate,
      endDate,
      pickupTime = '09:00 AM',
      returnTime = '06:00 PM',
      customerDetails,
      documents,
      paymentMethod = 'cash',
      couponCode,
      specialInstructions,
      advanceAmount = 0,
    } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({ success: false, message: 'Return date cannot be earlier than pickup date.' });
    }

    // CHECK OVERLAPPING RESERVATIONS TO PREVENT DOUBLE BOOKING
    const overlappingBooking = await Booking.findOne({
      vehicle: vehicleId,
      status: { $in: ['confirmed', 'ongoing', 'pending', 'payment_pending'] },
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This vehicle is already reserved for the chosen dates. Please choose different dates or another vehicle.',
      });
    }

    const durationDays = calculateDays(start, end);
    const isSelfDrive = rentalType === 'self_drive';

    // Tier-based daily rate calculation
    let dailyRate = isSelfDrive
      ? (vehicle.pricing?.dailySelfDrive || 6000)
      : (vehicle.pricing?.dailyWithDriver || 8000);

    let baseTotal = dailyRate * durationDays;
    if (durationDays >= 30 && (isSelfDrive ? vehicle.pricing?.monthlySelfDrive : vehicle.pricing?.monthlyWithDriver)) {
      const monthlyRate = isSelfDrive ? vehicle.pricing.monthlySelfDrive : vehicle.pricing.monthlyWithDriver;
      baseTotal = Math.round((monthlyRate / 30) * durationDays);
    } else if (durationDays >= 7 && (isSelfDrive ? vehicle.pricing?.weeklySelfDrive : vehicle.pricing?.weeklyWithDriver)) {
      const weeklyRate = isSelfDrive ? vehicle.pricing.weeklySelfDrive : vehicle.pricing.weeklyWithDriver;
      baseTotal = Math.round((weeklyRate / 7) * durationDays);
    }

    // Driver charges & outstation delivery allowance
    const driverAllowance = !isSelfDrive ? (vehicle.pricing?.driverAllowancePerDay || 0) * durationDays : 0;
    
    // Outstation fee if pickup and dropoff districts differ
    const pickupCity = pickupLocation?.district || pickupLocation?.name || 'Kathmandu';
    const dropoffCity = dropoffLocation?.district || dropoffLocation?.name || 'Kathmandu';
    const isInterCity = pickupCity.toLowerCase().trim() !== dropoffCity.toLowerCase().trim();
    const deliveryFee = isInterCity ? 2500 : 0;

    // Security deposit (refundable)
    const securityDeposit = isSelfDrive ? (vehicle.pricing?.securityDeposit || 25000) : 0;

    // Coupon discount verification
    let discountAmount = 0;
    let appliedCoupon = null;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true,
        validUntil: { $gte: new Date() },
      });
      if (coupon && baseTotal >= (coupon.minRentalAmount || 0)) {
        if (coupon.discountType === 'percentage') {
          discountAmount = Math.min((baseTotal * coupon.discountValue) / 100, coupon.maxDiscountAmount || 5000);
        } else {
          discountAmount = Math.min(coupon.discountValue, coupon.maxDiscountAmount || 5000);
        }
        appliedCoupon = coupon.code;
      }
    }

    const subtotal = Math.max(0, baseTotal + driverAllowance + deliveryFee - discountAmount);
    const grandTotal = subtotal + securityDeposit;
    const bookingId = await generateBookingId();

    let assignedDriver = null;
    if (!isSelfDrive) {
      assignedDriver = await Driver.findOne({ status: 'available' });
    }

    let customerId = req.user ? (req.user._id || req.user.id) : null;
    if (!customerId && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nepal_car_rental_jwt_secret_key_2026_super_safe');
        customerId = decoded.id;
      } catch (err) {
        // invalid token ignored
      }
    }
    if (!customerId && customerDetails?.userId) {
      customerId = customerDetails.userId;
    }
    if (!customerId) {
      customerId = '6ae861e30ccd5ff08d559615';
    }

    // Initial payment state
    const normalizedMethod = (paymentMethod || 'cash').toLowerCase();
    const isCashOrTransfer = normalizedMethod === 'cash' || normalizedMethod === 'bank_transfer';
    const initialPaid = isCashOrTransfer ? 0 : Number(advanceAmount) || 0;
    const initialPaymentStatus = initialPaid >= grandTotal ? 'paid' : initialPaid > 0 ? 'partially_paid' : 'pending';
    const initialBookingStatus = 'pending'; // Requires admin confirmation

    const booking = await Booking.create({
      bookingId,
      customer: customerId,
      vehicle: vehicle._id,
      driver: assignedDriver ? assignedDriver._id : null,
      rentalType: isSelfDrive ? 'self_drive' : 'with_driver',
      pickupLocation: {
        name: pickupLocation?.name || 'Kathmandu',
        district: pickupLocation?.district || pickupCity,
        fullAddress: pickupLocation?.fullAddress || '',
      },
      dropoffLocation: {
        name: dropoffLocation?.name || 'Pokhara',
        district: dropoffLocation?.district || dropoffCity,
        fullAddress: dropoffLocation?.fullAddress || '',
      },
      startDate: start,
      endDate: end,
      pickupTime: pickupTime || '09:00 AM',
      returnTime: returnTime || '06:00 PM',
      durationDays,
      pricingBreakdown: {
        dailyRate,
        baseTotal,
        driverAllowance,
        fuelEstimate: 0,
        additionalCharges: deliveryFee,
        discountAmount,
        securityDeposit,
        taxAmount: 0,
        grandTotal,
      },
      totalAmount: grandTotal,
      paidAmount: initialPaid,
      customerDetails: {
        fullName: customerDetails?.fullName || 'Customer',
        email: customerDetails?.email || 'customer@nepalcarrental.com',
        phone: customerDetails?.phone || '+977 9800000000',
        emergencyPhone: customerDetails?.emergencyPhone || '',
        address: customerDetails?.address || 'Kathmandu, Nepal',
        drivingLicenseNumber: isSelfDrive ? (customerDetails?.drivingLicenseNumber || documents?.drivingLicense?.number || '') : '',
        specialNotes: customerDetails?.specialNotes || '',
      },
      documents: {
        drivingLicense: {
          number: documents?.drivingLicense?.number || customerDetails?.drivingLicenseNumber || '',
          fileUrl: documents?.drivingLicense?.fileUrl || '',
          fileName: documents?.drivingLicense?.fileName || '',
          verified: false,
        },
        citizenshipOrPassport: {
          docType: documents?.citizenshipOrPassport?.docType || 'Citizenship',
          number: documents?.citizenshipOrPassport?.number || '',
          fileUrl: documents?.citizenshipOrPassport?.fileUrl || '',
          fileName: documents?.citizenshipOrPassport?.fileName || '',
          verified: false,
        },
        additionalDoc: {
          fileUrl: documents?.additionalDoc?.fileUrl || '',
          fileName: documents?.additionalDoc?.fileName || '',
        },
      },
      specialInstructions: specialInstructions || customerDetails?.specialNotes || '',
      status: initialBookingStatus,
      paymentStatus: initialPaymentStatus,
      paymentMethod: normalizedMethod,
    });

    // Create Initial Payment Record for Admin Tracking
    await Payment.create({
      transactionId: `TXN-${booking.bookingId}-${Date.now().toString().slice(-5)}`,
      booking: booking._id,
      customer: customerId,
      amount: grandTotal,
      currency: 'NPR',
      paymentMethod: normalizedMethod,
      status: initialPaymentStatus === 'paid' ? 'paid' : 'pending',
      remarks: `Rental reservation for ${vehicle.name} (${booking.bookingId})`,
      paidAt: initialPaid > 0 ? new Date() : null,
    });

    // Create Notification
    await Notification.create({
      user: customerId,
      title: 'Booking Request Received',
      message: `Your reservation request ${booking.bookingId} for ${vehicle.name} has been received. Our team will verify your details.`,
      type: 'booking',
      data: { bookingId: booking._id },
    }).catch(() => null);

    const populatedBooking = await Booking.findById(booking._id)
      .populate('vehicle')
      .populate('driver')
      .populate('customer', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully! Pending admin approval.',
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking statistics (Admin KPI Cards)
// @route   GET /api/bookings/statistics
export const getBookingStatistics = async (req, res, next) => {
  try {
    const [
      total,
      pending,
      confirmed,
      ongoing,
      completed,
      cancelled,
      rejected,
      allActive,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'ongoing' }),
      Booking.countDocuments({ status: 'completed' }),
      Booking.countDocuments({ status: 'cancelled' }),
      Booking.countDocuments({ status: 'rejected' }),
      Booking.find({ status: { $in: ['confirmed', 'ongoing', 'completed'] } }).select('pricingBreakdown totalAmount paidAmount createdAt startDate'),
    ]);

    // Today's bookings count (created or starting today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    // Financial revenue totals
    let totalRevenue = 0;
    let totalPaid = 0;

    allActive.forEach((b) => {
      const amount = b.totalAmount || b.pricingBreakdown?.grandTotal || 0;
      totalRevenue += amount;
      totalPaid += b.paidAmount || 0;
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        confirmed,
        ongoing,
        completed,
        cancelled,
        rejected,
        todayBookings: Math.max(todayBookings, 1),
        totalRevenue,
        totalPaid,
        totalPendingPayment: Math.max(totalRevenue - totalPaid, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings with extensive filters, search, sorting & pagination (Admin)
// @route   GET /api/bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const {
      status,
      paymentStatus,
      vehicle,
      rentalType,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (paymentStatus && paymentStatus !== 'all') {
      query.paymentStatus = paymentStatus;
    }

    if (vehicle && vehicle !== 'all') {
      query.vehicle = vehicle;
    }

    if (rentalType && rentalType !== 'all') {
      query.rentalType = rentalType;
    }

    if (startDate) {
      query.startDate = { $gte: new Date(startDate) };
    }

    if (endDate) {
      query.endDate = { $lte: new Date(endDate) };
    }

    if (search && search.trim() !== '') {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { bookingId: searchRegex },
        { 'customerDetails.fullName': searchRegex },
        { 'customerDetails.phone': searchRegex },
        { 'customerDetails.email': searchRegex },
        { 'customerDetails.address': searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [total, bookings] = await Promise.all([
      Booking.countDocuments(query),
      Booking.find(query)
        .populate('vehicle')
        .populate('driver')
        .populate('customer', 'name email phone avatar isVerified drivingLicense')
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum > 0 ? limitNum : 1000),
    ]);

    const totalPages = limitNum > 0 ? Math.ceil(total / limitNum) : 1;

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: pageNum,
      totalPages,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Calendar Schedule Events (Admin)
// @route   GET /api/bookings/calendar
export const getBookingCalendar = async (req, res, next) => {
  try {
    const { month, year, vehicleId, driverId } = req.query;
    const query = { status: { $ne: 'cancelled' } };

    if (vehicleId && vehicleId !== 'all') {
      query.vehicle = vehicleId;
    }

    if (driverId && driverId !== 'all') {
      query.driver = driverId;
    }

    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);
      query.startDate = { $lte: endOfMonth };
      query.endDate = { $gte: startOfMonth };
    }

    const bookings = await Booking.find(query)
      .populate('vehicle')
      .populate('driver')
      .populate('customer', 'name email phone')
      .sort({ startDate: 1 });

    const calendarEvents = bookings.map((b) => ({
      id: b._id,
      bookingId: b.bookingId,
      title: `${b.vehicle?.name || 'Vehicle'} – ${b.customerDetails?.fullName || 'Customer'}`,
      start: b.startDate,
      end: b.endDate,
      pickupTime: b.pickupTime,
      returnTime: b.returnTime,
      status: b.status,
      paymentStatus: b.paymentStatus,
      rentalType: b.rentalType,
      totalAmount: b.pricingBreakdown?.grandTotal || b.totalAmount || 0,
      paidAmount: b.paidAmount || 0,
      vehicle: b.vehicle,
      driver: b.driver,
      customerDetails: b.customerDetails,
      pickupLocation: b.pickupLocation,
      dropoffLocation: b.dropoffLocation,
    }));

    res.status(200).json({
      success: true,
      count: calendarEvents.length,
      data: calendarEvents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID or bookingId
// @route   GET /api/bookings/:id
export const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    let booking;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      booking = await Booking.findById(id)
        .populate('vehicle')
        .populate('driver')
        .populate('customer');
    } else {
      booking = await Booking.findOne({ bookingId: id.toUpperCase() })
        .populate('vehicle')
        .populate('driver')
        .populate('customer');
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm booking with vehicle overlap verification
// @route   PATCH /api/bookings/:id/confirm
export const confirmBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('vehicle').populate('driver');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.status === 'confirmed') {
      return res.status(400).json({ success: false, message: 'Booking is already confirmed.' });
    }

    // Overlap validation on vehicle
    const overlap = await Booking.findOne({
      _id: { $ne: booking._id },
      vehicle: booking.vehicle?._id,
      status: { $in: ['confirmed', 'ongoing'] },
      $or: [{ startDate: { $lte: booking.endDate }, endDate: { $gte: booking.startDate } }],
    });

    if (overlap) {
      return res.status(400).json({
        success: false,
        message: `Conflict: Vehicle is already booked under ${overlap.bookingId} from ${new Date(overlap.startDate).toLocaleDateString()} to ${new Date(overlap.endDate).toLocaleDateString()}.`,
      });
    }

    booking.status = 'confirmed';
    await booking.save();

    // Upsert availability block
    if (booking.vehicle) {
      await VehicleAvailability.findOneAndUpdate(
        { booking: booking._id },
        {
          vehicle: booking.vehicle._id,
          startDate: booking.startDate,
          endDate: booking.endDate,
          status: 'booked',
          notes: `Confirmed Booking ${booking.bookingId}`,
        },
        { upsert: true, new: true }
      );
    }

    // Record notification
    try {
      if (booking.customer) {
        await Notification.create({
          user: booking.customer,
          title: `Booking Confirmed: ${booking.bookingId}`,
          message: `Your reservation for ${booking.vehicle?.name || 'the vehicle'} from ${new Date(booking.startDate).toLocaleDateString()} has been confirmed!`,
          type: 'booking',
          link: `/bookings/${booking.bookingId}`,
        });
      }
    } catch (notifErr) {
      console.warn('Notification log error:', notifErr.message);
    }

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Booking ${booking.bookingId} confirmed successfully!`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject booking with reason
// @route   PATCH /api/bookings/:id/reject
export const rejectBooking = async (req, res, next) => {
  try {
    const { reason } = req.body;
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'A rejection reason is required.' });
    }

    const booking = await Booking.findById(req.params.id).populate('vehicle');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = 'rejected';
    booking.rejectionReason = reason.trim();
    await booking.save();

    // Release any vehicle availability block
    await VehicleAvailability.deleteMany({ booking: booking._id });

    // Send customer notification
    try {
      if (booking.customer) {
        await Notification.create({
          user: booking.customer,
          title: `Booking Rejected: ${booking.bookingId}`,
          message: `Your booking for ${booking.vehicle?.name || 'vehicle'} was declined. Reason: ${reason}`,
          type: 'booking',
        });
      }
    } catch (err) {
      console.warn(err.message);
    }

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Booking ${booking.bookingId} rejected.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking with policy fee calculation
// @route   PATCH /api/bookings/:id/cancel
export const cancelBooking = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id).populate('vehicle');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: `Cannot cancel a ${booking.status} booking.` });
    }

    // Policy fee calculation based on hours until pickup
    const now = new Date();
    const pickupDate = new Date(booking.startDate);
    const hoursUntilPickup = (pickupDate - now) / (1000 * 60 * 60);

    const grandTotal = booking.pricingBreakdown?.grandTotal || booking.totalAmount || 0;
    let cancellationFee = 0;

    if (hoursUntilPickup > 48) {
      cancellationFee = 0; // Free cancellation > 48h
    } else if (hoursUntilPickup > 24) {
      cancellationFee = Math.round(grandTotal * 0.1); // 10% cancellation charge
    } else if (hoursUntilPickup > 0) {
      cancellationFee = Math.round(grandTotal * 0.25); // 25% cancellation charge
    } else {
      cancellationFee = Math.round(grandTotal * 0.5); // 50% cancellation charge once trip day started
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason || 'Admin cancelled booking';
    booking.cancellationFee = cancellationFee;
    booking.cancellationDate = new Date();
    await booking.save();

    // Release Vehicle Availability block
    await VehicleAvailability.deleteMany({ booking: booking._id });

    // Release assigned driver if any
    if (booking.driver) {
      await Driver.findByIdAndUpdate(booking.driver, { status: 'available', currentBooking: null });
    }

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Booking ${booking.bookingId} cancelled. Applicable fee: NPR ${cancellationFee.toLocaleString()}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign driver with overlap check
// @route   PATCH /api/bookings/:id/assign-driver
export const assignDriver = async (req, res, next) => {
  try {
    const { driverId } = req.body;
    if (!driverId) {
      return res.status(400).json({ success: false, message: 'Driver ID is required.' });
    }

    const [booking, driver] = await Promise.all([
      Booking.findById(req.params.id),
      Driver.findById(driverId),
    ]);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    // Check driver overlap on the same dates
    const overlapTrip = await Booking.findOne({
      _id: { $ne: booking._id },
      driver: driverId,
      status: { $in: ['confirmed', 'ongoing'] },
      $or: [{ startDate: { $lte: booking.endDate }, endDate: { $gte: booking.startDate } }],
    });

    if (overlapTrip) {
      return res.status(400).json({
        success: false,
        message: `Driver ${driver.name} is already assigned to trip ${overlapTrip.bookingId} from ${new Date(overlapTrip.startDate).toLocaleDateString()} to ${new Date(overlapTrip.endDate).toLocaleDateString()}.`,
      });
    }

    booking.driver = driver._id;
    await booking.save();

    // If booking is currently ongoing, update driver status to on_trip, else assigned
    if (booking.status === 'ongoing') {
      await Driver.findByIdAndUpdate(driver._id, { status: 'on_trip', currentBooking: booking._id });
    } else {
      await Driver.findByIdAndUpdate(driver._id, { status: 'assigned', currentBooking: booking._id });
    }

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Chauffeur ${driver.name} successfully assigned to booking ${booking.bookingId}!`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove assigned driver
// @route   PATCH /api/bookings/:id/remove-driver
export const removeDriver = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.driver) {
      await Driver.findByIdAndUpdate(booking.driver, { status: 'available', currentBooking: null });
    }

    booking.driver = null;
    await booking.save();

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Driver unassigned from booking ${booking.bookingId}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign or reassign vehicle with date overlap check
// @route   PATCH /api/bookings/:id/assign-vehicle
export const assignVehicle = async (req, res, next) => {
  try {
    const { vehicleId } = req.body;
    if (!vehicleId) {
      return res.status(400).json({ success: false, message: 'Vehicle ID is required.' });
    }

    const [booking, vehicle] = await Promise.all([
      Booking.findById(req.params.id),
      Vehicle.findById(vehicleId),
    ]);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // Check for overlap on the new vehicle
    const overlap = await Booking.findOne({
      _id: { $ne: booking._id },
      vehicle: vehicle._id,
      status: { $in: ['confirmed', 'ongoing'] },
      $or: [{ startDate: { $lte: booking.endDate }, endDate: { $gte: booking.startDate } }],
    });

    if (overlap) {
      return res.status(400).json({
        success: false,
        message: `Vehicle ${vehicle.name} (${vehicle.registrationNumber}) is already booked for trip ${overlap.bookingId}.`,
      });
    }

    // Recalculate price if vehicle daily rate differs
    const dailyRate =
      booking.rentalType === 'self_drive'
        ? (vehicle.pricing?.dailySelfDrive || 6000)
        : (vehicle.pricing?.dailyWithDriver || 8000);
    const durationDays = booking.durationDays || calculateDays(booking.startDate, booking.endDate);
    const baseTotal = dailyRate * durationDays;
    const discount = booking.pricingBreakdown?.discountAmount || 0;
    const grandTotal = Math.max(baseTotal - discount, 0);

    booking.vehicle = vehicle._id;
    booking.pricingBreakdown.dailyRate = dailyRate;
    booking.pricingBreakdown.baseTotal = baseTotal;
    booking.pricingBreakdown.grandTotal = grandTotal;
    booking.totalAmount = grandTotal;
    await booking.save();

    // Update availability block
    await VehicleAvailability.findOneAndUpdate(
      { booking: booking._id },
      {
        vehicle: vehicle._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: 'booked',
        notes: `Reassigned to ${vehicle.name} (${booking.bookingId})`,
      },
      { upsert: true }
    );

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Assigned vehicle updated to ${vehicle.name} (${vehicle.registrationNumber})`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record or update payment for booking (Cash, Bank Transfer, eSewa, Khalti, etc.)
// @route   PATCH /api/bookings/:id/payment
export const recordPayment = async (req, res, next) => {
  try {
    const { amount, paymentMethod, paymentStatus, transactionRef, remarks } = req.body;
    const booking = await Booking.findById(req.params.id).populate('vehicle').populate('customer');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const payAmount = Number(amount) || 0;
    const newPaidAmount = (booking.paidAmount || 0) + payAmount;
    const grandTotal = booking.pricingBreakdown?.grandTotal || booking.totalAmount || 0;

    booking.paidAmount = newPaidAmount;

    if (paymentMethod) {
      booking.paymentMethod = paymentMethod;
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    } else {
      if (newPaidAmount >= grandTotal) {
        booking.paymentStatus = 'paid';
      } else if (newPaidAmount > 0) {
        booking.paymentStatus = 'partially_paid';
      }
    }

    await booking.save();

    // Save payment log in Payment model if amount > 0
    if (payAmount > 0) {
      try {
        await Payment.create({
          transactionId: transactionRef || `PAY-${Date.now()}`,
          booking: booking._id,
          customer: booking.customer?._id || '6ae861e30ccd5ff08d559615',
          amount: payAmount,
          currency: 'NPR',
          paymentMethod: (paymentMethod || 'cash').toLowerCase().replace(' ', '_'),
          status: 'completed',
          paidAt: new Date(),
          remarks: remarks || `Admin recorded payment of NPR ${payAmount.toLocaleString()}`,
        });
      } catch (payErr) {
        console.warn('Payment model log warning:', payErr.message);
      }
    }

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Payment of NPR ${payAmount.toLocaleString()} recorded successfully! Total paid: NPR ${newPaidAmount.toLocaleString()}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update status (Pending -> Confirmed -> Ongoing -> Completed)
// @route   PATCH /api/bookings/:id/status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus, driverId } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (status) {
      booking.status = status;

      // Handle ongoing / completed driver state
      if (status === 'ongoing' && booking.driver) {
        await Driver.findByIdAndUpdate(booking.driver, { status: 'on_trip', currentBooking: booking._id });
      } else if (status === 'completed' && booking.driver) {
        await Driver.findByIdAndUpdate(booking.driver, { status: 'available', currentBooking: null });
        await VehicleAvailability.deleteMany({ booking: booking._id });
      } else if (status === 'cancelled' || status === 'rejected') {
        if (booking.driver) {
          await Driver.findByIdAndUpdate(booking.driver, { status: 'available', currentBooking: null });
        }
        await VehicleAvailability.deleteMany({ booking: booking._id });
      }
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    if (driverId) {
      booking.driver = driverId;
    }

    await booking.save();

    const updated = await Booking.findById(booking._id).populate('vehicle').populate('driver').populate('customer');

    res.status(200).json({
      success: true,
      message: `Booking status transitioned to ${status || 'updated'}!`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer's bookings
// @route   GET /api/bookings/my-bookings
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('vehicle')
      .populate('driver')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
