'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Conversation = {
  id: number;
  name: string;
  avatar: string | null;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type Message = {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
};

export function SporcuMessages() {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [messageText, setMessageText] = useState('');

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Anka Yıldız Spor Kulübü',
      avatar: null,
      lastMessage: 'Rezervasyonunuz onaylandı',
      time: '10:30',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Umut Diner',
      avatar: null,
      lastMessage: 'Yarın görüşmek üzere',
      time: 'Dün',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Deniz Yıldızı Akademi',
      avatar: null,
      lastMessage: 'Kurs programını gönderdim',
      time: '2 gün önce',
      unread: 0,
      online: false,
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'other',
      text: 'Merhaba! Yüzme dersine kayıt olmak istiyorum.',
      time: '10:00',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Merhaba, tabii ki! Hangi gün ve saatte uygun olursunuz?',
      time: '10:05',
    },
    {
      id: 3,
      sender: 'other',
      text: 'Cumartesi günleri 14:00 uygun olur mu?',
      time: '10:10',
    },
    {
      id: 4,
      sender: 'me',
      text: 'Evet müsait. Rezervasyonunuzu oluşturdum.',
      time: '10:15',
    },
    {
      id: 5,
      sender: 'other',
      text: 'Harika, teşekkür ederim!',
      time: '10:20',
    },
    {
      id: 6,
      sender: 'other',
      text: 'Rezervasyonunuz onaylandı',
      time: '10:30',
    },
  ];

  const handleSend = () => {
    if (messageText.trim()) {
      // TODO: Send message
      setMessageText('');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-4">
      {/* Conversations List */}
      <div className="w-80 bg-white rounded-xl border border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Mesajlarda ara..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedConversation === conv.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {conv.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-[#d6ff00] text-black rounded-full text-xs font-semibold flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col">
        {/* Chat Header */}
        {selectedConv && (
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                {selectedConv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedConv.name}</h2>
                <p className="text-xs text-gray-500">
                  {selectedConv.online ? 'Çevrimiçi' : 'Çevrimdışı'}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'me'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesajınızı yazın..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!messageText.trim()}
              className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
