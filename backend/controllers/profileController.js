const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const { createNotification } = require('./notificationController');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('GetProfile error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Update user profile with photo upload
// @route   PATCH /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, address, bio, skills, hourlyRate, availability, companyName, website, industry } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update basic fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (address) user.address = address;
    if (bio) user.bio = bio;
    if (skills) user.skills = Array.isArray(skills) ? skills : [skills];
    if (hourlyRate) user.hourlyRate = hourlyRate;
    if (availability) user.availability = availability;
    if (companyName) user.companyName = companyName;
    if (website) user.website = website;
    if (industry) user.industry = industry;

    // Handle photo upload
    if (req.file) {
      try {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'hiremitra/profiles', resource_type: 'auto' },
          (error, result) => {
            if (error) {
              throw new Error(`Cloudinary upload error: ${error.message}`);
            }
            user.profileImage = result.secure_url;
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

        // Wait for upload to complete
        await new Promise((resolve, reject) => {
          uploadStream.on('finish', resolve);
          uploadStream.on('error', reject);
        });
      } catch (uploadError) {
        return res.status(400).json({ error: `Photo upload failed: ${uploadError.message}` });
      }
    }

    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Browse all workers (for employers)
// @route   GET /api/workers
// @access  Private
exports.getWorkers = async (req, res) => {
  try {
    const { search, skill, location, limit = 50, skip = 0 } = req.query;
    const query = { userType: 'worker' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
      ];
    }
    if (skill) {
      query.skills = { $regex: skill, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const workers = await User.find(query)
      .select('-password')
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, workers, total: workers.length });
  } catch (error) {
    console.error('GetWorkers error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get single worker profile (for employers)
// @route   GET /api/workers/:id
// @access  Private
exports.getWorkerById = async (req, res) => {
  try {
    const worker = await User.findOne({ _id: req.params.id, userType: 'worker' }).select('-password');
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    // Notify worker that someone viewed their profile (only if viewer is different)
    if (req.user.id !== req.params.id) {
      const viewer = await User.findById(req.user.id).select('name');
      await createNotification({
        userId: worker._id,
        type: 'profile_view',
        title: 'Profile Viewed',
        body: `${viewer?.name || 'An employer'} viewed your profile`,
        fromUserId: req.user.id,
        fromUserName: viewer?.name,
        link: '/dashboard/worker/notifications'
      });
    }

    res.status(200).json({ success: true, worker });
  } catch (error) {
    console.error('GetWorkerById error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Upload profile photo
// @route   POST /api/profile/photo
// @access  Private
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No photo provided' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'hiremitra/profiles', resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      user.profileImage = result.secure_url;
      user.updatedAt = Date.now();
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Photo uploaded successfully',
        photoUrl: result.secure_url
      });
    } catch (uploadError) {
      return res.status(400).json({ error: `Upload failed: ${uploadError.message}` });
    }
  } catch (error) {
    console.error('UploadPhoto error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
