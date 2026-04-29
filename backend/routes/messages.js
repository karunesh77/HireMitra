const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  sendMessage,
  sendAIMessage,
  getMessages,
  getConversations,
  startConversation,
  markConversationRead,
  archiveConversation,
  blockUser
} = require('../controllers/messageController');

// Conversation routes
router.post('/conversations', verifyToken, startConversation);
router.get('/conversations', verifyToken, getConversations);
router.patch('/conversations/:conversationId/read', verifyToken, markConversationRead);
router.patch('/conversations/:conversationId/archive', verifyToken, archiveConversation);
router.patch('/conversations/:conversationId/block', verifyToken, blockUser);

// Message routes
router.post('/', verifyToken, sendMessage);
router.post('/ai', verifyToken, sendAIMessage);
router.get('/:conversationId', verifyToken, getMessages);

module.exports = router;
