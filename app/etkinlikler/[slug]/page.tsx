'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Heart,
  Share2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Award,
  Cloud,
  ChevronLeft,
  MessageCircle,
  Flag
} from 'lucide-react';
import { getEventBySlug, eventLevelLabels, mockEvents } from '@/lib/events-data';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { Button } from '@/components/ui/button';
import { EventRegistrationModal } from '@/components/events/event-registration-modal';
import { EventCard } from '@/components/events/event-card';
import { useAuth } from '@/lib/auth';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const event = getEventBySlug(resolvedParams.slug);
  const { isAuthenticated } = useAuth();
  
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!event) {
    notFound();
  }

  const spotsLeft = event.capacity - event.registered;
  const fillPercentage = (event.registered / event.capacity) * 100;
  const isAlmostFull = fillPercentage >= 80;
  const isFull = spotsLeft === 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      weekday: 'long'
    });
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  // Similar events
  const similarEvents = mockEvents
    .filter(e => e.id !== event.id && (e.category === event.category || e.location === event.location))
    .slice(0, 3);

  const allImages = [event.coverImage, ...event.gallery];

  return (
    <div className="min-h-screen bg-white -mx-4 sm:-mx-6 lg:-mx-8 -my-6">
      {/* Back Button */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/etkinlikler"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Etkinliklere Dön</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={allImages[selectedImage]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {event.type === 'free' && (
                    <span className="px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-semibold">
                      Ücretsiz
                    </span>
                  )}
                  {event.certificate && (
                    <span className="px-3 py-1.5 bg-[#d6ff00] text-black rounded-full text-sm font-semibold flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      Sertifikalı
                    </span>
                  )}
                  {isAlmostFull && !isFull && (
                    <span className="px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-semibold">
                      Son Yerler
                    </span>
                  )}
                  {isFull && (
                    <span className="px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-semibold">
                      Dolu
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                      }`}
                    />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 bg-gray-100 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-[#d6ff00]' : ''
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${event.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {eventLevelLabels[event.level]}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{event.title}</h1>
                  <p className="text-lg text-gray-600">{event.description}</p>
                </div>
              </div>

              {/* Organizer */}
              <Link
                href={`/${event.organizerSlug}`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={event.organizerAvatar}
                    alt={event.organizerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Organizatör</p>
                  <p className="font-semibold text-gray-900">{event.organizerName}</p>
                </div>
                {event.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{event.rating}</span>
                    <span className="text-sm text-gray-500">({event.reviews})</span>
                  </div>
                )}
              </Link>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Etkinlik Hakkında</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.longDescription}
              </p>
            </div>

            {/* Features */}
            {event.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Özellikler</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {event.includes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dahil Olanlar</h2>
                <ul className="space-y-3">
                  {event.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {event.requirements.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gereksinimler</h2>
                <ul className="space-y-3">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Konum</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{event.address}</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="h-64 bg-gray-100 rounded-xl overflow-hidden">
                  <MapContainer
                    center={[event.coordinates.lat, event.coordinates.lng]}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[event.coordinates.lat, event.coordinates.lng]} />
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {event.reviews > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Değerlendirmeler</h2>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-gray-900">{event.rating}</span>
                    <span className="text-gray-600">({event.reviews} değerlendirme)</span>
                  </div>
                </div>

                {event.reviewsList && event.reviewsList.length > 0 ? (
                  <div className="space-y-6">
                    {event.reviewsList.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </p>
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
                            <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                              Yararlı ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    Henüz değerlendirme yapılmamış.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 space-y-6">
                {/* Price */}
                <div className="text-center pb-6 border-b border-gray-200">
                  {event.type === 'free' ? (
                    <div className="text-3xl font-bold text-green-600">Ücretsiz</div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {event.price.toLocaleString('tr-TR')} ₺
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Kişi başı</div>
                    </div>
                  )}
                </div>

                {/* Event Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Tarih</p>
                      <p className="font-medium text-gray-900">
                        {event.startDate === event.endDate
                          ? formatDate(event.startDate)
                          : `${formatDateShort(event.startDate)} - ${formatDateShort(event.endDate)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Saat</p>
                      <p className="font-medium text-gray-900">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Katılımcı</p>
                      <p className="font-medium text-gray-900">
                        {event.registered} / {event.capacity}
                      </p>
                      <div className="mt-2">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              isFull ? 'bg-red-500' : isAlmostFull ? 'bg-orange-500' : 'bg-[#d6ff00]'
                            }`}
                            style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                          />
                        </div>
                        <p className={`text-xs mt-1 ${spotsLeft <= 5 && spotsLeft > 0 ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
                          {spotsLeft > 0 ? `${spotsLeft} yer kaldı` : 'Dolu'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {event.weather && (
                    <div className="flex items-start gap-3">
                      <Cloud className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Hava Durumu</p>
                        <p className="font-medium text-gray-900">Güneşli, 24°C</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <Button
                    onClick={() => setShowRegistrationModal(true)}
                    disabled={isFull || !isAuthenticated}
                    className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] h-12 text-lg font-semibold"
                  >
                    {isFull ? 'Etkinlik Dolu' : 'Kayıt Ol'}
                  </Button>
                  
                  {!isAuthenticated && !isFull && (
                    <p className="text-xs text-center text-red-600">
                      Kayıt olmak için giriş yapmalısınız
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Soru Sor
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Flag className="h-4 w-4" />
                      Bildir
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benzer Etkinlikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map((similarEvent) => (
                <EventCard key={similarEvent.id} event={similarEvent} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <EventRegistrationModal
        event={event}
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
}
