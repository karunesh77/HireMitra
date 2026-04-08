const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, searchWorkers, getWorkerRating, updateUserRating } = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

// @route   GET /api/users/search/workers
// @desc    Search workers by skills and location
// @access  Public
router.get('/search/workers', searchWorkers);

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   GET /api/users/:id/rating
// @desc    Get worker rating
// @access  Public
router.get('/:id/rating', getWorkerRating);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', verifyToken, updateUserProfile);

// @route   PATCH /api/users/:id/rating
// @desc    Update user rating
// @access  Private (system)
router.patch('/:id/rating', verifyToken, updateUserRating);

module.exports = router;
