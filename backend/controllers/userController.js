const User = require('../models/User');

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('GetUserProfile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private (only owner can update)
exports.updateUserProfile = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const { name, phone, bio, skills, hourlyRate, availability, companyName, companyDescription, website, location } = req.body;

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (bio) updateData.bio = bio;
    if (skills) updateData.skills = skills;
    if (hourlyRate) updateData.hourlyRate = hourlyRate;
    if (availability) updateData.availability = availability;
    if (companyName) updateData.companyName = companyName;
    if (companyDescription) updateData.companyDescription = companyDescription;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('UpdateUserProfile error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Search workers by skills and location
// @route   GET /api/users/search/workers
// @access  Public
exports.searchWorkers = async (req, res) => {
  try {
    const { skills, city, state, page = 1, limit = 20 } = req.query;

    const filter = { userType: 'worker', isActive: true };

    if (skills) {
      filter.skills = { $in: Array.isArray(skills) ? skills : [skills] };
    }

    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    if (state) {
      filter['location.state'] = { $regex: state, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const workers = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ 'rating.average': -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      workers
    });
  } catch (error) {
    console.error('SearchWorkers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get worker rating and reviews
// @route   GET /api/users/:id/rating
// @access  Public
exports.getWorkerRating = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name rating');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      rating: user.rating,
      name: user.name
    });
  } catch (error) {
    console.error('GetWorkerRating error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update user rating
// @route   PATCH /api/users/:id/rating
// @access  Private (system use)
exports.updateUserRating = async (req, res) => {
  try {
    const { score } = req.body;

    if (score < 1 || score > 5) {
      return res.status(400).json({ error: 'Score must be between 1 and 5' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate new average rating
    const currentAverage = user.rating.average;
    const currentCount = user.rating.count;
    const newAverage = (currentAverage * currentCount + score) / (currentCount + 1);

    user.rating.average = parseFloat(newAverage.toFixed(2));
    user.rating.count = currentCount + 1;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Rating updated successfully',
      rating: user.rating
    });
  } catch (error) {
    console.error('UpdateUserRating error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
