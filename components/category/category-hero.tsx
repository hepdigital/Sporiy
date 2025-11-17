import { SportCategory } from '@/lib/sport-categories';
import { Users, Building2, TrendingUp, Waves } from 'lucide-react';
import { sportIcons } from '@/components/icons/sport-icons';

type Props = {
  category: SportCategory;
};

export function CategoryHero({ category }: Props) {
  // Get the appropriate icon component for this category
  const IconComponent = sportIcons[category.slug as keyof typeof sportIcons] || Waves;

  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${category.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl">
          {/* Icon & Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d6ff00] rounded-2xl flex items-center justify-center flex-shrink-0">
              <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              {category.name}
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            {category.description}
          </p>

          {/* Stats - Horizontal Layout */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#d6ff00]" />
              <span className="text-2xl font-bold">{category.stats.clubs}</span>
              <span className="text-gray-300">Kulüp</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#d6ff00]" />
              <span className="text-2xl font-bold">{category.stats.trainers}</span>
              <span className="text-gray-300">Eğitmen</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#d6ff00]" />
              <span className="text-2xl font-bold">{category.stats.totalProfiles}</span>
              <span className="text-gray-300">Toplam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
