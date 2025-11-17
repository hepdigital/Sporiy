'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  Smile,
  Send,
  TrendingUp,
  Calendar,
  Users,
  User,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentModal } from '@/components/panel/social/comment-modal';
import { ShareModal } from '@/components/panel/social/share-modal';
import { EmojiPicker } from '@/components/panel/social/emoji-picker';
import { MediaUploadModal } from '@/components/panel/social/media-upload-modal';
import { ProfileModal } from '@/components/panel/social/profile-modal';
import { FollowersModal } from '@/components/panel/social/followers-modal';
import { ImageGalleryModal } from '@/components/panel/social/image-gallery-modal';

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
  video?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
};

export function SporcuDashboard() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Anka Yıldız Spor Kulübü',
        username: 'ankayildiz',
        avatar: null,
        type: 'club',
      },
      content: 'Bu hafta sonu düzenlediğimiz yüzme yarışmasından kareler! 🏊‍♂️ Tüm sporcularımızı tebrik ediyoruz. #yüzme #sporiy #yarışma',
      images: [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
        'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800',
      ],
      timestamp: '2 saat önce',
      likes: 124,
      comments: 18,
      shares: 5,
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
      content: 'Bugün öğrencilerimle harika bir kano antrenmanı yaptık! Gelişimleri görmek çok mutlu edici 🛶💪 #kano #antrenman #sporiy',
      images: ['https://images.unsplash.com/photo-1544551763-46a1e5a3?w=800'],
      timestamp: '5 saat önce',
      likes: 89,
      comments: 12,
      shares: 3,
      isLiked: true,
      isSaved: false,
    },
    {
      id: 3,
      author: {
        name: 'Deniz Yıldızı Akademi',
        username: 'denizyildizi',
        avatar: null,
        type: 'club',
      },
      content: 'Yeni yelken kursumuz başlıyor! 🎉 Başlangıç seviyesinden ileri seviyeye kadar tüm seviyelerde eğitim veriyoruz. Kayıtlar başladı! ⛵',
      timestamp: '1 gün önce',
      likes: 156,
      comments: 24,
      shares: 12,
      isLiked: false,
      isSaved: true,
    },
  ]);

  const [newPostText, setNewPostText] = useState('');
  
  // Modal states
  const [commentModal, setCommentModal] = useState<{ isOpen: boolean; postId: number | null }>({ isOpen: false, postId: null });
  const [shareModal, setShareModal] = useState<{ isOpen: boolean; postId: number | null }>({ isOpen: false, postId: null });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mediaUploadModal, setMediaUploadModal] = useState<{ isOpen: boolean; type: 'image' | 'video' }>({ isOpen: false, type: 'image' });
  const [profileModal, setProfileModal] = useState<{ isOpen: boolean; profileId: number | null }>({ isOpen: false, profileId: null });
  const [followersModal, setFollowersModal] = useState<{ isOpen: boolean; type: 'followers' | 'following' }>({ isOpen: false, type: 'followers' });
  const [imageGallery, setImageGallery] = useState<{ isOpen: boolean; images: string[]; initialIndex: number }>({ isOpen: false, images: [], initialIndex: 0 });
  
  // Inline comments state
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});
  const [postComments, setPostComments] = useState<{ [key: number]: any[] }>({
    1: [
      { id: 1, author: 'Mehmet Yılmaz', text: 'Harika bir etkinlikti! 👏', time: '1 saat önce', likes: 5, isLiked: false, replies: [] },
      { id: 2, author: 'Ayşe Demir', text: 'Gelecek sene ben de katılmak istiyorum', time: '30 dk önce', likes: 3, isLiked: false, replies: [
        { id: 21, author: 'Anka Yıldız SK', text: 'Kesinlikle! Sizi bekliyoruz 😊', time: '20 dk önce', likes: 2, isLiked: false }
      ] },
      { id: 3, author: 'Can Öztürk', text: 'Muhteşem organizasyon', time: '45 dk önce', likes: 7, isLiked: true, replies: [] },
    ],
    2: [
      { id: 4, author: 'Zeynep Kaya', text: 'Çok güzel görünüyor! 🛶', time: '2 saat önce', likes: 4, isLiked: false, replies: [] },
    ],
  });
  const [replyingTo, setReplyingTo] = useState<{ postId: number; commentId: number } | null>(null);

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

  const handleEmojiSelect = (emoji: string) => {
    setNewPostText(prev => prev + emoji);
  };

  const handleMediaUpload = (files: File[]) => {
    console.log('Uploaded files:', files);
    // TODO: Handle file upload
  };

  const quickStats = [
    { label: 'Takipçi', value: '234', icon: Users },
    { label: 'Takip', value: '89', icon: TrendingUp },
    { label: 'Gönderi', value: '45', icon: ImageIcon },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Yüzme Dersi',
      organizer: 'Anka Yıldız SK',
      date: '25 Kas',
      time: '14:00',
    },
    {
      id: 2,
      title: 'Kano Eğitimi',
      organizer: 'Umut Diner',
      date: '27 Kas',
      time: '10:00',
    },
  ];

  const suggestedProfiles = [
    {
      id: 1,
      name: 'Elif Kaya',
      username: 'elifkaya',
      category: 'Sualtı Sporları',
      followers: '1.2K',
      avatar: null,
    },
    {
      id: 2,
      name: 'Mavi Dalga SK',
      username: 'mavidalga',
      category: 'Sutopu',
      followers: '3.4K',
      avatar: null,
    },
  ];

  // Mock data for modals
  const mockComments = [
    { id: 1, author: 'Mehmet Yılmaz', text: 'Harika bir etkinlikti! 👏', time: '1 saat önce', likes: 5, isLiked: false },
    { id: 2, author: 'Ayşe Demir', text: 'Gelecek sene ben de katılmak istiyorum', time: '30 dk önce', likes: 3, isLiked: false },
  ];

  const mockFollowers = [
    { id: 1, name: 'Mehmet Yılmaz', username: 'mehmet_y', bio: 'Yüzme tutkunu', isFollowing: true },
    { id: 2, name: 'Ayşe Demir', username: 'ayse_d', bio: 'Kano sporcusu', isFollowing: false },
    { id: 3, name: 'Can Öztürk', username: 'can_oz', bio: 'Triatlon antrenörü', isFollowing: true },
  ];

  const mockProfile = {
    id: 1,
    name: 'Anka Yıldız Spor Kulübü',
    username: 'ankayildiz',
    bio: 'Türkiye\'nin en köklü yüzme kulüplerinden biri. 25 yıllık deneyim.',
    location: 'Ankara, Türkiye',
    joinDate: 'Ocak 2020',
    followers: 3456,
    following: 234,
    posts: 567,
    isFollowing: false,
  };

  return (
    <>
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - User Info & Stats */}
          <div className="lg:col-span-3 space-y-4">
            {/* User Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center">
                <button
                  onClick={() => setProfileModal({ isOpen: true, profileId: 0 })}
                  className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <User className="h-10 w-10 text-gray-400" />
                </button>
                <h3 className="font-bold text-gray-900 mb-1">Ahmet Yılmaz</h3>
                <p className="text-sm text-gray-600 mb-4">@ahmetyilmaz</p>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  {quickStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <button
                        key={stat.label}
                        onClick={() => {
                          if (index === 0) setFollowersModal({ isOpen: true, type: 'followers' });
                          if (index === 1) setFollowersModal({ isOpen: true, type: 'following' });
                        }}
                        className="hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      >
                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Yaklaşan Etkinlikler
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm text-gray-900 mb-1">{event.title}</p>
                    <p className="text-xs text-gray-600 mb-2">{event.organizer}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/panel/sporcu/rezervasyonlar">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Tümünü Gör
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Create Post */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Bugün ne yaptın? Paylaş..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2 relative">
                      <button
                        onClick={() => setMediaUploadModal({ isOpen: true, type: 'image' })}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Fotoğraf ekle"
                      >
                        <ImageIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => setMediaUploadModal({ isOpen: true, type: 'video' })}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Video ekle"
                      >
                        <Video className="h-5 w-5 text-gray-600" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Emoji ekle"
                        >
                          <Smile className="h-5 w-5 text-gray-600" />
                        </button>
                        <EmojiPicker
                          isOpen={showEmojiPicker}
                          onClose={() => setShowEmojiPicker(false)}
                          onSelect={handleEmojiSelect}
                        />
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!newPostText.trim()}
                      className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Paylaş
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
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
                        onClick={() => setImageGallery({ isOpen: true, images: post.images || [], initialIndex: index })}
                        className="aspect-square bg-gray-200 relative group cursor-pointer hover:opacity-90 transition-opacity"
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {post.images && post.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            {index + 1}/{post.images.length}
                          </div>
                        )}
                      </div>
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

                  <div className="flex items-center gap-2 mb-3">
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
                    <button
                      onClick={() => setExpandedComments({ ...expandedComments, [post.id]: !expandedComments[post.id] })}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Yorum Yap</span>
                    </button>
                    <button
                      onClick={() => setShareModal({ isOpen: true, postId: post.id })}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
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

                  {/* Yorumlar Butonu */}
                  {postComments[post.id] && postComments[post.id].length > 0 && (
                    <button
                      onClick={() => setExpandedComments({ ...expandedComments, [post.id]: !expandedComments[post.id] })}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium mb-2"
                    >
                      Yorumlar ({postComments[post.id].length})
                    </button>
                  )}

                  {/* Inline Comments Section */}
                  {expandedComments[post.id] && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                      {/* Display Comments */}
                      {postComments[post.id]?.slice(0, 3).map((comment: any) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-2">
                                <p className="font-semibold text-xs text-gray-900">{comment.author}</p>
                                <p className="text-sm text-gray-700">{comment.text}</p>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>{comment.time}</span>
                                <button
                                  onClick={() => {
                                    const updatedComments = { ...postComments };
                                    updatedComments[post.id] = updatedComments[post.id].map((c: any) =>
                                      c.id === comment.id
                                        ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
                                        : c
                                    );
                                    setPostComments(updatedComments);
                                  }}
                                  className={`flex items-center gap-1 ${comment.isLiked ? 'text-red-600 font-semibold' : ''}`}
                                >
                                  <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-red-600' : ''}`} />
                                  {comment.likes > 0 && comment.likes}
                                </button>
                                <button
                                  onClick={() => setReplyingTo({ postId: post.id, commentId: comment.id })}
                                  className="hover:underline"
                                >
                                  Yanıtla
                                </button>
                              </div>

                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="ml-4 mt-2 space-y-2">
                                  {comment.replies.map((reply: any) => (
                                    <div key={reply.id} className="flex gap-2">
                                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="h-3 w-3 text-gray-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="bg-gray-50 rounded-lg p-2">
                                          <p className="font-semibold text-xs text-gray-900">{reply.author}</p>
                                          <p className="text-xs text-gray-700">{reply.text}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                          <span>{reply.time}</span>
                                          <button className="flex items-center gap-1">
                                            <Heart className="h-3 w-3" />
                                            {reply.likes > 0 && reply.likes}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Reply Input */}
                              {replyingTo?.postId === post.id && replyingTo?.commentId === comment.id && (
                                <div className="ml-4 mt-2 flex gap-2">
                                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-3 w-3 text-gray-400" />
                                  </div>
                                  <div className="flex-1 flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Yanıt yaz..."
                                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          setReplyingTo(null);
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={() => setReplyingTo(null)}
                                      className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                      İptal
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Load More Comments */}
                      {postComments[post.id] && postComments[post.id].length > 3 && (
                        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                          Diğer yorumları yükle ({postComments[post.id].length - 3} yorum daha)
                        </button>
                      )}

                      {/* Add Comment Input */}
                      <div className="flex gap-2 pt-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={commentTexts[post.id] || ''}
                            onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                            placeholder="Yorum yaz..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && commentTexts[post.id]?.trim()) {
                                const newComment = {
                                  id: Date.now(),
                                  author: 'Ahmet Yılmaz',
                                  text: commentTexts[post.id],
                                  time: 'Şimdi',
                                  likes: 0,
                                  isLiked: false,
                                  replies: [],
                                };
                                setPostComments({
                                  ...postComments,
                                  [post.id]: [...(postComments[post.id] || []), newComment],
                                });
                                setCommentTexts({ ...commentTexts, [post.id]: '' });
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            disabled={!commentTexts[post.id]?.trim()}
                            onClick={() => {
                              if (commentTexts[post.id]?.trim()) {
                                const newComment = {
                                  id: Date.now(),
                                  author: 'Ahmet Yılmaz',
                                  text: commentTexts[post.id],
                                  time: 'Şimdi',
                                  likes: 0,
                                  isLiked: false,
                                  replies: [],
                                };
                                setPostComments({
                                  ...postComments,
                                  [post.id]: [...(postComments[post.id] || []), newComment],
                                });
                                setCommentTexts({ ...commentTexts, [post.id]: '' });
                              }
                            }}
                            className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] rounded-full px-4"
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Load More */}
            <div className="text-center py-4">
              <Button variant="outline">Daha Fazla Göster</Button>
            </div>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="lg:col-span-3 space-y-4">
            {/* Suggested Profiles */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Önerilen Profiller</h3>
              <div className="space-y-4">
                {suggestedProfiles.map((profile) => (
                  <div key={profile.id} className="flex items-center gap-3">
                    <Link
                      href={`/${profile.username}`}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      <User className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link href={`/${profile.username}`} className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate hover:underline">
                        {profile.name}
                      </h4>
                      <p className="text-xs text-gray-600">{profile.category}</p>
                      <p className="text-xs text-gray-500">{profile.followers} takipçi</p>
                    </Link>
                    <Button size="sm" variant="outline" className="flex-shrink-0">
                      Takip Et
                    </Button>
                  </div>
                ))}
              </div>
              <Link href="/kesfet">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Daha Fazla
                </Button>
              </Link>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trendler
              </h3>
              <div className="space-y-3">
                {['#yüzme', '#kano', '#yelken', '#sutopu', '#triatlon'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/panel/sporcu/hashtag/${encodeURIComponent(tag.slice(1))}`}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <p className="font-medium text-sm text-gray-900">{tag}</p>
                    <p className="text-xs text-gray-500">1.2K gönderi</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {commentModal.postId !== null && (
        <CommentModal
          isOpen={commentModal.isOpen}
          onClose={() => setCommentModal({ isOpen: false, postId: null })}
          postId={commentModal.postId}
          comments={mockComments}
        />
      )}

      {shareModal.postId !== null && (
        <ShareModal
          isOpen={shareModal.isOpen}
          onClose={() => setShareModal({ isOpen: false, postId: null })}
          postId={shareModal.postId}
        />
      )}

      <MediaUploadModal
        isOpen={mediaUploadModal.isOpen}
        onClose={() => setMediaUploadModal({ isOpen: false, type: 'image' })}
        onUpload={handleMediaUpload}
        type={mediaUploadModal.type}
      />

      <ProfileModal
        isOpen={profileModal.isOpen}
        onClose={() => setProfileModal({ isOpen: false, profileId: null })}
        profile={mockProfile}
      />

      <FollowersModal
        isOpen={followersModal.isOpen}
        onClose={() => setFollowersModal({ isOpen: false, type: 'followers' })}
        type={followersModal.type}
        users={mockFollowers}
      />

      <ImageGalleryModal
        isOpen={imageGallery.isOpen}
        onClose={() => setImageGallery({ isOpen: false, images: [], initialIndex: 0 })}
        images={imageGallery.images}
        initialIndex={imageGallery.initialIndex}
      />
    </>
  );
}
