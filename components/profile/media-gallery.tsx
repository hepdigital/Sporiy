'use client';

import { useState } from 'react';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { Play, X } from 'lucide-react';

const mockMedia = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=400&q=80',
  },
];

export function MediaGallery({ profileId }: { profileId: number }) {
  const [selectedMedia, setSelectedMedia] = useState<typeof mockMedia[0] | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Medya Galerisi</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {mockMedia.map((media) => (
            <button
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:ring-2 hover:ring-[#d6ff00] transition-all"
            >
              <ImageWithFallback
                src={media.thumbnail}
                alt={`Media ${media.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {media.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-black ml-1" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'image' ? (
              <ImageWithFallback
                src={selectedMedia.url}
                alt="Selected media"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="aspect-video">
                <iframe
                  src={selectedMedia.url}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
