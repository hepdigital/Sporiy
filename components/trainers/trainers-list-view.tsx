'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Users, Filter, Award, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';

const mockTrainers = [
  {
    id: 1,
    name: 'Umut Diner',
    slug: 'umutdiner',
    category: 'Kano & Kürek',
    location: 'İstanbul, Türkiye',
    rating: 5.0,
    reviews: 89,
    followers: 1234,
    experience: '8 Yıl',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    description: 'Uluslararası sertifikalı kano eğitmeni. Olimpik seviye antrenman programları.',
    certifications: ['ICF Level 3', 'Olimpik Antrenör'],
    isPremium: true,
  },
  {
    id: 2,
    name: 'Elif Kaya',
    slug: 'elifkaya',
    category: 'Sualtı Sporları',
    location: 'Antalya, Türkiye',
    rating: 4.9,
    reviews: 156,
    followers: 2341,
    experience: '12 Yıl',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    description: 'PADI Master Instructor. Dalış eğitimi ve sualtı fotoğrafçılığı uzmanı.',
    certifications: ['PADI Master', 'SSI Instructor'],
    isPremium: true,
  },
  {
    id: 3,
    name: 'Can Öztürk',
    slug: 'canozturk',
    category: 'Triatlon',
    location: 'İzmir, Türkiye',
    rating: 4.8,
    reviews: 203,
    followers: 3456,
    experience: '10 Yıl',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    description: 'Triatlon antrenörü ve performans koçu. Bireysel antrenman programları.',
    certifications: ['ITU Coach', 'Performans Koçu'],
    isPremium: false,
  },
  {
    id: 4,
    name: 'Zeynep Demir',
    slug: 'zeynepdemir',
    category: 'Yüzme',
    location: 'Ankara, Türkiye',
    rating: 5.0,
    reviews: 178,
    followers: 4521,
    experience: '15 Yıl',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    description: 'Milli takım eski sporcusu. Çocuk ve yetişkin yüzme eğitimi.',
    certifications: ['Yüzme Federasyonu', 'Çocuk Eğitimi'],
    isPremium: true,
  },
];

const categories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Sutopu', 'Sualtı Sporları', 'Triatlon'];
const cities = ['Tüm Şehirler', 'Ankara', 'İstanbul', 'İzmir', 'Antalya'];
const experiences = ['Tümü', '0-5 Yıl', '5-10 Yıl', '10+ Yıl'];

export function TrainersListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler');
  const [selectedExperience, setSelectedExperience] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-5">Spor Eğitmenleri</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesyonel eğitmenlerle tanışın ve hedeflerinize ulaşın
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Eğitmen adı, spor dalı veya şehir ara..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtreler
            </Button>
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#d6ff00] text-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spor Dalı
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deneyim
                </label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  {experiences.map((exp) => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trainers Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{mockTrainers.length}</span> eğitmen bulundu
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]">
            <option>En Popüler</option>
            <option>En Yüksek Puan</option>
            <option>En Deneyimli</option>
            <option>Yeni Eklenenler</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrainers.map((trainer) => (
            <Link
              key={trainer.id}
              href={`/${trainer.slug}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <ImageWithFallback
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {trainer.isPremium && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#d6ff00] text-black rounded-full text-xs font-semibold">
                    Premium
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#d6ff00] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{trainer.category}</p>
                  </div>
                  <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {trainer.description}
                </p>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      <Award className="h-3 w-3" />
                      {cert}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{trainer.location}</span>
                  </div>
                  <div className="text-gray-700 font-medium">
                    {trainer.experience}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{trainer.rating}</span>
                      <span className="text-gray-500">({trainer.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{trainer.followers.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Daha Fazla Göster
          </Button>
        </div>
      </div>
    </div>
  );
}
