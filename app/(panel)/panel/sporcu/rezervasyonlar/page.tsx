import { Metadata } from 'next';
import { SporcuReservations } from '@/components/panel/sporcu/reservations';

export const metadata: Metadata = {
  title: 'Rezervasyonlarım - Sporcu Paneli',
  description: 'Rezervasyonlarınızı görüntüleyin ve yönetin',
};

export default function SporcuReservationsPage() {
  return <SporcuReservations />;
}
