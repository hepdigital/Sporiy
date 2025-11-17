import { Metadata } from 'next';
import { SporcuDashboard } from '@/components/panel/sporcu/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard - Sporcu Paneli',
  description: 'Sporcu panel ana sayfası',
};

export default function SporcuDashboardPage() {
  return <SporcuDashboard />;
}
