import { Metadata } from 'next';
import { SporcuFavorites } from '@/components/panel/sporcu/favorites';

export const metadata: Metadata = {
  title: 'Favorilerim - Sporcu Paneli',
  description: 'Favori kulüp ve eğitmenleriniz',
};

export default function SporcuFavoritesPage() {
  return <SporcuFavorites />;
}
