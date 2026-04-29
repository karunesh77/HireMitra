const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Apply for a job (Worker)
// @route   POST /api/applications
// @access  Private (Worker only)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter, expectedSalary, availabilityDate, preferredShift } = req.body;

    // Validation
    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    // Get job details
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Get worker and employer
    const worker = await User.findById(req.user.id);
    if (!worker || worker.userType !== 'worker') {
      return res.status(403).json({ error: 'Only workers can apply for jobs' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      workerId: req.user.id,
      jobId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Create application
    const application = await Application.create({
      workerId: req.user.id,
      jobId,
      employerId: job.employerId,
      coverLetter,
      expectedSalary,
      availabilityDate,
      preferredShift
    });

    // Increment applications count on job
    await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('ApplyForJob error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get worker's applications
// @route   GET /api/applications/worker/me
// @access  Private (Worker only)
exports.getMyApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let filter = { workerId: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('jobId', 'title location category salaryMin salaryMax')
      .populate('employerId', 'name companyName rating')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      applications
    });
  } catch (error) {
    console.error('GetMyApplications error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get applications for employer's jobs
// @route   GET /api/applications/employer/jobs/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    // Verify job belongs to employer
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    let filter = { jobId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('workerId', 'name phone email rating skills experience')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      applications
    });
  } catch (error) {
    console.error('GetJobApplications error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get all applications for employer (across all jobs)
// @route   GET /api/applications/employer/me
// @access  Private (Employer only)
exports.getEmployerApplications = async (req, res) => {
  try {
    const { status, jobId, page = 1, limit = 10 } = req.query;

    let filter = { employerId: req.user.id };
    if (status) filter.status = status;
    if (jobId) filter.jobId = jobId;

    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('workerId', 'name phone email rating skills')
      .populate('jobId', 'title location')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      applications
    });
  } catch (error) {
    console.error('GetEmployerApplications error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get single application details
// @route   GET /api/applications/:id
// @access  Private
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('workerId', 'name phone email rating skills experience bio')
      .populate('jobId')
      .populate('employerId', 'name companyName');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization (worker or employer)
    if (application.workerId._id.toString() !== req.user.id && application.employerId._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('GetApplicationById error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Update application status (Employer)
// @route   PATCH /api/applications/:id/status
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes, rejectionReason } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    if (application.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.status = status;
    if (notes) application.employerNotes = notes;
    if (rejectionReason) application.rejectionReason = rejectionReason;
    application.updatedAt = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application status updated',
      application
    });
  } catch (error) {
    console.error('UpdateApplicationStatus error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Schedule interview (Employer)
// @route   PATCH /api/applications/:id/interview
// @access  Private (Employer only)
exports.scheduleInterview = async (req, res) => {
  try {
    const { scheduledDate, time, location, format, notes } = req.body;

    if (!scheduledDate || !time || !format) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.interviewDetails = {
      scheduledDate,
      time,
      location,
      format,
      notes
    };
    application.status = 'interview_scheduled';
    application.updatedAt = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Interview scheduled',
      application
    });
  } catch (error) {
    console.error('ScheduleInterview error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Send job offer (Employer)
// @route   PATCH /api/applications/:id/offer
// @access  Private (Employer only)
exports.sendOffer = async (req, res) => {
  try {
    const { offeredSalary, offeredPosition, expiryDate } = req.body;

    if (!offeredSalary || !offeredPosition) {
      return res.status(400).json({ error: 'Salary and position are required' });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.offerDetails = {
      offeredSalary,
      offeredPosition,
      offeredDate: Date.now(),
      expiryDate
    };
    application.status = 'hired';
    application.updatedAt = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Job offer sent',
      application
    });
  } catch (error) {
    console.error('SendOffer error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Reject application (Employer)
// @route   PATCH /api/applications/:id/reject
// @access  Private (Employer only)
exports.rejectApplication = async (req, res) => {
  try {
    const { reason } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.status = 'rejected';
    application.rejectionReason = reason || '';
    application.updatedAt = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      application
    });
  } catch (error) {
    console.error('RejectApplication error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Shortlist application (Employer)
// @route   PATCH /api/applications/:id/shortlist
// @access  Private (Employer only)
exports.shortlistApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.status = 'shortlisted';
    application.updatedAt = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application shortlisted',
      application
    });
  } catch (error) {
    console.error('ShortlistApplication error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Cancel application (Worker)
// @route   DELETE /api/applications/:id
// @access  Private (Worker only)
exports.cancelApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.workerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow cancellation if not hired
    if (application.status === 'hired' || application.status === 'completed') {
      return res.status(400).json({ error: 'Cannot cancel hired or completed applications' });
    }

    await Application.findByIdAndDelete(req.params.id);

    // Decrement applications count on job
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applicationsCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Application cancelled'
    });
  } catch (error) {
    console.error('CancelApplication error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
