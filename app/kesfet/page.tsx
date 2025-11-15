import { Metadata } from 'next';
import { ExploreView } from '@/components/explore/explore-view';

export const metadata: Metadata = {
  title: 'Keşfet - Sporiy',
  description: 'Yakınındaki spor kulüpleri ve eğitmenleri keşfet. Harita üzerinde ara, filtrele ve en uygun olanı bul.',
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ExploreView />
    </main>
  );
}
