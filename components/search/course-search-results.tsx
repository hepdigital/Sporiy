'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Star, X, Calendar, Clock, TrendingUp } from 'lucide-react';
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

const mockCourses = [
  {
    id: 11,
    title: 'Başlangıç Seviye Kano Kursu',
    slug: 'baslangic-seviye-kano-kursu',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Adapazarı',
    instructor: 'Umut Diner',
    instructorSlug: 'umutdiner',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 4.8,
    reviews: 89,
    students: 156,
    duration: '8 Hafta',
    level: 'Başlangıç',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
    description: 'Kano sporuna yeni başlayanlar için temel teknikler ve güvenlik eğitimi.',
    schedule: 'Haftada 2 gün',
    type: 'Grup',
    coordinates: { lat: 40.7569, lng: 30.3781 },
  },
  {
    id: 12,
    title: 'İleri Seviye Sprint Kano',
    slug: 'ileri-seviye-sprint-kano',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Serdivan',
    instructor: 'Umut Diner',
    instructorSlug: 'umutdiner',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 4.9,
    reviews: 67,
    students: 89,
    duration: '12 Hafta',
    level: 'İleri',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
    description: 'Yarışma odaklı sprint teknikleri ve performans geliştirme programı.',
    schedule: 'Haftada 3 gün',
    type: 'Grup',
    coordinates: { lat: 40.7669, lng: 30.3881 },
  },
  {
    id: 2,
    title: 'Özel Ders Programı',
    slug: 'ozel-ders-programi',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Adapazarı',
    instructor: 'Umut Diner',
    instructorSlug: 'umutdiner',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 4.9,
    reviews: 45,
    students: 78,
    duration: 'Esnek',
    level: 'Tüm Seviyeler',
    price: 500,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
    description: 'Kişiye özel hazırlanan antrenman programı ve birebir koçluk.',
    schedule: 'Esnek saatler',
    type: 'Bireysel',
    coordinates: { lat: 40.7569, lng: 30.3781 },
  },
];

const categories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Kürek', 'Sutopu'];
const districts = ['Tüm İlçeler', 'Adapazarı', 'Serdivan', 'Erenler', 'Arifiye'];
const levels = ['Tüm Seviyeler', 'Başlangıç', 'Orta', 'İleri', 'Profesyonel'];
const courseTypes = ['Tüm Tipler', 'Grup', 'Bireysel'];
const sortOptions = [
  { value: 'relevance', label: 'En İlgili' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'price-low', label: 'En Düşük Fiyat' },
  { value: 'price-high', label: 'En Yüksek Fiyat' },
];

export function CourseSearchResults({ location }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDistrict, setSelectedDistrict] = useState('Tüm İlçeler');
  const [selectedLevel, setSelectedLevel] = useState('Tüm Seviyeler');
  const [selectedType, setSelectedType] = useState('Tüm Tipler');
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState(location || '');
  const markerRefs = useState(new Map<number, any>())[0];

  const totalResults = mockCourses.length;

  // Open popup on hover
  useEffect(() => {
    if (hoveredCourseId && markerRefs.has(hoveredCourseId)) {
      const marker = markerRefs.get(hoveredCourseId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [hoveredCourseId, markerRefs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Link href="/arama" className="hover:text-gray-900">Arama</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Kurslar</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {location 
              ? `"${location}" araması için ${totalResults} kurs bulundu!`
              : `Tüm Kurslar (${totalResults})`
            }
          </h1>
          <p className="text-gray-600">
            Size uygun kursu bulun ve hemen kayıt olun
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

            {/* District & Level Filter */}
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

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Seviye:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Tip:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {courseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

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
            <div className="grid grid-cols-3 gap-2 mb-2">
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

              {/* Type */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {courseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
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
            {mockCourses.map((course) => (
              <Link
                key={course.id}
                href={`/kurs/${course.slug}`}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
                className={`block bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group ${
                  hoveredCourseId === course.id ? 'border-[#d6ff00] shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 mb-2 line-clamp-2">
                        <span className="font-bold">{course.instructor}</span> adlı eğitmenden <span className="font-bold">{course.title}</span>
                      </h3>
                      
                      {/* Instructor Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <ImageWithFallback
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-600">{course.category}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          course.type === 'Grup' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {course.type}
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900">{course.rating}</span>
                          </div>
                          <span className="text-gray-600">{course.duration}</span>
                        </div>
                        <span className="font-bold text-gray-900">{course.price.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: Grid View */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 p-4">
            {mockCourses.map((course) => (
              <Link
                key={course.id}
                href={`/kurs/${course.slug}`}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
                className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group ${
                  hoveredCourseId === course.id ? 'border-[#d6ff00] shadow-lg' : 'border-gray-200'
                }`}
              >
                {/* Image */}
                <div className="relative h-32 bg-gray-200">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                    <span className="font-bold">{course.instructor}</span> adlı eğitmenden <span className="font-bold">{course.title}</span>
                  </h3>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <ImageWithFallback
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span 
                      className="text-xs text-gray-600 hover:text-[#d6ff00] transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/${course.instructorSlug}`;
                      }}
                    >
                      {course.instructor}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.type === 'Grup' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {course.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="space-y-1 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{course.city} / {course.district}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                      <span className="text-xs text-gray-500">({course.reviews})</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{course.price.toLocaleString('tr-TR')} ₺</span>
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
            {mockCourses.map((course) => (
              <Marker
                key={course.id}
                position={[course.coordinates.lat, course.coordinates.lng]}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.set(course.id, ref);
                  } else {
                    markerRefs.delete(course.id);
                  }
                }}
                eventHandlers={{
                  mouseover: () => setHoveredCourseId(course.id),
                  mouseout: () => setHoveredCourseId(null),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[250px]">
                    <h3 className="text-gray-900 mb-2">
                      <span className="font-semibold">{course.instructor}</span> adlı eğitmenden <span className="font-semibold">{course.title}</span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{course.category}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <ImageWithFallback
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">Eğitmen: {course.instructor}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        course.type === 'Grup' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {course.type}
                      </span>
                    </div>

                    <div className="space-y-1 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{course.city} / {course.district}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating} ({course.reviews})</span>
                      </div>
                    </div>

                    <div className="mb-3 text-center">
                      <span className="text-lg font-bold text-gray-900">
                        {course.price.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>

                    <Link href={`/kurs/${course.slug}`}>
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
                  center={[40.7569, 30.3781]}
                  zoom={12}
                  scrollWheelZoom={true}
                >
                  {mockCourses.map((course) => (
                    <Marker
                      key={course.id}
                      position={[course.coordinates.lat, course.coordinates.lng]}
                    >
                      <Popup>
                        <div className="p-2 min-w-[250px]">
                          <h3 className="text-gray-900 mb-2">
                            <span className="font-semibold">{course.instructor}</span> adlı eğitmenden <span className="font-semibold">{course.title}</span>
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{course.category}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <ImageWithFallback
                              src={course.instructorAvatar}
                              alt={course.instructor}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-600">Eğitmen: {course.instructor}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              course.type === 'Grup' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {course.type}
                            </span>
                          </div>

                          <div className="space-y-1 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{course.city} / {course.district}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating} ({course.reviews})</span>
                            </div>
                          </div>

                          <div className="mb-3 text-center">
                            <span className="text-lg font-bold text-gray-900">
                              {course.price.toLocaleString('tr-TR')} ₺
                            </span>
                          </div>

                          <Link href={`/kurs/${course.slug}`}>
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
