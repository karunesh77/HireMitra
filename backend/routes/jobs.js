const express = require('express');
const router = express.Router();
const { postJob, getJobs, getJobById, updateJob, deleteJob, getMyJobs, searchJobs, closeJob } = require('../controllers/jobController');
const { verifyToken } = require('../middleware/auth');

// Specific routes first (before /:id)
router.get('/search', searchJobs);
router.get('/employer/me', verifyToken, getMyJobs);

// Generic routes after specific ones
router.post('/', verifyToken, postJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);
router.patch('/:id/close', verifyToken, closeJob);

module.exports = router;
