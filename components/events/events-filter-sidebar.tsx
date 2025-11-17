'use client';

import { X, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  SwimmingIcon, 
  CanoeIcon, 
  RowingIcon, 
  SailingIcon, 
  WaterPoloIcon, 
  DivingIcon, 
  TriathlonIcon, 
  PentathlonIcon 
} from '@/components/icons/sport-icons';

const categories = [
  { name: 'Yüzme', icon: SwimmingIcon },
  { name: 'Kano', icon: CanoeIcon },
  { name: 'Kürek', icon: RowingIcon },
  { name: 'Yelken', icon: SailingIcon },
  { name: 'Sutopu', icon: WaterPoloIcon },
  { name: 'Sualtı Sporları', icon: DivingIcon },
  { name: 'Triatlon', icon: TriathlonIcon },
  { name: 'Modern Pentatlon', icon: PentathlonIcon },
];

const cities = [
  'Ankara', 'İstanbul', 'İzmir', 'Antalya', 'Bursa', 
  'Adana', 'Mersin', 'Eskişehir', 'Muğla', 'Aydın'
];

const levels = [
  { value: 'beginner', label: 'Başlangıç' },
  { value: 'intermediate', label: 'Orta' },
  { value: 'advanced', label: 'İleri' },
  { value: 'professional', label: 'Profesyonel' },
];

const eventTypes = [
  { value: 'all', label: 'Tümü' },
  { value: 'free', label: 'Ücretsiz' },
  { value: 'paid', label: 'Ücretli' },
];

const dateRanges = [
  { value: 'all', label: 'Tüm Tarihler' },
  { value: 'today', label: 'Bugün' },
  { value: 'week', label: 'Bu Hafta' },
  { value: 'month', label: 'Bu Ay' },
  { value: 'custom', label: 'Özel Tarih' },
];

export type EventFilters = {
  search: string;
  categories: string[];
  cities: string[];
  levels: string[];
  eventType: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  priceRange: [number, number];
  hasSpots: boolean;
  certificate: boolean;
  sortBy: string;
};

type Props = {
  filters: EventFilters;
  setFilters: (filters: EventFilters) => void;
  onClose: () => void;
};

export function EventsFilterSidebar({ filters, setFilters, onClose }: Props) {
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  const toggleCity = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter((c) => c !== city)
      : [...filters.cities, city];
    setFilters({ ...filters, cities: newCities });
  };

  const toggleLevel = (level: string) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    setFilters({ ...filters, levels: newLevels });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      cities: [],
      levels: [],
      eventType: 'all',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      priceRange: [0, 10000],
      hasSpots: false,
      certificate: false,
      sortBy: 'date',
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
            <option value="date">Tarihe Göre</option>
            <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
            <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
            <option value="rating">En Yüksek Puan</option>
            <option value="popular">En Popüler</option>
            <option value="spots">Kalan Kontenjan</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Tarih</h3>
          <div className="space-y-2">
            {dateRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="dateRange"
                  checked={filters.dateRange === range.value}
                  onChange={() => setFilters({ ...filters, dateRange: range.value })}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
          
          {filters.dateRange === 'custom' && (
            <div className="mt-3 space-y-2">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Spor Dalları</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <label
                  key={category.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                  />
                  <Icon className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Cities */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Şehir</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cities.map((city) => (
              <label
                key={city}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.cities.includes(city)}
                  onChange={() => toggleCity(city)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">{city}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Seviye</h3>
          <div className="space-y-2">
            {levels.map((level) => (
              <label
                key={level.value}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.levels.includes(level.value)}
                  onChange={() => toggleLevel(level.value)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Event Type */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Etkinlik Tipi</h3>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="eventType"
                  checked={filters.eventType === type.value}
                  onChange={() => setFilters({ ...filters, eventType: type.value })}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        {filters.eventType !== 'free' && (
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
        )}

        {/* Additional Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Diğer</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.hasSpots}
                onChange={(e) => setFilters({ ...filters, hasSpots: e.target.checked })}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
              />
              <span className="text-sm text-gray-700">Sadece Müsait Olanlar</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.certificate}
                onChange={(e) => setFilters({ ...filters, certificate: e.target.checked })}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
              />
              <span className="text-sm text-gray-700">Sertifikalı Etkinlikler</span>
            </label>
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
