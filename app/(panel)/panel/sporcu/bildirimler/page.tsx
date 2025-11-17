import { Metadata } from 'next';
import { SporcuNotifications } from '@/components/panel/sporcu/notifications';

export const metadata: Metadata = {
  title: 'Bildirimler - Sporcu Paneli',
  description: 'Bildirimlerinizi görüntüleyin',
};

export default function SporcuNotificationsPage() {
  return <SporcuNotifications />;
}
