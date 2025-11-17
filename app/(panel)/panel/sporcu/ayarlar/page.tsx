import { Metadata } from 'next';
import { SporcuSettings } from '@/components/panel/sporcu/settings';

export const metadata: Metadata = {
  title: 'Ayarlar - Sporcu Paneli',
  description: 'Hesap ayarlarınızı yönetin',
};

export default function SporcuSettingsPage() {
  return <SporcuSettings />;
}
