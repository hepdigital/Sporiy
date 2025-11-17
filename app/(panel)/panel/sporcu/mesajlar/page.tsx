import { Metadata } from 'next';
import { SporcuMessages } from '@/components/panel/sporcu/messages';

export const metadata: Metadata = {
  title: 'Mesajlar - Sporcu Paneli',
  description: 'Mesajlarınızı görüntüleyin ve yanıtlayın',
};

export default function SporcuMessagesPage() {
  return <SporcuMessages />;
}
