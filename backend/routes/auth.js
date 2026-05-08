const express = require('express');
const router = express.Router();
const { register, login, getMe, changePassword, forgotPassword, resetPassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', verifyToken, getMe);
router.patch('/change-password', verifyToken, changePassword);

module.exports = router;
