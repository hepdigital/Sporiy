'use client';

import { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Trash2, Folder, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SavedPost = {
  id: number;
  author: string;
  content: string;
  image: string;
  savedDate: string;
  collection: string;
  likes: number;
  comments: number;
};

export function SavedPosts() {
  const [activeCollection, setActiveCollection] = useState('all');
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([
    {
      id: 1,
      author: 'Anka Yıldız SK',
      content: 'Yüzme teknikleri hakkında harika ipuçları',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
      savedDate: '2 gün önce',
      collection: 'Yüzme',
      likes: 124,
      comments: 18,
    },
    {
      id: 2,
      author: 'Umut Diner',
      content: 'Kano antrenman programı',
      image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
      savedDate: '5 gün önce',
      collection: 'Antrenman',
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      author: 'Deniz Yıldızı Akademi',
      content: 'Yelken kursu kayıtları başladı',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      savedDate: '1 hafta önce',
      collection: 'Kurslar',
      likes: 156,
      comments: 24,
    },
  ]);

  const collections = [
    { id: 'all', name: 'Tümü', count: savedPosts.length },
    { id: 'yuzme', name: 'Yüzme', count: savedPosts.filter(p => p.collection === 'Yüzme').length },
    { id: 'antrenman', name: 'Antrenman', count: savedPosts.filter(p => p.collection === 'Antrenman').length },
    { id: 'kurslar', name: 'Kurslar', count: savedPosts.filter(p => p.collection === 'Kurslar').length },
  ];

  const handleRemove = (postId: number) => {
    if (confirm('Bu gönderiyi kayıtlılardan kaldırmak istediğinize emin misiniz?')) {
      setSavedPosts(savedPosts.filter(post => post.id !== postId));
    }
  };

  const filteredPosts = activeCollection === 'all'
    ? savedPosts
    : savedPosts.filter(post => post.collection.toLowerCase() === activeCollection);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kaydedilenler</h1>
          <p className="text-gray-600 mt-1">{savedPosts.length} kayıtlı gönderi</p>
        </div>
        <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Koleksiyon
        </Button>
      </div>

      {/* Collections */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCollection(collection.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCollection === collection.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Folder className="h-4 w-4" />
              <span className="font-medium">{collection.name}</span>
              <span className="text-sm opacity-75">({collection.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <button
                  onClick={() => handleRemove(post.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-5 w-5 text-red-600" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded">
                    {post.collection}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="font-semibold text-gray-900 mb-2">{post.author}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.content}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span className="text-xs">{post.savedDate}</span>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  Gönderiyi Görüntüle
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {activeCollection === 'all' ? 'Henüz Kayıtlı Gönderi Yok' : 'Bu Koleksiyonda Gönderi Yok'}
          </h3>
          <p className="text-gray-600 mb-6">
            Beğendiğiniz gönderileri kaydedin ve daha sonra kolayca erişin
          </p>
          <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
            Keşfet
          </Button>
        </div>
      )}
    </div>
  );
}
