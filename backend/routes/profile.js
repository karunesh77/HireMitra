const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProfile, updateProfile, uploadPhoto } = require('../controllers/profileController');

// Profile routes
router.get('/', verifyToken, getProfile);
router.patch('/', verifyToken, upload.single('photo'), updateProfile);
router.post('/photo', verifyToken, upload.single('photo'), uploadPhoto);

module.exports = router;
