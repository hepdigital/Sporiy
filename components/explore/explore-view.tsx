'use client';

import { useState } from 'react';
import { MapView } from './map-view';
import { ListView } from './list-view';
import { FilterSidebar } from './filter-sidebar';
import { SearchHeader } from './search-header';
import { Map, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ViewMode = 'map' | 'list';

export type FilterState = {
  search: string;
  location: string;
  category: string[];
  priceRange: [number, number];
  rating: number;
  availability: string;
  sortBy: string;
};

const initialFilters: FilterState = {
  search: '',
  location: '',
  category: [],
  priceRange: [0, 10000],
  rating: 0,
  availability: 'all',
  sortBy: 'relevance',
};

export function ExploreView() {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Search Header */}
      <SearchHeader 
        filters={filters} 
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Filter Sidebar */}
        {showFilters && (
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* View Toggle */}
          <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex gap-1">
            <Button
              size="sm"
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-[#d6ff00] text-black hover:bg-[#c5ee00]' : ''}
            >
              <Map className="h-4 w-4 mr-2" />
              Harita
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#d6ff00] text-black hover:bg-[#c5ee00]' : ''}
            >
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
          </div>

          {/* Content */}
          {viewMode === 'map' ? (
            <MapView filters={filters} />
          ) : (
            <ListView filters={filters} />
          )}
        </div>
      </div>
    </div>
  );
}
