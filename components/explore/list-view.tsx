'use client';

import Link from 'next/link';
import { Star, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { Button } from '@/components/ui/button';
import { FilterState } from './explore-view';
import { mockProfiles } from '@/lib/mock-data';

type Props = {
  filters: FilterState;
};

export function ListView({ filters }: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Filter profiles
  const filteredProfiles = mockProfiles.filter((profile) => {
    if (filters.category.length > 0 && !filters.category.includes(profile.category)) {
      return false;
    }
    if (filters.rating > 0 && profile.rating < filters.rating) {
      return false;
    }
    if (filters.search && !profile.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      <div className="mx-auto max-w-5xl p-6">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredProfiles.length} Sonuç Bulundu
          </h2>
          <p className="text-gray-600">
            {filters.location || 'Türkiye'} konumunda {filters.category.length > 0 ? filters.category.join(', ') : 'tüm spor dalları'}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-64 h-48 sm:h-auto bg-gray-100">
                  <ImageWithFallback
                    src={profile.coverImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  {profile.isPremium && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#d6ff00] text-black rounded-full text-xs font-semibold">
                      Premium
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(profile.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${
                        favorites.includes(profile.id)
                          ? 'fill-red-500 text-red-500 scale-110'
                          : 'text-gray-700'
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link href={`/${profile.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 hover:text-[#d6ff00] transition-colors mb-1">
                          {profile.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{profile.category}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{profile.rating}</span>
                          <span>({profile.reviews} değerlendirme)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{profile.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.specialties?.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link href={`/${profile.slug}`} className="flex-1">
                      <Button className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold">
                        Profili Görüntüle
                      </Button>
                    </Link>
                    <Button variant="outline">Mesaj Gönder</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredProfiles.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Daha Fazla Yükle
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
            <p className="text-gray-600 mb-6">
              Arama kriterlerinize uygun profil bulunamadı. Filtreleri değiştirmeyi deneyin.
            </p>
            <Button variant="outline">Filtreleri Temizle</Button>
          </div>
        )}
      </div>
    </div>
  );
}
