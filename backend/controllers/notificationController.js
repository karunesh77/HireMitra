const Notification = require('../models/Notification');

// Helper to create a notification (used internally by other controllers)
exports.createNotification = async ({ userId, type, title, body, fromUserId, fromUserName, link }) => {
  try {
    await Notification.create({ userId, type, title, body, fromUserId, fromUserName, link });
  } catch (err) {
    console.error('Create notification error:', err);
  }
};

// @desc    Get notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query;

    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const unreadCount = await Notification.countDocuments({
      userId: req.user.id,
      read: false
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
      total: notifications.length
    });
  } catch (err) {
    console.error('GetNotifications error:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

// @desc    Mark a single notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
exports.markRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { read: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { read: true }
    );
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
