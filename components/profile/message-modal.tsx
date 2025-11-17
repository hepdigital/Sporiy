'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
};

export function MessageModal({ isOpen, onClose, recipientName }: Props) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // TODO: Send message logic
    console.log('Sending message:', message);
    setMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${recipientName}'e Mesaj Gönder`} size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mesajınız
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesajınızı buraya yazın..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00] gap-2"
          >
            <Send className="h-4 w-4" />
            Gönder
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            İptal
          </Button>
        </div>
      </div>
    </Modal>
  );
}
