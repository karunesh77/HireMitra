const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  getEmployerApplications,
  getApplicationById,
  updateApplicationStatus,
  scheduleInterview,
  sendOffer,
  rejectApplication,
  shortlistApplication,
  cancelApplication
} = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// Worker routes
router.post('/', applyForJob);
router.get('/worker/me', getMyApplications);
router.delete('/:id', cancelApplication);

// Employer routes
router.get('/employer/me', getEmployerApplications);
router.get('/employer/jobs/:jobId', getJobApplications);

// Protected routes (both can view)
router.get('/:id', getApplicationById);

// Employer actions
router.patch('/:id/status', updateApplicationStatus);
router.patch('/:id/shortlist', shortlistApplication);
router.patch('/:id/interview', scheduleInterview);
router.patch('/:id/offer', sendOffer);
router.patch('/:id/reject', rejectApplication);

module.exports = router;
