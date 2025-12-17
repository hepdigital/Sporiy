import { notFound } from 'next/navigation';
import { ClubSearchResults } from '@/components/search/club-search-results';
import { sportIcons } from '@/components/icons/sport-icons';
import { Waves, Building2, Users, TrendingUp } from 'lucide-react';

// Kategori slug'larını tanımla
const categories = [
  { slug: 'yuzme', name: 'Yüzme' },
  { slug: 'kano', name: 'Kano' },
  { slug: 'yelken', name: 'Yelken' },
  { slug: 'kurek', name: 'Kürek' },
  { slug: 'sutopu', name: 'Sutopu' },
  { slug: 'sualti-sporlari', name: 'Sualtı Sporları' }
];

type Props = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({ params }: Props) {
  const category = categories.find(c => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Get the appropriate icon component for this category
  const IconComponent = sportIcons[params.slug as keyof typeof sportIcons] || Waves;

  return (
    <div>
      {/* Hero Section with Dark Background */}
      <div className="relative bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <div 
            className="w-full h-full bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200')`
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d6ff00] rounded-2xl flex items-center justify-center flex-shrink-0">
                <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{category.name}</h1>
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              Profesyonel {category.name.toLowerCase()} eğitmenleri ve kulüpleri ile tanışın. Başlangıçtan olimpik seviyeye kadar tüm seviyelerde eğitim.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#d6ff00]" />
                <span className="text-2xl font-bold">45</span>
                <span className="text-gray-300">Kulüp</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#d6ff00]" />
                <span className="text-2xl font-bold">128</span>
                <span className="text-gray-300">Eğitmen</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#d6ff00]" />
                <span className="text-2xl font-bold">173</span>
                <span className="text-gray-300">Toplam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Use ClubSearchResults with pre-selected category */}
      <ClubSearchResults location="" />
    </div>
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}