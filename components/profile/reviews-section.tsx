'use client';

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';

const mockReviews = [
  {
    id: 1,
    author: 'Ayşe Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '2 hafta önce',
    comment: 'Umut hoca ile çalışmak harika bir deneyimdi. Teknik bilgisi ve sabırlı yaklaşımı sayesinde kısa sürede çok ilerleme kaydettim. Kesinlikle tavsiye ederim!',
    helpful: 12,
    course: 'Başlangıç Seviye Kano Kursu',
  },
  {
    id: 2,
    author: 'Mehmet Kaya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '1 ay önce',
    comment: 'Profesyonel yaklaşımı ve detaylı anlatımı ile harika bir eğitmen. Sprint tekniklerinde çok gelişme gösterdim. Teşekkürler!',
    helpful: 8,
    course: 'İleri Seviye Sprint Kano',
  },
  {
    id: 3,
    author: 'Zeynep Demir',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    date: '2 ay önce',
    comment: 'Çok iyi bir eğitim aldım. Sadece ders saatleri biraz daha esnek olabilirdi. Genel olarak çok memnunum.',
    helpful: 5,
    course: 'Özel Ders Programı',
  },
];

export function ReviewsSection({ profile }: { profile: any }) {
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([]);

  const toggleHelpful = (reviewId: number) => {
    setHelpfulReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Değerlendirmeler</h2>
        <Button variant="outline" size="sm">
          Değerlendirme Yaz
        </Button>
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{profile.rating}</div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(profile.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">{profile.reviews} değerlendirme</div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const percentage = stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 3 : 0;
            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-gray-600">{stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <ImageWithFallback
                  src={review.avatar}
                  alt={review.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{review.date}</span>
                      <span>•</span>
                      <span className="text-gray-700">{review.course}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    helpfulReviews.includes(review.id)
                      ? 'text-[#d6ff00]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>
                    Faydalı ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline">Daha Fazla Yükle</Button>
      </div>
    </div>
  );
}
