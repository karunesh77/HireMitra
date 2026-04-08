const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getJobApplications,
  getWorkerApplications,
  acceptApplication,
  rejectApplication,
  withdrawApplication,
  rateApplication,
  getApplication
} = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/auth');

// @route   POST /api/applications
// @desc    Submit job application
// @access  Private
router.post('/', verifyToken, submitApplication);

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', verifyToken, getApplication);

// @route   GET /api/applications/job/:jobId
// @desc    Get applications for a job (employer)
// @access  Private
router.get('/job/:jobId', verifyToken, getJobApplications);

// @route   GET /api/applications/worker
// @desc    Get applications submitted by worker
// @access  Private
router.get('/worker', verifyToken, getWorkerApplications);

// @route   PATCH /api/applications/:id/accept
// @desc    Accept application
// @access  Private
router.patch('/:id/accept', verifyToken, acceptApplication);

// @route   PATCH /api/applications/:id/reject
// @desc    Reject application
// @access  Private
router.patch('/:id/reject', verifyToken, rejectApplication);

// @route   PATCH /api/applications/:id/withdraw
// @desc    Withdraw application
// @access  Private
router.patch('/:id/withdraw', verifyToken, withdrawApplication);

// @route   PATCH /api/applications/:id/rate
// @desc    Rate application
// @access  Private
router.patch('/:id/rate', verifyToken, rateApplication);

module.exports = router;
