'use client';

import { Modal } from '@/components/ui/modal';
import { Link2, MessageCircle, Facebook, Twitter, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postUrl?: string;
};

export function ShareModal({ isOpen, onClose, postId, postUrl = `https://sporiy.com/post/${postId}` }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Mesaj Olarak Gönder',
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-50',
      action: () => alert('Mesaj gönderme özelliği yakında!'),
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600 bg-green-50',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(postUrl)}`, '_blank'),
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-700 bg-blue-50',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank'),
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-sky-600 bg-sky-50',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, '_blank'),
    },
    {
      name: 'E-posta',
      icon: Mail,
      color: 'text-gray-600 bg-gray-50',
      action: () => window.open(`mailto:?body=${encodeURIComponent(postUrl)}`, '_blank'),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Paylaş" size="sm">
      <div className="space-y-4">
        {/* Copy Link */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Link2 className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">Linki Kopyala</p>
              <p className="text-sm text-gray-500 truncate">{postUrl}</p>
            </div>
          </div>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Kopyalandı!
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4 mr-2" />
                Kopyala
              </>
            )}
          </Button>
        </div>

        {/* Share Options */}
        <div className="space-y-2">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-gray-900">{option.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
