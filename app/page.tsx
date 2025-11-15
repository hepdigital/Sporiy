import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { UserTypeCards } from '@/components/user-type-cards';
import { Categories } from '@/components/categories';
import { FeaturedProfiles } from '@/components/featured-profiles';
import { Features } from '@/components/features';
import { Stats } from '@/components/stats';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <UserTypeCards />
        <Categories />
        <FeaturedProfiles />
        <Features />
        <Stats />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
