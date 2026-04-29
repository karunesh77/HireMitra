const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

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
