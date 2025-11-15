import { MapPin, Star, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const profiles = [
  {
    id: 1,
    type: 'club',
    name: 'Anka Yıldız Spor Kulübü',
    slug: 'ankayildizsporkulubu',
    category: 'Yüzme',
    location: 'Ankara, Türkiye',
    rating: 4.9,
    reviews: 127,
    description: 'Türkiye\'nin en köklü yüzme kulüplerinden biri. 25 yıllık deneyim.',
    image: 'swimming club pool'
  },
  {
    id: 2,
    type: 'trainer',
    name: 'Umut Diner',
    slug: 'umutdiner',
    category: 'Kano & Kürek',
    location: 'İstanbul, Türkiye',
    rating: 5.0,
    reviews: 89,
    description: 'Uluslararası sertifikalı kano eğitmeni. Olimpik seviye antrenman.',
    image: 'kayak instructor'
  },
  {
    id: 3,
    type: 'club',
    name: 'Deniz Yıldızı Akademi',
    slug: 'denizyildiziakademi',
    category: 'Yelken',
    location: 'İzmir, Türkiye',
    rating: 4.8,
    reviews: 156,
    description: 'Ege\'nin en büyük yelken okulu. Başlangıçtan profesyonel seviyeye.',
    image: 'sailing school'
  },
  {
    id: 4,
    type: 'trainer',
    name: 'Elif Kaya',
    slug: 'elifkaya',
    category: 'Sualtı Sporları',
    location: 'Antalya, Türkiye',
    rating: 4.9,
    reviews: 73,
    description: 'PADI Master Instructor. Dalış ve apne eğitimlerinde uzman.',
    image: 'scuba instructor'
  },
];

export function FeaturedProfiles() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="mb-4 text-4xl sm:text-5xl">Öne Çıkan Profiller</h2>
            <p className="text-gray-600">
              Popüler kulüpler ve eğitmenlerle tanışın
            </p>
          </div>
          <Button variant="outline" className="hidden sm:inline-flex">
            Tümünü Gör
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <a
              key={profile.id}
              href={`/${profile.slug}`}
              className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Favorite Button */}
              <button className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-gray-700" />
              </button>

              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1${Math.random() > 0.5 ? '571902943202' : '544551763-46a1e5a3'}?auto=format&fit=crop&w=800&q=80`}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate mb-1 transition-colors font-semibold">
                      {profile.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{profile.category}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {profile.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{profile.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{profile.rating}</span>
                    <span className="text-gray-500">({profile.reviews})</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="w-full">
            Tümünü Gör
          </Button>
        </div>
      </div>
    </section>
  );
}