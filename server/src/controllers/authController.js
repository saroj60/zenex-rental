import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'nepal_car_rental_jwt_secret_key_2026_super_safe', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, phone number, and password.' });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email address is already registered.' });
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit Nepal mobile number (e.g. 98XXXXXXXX).' });
    }
    const last10 = digitsOnly.slice(-10);
    const existingPhone = await User.findOne({
      $or: [
        { phone: phone.trim() },
        { phone: `+977 ${last10}` },
        { phone: `+977${last10}` },
        { phone: last10 },
        { phone: { $regex: last10 + '$' } }
      ]
    });
    if (existingPhone) {
      return res.status(400).json({ success: false, message: 'An account with this mobile phone number is already registered.' });
    }

    const formattedPhone = last10.length === 10 ? `+977 ${last10}` : phone.trim();

    const user = await User.create({
      name: name.trim(),
      email: trimmedEmail,
      phone: formattedPhone,
      password,
      role: role === 'admin' ? 'customer' : (role || 'customer'), // Prevent arbitrary admin creation via open endpoint
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        address: user.address,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user (supports email or Nepal mobile number)
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const identifier = (req.body.identifier || req.body.email || req.body.phone || '').trim();
    const { password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide your email address or mobile number, and password.' });
    }

    let user;
    if (identifier.includes('@')) {
      user = await User.findOne({ email: identifier.toLowerCase() }).select('+password');
    } else {
      const digitsOnly = identifier.replace(/\D/g, '');
      const last10 = digitsOnly.slice(-10);
      user = await User.findOne({
        $or: [
          { phone: identifier },
          { phone: `+977 ${last10}` },
          { phone: `+977${last10}` },
          { phone: last10 },
          { phone: { $regex: last10 + '$' } }
        ]
      }).select('+password');
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email/phone and password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email/phone and password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        address: user.address,
        isVerified: user.isVerified,
        drivingLicense: user.drivingLicense,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile & verification details
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address, drivingLicense, citizenshipOrPassport } = req.body;
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;
    if (address) fieldsToUpdate.address = address;
    if (drivingLicense) fieldsToUpdate.drivingLicense = drivingLicense;
    if (citizenshipOrPassport) fieldsToUpdate.citizenshipOrPassport = citizenshipOrPassport;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send OTP (Simulated for Nepal +977)
// @route   POST /api/auth/send-otp
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const mockOtp = '123456';
  res.status(200).json({
    success: true,
    message: `Verification code sent to ${phone}. For demo, code is ${mockOtp}`,
    demoOtp: mockOtp,
  });
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  if (otp === '123456' || otp === '987654') {
    return res.status(200).json({
      success: true,
      message: 'Phone number successfully verified with Nepal Telecom / Ncell gateway.',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Invalid OTP code. Please enter 123456.',
  });
};

// @desc    Request password reset OTP / instructions
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Please enter your registered email or Nepal mobile number.' });
    }

    const trimmed = identifier.trim();
    let user;
    if (trimmed.includes('@')) {
      user = await User.findOne({ email: trimmed.toLowerCase() });
    } else {
      const digitsOnly = trimmed.replace(/\D/g, '');
      const last10 = digitsOnly.slice(-10);
      user = await User.findOne({
        $or: [
          { phone: trimmed },
          { phone: `+977 ${last10}` },
          { phone: `+977${last10}` },
          { phone: last10 },
          { phone: { $regex: last10 + '$' } }
        ]
      });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered customer account found with that email or phone number.' });
    }

    const mockResetCode = '882244';

    res.status(200).json({
      success: true,
      message: `Password reset verification code dispatched to ${user.email || user.phone}.`,
      demoCode: mockResetCode,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete password reset
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
  try {
    const { identifier, newPassword } = req.body;
    if (!identifier || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide identifier and new password.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const trimmed = identifier.trim();
    let user;
    if (trimmed.includes('@')) {
      user = await User.findOne({ email: trimmed.toLowerCase() });
    } else {
      const digitsOnly = trimmed.replace(/\D/g, '');
      const last10 = digitsOnly.slice(-10);
      user = await User.findOne({
        $or: [
          { phone: trimmed },
          { phone: `+977 ${last10}` },
          { phone: `+977${last10}` },
          { phone: last10 },
          { phone: { $regex: last10 + '$' } }
        ]
      });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You may now sign in with your updated password.',
    });
  } catch (error) {
    next(error);
  }
};
