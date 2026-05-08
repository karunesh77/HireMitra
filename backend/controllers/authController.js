const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Email transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone, userType } = req.body;

    // Validation
    if (!email || !password || !name || !phone) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      phone,
      userType: userType || 'worker'
    });

    // Generate token
    const token = generateToken(user._id, user.userType);

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user (include password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id, user.userType);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Please provide current and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Forgot Password — send OTP to email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Please provide email' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'No account found with this email' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP hash + expiry (10 minutes)
    user.resetPasswordToken = crypto.createHash('sha256').update(otp).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    // Send email
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"HireMitra" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'HireMitra - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #001F3F; color: #FF7A00; width: 50px; height: 50px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">H</div>
            <h2 style="color: #001F3F; margin-top: 10px;">HireMitra</h2>
          </div>
          <p style="color: #4A4A4A;">Hello <strong>${user.name}</strong>,</p>
          <p style="color: #4A4A4A;">You requested a password reset. Use this OTP to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: #FFF4E5; border: 2px solid #FF7A00; border-radius: 12px; padding: 20px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #FF7A00;">${otp}</span>
            </div>
          </div>
          <p style="color: #4A4A4A; font-size: 14px;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
          <p style="color: #4A4A4A; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">© 2026 HireMitra. All rights reserved.</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
};

// Verify OTP + Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'Please provide email, OTP and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Hash the OTP to compare
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordToken: hashedOtp,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful. You can now login.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
