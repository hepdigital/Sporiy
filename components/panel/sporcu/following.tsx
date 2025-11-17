'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Building2, MapPin, Star, UserMinus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FollowedProfile = {
  id: number;
  name: string;
  slug: string;
  type: 'club' | 'trainer';
  category: string;
  location: string;
  rating: number;
  reviews: number;
  followers: string;
  image: string;
  followedDate: string;
  isFollowing: boolean;
};

export function SporcuFollowing() {
  const [profiles, setProfiles] = useState<FollowedProfile[]>([
    {
      id: 1,
      name: 'Anka Yıldız Spor Kulübü',
      slug: 'ankayildizsporkulubu',
      type: 'club',
      category: 'Yüzme',
      location: 'Ankara',
      rating: 4.9,
      reviews: 127,
      followers: '3.4K',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
      followedDate: '15 Kasım 2024',
      isFollowing: true,
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
      followers: '1.2K',
      image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
      followedDate: '10 Kasım 2024',
      isFollowing: true,
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
      followers: '2.8K',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      followedDate: '5 Kasım 2024',
      isFollowing: true,
    },
  ]);

  const handleUnfollow = (id: number) => {
    if (confirm('Takibi bırakmak istediğinize emin misiniz?')) {
      setProfiles(profiles.map(profile => 
        profile.id === id ? { ...profile, isFollowing: false } : profile
      ));
    }
  };

  const handleFollow = (id: number) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, isFollowing: true } : profile
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Takip Ettiklerim</h1>
        <p className="text-gray-600 mt-1">
          Takip ettiğiniz {profiles.filter(p => p.isFollowing).length} profil
        </p>
      </div>

      {/* Following List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Cover Image */}
            <div className="relative h-32 bg-gray-200">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${profile.image})` }}
              />
            </div>

            {/* Profile Info */}
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 -mt-8 border-4 border-white">
                  {profile.type === 'club' ? (
                    <Building2 className="h-6 w-6 text-gray-400" />
                  ) : (
                    <User className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0 mt-2">
                  <Link
                    href={`/${profile.slug}`}
                    className="font-semibold text-gray-900 hover:text-[#d6ff00] transition-colors line-clamp-1 block"
                  >
                    {profile.name}
                  </Link>
                  <p className="text-sm text-gray-600">{profile.category}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">{profile.rating}</span>
                  <span className="text-gray-500">({profile.reviews} değerlendirme)</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{profile.followers}</span> takipçi
                </p>
              </div>

              <div className="flex gap-2">
                {profile.isFollowing ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUnfollow(profile.id)}
                      className="flex-1 text-gray-700 hover:text-red-600 hover:border-red-600"
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Takipten Çık
                    </Button>
                    <Link href="/panel/sporcu/mesajlar" className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Mesaj
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleFollow(profile.id)}
                    className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                  >
                    Tekrar Takip Et
                  </Button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Takip tarihi: {profile.followedDate}
              </p>
            </div>
          </div>
        ))}
      </div>

      {profiles.filter(p => p.isFollowing).length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Henüz Kimseyi Takip Etmiyorsunuz
          </h3>
          <p className="text-gray-600 mb-6">
            İlginizi çeken kulüp ve eğitmenleri takip ederek güncellemelerini kaçırmayın
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
