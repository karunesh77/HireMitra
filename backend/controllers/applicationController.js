const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Submit job application
// @route   POST /api/applications
// @access  Private (workers only)
exports.submitApplication = async (req, res) => {
  try {
    const { jobId, message, quotedRate } = req.body;

    // Validate job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if job is still open
    if (job.status !== 'open') {
      return res.status(400).json({ error: 'This job is no longer open' });
    }

    // Check if worker already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
      status: { $ne: 'withdrawn' }
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied to this job' });
    }

    // Create application
    const application = new Application({
      job: jobId,
      applicant: req.user.id,
      message: message || '',
      quotedRate: quotedRate || null
    });

    await application.save();
    await application.populate('applicant', 'name email phone location');
    await application.populate('job', 'title salary');

    // Update job applicant count
    job.applicantsCount += 1;
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('SubmitApplication error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get applications for a job (employer view)
// @route   GET /api/applications/job/:jobId
// @access  Private (only employer)
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if user is the employer
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email phone skills location rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('GetJobApplications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get applications submitted by worker
// @route   GET /api/applications/worker
// @access  Private (workers only)
exports.getWorkerApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title salary location status')
      .populate('applicant', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('GetWorkerApplications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Accept application (employer)
// @route   PATCH /api/applications/:id/accept
// @access  Private (only employer)
exports.acceptApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update application
    application.status = 'accepted';
    const { acceptedRate, startDate, endDate } = req.body;
    if (acceptedRate) {
      application.acceptanceTerms = {
        acceptedRate,
        startDate,
        endDate
      };
    }
    await application.save();

    // Update job accepted count
    application.job.acceptedApplicants += 1;
    await application.job.save();

    res.status(200).json({
      success: true,
      message: 'Application accepted',
      application
    });
  } catch (error) {
    console.error('AcceptApplication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Reject application (employer)
// @route   PATCH /api/applications/:id/reject
// @access  Private (only employer)
exports.rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.status = 'rejected';
    application.employerNotes = req.body.notes || '';
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      application
    });
  } catch (error) {
    console.error('RejectApplication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Withdraw application (worker)
// @route   PATCH /api/applications/:id/withdraw
// @access  Private (only worker)
exports.withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    application.status = 'withdrawn';
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application withdrawn',
      application
    });
  } catch (error) {
    console.error('WithdrawApplication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Rate after job completion
// @route   PATCH /api/applications/:id/rate
// @access  Private
exports.rateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const { score, review, ratedBy } = req.body;

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ error: 'Score must be between 1 and 5' });
    }

    if (ratedBy === 'employer') {
      if (application.job.postedBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      application.employerRating = { score, review };
    } else if (ratedBy === 'worker') {
      if (application.applicant.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      application.workerRating = { score, review };
    }

    await application.save();

    // Update user rating in User model
    const targetUserId = ratedBy === 'employer' ? application.applicant : application.job.postedBy;
    const user = await User.findById(targetUserId);
    if (user) {
      const currentAverage = user.rating.average;
      const currentCount = user.rating.count;
      const newAverage = (currentAverage * currentCount + score) / (currentCount + 1);
      user.rating.average = parseFloat(newAverage.toFixed(2));
      user.rating.count = currentCount + 1;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Rating submitted',
      application
    });
  } catch (error) {
    console.error('RateApplication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('applicant', 'name email phone skills location rating');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    const isWorker = application.applicant._id.toString() === req.user.id;
    const isEmployer = application.job.postedBy.toString() === req.user.id;

    if (!isWorker && !isEmployer) {
      return res.status(403).json({ error: 'Not authorized to view this application' });
    }

    // Mark as viewed by employer
    if (isEmployer && !application.viewedBy) {
      application.viewedBy = true;
      await application.save();
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('GetApplication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
