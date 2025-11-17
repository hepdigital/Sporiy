'use client';

import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterState } from './explore-view';

const categories = [
  'Yüzme',
  'Kano',
  'Kürek',
  'Yelken',
  'Sutopu',
  'Sualtı Sporları',
  'Triatlon',
  'Modern Pentatlon',
];

const sortOptions = [
  { value: 'relevance', label: 'İlgili' },
  { value: 'distance', label: 'Yakınlık' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'reviews', label: 'En Çok Değerlendirilen' },
  { value: 'newest', label: 'En Yeni' },
];

type Props = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onClose: () => void;
};

export function FilterSidebar({ filters, setFilters, onClose }: Props) {
  const toggleCategory = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    setFilters({ ...filters, category: newCategories });
  };

  const resetFilters = () => {
    setFilters({
      search: filters.search,
      location: filters.location,
      category: [],
      priceRange: [0, 10000],
      rating: 0,
      availability: 'all',
      sortBy: 'relevance',
    });
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filtreler</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sıralama</h3>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Spor Dalları</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Minimum Puan</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => setFilters({ ...filters, rating })}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-700 ml-1">ve üzeri</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Fiyat Aralığı</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]],
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || 10000],
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div className="text-xs text-gray-500">
              {filters.priceRange[0].toLocaleString('tr-TR')} ₺ - {filters.priceRange[1].toLocaleString('tr-TR')} ₺
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Müsaitlik</h3>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'Tümü' },
              { value: 'today', label: 'Bugün Müsait' },
              { value: 'week', label: 'Bu Hafta' },
              { value: 'weekend', label: 'Hafta Sonu' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === option.value}
                  onChange={() => setFilters({ ...filters, availability: option.value })}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full mb-4"
        >
          Filtreleri Temizle
        </Button>
      </div>
    </div>
  );
}
