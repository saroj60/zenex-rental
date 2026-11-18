import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import Review from '../models/Review.js';
import Coupon from '../models/Coupon.js';
import Newsletter from '../models/Newsletter.js';
import Vehicle from '../models/Vehicle.js';
import User from '../models/User.js';
import { calculatePriceEstimate } from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/pricing/estimate', calculatePriceEstimate);

// Document Upload Storage
const docUploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(docUploadsDir)) {
  fs.mkdirSync(docUploadsDir, { recursive: true });
}

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, docUploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `doc-${Date.now()}-${sanitizedBase}${ext}`);
  },
});

const docUpload = multer({
  storage: docStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (/jpeg|jpg|png|webp|pdf/.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid format. Please upload JPG, PNG, WEBP, or PDF.'));
    }
  },
});

// @desc    Secure document upload (Licence, Passport, Citizenship)
// @route   POST /api/documents/upload
router.post('/documents/upload', docUpload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No document file provided.' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    message: 'Document uploaded securely.',
    fileUrl,
    fileName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

// @desc    Validate coupon code and return verified discount
// @route   POST /api/coupons/validate
router.post('/coupons/validate', async (req, res, next) => {
  try {
    const { code, amount, rentalAmount } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Please enter a coupon code.' });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
      validUntil: { $gte: new Date() },
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired promo code. Please verify the code and try again.',
      });
    }

    const baseAmount = Number(rentalAmount || amount || 0);
    if (coupon.minRentalAmount && baseAmount < coupon.minRentalAmount) {
      return res.status(400).json({
        success: false,
        message: `Coupon ${coupon.code} requires a minimum rental total of NPR ${coupon.minRentalAmount.toLocaleString()}.`,
        minRentalAmount: coupon.minRentalAmount,
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.min((baseAmount * coupon.discountValue) / 100, coupon.maxDiscountAmount || 5000);
    } else {
      discountAmount = Math.min(coupon.discountValue, coupon.maxDiscountAmount || 5000);
    }

    res.status(200).json({
      success: true,
      message: `Coupon "${coupon.code}" applied! You save NPR ${discountAmount.toLocaleString()}.`,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        minRentalAmount: coupon.minRentalAmount,
        description: coupon.description,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 1. REVIEWS ENDPOINTS
// ==========================================
router.get('/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email avatar address isVerified')
      .populate('vehicle', 'name brand category images pricing rating')
      .sort({ rating: -1, createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/reviews/approved', async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email avatar address isVerified')
      .populate('vehicle', 'name brand category images pricing rating')
      .sort({ rating: -1, createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 2. COUPONS / SPECIAL OFFERS ENDPOINTS
// ==========================================
router.get('/coupons', async (req, res, next) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      validUntil: { $gte: now },
    }).sort({ discountValue: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/coupons/active', async (req, res, next) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      validUntil: { $gte: now },
    }).sort({ discountValue: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. NEWSLETTER SUBSCRIPTION
// ==========================================
router.post('/newsletter/subscribe', async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let subscriber = await Newsletter.findOne({ email: normalizedEmail });
    if (subscriber) {
      if (!subscriber.isActive) {
        subscriber.isActive = true;
        await subscriber.save();
      }
      return res.status(200).json({
        success: true,
        message: 'Thank you! You are already subscribed to Nepal Car Rental updates.',
        data: subscriber,
      });
    }

    subscriber = await Newsletter.create({
      email: normalizedEmail,
      name: name ? name.trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Subscription successful! Welcome to Nepal Car Rental exclusive community.',
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 4. NEPAL DESTINATIONS DIRECTORY
// ==========================================
router.get('/destinations', (req, res) => {
  const destinations = [
    {
      id: 'kathmandu',
      name: 'Kathmandu Valley',
      location: 'Kathmandu',
      tagline: 'Historic Temples & Bustling Capital',
      description: 'Explore UNESCO heritage squares, vibrant alleys, Swayambhunath, and scenic hill outskirts like Nagarkot.',
      image: '/landscapes/kathmandu.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      popularVehicleType: 'Sedan & Hatchback',
      recommendedRental: 'Self Drive or With Driver',
      badge: 'Capital Hub',
    },
    {
      id: 'pokhara',
      name: 'Pokhara',
      location: 'Pokhara',
      tagline: 'Lake City & Annapurna Gateway',
      description: 'Cruise along Fewa Lake, witness the sunrise at Sarangkot, and soak in breathtaking views of Machapuchare.',
      image: '/landscapes/pokhara.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80',
      popularVehicleType: 'SUV & Premium',
      recommendedRental: 'Self Drive & With Driver',
      badge: 'Most Popular',
    },
    {
      id: 'mustang',
      name: 'Mustang',
      location: 'Mustang',
      tagline: 'Forbidden Kingdom & Tibetan Plateau',
      description: 'Epic off-road overland journey across deep Kali Gandaki gorges, ancient monasteries, and windswept deserts.',
      image: '/landscapes/mustang.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80',
      popularVehicleType: '4x4 Off-Road SUV',
      recommendedRental: '4x4 With Chauffeur',
      badge: 'High Altitude Adventure',
    },
    {
      id: 'chitwan',
      name: 'Chitwan National Park',
      location: 'Chitwan',
      tagline: 'Subtropical Jungle Safari',
      description: 'Home of the endangered One-horned Rhino, Royal Bengal Tiger, and relaxing Tharu cultural experiences.',
      image: '/landscapes/chitwan.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      popularVehicleType: 'SUV & Family Van',
      recommendedRental: 'With Driver',
      badge: 'Wildlife Haven',
    },
    {
      id: 'lumbini',
      name: 'Lumbini',
      location: 'Lumbini',
      tagline: 'Birthplace of Lord Buddha',
      description: 'Spiritual pilgrimage visiting the sacred Mayadevi Temple, Ashoka Pillar, and world peace monasteries.',
      image: '/landscapes/lumbini.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      popularVehicleType: 'Sedan & Electric EV',
      recommendedRental: 'Self Drive',
      badge: 'World Heritage Site',
    },
    {
      id: 'janakpur',
      name: 'Janakpur',
      location: 'Janakpur',
      tagline: 'City of Mithila Art & Culture',
      description: 'Marvel at the stunning architecture of Janaki Mandir, sacred ponds, and rich Mithila artistic heritage.',
      image: '/landscapes/janakpur.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      popularVehicleType: 'Sedan & SUV',
      recommendedRental: 'With Driver',
      badge: 'Cultural Heart',
    },
  ];

  res.status(200).json({
    success: true,
    count: destinations.length,
    data: destinations,
  });
});

export default router;
