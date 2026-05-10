const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Job must belong to an employer']
  },
  title: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide job description']
  },
  category: {
    type: String,
    enum: ['plumbing', 'electrical', 'carpentry', 'hvac', 'roofing', 'painting', 'landscaping', 'heavy_equipment', 'welding', 'driving', 'other'],
    required: [true, 'Please select a category']
  },
  skillsRequired: [String],
  location: {
    type: String,
    required: [true, 'Please provide job location']
  },
  salaryType: {
    type: String,
    enum: ['hourly', 'daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  salaryMin: {
    type: Number,
    required: [true, 'Please provide minimum salary']
  },
  salaryMax: {
    type: Number,
    required: [true, 'Please provide maximum salary']
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'temporary'],
    default: 'full-time'
  },
  experience: {
    type: Number,
    default: 0
  },
  numberOfOpenings: {
    type: Number,
    default: 1,
    min: 1
  },
  workTiming: {
    type: String,
    enum: ['day', 'night', 'flexible'],
    default: 'flexible'
  },
  accommodation: Boolean,
  travelRequired: {
    type: String,
    enum: ['none', 'local', 'national', 'international'],
    default: 'local'
  },
  specialRequirements: String,
  benefits: [String],
  companyName: String,
  companyLogo: String,
  postedDate: {
    type: Date,
    default: Date.now
  },
  closingDate: Date,
  status: {
    type: String,
    enum: ['active', 'closed', 'draft', 'expired'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  featuredUntil: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search optimization
jobSchema.index({ title: 'text', description: 'text', category: 1, location: 1 });
// Index for employer's jobs (getMyJobs, employer dashboard)
jobSchema.index({ employerId: 1, status: 1, postedDate: -1 });
// Index for public job browsing (most common query)
jobSchema.index({ status: 1, category: 1, postedDate: -1 });

module.exports = mongoose.model('Job', jobSchema);
