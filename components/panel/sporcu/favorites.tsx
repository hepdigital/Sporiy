'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, MapPin, Building2, User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FavoriteProfile = {
  id: number;
  name: string;
  slug: string;
  type: 'club' | 'trainer';
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  addedDate: string;
};

export function SporcuFavorites() {
  const [favorites, setFavorites] = useState<FavoriteProfile[]>([
    {
      id: 1,
      name: 'Anka Yıldız Spor Kulübü',
      slug: 'ankayildizsporkulubu',
      type: 'club',
      category: 'Yüzme',
      location: 'Ankara',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
      addedDate: '15 Kasım 2024',
    },
    {
      id: 2,
      name: 'Umut Diner',
      slug: 'umutdiner',
      type: 'trainer',
      category: 'Kano',
      location: 'İstanbul',
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
      addedDate: '10 Kasım 2024',
    },
    {
      id: 3,
      name: 'Deniz Yıldızı Akademi',
      slug: 'denizyildiziakademi',
      type: 'club',
      category: 'Yelken',
      location: 'İzmir',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      addedDate: '5 Kasım 2024',
    },
  ]);

  const handleRemove = (id: number) => {
    if (confirm('Bu profili favorilerden kaldırmak istediğinize emin misiniz?')) {
      setFavorites(favorites.filter(fav => fav.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
        <p className="text-gray-600 mt-1">
          Favori kulüp ve eğitmenleriniz ({favorites.length})
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${profile.image})` }}
                />
                <button
                  onClick={() => handleRemove(profile.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors group/btn"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500 group-hover/btn:fill-red-600 group-hover/btn:text-red-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  {profile.type === 'club' ? (
                    <Building2 className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <User className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${profile.slug}`}
                      className="font-semibold text-gray-900 hover:text-[#d6ff00] transition-colors line-clamp-1"
                    >
                      {profile.name}
                    </Link>
                    <p className="text-sm text-gray-600">{profile.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{profile.rating}</span>
                  <span className="text-sm text-gray-500">({profile.reviews})</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>

                <div className="flex gap-2">
                  <Link href={`/${profile.slug}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      Profili Gör
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => handleRemove(profile.id)}
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Eklenme: {profile.addedDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Henüz Favori Eklemediniz
          </h3>
          <p className="text-gray-600 mb-6">
            Beğendiğiniz kulüp ve eğitmenleri favorilerinize ekleyerek kolayca ulaşabilirsiniz
          </p>
          <Link href="/kesfet">
            <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
              Keşfet
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
