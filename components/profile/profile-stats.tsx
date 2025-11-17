'use client';

import { useState } from 'react';
import { Users, Star, Calendar, TrendingUp, UserPlus, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FollowersModal } from '@/components/panel/social/followers-modal';

type Profile = {
  followers: number;
  following?: number;
  rating: number;
  reviews: number;
  experience: string;
};

export function ProfileStats({ profile }: { profile: Profile }) {
  const [followersModal, setFollowersModal] = useState<{ isOpen: boolean; type: 'followers' | 'following' }>({ 
    isOpen: false, 
    type: 'followers' 
  });

  // Mock followers data
  const mockFollowers = [
    { id: 1, name: 'Mehmet Yılmaz', username: 'mehmet_y', bio: 'Yüzme tutkunu', isFollowing: true },
    { id: 2, name: 'Ayşe Demir', username: 'ayse_d', bio: 'Kano sporcusu', isFollowing: false },
    { id: 3, name: 'Can Öztürk', username: 'can_oz', bio: 'Triatlon antrenörü', isFollowing: true },
  ];

  const stats = [
    {
      icon: Star,
      label: 'Ortalama Puan',
      value: profile.rating.toFixed(1),
      clickable: false,
    },
    {
      icon: Calendar,
      label: 'Deneyim',
      value: profile.experience,
      clickable: false,
    },
    {
      icon: TrendingUp,
      label: 'Değerlendirme',
      value: profile.reviews,
      clickable: false,
    },
  ];

  const handleScrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 mt-5">İstatistikler</h3>
        
        {/* Randevu Al Button */}
        <Button 
          onClick={handleScrollToCourses}
          className="w-full mb-6 bg-[#d6ff00] text-black hover:bg-[#c5ee00] gap-2 font-semibold"
          size="lg"
        >
          <CalendarCheck className="h-5 w-5" />
          Randevu Al
        </Button>

        {/* Takipçi / Takip Edilen */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setFollowersModal({ isOpen: true, type: 'followers' })}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Users className="h-5 w-5 text-gray-600" />
            <div className="text-2xl font-bold text-gray-900">{profile.followers.toLocaleString('tr-TR')}</div>
            <div className="text-xs text-gray-600">Takipçi</div>
          </button>
          <button
            onClick={() => setFollowersModal({ isOpen: true, type: 'following' })}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <UserPlus className="h-5 w-5 text-gray-600" />
            <div className="text-2xl font-bold text-gray-900">{(profile.following || 234).toLocaleString('tr-TR')}</div>
            <div className="text-xs text-gray-600">Takip</div>
          </button>
        </div>

        <div className="space-y-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Hızlı İletişim</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Genellikle 2 saat içinde yanıt verir</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>%95 yanıt oranı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      <FollowersModal
        isOpen={followersModal.isOpen}
        onClose={() => setFollowersModal({ isOpen: false, type: 'followers' })}
        type={followersModal.type}
        users={mockFollowers}
      />
    </>
  );
}
