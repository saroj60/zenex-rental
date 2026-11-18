import Vehicle from '../models/Vehicle.js';
import VehicleCategory from '../models/VehicleCategory.js';
import Booking from '../models/Booking.js';
import VehicleAvailability from '../models/VehicleAvailability.js';
import Review from '../models/Review.js';
import Coupon from '../models/Coupon.js';

// @desc    Get all vehicles with filters, sorting & availability check
// @route   GET /api/vehicles
export const getVehicles = async (req, res, next) => {
  try {
    const {
      category,
      occasion,
      minPrice,
      maxPrice,
      seats,
      fuelType,
      transmission,
      rentalType,
      search,
      sortBy,
      startDate,
      endDate,
    } = req.query;

    const query = { status: { $ne: 'inactive' } };

    // Occasion filter
    if (occasion && occasion !== 'all' && occasion !== 'All') {
      query.suitableFor = { $regex: new RegExp(`^${occasion.trim()}$`, 'i') };
    }

    // Category filter
    if (category && category !== 'all' && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Rental type support
    if (rentalType === 'self_drive') {
      query['options.allowsSelfDrive'] = true;
    } else if (rentalType === 'with_driver') {
      query['options.allowsWithDriver'] = true;
    }

    // Capacity (seats)
    if (seats) {
      if (seats.includes('+')) {
        const minSeats = parseInt(seats.replace('+', ''), 10);
        query.seats = { $gte: minSeats };
      } else {
        query.seats = parseInt(seats, 10);
      }
    }

    // Fuel Type
    if (fuelType && fuelType !== 'All') {
      query.fuelType = fuelType;
    }

    // Transmission
    if (transmission && transmission !== 'All') {
      query.transmission = transmission;
    }

    // Price range filter (based on dailyWithDriver or dailySelfDrive)
    const priceField = rentalType === 'self_drive' ? 'pricing.dailySelfDrive' : 'pricing.dailyWithDriver';
    if (minPrice || maxPrice) {
      query[priceField] = {};
      if (minPrice) query[priceField].$gte = Number(minPrice);
      if (maxPrice) query[priceField].$lte = Number(maxPrice);
    }

    // Text search
    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    // Date Availability Filter: Exclude vehicles booked or in maintenance during [startDate, endDate]
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Find overlapping bookings
      const activeBookings = await Booking.find({
        status: { $in: ['confirmed', 'ongoing', 'pending'] },
        $or: [
          { startDate: { $lte: end }, endDate: { $gte: start } },
        ],
      }).select('vehicle');

      // Find overlapping blocked dates in VehicleAvailability
      const blockedAvailabilities = await VehicleAvailability.find({
        $or: [
          { startDate: { $lte: end }, endDate: { $gte: start } },
        ],
      }).select('vehicle');

      const unavailableVehicleIds = [
        ...activeBookings.map((b) => b.vehicle.toString()),
        ...blockedAvailabilities.map((a) => a.vehicle.toString()),
      ];

      if (unavailableVehicleIds.length > 0) {
        query._id = { $nin: unavailableVehicleIds };
      }
    }

    // Build sort
    let sortOptions = { isFeatured: -1, rating: -1 };
    if (sortBy === 'price_asc') {
      sortOptions = { [priceField]: 1 };
    } else if (sortBy === 'price_desc') {
      sortOptions = { [priceField]: -1 };
    } else if (sortBy === 'rating') {
      sortOptions = { rating: -1, reviewCount: -1 };
    } else if (sortBy === 'popular') {
      sortOptions = { reviewCount: -1 };
    }

    const vehicles = await Vehicle.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single vehicle by ID or slug
// @route   GET /api/vehicles/:id
export const getVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    let vehicle;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      vehicle = await Vehicle.findById(id);
    } else {
      vehicle = await Vehicle.findOne({ slug: id });
    }

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all vehicle categories
// @route   GET /api/vehicles/categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await VehicleCategory.find().sort({ displayOrder: 1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a vehicle (Admin)
// @route   POST /api/vehicles
export const createVehicle = async (req, res, next) => {
  try {
    const vehicleData = req.body;

    // Check unique registration plate
    if (vehicleData.registrationNumber) {
      const existing = await Vehicle.findOne({
        registrationNumber: { $regex: new RegExp(`^${vehicleData.registrationNumber.trim()}$`, 'i') },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Vehicle with registration number "${vehicleData.registrationNumber}" is already registered.`,
        });
      }
    }

    if (!vehicleData.slug && vehicleData.name) {
      const baseSlug = vehicleData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const existingSlug = await Vehicle.findOne({ slug: baseSlug });
      vehicleData.slug = existingSlug ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;
    }

    const vehicle = await Vehicle.create(vehicleData);
    res.status(201).json({
      success: true,
      message: 'Vehicle registered successfully',
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a vehicle (Admin)
// @route   PUT /api/vehicles/:id
export const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a vehicle (Admin)
// @route   DELETE /api/vehicles/:id
export const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Vehicle removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured vehicles for customer homepage
// @route   GET /api/vehicles/featured
export const getFeaturedVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({
      status: { $in: ['available', 'rented'] },
    })
      .sort({ isFeatured: -1, rating: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check availability for vehicles across dates
// @route   GET /api/vehicles/availability
export const checkAvailability = async (req, res, next) => {
  try {
    const { startDate, endDate, rentalType, category, occasion } = req.query;

    const query = { status: { $ne: 'inactive' } };

    if (occasion && occasion !== 'all' && occasion !== 'All') {
      query.suitableFor = { $regex: new RegExp(`^${occasion.trim()}$`, 'i') };
    }

    if (category && category !== 'all' && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (rentalType === 'self_drive') {
      query['options.allowsSelfDrive'] = true;
    } else if (rentalType === 'with_driver') {
      query['options.allowsWithDriver'] = true;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const activeBookings = await Booking.find({
        status: { $in: ['confirmed', 'ongoing', 'pending'] },
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      }).select('vehicle');

      const blockedAvailabilities = await VehicleAvailability.find({
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      }).select('vehicle');

      const unavailableVehicleIds = [
        ...activeBookings.map((b) => b.vehicle.toString()),
        ...blockedAvailabilities.map((a) => a.vehicle.toString()),
      ];

      if (unavailableVehicleIds.length > 0) {
        query._id = { $nin: unavailableVehicleIds };
      }
    }

    const availableVehicles = await Vehicle.find(query).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: availableVehicles.length,
      data: availableVehicles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get explore available vehicles with advanced filters, backend price calculation and pagination
// @route   GET /api/vehicles/available
export const getAvailableVehicles = async (req, res, next) => {
  try {
    const {
      pickupLocation,
      dropoffLocation,
      pickupDate,
      returnDate,
      startDate,
      endDate,
      rentalType = 'with_driver',
      category,
      occasion,
      transmission,
      fuelType,
      minPrice,
      maxPrice,
      seats,
      features,
      sort = 'recommended',
      search,
      page = 1,
      limit = 9,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 9);
    const skip = (pageNum - 1) * limitNum;

    // Base query: Exclude inactive and maintenance fleet
    const query = {
      status: { $nin: ['inactive', 'Inactive', 'maintenance', 'Maintenance'] },
    };

    // Occasion filter
    if (occasion && occasion !== 'all' && occasion !== 'All') {
      query.suitableFor = { $regex: new RegExp(`^${occasion.trim()}$`, 'i') };
    }

    // Category filter with smart synonyms
    if (category && category !== 'all' && category !== 'All') {
      if (category.toLowerCase() === 'luxury') {
        query.category = { $in: ['Luxury', 'Premium', 'luxury', 'premium'] };
      } else if (category.toLowerCase() === 'van') {
        query.category = { $in: ['Van/Hiace', 'Van', 'van', 'van/hiace'] };
      } else if (category.toLowerCase() === 'electric') {
        query.category = { $in: ['Electric Vehicles', 'Electric', 'electric', 'electric vehicles'] };
      } else {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
    }

    // Rental type support
    if (rentalType === 'self_drive') {
      query['options.allowsSelfDrive'] = true;
    } else if (rentalType === 'with_driver') {
      query['options.allowsWithDriver'] = true;
    }

    // Transmission
    if (transmission && transmission !== 'all' && transmission !== 'All') {
      query.transmission = { $regex: new RegExp(`^${transmission}$`, 'i') };
    }

    // Fuel Type
    if (fuelType && fuelType !== 'all' && fuelType !== 'All') {
      query.fuelType = { $regex: new RegExp(`^${fuelType}$`, 'i') };
    }

    // Seating capacity
    if (seats && seats !== 'all' && seats !== 'All') {
      if (String(seats).includes('+')) {
        const minSeats = parseInt(String(seats).replace('+', ''), 10);
        query.seats = { $gte: minSeats };
      } else {
        query.seats = parseInt(seats, 10);
      }
    }

    // Features filter
    if (features) {
      const featureList = Array.isArray(features)
        ? features
        : String(features).split(',').map((f) => f.trim()).filter(Boolean);

      if (featureList.length > 0) {
        const featureConditions = [];
        featureList.forEach((feat) => {
          if (feat.toLowerCase() === 'ac') {
            featureConditions.push({ hasAC: true });
          } else {
            featureConditions.push({
              features: { $regex: new RegExp(feat, 'i') },
            });
          }
        });
        if (featureConditions.length > 0) {
          query.$and = (query.$and || []).concat(featureConditions);
        }
      }
    }

    // Price range filter based on active rental mode
    const priceField =
      rentalType === 'self_drive' ? 'pricing.dailySelfDrive' : 'pricing.dailyWithDriver';

    if (minPrice || maxPrice) {
      query[priceField] = {};
      if (minPrice) query[priceField].$gte = Number(minPrice);
      if (maxPrice) query[priceField].$lte = Number(maxPrice);
    }

    // Text search (name, brand, model)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { 'specifications.color': searchRegex },
      ];
    }

    // Dates & Availability Calculation
    const startStr = pickupDate || startDate;
    const endStr = returnDate || endDate;
    let durationDays = 2; // default 2 days if unselected

    if (startStr && endStr) {
      const start = new Date(startStr);
      const end = new Date(endStr);
      const diffMs = Math.max(0, end - start);
      durationDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

      // Find overlapping confirmed/ongoing/pending reservations
      const overlappingBookings = await Booking.find({
        status: { $in: ['confirmed', 'ongoing', 'pending'] },
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      }).select('vehicle');

      // Find overlapping maintenance/blocked periods
      const blockedDates = await VehicleAvailability.find({
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      }).select('vehicle');

      const unavailableIds = [
        ...overlappingBookings.map((b) => b.vehicle.toString()),
        ...blockedDates.map((a) => a.vehicle.toString()),
      ];

      if (unavailableIds.length > 0) {
        query._id = { $nin: unavailableIds };
      }
    }

    // Build Sorting
    let sortOptions = { isFeatured: -1, rating: -1 };
    if (sort === 'price_asc') {
      sortOptions = { [priceField]: 1 };
    } else if (sort === 'price_desc') {
      sortOptions = { [priceField]: -1 };
    } else if (sort === 'newest') {
      sortOptions = { modelYear: -1, createdAt: -1 };
    } else if (sort === 'popular') {
      sortOptions = { reviewCount: -1, rating: -1 };
    } else {
      // Recommended default
      sortOptions = { isFeatured: -1, rating: -1, reviewCount: -1 };
    }

    // Query Database with Count and Pagination
    const total = await Vehicle.countDocuments(query);
    const vehicles = await Vehicle.find(query)
      .select('-documents -partnerName -__v')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Compute backend price calculations for each vehicle
    const enrichedVehicles = vehicles.map((v) => {
      const vObj = v.toObject();
      const dailyRate =
        rentalType === 'self_drive'
          ? vObj.pricing?.dailySelfDrive || 7000
          : vObj.pricing?.dailyWithDriver || 8500;
      const totalEstimatedPrice = dailyRate * durationDays;
      const securityDeposit = vObj.pricing?.securityDeposit || 20000;

      return {
        ...vObj,
        calculatedPricing: {
          durationDays,
          rentalType,
          dailyRate,
          totalEstimatedPrice,
          securityDeposit,
          driverAllowanceIncluded: rentalType === 'with_driver',
        },
      };
    });

    const totalPages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      count: enrichedVehicles.length,
      total,
      page: pageNum,
      totalPages,
      durationDays,
      rentalType,
      data: enrichedVehicles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check availability for a specific vehicle across requested dates
// @route   GET /api/vehicles/:id/availability
export const getVehicleAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, pickupDate, returnDate } = req.query;

    const vehicle = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Vehicle.findById(id)
      : await Vehicle.findOne({ slug: id });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const vStatus = (vehicle.status || '').toLowerCase();
    if (vStatus === 'maintenance') {
      return res.status(200).json({
        success: true,
        isAvailable: false,
        status: 'Under Maintenance',
        message: 'This vehicle is currently undergoing scheduled maintenance & inspection.',
      });
    }

    if (vStatus === 'inactive') {
      return res.status(200).json({
        success: true,
        isAvailable: false,
        status: 'Temporarily Unavailable',
        message: 'This vehicle is temporarily not in active service.',
      });
    }

    const startStr = startDate || pickupDate;
    const endStr = endDate || returnDate;

    if (!startStr || !endStr) {
      return res.status(200).json({
        success: true,
        isAvailable: vStatus === 'available',
        status: vStatus === 'available' ? 'Available' : 'Already Booked',
        message: 'General availability based on vehicle status.',
      });
    }

    const start = new Date(startStr);
    const end = new Date(endStr);

    // Overlapping booking checks
    const overlappingBooking = await Booking.findOne({
      vehicle: vehicle._id,
      status: { $in: ['confirmed', 'ongoing', 'pending'] },
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (overlappingBooking) {
      return res.status(200).json({
        success: true,
        isAvailable: false,
        status: 'Already Booked',
        message: `This vehicle is already reserved from ${new Date(overlappingBooking.startDate).toLocaleDateString()} to ${new Date(overlappingBooking.endDate).toLocaleDateString()}.`,
        bookedPeriod: {
          startDate: overlappingBooking.startDate,
          endDate: overlappingBooking.endDate,
        },
      });
    }

    // Overlapping blocked availability checks
    const blocked = await VehicleAvailability.findOne({
      vehicle: vehicle._id,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (blocked) {
      return res.status(200).json({
        success: true,
        isAvailable: false,
        status: 'Temporarily Unavailable',
        message: 'Vehicle blocked by fleet management for inspection/dispatch.',
      });
    }

    return res.status(200).json({
      success: true,
      isAvailable: true,
      status: 'Available',
      message: 'Vehicle is ready and available for your selected travel dates in Nepal.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer reviews for a specific vehicle
// @route   GET /api/vehicles/:id/reviews
export const getVehicleReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Vehicle.findById(id)
      : await Vehicle.findOne({ slug: id });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    let reviews = await Review.find({ vehicle: vehicle._id })
      .populate('user', 'name avatar isVerified address')
      .sort({ createdAt: -1 });

    // If this particular vehicle doesn't have individual reviews yet, fetch approved reviews from the same category
    if (reviews.length === 0) {
      const categoryVehicles = await Vehicle.find({ category: vehicle.category }).select('_id');
      const categoryIds = categoryVehicles.map((v) => v._id);
      reviews = await Review.find({ vehicle: { $in: categoryIds } })
        .populate('user', 'name avatar isVerified address')
        .sort({ rating: -1, createdAt: -1 })
        .limit(3);
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get similar vehicles in the same category or price range
// @route   GET /api/vehicles/:id/similar
export const getSimilarVehicles = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Vehicle.findById(id)
      : await Vehicle.findOne({ slug: id });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const similar = await Vehicle.find({
      _id: { $ne: vehicle._id },
      category: vehicle.category,
      status: { $nin: ['inactive', 'Inactive', 'maintenance', 'Maintenance'] },
    })
      .select('-documents -partnerName -__v')
      .limit(3);

    // If less than 3, backfill with top rated fleet
    if (similar.length < 3) {
      const more = await Vehicle.find({
        _id: { $nin: [vehicle._id, ...similar.map((s) => s._id)] },
        status: { $nin: ['inactive', 'Inactive', 'maintenance', 'Maintenance'] },
      })
        .select('-documents -partnerName -__v')
        .limit(3 - similar.length);
      similar.push(...more);
    }

    res.status(200).json({
      success: true,
      count: similar.length,
      data: similar,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Calculate verified price estimate on the backend
// @route   POST /api/pricing/estimate or POST /api/vehicles/:id/estimate-price
export const calculatePriceEstimate = async (req, res, next) => {
  try {
    const vehicleId = req.params.id || req.body.vehicleId;
    const {
      pickupDate,
      startDate,
      pickupTime = '09:00 AM',
      returnDate,
      endDate,
      returnTime = '06:00 PM',
      rentalType = 'with_driver',
      couponCode,
    } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ success: false, message: 'Vehicle ID is required' });
    }

    const vehicle = vehicleId.match(/^[0-9a-fA-F]{24}$/)
      ? await Vehicle.findById(vehicleId)
      : await Vehicle.findOne({ slug: vehicleId });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // Duration calculation
    const start = new Date(pickupDate || startDate || Date.now());
    const end = new Date(returnDate || endDate || Date.now() + 2 * 24 * 60 * 60 * 1000);
    const diffMs = Math.max(0, end - start);
    const durationDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    const isSelfDrive = rentalType === 'self_drive';

    // Pricing calculation based on duration tiers
    let baseRentalAmount = 0;
    const dailyRate = isSelfDrive
      ? vehicle.pricing?.dailySelfDrive || 7000
      : vehicle.pricing?.dailyWithDriver || 8500;

    if (durationDays >= 30 && (isSelfDrive ? vehicle.pricing?.monthlySelfDrive : vehicle.pricing?.monthlyWithDriver)) {
      const monthlyRate = isSelfDrive ? vehicle.pricing.monthlySelfDrive : vehicle.pricing.monthlyWithDriver;
      baseRentalAmount = Math.round((monthlyRate / 30) * durationDays);
    } else if (durationDays >= 7 && (isSelfDrive ? vehicle.pricing?.weeklySelfDrive : vehicle.pricing?.weeklyWithDriver)) {
      const weeklyRate = isSelfDrive ? vehicle.pricing.weeklySelfDrive : vehicle.pricing.weeklyWithDriver;
      baseRentalAmount = Math.round((weeklyRate / 7) * durationDays);
    } else {
      baseRentalAmount = dailyRate * durationDays;
    }

    // Additional Driver charges if applicable
    const driverAllowancePerDay = isSelfDrive ? 0 : 0; // included in with_driver daily rate
    const driverCharges = driverAllowancePerDay * durationDays;

    // Security deposit
    const securityDeposit = vehicle.pricing?.securityDeposit || (isSelfDrive ? 25000 : 0);

    // Coupon discount calculation
    let discountAmount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true,
        validUntil: { $gte: new Date() },
      });

      if (coupon && baseRentalAmount >= (coupon.minRentalAmount || 0)) {
        if (coupon.discountType === 'percentage') {
          discountAmount = Math.min(
            (baseRentalAmount * coupon.discountValue) / 100,
            coupon.maxDiscountAmount || 5000
          );
        } else {
          discountAmount = Math.min(coupon.discountValue, coupon.maxDiscountAmount || 5000);
        }
        appliedCoupon = {
          code: coupon.code,
          discountValue: coupon.discountValue,
          discountType: coupon.discountType,
          discountAmount,
        };
      }
    }

    const subtotal = Math.max(0, baseRentalAmount + driverCharges - discountAmount);
    const estimatedTotal = subtotal + securityDeposit;

    res.status(200).json({
      success: true,
      data: {
        vehicle: {
          id: vehicle._id,
          name: vehicle.name,
          category: vehicle.category,
        },
        durationDays,
        rentalType,
        dailyRate,
        baseRentalAmount,
        driverCharges,
        discountAmount,
        appliedCoupon,
        subtotal,
        securityDeposit,
        estimatedTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get occasion categories with real vehicle counts
// @route   GET /api/vehicles/occasions
export const getOccasionsWithCounts = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    let unavailableVehicleIds = [];
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const activeBookings = await Booking.find({
        status: { $in: ['confirmed', 'ongoing', 'pending'] },
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      }).select('vehicle');
      const blockedAvailabilities = await VehicleAvailability.find({
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      }).select('vehicle');
      unavailableVehicleIds = [
        ...activeBookings.map((b) => b.vehicle.toString()),
        ...blockedAvailabilities.map((a) => a.vehicle.toString()),
      ];
    }

    const baseQuery = {
      status: { $nin: ['inactive', 'Inactive', 'maintenance', 'Maintenance'] },
    };
    if (unavailableVehicleIds.length > 0) {
      baseQuery._id = { $nin: unavailableVehicleIds };
    }

    const vehicles = await Vehicle.find(baseQuery).select('suitableFor category name status');

    const OCCASIONS_DATA = [
      {
        id: 'wedding',
        title: 'Wedding & Marriage',
        tagline: 'Bridal convoy & ceremonial rides',
        description: 'Luxury sedans, decorated bridal cruisers, and convoy vehicles for sacred Nepali marriages and receptions.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        highlights: ['Wedding ceremonies', 'Bride & groom transit', 'Reception convoy'],
        badge: 'Luxury Convoy'
      },
      {
        id: 'family-trip',
        title: 'Family Trips & Vacations',
        tagline: 'Scenic weekend getaways & picnics',
        description: 'Spacious 5-7 seater SUVs and comfortable crossovers with ample luggage room for peaceful family getaways.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        highlights: ['Family holidays', 'Weekend highway trips', 'Picnics & road tours'],
        badge: 'Spacious Comfort'
      },
      {
        id: 'airport-transfer',
        title: 'Airport Pickup & Drop',
        tagline: 'Punctual Tribhuvan & Pokhara hubs',
        description: 'Flight-tracked transfers with meet-and-greet service to Kathmandu TIA or Pokhara International Airport.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
        highlights: ['Airport transfers', 'Tourist reception', 'Guest transportation'],
        badge: '24/7 Punctual'
      },
      {
        id: 'tourism',
        title: 'Tourism & Sightseeing',
        tagline: 'Kathmandu, Pokhara, Chitwan & Mustang',
        description: 'Rugged 4WDs and panoramic tour vehicles equipped for highway hills, jungle safari tracks, and mountain vistas.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        highlights: ['Kathmandu & Pokhara', 'Chitwan & Lumbini', 'Mustang Overland'],
        badge: '4x4 Offroad'
      },
      {
        id: 'pilgrimage',
        title: 'Religious Trips & Pilgrimage',
        tagline: 'Muktinath, Pashupati, Manakamana & Janakpur',
        description: 'Reliable high-altitude and holy shrine transportation for elders and spiritual groups with experienced mountain chauffeurs.',
        image: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80',
        highlights: ['Pashupatinath & Janakpur', 'Muktinath 4WD', 'Manakamana & Lumbini'],
        badge: 'Holy Circuits'
      },
      {
        id: 'corporate',
        title: 'Business & Corporate Travel',
        tagline: 'Delegations, summits & meetings',
        description: 'Discreet executive sedans and premium EVs featuring clean climate control, Wi-Fi, and corporate VAT invoicing.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        highlights: ['Business meetings', 'Corporate guests', 'Conferences & visits'],
        badge: 'Executive Class'
      },
      {
        id: 'special-celebration',
        title: 'Birthday & Special Celebrations',
        tagline: 'Anniversaries, proposals & surprises',
        description: 'Make milestone moments unforgettable with polished luxury rides and scenic evening drive chauffeuring.',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
        highlights: ['Birthdays & milestones', 'Anniversaries', 'Romantic proposals'],
        badge: 'Special Moments'
      },
      {
        id: 'festivals',
        title: 'Festivals & Family Gatherings',
        tagline: 'Dashain, Tihar, Chhath & reunions',
        description: 'Dependable outstation holiday rentals to travel home safely across Nepal during high-demand festival seasons.',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
        highlights: ['Dashain & Tihar', 'Chhath & Holi', 'Family reunions'],
        badge: 'Festive Season'
      },
      {
        id: 'events',
        title: 'Events & Parties',
        tagline: 'Concerts, conventions & cultural galas',
        description: 'Coordinated event transit for VIP guests, artists, organizers, and evening gala attendees.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        highlights: ['Concerts & festivals', 'Cultural programs', 'Exhibitions & expos'],
        badge: 'VIP Logistics'
      },
      {
        id: 'medical-travel',
        title: 'Medical & Emergency Travel',
        tagline: 'Hospital visits, checkups & clinics',
        description: 'Prompt, sanitized and smooth-riding vehicles for safe hospital transit, clinical follow-ups, and urgent family travel.',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        highlights: ['Hospital visits', 'Medical checkups', 'Urgent family transit'],
        badge: 'Priority Support'
      },
      {
        id: 'photoshoot',
        title: 'Photoshoots & Film Production',
        tagline: 'Pre-wedding, music videos & cinema',
        description: 'Photogenic off-roaders, rugged 4x4s, and classic prestige cars ideal for cinematic visuals and fashion shoots.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        highlights: ['Pre-wedding shoots', 'Music videos & ads', 'Film productions'],
        badge: 'Cinematic Ready'
      },
      {
        id: 'group-travel',
        title: 'Group Travel',
        tagline: 'Friends outings, college & corporate teams',
        description: 'High-capacity 14-seater Toyota Hiaces and tourist mini-coaches with high roofs and oversized luggage bays.',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80',
        highlights: ["Friends' trips", 'School & college tours', 'Team outings'],
        badge: '14-16 Seaters'
      },
    ];

    const data = OCCASIONS_DATA.map((occ) => {
      const matchingVehicles = vehicles.filter((v) =>
        Array.isArray(v.suitableFor) && v.suitableFor.some((s) => s.toLowerCase() === occ.id)
      );
      return {
        ...occ,
        vehicleCount: matchingVehicles.length,
      };
    });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};
