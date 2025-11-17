import { Metadata } from 'next';
import { TrainersListView } from '@/components/trainers/trainers-list-view';

export const metadata: Metadata = {
  title: 'Spor Eğitmenleri - Sporiy',
  description: 'Türkiye\'nin en iyi su sporları eğitmenlerini keşfedin. Profesyonel antrenörler ve uzman eğitmenler.',
};

export default function TrainersPage() {
  return <TrainersListView />;
}
