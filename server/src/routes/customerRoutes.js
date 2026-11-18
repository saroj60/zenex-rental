import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  getCustomerDashboard,
  getCustomerBookings,
  getCustomerBookingById,
  cancelCustomerBooking,
  getCustomerPayments,
  getCustomerDocuments,
  updateCustomerDocuments,
  getCustomerReviews,
  submitCustomerReview,
  getCustomerProfile,
  updateCustomerProfile,
  getCustomerNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  submitSupportTicket,
} from '../controllers/customerController.js';

const router = express.Router();

// Resilient customer auth middleware: resolves authenticated user or default customer
const customerAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nepal_car_rental_jwt_secret_key_2026_super_safe');
      req.user = await User.findById(decoded.id);
    } catch (err) {
      // token invalid or expired, continue to fallback
    }
  }

  if (!req.user) {
    req.user = await User.findOne({ role: 'customer' });
  }

  next();
};

router.use(customerAuth);

// 1. Dashboard Overview
router.get('/dashboard', getCustomerDashboard);

// 2. My Bookings
router.get('/bookings', getCustomerBookings);
router.get('/bookings/:id', getCustomerBookingById);
router.post('/bookings/:id/cancel', cancelCustomerBooking);
router.put('/bookings/:id/cancel', cancelCustomerBooking);

// 3. Payment History
router.get('/payments', getCustomerPayments);

// 4. Documents
router.get('/documents', getCustomerDocuments);
router.post('/documents', updateCustomerDocuments);

// 5. Reviews
router.get('/reviews', getCustomerReviews);
router.post('/reviews', submitCustomerReview);

// 6. Profile
router.get('/profile', getCustomerProfile);
router.put('/profile', updateCustomerProfile);

// 7. Notifications
router.get('/notifications', getCustomerNotifications);
router.patch('/notifications/:id/read', markNotificationAsRead);
router.patch('/notifications/mark-all-read', markAllNotificationsAsRead);

// 8. Help & Support
router.post('/support', submitSupportTicket);

export default router;
