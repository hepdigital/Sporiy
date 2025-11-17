import { Metadata } from 'next';
import { ClubsListView } from '@/components/clubs/clubs-list-view';

export const metadata: Metadata = {
  title: 'Spor Kulüpleri - Sporiy',
  description: 'Türkiye\'nin en iyi su sporları kulüplerini keşfedin. Yüzme, kano, yelken ve daha fazlası.',
};

export default function ClubsPage() {
  return <ClubsListView />;
}
