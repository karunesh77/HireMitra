const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  getNotifications,
  markRead,
  markAllRead,
  deleteNotification
} = require('../controllers/notificationController');

router.get('/', verifyToken, getNotifications);
router.patch('/read-all', verifyToken, markAllRead);
router.patch('/:id/read', verifyToken, markRead);
router.delete('/:id', verifyToken, deleteNotification);

module.exports = router;
