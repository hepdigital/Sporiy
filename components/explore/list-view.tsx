'use client';

import Link from 'next/link';
import { Star, MapPin, Heart, Navigation } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { Button } from '@/components/ui/button';
import { FilterState } from './explore-view';

type Profile = {
  id: number;
  type: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviews: number;
  description: string;
  coverImage: string;
  specialties?: string[];
  isPremium?: boolean;
};

type Props = {
  filters: FilterState;
  profiles: Profile[];
  hoveredProfileId: number | null;
  setHoveredProfileId: (id: number | null) => void;
  selectedProfileId: number | null;
  setSelectedProfileId: (id: number | null) => void;
};

export function ListView({ 
  filters, 
  profiles,
  hoveredProfileId,
  setHoveredProfileId,
  selectedProfileId,
  setSelectedProfileId
}: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Calculate distance if user location is available
  const getDistance = (profile: Profile) => {
    if (!filters.userLocation) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = toRad(profile.coordinates.lat - filters.userLocation.lat);
    const dLon = toRad(profile.coordinates.lng - filters.userLocation.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(filters.userLocation.lat)) *
        Math.cos(toRad(profile.coordinates.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-3">
        {/* Results List */}
        {profiles.map((profile) => {
          const distance = getDistance(profile);
          const isHovered = hoveredProfileId === profile.id;
          const isSelected = selectedProfileId === profile.id;
          
          return (
            <div
              key={profile.id}
              onMouseEnter={() => setHoveredProfileId(profile.id)}
              onMouseLeave={() => setHoveredProfileId(null)}
              onClick={() => setSelectedProfileId(profile.id)}
              className={`bg-white rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#d6ff00] shadow-lg'
                  : isHovered
                  ? 'border-gray-400 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex gap-3 p-3">
                {/* Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={profile.coverImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  {profile.isPremium && (
                    <div className="absolute top-1 left-1 px-2 py-0.5 bg-[#d6ff00] text-black rounded text-xs font-semibold">
                      Premium
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <Link href={`/${profile.slug}`} className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 hover:text-gray-700 transition-colors truncate">
                        {profile.name}
                      </h3>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(profile.id);
                      }}
                      className="ml-2 flex-shrink-0"
                    >
                      <Heart
                        className={`h-4 w-4 transition-all ${
                          favorites.includes(profile.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{profile.category}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{profile.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{profile.location.split(',')[0]}</span>
                    </div>
                    {distance && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-xs" style={{ backgroundColor: 'color-mix(in oklab, #d6ff00 10%, transparent)', color: '#000' }}>
                        <Navigation className="h-3 w-3" />
                        <span>{distance.toFixed(1)} km</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-700 line-clamp-2">{profile.description}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* No Results */}
        {profiles.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
            <p className="text-sm text-gray-600">
              Filtreleri değiştirmeyi deneyin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
