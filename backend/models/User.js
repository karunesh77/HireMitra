const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { USER_TYPES, SKILLS } = require('../config/constants');

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },

    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
      match: [/^\d{10}$/, 'Phone must be 10 digits']
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },

    // User Type
    userType: {
      type: String,
      enum: [USER_TYPES.WORKER, USER_TYPES.EMPLOYER],
      required: true
    },

    // Worker-specific fields
    skills: {
      type: [String],
      enum: SKILLS,
      default: []
    },

    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number
    },

    hourlyRate: {
      type: Number,
      min: [0, 'Hourly rate cannot be negative']
    },

    availability: {
      type: String,
      enum: ['full-time', 'part-time', 'flexible'],
      default: 'flexible'
    },

    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },

    // Employer-specific fields
    companyName: String,
    companyDescription: {
      type: String,
      maxlength: [1000, 'Company description cannot exceed 1000 characters']
    },
    website: String,
    companyPhone: String,

    // Profile
    profileImage: {
      type: String,
      default: null
    },

    // Rating system
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true
    },

    lastLogin: Date
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Don't expose sensitive fields in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
