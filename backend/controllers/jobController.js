const Job = require('../models/Job');
const Application = require('../models/Application');
const { calculateDistance } = require('../utils/helpers');

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private (employers only)
exports.createJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, paymentType, salary, location, startDate, positions, duration, yearsOfExperience, isUrgent } = req.body;

    // Validate required fields
    if (!title || !description || !requiredSkills || !paymentType || !salary || !location || !startDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate location has coordinates
    if (!location.latitude || !location.longitude) {
      return res.status(400).json({ error: 'Location must include latitude and longitude' });
    }

    const job = new Job({
      title,
      description,
      requiredSkills,
      paymentType,
      salary,
      location,
      startDate,
      positions: positions || 1,
      duration: duration || 'one-time',
      yearsOfExperience: yearsOfExperience || 0,
      isUrgent: isUrgent || false,
      postedBy: req.user.id
    });

    await job.save();
    await job.populate('postedBy', 'name companyName');

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    console.error('CreateJob error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name companyName email phone');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error('GetJob error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    List all jobs with filters
// @route   GET /api/jobs
// @access  Public
exports.listJobs = async (req, res) => {
  try {
    const { skills, city, state, minSalary, maxSalary, page = 1, limit = 20, sortBy = 'createdAt' } = req.query;

    const filter = { status: 'open' };

    // Filter by skills
    if (skills) {
      filter.requiredSkills = { $in: Array.isArray(skills) ? skills : [skills] };
    }

    // Filter by location
    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    if (state) {
      filter['location.state'] = { $regex: state, $options: 'i' };
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = parseInt(minSalary);
      if (maxSalary) filter.salary.$lte = parseInt(maxSalary);
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name companyName rating')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ [sortBy]: -1 });

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      jobs
    });
  } catch (error) {
    console.error('ListJobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Find nearby jobs (within radius)
// @route   GET /api/jobs/nearby
// @access  Public
exports.findNearbyJobs = async (req, res) => {
  try {
    const { latitude, longitude, radiusKm = 25, skills, page = 1, limit = 20 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const radius = parseFloat(radiusKm);
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Get all open jobs
    let filter = { status: 'open' };
    if (skills) {
      filter.requiredSkills = { $in: Array.isArray(skills) ? skills : [skills] };
    }

    const allJobs = await Job.find(filter).populate('postedBy', 'name companyName rating');

    // Filter by distance
    const nearbyJobs = allJobs.filter(job => {
      const distance = calculateDistance(userLat, userLon, job.location.latitude, job.location.longitude);
      return distance <= radius;
    });

    // Pagination
    const skip = (page - 1) * limit;
    const paginatedJobs = nearbyJobs.slice(skip, skip + parseInt(limit));

    res.status(200).json({
      success: true,
      pagination: {
        total: nearbyJobs.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(nearbyJobs.length / limit)
      },
      jobs: paginatedJobs.map(job => ({
        ...job.toObject(),
        distance: calculateDistance(userLat, userLon, job.location.latitude, job.location.longitude).toFixed(2) + ' km'
      }))
    });
  } catch (error) {
    console.error('FindNearbyJobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (only employer who posted it)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check authorization
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    // Update allowed fields
    const allowedFields = ['title', 'description', 'requiredSkills', 'salary', 'startDate', 'status', 'positions'];
    allowedFields.forEach(field => {
      if (req.body[field]) job[field] = req.body[field];
    });

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
// @access  Private (only employer who posted it)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check authorization
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('DeleteJob error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get jobs posted by employer
// @route   GET /api/jobs/employer/:employerId
// @access  Public
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.employerId }).populate('postedBy', 'name companyName');

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error('GetEmployerJobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
