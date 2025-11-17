'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
};

const reportReasons = [
  'Spam veya yanıltıcı içerik',
  'Uygunsuz içerik',
  'Sahte profil',
  'Dolandırıcılık',
  'Telif hakkı ihlali',
  'Diğer',
];

export function ReportModal({ isOpen, onClose, profileName }: Props) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    // TODO: Submit report logic
    console.log('Report submitted:', { selectedReason, details });
    setSelectedReason('');
    setDetails('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profili Bildir" size="md">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Bu profili bildirmek üzeresiniz</p>
            <p>Lütfen bildirme nedeninizi seçin. Ekibimiz en kısa sürede inceleyecektir.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bildirme Nedeni
          </label>
          <div className="space-y-2">
            {reportReasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-[#d6ff00] focus:ring-[#d6ff00]"
                />
                <span className="text-sm text-gray-700">{reason}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ek Açıklama (İsteğe Bağlı)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Daha fazla detay eklemek isterseniz buraya yazabilirsiniz..."
            className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            Bildir
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            İptal
          </Button>
        </div>
      </div>
    </Modal>
  );
}
