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
  // Filtreler desktop'ta açık, mobilde kapalı
  const [showFilters, setShowFilters] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [hoveredProfileId, setHoveredProfileId] = useState<number | null>(null);
  const [handleUseLocation, setHandleUseLocation] = useState<(() => void) | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Search Header */}
      <SearchHeader 
        filters={filters} 
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onUseCurrentLocation={() => handleUseLocation && handleUseLocation()}
      />

      {/* Split View: List + Map */}
      <SplitView 
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        hoveredProfileId={hoveredProfileId}
        setHoveredProfileId={setHoveredProfileId}
        setHandleUseLocation={setHandleUseLocation}
        showMapModal={showMapModal}
        setShowMapModal={setShowMapModal}
      />
    </div>
  );
}
