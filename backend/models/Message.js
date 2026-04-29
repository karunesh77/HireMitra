const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'ai-response'],
    default: 'text'
  },
  content: {
    type: String,
    required: [true, 'Message content is required']
  },
  isAI: {
    type: Boolean,
    default: false
  },
  attachments: [
    {
      filename: String,
      url: String,
      type: String
    }
  ],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

messageSchema.index({ conversationId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
