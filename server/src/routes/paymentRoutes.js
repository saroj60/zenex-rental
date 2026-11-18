import express from 'express';
import {
  getPaymentStatistics,
  getAllPayments,
  getPaymentById,
  recordCashPayment,
  verifyPayment,
  initiateRefund,
  getRefunds,
  getSecurityDeposits,
  settleSecurityDeposit,
  initiateEsewa,
  verifyEsewa,
  initiateKhalti,
  verifyKhalti,
  initiateFonepay,
  createPaymentSession,
  getPaymentStatus,
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public / Customer Gateway Handlers
router.post('/create', createPaymentSession);
router.post('/esewa/initiate', initiateEsewa);
router.post('/esewa/verify', verifyEsewa);
router.post('/khalti/initiate', initiateKhalti);
router.post('/khalti/verify', verifyKhalti);
router.post('/fonepay/initiate', initiateFonepay);
router.get('/:id/status', getPaymentStatus);

// Admin & Staff Operations
router.get('/statistics', getPaymentStatistics);
router.get('/refunds', getRefunds);
router.get('/security-deposits', getSecurityDeposits);
router.post('/security-deposits/:id/settle', settleSecurityDeposit);
router.post('/cash', recordCashPayment);
router.get('/:id', getPaymentById);
router.post('/:id/verify', verifyPayment);
router.post('/:id/refund', initiateRefund);
router.get('/', getAllPayments);

export default router;
