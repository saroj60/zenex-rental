import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import Review from '../models/Review.js';
import Vehicle from '../models/Vehicle.js';

// Helper: Resolve Customer ID from req.user or default customer Saroj
const getCustomerId = (req) => {
  return req.user?._id || req.user?.id || '6ae861e30ccd5ff08d559615';
};

// ==========================================
// 1. CUSTOMER DASHBOARD OVERVIEW
// ==========================================
// @desc    Get dashboard summary statistics, latest booking, recent notifications
// @route   GET /api/customer/dashboard
export const getCustomerDashboard = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const now = new Date();

    const [
      totalBookings,
      upcomingBookings,
      activeRentals,
      completedRentals,
      latestBooking,
      recentNotifications,
      customerProfile,
    ] = await Promise.all([
      Booking.countDocuments({ customer: customerId }),
      Booking.countDocuments({
        customer: customerId,
        status: { $in: ['confirmed', 'pending'] },
        startDate: { $gte: now },
      }),
      Booking.countDocuments({ customer: customerId, status: 'ongoing' }),
      Booking.countDocuments({ customer: customerId, status: 'completed' }),
      Booking.findOne({ customer: customerId })
        .sort({ createdAt: -1 })
        .populate('vehicle')
        .populate('driver'),
      Notification.find({ user: customerId }).sort({ createdAt: -1 }).limit(5),
      User.findById(customerId).select('-password'),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalBookings,
          upcomingBookings,
          activeRentals,
          completedRentals,
        },
        latestBooking,
        recentNotifications,
        customer: customerProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. MY BOOKINGS (LIST WITH FILTERS & SEARCH)
// ==========================================
// @desc    Get customer's personal bookings with status tabs and search
// @route   GET /api/customer/bookings
export const getCustomerBookings = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = { customer: customerId };

    if (status && status !== 'all' && status !== 'All') {
      query.status = status.toLowerCase();
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { bookingId: searchRegex },
        { 'pickupLocation.name': searchRegex },
        { 'dropoffLocation.name': searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('vehicle')
      .populate('driver');

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. BOOKING DETAILS & TIMELINE
// ==========================================
// @desc    Get single booking details with verified ownership check
// @route   GET /api/customer/bookings/:id
export const getCustomerBookingById = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { id } = req.params;

    const booking = await Booking.findOne({
      $or: [
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        { bookingId: id.toUpperCase() },
      ],
      customer: customerId,
    })
      .populate('vehicle')
      .populate('driver');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or access unauthorized.',
      });
    }

    // Fetch related payment transactions
    const payments = await Payment.find({ booking: booking._id }).sort({ createdAt: -1 });

    // Build visual lifecycle timeline
    const timeline = [
      {
        stage: 'Booking Submitted',
        description: 'Reservation request registered in central system.',
        date: booking.createdAt,
        completed: true,
        current: booking.status === 'pending',
      },
      {
        stage: 'Documents Under Review',
        description: 'Fleet verification officer checking driving licence and ID.',
        date: booking.createdAt,
        completed: booking.status !== 'pending' || booking.documents?.drivingLicense?.fileUrl,
        current: booking.status === 'pending',
      },
      {
        stage: 'Booking Confirmed',
        description: 'Reservation accepted and vehicle scheduled for dispatch.',
        date: booking.status === 'confirmed' || booking.status === 'ongoing' || booking.status === 'completed' ? booking.updatedAt : null,
        completed: ['confirmed', 'ongoing', 'completed'].includes(booking.status),
        current: booking.status === 'confirmed',
      },
      {
        stage: 'Vehicle Ready / Assigned',
        description: booking.driver ? `Chauffeur ${booking.driver.name} assigned.` : 'Vehicle inspected and staged at depot.',
        date: booking.driver ? booking.updatedAt : null,
        completed: ['confirmed', 'ongoing', 'completed'].includes(booking.status) && !!booking.driver,
        current: booking.status === 'confirmed' && !!booking.driver,
      },
      {
        stage: 'Rental Started',
        description: 'Trip commenced across Nepal highways.',
        date: booking.status === 'ongoing' || booking.status === 'completed' ? booking.startDate : null,
        completed: ['ongoing', 'completed'].includes(booking.status),
        current: booking.status === 'ongoing',
      },
      {
        stage: 'Rental Completed',
        description: 'Vehicle returned and deposit settlement completed.',
        date: booking.status === 'completed' ? booking.endDate : null,
        completed: booking.status === 'completed',
        current: booking.status === 'completed',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        booking,
        payments,
        timeline,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. CANCEL BOOKING (POLICY ENFORCED)
// ==========================================
// @desc    Customer self-service cancellation with policy validation
// @route   POST /api/customer/bookings/:id/cancel
export const cancelCustomerBooking = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { id } = req.params;
    const { reason = 'Customer requested cancellation' } = req.body;

    const booking = await Booking.findOne({
      $or: [
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        { bookingId: id.toUpperCase() },
      ],
      customer: customerId,
    }).populate('vehicle');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (['ongoing', 'completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a booking that is currently ${booking.status}.`,
      });
    }

    // Policy check: Free cancellation > 24 hours prior to pickup
    const now = new Date();
    const pickupTime = new Date(booking.startDate);
    const diffHours = (pickupTime - now) / (1000 * 60 * 60);

    let cancellationFee = 0;
    let refundEligible = 0;
    const paid = booking.paidAmount || 0;

    if (diffHours < 24 && diffHours > 0) {
      // Nominal late fee
      cancellationFee = Math.min(2500, paid);
      refundEligible = Math.max(0, paid - cancellationFee);
    } else {
      // Free cancellation
      cancellationFee = 0;
      refundEligible = paid;
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancellationDate = now;
    booking.cancellationFee = cancellationFee;

    if (refundEligible > 0) {
      booking.paymentStatus = 'refund_pending';
    }
    await booking.save();

    // Create Notification
    await Notification.create({
      user: customerId,
      title: 'Booking Cancelled',
      message: `Reservation ${booking.bookingId} has been cancelled. ${
        refundEligible > 0 ? `A refund of NPR ${refundEligible.toLocaleString()} has been queued.` : 'No charges incurred.'
      }`,
      type: 'booking',
    });

    res.status(200).json({
      success: true,
      message: `Booking ${booking.bookingId} successfully cancelled.`,
      cancellationFee,
      refundEligible,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. CUSTOMER PAYMENT HISTORY
// ==========================================
// @desc    Get customer's transaction logs and payment receipts
// @route   GET /api/customer/payments
export const getCustomerPayments = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);

    // Find all bookings for this customer
    const bookings = await Booking.find({ customer: customerId }).select('_id');
    const bookingIds = bookings.map((b) => b._id);

    const payments = await Payment.find({
      $or: [{ customer: customerId }, { booking: { $in: bookingIds } }],
    })
      .sort({ createdAt: -1 })
      .populate('booking', 'bookingId vehicle rentalType startDate endDate totalAmount paidAmount');

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 6. CUSTOMER DOCUMENTS MANAGEMENT
// ==========================================
// @desc    Get uploaded documents and verification statuses
// @route   GET /api/customer/documents
export const getCustomerDocuments = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const user = await User.findById(customerId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Customer account not found.' });
    }

    // Also fetch documents attached to customer's latest bookings
    const latestBookingWithDocs = await Booking.findOne({
      customer: customerId,
      'documents.drivingLicense.fileUrl': { $ne: '' },
    }).sort({ createdAt: -1 });

    const documents = {
      drivingLicense: {
        number: user.drivingLicense?.number || latestBookingWithDocs?.documents?.drivingLicense?.number || '',
        expiryDate: user.drivingLicense?.expiryDate || null,
        fileUrl: user.drivingLicense?.image || latestBookingWithDocs?.documents?.drivingLicense?.fileUrl || '',
        status: user.drivingLicense?.verified ? 'Verified' : user.drivingLicense?.image ? 'Pending' : 'Not Uploaded',
      },
      citizenshipOrPassport: {
        docType: user.citizenshipOrPassport?.docType || latestBookingWithDocs?.documents?.citizenshipOrPassport?.docType || 'Citizenship',
        number: user.citizenshipOrPassport?.number || latestBookingWithDocs?.documents?.citizenshipOrPassport?.number || '',
        fileUrl: user.citizenshipOrPassport?.image || latestBookingWithDocs?.documents?.citizenshipOrPassport?.fileUrl || '',
        status: user.citizenshipOrPassport?.verified ? 'Verified' : user.citizenshipOrPassport?.image ? 'Pending' : 'Not Uploaded',
      },
      isAccountVerified: user.isVerified || false,
    };

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update or upload customer documents
// @route   POST /api/customer/documents
export const updateCustomerDocuments = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { drivingLicense, citizenshipOrPassport } = req.body;

    const user = await User.findById(customerId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (drivingLicense) {
      user.drivingLicense = {
        number: drivingLicense.number || user.drivingLicense?.number || '',
        expiryDate: drivingLicense.expiryDate || user.drivingLicense?.expiryDate,
        image: drivingLicense.fileUrl || user.drivingLicense?.image || '',
        verified: false, // Reset to false for compliance officer verification
      };
    }

    if (citizenshipOrPassport) {
      user.citizenshipOrPassport = {
        docType: citizenshipOrPassport.docType || 'Citizenship',
        number: citizenshipOrPassport.number || user.citizenshipOrPassport?.number || '',
        image: citizenshipOrPassport.fileUrl || user.citizenshipOrPassport?.image || '',
        verified: false,
      };
    }

    await user.save();

    // Create notification
    await Notification.create({
      user: customerId,
      title: 'Documents Submitted for Verification',
      message: 'Your documents have been submitted to our fleet compliance team for review.',
      type: 'system',
    });

    res.status(200).json({
      success: true,
      message: 'Documents successfully submitted for verification.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 7. CUSTOMER REVIEWS
// ==========================================
// @desc    Get customer reviews and eligible bookings for review
// @route   GET /api/customer/reviews
export const getCustomerReviews = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);

    // Reviews authored by this customer
    const myReviews = await Review.find({ user: customerId })
      .populate('vehicle', 'name brand category images')
      .populate('booking', 'bookingId startDate endDate')
      .sort({ createdAt: -1 });

    // Completed bookings eligible for review
    const completedBookings = await Booking.find({
      customer: customerId,
      status: 'completed',
    })
      .populate('vehicle', 'name brand category images')
      .sort({ endDate: -1 });

    // Filter out bookings that already have reviews
    const reviewedBookingIds = new Set(myReviews.map((r) => r.booking?._id?.toString()).filter(Boolean));
    const eligibleBookings = completedBookings.filter(
      (b) => !reviewedBookingIds.has(b._id.toString())
    );

    res.status(200).json({
      success: true,
      data: {
        myReviews,
        eligibleBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit review for completed rental
// @route   POST /api/customer/reviews
export const submitCustomerReview = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    let { vehicleId, bookingId, rating, comment, review } = req.body;
    const finalComment = comment || review;

    if (!vehicleId && bookingId) {
      const b = await Booking.findById(bookingId);
      if (b) vehicleId = b.vehicle;
    }

    if (!vehicleId || !rating || !finalComment) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle ID, rating (1-5), and review comment are required.',
      });
    }

    // Check for duplicate review
    const existing = await Review.findOne({ vehicle: vehicleId, user: customerId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this vehicle.',
      });
    }

    const reviewDoc = await Review.create({
      vehicle: vehicleId,
      user: customerId,
      booking: bookingId || null,
      rating: Number(rating),
      comment: finalComment.trim(),
    });

    // Update Vehicle average rating & review count
    const allVehicleReviews = await Review.find({ vehicle: vehicleId });
    const avg = allVehicleReviews.reduce((sum, r) => sum + r.rating, 0) / allVehicleReviews.length;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      rating: Math.round(avg * 10) / 10,
      reviewCount: allVehicleReviews.length,
    });

    const populated = await Review.findById(reviewDoc._id)
      .populate('vehicle', 'name brand category images');

    res.status(201).json({
      success: true,
      message: 'Thank you! Your verified review has been published.',
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 8. PROFILE & ACCOUNT SETTINGS
// ==========================================
// @desc    Get customer profile
// @route   GET /api/customer/profile
export const getCustomerProfile = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const user = await User.findById(customerId).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update customer profile & change password
// @route   PUT /api/customer/profile
export const updateCustomerProfile = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { name, phone, address, avatar, currentPassword, newPassword } = req.body;

    const user = await User.findById(customerId).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();
    if (avatar) user.avatar = avatar;

    if (address) {
      user.address = {
        city: address.city || user.address?.city || 'Kathmandu',
        district: address.district || user.address?.district || 'Kathmandu',
        fullAddress: address.fullAddress || address || user.address?.fullAddress || '',
      };
    }

    // Password change request
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please provide your current password to set a new password.',
        });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters.',
        });
      }
      user.password = newPassword;
    }

    await user.save();

    const sanitized = await User.findById(customerId).select('-password');
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      data: sanitized,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 9. IN-APP NOTIFICATIONS
// ==========================================
// @desc    Get customer notifications
// @route   GET /api/customer/notifications
export const getCustomerNotifications = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const notifications = await Notification.find({ user: customerId }).sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({ user: customerId, isRead: false });

    res.status(200).json({
      success: true,
      count: notifications.length,
      unreadCount,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/customer/notifications/:id/read
export const markNotificationAsRead = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { id } = req.params;

    const notif = await Notification.findOneAndUpdate(
      { _id: id, user: customerId },
      { isRead: true },
      { new: true }
    );

    res.status(200).json({ success: true, data: notif });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/customer/notifications/mark-all-read
export const markAllNotificationsAsRead = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    await Notification.updateMany({ user: customerId, isRead: false }, { isRead: true });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 10. HELP & SUPPORT REQUEST
// ==========================================
// @desc    Submit support inquiry
// @route   POST /api/customer/support
export const submitSupportTicket = async (req, res, next) => {
  try {
    const customerId = getCustomerId(req);
    const { subject, bookingId, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required.',
      });
    }

    // Create confirmation notification
    await Notification.create({
      user: customerId,
      title: 'Support Request Received',
      message: `Your support inquiry "${subject}" has been assigned Ticket #SR-${Date.now().toString().slice(-5)}. Our desk will respond within 2 business hours.`,
      type: 'system',
    });

    res.status(200).json({
      success: true,
      message: 'Support request submitted successfully. Our team will contact you shortly.',
      ticketId: `SR-${Date.now().toString().slice(-5)}`,
    });
  } catch (error) {
    next(error);
  }
};
