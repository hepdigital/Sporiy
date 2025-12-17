'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Star, Calendar, Clock, Users, X, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';
import dynamic from 'next/dynamic';

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import { MapWrapper } from '@/components/map-wrapper';
import '@/lib/leaflet-config';
import { mockEvents } from '@/lib/events-data';
import { EventCard } from '@/components/events/event-card';

type Props = {
  location: string;
};

const categories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Kürek', 'Sutopu'];
const districts = ['Tüm İlçeler', 'Adapazarı', 'Serdivan', 'Erenler', 'Arifiye'];
const sortOptions = [
  { value: 'relevance', label: 'En İlgili' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'reviews', label: 'En Çok Değerlendirme' },
  { value: 'newest', label: 'Yeni Eklenenler' },
];

export function EventSearchResults({ location }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDistrict, setSelectedDistrict] = useState('Tüm İlçeler');
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const markerRefs = useState(new Map<number, any>())[0];

  const totalResults = mockEvents.length;

  // Open popup on hover
  useEffect(() => {
    if (hoveredEventId && markerRefs.has(hoveredEventId)) {
      const marker = markerRefs.get(hoveredEventId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [hoveredEventId, markerRefs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Link href="/arama" className="hover:text-gray-900">Arama</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Etkinlikler</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            &quot;{location}&quot; araması için {totalResults} etkinlik bulundu!
          </h1>
          <p className="text-gray-600">
            İlginizi çeken etkinliklere katılın
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Desktop Filters */}
          <div className="hidden lg:flex flex-wrap items-center gap-3">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Spor Dalı:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#d6ff00] text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* District Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">İlçe:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Sıralama:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <div className="grid grid-cols-3 gap-2">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* District */}
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Split View: List + Map */}
      <div className="lg:flex lg:overflow-hidden lg:h-[calc(100vh-16rem)]">
        {/* List View - Left Side (65%) */}
        <div className="w-full lg:w-[65%] lg:border-r border-gray-200 lg:overflow-y-auto">
          {/* Results Header */}
          <div className="p-4 bg-white border-b border-gray-200 lg:sticky lg:top-0 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {totalResults} Sonuç
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowMapModal(true)}
                className="lg:hidden border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white font-semibold"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Haritada Gör
              </Button>
            </div>
          </div>

          {/* Mobile & Desktop: Grid View */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 lg:pb-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
                className={`transition-all ${
                  hoveredEventId === event.id ? 'ring-2 ring-[#d6ff00]' : ''
                }`}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Map View - Right Side (Desktop - 35%) */}
        <div className="hidden lg:block lg:w-[35%] relative z-0">
          <MapWrapper
            center={[39.9334, 32.8597]}
            zoom={11}
            scrollWheelZoom={true}
          >
            {mockEvents.map((event) => (
              <Marker
                key={event.id}
                position={[event.coordinates.lat, event.coordinates.lng]}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.set(event.id, ref);
                  } else {
                    markerRefs.delete(event.id);
                  }
                }}
                eventHandlers={{
                  mouseover: () => setHoveredEventId(event.id),
                  mouseout: () => setHoveredEventId(null),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[280px]">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{event.category}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.organizerName}
                    </p>

                    <div className="space-y-1 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.registered} / {event.capacity}</span>
                      </div>
                    </div>

                    <div className="mb-3 text-center">
                      {event.type === 'free' ? (
                        <span className="text-lg font-bold text-green-600">Ücretsiz</span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {event.price.toLocaleString('tr-TR')} ₺
                        </span>
                      )}
                    </div>

                    <Link href={`/etkinlikler/${event.slug}`}>
                      <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                        Detayları Gör
                      </Button>
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapWrapper>
        </div>
      </div>

      {/* Map Modal - Mobile */}
      {showMapModal && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMapModal(false)} />
          <div className="absolute inset-0 bg-white">
            <div className="h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-[210]">
                <h3 className="text-lg font-bold text-gray-900">Harita Görünümü</h3>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Map */}
              <div className="flex-1 relative z-[201]">
                <MapWrapper
                  center={[39.9334, 32.8597]}
                  zoom={11}
                  scrollWheelZoom={true}
                >
                  {mockEvents.map((event) => (
                    <Marker
                      key={event.id}
                      position={[event.coordinates.lat, event.coordinates.lng]}
                    >
                      <Popup>
                        <div className="p-2 min-w-[280px]">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{event.category}</p>
                          <p className="text-sm text-gray-600 mb-2">
                            {event.organizerName}
                          </p>

                          <div className="space-y-1 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.startTime} - {event.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{event.registered} / {event.capacity}</span>
                            </div>
                          </div>

                          <div className="mb-3 text-center">
                            {event.type === 'free' ? (
                              <span className="text-lg font-bold text-green-600">Ücretsiz</span>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                {event.price.toLocaleString('tr-TR')} ₺
                              </span>
                            )}
                          </div>

                          <Link href={`/etkinlikler/${event.slug}`}>
                            <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                              Detayları Gör
                            </Button>
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapWrapper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
