import { Metadata } from 'next';
import { SporcuPayments } from '@/components/panel/sporcu/payments';

export const metadata: Metadata = {
  title: 'Ödemeler - Sporcu Paneli',
  description: 'Ödeme geçmişinizi görüntüleyin',
};

export default function SporcuPaymentsPage() {
  return <SporcuPayments />;
}
