import { Hero } from '@/components/hero';
import { UserTypeCards } from '@/components/user-type-cards';
import { Categories } from '@/components/categories';
import { FeaturedProfiles } from '@/components/featured-profiles';
import { Features } from '@/components/features';
import { Stats } from '@/components/stats';
import { CTASection } from '@/components/cta-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <UserTypeCards />
      <Categories />
      <FeaturedProfiles />
      <Features />
      <Stats />
      <CTASection />
    </main>
  );
}
