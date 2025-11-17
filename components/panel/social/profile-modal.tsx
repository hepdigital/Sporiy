'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { User, MapPin, Calendar, Users, Heart, MessageCircle, UserMinus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Profile = {
  id: number;
  name: string;
  username: string;
  bio: string;
  location: string;
  joinDate: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
};

export function ProfileModal({ isOpen, onClose, profile: initialProfile }: Props) {
  const [profile, setProfile] = useState(initialProfile);

  const handleFollow = () => {
    setProfile({
      ...profile,
      isFollowing: !profile.isFollowing,
      followers: profile.isFollowing ? profile.followers - 1 : profile.followers + 1,
    });
  };

  // Mock posts
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400', likes: 45, comments: 12 },
    { id: 2, image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400', likes: 67, comments: 8 },
    { id: 3, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', likes: 89, comments: 15 },
    { id: 4, image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400', likes: 34, comments: 6 },
    { id: 5, image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400', likes: 56, comments: 9 },
    { id: 6, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400', likes: 78, comments: 11 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="max-h-[80vh] overflow-y-auto">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-12 w-12 text-gray-400" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
              <p className="text-gray-600 mb-4">@{profile.username}</p>

              <div className="flex items-center gap-6 mb-4">
                <button className="text-center hover:opacity-70 transition-opacity">
                  <p className="text-xl font-bold text-gray-900">{profile.posts}</p>
                  <p className="text-sm text-gray-600">Gönderi</p>
                </button>
                <button className="text-center hover:opacity-70 transition-opacity">
                  <p className="text-xl font-bold text-gray-900">{profile.followers}</p>
                  <p className="text-sm text-gray-600">Takipçi</p>
                </button>
                <button className="text-center hover:opacity-70 transition-opacity">
                  <p className="text-xl font-bold text-gray-900">{profile.following}</p>
                  <p className="text-sm text-gray-600">Takip</p>
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  onClick={handleFollow}
                  className={profile.isFollowing 
                    ? 'flex-1 bg-gray-200 text-gray-900 hover:bg-gray-300'
                    : 'flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00]'
                  }
                >
                  {profile.isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-2" />
                      Takipten Çık
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Takip Et
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mesaj Gönder
                </Button>
              </div>

              <p className="text-gray-700 mb-3">{profile.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {profile.joinDate} tarihinde katıldı
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Gönderiler</h3>
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <button
                key={post.id}
                className="relative aspect-square bg-gray-200 group overflow-hidden"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 fill-white" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-5 w-5 fill-white" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
