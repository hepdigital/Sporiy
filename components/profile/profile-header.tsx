'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Flag
} from 'lucide-react';

type Profile = {
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  coverImage: string;
  avatar: string;
  isPremium?: boolean;
  type: 'trainer' | 'club';
};

export function ProfileHeader({ profile }: { profile: Profile }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="relative bg-white border-b border-gray-200">
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-900">
        <ImageWithFallback
          src={profile.coverImage}
          alt={profile.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Premium Badge */}
        {profile.isPremium && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-[#d6ff00] text-black rounded-full text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Premium Üye
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative pb-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="relative -mt-16 sm:-mt-20">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <ImageWithFallback
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name & Info */}
            <div className="flex-1 mt-4 sm:mt-0 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {profile.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{profile.category}</span>
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

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`${
                      isFollowing
                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        : 'bg-[#d6ff00] text-black hover:bg-[#c5ee00]'
                    } font-semibold`}
                  >
                    {isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="gap-2"
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${
                        isFavorited ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                    <span className="hidden sm:inline">Favorilere Ekle</span>
                  </Button>

                  <Button size="lg" variant="outline" className="gap-2">
                    <Share2 className="h-5 w-5" />
                    <span className="hidden sm:inline">Paylaş</span>
                  </Button>

                  <Button size="lg" variant="ghost">
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Mesaj Gönder
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              Telefon
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              E-posta
            </Button>
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
