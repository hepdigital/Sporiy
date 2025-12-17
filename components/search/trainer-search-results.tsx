'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Star, Users, X, Award, User } from 'lucide-react';
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

type Props = {
  location: string;
};

const mockTrainers = [
  {
    id: 1,
    name: 'Umut Diner',
    slug: 'umutdiner',
    category: 'Kano & Kürek',
    city: 'Sakarya',
    district: 'Adapazarı',
    rating: 5.0,
    reviews: 89,
    followers: 1234,
    experience: '8 Yıl',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    description: 'Ben, kano kategorisinde sizi profesyonel seviyeye taşıyabilirim.',
    certifications: ['ICF Level 3', 'Olimpik Antrenör'],
    isPremium: true,
    coordinates: { lat: 40.7569, lng: 30.3781 },
  },
  {
    id: 2,
    name: 'Elif Kaya',
    slug: 'elifkaya',
    category: 'Sualtı Sporları',
    city: 'Sakarya',
    district: 'Serdivan',
    rating: 4.9,
    reviews: 156,
    followers: 2341,
    experience: '12 Yıl',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    description: 'Ben, dalış kategorisinde sizi profesyonel seviyeye taşıyabilirim.',
    certifications: ['PADI Master', 'SSI Instructor'],
    isPremium: true,
    coordinates: { lat: 40.7669, lng: 30.3881 },
  },
  {
    id: 3,
    name: 'Can Öztürk',
    slug: 'canozturk',
    category: 'Triatlon',
    city: 'Sakarya',
    district: 'Adapazarı',
    rating: 4.8,
    reviews: 203,
    followers: 3456,
    experience: '10 Yıl',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    description: 'Ben, triatlon kategorisinde sizi yarışmaya hazırlayabilirim.',
    certifications: ['ITU Coach', 'Performans Koçu'],
    isPremium: false,
    coordinates: { lat: 40.7469, lng: 30.3681 },
  },
  {
    id: 4,
    name: 'Zeynep Demir',
    slug: 'zeynepdemir',
    category: 'Yüzme',
    city: 'Sakarya',
    district: 'Erenler',
    rating: 5.0,
    reviews: 178,
    followers: 4521,
    experience: '15 Yıl',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    description: 'Ben, çocuğunuza yüzme öğretebilirim.',
    certifications: ['Yüzme Federasyonu', 'Çocuk Eğitimi'],
    isPremium: true,
    coordinates: { lat: 40.7769, lng: 30.3981 },
  },
];

const categories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Kürek', 'Sutopu', 'Sualtı Sporları', 'Triatlon'];
const districts = ['Tüm İlçeler', 'Adapazarı', 'Serdivan', 'Erenler', 'Arifiye'];
const sortOptions = [
  { value: 'relevance', label: 'En İlgili' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'experience', label: 'En Deneyimli' },
  { value: 'followers', label: 'En Popüler' },
];

