const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false
  },
  userType: {
    type: String,
    enum: ['worker', 'employer', 'admin'],
    required: [true, 'Please specify user type'],
    default: 'worker'
  },
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  profileImage: {
    type: String,
    default: null
  },
  location: String,
  address: String,

  // Worker specific fields
  skills: [String],
  experience: Number,
  hourlyRate: Number,
  bio: String,
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'contract']
  },
  certifications: [String],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  identityProof: String,
  addressProof: String,

  // Employer specific fields
  companyName: String,
  companyLogo: String,
  companyDescription: String,
  website: String,
  industry: String,
  companySize: String,
  gstCertificate: String,
  businessRegistration: String,

  // Notification preferences
  notificationPreferences: {
    emailNotifications: { type: Boolean, default: true },
    messageAlerts: { type: Boolean, default: true },
    applicationUpdates: { type: Boolean, default: true },
    jobRecommendations: { type: Boolean, default: true },
  },

  // Common fields
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
