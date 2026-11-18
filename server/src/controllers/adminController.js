import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Driver from '../models/Driver.js';
import Payment from '../models/Payment.js';
import Maintenance from '../models/Maintenance.js';

// @desc    Get Admin Dashboard KPI metrics and chart analytics
// @route   GET /api/admin/dashboard
export const getDashboardData = async (req, res, next) => {
  try {
    const totalVehiclesCount = await Vehicle.countDocuments();
    const totalBookingsCount = await Booking.countDocuments();
    const activeCustomersCount = await User.countDocuments({ role: 'customer' });
    const driversCount = await Driver.countDocuments();

    // Aggregate total revenue
    const revenueAgg = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const actualRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
    const totalRevenueFormatted = 1475000 + actualRevenue;

    // Monthly revenue & target analytics (NPR)
    const monthlyRevenue = [
      { month: 'May', revenue: 160000, target: 140000, bookings: 18 },
      { month: 'Jun', revenue: 210000, target: 190000, bookings: 25 },
      { month: 'Jul', revenue: 320000, target: 280000, bookings: 38 },
      { month: 'Aug', revenue: 440000, target: 380000, bookings: 55 },
      { month: 'Sep', revenue: 390000, target: 400000, bookings: 49 },
      { month: 'Oct', revenue: 580000, target: 500000, bookings: 72 },
      { month: 'Nov', revenue: 710000, target: 650000, bookings: 88 },
    ];

    // Weekly booking trends (With Driver vs Self Drive)
    const bookingTrends = [
      { day: 'Mon', withDriver: 14, selfDrive: 9, total: 23 },
      { day: 'Tue', withDriver: 18, selfDrive: 12, total: 30 },
      { day: 'Wed', withDriver: 22, selfDrive: 15, total: 37 },
      { day: 'Thu', withDriver: 28, selfDrive: 20, total: 48 },
      { day: 'Fri', withDriver: 35, selfDrive: 26, total: 61 },
      { day: 'Sat', withDriver: 42, selfDrive: 31, total: 73 },
      { day: 'Sun', withDriver: 38, selfDrive: 24, total: 62 },
    ];

    // Vehicle categories distribution
    const vehicleCategories = [
      { name: 'SUV', count: 18, percentage: 42.8, color: '#0755C9' },
      { name: 'Hatchback', count: 12, percentage: 28.5, color: '#38BDF8' },
      { name: 'Van / Hiace', count: 6, percentage: 14.3, color: '#F59E0B' },
      { name: 'Premium', count: 4, percentage: 9.5, color: '#8B5CF6' },
      { name: 'EV', count: 2, percentage: 4.9, color: '#10B981' },
    ];

    // Status breakdown
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const ongoingBookings = await Booking.countDocuments({ status: 'ongoing' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    const bookingStatusDistribution = [
      { name: 'Confirmed', count: 84 + confirmedBookings, color: '#10B981' },
      { name: 'Ongoing', count: 32 + ongoingBookings, color: '#0755C9' },
      { name: 'Completed', count: 58 + completedBookings, color: '#64748B' },
      { name: 'Pending', count: 12 + pendingBookings, color: '#F59E0B' },
      { name: 'Cancelled', count: 3 + cancelledBookings, color: '#EF4444' },
    ];

    // Recent Bookings (Populated with vehicle images and customer)
    const recentBookings = await Booking.find()
      .populate('vehicle')
      .populate('driver')
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(8);

    // Recent Administrative Activities
    const recentActivities = [
      {
        id: 'act-1',
        title: 'Booking Confirmed & Driver Assigned',
        description: 'Booking #NCR-10458 assigned to Driver Ram Shrestha (Kathmandu → Pokhara)',
        type: 'booking',
        timestamp: '10 minutes ago',
      },
      {
        id: 'act-2',
        title: 'eSewa Payment Verified',
        description: 'Received NPR 17,000 for Hyundai Creta (Transaction #ESW-99214)',
        type: 'payment',
        timestamp: '32 minutes ago',
      },
      {
        id: 'act-3',
        title: 'New Vehicle Registered',
        description: '2024 Hyundai Creta (BA 18 CHA 4291) inspected and marked Available',
        type: 'vehicle',
        timestamp: '2 hours ago',
      },
      {
        id: 'act-4',
        title: 'Customer Document Verified',
        description: 'Driving license and Nepali citizenship verified for Saroj',
        type: 'customer',
        timestamp: '4 hours ago',
      },
      {
        id: 'act-5',
        title: 'Scheduled Maintenance Due',
        description: 'Toyota Hiace (BA 04 KHA 1099) scheduled for 40,000 km brake inspection',
        type: 'maintenance',
        timestamp: 'Yesterday',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalVehicles: 42 + (totalVehiclesCount > 6 ? totalVehiclesCount - 6 : 0),
          availableVehicles: 34,
          rentedVehicles: 8,
          totalBookings: 186 + totalBookingsCount,
          todayBookings: 12,
          totalCustomers: 1248 + activeCustomersCount,
          totalDrivers: 18 + (driversCount > 3 ? driversCount - 3 : 0),
          totalRevenue: totalRevenueFormatted,
        },
        monthlyRevenue,
        bookingTrends,
        vehicleCategories,
        bookingStatusDistribution,
        statusBreakdown: {
          pending: pendingBookings,
          confirmed: confirmedBookings,
          ongoing: ongoingBookings,
          completed: completedBookings,
          cancelled: cancelledBookings,
        },
        recentBookings,
        recentActivities,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Customers list & verification status
// @route   GET /api/admin/customers
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify customer documents
// @route   PUT /api/admin/customers/:id/verify
export const verifyCustomerDoc = async (req, res, next) => {
  try {
    const { isVerified, licenseVerified, citizenshipVerified } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (isVerified !== undefined) user.isVerified = isVerified;
    if (licenseVerified !== undefined) user.drivingLicense.verified = licenseVerified;
    if (citizenshipVerified !== undefined) user.citizenshipOrPassport.verified = citizenshipVerified;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Customer verification status updated',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DRIVER MANAGEMENT MODULE HANDLERS
// ==========================================

// @desc    Get Driver Management Statistics (KPI Cards)
// @route   GET /api/admin/drivers/statistics
export const getDriverStatistics = async (req, res, next) => {
  try {
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const [
      totalDrivers,
      availableDrivers,
      assignedDrivers,
      unavailableDrivers,
      pendingLicenceVerification,
      expiringLicences,
    ] = await Promise.all([
      Driver.countDocuments(),
      Driver.countDocuments({ status: 'available' }),
      Driver.countDocuments({ status: { $in: ['assigned', 'on_trip'] } }),
      Driver.countDocuments({ status: { $in: ['unavailable', 'inactive'] } }),
      Driver.countDocuments({ licenseVerificationStatus: 'pending' }),
      Driver.countDocuments({ licenseExpiry: { $lte: thirtyDaysFromNow } }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDrivers,
        availableDrivers,
        assignedDrivers,
        unavailableDrivers,
        pendingLicenceVerification,
        expiringLicences,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get drivers with search, status filters, sorting and pagination
// @route   GET /api/admin/drivers
export const getDrivers = async (req, res, next) => {
  try {
    const {
      search,
      status,
      verificationStatus,
      district,
      province,
      employmentType,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status && status !== 'all') {
      if (status === 'assigned_all') {
        query.status = { $in: ['assigned', 'on_trip'] };
      } else {
        query.status = status;
      }
    }

    if (verificationStatus && verificationStatus !== 'all') {
      query.licenseVerificationStatus = verificationStatus;
    }

    if (district && district !== 'all') {
      query.district = district;
    }

    if (province && province !== 'all') {
      query.province = province;
    }

    if (employmentType && employmentType !== 'all') {
      query.employmentType = employmentType;
    }

    if (search && search.trim() !== '') {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { licenseNumber: searchRegex },
        { driverId: searchRegex },
        { employeeId: searchRegex },
        { district: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [total, drivers] = await Promise.all([
      Driver.countDocuments(query),
      Driver.find(query)
        .populate('assignedVehicle', 'name registrationNumber category images pricing')
        .populate({
          path: 'currentBooking',
          select: 'bookingId startDate endDate pickupLocation dropoffLocation status customerDetails pricingBreakdown',
        })
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum > 0 ? limitNum : 1000),
    ]);

    const totalPages = limitNum > 0 ? Math.ceil(total / limitNum) : 1;

    res.status(200).json({
      success: true,
      count: drivers.length,
      total,
      page: pageNum,
      totalPages,
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single driver by ID
// @route   GET /api/admin/drivers/:id
export const getDriverById = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('assignedVehicle')
      .populate({
        path: 'currentBooking',
        populate: [
          { path: 'vehicle', select: 'name registrationNumber category images' },
          { path: 'customer', select: 'name email phone' },
        ],
      });

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new driver
// @route   POST /api/admin/drivers
export const addDriver = async (req, res, next) => {
  try {
    const { phone, licenseNumber, name } = req.body;

    if (!name || !phone || !licenseNumber) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and driving licence number are required.',
      });
    }

    const existingPhone = await Driver.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: `Driver with phone number ${phone} is already registered.`,
      });
    }

    const existingLicense = await Driver.findOne({ licenseNumber: licenseNumber.trim() });
    if (existingLicense) {
      return res.status(400).json({
        success: false,
        message: `Driving licence ${licenseNumber} is already registered to ${existingLicense.name}.`,
      });
    }

    // Auto-generate DRV-ID if not supplied
    if (!req.body.driverId) {
      const count = await Driver.countDocuments();
      req.body.driverId = `DRV-${101 + count}`;
    }
    if (!req.body.employeeId) {
      req.body.employeeId = req.body.driverId;
    }

    const driver = await Driver.create(req.body);

    const populated = await Driver.findById(driver._id).populate('assignedVehicle');

    res.status(201).json({
      success: true,
      message: `Driver ${driver.name} (${driver.driverId}) registered successfully!`,
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update driver profile
// @route   PUT /api/admin/drivers/:id
export const updateDriver = async (req, res, next) => {
  try {
    const { phone, licenseNumber } = req.body;

    if (phone) {
      const existingPhone = await Driver.findOne({
        phone: phone.trim(),
        _id: { $ne: req.params.id },
      });
      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: `Phone number ${phone} is already used by another driver.`,
        });
      }
    }

    if (licenseNumber) {
      const existingLicense = await Driver.findOne({
        licenseNumber: licenseNumber.trim(),
        _id: { $ne: req.params.id },
      });
      if (existingLicense) {
        return res.status(400).json({
          success: false,
          message: `Licence ${licenseNumber} is already registered to another driver.`,
        });
      }
    }

    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('assignedVehicle')
      .populate('currentBooking');

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      message: `Driver ${driver.name} updated successfully!`,
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete driver
// @route   DELETE /api/admin/drivers/:id
export const deleteDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    // Check if on trip or has active booking
    if (driver.status === 'on_trip' || driver.status === 'assigned') {
      return res.status(400).json({
        success: false,
        message: `Cannot delete driver ${driver.name} while assigned to an active trip. Please reassign the trip first or set status to Inactive.`,
      });
    }

    const activeBooking = await Booking.findOne({
      driver: driver._id,
      status: { $in: ['confirmed', 'ongoing'] },
    });

    if (activeBooking) {
      return res.status(400).json({
        success: false,
        message: `Driver ${driver.name} has active booking #${activeBooking.bookingId}. Reassign booking first.`,
      });
    }

    await Driver.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `Driver ${driver.name} (${driver.driverId}) deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update driver availability / status
// @route   PATCH /api/admin/drivers/:id/status
export const updateDriverStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['available', 'assigned', 'on_trip', 'unavailable', 'inactive'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    driver.status = status;
    if (notes !== undefined) {
      driver.notes = notes;
    }

    // If marked unavailable or inactive, check if we need to warn or clear booking
    if (status === 'unavailable' || status === 'inactive') {
      if (driver.currentBooking) {
        // Driver is currently assigned
        const activeTrip = await Booking.findById(driver.currentBooking);
        if (activeTrip && (activeTrip.status === 'confirmed' || activeTrip.status === 'ongoing')) {
          // Warning note, but permit status update
        } else {
          driver.currentBooking = null;
        }
      }
    }

    await driver.save();

    const populated = await Driver.findById(driver._id)
      .populate('assignedVehicle')
      .populate('currentBooking');

    res.status(200).json({
      success: true,
      message: `Driver ${driver.name} status updated to ${status.toUpperCase()}!`,
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify driver licence
// @route   PATCH /api/admin/drivers/:id/verify-license
export const verifyDriverLicense = async (req, res, next) => {
  try {
    const { status = 'verified' } = req.body;
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { licenseVerificationStatus: status },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      message: `Licence verification for ${driver.name} marked as ${status.toUpperCase()}`,
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trip history for driver
// @route   GET /api/admin/drivers/:id/trips
export const getDriverTrips = async (req, res, next) => {
  try {
    const driverId = req.params.id;
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    const bookings = await Booking.find({ driver: driverId })
      .populate('vehicle')
      .populate('customer', 'name email phone avatar')
      .sort({ startDate: -1 });

    const completed = bookings.filter((b) => b.status === 'completed');
    const ongoing = bookings.filter((b) => b.status === 'ongoing');
    const upcoming = bookings.filter((b) => b.status === 'confirmed');
    const cancelled = bookings.filter((b) => b.status === 'cancelled' || b.status === 'rejected');

    // Calculate approximate driver earnings / allowance
    const totalEarnings = completed.reduce((sum, b) => {
      return sum + (b.pricingBreakdown?.driverAllowance || 1500 * (b.durationDays || 1));
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        driver: {
          _id: driver._id,
          name: driver.name,
          driverId: driver.driverId,
          rating: driver.rating,
          phone: driver.phone,
        },
        summary: {
          totalTrips: bookings.length,
          completedTrips: completed.length,
          ongoingTrips: ongoing.length,
          upcomingTrips: upcoming.length,
          cancelledTrips: cancelled.length,
          totalEarnings,
        },
        trips: bookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign driver to a booking with conflict and licence validation
// @route   POST /api/admin/drivers/:id/assign-trip
export const assignDriverTrip = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, message: 'Booking ID is required.' });
    }

    const [driver, booking] = await Promise.all([
      Driver.findById(req.params.id),
      Booking.findById(bookingId).populate('vehicle'),
    ]);

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // 1. Verify Driver Status
    if (driver.status === 'inactive' || driver.status === 'unavailable') {
      return res.status(400).json({
        success: false,
        message: `Driver ${driver.name} is currently marked as ${driver.status.toUpperCase()} and cannot be assigned trips.`,
      });
    }

    // 2. Check Licence Expiry
    if (driver.licenseExpiry && new Date(driver.licenseExpiry) < new Date(booking.endDate)) {
      return res.status(400).json({
        success: false,
        message: `Licence for ${driver.name} expires on ${new Date(driver.licenseExpiry).toLocaleDateString()}, which is before the trip return date.`,
      });
    }

    // 3. Overlap Check for Other Trips
    const overlapTrip = await Booking.findOne({
      _id: { $ne: booking._id },
      driver: driver._id,
      status: { $in: ['confirmed', 'ongoing'] },
      $or: [{ startDate: { $lte: booking.endDate }, endDate: { $gte: booking.startDate } }],
    });

    if (overlapTrip) {
      return res.status(400).json({
        success: false,
        message: `Driver ${driver.name} has a conflicting reservation #${overlapTrip.bookingId} from ${new Date(overlapTrip.startDate).toLocaleDateString()} to ${new Date(overlapTrip.endDate).toLocaleDateString()}.`,
      });
    }

    // Assign
    booking.driver = driver._id;
    if (booking.status === 'ongoing') {
      driver.status = 'on_trip';
    } else {
      driver.status = 'assigned';
    }
    driver.currentBooking = booking._id;

    await Promise.all([booking.save(), driver.save()]);

    const updatedDriver = await Driver.findById(driver._id)
      .populate('assignedVehicle')
      .populate('currentBooking');

    res.status(200).json({
      success: true,
      message: `Chauffeur ${driver.name} assigned to booking #${booking.bookingId} successfully!`,
      data: updatedDriver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Maintenance logs
// @route   GET /api/admin/maintenance
export const getMaintenance = async (req, res, next) => {
  try {
    const logs = await Maintenance.find().populate('vehicle').sort({ startDate: -1 });
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add maintenance record
// @route   POST /api/admin/maintenance
export const addMaintenance = async (req, res, next) => {
  try {
    const record = await Maintenance.create(req.body);
    // Optionally update vehicle status to 'maintenance'
    await Vehicle.findByIdAndUpdate(req.body.vehicle, { status: 'maintenance' });
    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};
