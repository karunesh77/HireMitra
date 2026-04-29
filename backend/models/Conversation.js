const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participantIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  lastMessage: String,
  lastMessageAt: Date,
  unreadCount: {
    type: Map,
    of: Number,
    default: new Map()
  },
  conversationType: {
    type: String,
    enum: ['direct', 'job-inquiry', 'ai-chat'],
    default: 'direct'
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  subject: String,
  isActive: {
    type: Boolean,
    default: true
  },
  archivedBy: [mongoose.Schema.Types.ObjectId],
  blockedBy: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

conversationSchema.index({ participantIds: 1 });
conversationSchema.index({ lastMessageAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);
