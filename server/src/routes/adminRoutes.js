import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import {
  getDashboardData,
  getCustomers,
  verifyCustomerDoc,
  getDrivers,
  getDriverById,
  addDriver,
  updateDriver,
  deleteDriver,
  getDriverStatistics,
  updateDriverStatus,
  verifyDriverLicense,
  getDriverTrips,
  assignDriverTrip,
  getMaintenance,
  addMaintenance,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration for Driver Documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `driver_${Date.now()}_${sanitizedBase}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (/jpeg|jpg|png|webp|pdf/.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload JPG, JPEG, PNG, WEBP, or PDF.'));
    }
  },
});

// Protect all admin routes
router.use(protect);
router.use(authorize('admin', 'staff'));

// Dashboard
router.get('/dashboard', getDashboardData);

// Customers
router.get('/customers', getCustomers);
router.put('/customers/:id/verify', verifyCustomerDoc);

// Driver Upload Endpoint
router.post('/drivers/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

// Driver Management Routes
router.get('/drivers/statistics', getDriverStatistics);
router.get('/drivers', getDrivers);
router.get('/drivers/:id', getDriverById);
router.post('/drivers', addDriver);
router.put('/drivers/:id', updateDriver);
router.delete('/drivers/:id', deleteDriver);
router.patch('/drivers/:id/status', updateDriverStatus);
router.patch('/drivers/:id/availability', updateDriverStatus);
router.patch('/drivers/:id/verify-license', verifyDriverLicense);
router.get('/drivers/:id/trips', getDriverTrips);
router.post('/drivers/:id/assign-trip', assignDriverTrip);

// Maintenance
router.get('/maintenance', getMaintenance);
router.post('/maintenance', addMaintenance);

export default router;
