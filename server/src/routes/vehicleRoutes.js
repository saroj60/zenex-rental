import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import {
  getVehicles,
  getAvailableVehicles,
  getVehicle,
  getVehicleAvailability,
  getVehicleReviews,
  getSimilarVehicles,
  calculatePriceEstimate,
  getCategories,
  getFeaturedVehicles,
  checkAvailability,
  getOccasionsWithCounts,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}-${sanitizedBase}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (/jpeg|jpg|png|webp|pdf/.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload JPG, JPEG, PNG, WEBP, or PDF.'));
    }
  },
});

router.get('/', getVehicles);
router.get('/available', getAvailableVehicles);
router.get('/featured', getFeaturedVehicles);
router.get('/availability', checkAvailability);
router.get('/categories', getCategories);
router.get('/occasions', getOccasionsWithCounts);
router.post('/estimate-price', calculatePriceEstimate);
router.get('/:id/availability', getVehicleAvailability);
router.get('/:id/reviews', getVehicleReviews);
router.get('/:id/similar', getSimilarVehicles);
router.post('/:id/estimate-price', calculatePriceEstimate);
router.get('/:id', getVehicle);

// Admin-only upload routes
router.post(
  '/upload',
  protect,
  authorize('admin', 'staff'),
  upload.array('images', 8),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files uploaded' });
    }
    const urls = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({
      success: true,
      message: `${urls.length} images uploaded successfully`,
      urls,
    });
  }
);

router.post(
  '/upload-doc',
  protect,
  authorize('admin', 'staff'),
  upload.single('document'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No document file uploaded' });
    }
    const url = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      url,
    });
  }
);

// Admin-only CRUD routes
router.post('/', protect, authorize('admin', 'staff'), createVehicle);
router.put('/:id', protect, authorize('admin', 'staff'), updateVehicle);
router.delete('/:id', protect, authorize('admin'), deleteVehicle);

export default router;
