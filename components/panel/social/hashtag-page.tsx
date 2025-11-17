'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Hash, 
  TrendingUp, 
  Users, 
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  User,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  tag: string;
};

type Post = {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string | null;
    type: 'club' | 'trainer' | 'user';
  };
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
};

export function HashtagPage({ tag }: Props) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Decode tag to support Turkish characters
  const decodedTag = decodeURIComponent(tag);

  // Mock data
  const stats = {
    posts: 1234,
    followers: 567,
    trend: '+12%',
  };

  const relatedTags = ['#yüzme', '#antrenman', '#spor', '#havuz', '#yarışma'];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Anka Yıldız Spor Kulübü',
        username: 'ankayildiz',
        avatar: null,
        type: 'club',
      },
      content: `Harika bir #${decodedTag} antrenmanı! 🏊‍♂️ Tüm sporcularımızı tebrik ediyoruz.`,
      images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800'],
      timestamp: '2 saat önce',
      likes: 45,
      comments: 12,
      shares: 3,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      author: {
        name: 'Umut Diner',
        username: 'umutdiner',
        avatar: null,
        type: 'trainer',
      },
      content: `#${decodedTag} severlere özel ipuçları 💪 Gelişiminiz için önemli detaylar!`,
      images: ['https://images.unsplash.com/photo-1544551763-46a1e5a3?w=800'],
      timestamp: '5 saat önce',
      likes: 67,
      comments: 8,
      shares: 5,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 3,
      author: {
        name: 'Elif Kaya',
        username: 'elifkaya',
        avatar: null,
        type: 'user',
      },
      content: `Bugünkü #${decodedTag} seansı mükemmeldi! Kendimi çok iyi hissediyorum 🎉`,
      images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'],
      timestamp: '1 gün önce',
      likes: 89,
      comments: 15,
      shares: 2,
      isLiked: true,
      isSaved: false,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Hashtag Info & Stats */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#d6ff00] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Hash className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">#{decodedTag}</h1>
                  <p className="text-sm text-gray-600">{stats.posts.toLocaleString()} gönderi</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full mb-6 ${isFollowing
                ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                : 'bg-[#d6ff00] text-black hover:bg-[#c5ee00]'
              }`}
            >
              {isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
            </Button>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Gönderi</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{stats.posts.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Takipçi</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{stats.followers.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Bu Hafta</span>
                </div>
                <p className="text-lg font-bold text-green-600">{stats.trend}</p>
              </div>
            </div>

            {/* Related Tags */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">İlgili Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {relatedTags.map((relatedTag) => (
                  <Link
                    key={relatedTag}
                    href={`/panel/sporcu/hashtag/${encodeURIComponent(relatedTag.slice(1))}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {relatedTag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Timeline Posts */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Son Gönderiler</h2>
          
          {/* Timeline Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <Link
                  href={`/${post.author.username}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {post.author.type === 'club' ? (
                      <Building2 className="h-5 w-5 text-gray-400" />
                    ) : (
                      <User className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {post.author.name}
                    </h4>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </Link>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {post.content.split(' ').map((word, i) => 
                    word.startsWith('#') ? (
                      <Link
                        key={i}
                        href={`/panel/sporcu/hashtag/${encodeURIComponent(word.slice(1))}`}
                        className="text-blue-600 hover:underline"
                      >
                        {word}{' '}
                      </Link>
                    ) : (
                      word + ' '
                    )
                  )}
                </p>
              </div>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className={`grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                  {post.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-200"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{post.likes} beğeni</span>
                    <span>{post.comments} yorum</span>
                    <span>{post.shares} paylaşım</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                      post.isLiked
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-red-600' : ''}`} />
                    <span className="text-sm font-medium">Beğen</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Yorum</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Paylaş</span>
                  </button>
                  <button
                    onClick={() => handleSave(post.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      post.isSaved
                        ? 'text-[#d6ff00] bg-[#d6ff00]/10'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${post.isSaved ? 'fill-[#d6ff00]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center py-4">
            <Button variant="outline">Daha Fazla Göster</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
