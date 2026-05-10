const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Post a new job
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.postJob = async (req, res) => {
  try {
    const { title, description, category, skillsRequired, location, salaryMin, salaryMax, jobType, experience, numberOfOpenings, workTiming, accommodation, travelRequired, specialRequirements, benefits, closingDate } = req.body;

    // Validation
    if (!title || !description || !category || !location || !salaryMin || !salaryMax) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Get employer details
    const employer = await User.findById(req.user.id);

    if (!employer || employer.userType !== 'employer') {
      return res.status(403).json({ error: 'Only employers can post jobs' });
    }

    const job = await Job.create({
      employerId: req.user.id,
      title,
      description,
      category,
      skillsRequired: skillsRequired || [],
      location,
      salaryMin,
      salaryMax,
      jobType,
      experience,
      numberOfOpenings,
      workTiming,
      accommodation,
      travelRequired,
      specialRequirements,
      benefits: benefits || [],
      closingDate,
      companyName: employer.companyName,
      companyLogo: employer.companyLogo
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    console.error('PostJob error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { category, location, salaryMin, salaryMax, jobType, search, page = 1, limit = 10 } = req.query;

    let filter = { status: 'active' };

    if (category) filter.category = category;
    if (location) filter.location = new RegExp(location, 'i');
    if (salaryMin) filter.salaryMin = { $gte: salaryMin };
    if (salaryMax) filter.salaryMax = { $lte: salaryMax };
    if (jobType) filter.jobType = jobType;
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('employerId', 'name companyName rating')
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      jobs
    });
  } catch (error) {
    console.error('GetJobs error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('employerId', 'name companyName email phone rating');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error('GetJobById error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Job owner only)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check authorization
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    // Update fields
    const { title, description, category, skillsRequired, location, salaryMin, salaryMax, jobType, experience, numberOfOpenings, workTiming, accommodation, travelRequired, specialRequirements, benefits, closingDate, status } = req.body;

    if (title) job.title = title;
    if (description) job.description = description;
    if (category) job.category = category;
    if (skillsRequired) job.skillsRequired = skillsRequired;
    if (location) job.location = location;
    if (salaryMin) job.salaryMin = salaryMin;
    if (salaryMax) job.salaryMax = salaryMax;
    if (jobType) job.jobType = jobType;
    if (experience !== undefined) job.experience = experience;
    if (numberOfOpenings) job.numberOfOpenings = numberOfOpenings;
    if (workTiming) job.workTiming = workTiming;
    if (accommodation !== undefined) job.accommodation = accommodation;
    if (travelRequired) job.travelRequired = travelRequired;
    if (specialRequirements) job.specialRequirements = specialRequirements;
    if (benefits) job.benefits = benefits;
    if (closingDate) job.closingDate = closingDate;
    if (status) job.status = status;

    job.updatedAt = Date.now();
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('UpdateJob error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Job owner only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check authorization
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('DeleteJob error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get employer's jobs
// @route   GET /api/jobs/employer/me
// @access  Private (Employer only)
exports.getMyJobs = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const jobs = await Job.find({ employerId: req.user.id })
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error('GetMyJobs error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Search jobs
// @route   GET /api/jobs/search
// @access  Public
exports.searchJobs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Please provide search query' });
    }

    const jobs = await Job.find({
      $text: { $search: query },
      status: 'active'
    })
      .populate('employerId', 'name companyName rating')
      .limit(20)
      .lean();

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error('SearchJobs error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Close job (stop accepting applications)
// @route   PATCH /api/jobs/:id/close
// @access  Private (Job owner only)
exports.closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    job.status = 'closed';
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job closed successfully',
      job
    });
  } catch (error) {
    console.error('CloseJob error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
