const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Worker ID is required']
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job ID is required']
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Employer ID is required']
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'interview_scheduled', 'rejected', 'hired', 'completed'],
    default: 'applied'
  },
  coverLetter: String,
  expectedSalary: Number,
  availabilityDate: Date,
  preferredShift: {
    type: String,
    enum: ['morning', 'afternoon', 'night', 'flexible'],
    default: 'flexible'
  },
  attachments: [
    {
      filename: String,
      url: String,
      type: {
        type: String,
        enum: ['resume', 'certificate', 'portfolio', 'other']
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  interviewDetails: {
    scheduledDate: Date,
    time: String,
    location: String,
    format: {
      type: String,
      enum: ['in-person', 'phone', 'video', 'other']
    },
    notes: String
  },
  offerDetails: {
    offeredSalary: Number,
    offeredPosition: String,
    offeredDate: Date,
    expiryDate: Date
  },
  rejectionReason: String,
  employerNotes: String,
  workerRating: {
    type: Number,
    min: 1,
    max: 5
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate applications
applicationSchema.index({ workerId: 1, jobId: 1 }, { unique: true });
// Index for employer viewing applications (most common employer query)
applicationSchema.index({ employerId: 1, status: 1, appliedAt: -1 });
// Index for worker tracking their applications
applicationSchema.index({ workerId: 1, status: 1, appliedAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);
