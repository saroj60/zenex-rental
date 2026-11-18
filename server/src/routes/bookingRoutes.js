import express from 'express';
import {
  calculatePrice,
  validateBooking,
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
  getAllBookings,
  getBookingStatistics,
  getBookingCalendar,
  confirmBooking,
  rejectBooking,
  assignDriver,
  removeDriver,
  assignVehicle,
  recordPayment,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public & Customer Calculation & Validation
router.post('/calculate-price', calculatePrice);
router.post('/validate', validateBooking);
router.post('/', createBooking);

// Statistics and Calendar (Before :id param routes)
router.get('/statistics', getBookingStatistics);
router.get('/calendar', getBookingCalendar);

// Customer bookings
router.get('/my-bookings', protect, getMyBookings);

// Admin / Staff Booking Management
router.get('/', getAllBookings);
router.get('/:id', getBooking);

// Workflow Actions
router.patch('/:id/confirm', confirmBooking);
router.patch('/:id/reject', rejectBooking);
router.patch('/:id/cancel', cancelBooking);
router.post('/:id/cancel', cancelBooking); // compatibility
router.patch('/:id/assign-driver', assignDriver);
router.patch('/:id/remove-driver', removeDriver);
router.patch('/:id/assign-vehicle', assignVehicle);
router.patch('/:id/payment', recordPayment);
router.patch('/:id/status', updateBookingStatus);
router.put('/:id/status', updateBookingStatus); // compatibility

export default router;
