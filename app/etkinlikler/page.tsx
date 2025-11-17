'use client';

import { useState, useMemo } from 'react';
import { Search, List, Map as MapIcon, Filter } from 'lucide-react';
import { mockEvents } from '@/lib/events-data';
import { EventsMapView } from '@/components/events/events-map-view';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/event-card';

type EventFilters = {
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

const quickCategories = ['Tümü', 'Yüzme', 'Kano', 'Yelken', 'Sualtı Sporları', 'Triatlon'];

export default function EventsPage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<EventFilters>({
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

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let result = [...mockEvents];

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.organizerName.toLowerCase().includes(searchLower)
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((event) => filters.categories.includes(event.category));
    }

    // Cities
    if (filters.cities.length > 0) {
      result = result.filter((event) => filters.cities.includes(event.location));
    }

    // Levels
    if (filters.levels.length > 0) {
      result = result.filter((event) => filters.levels.includes(event.level));
    }

    // Event Type
    if (filters.eventType !== 'all') {
      result = result.filter((event) => event.type === filters.eventType);
    }

    // Price Range
    if (filters.eventType !== 'free') {
      result = result.filter(
        (event) => event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1]
      );
    }

    // Has Spots
    if (filters.hasSpots) {
      result = result.filter((event) => event.registered < event.capacity);
    }

    // Certificate
    if (filters.certificate) {
      result = result.filter((event) => event.certificate);
    }

    // Date Range
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filters.dateRange === 'today') {
      result = result.filter((event) => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === today.getTime();
      });
    } else if (filters.dateRange === 'week') {
      const weekLater = new Date(today);
      weekLater.setDate(weekLater.getDate() + 7);
      result = result.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= today && eventDate <= weekLater;
      });
    } else if (filters.dateRange === 'month') {
      const monthLater = new Date(today);
      monthLater.setMonth(monthLater.getMonth() + 1);
      result = result.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= today && eventDate <= monthLater;
      });
    } else if (filters.dateRange === 'custom' && filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      result = result.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= start && eventDate <= end;
      });
    }

    // Sort
    switch (filters.sortBy) {
      case 'date':
        result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.registered - a.registered);
        break;
      case 'spots':
        result.sort((a, b) => (b.capacity - b.registered) - (a.capacity - a.registered));
        break;
    }

    return result;
  }, [filters, mockEvents]);

  const toggleQuickCategory = (category: string) => {
    if (category === 'Tümü') {
      setFilters({ ...filters, categories: [] });
    } else {
      const newCategories = filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [category];
      setFilters({ ...filters, categories: newCategories });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 -my-6">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-5">Etkinlikler</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Su sporları etkinliklerini keşfedin ve hemen kayıt olun
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Etkinlik adı, organizatör veya şehir ara..."
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
            {quickCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleQuickCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'Tümü' && filters.categories.length === 0
                    ? 'bg-[#d6ff00] text-black'
                    : filters.categories.includes(cat)
                    ? 'bg-[#d6ff00] text-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
              className={view === 'list' ? 'bg-black text-white hover:bg-gray-800' : ''}
            >
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
            <Button
              variant={view === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('map')}
              className={view === 'map' ? 'bg-black text-white hover:bg-gray-800' : ''}
            >
              <MapIcon className="h-4 w-4 mr-2" />
              Harita
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spor Dalı
                </label>
                <select
                  value={filters.categories.length > 0 ? filters.categories[0] : 'Tümü'}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters({ 
                      ...filters, 
                      categories: value === 'Tümü' ? [] : [value] 
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  <option value="Tümü">Tümü</option>
                  {quickCategories.filter(c => c !== 'Tümü').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <select
                  value={filters.cities.length > 0 ? filters.cities[0] : 'Tüm Şehirler'}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters({ 
                      ...filters, 
                      cities: value === 'Tüm Şehirler' ? [] : [value] 
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  <option value="Tüm Şehirler">Tüm Şehirler</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Antalya">Antalya</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Adana">Adana</option>
                  <option value="Mersin">Mersin</option>
                  <option value="Eskişehir">Eskişehir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tarih
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  <option value="all">Tüm Tarihler</option>
                  <option value="today">Bugün</option>
                  <option value="week">Bu Hafta</option>
                  <option value="month">Bu Ay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etkinlik Tipi
                </label>
                <select
                  value={filters.eventType}
                  onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
                >
                  <option value="all">Tümü</option>
                  <option value="free">Ücretsiz</option>
                  <option value="paid">Ücretli</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredEvents.length}</span> etkinlik bulundu
          </p>
          <select 
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]"
          >
            <option value="date">Tarihe Göre</option>
            <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
            <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
            <option value="rating">En Yüksek Puan</option>
            <option value="popular">En Popüler</option>
            <option value="spots">Kalan Kontenjan</option>
          </select>
        </div>

        {view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[600px] rounded-xl overflow-hidden border border-gray-200">
            <EventsMapView events={filteredEvents} />
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Etkinlik bulunamadı. Filtreleri değiştirmeyi deneyin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
