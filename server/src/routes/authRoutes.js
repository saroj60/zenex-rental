import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

export default router;
