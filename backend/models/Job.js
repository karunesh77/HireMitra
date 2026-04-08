const mongoose = require('mongoose');
const { JOB_STATUS, SKILLS } = require('../config/constants');

const jobSchema = new mongoose.Schema(
  {
    // Job Details
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },

    description: {
      type: String,
      required: [true, 'Job description is required'],
      minlength: [20, 'Description must be at least 20 characters'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },

    // Skills Required
    requiredSkills: {
      type: [String],
      enum: SKILLS,
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'At least one skill is required'
      }
    },

    // Experience
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
      max: 70
    },

    // Location
    location: {
      address: String,
      city: {
        type: String,
        required: [true, 'City is required']
      },
      state: {
        type: String,
        required: [true, 'State is required']
      },
      zipCode: String,
      latitude: {
        type: Number,
        required: [true, 'Latitude is required']
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude is required']
      }
    },

    // Payment
    paymentType: {
      type: String,
      enum: ['hourly', 'fixed', 'daily'],
      required: true
    },

    salary: {
      type: Number,
      required: [true, 'Salary/Rate is required'],
      min: [0, 'Salary cannot be negative']
    },

    currency: {
      type: String,
      default: 'USD'
    },

    // Job Duration
    duration: {
      type: String,
      enum: ['one-time', 'temporary', 'permanent'],
      default: 'one-time'
    },

    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },

    // Number of positions
    positions: {
      type: Number,
      default: 1,
      min: [1, 'At least 1 position required']
    },

    // Employer Reference
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        async validator(v) {
          const user = await mongoose.model('User').findById(v);
          return user && user.userType === 'employer';
        },
        message: 'Only employers can post jobs'
      }
    },

    // Job Status
    status: {
      type: String,
      enum: [JOB_STATUS.OPEN, JOB_STATUS.CLOSED, JOB_STATUS.FILLED],
      default: JOB_STATUS.OPEN
    },

    // Application tracking
    applicantsCount: {
      type: Number,
      default: 0
    },

    acceptedApplicants: {
      type: Number,
      default: 0
    },

    // Additional Info
    image: String,
    tags: [String],
    isUrgent: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
jobSchema.index({ 'location.city': 1, status: 1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ requiredSkills: 1 });

module.exports = mongoose.model('Job', jobSchema);
