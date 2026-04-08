const mongoose = require('mongoose');
const { APPLICATION_STATUS } = require('../config/constants');

const applicationSchema = new mongoose.Schema(
  {
    // Job Reference
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job is required']
    },

    // Applicant (Worker) Reference
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant is required'],
      validate: {
        async validator(v) {
          const user = await mongoose.model('User').findById(v);
          return user && user.userType === 'worker';
        },
        message: 'Only workers can apply to jobs'
      }
    },

    // Application Message
    message: {
      type: String,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },

    // Status
    status: {
      type: String,
      enum: [
        APPLICATION_STATUS.PENDING,
        APPLICATION_STATUS.ACCEPTED,
        APPLICATION_STATUS.REJECTED,
        APPLICATION_STATUS.WITHDRAWN
      ],
      default: APPLICATION_STATUS.PENDING
    },

    // Employer's Response
    employerNotes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    },

    // Salary/Rate the worker quotes (optional)
    quotedRate: {
      type: Number,
      min: [0, 'Rate cannot be negative']
    },

    // Payment Terms
    acceptanceTerms: {
      acceptedRate: Number,
      startDate: Date,
      endDate: Date
    },

    // Tracking
    viewedBy: {
      type: Boolean,
      default: false
    },

    viewedAt: Date,

    respondedAt: Date,

    // Rating from employer (after job completion)
    employerRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      review: String
    },

    // Rating from worker (after job completion)
    workerRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      review: String
    }
  },
  {
    timestamps: true
  }
);

// Ensure one application per job per worker
applicationSchema.index(
  { job: 1, applicant: 1 },
  {
    unique: true,
    sparse: true,
    partialFilterExpression: {
      status: { $ne: APPLICATION_STATUS.WITHDRAWN }
    }
  }
);

// Index for faster queries
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });

// Auto-update viewedAt timestamp
applicationSchema.pre('save', function (next) {
  if (this.isModified('viewedBy') && this.viewedBy === true && !this.viewedAt) {
    this.viewedAt = new Date();
  }
  if (this.isModified('status') && this.status !== 'pending' && !this.respondedAt) {
    this.respondedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
