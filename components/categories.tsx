'use client';

import Link from 'next/link';
import { 
  SwimmingIcon, 
  CanoeIcon, 
  RowingIcon, 
  SailingIcon, 
  WaterPoloIcon, 
  DivingIcon, 
  TriathlonIcon, 
  PentathlonIcon 
} from '@/components/icons/sport-icons';

const categories = [
  { name: 'Yüzme', icon: SwimmingIcon, slug: 'yuzme' },
  { name: 'Kano', icon: CanoeIcon, slug: 'kano' },
  { name: 'Kürek', icon: RowingIcon, slug: 'kurek' },
  { name: 'Yelken', icon: SailingIcon, slug: 'yelken' },
  { name: 'Sutopu', icon: WaterPoloIcon, slug: 'sutopu' },
  { name: 'Sualtı Sporları', icon: DivingIcon, slug: 'sualti-sporlari' },
  { name: 'Triatlon', icon: TriathlonIcon, slug: 'triatlon' },
  { name: 'Modern Pentatlon', icon: PentathlonIcon, slug: 'modern-pentatlon' },
];

export function Categories() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl sm:text-5xl font-bold">Spor Dalları</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Su sporları dünyasında uzmanlaşmış kulüp ve eğitmenlerle tanışın
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/kategori/${category.slug}`}
                className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-black rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="h-7 w-7 text-gray-900 group-hover:text-[#d6ff00] transition-colors" />
                </div>
                <h3 className="text-gray-900 transition-colors font-medium">
                  {category.name}
                </h3>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-5 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
