'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar, Input, Button, LoadingSpinner } from '@/components';
import { Breadcrumbs } from '@/components';
import apiClient from '@/lib/api';

interface Participant {
  _id: string;
  name: string;
  userType: string;
}

interface Conversation {
  _id: string;
  participantIds: Participant[];
  participants: Participant[]; // alias fallback
  lastMessage: { content: string; createdAt: string } | null;
  unreadCount: number;
}

interface Message {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

function EmployerMessagesContent() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [showConvList, setShowConvList] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingConvs, setIsLoadingConvs] = useState(true);
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const targetConvId = searchParams.get('conv');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/employer' },
    { label: 'Messages' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.userId || payload.id || '');
      } catch {}
    }
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoadingConvs(true);
        const res = await apiClient.get('/api/messages/conversations');
        const convs = res.data.conversations || [];
        setConversations(convs);
        if (convs.length > 0) {
          // Auto-select by conv param from URL, or first conversation
          const target = targetConvId
            ? convs.find((c: Conversation) => c._id === targetConvId)
            : convs[0];
          if (target) selectConversation(target);
        }
      } catch (err) {
        console.error('Conversations fetch error:', err);
      } finally {
        setIsLoadingConvs(false);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectConversation = async (conv: Conversation) => {
    setSelectedConv(conv);
    setShowConvList(false);
    setIsLoadingMsgs(true);
    try {
      const res = await apiClient.get(`/api/messages/${conv._id}`);
      setMessages(res.data.messages || []);
      await apiClient.patch(`/api/messages/conversations/${conv._id}/read`).catch(() => {});
      setConversations(prev =>
        prev.map(c => c._id === conv._id ? { ...c, unreadCount: 0 } : c)
      );
    } catch (err) {
      console.error('Messages fetch error:', err);
    } finally {
      setIsLoadingMsgs(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConv || isSending) return;

    const msgContent = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    const tempMsg: Message = {
      _id: Date.now().toString(),
      senderId: currentUserId,
      content: msgContent,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const receiverId = getOtherUser(selectedConv)?._id;
      await apiClient.post('/api/messages', {
        conversationId: selectedConv._id,
        receiverId,
        content: msgContent,
      });
      setConversations(prev =>
        prev.map(c => c._id === selectedConv._id
          ? { ...c, lastMessage: { content: msgContent, createdAt: new Date().toISOString() } }
          : c
        )
      );
    } catch (err) {
      console.error('Send message error:', err);
      setMessages(prev => prev.filter(m => m._id !== tempMsg._id));
      setNewMessage(msgContent);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Backend returns participantIds (populated), not participants
  const getParticipants = (conv: Conversation) =>
    conv.participantIds || conv.participants || [];

  const getOtherUser = (conv: Conversation) =>
    getParticipants(conv).find(p => p._id !== currentUserId);

  const formatLastSeen = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-2">Messages</h1>
            <p className="text-[#4A4A4A]">Chat with workers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[calc(100vh-12rem)] min-h-[500px] border border-[#E5E7EB] rounded-xl overflow-hidden">

            {/* Conversations List */}
            <div className={`lg:col-span-1 border-r border-[#E5E7EB] bg-white flex flex-col ${selectedConv ? 'hidden lg:flex' : 'flex'}`}>
              <div className="p-4 border-b border-[#E5E7EB]">
                <Input placeholder="Search conversations..." type="text" />
              </div>

              <div className="overflow-y-auto flex-1">
                {isLoadingConvs ? (
                  <div className="flex justify-center py-8"><LoadingSpinner /></div>
                ) : conversations.length === 0 ? (
                  <div className="p-6 text-center text-[#4A4A4A]">
                    <p className="text-2xl mb-2">💬</p>
                    <p className="text-sm">No conversations yet</p>
                  </div>
                ) : (
                  conversations.map((conv) => {
                    const otherUser = getOtherUser(conv);
                    const isSelected = selectedConv?._id === conv._id;
                    return (
                      <div
                        key={conv._id}
                        onClick={() => selectConversation(conv)}
                        className={`p-4 border-b border-[#E5E7EB] cursor-pointer transition ${
                          isSelected
                            ? 'bg-[#FFF4E5] border-l-4 border-l-[#FF7A00]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg flex-shrink-0">
                              👤
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[#001F3F] truncate">
                                {otherUser?.name || 'Worker'}
                              </h3>
                              <p className="text-sm text-[#4A4A4A] truncate">
                                {conv.lastMessage?.content || 'No messages yet'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-2">
                            {conv.lastMessage && (
                              <span className="text-xs text-[#4A4A4A] whitespace-nowrap">
                                {formatLastSeen(conv.lastMessage.createdAt)}
                              </span>
                            )}
                            {conv.unreadCount > 0 && (
                              <span className="w-5 h-5 bg-[#FF7A00] text-white text-xs flex items-center justify-center rounded-full font-bold">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`lg:col-span-2 bg-white flex flex-col ${selectedConv ? 'flex' : 'hidden lg:flex'}`}>
              {!selectedConv ? (
                <div className="flex-1 flex items-center justify-center text-center text-[#4A4A4A]">
                  <div>
                    <p className="text-4xl mb-3">💬</p>
                    <p className="font-semibold text-lg">Select a conversation</p>
                    <p className="text-sm mt-1">Choose a conversation from the left to start chatting</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-4">
                    <button
                      className="lg:hidden text-[#FF7A00] font-semibold text-sm mr-1"
                      onClick={() => { setSelectedConv(null); setShowConvList(true); }}
                    >
                      ← Back
                    </button>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">👤</div>
                    <div>
                      <h2 className="font-bold text-[#001F3F]">
                        {getOtherUser(selectedConv)?.name || 'Worker'}
                      </h2>
                      <p className="text-xs text-green-500">● Online</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {isLoadingMsgs ? (
                      <div className="flex justify-center py-8"><LoadingSpinner /></div>
                    ) : messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-[#4A4A4A]">
                        <p className="text-sm">No messages yet. Say hello! 👋</p>
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isMine = msg.senderId === currentUserId;
                        return (
                          <div key={msg._id} className={`flex gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
                            {!isMine && (
                              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-sm flex-shrink-0">👤</div>
                            )}
                            <div className={`max-w-xs lg:max-w-md ${isMine ? 'items-end' : 'items-start'} flex flex-col`}>
                              <div className={`px-4 py-2 rounded-2xl text-sm ${
                                isMine
                                  ? 'bg-[#FF7A00] text-white rounded-br-sm'
                                  : 'bg-gray-100 text-[#001F3F] rounded-bl-sm'
                              }`}>
                                {msg.content}
                              </div>
                              <p className="text-xs text-[#4A4A4A] mt-1">{formatTime(msg.createdAt)}</p>
                            </div>
                            {isMine && (
                              <div className="w-8 h-8 rounded-full bg-[#FFF4E5] flex items-center justify-center text-sm flex-shrink-0">🏢</div>
                            )}
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-[#E5E7EB]">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message... (Enter to send)"
                        className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-sm"
                      />
                      <Button size="sm" onClick={handleSend} disabled={isSending || !newMessage.trim()}>
                        {isSending ? '...' : 'Send'}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmployerMessages() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><LoadingSpinner /></div>}>
      <EmployerMessagesContent />
    </Suspense>
  );
}
