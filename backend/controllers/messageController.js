const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

// Simple AI Response Generator (can be replaced with OpenAI API)
const generateAIResponse = async (userMessage, userType) => {
  const lowerMessage = userMessage.toLowerCase();

  // Job-related responses for workers
  if (userType === 'worker') {
    if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
      return "I can help you with salary information! The average pay varies by skill and location. Most jobs offer between ₹500-1200 daily. Would you like recommendations based on your skills?";
    }
    if (lowerMessage.includes('application') || lowerMessage.includes('job')) {
      return "To improve your chances:\n1. Complete your profile (photo, skills, certifications)\n2. Apply to jobs matching your skills\n3. Keep your response time fast\n4. Maintain high ratings\nNeed help with anything specific?";
    }
    if (lowerMessage.includes('skills') || lowerMessage.includes('certification')) {
      return "Adding skills and certifications to your profile significantly increases your chances of getting hired! Would you like suggestions on which certifications are most in-demand?";
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('earnings')) {
      return "Payments are processed through our secure system. You'll receive earnings in your wallet within 24-48 hours of job completion. Check your earnings dashboard for details.";
    }
  }

  // Job-related responses for employers
  if (userType === 'employer') {
    if (lowerMessage.includes('post') || lowerMessage.includes('job')) {
      return "To post a job:\n1. Go to 'Post Jobs'\n2. Fill in job details (title, description, skills required)\n3. Set salary range\n4. Add benefits\n5. Publish\nTip: Clear job descriptions get more applications!";
    }
    if (lowerMessage.includes('worker') || lowerMessage.includes('hire')) {
      return "To find workers:\n1. Browse worker profiles or use search\n2. Filter by skills, location, experience\n3. Check ratings and reviews\n4. Send job offers\n\nWould you like help searching for specific skills?";
    }
    if (lowerMessage.includes('application')) {
      return "You can manage applications from your dashboard:\n1. View all applications for your jobs\n2. Shortlist candidates\n3. Schedule interviews\n4. Send offers\n5. Check worker profiles and ratings";
    }
  }

  // Default helpful response
  if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
    return "I'm HireMitra's AI assistant! I can help you with:\n- Job posting and management\n- Finding workers or jobs\n- Application tracking\n- Payment and earnings\n- Platform features\n\nWhat would you like to know?";
  }

  // Fallback response
  return "Thanks for your message! I'm here to help. Could you be more specific about what you need? I can help with jobs, applications, payments, and more.";
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, receiverId, content, messageType = 'text' } = req.body;

    if (!conversationId || !receiverId || !content) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Verify conversation exists and user is participant
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const isParticipant = conversation.participantIds.some(id => id.toString() === req.user.id);
    if (!isParticipant) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Create message
    const message = await Message.create({
      conversationId,
      senderId: req.user.id,
      receiverId,
      content,
      messageType
    });

    // Update conversation
    conversation.lastMessage = content;
    conversation.lastMessageAt = Date.now();
    await conversation.save();

    // Create notification for receiver
    const sender = await User.findById(req.user.id).select('name');
    await createNotification({
      userId: receiverId,
      type: 'message',
      title: 'New Message',
      body: `${sender?.name || 'Someone'} sent you a message: "${content.substring(0, 60)}${content.length > 60 ? '...' : ''}"`,
      fromUserId: req.user.id,
      fromUserName: sender?.name,
      link: `/dashboard/${
        conversation.participantIds
          ? '/messages'
          : '/messages'
      }`
    });

    res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    console.error('SendMessage error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Send message to AI Assistant
// @route   POST /api/messages/ai
// @access  Private
exports.sendAIMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ error: 'Conversation ID and content are required' });
    }

    // Get user details
    const user = await User.findById(req.user.id);

    // Find or create AI conversation
    let conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Save user message
    const userMessage = await Message.create({
      conversationId,
      senderId: req.user.id,
      receiverId: null,
      content,
      messageType: 'text',
      isAI: false
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(content, user.userType);

    // Save AI response
    const aiMessage = await Message.create({
      conversationId,
      senderId: null,
      receiverId: req.user.id,
      content: aiResponse,
      messageType: 'ai-response',
      isAI: true
    });

    // Update conversation
    conversation.lastMessage = aiResponse;
    conversation.lastMessageAt = Date.now();
    await conversation.save();

    res.status(201).json({
      success: true,
      userMessage,
      aiMessage
    });
  } catch (error) {
    console.error('SendAIMessage error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get messages for conversation
// @route   GET /api/messages/:conversationId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    // Verify conversation and user is participant
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const isParticipant = conversation.participantIds.some(id => id.toString() === req.user.id);
    if (!isParticipant) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversationId })
      .populate('senderId', 'name email profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Message.countDocuments({ conversationId });

    // Mark messages as read
    await Message.updateMany(
      { conversationId, receiverId: req.user.id, isRead: false },
      { isRead: true, readAt: Date.now() }
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      messages: messages.reverse()
    });
  } catch (error) {
    console.error('GetMessages error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Get conversations for user
// @route   GET /api/messages/conversations/me
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find({
      participantIds: req.user.id,
      archivedBy: { $ne: req.user.id },
      blockedBy: { $ne: req.user.id }
    })
      .populate('participantIds', 'name email profileImage userType')
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Conversation.countDocuments({
      participantIds: req.user.id,
      archivedBy: { $ne: req.user.id }
    });

    res.status(200).json({
      success: true,
      count: conversations.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      conversations
    });
  } catch (error) {
    console.error('GetConversations error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Start conversation with user or AI
// @route   POST /api/messages/conversations
// @access  Private
exports.startConversation = async (req, res) => {
  try {
    const { recipientId, conversationType = 'direct', subject, jobId } = req.body;

    if (!recipientId && conversationType !== 'ai-chat') {
      return res.status(400).json({ error: 'Recipient ID is required' });
    }

    let participantIds = [req.user.id];
    if (conversationType !== 'ai-chat') {
      participantIds.push(recipientId);
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participantIds: { $all: participantIds },
      conversationType
    });

    if (conversation) {
      return res.status(200).json({
        success: true,
        message: 'Conversation already exists',
        conversation
      });
    }

    // Create new conversation
    conversation = await Conversation.create({
      participantIds,
      conversationType,
      subject,
      jobId
    });

    res.status(201).json({
      success: true,
      message: 'Conversation created',
      conversation
    });
  } catch (error) {
    console.error('StartConversation error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Mark conversation as read
// @route   PATCH /api/messages/conversations/:conversationId/read
// @access  Private
exports.markConversationRead = async (req, res) => {
  try {
    const { conversationId } = req.params;

    await Message.updateMany(
      { conversationId, receiverId: req.user.id, isRead: false },
      { isRead: true, readAt: Date.now() }
    );

    res.status(200).json({
      success: true,
      message: 'Conversation marked as read'
    });
  } catch (error) {
    console.error('MarkConversationRead error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Archive conversation
// @route   PATCH /api/messages/conversations/:conversationId/archive
// @access  Private
exports.archiveConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { $addToSet: { archivedBy: req.user.id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Conversation archived',
      conversation
    });
  } catch (error) {
    console.error('ArchiveConversation error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// @desc    Block user
// @route   PATCH /api/messages/conversations/:conversationId/block
// @access  Private
exports.blockUser = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { $addToSet: { blockedBy: req.user.id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'User blocked',
      conversation
    });
  } catch (error) {
    console.error('BlockUser error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
