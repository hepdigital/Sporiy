'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { MessageModal } from './message-modal';
import { ReportModal } from './report-modal';
import { ShareModal } from '@/components/panel/social/share-modal';
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
  Flag,
  Users
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
  phone?: string;
  email?: string;
  website?: string;
};

export function ProfileHeader({ profile }: { profile: Profile }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  return (
    <div className="relative bg-white border-b border-gray-200">
      {/* Profile Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
            <div className="relative">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-gray-200 shadow-lg bg-white">
                <ImageWithFallback
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                {/* Premium Badge */}
                {profile.isPremium && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#d6ff00] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <CheckCircle2 className="h-5 w-5 text-black" />
                  </div>
                )}
              </div>
            </div>

            {/* Name & Info */}
            <div className="flex-1 mt-6 sm:mt-0">
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

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setShareModal(true)}
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="hidden sm:inline">Paylaş</span>
                  </Button>

                  <Button 
                    size="lg" 
                    variant="ghost"
                    onClick={() => setReportModal(true)}
                    title="Profili Bildir"
                  >
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-black hover:text-white hover:border-black transition-colors"
              onClick={() => setMessageModal(true)}
            >
              <MessageCircle className="h-4 w-4" />
              Mesaj Gönder
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-black hover:text-white hover:border-black transition-colors"
              onClick={() => window.open(`tel:${profile.phone}`)}
            >
              <Phone className="h-4 w-4" />
              Telefon
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-black hover:text-white hover:border-black transition-colors"
              onClick={() => window.open(`mailto:${profile.email}`)}
            >
              <Mail className="h-4 w-4" />
              E-posta
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-black hover:text-white hover:border-black transition-colors"
              onClick={() => window.open(`https://${profile.website}`, '_blank')}
            >
              <Globe className="h-4 w-4" />
              Website
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MessageModal
        isOpen={messageModal}
        onClose={() => setMessageModal(false)}
        recipientName={profile.name}
      />

      <ReportModal
        isOpen={reportModal}
        onClose={() => setReportModal(false)}
        profileName={profile.name}
      />

      <ShareModal
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
        postId={0}
      />
    </div>
  );
}
