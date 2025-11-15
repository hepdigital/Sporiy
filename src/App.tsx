import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UserTypeCards } from './components/UserTypeCards';
import { Categories } from './components/Categories';
import { FeaturedProfiles } from './components/FeaturedProfiles';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function App() {
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