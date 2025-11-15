'use client';

import { useState } from 'react';
import { SplitView } from './split-view';
import { SearchHeader } from './search-header';

export type FilterState = {
  search: string;
  location: string;
  category: string[];
  priceRange: [number, number];
  rating: number;
  availability: string;
  sortBy: string;
  useCurrentLocation: boolean;
  userLocation: { lat: number; lng: number } | null;
};

const initialFilters: FilterState = {
  search: '',
  location: '',
  category: [],
  priceRange: [0, 10000],
  rating: 0,
  availability: 'all',
  sortBy: 'relevance',
  useCurrentLocation: false,
  userLocation: null,
};

export function ExploreView() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProfileId, setHoveredProfileId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Search Header */}
      <SearchHeader 
        filters={filters} 
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Split View: List + Map */}
      <SplitView 
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        hoveredProfileId={hoveredProfileId}
        setHoveredProfileId={setHoveredProfileId}
      />
    </div>
  );
}