export function TrainerSearchResults({ location }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDistrict, setSelectedDistrict] = useState('Tüm İlçeler');
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredTrainerId, setHoveredTrainerId] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState(location || '');
  const markerRefs = useState(new Map<number, any>())[0];

  const totalResults = mockTrainers.length;

  // Open popup on hover
  useEffect(() => {
    if (hoveredTrainerId && markerRefs.has(hoveredTrainerId)) {
      const marker = markerRefs.get(hoveredTrainerId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [hoveredTrainerId, markerRefs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Link href="/arama" className="hover:text-gray-900">Arama</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Eğitmenler</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {location 
              ? `"${location}" araması için ${totalResults} eğitmen bulundu!`
              : `Tüm Eğitmenler (${totalResults})`
            }
          </h1>
          <p className="text-gray-600">
            Profesyonel eğitmenlerle tanışın ve hedeflerinize ulaşın
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Desktop Filters */}
          <div className="hidden lg:flex flex-wrap items-center gap-3">
            {/* Location Search */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Konum:</span>
              <input
                type="text"
                placeholder="Şehir, ilçe ara..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00] w-48"
              />
              <button className="px-3 py-1.5 bg-[#d6ff00] text-black rounded-lg text-sm font-medium hover:bg-[#c5ee00] transition-colors">
                Mevcut Konumu Kullan
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Spor Dalı:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
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

          {/* Mobile: List View */}
          <div className="p-4 space-y-4 lg:hidden pb-20">
            {mockTrainers.map((trainer) => (
              <Link
                key={trainer.id}
                href={`/${trainer.slug}`}
                onMouseEnter={() => setHoveredTrainerId(trainer.id)}
                onMouseLeave={() => setHoveredTrainerId(null)}
                className={`block bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group ${
                  hoveredTrainerId === trainer.id ? 'border-[#d6ff00] shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Profile Photo */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden ring-2 ring-gray-200">
                      <ImageWithFallback
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                              {trainer.name}
                            </h3>
                            {trainer.isPremium && (
                              <span className="px-2 py-0.5 bg-[#d6ff00] text-black rounded-full text-xs font-semibold">
                                Premium
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span className="text-xs font-medium text-gray-700">
                              {trainer.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 mb-2">
                        {trainer.description}
                      </p>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {trainer.certifications.slice(0, 2).map((cert) => (
                          <span
                            key={cert}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            <Award className="h-2.5 w-2.5" />
                            {cert}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900">{trainer.rating}</span>
                            <span className="text-gray-500">({trainer.reviews})</span>
                          </div>
                          <span className="text-gray-600">{trainer.experience}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{trainer.city} / {trainer.district}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: Grid View */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 p-4">
            {mockTrainers.map((trainer) => (
              <Link
                key={trainer.id}
                href={`/${trainer.slug}`}
                onMouseEnter={() => setHoveredTrainerId(trainer.id)}
                onMouseLeave={() => setHoveredTrainerId(null)}
                className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group ${
                  hoveredTrainerId === trainer.id ? 'border-[#d6ff00] shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4 mb-3">
                    {/* Profile Photo */}
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden ring-2 ring-gray-200">
                      <ImageWithFallback
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Header Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">
                          {trainer.name}
                        </h3>
                        {trainer.isPremium && (
                          <span className="px-2 py-0.5 bg-[#d6ff00] text-black rounded-full text-xs font-semibold flex-shrink-0">
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {trainer.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{trainer.rating}</span>
                        <span className="text-xs text-gray-500">({trainer.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3">
                    {trainer.description}
                  </p>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {trainer.certifications.slice(0, 2).map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        <Award className="h-3 w-3" />
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                    <span className="text-gray-700 font-medium">{trainer.experience}</span>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-xs">{trainer.city} / {trainer.district}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Map View - Right Side (Desktop - 35%) */}
        <div className="hidden lg:block lg:w-[35%] relative z-0">
          <MapWrapper
            center={[40.7569, 30.3781]}
            zoom={12}
            scrollWheelZoom={true}
          >
            {mockTrainers.map((trainer) => (
              <Marker
                key={trainer.id}
                position={[trainer.coordinates.lat, trainer.coordinates.lng]}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.set(trainer.id, ref);
                  } else {
                    markerRefs.delete(trainer.id);
                  }
                }}
                eventHandlers={{
                  mouseover: () => setHoveredTrainerId(trainer.id),
                  mouseout: () => setHoveredTrainerId(null),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[250px]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {trainer.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{trainer.category}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{trainer.rating}</span>
                          <span className="text-gray-500">({trainer.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{trainer.city} / {trainer.district}</span>
                    </div>

                    <div className="text-sm text-gray-700 mb-2">
                      {trainer.experience} deneyim
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {trainer.description}
                    </p>

                    <Link href={`/${trainer.slug}`}>
                      <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                        Profili Görüntüle
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
                  center={[40.7569, 30.3781]}
                  zoom={12}
                  scrollWheelZoom={true}
                >
                  {mockTrainers.map((trainer) => (
                    <Marker
                      key={trainer.id}
                      position={[trainer.coordinates.lat, trainer.coordinates.lng]}
                    >
                      <Popup>
                        <div className="p-2 min-w-[250px]">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                              <ImageWithFallback
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                {trainer.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-1">{trainer.category}</p>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{trainer.rating}</span>
                                <span className="text-gray-500">({trainer.reviews})</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{trainer.city} / {trainer.district}</span>
                          </div>

                          <div className="text-sm text-gray-700 mb-2">
                            {trainer.experience} deneyim
                          </div>

                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                            {trainer.description}
                          </p>

                          <Link href={`/${trainer.slug}`}>
                            <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                              Profili Görüntüle
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
