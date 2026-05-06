const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getWorkers, getWorkerById } = require('../controllers/profileController');

// Browse workers (employers only)
router.get('/', verifyToken, getWorkers);
router.get('/:id', verifyToken, getWorkerById);

module.exports = router;
