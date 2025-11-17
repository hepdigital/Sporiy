'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Users, Filter, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';

const mockClubs = [
  {
    id: 1,
    name: 'Anka Yıldız Spor Kulübü',
    slug: 'ankayildizsporkulubu',
    category: 'Yüzme',
    location: 'Ankara, Türkiye',
    rating: 4.9,
    reviews: 127,
    followers: 3456,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
    description: 'Türkiye\'nin en köklü yüzme kulüplerinden biri. 25 yıllık deneyim.',
    isPremium: true,
  },
  {
    id: 2,
    name: 'Deniz Yıldızı Akademi',
    slug: 'denizyildizi',
    category: 'Yelken',
    location: 'İstanbul, Türkiye',
    rating: 4.8,
    reviews: 89,
    followers: 2341,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    description: 'Yelken sporunda uzman kadro ve modern ekipman.',
    isPremium: true,
  },
  {
    id: 3,
    name: 'Mavi Dalga SK',
    slug: 'mavidalga',
    category: 'Sutopu',
    location: 'İzmir, Türkiye',
    rating: 4.7,
    reviews: 156,
    followers: 4521,
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400',
    description: 'Profesyonel sutopu eğitimi ve yarışma takımları.',
    isPremium: false,
  },
  {
    id: 4,
    name: 'Kano Akademi',
    slug: 'kanoakademi',
    category: 'Kano',
    location: 'Antalya, Türkiye',
    rating: 4.9,
    reviews: 203,
    followers: 5678,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400',
    description: 'Kano ve kürek sporlarında Türkiye\'nin lideri.',
    isPremium: true,
  },
];

const categories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Sutopu', 'Sualtı Sporları'];
const cities = ['Tüm Şehirler', 'Ankara', 'İstanbul', 'İzmir', 'Antalya'];

export function ClubsListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-5">Spor Kulüpleri</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Türkiye'nin en iyi su sporları kulüplerini keşfedin ve hemen üye olun
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
                placeholder="Kulüp adı, spor dalı veya şehir ara..."
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
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>
      )}

      {/* Clubs Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{mockClubs.length}</span> kulüp bulundu
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]">
            <option>En Popüler</option>
            <option>En Yüksek Puan</option>
            <option>En Çok Takipçi</option>
            <option>Yeni Eklenenler</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClubs.map((club) => (
            <Link
              key={club.id}
              href={`/${club.slug}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <ImageWithFallback
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {club.isPremium && (
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
                      {club.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{club.category}</p>
                  </div>
                  <Building2 className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {club.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{club.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{club.rating}</span>
                      <span className="text-gray-500">({club.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{club.followers.toLocaleString()}</span>
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
