const express = require('express');
const router = express.Router();
const {
  createJob,
  getJob,
  listJobs,
  findNearbyJobs,
  updateJob,
  deleteJob,
  getEmployerJobs
} = require('../controllers/jobController');
const { verifyToken } = require('../middleware/auth');

// @route   GET /api/jobs/nearby
// @desc    Find nearby jobs
// @access  Public
router.get('/nearby', findNearbyJobs);

// @route   GET /api/jobs
// @desc    List all jobs
// @access  Public
router.get('/', listJobs);

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private (employers only)
router.post('/', verifyToken, createJob);

// @route   GET /api/jobs/employer/:employerId
// @desc    Get jobs posted by employer
// @access  Public
router.get('/employer/:employerId', getEmployerJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', getJob);

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', verifyToken, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', verifyToken, deleteJob);

module.exports = router;
