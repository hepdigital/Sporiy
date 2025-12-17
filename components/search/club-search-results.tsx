'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Star, Building2, X } from 'lucide-react';
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

const mockClubs = [
  {
    id: 1,
    name: 'Anka Yıldız Spor Kulübü',
    slug: 'ankayildizsporkulubu',
    category: 'Yüzme',
    city: 'Sakarya',
    district: 'Adapazarı',
    rating: 4.9,
    reviews: 127,
    logo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
    description: 'Biz, çocuğunuza yüzme öğretebiliriz.',
    isPremium: true,
    coordinates: { lat: 40.7569, lng: 30.3781 },
  },
  {
    id: 2,
    name: 'Deniz Yıldızı Akademi',
    slug: 'denizyildizi',
    category: 'Yelken',
    city: 'Sakarya',
    district: 'Serdivan',
    rating: 4.8,
    reviews: 89,
    logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    description: 'Biz, yelken kategorisinde sizi profesyonel seviyeye taşıyabiliriz.',
    isPremium: true,
    coordinates: { lat: 40.7669, lng: 30.3881 },
  },
  {
    id: 3,
    name: 'Mavi Dalga SK',
    slug: 'mavidalga',
    category: 'Sutopu',
    city: 'Sakarya',
    district: 'Adapazarı',
    rating: 4.7,
    reviews: 156,
    logo: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=200',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400',
    description: 'Biz, sutopu kategorisinde sizi yarışmaya hazırlayabiliriz.',
    isPremium: false,
    coordinates: { lat: 40.7469, lng: 30.3681 },
  },
  {
    id: 4,
    name: 'Kano Akademi',
    slug: 'kanoakademi',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Erenler',
    rating: 4.9,
    reviews: 203,
    logo: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=200',
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
    description: 'Biz, kano kategorisinde sizi profesyonel seviyeye taşıyabiliriz.',
    isPremium: true,
    coordinates: { lat: 40.7769, lng: 30.3981 },
  },
  {
    id: 5,
    name: 'Su Sporları Merkezi',
    slug: 'susporlari',
    category: 'Yüzme',
    city: 'Sakarya',
    district: 'Arifiye',
    rating: 4.6,
    reviews: 94,
    logo: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=200',
    image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400',
    description: 'Biz, çocuğunuza yüzme öğretebiliriz.',
    isPremium: false,
    coordinates: { lat: 40.7369, lng: 30.3581 },
  },
  {
    id: 6,
    name: 'Olimpik Yüzme Kulübü',
    slug: 'olimpikyuzme',
    category: 'Yüzme',
    city: 'Sakarya',
    district: 'Adapazarı',
    rating: 4.8,
    reviews: 178,
    logo: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400',
    description: 'Biz, yüzme kategorisinde sizi yarışmaya hazırlayabiliriz.',
    isPremium: true,
    coordinates: { lat: 40.7669, lng: 30.3681 },
  },
];

const categories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Kürek', 'Sutopu'];
const districts = ['Tüm İlçeler', 'Adapazarı', 'Serdivan', 'Erenler', 'Arifiye'];
const sortOptions = [
  { value: 'relevance', label: 'En İlgili' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'reviews', label: 'En Çok Değerlendirme' },
  { value: 'newest', label: 'Yeni Eklenenler' },
];

export function ClubSearchResults({ location }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDistrict, setSelectedDistrict] = useState('Tüm İlçeler');
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredClubId, setHoveredClubId] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState(location || '');
  const markerRefs = useState(new Map<number, any>())[0];

  const totalResults = mockClubs.length;

  // Open popup on hover
  useEffect(() => {
    if (hoveredClubId && markerRefs.has(hoveredClubId)) {
      const marker = markerRefs.get(hoveredClubId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [hoveredClubId, markerRefs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Link href="/arama" className="hover:text-gray-900">Arama</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Kulüpler</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {location 
              ? `"${location}" araması için ${totalResults} kulüp bulundu!`
              : `Tüm Kulüpler (${totalResults})`
            }
          </h1>
          <p className="text-gray-600">
            En uygun spor kulübünü bulun ve hemen üye olun
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Location Search */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Konum:</span>
              <input
                type="text"
                placeholder="Şehir, ilçe ara..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00] w-40"
              />
              <button className="px-2 py-1.5 bg-[#d6ff00] text-black rounded-lg text-xs font-medium hover:bg-[#c5ee00] transition-colors">
                Mevcut Konum
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
            <div className="grid grid-cols-1 gap-2 mb-2">
              {/* Location Search */}
              <input
                type="text"
                placeholder="Şehir, ilçe ara..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              />
            </div>
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
            {mockClubs.map((club) => (
              <Link
                key={club.id}
                href={`/${club.slug}`}
                onMouseEnter={() => setHoveredClubId(club.id)}
                onMouseLeave={() => setHoveredClubId(null)}
                className={`block bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group ${
                  hoveredClubId === club.id ? 'border-[#d6ff00] shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                      <ImageWithFallback
                        src={club.logo}
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#d6ff00] transition-colors line-clamp-1">
                              {club.name}
                            </h3>
                            {club.isPremium && (
                              <span className="px-2 py-0.5 bg-[#d6ff00] text-black rounded-full text-xs font-semibold">
                                Premium
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <Building2 className="h-3 w-3 text-gray-400" />
                            <span className="text-xs font-medium text-gray-700">
                              {club.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 mb-2">
                        {club.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-gray-900">{club.rating}</span>
                          <span className="text-xs text-gray-500">({club.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{club.city} / {club.district}</span>
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
            {mockClubs.map((club) => (
              <Link
                key={club.id}
                href={`/${club.slug}`}
                onMouseEnter={() => setHoveredClubId(club.id)}
                onMouseLeave={() => setHoveredClubId(null)}
                className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group ${
                  hoveredClubId === club.id ? 'border-[#d6ff00] shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4 mb-3">
                    {/* Profile Photo */}
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden ring-2 ring-gray-200">
                      <ImageWithFallback
                        src={club.logo}
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Header Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">
                          {club.name}
                        </h3>
                        {club.isPremium && (
                          <span className="px-2 py-0.5 bg-[#d6ff00] text-black rounded-full text-xs font-semibold flex-shrink-0">
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {club.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{club.rating}</span>
                        <span className="text-xs text-gray-500">({club.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3">
                    {club.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-100">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{club.city} / {club.district}</span>
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
            {mockClubs.map((club) => (
              <Marker
                key={club.id}
                position={[club.coordinates.lat, club.coordinates.lng]}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.set(club.id, ref);
                  } else {
                    markerRefs.delete(club.id);
                  }
                }}
                eventHandlers={{
                  mouseover: () => setHoveredClubId(club.id),
                  mouseout: () => setHoveredClubId(null),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[250px]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={club.logo}
                          alt={club.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {club.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{club.category}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{club.rating}</span>
                          <span className="text-gray-500">({club.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{club.city} / {club.district}</span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {club.description}
                    </p>

                    <Link href={`/${club.slug}`}>
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
                  {mockClubs.map((club) => (
                    <Marker
                      key={club.id}
                      position={[club.coordinates.lat, club.coordinates.lng]}
                    >
                      <Popup>
                        <div className="p-2 min-w-[250px]">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                              <ImageWithFallback
                                src={club.logo}
                                alt={club.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                {club.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-1">{club.category}</p>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{club.rating}</span>
                                <span className="text-gray-500">({club.reviews})</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{club.city} / {club.district}</span>
                          </div>

                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                            {club.description}
                          </p>

                          <Link href={`/${club.slug}`}>
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
